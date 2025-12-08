"use client";

import { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import BookingCard from "../../components/BookingCard";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

type Stats = {
  totalBookings: number;
  pending: number;
  confirmed: number;
  cancelled: number;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const fetchBookings = async () => {
    const res = await fetch("/api/services/booking/all");
    const data = await res.json();
    setBookings(data.bookings);
    updateStats(data.bookings);
  };

  const updateStats = (bookings: Booking[]) => {
    setStats({
      totalBookings: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const changeStatus = async (id: string, status: "Pending" | "Confirmed" | "Cancelled") => {
    await fetch("/api/services/booking/update", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });

    const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updatedBookings);
    updateStats(updatedBookings);
  };

  return (
    <div className="space-y-12">
      {/* Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <AdminCard title="Total Bookings" count={stats.totalBookings} />
          <AdminCard title="Pending" count={stats.pending} />
          <AdminCard title="Confirmed" count={stats.confirmed} />
          <AdminCard title="Cancelled" count={stats.cancelled} />
        </div>
      </section>

      {/* Bookings Table */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
        <div className="space-y-4">
          {bookings.length ? (
            bookings.map((booking) => (
              <div key={booking.id} className="relative">
                <BookingCard {...booking} />
                <div className="mt-2 flex gap-2">
                  <Button onClick={() => changeStatus(booking.id, "Confirmed")} className="bg-green-600">
                    Confirm
                  </Button>
                  <Button onClick={() => changeStatus(booking.id, "Pending")} className="bg-yellow-600">
                    Pending
                  </Button>
                  <Button onClick={() => changeStatus(booking.id, "Cancelled")} className="bg-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bookings available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
