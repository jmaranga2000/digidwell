// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await getCurrentUser(req);
  if (!user) return NextResponse.json({ user: null }, { status: 200 });
  const { password, ...safe } = user as any;
  return NextResponse.json({ user: safe }, { status: 200 });
}
