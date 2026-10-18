import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { PageIndicator } from "@/components/page-indicator";
import ConvexClientProvider from "./ConvexClientProvider";
import { archivoBlack, jetBrainsMono, spaceGrotesk } from "./font";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : new URL(siteConfig.url),
  openGraph: {
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
  // twitter:image comes from the twitter-image.tsx file convention; the card
  // type still has to be declared manually.
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${jetBrainsMono.variable}`}
    >
      <body className="selection:bg-primary selection:text-accent">
        <ConvexClientProvider>
          <ThemeProvider attribute={"class"} defaultTheme="light">
            <PageIndicator />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
