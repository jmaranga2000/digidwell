"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Booking } from "@/types/bookings";
import BookingCard from "../../components/BookingCard";

export default function CustomerDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/auth/login");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (user) {
      fetchCustomerData();
    }
  }, [user]);

  const fetchCustomerData = async () => {
    try {
      const res = await fetch("/api/customer/bookings");
      const data = await res.json();

      // Normalize status to match Booking type
      const normalizedBookings: Booking[] = data.bookings.map((b: any) => ({
        id: b.id,
        serviceTitle: b.serviceTitle,
        customerName: b.customerName,
        customerEmail: b.customerEmail,
        status:
          b.status === "SUCCESS" || b.status === "CONFIRMED"
            ? "Confirmed"
            : b.status === "CANCELED"
            ? "Cancelled"
            : "Pending",
      }));

      setBookings(normalizedBookings);
    } catch (error) {
      console.error("Failed to load bookings", error);
    }
  };

  return (
    <div className="space-y-12 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
        <div className="space-y-4">
          {bookings.length ? (
            bookings.map((booking) => <BookingCard key={booking.id} {...booking} />)
          ) : (
            <p className="text-muted-foreground">You have no bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}