// components/about/TeamMemberCard.tsx
interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

export default function TeamMemberCard({ name, role, imageUrl }: TeamMemberCardProps) {
  return (
    <div className="text-center">
      <img src={imageUrl} alt={name} className="mx-auto rounded-full w-32 h-32 object-cover" />
      <h3 className="font-semibold mt-2">{name}</h3>
      <p className="text-gray-500">{role}</p>
    </div>
  );
}