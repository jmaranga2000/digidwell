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
      if (!res.ok) throw new Error(data.error || "Failed");

      // Update local state
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

  const statusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "text-green-500 font-semibold";
      case "Pending":
        return "text-yellow-500 font-semibold";
      case "Cancelled":
        return "text-red-500 font-semibold";
      default:
        return "";
    }
  };

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
                    updateStatus(
                      booking.id,
                      e.target.value as Booking["status"]
                    )
                  }
                  className="px-2 py-1 rounded border border-border bg-input text-foreground"
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
            <TableCell colSpan={5} className="text-center text-gray-500">
              No bookings available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
