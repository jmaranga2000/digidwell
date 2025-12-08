import { NextRequest, NextResponse } from "next/server";

const allowedFileTypes = ["application/pdf", "application/msword", "image/jpeg"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const file = formData.get("file");

    // Validate file type
    if (file instanceof File) {
      if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Only DOC, PDF, or JPG are allowed." },
          { status: 400 }
        );
      }
      console.log("File Name:", file.name);
      console.log("File Type:", file.type);
      console.log("File Size:", file.size, "bytes");
    } else {
      console.log("No file attached.");
    }

    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Mock response
    return NextResponse.json({
      success: true,
      message: "Message received successfully!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process contact form." },
      { status: 500 }
    );
  }
}
