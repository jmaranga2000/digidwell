"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OrderItem from "@/app/(dashboard)/components/OrderItem";
import { AdminOrder, OrderStatus } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchOrders = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error();
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

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );

      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order permanently?")) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order deleted");
    } catch {
      toast.error("Could not delete order");
    }
  };

  if (fetching) return <p className="text-muted-foreground">Loading orders…</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Orders</h2>

      {orders.length ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="space-y-2">
              <OrderItem
                id={order.id}
                serviceTitle={order.service.title}
                customerName={order.customer.name || order.customer.email}
                status={order.status}
                price={`KES ${order.amount.toLocaleString()}`}
              />

              <div className="flex flex-wrap gap-2">
                {(
                  ["pending", "paid", "processing", "completed", "cancelled"] as OrderStatus[]
                ).map((s) => (
                  <Button
                    key={s}
                    onClick={() => updateOrderStatus(order.id, s)}
                    disabled={loading}
                    variant={order.status === s ? "default" : "outline"}
                  >
                    {s}
                  </Button>
                ))}

                <Button
                  variant="destructive"
                  disabled={loading}
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No orders available.</p>
      )}
    </div>
  );
}