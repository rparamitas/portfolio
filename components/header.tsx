"use client";

import { listPage } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./footer";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { josefinSans } from "@/app/font";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  const route = useRouter();
  const pathname = usePathname();

  if (!listPage.map((item) => item.url).includes(pathname)) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-center bg-white dark:bg-black">
      <nav className="container flex h-12 items-center justify-between px-10 md:mx-8 md:px-0">
        <Logo />
        <div className="flex flex-row items-center space-x-4">
          <ul className="flex flex-row space-x-4 text-lg">
            {listPage.map((item) => (
              <li
                key={item.title}
                onClick={() => route.push(item.url)}
                className={cn(
                  "group flex transform cursor-pointer flex-row items-center justify-center text-lg transition-transform hover:translate-x-2 md:text-xl dark:text-white",
                  josefinSans.className,
                  listPage.find((page) => page.url === pathname)?.title ===
                    item.title && "underline",
                )}
              >
                <ChevronRight
                  className={cn("invisible h-4 w-4 group-hover:visible")}
                />
                {item.title}
              </li>
            ))}
          </ul>
          <ThemeToggle className="dark:text-white" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
