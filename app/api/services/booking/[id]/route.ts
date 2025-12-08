import { NextRequest, NextResponse } from "next/server";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  notes?: string;
};

// Mock bookings data
let bookings: Booking[] = [
  {
    id: "1",
    serviceTitle: "Software Installation",
    customerName: "Jane Doe",
    customerEmail: "jane@example.com",
    status: "Pending",
    notes: "Please install latest version.",
  },
  {
    id: "2",
    serviceTitle: "Graphic Design",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    status: "Confirmed",
    notes: "Need logo for new product.",
  },
];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const booking = bookings.find((b) => b.id === params.id);
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  return NextResponse.json({ booking });
}

// Optional: PATCH to update status or notes
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const bookingIndex = bookings.findIndex((b) => b.id === params.id);
  if (bookingIndex === -1) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  bookings[bookingIndex] = { ...bookings[bookingIndex], ...body };

  return NextResponse.json({ booking: bookings[bookingIndex] });
}
