type OrderItemProps = {
  id: string;
  serviceTitle: string;
  customerName: string;
  status: "Pending" | "Completed" | "Cancelled";
  price: string;
};

export default function OrderItem({
  serviceTitle,
  customerName,
  status,
  price,
}: OrderItemProps) {
  // Map status to theme colors
  const statusColor =
    status === "Completed"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-card text-card-foreground p-4 rounded-2xl shadow-md flex justify-between items-center">
      {/* Service & Customer */}
      <div>
        <h4 className="font-semibold text-primary">{serviceTitle}</h4>
        <p className="text-muted-foreground">{customerName}</p>
      </div>

      {/* Status & Price */}
      <div className="text-right flex flex-col items-end gap-1">
        <p className={`font-semibold ${statusColor}`}>{status}</p>
        <p className="font-bold text-primary">{price}</p>
      </div>
    </div>
  );
}