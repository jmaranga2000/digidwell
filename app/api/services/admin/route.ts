import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  await requireAdmin();

  const services = await prisma.service.findMany({
    include: {
      subServices: true,
      bookings: true,
    },
  });

  return NextResponse.json({ services });
}