"use client";

import { useState } from "react";
import slugify from "slugify";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSlugChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | undefined;
      if (image) {
        imageUrl = await uploadImageToCloudinary(image, "blogs");
      }

      const res = await fetch("/api/blog/create", {
        method: "POST",
        body: JSON.stringify({ title, slug, content, published, imageUrl }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to create blog");
      alert("Blog created successfully!");
      setTitle("");
      setSlug("");
      setContent("");
      setPublished(false);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => handleSlugChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-64"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Blog"}
        </Button>
      </form>
    </div>
  );
}