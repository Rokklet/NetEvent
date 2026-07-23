import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import inscriptionRoutes from "./routes/inscriptionRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();

/*middlewares*/
app.use(cors());
app.use(express.json());
app.use("/api/inscripciones", inscriptionRoutes);
app.use("/api/eventos", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/eventos", commentRoutes);

mongoose
.connect(process.env.MONGO_URI!)
.then(() => console.log(" Conectado a MongoDB"))
.catch((err) => console.error(" Error de conexión:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
