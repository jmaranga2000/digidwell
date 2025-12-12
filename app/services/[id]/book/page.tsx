"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface BookingResponse {
  booking: any;
  stkResponse: any;
}

export default function BookServicePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch service details
  useEffect(() => {
    async function fetchService() {
      const res = await fetch(`/api/services/${id}`);
      const data = await res.json();
      setService(data);
    }
    fetchService();
  }, [id]);

  // Handle booking + payment
  async function handleBooking() {
    if (!phone) return toast.error("Please enter your phone number");

    setLoading(true);
    try {
      const res = await fetch("/api/services/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: id, phone }),
      });

      const data: BookingResponse = await res.json();

      if (res.ok) {
        toast.success("STK Push sent! Please complete payment on your phone.");
        console.log("STK Response:", data.stkResponse);
        // Optionally redirect to booking list or confirmation page
      } else {
        toast.error(data.stkResponse?.error || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Booking failed due to network error");
    } finally {
      setLoading(false);
    }
  }

  if (!service) return <p>Loading service...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background text-foreground rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="mb-4">{service.description}</p>
      <p className="font-semibold mb-4">Price: KES {service.price}</p>

      <Input
        type="tel"
        placeholder="Enter your phone number"
        className="w-full mb-4 p-2 border border-border rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button
        onClick={handleBooking}
        disabled={loading}
        className="bg-primary text-black font-semibold px-4 py-2 rounded hover:bg-primary/90"
      >
        {loading ? "Processing..." : "Book & Pay"}
      </Button>

      <Toaster richColors position="top-right" />
    </div>
  );
}
