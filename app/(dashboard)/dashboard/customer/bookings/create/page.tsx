"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export default function CreateBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("serviceId");

  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch service details if serviceId is provided
  useEffect(() => {
    if (!serviceId) return;

    fetch(`/api/services/${serviceId}`)
      .then(res => res.json())
      .then(data => setService(data.service))
      .catch(() => setError("Failed to load service."));
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError("Please select a booking date.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/services/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          date,
          note,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create booking.");
        setLoading(false);
        return;
      }

      router.push("/dashboard/customer/bookings");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!serviceId) return <p className="p-6">No service selected.</p>;
  if (!service) return <p className="p-6">Loading service details...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Book Service: {service.title}</h1>
      <p className="text-gray-600">{service.description}</p>
      <p className="font-semibold">Price: KES {service.price.toLocaleString()}</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block font-medium mb-1">Booking Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Note</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special requests or instructions..."
            className="h-24"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-2"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
}