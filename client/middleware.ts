import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/checkout", "/orders", "/order-confirmation"];

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!requiresAuth) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/checkout", "/orders", "/order-confirmation/:path*"]
};
