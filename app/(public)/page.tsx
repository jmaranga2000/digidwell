// app/page.tsx
import Hero from "@/components/Hero";
import Image from "next/image";

export default function HomePage() {
  const services = [
    {
      title: "Technical Support",
      description: "Fast and reliable IT support for all your devices and software issues.",
      icon: "/icons/support.svg",
    },
    {
      title: "Software Installation",
      description: "Professional installation and configuration of software on your systems.",
      icon: "/icons/software.svg",
    },
    {
      title: "Networking Solutions",
      description: "Setup, optimize, and troubleshoot your home or office network.",
      icon: "/icons/network.svg",
    },
    {
      title: "Graphic Design",
      description: "Create stunning logos, posters, and promotional materials.",
      icon: "/icons/design.svg",
    },
    {
      title: "Resume Building",
      description: "ATS friendly, professional design layout and delivery in pdf.",
      icon: "/icons/resume.svg",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Features / Services Overview */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={64}
                height={64}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Carousel (existing section) */}
      <section className="p-10 md:p-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Work</h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-slide gap-4">
            <Image
              src="/slides/maintenance.jpeg"
              width={500}
              height={300}
              alt="Service 1"
              className="rounded-xl shadow"
            />
            <Image
              src="/slides/networking.jpeg"
              width={500}
              height={300}
              alt="Service 2"
              className="rounded-xl shadow"
            />
            <Image
              src="/slides/software-installation.jpeg"
              width={500}
              height={300}
              alt="Service 3"
              className="rounded-xl shadow"
            />
            <Image
              src="/slides/graphic-design.jpeg"
              width={500}
              height={300}
              alt="Service 4"
              className="rounded-xl shadow"
            />
          </div>
        </div>
      </section>
    </main>
  );
}