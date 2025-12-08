import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Branding */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">DigiDwell Technologies</h3>
          <p className="text-gray-400 text-sm">
            Tunafix, Tunaconnect, Tunaboresha – Tech Bila Stress.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-white mb-3">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Software Installation</li>
            <li>Computer Upgrades</li>
            <li>Graphic Design</li>
            <li>Technical Support</li>
            <li>E-commerce Solutions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">
            Phone: <span className="text-primary font-semibold">+254 750 468 852</span>
          </p>
          <p className="text-sm">Email: jmaranga35@gmail.com</p>
          <p className="text-sm mt-2">Nairobi, Kenya</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Digidwell Technologies. All rights reserved.
      </div>
    </footer>
  );
}
