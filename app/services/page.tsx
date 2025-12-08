// app/services/page.tsx
import Link from "next/link";
import ServiceCard from "./components/ServiceCard";

const mockServices = [
  { id: "1", title: "Software Installation", description: "Install software quickly.", price: "KSh 5,000" },
  { id: "2", title: "Computer Upgrades", description: "Upgrade RAM, SSDs, and more.", price: "KSh 10,000" },
  { id: "3", title: "Graphic Design", description: "Design logos, flyers, and more.", price: "KSh 2,500" },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {mockServices.map((service) => (
          <Link key={service.id} href={`/services/${service.id}`}>
            <ServiceCard {...service} />
          </Link>
        ))}
      </div>
    </div>
  );
}
