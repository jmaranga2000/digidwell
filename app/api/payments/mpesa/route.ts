import { NextRequest, NextResponse } from "next/server";

// Mock MPESA payment API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, amount } = body;

    if (!bookingId || !amount) {
      return NextResponse.json({ error: "Booking ID and amount are required" }, { status: 400 });
    }

    // Simulate a delay for payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return a successful payment response
    return NextResponse.json({
      success: true,
      message: `Payment of KSh ${amount} for booking ${bookingId} completed successfully.`,
      transactionId: `MPESA-${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Payment failed. Try again." }, { status: 500 });
  }
}
