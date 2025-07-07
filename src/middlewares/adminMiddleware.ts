import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function adminMiddleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (token?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return null;
}
