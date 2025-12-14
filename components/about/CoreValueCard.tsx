// components/about/CoreValueCard.tsx
interface CoreValueCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function CoreValueCard({ icon, title, description }: CoreValueCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
      <div className="text-blue-600 mb-3 text-4xl">{icon}</div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}