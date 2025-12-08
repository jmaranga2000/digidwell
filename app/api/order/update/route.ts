import { NextRequest, NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";

export async function POST(req: NextRequest) {
  const { id, updates } = await req.json();
  const index = mockOrders.findIndex(order => order.id === id);

  if (index === -1) {
    return NextResponse.json({ success: false, error: "Order not found" });
  }

  mockOrders[index] = { ...mockOrders[index], ...updates };
  return NextResponse.json({ success: true, order: mockOrders[index] });
}
