"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <Header />
        {children}
        <Footer />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
