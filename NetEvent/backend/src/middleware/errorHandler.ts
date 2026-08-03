import {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import mongoose from "mongoose";
import { AppError } from "../errors/AppError";
import { logError } from "../utils/logger";

interface MongoDuplicateError extends Error {
  code?: number;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logError(error, req);

  //Delegar errores de PDF a Express
  if (res.headersSent) {
  return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "El identificador proporcionado no es válido",
    });
  }

  if (
    error instanceof mongoose.Error.ValidationError
  ) {
    return res.status(400).json({
      message: "Los datos enviados no son válidos",
      errors: Object.values(error.errors).map(
        validationError => validationError.message
      ),
    });
  }

  const duplicateError =
    error as MongoDuplicateError;

  if (duplicateError.code === 11000) {
    return res.status(409).json({
      message:
        "Ya existe un registro con esos datos",
    });
  }

  return res.status(500).json({
    message:
      "Ocurrió un error interno en el servidor",
  });
};