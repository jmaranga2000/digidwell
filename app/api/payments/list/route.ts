import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        service: {
          select: { title: true },
        },
      },
    });

    return NextResponse.json(
      payments.map((p) => ({
        id: p.id,
        phone: p.phone,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
        serviceTitle: p.service?.title || "N/A",
      }))
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
