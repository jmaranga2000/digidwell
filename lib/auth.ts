// lib/auth.ts
import prisma from "./prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const TOKEN_EXPIRES = "7d";

// Hash password before saving
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Compare password on login
export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
}

// Verify JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (err) {
    return null;
  }
}

// Extract current user from cookie
export async function getCurrentUser() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    return user || null;
  } catch (err) {
    return null;
  }
}
