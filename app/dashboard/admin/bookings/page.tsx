"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";
import Topbar from "@/app/dashboard/components/Topbar";
import BookingCard from "@/app/dashboard/components/BookingCard";
import AdminCard from "@/app/dashboard/components/AdminCard";
import { toast } from "sonner";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

type Stats = {
  totalBookings: number;
  confirmed: number;
  pending: number;
  cancelled: number;
};

export default function AdminBookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  });

  // Fetch bookings (mock API)
  useEffect(() => {
    fetch("/api/services/booking/all")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings);
        calculateStats(data.bookings);
      });
  }, []);

  const calculateStats = (bookings: Booking[]) => {
    setStats({
      totalBookings: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    });
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Booking["status"]) => {
    try {
      const res = await fetch("/api/services/booking/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Failed to update booking status.");

      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus } : b
      );
      setBookings(updated);
      calculateStats(updated);

      toast.success(`Booking ${newStatus.toLowerCase()} successfully!`);
    } catch {
      toast.error("Unexpected error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-12">
          {/* Stats */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Bookings Overview</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <AdminCard title="Total Bookings" count={stats.totalBookings} description="All bookings received" />
              <AdminCard title="Pending" count={stats.pending} description="Awaiting confirmation" />
              <AdminCard title="Confirmed" count={stats.confirmed} description="Confirmed bookings" />
              <AdminCard title="Cancelled" count={stats.cancelled} description="Cancelled bookings" />
            </div>
          </section>

          {/* All bookings */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
            <div className="space-y-6">
              {bookings.length ? (
                bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    id={booking.id}
                    serviceTitle={booking.serviceTitle}
                    customerName={booking.customerName}
                    customerEmail={booking.customerEmail}
                    status={booking.status}
                    onUpdate={(newStatus) => updateBookingStatus(booking.id, newStatus)}
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-300">No bookings available.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
