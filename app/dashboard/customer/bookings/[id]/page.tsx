"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookingCard from "@/dashboard/components/BookingCard";
import PayWithMpesa from "@/components/PayWithMpesa";
import { toast } from "sonner";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  price: number;
};

export default function CustomerBookingDetail() {
  const params = useParams();
  const bookingId = params.id as string;
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch booking info (mock API for now)
  useEffect(() => {
    async function fetchBooking() {
      setLoading(true);
      try {
        const res = await fetch(`/api/services/booking/${bookingId}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Booking not found.");
          return;
        }

        setBooking(data.booking);
      } catch (error) {
        toast.error("Failed to fetch booking.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p>Loading booking...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <BookingCard
        id={booking.id}
        serviceTitle={booking.serviceTitle}
        customerName={booking.customerName}
        customerEmail={booking.customerEmail}
        status={booking.status}
      />

      {/* Show payment only if status is confirmed and not paid (mock logic) */}
      {booking.status === "Confirmed" && (
        <PayWithMpesa
          bookingId={booking.id}
          amount={booking.price}
          onPaymentSuccess={() => {
            toast.success("Payment recorded successfully!");
            router.push("/dashboard/customer");
          }}
        />
      )}
    </div>
  );
}
