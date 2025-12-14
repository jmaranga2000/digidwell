// components/about/AboutHero.tsx
interface AboutHeroProps {
  title: string;
  description: string;
}

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="text-center py-16 bg-blue-50 rounded-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">{description}</p>
    </section>
  );
}