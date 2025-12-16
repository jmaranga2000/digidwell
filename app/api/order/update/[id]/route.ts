import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await requireAdmin();
  const { status } = await req.json();

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ booking });
}