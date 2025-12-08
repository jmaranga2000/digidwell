import AboutHero from "../components/about/AboutHero";
import VisionMissionCard from "../components/about/VisionMissionCard";
import FeatureCard from "../components/about/FeatureCard";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Hero Section */}
      <AboutHero
        title="About DigiDwell Technologies"
        description="At DigiDwell, we specialize in delivering high-quality tech solutions that are affordable and reliable. From software installation to system upgrades, graphic design, and tech consulting, we help individuals and businesses optimize their technology experience."
      />

      {/* Vision & Mission */}
      <section className="grid md:grid-cols-2 gap-8">
        <VisionMissionCard
          title="Our Vision"
          description="To be the leading provider of seamless, innovative, and affordable tech solutions across Kenya and beyond."
        />
        <VisionMissionCard
          title="Our Mission"
          description="To empower our clients by providing reliable technology services that simplify their digital experiences and help them achieve their goals."
        />
      </section>

      {/* Why Choose Us */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Why Choose DigiDwell?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Affordable Solutions"
            description="We provide cost-effective tech services without compromising on quality."
          />
          <FeatureCard
            title="Experienced Team"
            description="Our experts are skilled in IT support, software, consulting, and design."
          />
          <FeatureCard
            title="Reliable Support"
            description="We are committed to providing timely assistance and professional guidance."
          />
        </div>
      </section>

    </div>
  );
}
