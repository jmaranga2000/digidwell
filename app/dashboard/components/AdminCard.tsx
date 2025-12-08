// app/dashboard/components/AdminCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AdminCardProps {
  title: string;
  count: number;
  description?: string;
}

export default function AdminCard({ title, count, description }: AdminCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>
          {title}
          </CardTitle>

        {description && <CardDescription>
          {description}
          </CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-primary">
          {count}
          </p>
      </CardContent>
    </Card>
  );
}
