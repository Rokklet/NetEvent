import express from "express";
import Event from "../models/Event";
import { auth , AuthRequest } from "../middleware/auth";

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

export default router;
