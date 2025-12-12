"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AdminServiceForm() {
  const [form, setForm] = useState({ title: "", description: "", price: "", imageUrl: "" });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleUploadFile(file: File) {
    // Optional: POST to /api/services/upload and return URL
    // For now we don't implement server-side storage; you can use cloud uploads here.
    // Example placeholder: return new Promise(resolve => setTimeout(() => resolve(`/uploads/${file.name}`), 600));
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/services/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url; // expected { url: "https://..." }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.imageUrl;
      if (!imageUrl && file) {
        // call upload endpoint (implement server-side later)
        imageUrl = await handleUploadFile(file as File);
      }

      const res = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");

      // success handling (reset, show toast, refresh)
      setForm({ title: "", description: "", price: "", imageUrl: "" });
      setFile(null);
      alert("Service created");
    } catch (err: any) {
      alert(err.message || "Error creating service");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg card-shadow space-y-4">
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
        <Input name="price" value={form.price} onChange={onChange} required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Image URL (or upload below)</label>
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
