import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export async function GET() {
  try {
    const user = await requireAuth();

    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          userId: user.id,
        },
      },
      include: {
        booking: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = payments.map((p) => ({
      id: p.id,
      phone: p.phone,
      amount: p.amountPaid,
      status: p.status,
      serviceTitle: p.booking.service.title,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ payments: formatted });
  } catch (error) {
    console.error("Payments fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}