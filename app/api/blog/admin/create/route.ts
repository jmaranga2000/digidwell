import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../../utils";

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    const body = await req.json();

    const post = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        featuredImage: body.featuredImage,
        published: body.published ?? false,
        authorId: adminId,
      },
    });

    return NextResponse.json(post);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}