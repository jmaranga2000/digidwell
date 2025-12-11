import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customerId");

  const whereClause = customerId ? { customerId } : undefined;

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    include: { service: true },
  });

  return NextResponse.json({ bookings });
}
