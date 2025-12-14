"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  note: string;
  date: string;
  service: { id: string; title: string; description: string; price: number };
};

export default function CustomerBookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/services/booking/${id}`)
      .then(res => res.json())
      .then(data => setBooking(data));
  }, [id]);

  const handleCancel = async () => {
    if (!confirm("Cancel this booking?")) return;
    await fetch(`/api/services/booking/delete/${id}`, { method: "DELETE" });
    router.push("/dashboard/customer/bookings");
  };

  if (!booking) return <p className="p-6">Loading booking details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <Button
        onClick={() => router.push("/dashboard/customer/bookings")}
        className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
      >
        &larr; Back
      </Button>
      <h1 className="text-3xl font-bold">{booking.service.title}</h1>
      <p>{booking.service.description}</p>
      <p className="font-semibold">Price: KES {booking.service.price.toLocaleString()}</p>
      <p>Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p>Note: {booking.note}</p>
      <Button onClick={handleCancel} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Cancel Booking
      </Button>
    </div>
  );
}