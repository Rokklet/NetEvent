import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IComment {
    evento: mongoose.Types.ObjectId;
    autor: mongoose.Types.ObjectId;
    texto: string;
    fecha: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        evento: {
            type: Schema.Types.ObjectId, ref: "Event", required: true
        },
        autor: {
            type: Schema.Types.ObjectId, ref: "User",required: true
        },
        texto: {
            type: String, required: true
        },
    },
    {timestamps: true}
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
