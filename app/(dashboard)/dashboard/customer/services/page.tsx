"use client";
import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export default function CustomerServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/services/list")
      .then(res => res.json())
      .then(data => setServices(data.services))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading services...</p>;
  if (!services.length) return <p className="p-6">No services available.</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Available Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            {...service}
            onClick={() => router.push(`/dashboard/customer/bookings/create?serviceId=${service.id}`)}
          />
        ))}
      </div>
    </div>
  );
}