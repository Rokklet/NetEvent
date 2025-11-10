import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";

router.post("/register", async (req, res) => {
  try {
    const { nombre, correo, password, role } = req.body;
    const existente = await User.findOne({ correo });
    if (existente) return res.status(400).json({ message: "El correo ya está registrado" });

    const nuevoUsuario = new User({ nombre, correo, password, role });
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, role: user.role, nombre: user.nombre },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, role: user.role, nombre: user.nombre });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
