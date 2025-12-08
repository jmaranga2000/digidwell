"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, file: null });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success or failure
      const isSuccess = Math.random() > 0.1; // 90% success
      if (!isSuccess) {
        throw new Error("Failed to submit form (mock).");
      }

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "", file: null });
    } catch (error: any) {
      toast.error(error.message || "Unexpected error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow max-w-lg mx-auto"
      >
        <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <Input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
        <Textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
        <Input type="file" accept=".doc,.pdf,.jpg" onChange={handleFileChange} />
        {form.file && (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Selected file: <span className="font-semibold">{form.file.name}</span>
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
