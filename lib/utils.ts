import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ConvexError } from 'convex/values'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Only same-site paths are safe as a post-auth redirect target; anything
// else (absolute URLs, protocol-relative '//', backslashes) could bounce
// the user off the app.
export const safeRedirectTo = (value: string | string[] | undefined) => {
  const candidate = Array.isArray(value) ? value[0] : value

  if (
    candidate &&
    candidate.startsWith("/") &&
    !candidate.startsWith("//") &&
    !candidate.includes("\\")
  ) {
    return candidate
  }

  return "/"
}

export const isAuthError = (error: unknown) => {
  const message = (error instanceof ConvexError && error.data) || (error instanceof Error && error.message) || ""

  return /auth/i.test(message)
}
