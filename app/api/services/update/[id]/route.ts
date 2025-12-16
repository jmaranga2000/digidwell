import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const serviceId = params.id;
    const data = await req.json();

    const { title, description, price, categoryId, subCategoryId, imageUrl } = data;

    if (!title || !categoryId) {
      return NextResponse.json({ error: "Title and category are required" }, { status: 400 });
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        title,
        description,
        price,
        categoryId,
        subCategoryId,
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(updatedService);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}