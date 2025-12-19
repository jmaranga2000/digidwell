"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  imageUrl?: string;
}

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing blog data
  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data: { blog: Blog } = await res.json();
        setTitle(data.blog.title);
        setSlug(data.blog.slug);
        setContent(data.blog.content);
        setPublished(data.blog.published);
        setExistingImage(data.blog.imageUrl);
      } catch (err) {
        console.error(err);
        alert("Error fetching blog");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  const handleSlugChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = existingImage;

      if (image) {
        imageUrl = await uploadImageToCloudinary(image, "blogs");
      }

      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, published, imageUrl }),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      alert("Blog updated successfully!");
      router.push("/dashboard/admin/blog");
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-muted-foreground">Loading blog...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

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

        {existingImage && (
          <div className="mb-2">
            <img
              src={existingImage}
              alt="Existing blog"
              className="w-48 h-auto rounded border"
            />
          </div>
        )}

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
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Blog"}
        </Button>
      </form>
    </div>
  );
}