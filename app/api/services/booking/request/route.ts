import { NextResponse } from "next/server";
import { mockBookings } from "../mockdata";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const { serviceTitle, customerName, customerEmail } = await req.json();

  if (!serviceTitle || !customerName || !customerEmail) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const newBooking = {
    id: uuid(),
    serviceTitle,
    customerName,
    customerEmail,
    status: "Pending",
  };

  mockBookings.push(newBooking);

  return NextResponse.json({ booking: newBooking, message: "Booking created successfully" });
}
