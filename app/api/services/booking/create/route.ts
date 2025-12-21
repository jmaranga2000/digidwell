import { NextRequest, NextResponse } from "next/server";
import { createResumeBooking } from "@/lib/utils/service";
import { requireAuth } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const data = await req.json();

    // data: { subServiceId, resumeData, fileUrl? }
    const booking = await createResumeBooking({
      userId: user.id,
      subServiceId: data.subServiceId,
      resumeData: data.resumeData,
      fileUrl: data.fileUrl,
    });

    return NextResponse.json({ success: true, booking });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}