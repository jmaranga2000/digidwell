"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function onSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.error);

    toast.success("Account created");
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-full max-w-md space-y-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold">Create Account</h1>

        <input
          className="w-full p-3 rounded bg-gray-800"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 rounded bg-gray-800"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-3 rounded bg-gray-800"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 p-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
