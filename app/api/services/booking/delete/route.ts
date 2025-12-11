import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Booking not found or cannot delete" }, { status: 404 });
  }
}
