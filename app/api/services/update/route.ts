import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  return requireAuth(async (_req, _user) => {
    const { id, title, description, imageUrl, price } = await req.json();

    if (!id || !title || !description || !imageUrl || price == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id },
      data: { title, description, imageUrl, price },
    });

    return NextResponse.json({ service });
  })(req);
}
