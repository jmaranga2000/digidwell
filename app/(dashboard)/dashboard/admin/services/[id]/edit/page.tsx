"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch service details
  const fetchService = async () => {
    try {
      const res = await fetch(`/api/admin/services/${id}`);
      if (!res.ok) throw new Error("Failed to fetch service");

      const data = await res.json();
      setTitle(data.service.title);
      setDescription(data.service.description);
      setPrice(data.service.price.toString());
      setCurrentImage(data.service.imageUrl || "");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load service details.");
    }
  };

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = currentImage;

      // Upload new image if selected
      if (image) {
        const imgForm = new FormData();
        imgForm.append("file", image);

        const uploadRes = await fetch("/api/upload", { method: "POST", body: imgForm });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed");
        imageUrl = uploadData.url;
      }

      // Update service
      const res = await fetch("/api/admin/services/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, description, price: parseFloat(price), imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update service");

      toast.success("Service updated successfully!");
      router.push("/dashboard/admin/services");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="shadow-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Edit Service</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block font-medium mb-1">Service Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price (KES)</label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-32" required />
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-1">Service Image</label>
              {currentImage && (
                <Image src={currentImage} alt="Service Image" width={160} height={160} className="rounded mb-3 object-cover border" />
              )}
              <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Updating..." : "Update Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}