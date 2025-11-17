import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  try {
    const {  nombre, correo, password, role, descripcion, foto } = req.body;
   
    const existing = await User.findOne({ correo });
    if (existing) return res.status(400).json({ message: "El correo ya está registrado" });

    const user = new User({ nombre, correo, password, role, descripcion, foto });
    
    await user.save();

    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (err: any) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    });

    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

export default router;
