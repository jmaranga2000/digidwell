"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminBookingCard from "@/app/dashboard/components/AdminBookingCard";
import { AdminBooking } from "@/types/bookings";

export default function AdminBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<AdminBooking | null>(null);
  const [status, setStatus] = useState<AdminBooking["status"] | "Completed">("Pending");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchBooking() {
      try {
        const res = await fetch(`/api/services/bookings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch booking");

        const data = await res.json();
        const bk: AdminBooking & { status: "Pending" | "Confirmed" | "Cancelled" | "Completed" } = data.booking;

        setBooking(bk);
        setStatus(bk.status);
      } catch (err) {
        toast.error("Could not load booking");
        console.error(err);
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
      const res = await fetch(`/api/services/bookings/update/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setBooking(updated.booking);
      toast.success("Booking status updated!");
    } catch (err) {
      toast.error("Failed to update booking");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading booking...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Booking Details</h1>

      <AdminBookingCard
        {...booking}
        onUpdate={(newStatus) => setStatus(newStatus)}
        additionalStatus={["Completed"]}
      />

      {booking.note && (
        <p>
          <strong>Note:</strong> {booking.note}
        </p>
      )}
      {booking.date && (
        <p>
          <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleUpdate}
          disabled={updating}
          className="btn-primary"
        >
          {updating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}