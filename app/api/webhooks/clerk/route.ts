import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const headerList = headers();

  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing headers", { status: 400 });
  }

  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Handle Clerk events
  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        clerkId: id,
        email,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        role: "CUSTOMER",
      },
    });
  }

  return NextResponse.json({ received: true });
}
