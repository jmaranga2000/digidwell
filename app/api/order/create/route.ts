import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await requireCustomer();
  const { serviceId, amount, phone } = await req.json();

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      serviceId,
      amountPaid: parseFloat(amount),
      phone,
      status: "PENDING",
    },
  });

  return NextResponse.json({ booking });
}