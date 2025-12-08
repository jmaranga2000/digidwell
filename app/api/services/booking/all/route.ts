import { NextResponse } from "next/server";
import { mockBookings } from "@/lib/mockBookings";

export async function GET() {
  return NextResponse.json({ success: true, bookings: mockBookings });
}
