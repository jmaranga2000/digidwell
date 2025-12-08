import { NextResponse } from "next/server";

type BlogPost = {
  slug: string;
  title: string;
  content: string;
  date: string;
};

const posts: BlogPost[] = [
  { slug: "post-1", title: "Understanding Next.js", content: "Full content of Next.js guide...", date: "2025-12-08" },
  { slug: "post-2", title: "Using Prisma with Next.js", content: "Full content of Prisma integration...", date: "2025-12-06" },
  { slug: "post-3", title: "Building Reusable Components", content: "Full content of reusable components...", date: "2025-12-04" },
];

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
