"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OrderItem from "@/app/dashboard/components/OrderItem";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceTitle: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  price: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchOrders = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/order/list");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
    } catch {
      toast.error("Could not load orders");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    setLoading(true);
    try {
      const res = await fetch("/api/order/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update order status.");
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success(`Order marked as ${newStatus.toLowerCase()}`);
    } catch {
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/order/delete/${orderId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order deleted successfully!");
    } catch {
      toast.error("Could not delete order.");
    }
  };

  if (fetching) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">All Orders</h2>

      {orders.length ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-2">
              <OrderItem
                id={order.id}
                serviceTitle={order.serviceTitle}
                customerName={order.customerName}
                status={order.status}
                price={order.price}
              />

              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => updateOrderStatus(order.id, "Pending")}
                  disabled={loading}
                  className="px-3 py-1 bg-yellow-600 text-white rounded"
                >
                  Pending
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, "Processing")}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Processing
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, "Completed")}
                  disabled={loading}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Completed
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, "Cancelled")}
                  disabled={loading}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteOrder(order.id)}
                  disabled={loading}
                  className="px-3 py-1 bg-destructive text-white rounded"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No orders available.</p>
      )}
    </div>
  );
}