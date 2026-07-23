import express, {Response} from "express";
import { auth, AuthRequest, requireRole } from "../middleware/auth";
import Event from "../models/Event";
import User from "../models/User";
import PDFDocument from "pdfkit";

import Inscription from "../models/Inscription";

const router = express.Router();

/* Inscribirse a un evento */
router.post("/:eventoId", auth, async (req: AuthRequest, res) => {
  try {

    const { eventoId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    const userId = req.user.id;
    
    const evento = await Event.findById(eventoId);
    const usuario = await User.findById(userId);

    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    
    if (await Inscription.findOne({ evento: eventoId, participante: userId})) {
      return res.status(400).json({ message: "Ya estas inscripto a este evento"});
    }

    const nuevaInscripcion = await Inscription.create({
      evento: eventoId,
      participante: userId,
    });

    return res.status(200).json({
      message: "Inscripción exitosa"
    })

  } catch (err: any) {
    res.status(500).json({ 
      message: "Error al inscribirse", 
      error: err.message });
  }
});

// Obetener lista de inscriptos a un evento por PDF
router.get("/:id/inscriptos/pdf", auth, requireRole(["organizer"]), async (req: AuthRequest, res: Response) => {

  try{
    const eventId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: "No estás autenticado" });
    };

    const userId = req.user.id;
    const evento = await Event.findById(eventId);

    console.log(eventId);

    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    if (!evento.organizador.equals(userId)) return res.status(403).json({ message: "No tienes los permisos necesarios para descargar este PDF"});

    console.log(evento);

    const inscriptos = await Inscription.find({evento: eventId})
    .populate("participante", "nombre correo");
    
    const participantes = inscriptos.map(ins => ins.participante)
    
    if(participantes.length === 0) return res.status(404).json({ message: "No se encontraron inscriptos al evento"});
  
    // Crear PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", `attachment; filename=inscriptos-${evento._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(22).text(`Listado de inscriptos para el evento ${evento.titulo}`, { underline: true });
    doc.moveDown();

    participantes.forEach((user:any, i: number) => {
      doc.fontSize(14).text(`${i + 1}. ${user.nombre} - ${user.correo}`)
    });

    doc.end();

  }catch(error: any){
    res.status(500).json({ message: "Error al generar PDF", error: error.message });
  };
});

export default router;
