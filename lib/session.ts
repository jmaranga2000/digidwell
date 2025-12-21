// lib/session.ts
import { cookies } from "next/headers";
import prisma from "./prisma";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "ADMIN" | "CUSTOMER";
}

// Get session cookie value
export function getSessionToken(): string | null {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session_token"); // ensure this matches your login cookie
    return sessionCookie?.value ?? null;
  } catch (error) {
    console.error("Error getting session token:", error);
    return null;
  }
}

// Require user authentication
export async function requireAuth(): Promise<AuthUser> {
  const token = getSessionToken();
  if (!token) {
    throw new Error("Unauthenticated: session token missing");
  }

  const user = await prisma.user.findUnique({
    where: { sessionToken: token },
  });

  if (!user) {
    throw new Error("Unauthenticated: user not found");
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
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

// Optional helper to check if user is customer
export async function requireCustomer(): Promise<AuthUser> {
  const user = await requireAuth();
  if (user.role !== "CUSTOMER") {
    throw new Error("Unauthorized: customer access required");
  }
  return user;
}