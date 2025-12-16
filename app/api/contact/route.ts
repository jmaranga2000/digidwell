import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/lib/prisma";
import { sendEmail } from "@/lib/utils/utils"; // optional email utility

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const attachment = formData.get("attachment") as File | null;

    let attachmentUrl: string | null = null;

    if (attachment && attachment.size > 0) {
      // Upload to Cloudinary
      const cloudinaryResult = await fetch("/api/services/upload", {
        method: "POST",
        body: attachment,
      });
      const data = await cloudinaryResult.json();
      attachmentUrl = data.url;
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
        attachment: attachmentUrl || null,
      },
    });

    // Optional: send email notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Message from ${name}`,
      text: message,
      attachment: attachmentUrl || undefined,
    });

    return NextResponse.json({ contact });
  } catch (error) {
    console.error("Failed to submit contact message", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}