import { NextRequest, NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newOrder = { id: Date.now().toString(), ...data };
  mockOrders.push(newOrder);

  return NextResponse.json({ success: true, order: newOrder });
}
