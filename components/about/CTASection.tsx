// components/about/CTASection.tsx
import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({ title, subtitle, buttonText, buttonLink }: CTASectionProps) {
  return (
    <section className="py-16 bg-blue-50 rounded-2xl text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{subtitle}</p>
      <Link href={buttonLink}>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          {buttonText}
        </button>
      </Link>
    </section>
  );
}