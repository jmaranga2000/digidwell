"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function onSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.error);

    toast.success("Logged in");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={onSubmit}
        className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

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
          Login
        </button>
      </form>
    </div>
  );
}
