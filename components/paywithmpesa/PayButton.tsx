"use client";

import { useMpesaPayment } from "@/lib/useMpesaPayment";
import { Button } from "../ui/button";

interface PayButtonProps {
  amount: number;
  phone: string;
  serviceId: string;
}

export default function PayButton({ amount, phone, serviceId }: PayButtonProps) {
  const { startPayment, loading } = useMpesaPayment();

  return (
    <Button
      onClick={() => startPayment({ amount, phone, serviceId })}
      disabled={loading}
      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay with M-Pesa"}
    </Button>
  );
}
