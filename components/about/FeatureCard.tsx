type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow glass text-center">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
