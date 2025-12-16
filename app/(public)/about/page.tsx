// app/about/page.tsx
import AboutHero from "@/components/about/AboutHero";
import FeatureCard from "@/components/about/FeatureCard";
import VisionMissionCard from "@/components/about/VisionMissionCard";
import TestimonialCard from "@/components/about/TestimonialCard";
import CoreValueCard from "@/components/about/CoreValueCard";
import CTASection from "@/components/about/CTASection"; // Example icons
import Image from "next/image";
import { CustomerIcon } from "@/components/icons/CustomerIcon";
import { LifebuoyIcon } from "@/components/icons/LifebuoyIcon";
import { InnovationIcon } from "@/components/icons/InnovationIcon";

export default function AboutPage() {
  return (
    <main className="px-4 md:px-16 py-12 space-y-24">

      {/* HERO SECTION */}
      <AboutHero
        title="About DigiDwell Technologies"
        description="We are a technology solutions company focused on simplifying digital experiences through reliable support, innovative software, and scalable tech solutions."
      />

      {/* FEATURES SECTION */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Our Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
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
        </div>
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

      {/* TEAM SECTION */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Image src="/team/james.jpeg" 
            alt="James Maranga" 
            width={128}
            height={128}
            className="mx-auto rounded-full w-32 h-32 object-cover" />
            <h3 className="font-semibold mt-2">James Maranga</h3>
            <p className="text-gray-500">Founder & CEO</p>
          </div>
          <div>
            <Image src="/team/kinjo.jpeg" 
            alt="Kinjo" 
            width={128}
            height={128}
            className="mx-auto rounded-full w-32 h-32 object-cover" />
            <h3 className="font-semibold mt-2">Kinjo</h3>
            <p className="text-gray-500">Tech Lead</p>
          </div>
          <div>
            <Image src="/team/antoine.jpeg" 
            alt="Antoine" 
            width={128}
            height={128}
            className="mx-auto rounded-full w-32 h-32 object-cover" />
            <h3 className="font-semibold mt-2">Antoine</h3>
            <p className="text-gray-500">Project Manager</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <TestimonialCard
            name="John kingani"
            role="CEO, Company X"
            message="DigiDwell simplified our IT operations and made sure everything runs smoothly."
            avatarUrl="/avatars/john.jpeg"
          />
          <TestimonialCard
            name="Kevin Smith"
            role="CTO, Company Y"
            message="Their solutions are innovative and easy to use. Highly recommend!"
            avatarUrl="/avatars/jane.jpeg"
          />
          <TestimonialCard
            name="Shawn Otieno"
            role="Manager, Company Z"
            message="Professional team with excellent support. Our go-to for tech solutions."
            avatarUrl="/avatars/michael.jpeg"
          />
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <CoreValueCard
            icon={<InnovationIcon />}
            title="Innovation"
            description="We continuously develop creative and effective tech solutions."
          />
          <CoreValueCard
            icon={<LifebuoyIcon />}
            title="Reliability"
            description="Clients can count on us to deliver consistent results on time."
          />
          <CoreValueCard
            icon={<CustomerIcon />}
            title="Customer Focus"
            description="Every project is tailored to meet the specific needs of our clients."
          />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <CTASection
        title="Ready to Work With Us?"
        subtitle="Contact us today and let’s bring your ideas to life!"
        buttonText="Get Started"
        buttonLink="/contact"
      />

    </main>
  );
}