import express from "express";
import Comment from "../models/Comment";
import { auth , AuthRequest, requireRole } from "../middleware/auth";
import User from "../models/User";


const router = express.Router();

router.get("/:eventId/comments", async (req, res) => {
    try {

        const { eventId } = req.params;
        const comentarios = await Comment.find({ evento: eventId })
        .populate("autor", "nombre foto");

        res.json(comentarios);
    } catch (err: any) {
        res.status(500).json({
        message: "Error al obtener comentarios",
        error: err.message,
    });
    }
});

 
router.post("/:eventId/comments", auth, async (req: AuthRequest, res) => {
    try {
        const eventId = req.params.eventId;
        const { texto } = req.body;

        if (!req.user) {
           return res.status(401).json({ message: "Usuario no autenticado" });
        }

        if (!texto || !texto.trim()) {
            return res.status(400).json({ message: "El comentario no puede estar vacío" });
        }

        const comentario = new Comment ({
            evento: eventId,
            texto: texto,
            autor: req.user?.id,
        })
        
        await comentario.save();

        res.status(201).json(comentario);
    } catch (err: any){
        res.status(500).json({ message: "Error al cargar los comentarios", error: err.message,});
    }
});


export default router;
