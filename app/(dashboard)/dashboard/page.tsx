"use client";

import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import BookingCard from "../components/BookingCard";
import OrderItem from "../components/OrderItem";
import PaymentTable from "../components/PaymentTable";


type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

type Order = {
  id: string;
  serviceTitle: string;
  customerName: string;
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const [bookingsRes, ordersRes, paymentsRes] = await Promise.all([
        fetch("/api/customer/bookings"),
        fetch("/api/customer/orders"),
        fetch("/api/customer/payments"),
      ]);

      const bookingsData = await bookingsRes.json();
      const ordersData = await ordersRes.json();
      const paymentsData = await paymentsRes.json();

      setBookings(bookingsData.bookings || []);
      setOrders(ordersData.orders || []);
      setPayments(paymentsData.payments || []);
    } catch (error) {
      console.error("Failed to load customer dashboard data", error);
    }
  };

  return (
    <div className="space-y-12 p-6">
      {/* Stats */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard title="Total Bookings" value={bookings.length} />
          <StatsCard title="Orders" value={orders.length} />
          <StatsCard title="Payments" value={payments.length} />
        </div>
      </section>

      {/* My Bookings */}
      <section>
        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
        <div className="space-y-4">
          {bookings.length ? (
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                {...booking}
              />
            ))
          ) : (
            <p className="text-muted-foreground">You have no bookings yet.</p>
          )}
        </div>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="space-y-4">
          {orders.length ? (
            orders.map((order) => (
              <OrderItem key={order.id} {...order} />
            ))
          ) : (
            <p className="text-muted-foreground">No orders found.</p>
          )}
        </div>
      </section>

      {/* Payments */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Payment History</h2>
        {payments.length ? (
          <PaymentTable payments={payments} />
        ) : (
          <p className="text-muted-foreground">No payments recorded.</p>
        )}
      </section>
    </div>
  );
}