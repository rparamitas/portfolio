"use client";

import { listPage } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Logo } from "./footer";

const Navbar = () => {
  const route = useRouter();
  const pathname = usePathname();

  if (!listPage.map((item) => item.url).includes(pathname)) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <nav className="container flex h-12 items-center justify-between">
        <Logo />
        <ul className="flex flex-row space-x-4 text-lg">
          {listPage.map((item) => (
            <li
              key={item.title}
              onClick={() => route.push(item.url)}
              className="cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
