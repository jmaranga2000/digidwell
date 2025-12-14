"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ServiceForm = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
};

export default function AdminServiceForm() {
  const [form, setForm] = useState<ServiceForm>({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/services/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("File upload failed");

    const data = await res.json();
    return data.url as string; // Expected format: { url: "https://..." }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.imageUrl;

      if (!imageUrl && file) {
        imageUrl = await handleUploadFile(file);
      }

      const res = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create service");

      // Success handling
      setForm({ title: "", description: "", price: "", imageUrl: "" });
      setFile(null);
      alert("Service created successfully!");
    } catch (err: any) {
      alert(err.message || "Error creating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md space-y-4 bg-white dark:bg-gray-800">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <Input name="title" value={form.title} onChange={onChange} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <Textarea name="description" value={form.description} onChange={onChange} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <Input name="price" type="number" value={form.price} onChange={onChange} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL (optional)</label>
        <Input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." />
      </div>

      <div>
        <label className="block font-semibold mb-1">Upload Image (optional)</label>
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </div>

      <Button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
}