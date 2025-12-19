"use client";

import { useState, useEffect } from "react";
import AdminBookingCard from "@/app/dashboard/components/AdminBookingCard";
import { AdminBooking } from "@/types/bookings";
import { Button } from "@/components/ui/button";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/bookings/all");
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: AdminBooking["status"]) => {
    try {
      await fetch("/api/services/bookings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (id: string, note: string) => {
    try {
      const res = await fetch(`/api/services/bookings/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, note } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await fetch(`/api/services/bookings/delete/${id}`, { method: "DELETE" });
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">All Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings available.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="relative">
              <AdminBookingCard
                {...b}
                onUpdate={(status) => updateStatus(b.id, status)}
              />
              <div className="mt-2 flex gap-2">
                <Button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    const newNote = prompt("Enter new note:", b.note || "");
                    if (!newNote) return;
                    updateNote(b.id, newNote);
                  }}
                  className="bg-yellow-500 text-white"
                >
                  Update Note
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}