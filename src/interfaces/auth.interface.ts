import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
  userId: string;
}

export interface AppError extends Error {
  status?: number;
}
