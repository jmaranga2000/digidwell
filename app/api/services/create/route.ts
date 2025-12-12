import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const price = parseFloat(data.get("price")?.toString() || "0");
    const imageFile = data.get("image") as File;

    if (!title || !description || !price || !imageFile) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convert image file to base64
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await uploadImage(base64);

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        imageUrl: uploadResult.secure_url,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
