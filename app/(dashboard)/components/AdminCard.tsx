// app/dashboard/components/AdminCard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AdminCardProps {
  title: string;
  count: number | string;
  description?: string;
}

export default function AdminCard({ title, count, description }: AdminCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-primary">{count}</p>
      </CardContent>
    </Card>
  );
}