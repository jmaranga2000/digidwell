"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import AdminCard from "../../components/AdminCard";
import BookingTable from "../../components/BookingTable";
import { getAuthUser } from "@/lib/session";

type Stats = {
  totalBookings: number;
  pending: number;
  confirmed: number;
  cancelled: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  // Role-based access
  useEffect(() => {
    async function checkUser() {
      const user = await getAuthUser();
      if (!user) redirect("/auth/login");
      if (user.role !== "admin") redirect("/dashboard");
    }

    checkUser();
  }, []);

  // Fetch stats only (bookings handled inside BookingTable)
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/services/booking/all");
        const data = await res.json();
        const bookings = data.bookings || [];

        setStats({
          totalBookings: bookings.length,
          pending: bookings.filter((b: any) => b.status === "Pending").length,
          confirmed: bookings.filter((b: any) => b.status === "Confirmed").length,
          cancelled: bookings.filter((b: any) => b.status === "Cancelled").length,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-6 text-muted-foreground">Loading admin dashboard…</p>;
  }

  return (
    <div className="space-y-12 p-6">
      {/* Admin Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AdminCard title="Total Bookings" count={stats.totalBookings} />
          <AdminCard title="Pending" count={stats.pending} />
          <AdminCard title="Confirmed" count={stats.confirmed} />
          <AdminCard title="Cancelled" count={stats.cancelled} />
        </div>
      </section>

      {/* Booking Management */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>
        <BookingTable />
      </section>
    </div>
  );
}