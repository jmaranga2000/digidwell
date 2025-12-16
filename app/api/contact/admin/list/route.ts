import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  await requireAdmin();

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ contacts });
}