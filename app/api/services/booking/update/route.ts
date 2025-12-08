// app/api/services/booking/update/route.ts
import { mockBookings } from "@/lib/mockBooking";

export async function POST(req: Request) {
  const { bookingId, status } = await req.json();
  const booking = mockBookings.find(b => b.id === bookingId);

  if (!booking) {
    return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
  }

  booking.status = status;

  return new Response(JSON.stringify({ booking }), {
    headers: { "Content-Type": "application/json" },
  });
}
