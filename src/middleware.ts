import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/buy-now")) {
    const auth = await authMiddleware(request);
    if (auth) return auth;
  }

  if (pathname.startsWith("/dashboard/admin")) {
    const adminCheck = await adminMiddleware(request);
    if (adminCheck) return adminCheck;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/buy-now",
    "/buy-now/:path*",
  ],
};
