import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await requireAdmin();

  await prisma.booking.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Booking deleted" });
}