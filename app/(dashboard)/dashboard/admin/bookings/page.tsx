"use client";

import { useState, useEffect } from "react";
import BookingCard from "@/app/dashboard/components/BookingCard";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  note: string;
  date: string;
  user: { id: string; name: string | null; email: string };
  service: { id: string; title: string };
  status: "Pending" | "Confirmed" | "Cancelled";
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/booking/all");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data: Booking[] = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const changeStatus = async (id: string, status: Booking["status"]) => {
    try {
      const res = await fetch("/api/services/booking/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, status }),
      });
      if (!res.ok) throw new Error("Failed to update booking");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`/api/services/booking/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
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
              <BookingCard
                id={b.id}
                serviceTitle={b.service.title}
                customerName={b.user.name || b.user.email}
                customerEmail={b.user.email}
                status={b.status}
                onUpdate={(status) => changeStatus(b.id, status)}
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
                    const newNote = prompt("Enter new note:", b.note);
                    if (!newNote) return;
                    fetch(`/api/services/booking/update/${b.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ note: newNote }),
                    }).then((res) => {
                      if (res.ok) {
                        setBookings((prev) =>
                          prev.map((bk) =>
                            bk.id === b.id ? { ...bk, note: newNote } : bk
                          )
                        );
                      }
                    });
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