import type { Metadata, Viewport } from "next";
import "./globals.css";
import { redHatText } from "./font";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : new URL(siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatText.className}`}>
        <ThemeProvider attribute={"class"} defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
