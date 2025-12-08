import { NextRequest, NextResponse } from "next/server";

// Mock confirm payment API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, paymentId } = body;

    // Normally: update payment status in DB
    console.log(`Payment confirmed for booking ${bookingId}, paymentId: ${paymentId}`);

    return NextResponse.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to confirm payment" }, { status: 500 });
  }
}
