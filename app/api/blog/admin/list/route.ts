import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../../utils";

export async function GET() {
  await requireAdmin();

  const posts = await prisma.blog.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(posts);
}