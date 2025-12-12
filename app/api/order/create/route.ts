// app/api/order/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser(req);
  const { serviceId, amount } = await req.json();
  const order = await prisma.order.create({
    data: {
      userId: user?.id,
      serviceId,
      amount,
      status: "Pending",
    },
  });
  return NextResponse.json({ order }, { status: 201 });
}
