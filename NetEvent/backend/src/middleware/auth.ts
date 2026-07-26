import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// verificar el token
export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new AppError("No autorizado: falta token",401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as { id: string; role: string }; // Guarda datos del usuario
    next();
  } catch {
    next(
      new AppError("Token inválido", 401));
  }
};

// verificar roles
export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Usuario no autenticado", 401);

    if (!roles.includes(req.user.role)) throw new AppError("No tienes permisos para realizar esta acción");

    next();
  };
};
