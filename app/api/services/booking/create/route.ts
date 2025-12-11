import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { serviceId, notes } = await req.json();

  if (!serviceId)
    return NextResponse.json({ error: "Missing serviceId" }, { status: 400 });

  const booking = await prisma.booking.create({
    data: {
      serviceId,
      customerId: user.id,
      notes,
      status: "Pending",
    },
  });

  return NextResponse.json(booking);
}
