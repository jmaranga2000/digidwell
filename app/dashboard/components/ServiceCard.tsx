"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;

  // Optional admin actions
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;

  // Optional: Enable navigation when clicked
  onSelect?: (id: string) => void;
};

export default function ServiceCard({
  id,
  title,
  description,
  price,
  imageUrl,
  onEdit,
  onDelete,
  onSelect,
}: ServiceCardProps) {
  return (
    <div
      className="glass rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelect && onSelect(id)}
    >
      {/* Image */}
      <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm mb-3" style={{ color: "var(--muted-foreground)" }}>
        {description.length > 120 ? description.substring(0, 120) + "..." : description}
      </p>

      {/* Price */}
      <p className="text-lg font-bold mb-4" style={{ color: "var(--primary)" }}>
        KES {price.toLocaleString()}
      </p>

      {/* Admin Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="flex gap-3 mt-3">
          {onEdit && (
            <Button
              className="px-4 py-2 rounded-md font-medium bg-primary text-black hover:bg-primary/80"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Button
              className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
