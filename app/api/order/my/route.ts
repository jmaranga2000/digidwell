import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export async function GET() {
  try {
    const user = await requireAuth();

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = orders.map((o) => ({
      id: o.id,
      serviceTitle: o.service.title,
      status: o.status,
      price: o.price,
      createdAt: o.createdAt,
    }));

    return NextResponse.json({ orders: formatted });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}