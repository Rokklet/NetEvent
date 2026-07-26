import express from "express";
import Comment from "../models/Comment";
import { auth , AuthRequest, requireRole } from "../middleware/auth";
import Event from "../models/Event";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../errors/AppError";


const router = express.Router();

router.get("/:eventId/comments",
asyncHandler(
    async (req, res) => {

        const { eventId } = req.params;
        
        const eventoExiste = await Event.exists({_id: eventId});
        if(!eventoExiste) throw new AppError("Evento no encontrado", 404);

        const comentarios = await Comment.find({ evento: eventId })
        .populate("autor", "nombre foto").sort({ createdAt: 1});

        res.json(comentarios);
    }
));

 
router.post("/:eventId/comments", auth, requireRole(["participant"]), 
asyncHandler<AuthRequest>(
    async (req, res) => {

        if (!req.user) throw new AppError("Usuario no autenticado", 401);
    
        const { texto } = req.body;

        if (!texto?.trim()) throw new AppError("El comentario no puede estar vacio",400);

        const { eventId } = req.params;

        const eventoExiste = await Event.exists({_id: eventId});
        if(!eventoExiste) throw new AppError("Evento no encontrado", 404);
        
       
        

        const comentario = await Comment.create({
            evento: eventId,
            texto: texto.trim(),
            autor: req.user.id,
        });

        await comentario.populate(
            "autor",
            "nombre foto"
        );

        res.status(201).json(comentario);
    }
));


export default router;
