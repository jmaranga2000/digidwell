import { notFound } from "next/navigation";

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  date: string;
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`);
  const data = await res.json();

  if (!res.ok || !data.post) return notFound();

  const post: BlogPost = data.post;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{post.date}</p>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">{post.content}</div>
    </div>
  );
}
