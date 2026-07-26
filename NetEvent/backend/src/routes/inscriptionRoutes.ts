import express, {Response} from "express";
import { auth, AuthRequest, requireRole } from "../middleware/auth";
import Event from "../models/Event";
import User from "../models/User";
import PDFDocument from "pdfkit";

import Inscription from "../models/Inscription";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../errors/AppError";

const router = express.Router();

/* Inscribirse a un evento */
router.post("/:eventoId", auth, requireRole(["participant"]), asyncHandler<AuthRequest>(

  async (req, res) => {
    if (!req.user) throw new AppError("Usuario no autenticado", 401);

    const { eventoId } = req.params;
    const userId = req.user.id;
    
    const evento = await Event.findById(eventoId);
    const usuario = await User.findById(userId);

    if (!evento) throw new AppError("Evento no encontrado", 404);
    if (!usuario) throw new AppError("Usuario no encontrado", 404);

    
    if (await Inscription.findOne({ evento: eventoId, participante: userId})) {
      throw new AppError("Ya estas inscripto a este evento", 409);
    }

    await Inscription.create({
      evento: eventoId,
      participante: userId,
    });

    res.status(201).json({
      message: "Inscripción exitosa"
    })
}));

interface PopulatedParticipant {
  _id: unknown;
  nombre: string;
  correo: string;
}

// Obetener lista de inscriptos a un evento por PDF 
router.get("/:id/inscriptos/pdf", auth, requireRole(["organizer"]),
asyncHandler<AuthRequest>(
  async (req, res: Response, next) => {

    if (!req.user) throw new AppError("Usuario no autenticado", 401);

    const evento = await Event.findById(req.params.id);
    if (!evento) throw new AppError("Evento no encontrado", 404);

    if (!evento.organizador.equals(req.user.id)) throw new AppError("No tiene permisos para descargar este listado", 403);

    const inscriptos = await Inscription.find({evento: req.params.id})
    .populate<{ participante: PopulatedParticipant | null;}>
    ("participante", "nombre correo");
    
    const participantes = inscriptos.map(ins => ins.participante).filter((participante): 
    participante is PopulatedParticipant => participante !== null);
    
    if(participantes.length === 0) throw new AppError("No se encontraron inscriptos al evento", 404);
  
    // Crear PDF
    const doc = new PDFDocument();

    doc.on("error", next);

    res.setHeader("Content-Disposition", `attachment; filename=inscriptos-${evento._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(22).text(`Listado de inscriptos para el evento ${evento.titulo}`, { underline: true });
    doc.moveDown();

    participantes.forEach((participante, i) => {
      doc.fontSize(14).text(`${i + 1}. ${participante.nombre} - ${participante.correo}`)
    });

    doc.end();
}));

//Mis inscripciones
router.get("/usuario", auth, requireRole(["participant"]), asyncHandler<AuthRequest>(
  async (req, res) => {
  
    if(!req.user) throw new AppError("Usuario no autenticado", 401);

    const inscripciones = await Inscription.find({participante: req.user.id})
    .populate({
      path: "evento",
      populate: {
        path: "organizador",
        model: "User",
        select: "nombre foto _id"
      }
    });

    const eventos = inscripciones.map( ins => ins.evento);

    res.json(eventos);  
  }
));

//validar usuario incripto
router.get("/:id/estado", auth, requireRole(["participant"]), asyncHandler<AuthRequest>(
  async (req, res) => {

    if(!req.user) throw new AppError("Usuario no autenticado", 401);
    
    const eventoExiste = await Event.exists({_id: req.params.id,});

    if(!eventoExiste) throw new AppError("Evento no encontrado", 404);

    const inscripcion = await Inscription.exists({
      evento: req.params.id,
      participante: req.user.id,
    });

    res.json({ inscripto: Boolean(inscripcion) });
  
  }
));

export default router;
