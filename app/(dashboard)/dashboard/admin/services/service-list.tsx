"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ServiceCard from "@/components/servicecard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StatsCard from "@/components/statscard";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function AdminServiceListPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/list");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data.services || []);
    } catch (err: any) {
      toast.error(err.message || "Could not load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin/services/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/services/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete service");

      toast.success("Service deleted successfully!");
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Could not delete service");
    } finally {
      setActionLoading(false);
    }
  };

  const totalRevenue = services.reduce((sum, s) => sum + s.price, 0);

  if (loading) return <p className="text-gray-500">Loading services...</p>;

  return (
    <div className="px-6 py-10 space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard title="Total Services" value={services.length} />
        <StatsCard title="Total Revenue" value={`KSh ${totalRevenue.toLocaleString()}`} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button onClick={() => router.push("/dashboard/admin/services/create")}>
          Add Service
        </Button>
      </div>

      {/* Empty State */}
      {services.length === 0 ? (
        <p className="text-gray-500">No services available. Add one to get started.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              imageUrl={service.imageUrl}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {actionLoading && <p className="mt-4 text-gray-500">Processing action...</p>}
    </div>
  );
}