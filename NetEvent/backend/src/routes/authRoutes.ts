import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../errors/AppError";

const router = express.Router();

interface RegisterBody {
  nombre: string;
  correo: string;
  password: string;
  role: "organizer" | "participant";
  descripcion?: string;
  foto?: string;
}

interface LoginBody {
  correo: string;
  password: string;
}

// Registro
router.post("/register", asyncHandler(
  async (req, res) => {
  
    const {  nombre, correo, password, role, descripcion, foto } = req.body as RegisterBody;

    if (!nombre?.trim() || !correo?.trim() || !password) throw new AppError("Nombre, correo y contraseña son obligarotios", 400)
    if (password.length < 6) throw new AppError("La constraseña debe tener al menos 6 caracteres", 400);

    const validRoles = [
      "organizer",
      "participant",
    ];

    if(!validRoles.includes(role)) throw new AppError("El rol seleccionado no es valido", 400);

    const normalizedEmail = correo.trim().toLowerCase();

    const existing = await User.findOne({ correo: normalizedEmail });
    if (existing) throw new AppError("Este correo ya fue registrado", 409)

    await User.create({
      nombre: nombre.trim(),
      correo: normalizedEmail,
      password,
      role,
      descripcion: descripcion?.trim(),
      foto,
    });
    
    res.status(201).json({ message: "Usuario creado con éxito" });
  }
));

// Login
router.post("/login", asyncHandler(
  async (req, res) => {
  
    const { correo, password } = req.body as LoginBody;
    if(!correo?.trim() || !password) throw new AppError("El correo y la contraseña son obligatorios", 400);

    const normalizedEmail = correo.trim().toLowerCase();

    const user = await User.findOne({ correo: normalizedEmail });

    if (!user) throw new AppError("Credenciales invalidas",401);

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new AppError("Credenciales invalidas", 401);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET no está configurado");

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1d"
    });

    res.json({
      token,
      user: {
        _id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        role: user.role,
        foto: user.foto,
        descripcion: user.descripcion || ""
      }
    });
  })
);

export default router;
