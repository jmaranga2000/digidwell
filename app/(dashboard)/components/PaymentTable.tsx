"use client";

import { Payment } from "@/types/payments";


interface PaymentTableProps {
  payments: Payment[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
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
              <td className="px-4 py-3">
                {payment.serviceTitle ?? "—"}
              </td>
              <td className="px-4 py-3">{payment.phone}</td>
              <td className="px-4 py-3">KES {payment.amount}</td>
              <td className="px-4 py-3 font-medium">
                {payment.status}
              </td>
              <td className="px-4 py-3">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}