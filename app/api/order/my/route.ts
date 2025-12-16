import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export async function GET() {
  const user = await requireCustomer();

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { service: true },
  });

  return NextResponse.json({ bookings });
}