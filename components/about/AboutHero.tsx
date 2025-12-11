type AboutHeroProps = {
  title: string;
  description: string;
};

export default function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-5xl font-semibold mb-4">
        {title}
      </h1>
      <p className="max-w-2xl mx-auto" style={{ color: "var(--foreground)" }}>
        {description}
      </p>
    </section>
  );
}
