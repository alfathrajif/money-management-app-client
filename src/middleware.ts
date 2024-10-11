import { NextRequest, NextResponse } from "next/server";
import { unauthenticatedRoutes } from "./constants/routes";
import Authenticated from "./app/(auth)/authenticated";

export function middleware(request: NextRequest) {
  const isAuthenticated = Authenticated();
  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if (!isAuthenticated && !isUnauthenticatedRoute) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthenticated && isUnauthenticatedRoute) {
    if (request.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
