"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface CustomerCardProps {
  id: string;
  name: string;
  email: string;
  phone?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  id,
  name,
  email,
  phone,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-primary">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{email}</p>
        {phone && <p className="text-gray-500 dark:text-gray-400">Phone: {phone}</p>}
      </div>

      <div className="mt-4 flex gap-2">
        {onEdit && (
          <Button
            onClick={() => onEdit(id)}
            className="bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={() => onDelete(id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};