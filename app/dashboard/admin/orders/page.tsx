"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceTitle: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders (mock API)
  useEffect(() => {
    fetch("/api/orders/list") // Replace with real API later
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update order status.");
        return;
      }

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      toast.success(`Order marked as ${newStatus.toLowerCase()}!`);
    } catch {
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order deleted successfully!");
    } catch {
      toast.error("Could not delete order.");
    }
  };

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      <div className="space-y-6">
        {orders.length ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-primary">{order.serviceTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300">{order.customerName}</p>
                <p className="text-gray-500 dark:text-gray-400">{order.customerEmail}</p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <p className={`font-semibold ${
                  order.status === "Completed"
                    ? "text-green-500"
                    : order.status === "Pending"
                    ? "text-yellow-500"
                    : order.status === "Processing"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}>
                  {order.status}
                </p>

                <div className="flex gap-2 mt-2">
                  <Button onClick={() => updateOrderStatus(order.id, "Pending")} className="px-3 py-1 bg-yellow-600 text-white rounded">Pending</Button>
                  <Button onClick={() => updateOrderStatus(order.id, "Processing")} className="px-3 py-1 bg-blue-600 text-white rounded">Processing</Button>
                  <Button onClick={() => updateOrderStatus(order.id, "Completed")} className="px-3 py-1 bg-green-600 text-white rounded">Completed</Button>
                  <Button onClick={() => updateOrderStatus(order.id, "Cancelled")} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</Button>
                  <Button onClick={() => deleteOrder(order.id)} className="px-3 py-1 bg-destructive text-white rounded">Delete</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No orders available.</p>
        )}
      </div>
    </div>
  );
}
