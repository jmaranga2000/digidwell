// app/api/services/create/route.ts
import { NextResponse } from "next/server";
import { mockServices } from "../mockdata";

export async function POST(req: Request) {
  const { title, description, price } = await req.json();

  if (!title || !description || !price) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const newService = {
    id: `s${mockServices.length + 1}`,
    title,
    description,
    price,
  };

  mockServices.push(newService);

  return NextResponse.json({ service: newService, message: "Service created successfully" });
}
