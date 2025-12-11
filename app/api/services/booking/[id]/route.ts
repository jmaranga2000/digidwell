import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true, customer: true },
  });

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  return NextResponse.json(booking);
}
