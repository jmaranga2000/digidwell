// components/about/VisionMissionCard.tsx
interface VisionMissionCardProps {
  title: string;
  description: string;
}

export default function VisionMissionCard({ title, description }: VisionMissionCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}