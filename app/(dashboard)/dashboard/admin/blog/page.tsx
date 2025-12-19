"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setBlogs(data.blogs ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push("/dashboard/admin/blog/create")}>
          Create New
        </Button>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((b) => (
            <div key={b.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <h2 className="font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => router.push(`/dashboard/admin/blog/edit/${b.id}`)}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(b.id)} className="bg-red-600 text-white">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}