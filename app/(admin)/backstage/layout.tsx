import type { ReactNode } from "react";

import { BackstageSidebar } from "@/components/backstage/sidebar";

export default function BackstageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <BackstageSidebar />
      <main className="flex-1 px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full flex-col gap-y-8">{children}</div>
      </main>
    </div>
  );
}
