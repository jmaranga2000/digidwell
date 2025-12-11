import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "ADMIN")
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
}
