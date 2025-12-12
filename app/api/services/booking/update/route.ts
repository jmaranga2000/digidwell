// app/api/services/booking/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId, status } = await req.json();
  if (!bookingId || !status) return NextResponse.json({ error: "Missing" }, { status: 400 });

  const updated = await prisma.booking.update({ where: { id: bookingId }, data: { status } });
  return NextResponse.json({ booking: updated });
}
