import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  await requireAdmin();

  const bookings = await prisma.booking.findMany({
    include: { service: true, user: true },
  });

  return NextResponse.json({ bookings });
}