import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  return requireAuth(async (_req, user) => {
    const { serviceId, details } = await req.json();
    if (!serviceId) return NextResponse.json({ error: "Service ID is required" }, { status: 400 });

    const serviceRequest = await prisma.booking.create({
      data: { userId: user.id, serviceId, details },
    });

    return NextResponse.json({ serviceRequest });
  })(req);
}
