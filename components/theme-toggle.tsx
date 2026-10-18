"use client";

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

type props = {
  className?: string;
};

export const ThemeToggle = ({ className }: props) => {
  const { setTheme, resolvedTheme } = useTheme();

  const changeTheme = () => {
    // Fall back to "dark" when `resolvedTheme` is not known yet, so the first
    // click always moves away from the light default rather than being a no-op.
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant={"secondary"}
      size={"icon-xs"}
      onClick={changeTheme}
      // `icon-lg` alone is only p-3; pinning 11x11 keeps the tap target at the
      // 44px the rest of the nav controls use.
      className={cn(className)}
      aria-label="Toggle between light and dark mode"
    >
      {/* Both icons render on the server; CSS picks the right one so there is
          no hydration mismatch and no flash before `resolvedTheme` is known. */}
      <SunDim className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </Button>
  );
};
