import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center p-10 md:p-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Trusted Tech Partner  
          <span className="text-primary"> in Kenya</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Tunafix, Tunaconnect, Tunaboresha Tech Bila Stress.  
          We offer professional tech services including software installation, upgrades, 
          e-commerce tools, and digital solutions tailored for modern businesses.
        </p>


        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">

           <Button class="btn-primary">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold shadow hover:bg-primary/90"
          >
            Contact Us
          </Link>

          </Button>

            <Button class="btn-primary">

          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-primary/10"
          >
            Explore Services
          </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
