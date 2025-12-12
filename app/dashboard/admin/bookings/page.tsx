"use client";

import { useState, useEffect } from "react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  note: string;
  date: string;
  user: { id: string; name: string | null; email: string };
  service: { id: string; title: string };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch all bookings from API
  const fetchBookings = async () => {
    const res = await fetch("/api/services/booking/all");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    await fetch(`/api/services/booking/delete/${id}`, { method: "DELETE" });
    setBookings(bookings.filter((b) => b.id !== id));
  };

  // Update booking note (example)
  const handleUpdate = async (id: string) => {
    const newNote = prompt("Enter new note:");
    if (!newNote) return;
    await fetch(`/api/services/booking/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote }),
    });
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, note: newNote } : b))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Service</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Note</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border px-2 py-1">{b.user.name || b.user.email}</td>
              <td className="border px-2 py-1">{b.service.title}</td>
              <td className="border px-2 py-1">{new Date(b.date).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{b.note}</td>
              <td className="border px-2 py-1 flex gap-2">
                <Button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleUpdate(b.id)}
                >
                  Update
                </Button>
                <Button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(b.id)}
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
