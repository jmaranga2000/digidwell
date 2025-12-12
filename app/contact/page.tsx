import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import "./contact.css";

export default function ContactPage() {
  return (
    <main className="px-4 md:px-8 py-12 space-y-12">

      {/* PAGE TITLE */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto contact-foreground">
          We&#39;re here to assist you. Fill out the form below and our support team will respond shortly.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="grid md:grid-cols-2 gap-10">

        {/* CONTACT FORM */}
        <div className="p-6 rounded-2xl glass shadow space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Message
            </label>
            <Textarea
              placeholder="Write your message here..."
              rows={5}
              className="w-full"
            ></Textarea>
          </div>

          <Button className="btn-primary w-full">
            Send Message
          </Button>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="p-6 rounded-2xl glass shadow space-y-6">
          <h2 className="text-2xl font-semibold">
            Get in Touch
          </h2>

          <p className="contact-foreground">
            You can also reach us directly through the following channels.
          </p>

          <ul className="space-y-3">
            <li>
              <strong>Email:</strong> support@digidwelltech.com
            </li>
            <li>
              <strong>Phone:</strong> +254 750 468 852
            </li>
            <li>
              <strong>Office Hours:</strong> Mon – Sat, 8:00am – 6:00pm
            </li>
          </ul>
          <div className="rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="250"
              className="contact-map-iframe"
              loading="lazy"
              title="Digidwell Office Location on Google Maps"
            ></iframe>
          </div>
          </div>

      </section>
    </main>
  );
}
