import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Mock login logic
  if (email && password) {
    return NextResponse.json({
      success: true,
      user: {
        email,
        role: email === "admin@example.com" ? "admin" : "customer",
        name: "John Doe",
      },
    });
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
