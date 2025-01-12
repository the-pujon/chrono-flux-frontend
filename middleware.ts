import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/tracker"];
const publicRoutes = ["/auth/login", "/auth/signup"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("accessToken")?.value;

  // For protected routes
  if (protectedRoutes.includes(path)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // For public routes
  if (publicRoutes.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL("/tracker", req.url));
    }
  }

  // Allow the request to continue if no redirect condition matches
  return NextResponse.next();
}
