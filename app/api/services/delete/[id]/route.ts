import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Service deleted", service });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
