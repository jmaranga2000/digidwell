import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
  return NextResponse.json({ service });
}
