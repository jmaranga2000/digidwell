"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ServiceCard from "@/app/dashboard/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
};

export default function AdminServiceListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services/list");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data.services);
    } catch (error: any) {
      toast.error(error.message || "Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Edit service
  const handleEdit = (id: string) => {
    // Navigate to the edit page
    window.location.href = `/dashboard/admin/services/edit/${id}`;
  };

  // Delete service
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted successfully!");
    } catch {
      toast.error("Could not delete service.");
    }
  };

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Manage Services</h1>
        <Link href="/dashboard/admin/services/create">
          <Button className="px-5">Add Service</Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading services...</p>}

      {/* Empty State */}
      {!loading && services.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg">No services added yet.</p>
          <p className="text-sm mt-2">Click the “Add Service” button to create one.</p>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            imageUrl={service.imageUrl || ""}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}