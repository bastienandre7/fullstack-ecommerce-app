// proxy.ts
import { auth as proxy } from "@/auth";
import { NextResponse } from "next/server";

export default proxy((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isDashboardRoute = nextUrl.pathname.startsWith("/account");
  const isAuthRoute = nextUrl.pathname.startsWith("/login");
  const isApiWebhook = nextUrl.pathname.startsWith("/api/webhook");

  if (isApiWebhook) return NextResponse.next();

  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    if (userRole !== "ADMIN")
      return NextResponse.redirect(new URL("/", nextUrl));
    return NextResponse.next();
  }

  if (isDashboardRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    return NextResponse.next();
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
