import { Request, Response, NextFunction } from "express";
import { AppError } from "../interfaces/auth.interface";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
};
