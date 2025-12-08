"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PayWithMpesaProps {
  bookingId: string;
  amount: number;
  onPaymentSuccess?: () => void;
}

export default function PayWithMpesa({ bookingId, amount, onPaymentSuccess }: PayWithMpesaProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Initiate MPesa payment
      const res = await fetch("/api/payments/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, amount, phoneNumber: phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "MPesa payment failed.");
        return;
      }

      const { paymentId } = data;

      // Step 2: Confirm payment (mock)
      const confirmRes = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, paymentId }),
      });

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        toast.error(confirmData.error || "Failed to confirm payment.");
        return;
      }

      toast.success("Payment successful!");
      onPaymentSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h3 className="text-xl font-bold">Pay KSh {amount}</h3>

      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700"
      />

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white hover:bg-green-700"
      >
        {loading ? "Processing..." : "Pay with MPesa"}
      </Button>
    </div>
  );
}
