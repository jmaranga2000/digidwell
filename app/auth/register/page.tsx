"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { loginMockUser } from "@/lib/mockSession";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock registration API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      // Log in mock user automatically after registration
      loginMockUser({
        name: form.name,
        email: form.email,
        role: "customer", // default role for testing
      });

      toast.success(`Welcome ${form.name}!`);
      router.push("/dashboard/customer");
    } catch (error) {
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>

        <Button type="submit" disabled={loading} className="w-full py-2">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
