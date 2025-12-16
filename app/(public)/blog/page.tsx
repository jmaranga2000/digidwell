import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      createdAt: true,
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Blog</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}