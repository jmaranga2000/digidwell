import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (name && email && password) {
    // Mock creating a user
    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: { name, email, role: "customer" },
    });
  }

  return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
}
