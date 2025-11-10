import mongoose from "mongoose";

const charlaSchema = new mongoose.Schema({
  titulo: String,
  encargado: String,
  horaInicio: String,
  horaFin: String,
});

const eventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  ubicacion: String,
  fecha: Date,
  categorias: [String],
  imagenes: [String],
  organizador: String, // más adelante referenciará a Usuario
  charlas: [charlaSchema],
});

export default mongoose.model("Evento", eventoSchema);
