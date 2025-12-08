import { NextResponse } from "next/server";

const bookings = [
  {
    id: "1",
    serviceTitle: "Software Installation",
    customerName: "Alice",
    customerEmail: "alice@example.com",
    status: "Pending",
  },
  {
    id: "2",
    serviceTitle: "Computer Upgrade",
    customerName: "Bob",
    customerEmail: "bob@example.com",
    status: "Confirmed",
  },
  {
    id: "3",
    serviceTitle: "Graphic Design",
    customerName: "Charlie",
    customerEmail: "charlie@example.com",
    status: "Cancelled",
  },
];

export async function GET() {
  return NextResponse.json({ bookings });
}
