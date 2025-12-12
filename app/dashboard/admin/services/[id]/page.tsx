"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");

  const fetchService = async () => {
    const res = await fetch(`/api/services/${id}`);
    const data = await res.json();
    const s = data.service;
    setTitle(s.title);
    setDescription(s.description);
    setImageUrl(s.imageUrl);
    setPrice(s.price);
  };

  useEffect(() => { fetchService(); }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/services/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, description, imageUrl, price: parseFloat(price) }),
    });

    router.push("/dashboard/admin/services");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Edit Service</h1>
      <Input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field" required />
      <Input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="input-field" required />
      <Textarea value={description} onChange={e => setDescription(e.target.value)} className="input-field" required />
      <Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" required />
      <Button type="submit" className="btn-primary">Update Service</Button>
    </form>
  );
}
