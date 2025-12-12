"use client";

import { toast } from "@/components/ui/sonner";

export function useMpesaPayment() {
  const [loading, setLoading] = useState(false);

  async function startPayment({
    amount,
    phone,
    serviceId,
  }: {
    amount: number;
    phone: string;
    serviceId: string;
  }) {
    try {
      setLoading(true);

      const res = await fetch("/api/payments/mpesa", {
        method: "POST",
        body: JSON.stringify({ amount, phone, serviceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Payment failed");
        return;
      }

      toast.success("STK Push sent. Enter PIN on your phone.");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return { startPayment, loading };
}
