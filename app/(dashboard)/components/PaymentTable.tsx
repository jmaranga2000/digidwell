"use client";

import { Payment } from "@/types/payment";

interface PaymentTableProps {
  payments: Payment[];
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
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-3">{p.serviceTitle}</td>
              <td className="px-4 py-3">{p.phone ?? "—"}</td>
              <td className="px-4 py-3">
                {p.amount ? `KES ${p.amount.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3 font-medium">
                <span
                  className={
                    p.status === "SUCCESS"
                      ? "text-green-600"
                      : p.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}