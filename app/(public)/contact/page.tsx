"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import "./contact.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      // Replace with actual API call
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4 md:px-16 py-12 space-y-16">

      {/* HERO SECTION */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re here to assist you. Fill out the form below and our support team will respond shortly.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="grid md:grid-cols-2 gap-10">

        {/* CONTACT FORM */}
        <div className="p-8 rounded-2xl glass shadow-lg space-y-6 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message here..."
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="p-8 rounded-2xl glass shadow-lg space-y-6 animate-fade-in delay-150">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-600">You can also reach us directly through the following channels:</p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-2"><FiMail className="text-blue-500" /> <strong>Email:</strong> support@digidwelltech.com</li>
            <li className="flex items-center gap-2"><FiPhone className="text-green-500" /> <strong>Phone:</strong> +254 750 468 852</li>
            <li className="flex items-center gap-2"><FiClock className="text-yellow-500" /> <strong>Office Hours:</strong> Mon – Sat, 8:00am – 6:00pm</li>
            <li className="flex items-center gap-2"><FiMapPin className="text-red-500" /> Nairobi, Kenya</li>
          </ul>

          {/* Google Map */}
          <div className="rounded-xl overflow-hidden mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="250"
              className="rounded-xl"
              loading="lazy"
              title="Digidwell Office Location"
            ></iframe>
          </div>

          {/* WhatsApp Live Chat */}
          <a
            href="https://wa.me/254750468852"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition"
            title="Chat with us on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M20.52 3.48a11.93 11.93 0 00-17 0 11.93 11.93 0 00-3.48 17l-1.92 5.28 5.28-1.92a11.93 11.93 0 0017-17zm-9.52 18a9.93 9.93 0 01-5.28-1.44l-.36-.24-3.12 1.14 1.14-3.12-.24-.36a9.93 9.93 0 1110.86 4.02z" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}