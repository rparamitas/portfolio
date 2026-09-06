"use client"

import { createAuthClient } from "better-auth/react"
import { convexClient } from "@convex-dev/better-auth/client/plugins"
import {
  twoFactorClient,
  magicLinkClient,
  emailOTPClient,
  anonymousClient,
  inferAdditionalFields,
} from "better-auth/client/plugins"
import type { auth } from "@/convex/betterAuth/auth"

export const authClient = createAuthClient({
  plugins: [
    convexClient(),
    inferAdditionalFields<typeof auth>(),
    twoFactorClient(),
    magicLinkClient(),
    emailOTPClient(),
    anonymousClient(),
  ],
})
