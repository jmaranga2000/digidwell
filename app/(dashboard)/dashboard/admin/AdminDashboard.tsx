"use client";

import { useEffect, useState } from "react";
import AdminCard from "../../components/AdminCard";
import BookingTable from "../../components/BookingTable";
import PaymentTable from "../../components/PaymentTable";

// ----------------- Types -----------------
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

export interface AdminBooking {
  id: string;
  note?: string;
  status: BookingStatus;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  service: { id: string; title: string };
}

export interface AdminPayment {
  id: string;
  amount: number;
  phone: string;
  status: string;
  serviceTitle: string;
  createdAt: string;
}

// ----------------- Component -----------------
export default function AdminDashboard() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = {
    totalBookings: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    totalPayments: payments.length,
    totalRevenue: payments.reduce((acc, p) => acc + p.amount, 0),
  };

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const [bookingsRes, paymentsRes] = await Promise.all([
          fetch("/api/services/bookings/all"),
          fetch("/api/services/payments/admin"),
        ]);

        const bookingsData: AdminBooking[] = await bookingsRes.json();
        const paymentsData: AdminPayment[] = await paymentsRes.json();

        setBookings(bookingsData.bookings || []);
        setPayments(paymentsData.payments || []);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  if (loading) return <p className="p-6 text-muted-foreground">Loading admin dashboard…</p>;

  return (
    <div className="space-y-12 p-6">
      {/* Dashboard Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          <AdminCard title="Total Bookings" count={stats.totalBookings} />
          <AdminCard title="Pending" count={stats.pending} />
          <AdminCard title="Confirmed" count={stats.confirmed} />
          <AdminCard title="Cancelled" count={stats.cancelled} />
          <AdminCard title="Total Payments" count={stats.totalPayments} />
          <AdminCard title="Total Revenue" count={`$${stats.totalRevenue}`} />
        </div>
      </section>

      {/* Bookings Table */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>
        <BookingTable bookings={bookings} setBookings={setBookings} />
      </section>

      {/* Payments Table */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Payment Records</h2>
        <PaymentTable payments={payments} />
      </section>
    </div>
  );
}