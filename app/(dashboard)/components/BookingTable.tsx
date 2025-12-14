"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

type Booking = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/booking/all");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      toast.error("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    try {
      const res = await fetch("/api/services/booking/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );

      toast.success(`Booking ${status.toLowerCase()} successfully!`);
    } catch {
      toast.error("Could not update status.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const statusColor = (status: Booking["status"]) =>
    status === "Confirmed"
      ? "text-green-500 font-semibold"
      : status === "Pending"
      ? "text-yellow-500 font-semibold"
      : "text-red-500 font-semibold";

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-300 text-center py-4">Loading bookings...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Customer Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Update Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {bookings.length ? (
          bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.serviceTitle}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.customerEmail}</TableCell>
              <TableCell className={statusColor(booking.status)}>
                {booking.status}
              </TableCell>
              <TableCell>
                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(booking.id, e.target.value as Booking["status"])
                  }
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-input text-foreground"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 dark:text-gray-400 py-4">
              No bookings available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}