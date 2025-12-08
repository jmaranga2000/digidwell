import Link from "next/link";
import { Button } from "@/componrnts/ui/button"

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Trusted Tech Partner  
          <span className="text-primary"> in Kenya</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Tunafix, Tunaconnect, Tunaboresha – Tech Bila Stress.  
          We offer professional tech services including software installation, upgrades, 
          e-commerce tools, and digital solutions tailored for modern businesses.
        </p>


        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">

           <Button>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow hover:bg-primary/90"
          >
            Contact Us
          </Link>

          </Button>

            <Button>

          <Link
            href="/services"
            className="px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10"
          >
            Explore Services
          </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
