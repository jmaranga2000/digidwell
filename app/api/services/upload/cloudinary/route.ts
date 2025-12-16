import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/session";

export async function POST(req: Request) {
  try {
    await requireAuth(); // Only authenticated users can upload images

    const data = await req.formData();
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadImage(base64);

    return NextResponse.json({ url: result.secure_url });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}