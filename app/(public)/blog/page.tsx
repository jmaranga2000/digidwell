"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog/list")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-12">Loading posts...</p>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>
      {posts.length ? (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="font-bold text-xl mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{post.excerpt}</p>
                <p className="text-sm text-gray-400">{post.date}</p>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blog posts found.</p>
      )}
    </div>
  );
}
