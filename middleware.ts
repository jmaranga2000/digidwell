import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/api/auth/login",
  "/api/auth/register",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // If token does not exist → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET!);

    // Allow authenticated users
    return NextResponse.next();
  } catch (error) {
    // Invalid token → clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("token", "", {
      path: "/",
      expires: new Date(0),
    });
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/services/:path*",
    "/orders/:path*",
    "/profile/:path*",
  ],
};
