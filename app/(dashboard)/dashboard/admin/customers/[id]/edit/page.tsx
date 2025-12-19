"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditCustomerPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function fetchCustomer() {
      try {
        const res = await fetch(`/api/admin/customers/${id}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setName(data.customer.name);
        setEmail(data.customer.email);
        setPhone(data.customer.phone || "");
      } catch (err) {
        console.error(err);
        toast.error("Could not load customer.");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) throw new Error("Failed to update customer");

      toast.success("Customer updated successfully!");
      router.push("/dashboard/admin/customers");
    } catch (err) {
      console.error(err);
      toast.error("Error updating customer.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading customer...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          disabled={saving}
        >
          {saving ? "Updating..." : "Update Customer"}
        </Button>
      </form>
    </div>
  );
}