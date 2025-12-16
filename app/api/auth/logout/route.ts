import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  cookies().set("session", "", { maxAge: 0 });
  return res;
}