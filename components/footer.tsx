import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, GitCompareArrows, MapPin } from "lucide-react";

import { josefinSans } from "@/app/font";
import { listPage } from "@/config/site";
import { cn } from "@/lib/utils";

import { Separator } from "./ui/separator";
import { Instagram, LinkedIn } from "./ui/icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <p
        className={cn(josefinSans.className, "text-2xl font-bold md:text-4xl")}
      >
        Rahmita
      </p>
    </div>
  );
};

const Footer = () => {
  const pathname = usePathname();

  if (!listPage.map((item) => item.url).includes(pathname)) {
    return null;
  }

  return (
    <div className="my-12 flex items-center justify-center">
      <div className="container flex flex-col gap-y-8">
        <div className="flex flex-row justify-between gap-x-8">
          <div className="basis-1/3 text-wrap text-3xl font-semibold">
            Please feel free to get in touch with us
          </div>
          <div className="group/item group flex basis-1/3 flex-row gap-5 border border-transparent p-2 hover:border hover:border-main">
            <div>
              <MapPin className="text-main" size={36} />
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <p className="py-1 text-lg font-semibold">Our Location</p>
              <p
                className="hover:cursor-pointer hover:underline"
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/wRw4grjyeUpgTi5aA",
                    "_blank",
                  )
                }
              >
                Burangkeng, Jawa Barat, Indonesia
              </p>
            </div>
          </div>
          <div className="group/item flex basis-1/3 flex-row gap-5 border border-transparent p-2 hover:border hover:border-main">
            <div>
              <GitCompareArrows className="text-main" size={36} />
            </div>
            <div className="flex w-full flex-col gap-y-1">
              <p className="py-1 text-lg font-semibold">How Can We Help?</p>
              <ul className="flex flex-col gap-y-1">
                <li
                  className="group/link flex -translate-x-6 transition-all hover:-translate-x-3 hover:cursor-pointer hover:underline"
                  onClick={() =>
                    window.open("mailto:rparamitas@gmail.com", "_self")
                  }
                >
                  <span className="invisible mr-0.5 flex items-center transition-all delay-100 group-hover/link:visible group-hover/link:translate-x-1">
                    <ChevronRight className="size-5 h-fit" />
                  </span>
                  rparamitas@gmail.com
                </li>
                <li
                  className="group/link flex -translate-x-6 transition-all hover:-translate-x-3 hover:cursor-pointer hover:underline"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rahmita-paramita-763822154/",
                      "_blank",
                    )
                  }
                >
                  <span className="invisible mr-0.5 flex items-center transition-all delay-100 group-hover/link:visible group-hover/link:translate-x-1">
                    <ChevronRight className="size-5 h-fit" />
                  </span>
                  @Rahmita Paramita
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="container flex items-center justify-between">
          <Logo />
          <p>Made with ♥️ from Indonesia | 2025 Rahmita</p>
          <div className="flex flex-row space-x-4">
            <Tooltip>
              <TooltipTrigger>
                <Instagram
                  className="size-8 rounded p-1 hover:cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/rahmitaaps",
                      "_blank",
                    )
                  }
                />
              </TooltipTrigger>
              <TooltipContent>Instagram</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <LinkedIn
                  className="size-8 rounded p-1 hover:cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rahmita-paramita-763822154/",
                      "_blank",
                    )
                  }
                />
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
