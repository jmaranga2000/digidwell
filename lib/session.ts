// lib/session.ts
import { cookies } from "next/headers";
import prisma from "./prisma";

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  role: "ADMIN" | "CUSTOMER";
}

// Get session cookie value
export function getSessionToken(): string | null {
try {
  const cookieStore = cookies();
  const cookie = cookieStore.get("session_token"); // change name to your session cookie name
  return cookie?.value ?? null;
} catch (error) {
  console.error("Error getting session token:", error);
  return null;
}
}

// Require user authentication
export async function requireAuth(): Promise<AuthUser> {
  const token = getSessionToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  // Look up user in database by session token
  const user = await prisma.user.findUnique({
    where: { sessionToken: token }, // make sure your User model has sessionToken
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    role: user.role as "ADMIN" | "CUSTOMER",
  };
}

// Require admin authentication
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return user;
}