import { NextResponse } from "next/server";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

const posts: BlogPost[] = [
  { slug: "post-1", title: "Understanding Next.js", excerpt: "A quick guide to Next.js basics.", date: "2025-12-08" },
  { slug: "post-2", title: "Using Prisma with Next.js", excerpt: "How to integrate Prisma for database management.", date: "2025-12-06" },
  { slug: "post-3", title: "Building Reusable Components", excerpt: "Tips for creating reusable UI components in React.", date: "2025-12-04" },
];

export async function GET() {
  return NextResponse.json({ posts });
}
