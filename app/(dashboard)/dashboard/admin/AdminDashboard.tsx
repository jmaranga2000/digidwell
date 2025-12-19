"use client";

import { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import PaymentTable from "../../components/PaymentTable";
import { AdminPayment } from "@/types/payment";

type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

type Stats = {
  totalBookings: number;
  pending: number;
  confirmed: number;
  cancelled: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Fetch all bookings
        const bookingsRes = await fetch("/api/services/bookings/all");
        const bookingsData = await bookingsRes.json();
        const bookings = bookingsData.bookings || [];

        // Compute booking stats
        const newStats: Stats = {
          totalBookings: bookings.length,
          pending: bookings.filter((b: any) => b.status === "Pending").length,
          confirmed: bookings.filter((b: any) => b.status === "Confirmed").length,
          cancelled: bookings.filter((b: any) => b.status === "Cancelled").length,
        };
        setStats(newStats);

        // Fetch all payments
        const paymentsRes = await fetch("/api/services/payments/admin");
        const paymentsData = await paymentsRes.json();
        const paymentsList: AdminPayment[] = paymentsData.payments || [];
        setPayments(paymentsList);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-6 text-muted-foreground">Loading admin dashboard…</p>;

  return (
    <div className="space-y-12 p-6">
      {/* Booking Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AdminCard title="Total Bookings" count={stats.totalBookings} />
          <AdminCard title="Pending" count={stats.pending} />
          <AdminCard title="Confirmed" count={stats.confirmed} />
          <AdminCard title="Cancelled" count={stats.cancelled} />
        </div>
      </section>

      {/* Payment Records */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Payment Records</h2>
        {payments.length > 0 ? (
          <PaymentTable payments={payments} />
        ) : (
          <p className="text-muted-foreground">No payments recorded yet.</p>
        )}
      </section>
    </div>
  );
}