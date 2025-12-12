import React from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";

async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/services`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function AdminServiceListPage() {
  const services = await getServices();

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Manage Services</h1>

        <Link href="/dashboard/admin/service/create">
          <Button className="px-5">Add Service</Button>
        </Link>
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg">No services added yet.</p>
          <p className="text-sm mt-2">Click the “Add Service” button to create one.</p>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            imageUrl={service.imageUrl}
            isAdmin={true}
          />
        ))}
      </div>
    </div>
  );
}
