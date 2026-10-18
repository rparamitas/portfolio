import {
  Archivo_Black,
  JetBrains_Mono,
  Josefin_Sans,
  Space_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";

export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const archivoBlack = Archivo_Black({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "fallback",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "optional",
  weight: ["100", "200", "300", "400"],
  variable: "--font-jetbrains-mono",
});
