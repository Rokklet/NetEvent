import mongoose, { Schema, Document } from "mongoose";

export interface IInscription {
    evento: mongoose.Types.ObjectId;
    participante: mongoose.Types.ObjectId;
}

const InscriptionSchema = new Schema<IInscription>({
    evento: {type: Schema.Types.ObjectId, ref: "Event", required: true},
    participante: {type: Schema.Types.ObjectId, ref: "User", required:true},
    
},
{
    timestamps: true,
});

//Verificación existencia
InscriptionSchema.index(
  {evento: 1,participante: 1},
  {unique: true,}
);

export default mongoose.model<IInscription>("Inscription", InscriptionSchema);