import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivoBlack, spaceGrotesk } from "./font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { PageIndicator } from "@/components/page-indicator";
import ConvexClientProvider from "./ConvexClientProvider";


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
    images: [
      {
        url: new URL("opengraph-image.png", siteConfig.url).toString(),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
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
    <html lang="en" suppressHydrationWarning >
      <body className={`${archivoBlack.className} ${spaceGrotesk.className}`}>
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
