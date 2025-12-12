import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { initiateStkPush } from "@/lib/mpesaUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, userId } = body;

    if (!serviceId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Create a booking in the DB with PENDING status
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        userId,
        amount: service.price,
        status: "PENDING",
      },
    });

    // Initiate M-Pesa payment
    const stkResponse = await initiateStkPush({
      amount: service.price,
      phoneNumber: body.phoneNumber, // send user phone
      accountReference: `Booking-${booking.id}`,
      transactionDesc: `Payment for ${service.title}`,
    });

    // Save CheckoutRequestID for tracking
    await prisma.booking.update({
      where: { id: booking.id },
      data: { checkoutRequestId: stkResponse.CheckoutRequestID },
    });

    return NextResponse.json({
      message: "Booking created and payment initiated",
      booking,
      stkResponse,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
