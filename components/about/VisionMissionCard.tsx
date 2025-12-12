type VisionMissionCardProps = {
  title: string;
  description: string;
};

export default function VisionMissionCard({ title, description }: VisionMissionCardProps) {
  return (
    <div className="glass p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p style={{ color: "var(--foreground)" }}>
        {description}
      </p>
    </div>
  );
}
