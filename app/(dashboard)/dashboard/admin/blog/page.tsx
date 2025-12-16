"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "@/components/ui/table";

type BlogPost = {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog/admin/list")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blog</h1>
        <Link
          href="/dashboard/admin/blog/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Post
        </Link>
      </div>

      <Table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="p-3">{post.title}</td>
              <td>{post.published ? "Published" : "Draft"}</td>
              <td className="space-x-3">
                <Link href={`/dashboard/admin/blog/edit/${post.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}