import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export function requireAuth(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  return payload;
}

export function protectRoute(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}
