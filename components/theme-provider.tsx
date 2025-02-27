"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "./navbar";
import Footer from "./footer";
import { TooltipProvider } from "./ui/tooltip";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NextThemesProvider {...props} forcedTheme="light">
      <TooltipProvider>
        <Navbar />
        {children}
        <Footer />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
