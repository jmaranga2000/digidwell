"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mockSession } from "@/lib/mockSession";

export default function BookServicePage() {
  const params = useParams();
  const serviceId = params.id as string;

  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto-fill session values
  useEffect(() => {
    const session = mockSession.getSession();
    if (session) {
      setForm((prev) => ({
        ...prev,
        fullName: session.name || "",
        email: session.email || "",
      }));
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const newBooking = {
        id: Date.now().toString(),
        serviceId,
        serviceTitle: `Service ${serviceId}`,
        customerName: form.fullName,
        customerEmail: form.email,
        notes: form.notes,
        status: "Pending",
      };

      toast.success("Booking successful! Proceeding to payment...");

      setTimeout(() => {
        newBooking.status = "Confirmed";
        toast.success("Payment successful! Booking confirmed.");
        setLoading(false);

        router.push("/dashboard/customer");
      }, 1500);

    } catch (error) {
      toast.error("Unexpected error. Please try again later.");
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Book Service</h1>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Booking service ID: <span className="font-semibold">{serviceId}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
      >
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <Input
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Additional Notes</label>
          <Textarea
            name="notes"
            placeholder="Optional details..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full py-2">
          {loading ? "Processing..." : "Book & Pay"}
        </Button>
      </form>
    </div>
  );
}
