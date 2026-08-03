import express from "express";
import Event from "../models/Event";
import { auth , AuthRequest, requireRole } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../errors/AppError";


const router = express.Router();


/* Obtener eventos */
router.get("/", asyncHandler( async (req, res) => {
  
  const eventos = await Event.find()
  .populate("organizador", "nombre foto _id");

  res.json(eventos);
  
})   
) 

/* Publicar Evento */

router.post("/", auth, requireRole(["organizer"]), asyncHandler<AuthRequest>(
async (req, res) => {
  
  if (!req.user) {
    throw new AppError("Usuario no autenticado", 401)
  };


  const { titulo, descripcion, fecha, ubicacion, tags, imagenes, charlas } = req.body;

  const nuevoEvento = new Event({titulo, descripcion, fecha, ubicacion, tags, imagenes, charlas, organizador: req.user.id, estado: true});

  await nuevoEvento.save();

  res.status(201).json({
    message: "Evento publicado con éxito",
    evento: nuevoEvento,
  });

}
))


// Eventos del organizardor
router.get("/mis-eventos", auth, requireRole(["organizer"]), asyncHandler<AuthRequest>(
  async (req, res) => {
    if (!req.user) throw new AppError("Usuario no autenticado", 401);

    const eventos = await Event.find({ organizador: req.user.id });

    res.json(eventos);
}));

/* obetener evento por id */
router.get("/:id", asyncHandler(
  async (req, res) => {
  
    const evento = await Event.findById(req.params.id);

    if (!evento) throw new AppError("Evento no encontrado", 404);

    res.json(evento);
}
) );

/* Finalizar evento */
router.patch("/:id",auth, requireRole(["organizer"]), asyncHandler<AuthRequest>(
  async (req, res) => {
    const {id} = req.params;
    const {estado} = req.body;

    if(typeof estado != "boolean") throw new AppError("El valor entregado no es valido", 400);

    const evento = await Event.findByIdAndUpdate(
      {
        _id: id,
        organizador: req.user?.id,
      },
      {estado},
      { new: true, runValidators: true}
    );

    if(!evento) throw new AppError("Evento no encontrado", 404);

    return res.status(200).json(evento.estado);
  }
))

export default router;
