"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  service: { title: string; price: number };
  name: string;
  email: string;
  status: string;
};

export default function AdminBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      const res = await fetch(`/api/services/booking/${id}`);
      const data = await res.json();
      setBooking(data.booking);
      setStatus(data.booking?.status || "");
      setLoading(false);
    }
    fetchBooking();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/services/booking/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) alert("Booking status updated!");
  };

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Booking not found</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">Booking Management</h1>
      <p>
        <strong>Service:</strong> {booking.service.title}
      </p>
      <p>
        <strong>Price:</strong> ${booking.service.price.toFixed(2)}
      </p>
      <p>
        <strong>Customer:</strong> {booking.name} ({booking.email})
      </p>
      <p>
        <strong>Status:</strong>
      </p>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input-field"
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <Button onClick={handleUpdate} className="btn-primary">
        Update Status
      </Button>
    </div>
  );
}
