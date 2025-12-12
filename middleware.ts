import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/verifyToken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const user = verifyToken(token);

  const isAuthRoute =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register");

  const isDashboard = pathname.startsWith("/dashboard");

  // -----------------------------------------------------
  // 1) PROTECT DASHBOARD
  // -----------------------------------------------------
  if (isDashboard && !user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // -----------------------------------------------------
  // 2) BLOCK AUTH PAGES IF LOGGED IN
  // -----------------------------------------------------
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
   // "/dashboard/:path*",        // protect dashboard
    //"/auth/login",              // block if logged in
   // "/auth/register"            // block if logged in
  ],
};
