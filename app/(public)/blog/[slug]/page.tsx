import prisma from "@/lib/prisma";
import { Image } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.featuredImage && (
        <Image
          src={post.featuredImage}
          alt={post.title}
          className="rounded-xl mb-8"
        />
      )}

      <div className="prose max-w-none">
        {post.content}
      </div>
    </article>
  );
}