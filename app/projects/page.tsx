import type { Metadata } from "next";

import ProjectsList from "@/components/projects-list";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.author}`,
  description:
    "Cosmetic products developed by Rahmita Paramita Sudirman — decorative cosmetics, baby care, skincare, and whitelabel manufacturing.",
};

export default function ProjectsPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="container flex flex-col gap-y-10 py-20">
        <header className="flex flex-col items-center gap-y-4 px-4 text-center">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-muted-foreground max-w-2xl">
            Cosmetic products I&apos;ve developed — from decorative and baby
            care to whitelabel manufacturing.
          </p>
        </header>
        <ProjectsList />
      </div>
    </div>
  );
}
