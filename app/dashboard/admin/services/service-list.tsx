"use client";

import ServiceCard from "@/components/servicecard";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ServiceList({ services }: { services: Service[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin/services/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    setLoading(true);

    const res = await fetch(`/api/services/delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete service.");
    }
  };

  return (
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
  );
}
