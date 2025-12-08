type VisionMissionCardProps = {
  title: string;
  description: string;
};

export default function VisionMissionCard({ title, description }: VisionMissionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow glass">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
