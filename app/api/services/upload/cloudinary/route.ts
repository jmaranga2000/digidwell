import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder")?.toString() || `user_${user.id}`;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload file to Cloudinary
    const fileUrl = await uploadImageToCloudinary(file, folder);

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}