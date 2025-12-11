import AboutHero from "@/components/about/abouthero";
import FeatureCard from "@/components/about/featurecard";
import VisionMissionCard from "@/components/about/visionmision";

export default function AboutPage() {
  return (
    <main className="px-4 md:px-8 py-12 space-y-16">

      {/* HERO SECTION */}
      <AboutHero
        title="About DigiDwell Technologies"
        description="We are a technology solutions company focused on simplifying digital experiences through reliable support, innovative software, and scalable tech solutions."
      />

      {/* FEATURES SECTION */}
      <section className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          title="Expert Support"
          description="Our team ensures smooth and uninterrupted digital operations for your business."
        />
        <FeatureCard
          title="Reliable Solutions"
          description="We develop modern and scalable systems, from websites to automation tools."
        />
        <FeatureCard
          title="Customer Focus"
          description="Every project is tailored to your specific needs, ensuring maximum value and impact."
        />
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="grid md:grid-cols-2 gap-6">
        <VisionMissionCard
          title="Our Vision"
          description="To become the leading provider of digital solutions across Africa by empowering businesses through innovation and technology."
        />
        <VisionMissionCard
          title="Our Mission"
          description="To build modern, accessible, and scalable tech solutions that solve real problems and create new opportunities."
        />
      </section>

    </main>
  );
}