"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  imageUrl?: string;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data: { blogs: Blog[] } = await res.json();
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

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  if (loading) return <p className="p-6 text-muted-foreground">Loading blogs...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <div className="flex items-center gap-4">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Slug: {blog.slug} | Published: {blog.published ? "Yes" : "No"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => router.push(`/dashboard/admin/blog/edit/${blog.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
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