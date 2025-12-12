import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { checkoutRequestID, resultCode, phone, amount } = data;

    // Example: Only proceed if payment was successful
    if (resultCode !== 0) {
      return NextResponse.json({ success: false, message: "Payment failed" }, { status: 400 });
    }

    // Find booking by checkoutRequestID
    const booking = await prisma.booking.findFirst({
      where: { mpesaCheckoutRequestId: checkoutRequestID },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    // Update booking status to paid
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "PAID",
        phone,
        amountPaid: amount,
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
