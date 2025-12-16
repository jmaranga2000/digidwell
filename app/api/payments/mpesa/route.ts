import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import { initiatePayment } from "@/lib/mpesa/initiatePayment";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { bookingId, phone } = body;

    if (!bookingId || !phone) {
      return NextResponse.json({ error: "Booking ID and phone are required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    });

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    const paymentAmount = booking.amountPaid || parseFloat(booking.service.price || "0");

    const stkResponse = await initiatePayment({ amount: paymentAmount, phone, accountRef: booking.id });

    // Save payment as PENDING
    const payment = await prisma.payment.create({
      data: {
        phone,
        amount: paymentAmount,
        status: "PENDING",
        checkoutRequestId: stkResponse.CheckoutRequestID,
        bookingId,
      },
    });

    return NextResponse.json({ payment, stkResponse });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}