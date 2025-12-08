import { NextRequest, NextResponse } from "next/server";
import { mockOrders } from "@/lib/mockOrders";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const index = mockOrders.findIndex(order => order.id === id);
  if (index !== -1) mockOrders.splice(index, 1);

  return NextResponse.json({ success: true, message: `Order ${id} deleted.` });
}
