import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ titulo: "Evento de prueba", fecha: "2025-12-01" }]);
});

export default router;
