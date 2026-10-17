import type { Metadata } from "next";

import { DashboardContent } from "@/components/backstage/dashboard";

export const metadata: Metadata = {
  title: "Backstage",
};

const BackstagePage = () => {
  return (
    <>
      <header className="flex flex-col gap-y-2">
        <h1 className="font-head text-3xl md:text-4xl">Backstage</h1>
        <p className="text-muted-foreground">
          Overview of your portfolio activity and recent updates.
        </p>
      </header>
      <DashboardContent />
    </>
  );
};

export default BackstagePage;
