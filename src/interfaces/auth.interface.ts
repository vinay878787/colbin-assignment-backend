import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
  userId: string;
}
