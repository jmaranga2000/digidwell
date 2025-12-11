type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="glass p-6 rounded-2xl shadow text-center">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p style={{ color: "var(--foreground)" }}>
        {description}
      </p>
    </div>
  );
}