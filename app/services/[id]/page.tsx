import PayButton from "@/components/paywithmpesa/PayButton";
import Image from "next/image";

export default async function ServiceDetailsPage({ params }: any) {
  const service = await fetchServiceById(params.id); // You already have a service fetcher

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold">{service.title}</h1>

      <Image
        src={service.image}
        alt={service.title}
        className="rounded-xl mt-4 w-full max-h-[350px] object-cover"
      />

      <p className="mt-4 text-lg">{service.description}</p>

      <p className="text-2xl font-semibold mt-4">Ksh {service.price}</p>

      {/* Payment Button */}
      <PayButton
        amount={service.price}
        phone="07XXXXXXXX" 
        serviceId={service.id}
      />
    </div>
  );
}
