import { NextResponse } from "next/server";

let bookings = [
  {
    id: "1",
    serviceTitle: "Software Installation",
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    status: "Pending",
    notes: "Please install ASAP",
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const newBooking = {
    id: (bookings.length + 1).toString(),
    serviceTitle: body.serviceTitle || "Unknown Service",
    customerName: body.fullName,
    customerEmail: body.customerEmail,
    status: "Pending",
    notes: body.notes || "",
  };

  bookings.push(newBooking);

  return NextResponse.json({ booking: newBooking });
}
