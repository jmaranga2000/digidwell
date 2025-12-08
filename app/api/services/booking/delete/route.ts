// app/api/services/booking/delete/route.ts
import { mockBookings } from "@/lib/mockBooking";

export async function POST(req: Request) {
  const { bookingId } = await req.json();
  const index = mockBookings.findIndex(b => b.id === bookingId);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
  }

  const deleted = mockBookings.splice(index, 1)[0];

  return new Response(JSON.stringify({ booking: deleted }), {
    headers: { "Content-Type": "application/json" },
  });
}
