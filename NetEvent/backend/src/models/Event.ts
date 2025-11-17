import mongoose, { Schema, Document } from "mongoose";

export interface ICharla {
  persona: string;
  titulo: string;
  inicio: string; 
  fin: string;   
}

export interface IEvent extends Document {
  titulo: string;
  descripcion: string;
  fecha: Date;
  ubicacion: string;
  tags: string[];
  imagenes: string[];
  charlas: ICharla[];
  organizador: mongoose.Types.ObjectId;
}

const CharlaSchema = new Schema<ICharla>({
  persona: { type: String, required: true },
  titulo: { type: String, required: true },
  inicio: { type: String, required: true },
  fin: { type: String, required: true }
});

const EventSchema = new Schema<IEvent>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  ubicacion: { type: String, required: true },
  tags: [{ type: String }],
  imagenes: [{ type: String }],
  charlas: [CharlaSchema],
  organizador: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model<IEvent>("Event", EventSchema);
