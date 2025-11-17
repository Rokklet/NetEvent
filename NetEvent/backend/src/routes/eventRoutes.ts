import express from "express";
import Event from "../models/Event";
import { auth , AuthRequest, requireRole } from "../middleware/auth";
import PDFDocument from "pdfkit";
import { Response } from "express";

const router = express.Router();


/* Obtener eventos */
router.get("/", async (req, res) => {
  try {
    const eventos = await Event.find()
      .populate("organizador", "nombre foto");

    res.json(eventos);
  } catch (err: any) {
    res.status(500).json({ message: "Error al cargar eventos" });
  }
});

/* Publicar Evento */

router.post("/", auth, async (req: AuthRequest, res) => {
  console.log("BODY RECIBIDO:", req.body);
  console.log("USER:", req.user);
  try {
    const { titulo, descripcion, fecha, ubicacion, tags, imagenes, charlas } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const nuevoEvento = new Event({
      titulo,
      descripcion,
      fecha,
      ubicacion,
      tags,
      imagenes,
      charlas,
      organizador: req.user.id,
    });

    await nuevoEvento.save();

    res.status(201).json({
      message: "Evento publicado con éxito",
      evento: nuevoEvento,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error al publicar evento",
      error: err.message,
    });
  }
});

/* obetener evento por id */

router.get("/:id", async (req, res) => {
  try {
    const evento = await Event.findById(req.params.id);

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener evento" });
  }
});



/*Inscribirse a evento*/

router.post("/inscribir/:id", auth, async (req: AuthRequest, res) => {

  
  try {
    const eventId = req.params.id;
    

    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    if (req.user.role !== "participant") {
      return res.status(400).json({ message: "Solo los participantes pueden inscribirse" });
    }
    

    const evento = await Event.findById(eventId);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (evento.inscriptos.includes(req.user.id)) {
      return res.status(400).json({ message: "Ya estás inscripto" });
    }

    evento.inscriptos.push(req.user.id);
    await evento.save();

    res.json({ message: "Inscripción confirmada" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener lista de inscriptos de un evento
router.get("/:id/inscriptos/pdf", auth, requireRole(["organizer"]), async (req: AuthRequest, res: Response) => {
  try {
    const evento = await Event.findById(req.params.id)
      .populate("inscriptos", "nombre correo");

    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Verificar que el organizador sea el dueño del evento
    if (evento.organizador.toString() !== req.user!.id) {
      return res.status(403).json({ message: "No tienes permiso para descargar este PDF" });
    }

    // Crear PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", `attachment; filename=inscriptos-${evento._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(22).text(`Listado de inscriptos - ${evento.titulo}`, { underline: true });
    doc.moveDown();

    if (evento.inscriptos.length === 0) {
      doc.fontSize(14).text("No hay inscriptos en este evento.");
    } else {
      evento.inscriptos.forEach((user: any, i: number) => {
        doc.fontSize(14).text(`${i + 1}. ${user.nombre} - ${user.correo}`);
      });
    }

    doc.end();
  } catch (err: any) {
    res.status(500).json({ message: "Error al generar PDF", error: err.message });
  }
});


// Mis inscripciones
router.get("/usuario/inscripto", auth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const eventos = await Event.find({
      inscriptos: req.user.id
    }).populate("organizador", "nombre foto");

    res.json(eventos);
  } catch (err: any) {
    res.status(500).json({
      message: "Error al cargar tus inscripciones",
      error: err.message,
    });
  }
});


export default router;
