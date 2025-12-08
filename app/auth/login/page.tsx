"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mockLogin } from "@/lib/mockSession";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const user = mockLogin(email);

      toast.success(`Logged in as ${user.role}`);

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/customer");
      }
    } catch (error) {
      toast.error("Unable to login. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <Input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <p className="text-xs mt-1 text-gray-600">
            Use any email. If it contains "admin", you will login as admin.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
