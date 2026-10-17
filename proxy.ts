import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { safeRedirectTo } from "@/lib/utils";

// Auth pages only make sense without a session; a signed-in visitor is sent
// on their way instead. /reset-password stays reachable while signed in —
// it serves as the change-password flow.
const authPages = ["/sign-in", "/sign-up"];
const unauthRoutes = [...authPages, "/reset-password"];
// Guest routes are readable without a session. A non-root entry also covers
// everything below it, so '/blog' matches '/blog/1' and any slug.
// /opengraph-image and /twitter-image must stay public: social and messaging
// crawlers share links without a session cookie, and a redirect would break
// the preview card.
const guestRoutes = [
  "/",
  "/blog",
  "/about",
  "/projects",
  "/opengraph-image",
  "/twitter-image",
];

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  const isUnauthRoute = unauthRoutes.includes(pathname);
  const isGuestRoute = guestRoutes.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(`${route}/`)),
  );

  if (isUnauthRoute) {
    if (sessionCookie && authPages.includes(pathname)) {
      const url = new URL(
        safeRedirectTo(
          request.nextUrl.searchParams.get("redirect") ?? undefined,
        ),
        request.url,
      );
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!sessionCookie && !isGuestRoute) {
    console.warn("middleware redirecting to sign-in");
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next|api/auth).*)", "/trpc(.*)"],
};
