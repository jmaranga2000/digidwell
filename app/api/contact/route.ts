// app/api/contact/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  // For simplicity, accept JSON with attachment URL or filename
  const { name, email, message, attachment } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: "Missing" }, { status: 400 });
  const contact = await prisma.contact.create({ data: { name, email, message, attachment } });
  return NextResponse.json({ contact }, { status: 201 });
}
