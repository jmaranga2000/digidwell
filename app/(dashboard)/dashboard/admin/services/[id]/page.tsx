"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch service data
  const fetchService = async () => {
    try {
      const res = await fetch(`/api/services/${id}`);
      if (!res.ok) throw new Error("Failed to fetch service");
      const data = await res.json();
      const s = data.service;
      setTitle(s.title);
      setDescription(s.description);
      setImageUrl(s.imageUrl || "");
      setPrice(s.price?.toString() || "");
    } catch (err: any) {
      toast.error(err.message || "Could not load service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageUrl || !price) {
      toast.error("Please fill all fields");
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch("/api/services/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title,
          description,
          imageUrl,
          price: parseFloat(price),
        }),
      });

      if (!res.ok) throw new Error("Failed to update service");

      toast.success("Service updated successfully!");
      router.push("/dashboard/admin/services");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading service details...</p>;

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Service</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <Button type="submit" className="btn-primary" disabled={updating}>
          {updating ? "Updating..." : "Update Service"}
        </Button>
      </form>
    </div>
  );
}