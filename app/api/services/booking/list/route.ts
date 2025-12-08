// app/api/services/booking/list/route.ts
import { mockBookings } from "@/lib/mockBooking";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  const bookings = email
    ? mockBookings.filter(b => b.customerEmail === email)
    : mockBookings;

  return new Response(JSON.stringify({ bookings }), {
    headers: { "Content-Type": "application/json" },
  });
}
