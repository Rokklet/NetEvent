import express from "express";
import { auth, AuthRequest } from "../middleware/auth";
import Event from "../models/Event";
import User from "../models/User";

const router = express.Router();

/* Inscribirse a un evento */
router.post("/:eventoId", auth, async (req: AuthRequest, res) => {
  try {
    const { eventoId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    const userId = req.user.id;

    // Verificar que existen
    const evento = await Event.findById(eventoId);
    const usuario = await User.findById(userId);

    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    // Evitar inscripciones duplicadas
    if (evento.inscriptos?.includes(userId)) {
      return res.status(400).json({ message: "Ya estás inscripto en este evento" });
    }

    // Agregar al usuario como inscripto
    evento.inscriptos = [...(evento.inscriptos || []), userId];
    await evento.save();

    res.json({ message: "Inscripción exitosa" });

  } catch (err: any) {
    res.status(500).json({ message: "Error al inscribirse", error: err.message });
  }
});

export default router;
