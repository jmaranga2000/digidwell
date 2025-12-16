import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  try {
    const client = await clerkClient();

    // Correct format: emailAddresses is an array of { emailAddress, verified? }
    const clerkUser = await client.users.createUser({
      email_addresses: [{ email_address: email, verified: true }],
      password,
      first_name: name,
    });

    await prisma.user.create({
      data: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name,
        role: "CUSTOMER",
      },
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
  }
}