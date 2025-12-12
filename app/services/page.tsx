import { Service } from "@prisma/client"; // Adjust if your card component path differs
import ServiceCard from "../dashboard/components/ServiceCard";

async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/list`);
  return res.json().then((data) => data.services);
}

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            link={`/services/${service.id}`} // For individual service page
          />
        ))}
      </div>
    </div>
  );
}
