import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const updates = await req.json();

  try {
    const service = await prisma.service.update({
      where: { id },
      data: updates,
    });
    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: "Service not found or cannot update" }, { status: 404 });
  }
}
