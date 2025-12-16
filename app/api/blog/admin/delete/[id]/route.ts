import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "../../../utils";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}