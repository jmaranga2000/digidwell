"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  note: string;
  date: string;
  service: { id: string; title: string; description: string; price: number };
};

export default function CustomerBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);

  // Fetch booking details
  const fetchBooking = async () => {
    const res = await fetch(`/api/services/booking/${id}`);
    const data = await res.json();
    setBooking(data);
  };

  useEffect(() => {
    if (id) fetchBooking();
  }, [id]);

  // Cancel booking
  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    await fetch(`/api/services/booking/delete/${id}`, { method: "DELETE" });
    alert("Booking cancelled successfully.");
    setBooking(null);
  };

  if (!booking) return <p className="p-6">Loading or booking not found...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{booking.service.title}</h1>
      <p className="mb-2">{booking.service.description}</p>
      <p className="mb-2 font-semibold">Price: ${booking.service.price.toFixed(2)}</p>
      <p className="mb-2">Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p className="mb-4">Note: {booking.note}</p>

      <Button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleCancel}
      >
        Cancel Booking
      </Button>
    </div>
  );
}
