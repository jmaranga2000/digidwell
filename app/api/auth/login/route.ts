import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // Clerk handles login via frontend; here just a placeholder
    return NextResponse.json({ message: "Login handled via Clerk frontend" });
  } catch (err: unknown) {
      if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
  }