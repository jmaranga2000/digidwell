import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMockSession } from "./lib/mockSession";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith("/dashboard/admin");
  const isCustomerRoute = path.startsWith("/dashboard/customer");
  const isAuthRoute = path.startsWith("/auth");

  const user = getMockSession();

  // Not logged in
  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Admin restriction
  if (isAdminRoute && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  // Customer restriction
  if (isCustomerRoute && user?.role !== "customer") {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*"
  ],
};
