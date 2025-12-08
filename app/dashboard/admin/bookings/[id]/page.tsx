"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

export default function BookingDetailsPage() {
  const { id } = useParams(); // booking id from URL
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBooking = async () => {
    try {
      const res = await fetch(`/api/services/booking/${id}`);
      const data = await res.json();
      setBooking(data.booking);
    } catch {
      toast.error("Failed to fetch booking.");
    }
  };

  const handleUpdate = async () => {
    if (!booking) return;

    setLoading(true);
    try {
      const res = await fetch("/api/services/booking/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id, status: booking.status }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update");

      toast.success("Booking updated successfully!");
      router.back(); // go back to bookings table
    } catch {
      toast.error("Could not update booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div className="max-w-lg mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Booking Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Service</label>
          <Input value={booking.serviceTitle} disabled />
        </div>

        <div>
          <label className="block font-semibold mb-1">Customer Name</label>
          <Input
            value={booking.customerName}
            onChange={(e) => setBooking({ ...booking, customerName: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Customer Email</label>
          <Input
            value={booking.customerEmail}
            onChange={(e) => setBooking({ ...booking, customerEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            value={booking.status}
            onChange={(e) =>
              setBooking({ ...booking, status: e.target.value as Booking["status"] })
            }
            className="w-full px-3 py-2 rounded border border-border bg-input text-foreground"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <Button onClick={handleUpdate} disabled={loading} className="w-full py-2">
          {loading ? "Updating..." : "Update Booking"}
        </Button>
      </div>
    </div>
  );
}
