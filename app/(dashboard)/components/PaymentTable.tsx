"use client";

import { Table } from "@/components/ui/table";

interface Payment {
  id: string;
  phone: string;
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  serviceTitle: string;
  createdAt: string;
}

export default function PaymentTable({ payments }: { payments: Payment[] }) {
  const statusColor = (status: Payment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-600";
      case "PENDING":
        return "text-yellow-500";
      case "FAILED":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <Table className="w-full text-left text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-4">Phone</th>
            <th className="p-4">Service</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr
              key={p.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-4">{p.phone}</td>
              <td className="p-4">{p.serviceTitle}</td>
              <td className="p-4 font-semibold">KSh {p.amount}</td>
              <td className={`p-4 font-semibold ${statusColor(p.status)}`}>
                {p.status}
              </td>
              <td className="p-4">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}