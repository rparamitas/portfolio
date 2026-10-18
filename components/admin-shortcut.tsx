"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Invisible owner-only shortcut: pressing Shift + L navigates to /sign-in.
 *
 * Renders nothing, so visitors have no visible way to discover it, while the
 * site owner can reach the sign-in page from any public page with one
 * keystroke. Intentionally NOT advertised anywhere in the UI.
 */
const AdminShortcut = () => {
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Shift + L, without further modifiers.
      if (!event.shiftKey) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.toLowerCase() !== "l") return;
      // Ignore key auto-repeat while the key is held down.
      if (event.repeat) return;

      // Never hijack typing a capital "L" inside form fields.
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Already on the sign-in page? Then there is nothing to do.
      if (pathname === "/sign-in") return;

      event.preventDefault();
      route.push("/sign-in");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, route]);

  return null;
};

export default AdminShortcut;
