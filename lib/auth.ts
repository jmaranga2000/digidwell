// lib/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    return user || null;
  } catch (err) {
    return null;
  }
}

// Optional: Middleware for API protection
import type { User } from "@prisma/client";

export function requireAuth(
  handler: (req: NextRequest, user: User, ...args: unknown[]) => Promise<Response>
) {
  return async (req: NextRequest, ...args: unknown[]) => {
    const user = await getCurrentUser(req);
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    return handler(req, user, ...args);
  };
}
