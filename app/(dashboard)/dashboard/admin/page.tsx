"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AdminBookingCard from "../components/AdminBookingCard";
import { AdminBooking } from "@/types/bookings";

export default function AdminDashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || user?.publicMetadata.role !== "admin") {
      router.push("/auth/login");
    } else {
      fetchBookings();
    }
  }, [isLoaded, isSignedIn, user]);

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
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

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
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    const newNote = prompt("Enter new note:", b.note || "");
                    if (!newNote) return;
                    fetch(`/api/services/bookings/update/${b.id}`, {
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
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Update Note
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}