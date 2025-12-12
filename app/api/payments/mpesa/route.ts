import { NextRequest, NextResponse } from "next/server";
import { stkPush } from "@/lib/mpesa.utils";

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, accountReference, transactionDesc } = await req.json();
    const response = await stkPush(phone, amount, accountReference, transactionDesc);
    return NextResponse.json({ success: true, data: response });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to initiate M-Pesa payment" }, { status: 500 });
  }
}
