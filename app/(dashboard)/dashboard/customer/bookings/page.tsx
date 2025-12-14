"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  note: string;
  date: string;
  service: { id: string; title: string; price: number };
};

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/services/booking/list")
      .then(res => res.json())
      .then(data => setBookings(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    await fetch(`/api/services/booking/delete/${id}`, { method: "DELETE" });
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  if (loading) return <p className="p-6">Loading bookings...</p>;
  if (!bookings.length) return <p className="p-6">You have no bookings yet.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="space-y-3">
        {bookings.map(b => (
          <div
            key={b.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => router.push(`/dashboard/customer/bookings/${b.id}`)}
          >
            <div>
              <p className="font-semibold">{b.service.title}</p>
              <p className="text-gray-500">{new Date(b.date).toLocaleDateString()}</p>
            </div>
            <Button
              onClick={e => {
                e.stopPropagation();
                handleCancel(b.id);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Cancel
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}