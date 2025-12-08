// app/services/components/ServiceCard.tsx
import { FC } from "react";

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  price: string;
};

const ServiceCard: FC<ServiceCardProps> = ({ title, description, price }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <p className="text-lg font-bold text-primary">{price}</p>
    </div>
  );
};

export default ServiceCard;
