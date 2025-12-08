"use client";

import { Button } from "@/components/ui/button";

type BookingCardProps = {
  id: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  onUpdate?: (newStatus: "Pending" | "Confirmed" | "Cancelled") => void;
};

export default function BookingCard({
  serviceTitle,
  customerName,
  customerEmail,
  status,
  onUpdate,
}: BookingCardProps) {
  // Map status to theme colors
  const statusColor =
    status === "Confirmed"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-card text-card-foreground p-4 rounded-2xl shadow flex justify-between items-center">
      {/* Booking Details */}
      <div>
        <h4 className="font-semibold text-primary">{serviceTitle}</h4>
        <p className="text-muted-foreground">{customerName}</p>
        <p className="text-muted-foreground">{customerEmail}</p>
      </div>

      {/* Actions & Status */}
      <div className="flex flex-col items-end gap-2">
        <p className={`font-semibold ${statusColor}`}>{status}</p>

        {onUpdate && (
          <select
            value={status}
            onChange={(e) =>
              onUpdate?.(e.target.value as "Pending" | "Confirmed" | "Cancelled")
            }
            className="px-2 py-1 rounded border border-border bg-input text-foreground"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )}
      </div>
    </div>
  );
}
