import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const serviceId = params.id;
    const data = await req.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const price = parseFloat(data.get("price")?.toString() || "0");
    const imageFile = data.get("image") as File | null;

    if (!title || !description || !price) {
      return NextResponse.json({ error: "Title, description, and price are required" }, { status: 400 });
    }

    let imageUrl: string | undefined;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
      const uploadResult = await uploadImage(base64);
      imageUrl = uploadResult.secure_url;
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        title,
        description,
        price,
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(updatedService);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
