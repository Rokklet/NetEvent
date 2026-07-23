import express from "express";
import { auth, AuthRequest } from "../middleware/auth";
import Event from "../models/Event";
import User from "../models/User";

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

    console.log("Prueba nueva inscripción");

    return res.status(200).json({
      message: "Inscripción exitosa"
    })

  } catch (err: any) {
    res.status(500).json({ 
      message: "Error al inscribirse", 
      error: err.message });
  }
});

export default router;
