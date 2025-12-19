"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ServiceCard from "@/app/dashboard/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ServiceStatus = "ACTIVE" | "INACTIVE";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  status: ServiceStatus;
};

export default function AdminServiceListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/admin/list");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data.services ?? []);
    } catch (error: any) {
      toast.error(error.message || "Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin/services/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/admin/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted successfully!");
    } catch {
      toast.error("Could not delete service.");
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Manage Services</h1>
        <Link href="/dashboard/admin/services/create">
          <Button>Add Service</Button>
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading services...</p>}

      {!loading && services.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg">No services added yet.</p>
          <p className="text-sm mt-2">
            Click the “Add Service” button to create one.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}