"use client";

import { Select } from "@/components/ui/select";
import { Booking } from "@/types/bookings";


interface BookingCardProps extends Booking {
  onUpdate?: (newStatus: "Pending" | "Confirmed" | "Cancelled") => void;
}

export default function BookingCard({
  serviceTitle,
  customerName,
  customerEmail,
  status,
  onUpdate,
}: BookingCardProps) {
  const statusColor =
    status === "Confirmed"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-white dark:bg-gray-800 text-foreground p-4 rounded-2xl shadow flex justify-between items-center">
      {/* Booking Details */}
      <div>
        <h4 className="font-semibold text-lg text-primary">{serviceTitle}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-300">{customerName}</p>
        <p className="text-sm text-gray-400 dark:text-gray-400">{customerEmail}</p>
      </div>

      {/* Actions & Status */}
      <div className="flex flex-col items-end gap-2">
        <p className={`font-semibold ${statusColor}`}>{status}</p>

        {onUpdate && (
          <Select
            value={status}
            onChange={(e) =>
              onUpdate(e.target.value as "Pending" | "Confirmed" | "Cancelled")
            }
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-input text-foreground"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
        )}
      </div>
    </div>
  );
}