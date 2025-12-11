import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { bookings: true },
  });
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
  return NextResponse.json(service);
}
