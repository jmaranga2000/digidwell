// app/api/services/booking/list/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) return NextResponse.json({ bookings: [] });

  const bookings = await prisma.booking.findMany({ where: { customerEmail: email }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ bookings });
}
