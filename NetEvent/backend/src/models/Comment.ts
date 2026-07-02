import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IComment {
    evento: ObjectId;
    autor: ObjectId;
    texto: string;
    fecha: Date
}

export default Comment;
