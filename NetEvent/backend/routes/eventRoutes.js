import express from "express";
import Evento from "../models/Event.js";

const router = express.Router();

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo evento
router.post("/", async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.status(201).json(evento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
