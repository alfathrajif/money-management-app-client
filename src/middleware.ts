import { NextRequest, NextResponse } from "next/server";
import { unauthenticatedRoutes } from "./constants";
import Authenticated from "./app/(auth)/authenticated";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = Authenticated();
  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    pathname.startsWith(route.path)
  );

  if (!isAuthenticated && !isUnauthenticatedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isUnauthenticatedRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
