import { NextResponse, NextRequest } from "next/server";
import {getSessionCookie} from "better-auth/cookies"

const unauthRoutes = ['/sign-in', '/sign-up', '/reset-password']
// Guest routes are readable without a session. A non-root entry also covers
// everything below it, so '/blog' matches '/blog/1' and any slug.
const guestRoutes = ['/', '/blog', '/about']

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl
  const isUnauthRoute = unauthRoutes.includes(pathname)
  const isGuestRoute = guestRoutes.some(
    (route) =>
      pathname === route ||
      (route !== '/' && pathname.startsWith(`${route}/`)),
  )

  if (isUnauthRoute) {
    return NextResponse.next()
  }

  if (!sessionCookie && !isGuestRoute) {
    console.warn("middleware redirecting to sign-in")
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect', pathname + request.nextUrl.search)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next|api/auth).*)", "/trpc(.*)"],
}
