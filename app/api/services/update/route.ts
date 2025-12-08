// app/api/services/update/route.ts
import { NextResponse } from "next/server";
import { mockServices } from "../mockdata";

export async function PUT(req: Request) {
  const { id, title, description, price } = await req.json();

  if (!id || !title || !description || !price) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  mockServices[index] = { id, title, description, price };

  return NextResponse.json({ service: mockServices[index], message: "Service updated successfully" });
}
