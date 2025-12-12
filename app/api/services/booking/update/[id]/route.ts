import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { status } = body;

  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ booking });
}
