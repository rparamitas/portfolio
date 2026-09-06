"use client";

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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
    <button
      onClick={changeTheme}
      className={cn(
        "rounded-md p-2 transition-opacity duration-200 hover:cursor-pointer hover:opacity-80 focus:outline-none",
        className,
      )}
      aria-label="Toggle between light and dark mode"
    >
      {/* Both icons render on the server; CSS picks the right one so there is
          no hydration mismatch and no flash before `resolvedTheme` is known. */}
      <SunDim className="size-5 dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
    </button>
  );
};
