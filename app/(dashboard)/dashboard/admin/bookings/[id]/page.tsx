"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BookingCard from "@/app/(dashboard)/components/BookingCard";

type Booking = {
  id: string;
  service: { id: string; title: string; price: number };
  user: { id: string; name: string | null; email: string };
  status: "pending" | "confirmed" | "completed" | "cancelled";
  note?: string;
  date?: string;
};

export default function AdminBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState<Booking["status"]>("pending");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/services/booking/${id}`);
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setBooking(data.booking);
        setStatus(data.booking?.status || "pending");
      } catch {
        toast.error("Could not load booking");
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  const handleUpdate = async () => {
    if (!booking) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/services/booking/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setBooking(updated.booking);
      toast.success("Booking status updated!");
    } catch {
      toast.error("Failed to update booking");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading booking...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Booking Details</h1>

      <BookingCard
        id={booking.id}
        serviceTitle={booking.service.title}
        customerName={booking.user.name || booking.user.email}
        customerEmail={booking.user.email}
        status={status}
        onUpdate={(newStatus) => setStatus(newStatus)}
      />

      {booking.note && (
        <p className="mt-2">
          <strong>Note:</strong> {booking.note}
        </p>
      )}
      {booking.date && (
        <p>
          <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <Button onClick={handleUpdate} disabled={updating} className="btn-primary">
          {updating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}