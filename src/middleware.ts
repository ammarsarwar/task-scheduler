// src/middleware.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request:any) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Exclude API routes from middleware
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (token && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login page
  if (!token && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/calendar", "/analytics", "/tasks", "/auth/:path*"],
};
