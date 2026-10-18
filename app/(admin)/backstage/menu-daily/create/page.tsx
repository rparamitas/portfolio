import type { Metadata } from "next";
import Link from "next/link";

import { MenuCreateView } from "@/components/backstage/menu-create";

export const metadata: Metadata = {
  title: "Create Menu",
};

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const CreateMenuPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) => {
  const { date } = await searchParams;
  const initialDate = date && DATE_KEY_PATTERN.test(date) ? date : undefined;

  return (
    <>
      <header className="flex flex-col gap-y-2">
        <h1 className="font-head text-3xl md:text-4xl">Create Menu</h1>
        <p className="text-muted-foreground">
          Fill the weekly menu with checkboxes, save drafts, or publish when
          done.{" "}
          <Link
            href="/backstage/menu-daily"
            className="font-semibold underline underline-offset-2"
          >
            Back to daily menu
          </Link>
        </p>
      </header>
      <MenuCreateView initialDate={initialDate} />
    </>
  );
};

export default CreateMenuPage;
