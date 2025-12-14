// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  try{
  const user = await getAuthUser(req);

if (!user) 
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

return NextResponse.json({ user });
} catch (error) {
  console.error("Error fetching session:", error);
  return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
}
}
