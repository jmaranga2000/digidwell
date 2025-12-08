type AboutHeroProps = {
  title: string;
  description: string;
};

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{description}</p>
    </section>
  );
}
