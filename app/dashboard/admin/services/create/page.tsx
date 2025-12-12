"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateServicePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !price || !description || !image) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Upload image
      const imgForm = new FormData();
      imgForm.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imgForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setError(uploadData.error || "Image upload failed");
        setIsSubmitting(false);
        return;
      }

      const imageUrl = uploadData.url;

      // 2. Create service
      const res = await fetch("/api/admin/services/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
          imageUrl
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to create service.");
        setIsSubmitting(false);
        return;
      }

      setSuccess("Service created successfully.");

      setTimeout(() => {
        router.push("/dashboard/admin/service");
      }, 1200);

    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="shadow-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Create a New Service
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block font-medium mb-1">Service Title</label>
              <Input 
                placeholder="Enter service title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price (KES)</label>
              <Input 
                type="number"
                placeholder="e.g 2500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea
                placeholder="Explain what the service involves..."
                value={description}
                className="h-32"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-1">Service Image</label>
              <Input 
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Errors */}
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            {/* Success */}
            {success && (
              <p className="text-green-600 text-sm">{success}</p>
            )}

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Create Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
