import jwt from "jsonwebtoken";

export function verifyToken(token: string | undefined) {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
}
