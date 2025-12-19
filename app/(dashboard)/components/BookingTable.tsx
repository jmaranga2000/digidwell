"use client";

import { AdminBooking, BookingStatus } from "@/app/dashboard/admin/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface BookingTableProps {
  bookings: AdminBooking[];
  setBookings?: React.Dispatch<React.SetStateAction<AdminBooking[]>>;
}

export default function BookingTable({ bookings, setBookings }: BookingTableProps) {
  const changeStatus = async (id: string, status: BookingStatus) => {
    try {
      const res = await fetch("/api/services/bookings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });
      if (!res.ok) throw new Error("Failed to update booking");

      if (setBookings) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`/api/services/bookings/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");

      if (setBookings) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="px-4 py-2">{b.service.title}</td>
              <td className="px-4 py-2">{b.user.name || "No Name"}</td>
              <td className="px-4 py-2">{b.user.email}</td>
              <td className="px-4 py-2">
                <Select
                  value={b.status}
                  onChange={(e) =>
                    changeStatus(b.id, e.target.value as BookingStatus)
                  }
                  className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-input text-foreground"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <Button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}