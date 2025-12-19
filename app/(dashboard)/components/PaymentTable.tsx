"use client";

import { AdminPayment } from "@/types/payment";

interface PaymentTableProps {
  payments: AdminPayment[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Service</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="px-4 py-3">{payment.serviceTitle}</td>
              <td className="px-4 py-3">{payment.phone ?? "—"}</td>
              <td className="px-4 py-3">
                {payment.amount !== undefined
                  ? `KES ${payment.amount.toLocaleString()}`
                  : "—"}
              </td>
              <td className="px-4 py-3 font-medium">
                <span
                  className={
                    payment.status === "SUCCESS"
                      ? "text-green-600"
                      : payment.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}