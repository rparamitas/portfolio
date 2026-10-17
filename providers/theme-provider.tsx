"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import AdminShortcut from "@/components/admin-shortcut";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        {/* Renders nothing; gives the site owner a private Shift+L → /sign-in
            shortcut on every page. */}
        <AdminShortcut />
        <Header />
        {children}
        <Footer />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
