import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../../../utils";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const body = await req.json();

    const post = await prisma.blog.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(post);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}