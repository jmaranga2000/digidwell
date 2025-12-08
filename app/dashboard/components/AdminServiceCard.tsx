"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AdminServiceCardProps = {
  id: string;
  title: string;
  description: string;
  price: string;
  onEdit: (service: { id: string; title: string; description: string; price: string }) => void;
  onDelete: (id: string) => void;
};

export default function AdminServiceCard({
  id,
  title,
  description,
  price,
  onEdit,
  onDelete,
}: AdminServiceCardProps) {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="font-semibold text-primary text-lg">KSh {price}</p>

        <div className="flex gap-2">
          <Button
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={() => onEdit({ id, title, description, price })}
          >
            Edit
          </Button>

          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
