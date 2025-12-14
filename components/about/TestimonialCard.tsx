// components/about/TestimonialCard.tsx
interface TestimonialCardProps {
  name: string;
  role: string;
  message: string;
  avatarUrl?: string;
}

export default function TestimonialCard({ name, role, message, avatarUrl }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
      {avatarUrl && (
        <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full mb-4 object-cover" />
      )}
      <p className="text-gray-700 mb-3">&quot;{message}&quot;</p>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  );
}