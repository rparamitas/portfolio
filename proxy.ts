import { NextResponse, NextRequest } from "next/server";
import {getSessionCookie} from "better-auth/cookies"

const unauthRoutes = ['/sign-in', '/sign-up', '/reset-password']

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const isUnauthRoute = unauthRoutes.includes(request.nextUrl.pathname)

  if (isUnauthRoute) {
    return NextResponse.next()
  }

  if (!sessionCookie) {
    console.warn("middleware redirecting to sign-in")
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next|api/auth).*)", "/trpc(.*)"],
}
