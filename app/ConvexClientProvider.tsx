"use client";

import type { ComponentProps, ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// better-auth 1.6's inferred client type doesn't satisfy the provider's
// AuthClient union (its synthetic instantiation types session data as never),
// so the provider's own props type is the source of truth here.
const providerAuthClient = authClient as unknown as ComponentProps<
  typeof ConvexBetterAuthProvider
>["authClient"];

const ConvexClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={providerAuthClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
};

export default ConvexClientProvider;
