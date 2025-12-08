import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-20 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Digital Experience?
        </h2>

        <p className="text-lg md:text-xl mb-8 text-white/90">
          Get fast, reliable, and professional tech solutions from DigiDwell Technologies.
        </p>

        <Button>

        <Link
          href="/contact"
          className="px-8 py-3 rounded-xl bg-white text-primary font-semibold shadow hover:bg-gray-200"
        >
          Get Started Today
        </Link>

        </Button>

      </div>
    </section>
  );
}
