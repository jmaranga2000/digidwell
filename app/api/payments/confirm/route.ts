import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { confirmPayment } from "@/lib/mpesa/confirmPayment";

export async function POST(req: Request) {
  try {
    const callbackData = await req.json();
    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;

    const payment = await prisma.payment.findUnique({ where: { checkoutRequestId: CheckoutRequestID } });
    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

    let status = ResultCode === 0 ? "SUCCESS" : "FAILED";
    let amountPaid = 0;

    if (status === "SUCCESS") {
      const amountItem = CallbackMetadata?.Item?.find((i: any) => i.Name === "Amount");
      amountPaid = amountItem?.Value || 0;
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: { status, amount: amountPaid, resultCode: ResultCode, resultDesc: ResultDesc },
    });

    // Optionally update booking status
    if (status === "SUCCESS") {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: "CONFIRMED", amountPaid },
      });
    }

    return NextResponse.json({ updatedPayment });
  } catch (err: unknown) {
      if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
      return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
    }
  }