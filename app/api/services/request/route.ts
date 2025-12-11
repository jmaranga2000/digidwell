import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { serviceId, customerId, notes } = await req.json();

  if (!serviceId || !customerId) {
    return NextResponse.json({ error: "Missing serviceId or customerId" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: { serviceId, customerId, notes, status: "Pending" },
  });

  return NextResponse.json(booking);
}
