import { NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";

export async function GET() {
  return NextResponse.json({ success: true, orders: mockOrders });
}
