"use client";

import Link from "next/link";

interface PaymentResultProps {
  type: "success" | "failed";
  message: string;
  amount?: number;
  service?: string;
  txRef?: string;
}

export default function PaymentResult({
  type,
  message,
  amount,
  service,
  txRef,
}: PaymentResultProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center">

        <h1
          className={`text-3xl font-semibold mb-4 ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "success" ? "Payment Successful" : "Payment Failed"}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>

        <div className="text-left space-y-2 mb-6">
          {amount && <p><strong>Amount:</strong> Ksh {amount}</p>}
          {service && <p><strong>Service:</strong> {service}</p>}
          {txRef && <p><strong>Reference:</strong> {txRef}</p>}
        </div>

        <Link
          href="/services"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
