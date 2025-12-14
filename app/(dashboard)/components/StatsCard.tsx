type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-md flex items-center gap-4">
      {icon && <div className="text-3xl text-primary">{icon}</div>}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-primary">{title}</p>
        <h3 className="text-2xl font-bold text-accent">{value}</h3>
      </div>
    </div>
  );
}