import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, price, categoryId, subCategoryId, imageUrl } = body;

    if (!title || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let finalImageUrl = imageUrl;

    // Optional: If sending image as base64 or file, you could use uploadImage()
    // if (!imageUrl && body.imageFile) {
    //   const uploadResult = await uploadImage(body.imageFile);
    //   finalImageUrl = uploadResult.secure_url;
    // }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        categoryId,
        subCategoryId,
        createdById: user.id,
        imageUrl: finalImageUrl,
      },
    });

    return NextResponse.json({ service });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}