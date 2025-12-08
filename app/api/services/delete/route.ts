// app/api/services/delete/route.ts
import { NextResponse } from "next/server";
import { mockServices } from "../mockdata";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const deleted = mockServices.splice(index, 1);

  return NextResponse.json({ service: deleted[0], message: "Service deleted successfully" });
}
