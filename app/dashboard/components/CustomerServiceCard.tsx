"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CustomerServiceCardProps = {
  id: string;
  title: string;
  description: string;
  price: string;
  onBook?: (id: string) => void; // Optional callback when booking
};

export default function CustomerServiceCard({
  id,
  title,
  description,
  price,
  onBook,
}: CustomerServiceCardProps) {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="font-semibold text-primary text-lg">KSh {price}</p>

        <Button
          className="w-full py-2"
          onClick={() => onBook && onBook(id)}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
