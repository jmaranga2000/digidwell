import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const updates = await req.json();

  try {
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: updates,
    });
    return NextResponse.json(booking);
  } catch (err) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
}
