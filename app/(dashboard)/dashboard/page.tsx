"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import StatsCard from "../components/StatsCard";
import BookingCard from "../components/BookingCard";
import OrderItem from "../components/OrderItem";
import PaymentTable from "../components/PaymentTable";

type Booking = {
  id: string;
  serviceTitle: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

type Order = {
  id: string;
  serviceTitle: string;
  status: "Pending" | "Completed" | "Cancelled";
  price: string;
};

type Payment = {
  id: string;
  phone: string;
  amount: number;
  status: string;
  serviceTitle: string;
  createdAt: string;
};

export default function CustomerDashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/auth/login");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (user) fetchCustomerData();
  }, [user]);

  const fetchCustomerData = async () => {
    try {
      const [bookingsRes, ordersRes, paymentsRes] = await Promise.all([
        fetch("/api/services/bookings/my"),
        fetch("/api/orders/my"),
        fetch("/api/payments/my"),
      ]);

      setBookings((await bookingsRes.json()).bookings ?? []);
      setOrders((await ordersRes.json()).orders ?? []);
      setPayments((await paymentsRes.json()).payments ?? []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  return (
    <div className="space-y-12 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <StatsCard title="Bookings" value={bookings.length} />
          <StatsCard title="Orders" value={orders.length} />
          <StatsCard title="Payments" value={payments.length} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
            customerName={user?.fullName ?? "Customer"}
            customerEmail={user?.primaryEmailAddress?.emailAddress ?? ""}
          />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Payment History</h2>
        <PaymentTable payments={payments} />
      </section>
    </div>
  );
}