"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin, Mail } from "lucide-react";

import { listPage, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import rahmitaPhoto from "@/public/rahmita.png";

import { services } from "./services-carousel";

// The typeface is supplied by the caller: the header renders the wordmark in
// the display face. Passing the font in avoids `cn()` having to out-rank a
// next/font class by stylesheet order. (The rebuilt footer has its own brand
// block below, so this component now serves the header.)
export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <p className={cn("text-2xl font-bold md:text-4xl", className)}>Rahmita</p>
    </div>
  );
};

const socials = [
  {
    href: siteConfig.links.instagram,
    label: `Rahmita on Instagram`,
    Icon: Instagram,
  },
  {
    href: siteConfig.links.linkedin,
    label: `Rahmita on LinkedIn`,
    Icon: Linkedin,
  },
  {
    href: `mailto:${siteConfig.email}`,
    label: `Email ${siteConfig.email}`,
    Icon: Mail,
  },
];

// Square neobrutalism buttons: lift on hover, press back down on click.
const socialLinkClass =
  "inline-flex size-11 items-center justify-center rounded border-2 border-border bg-card shadow-md transition-[translate,box-shadow,background-color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const headingClass = "mb-6 font-head text-xl tracking-wide uppercase";

const navLinkClass =
  "rounded decoration-primary decoration-2 underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const Footer = () => {
  const pathname = usePathname();

  if (!listPage.map((item) => item.url).includes(pathname)) {
    return null;
  }

  return (
    <footer
      aria-label="Site footer"
      className="border-border bg-background border-t-2"
    >
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand: mark, blurb, then the social buttons. */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="focus-visible:outline-primary mb-3 inline-flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="bg-primary border-border inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded border-2 shadow-sm">
                {/* The portrait is an RGBA cutout, so `object-contain`
                    lets the primary colour frame it. */}
                <Image
                  src={rahmitaPhoto}
                  alt=""
                  width={28}
                  height={28}
                  className="size-9 object-contain"
                />
              </span>
              <span className="font-head text-3xl">Rahmita</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
              Formulation specialist turning ideas into market-ready cosmetic
              products. Based in Burangkeng, Jawa Barat, Indonesia.
            </p>
            <ul className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className={socialLinkClass}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore: the same top-level pages as the navbar. */}
          <nav aria-label="Explore">
            <p className={headingClass}>Explore</p>
            <ul className="space-y-2">
              {listPage.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className={navLinkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services: the titles come from the home-page carousel so the two
              sections can never drift apart; each link lands on the carousel
              section via the /#services anchor. */}
          <nav aria-label="Services">
            <p className={headingClass}>Services</p>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="/#services" className={navLinkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in touch */}
          <nav aria-label="Get in touch">
            <p className={headingClass}>Get in touch</p>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={navLinkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass}
                >
                  Burangkeng, Jawa Barat, Indonesia
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="text-primary-foreground border-border bg-primary border-t-2">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 text-sm md:flex-row">
          <p className="font-medium">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Made with ♥️ from Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
