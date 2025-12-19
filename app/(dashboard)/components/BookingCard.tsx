"use client";

import { Select } from "@/components/ui/select";
import { CustomerBooking, BookingStatus } from "@/types/bookings";

interface BookingCardProps extends CustomerBooking {
  onUpdate?: (newStatus: BookingStatus) => void;
}

export default function BookingCard({
  serviceTitle,
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex justify-between items-center">
      {/* Booking Details */}
      <div>
        <h4 className="font-semibold text-lg text-primary">
          {serviceTitle}
        </h4>
      </div>

      {/* Status / Actions */}
      <div className="flex flex-col items-end gap-2">
        <p className={`font-semibold ${statusColor}`}>{status}</p>

        {onUpdate && (
          <Select
            value={status}
            onChange={(e) =>
              onUpdate(e.target.value as BookingStatus)
            }
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