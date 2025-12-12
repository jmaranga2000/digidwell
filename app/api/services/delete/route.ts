import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  return requireAuth(async (_req, _user) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ message: "Service deleted" });
  })(req);
}
