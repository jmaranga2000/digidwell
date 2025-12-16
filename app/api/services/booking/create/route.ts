import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { serviceId, phone, amountPaid } = body;

    if (!serviceId) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        serviceId,
        userId: user.id,
        phone: phone || null,
        amountPaid: amountPaid || null,
        status: "PENDING",
      },
      include: {
        service: { include: { category: true, subCategory: true } },
        user: true,
      },
    });

    return NextResponse.json({ booking });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}