import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      createdAt: true,
    },
  });

  return NextResponse.json(posts);
}