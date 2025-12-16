import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export async function GET() {
  try {
    // Authenticate the user
    const user = await requireAuth();

    // Fetch only this user's bookings
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });

    const formatted = bookings.map((b) => ({
      id: b.id,
      serviceTitle: b.service.title,
      status: b.status,
      createdAt: b.createdAt,
    }));

    return NextResponse.json({ bookings: formatted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}