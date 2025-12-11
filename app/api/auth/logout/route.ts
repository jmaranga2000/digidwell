import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
