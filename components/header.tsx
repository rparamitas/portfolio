"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { listPage, siteConfig } from "@/config/site";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Logo } from "./footer";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const contactEmail = siteConfig.email;

const socials = [
  { label: "Instagram", href: siteConfig.links.instagram, Icon: FaInstagram },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: FaLinkedin },
];

const LogoutButton = ({ className }: { className?: string }) => {
  const [isPending, setIsPending] = useState(false);
  const { data: session } = authClient.useSession();

  // This is a personal site: visitors get no visible sign-in entry point. The
  // owner reaches /sign-in privately via the Shift+L shortcut instead
  // (see `components/admin-shortcut.tsx`).
  if (!session) return null;

  const handleSignOut = async () => {
    setIsPending(true);
    await authClient.signOut();
  };

  return (
    <Button
      variant={"outline"}
      size={"icon-lg"}
      onClick={handleSignOut}
      disabled={isPending}
      className={cn("size-11", className)}
      aria-label="Log out"
    >
      <LogOut className="size-5" />
    </Button>
  );
};

const BackstageButton = ({ className }: { className?: string }) => {
  const [isPending, setIsPending] = useState(false);
  const { data } = authClient.useSession();
  const route = useRouter();

  if (!data) return null;

  const onClick = () => {
    setIsPending(true);
    route.push("/backstage");
  };

  if (data.user.email !== "rparamitas@gmail.com") return null;

  return (
    <Button
      variant={"outline"}
      size={"icon-lg"}
      onClick={onClick}
      disabled={isPending}
      className={cn("size-11", className)}
      aria-label="Backstage"
    >
      <ShieldCheck className="size-5" />
    </Button>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!listPage.map((item) => item.url).includes(pathname)) {
    return null;
  }

  // The panel closes from the link handlers rather than from an effect keyed on
  // the pathname, because `react-hooks/set-state-in-effect` is an ESLint error
  // here and lint runs with --max-warnings 0.
  const closeMenu = () => setMenuOpen(false);

  const linkClass =
    "rounded font-medium decoration-primary decoration-2 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const stripLinkClass =
    "inline-flex h-11 items-center justify-center gap-2 rounded px-2 transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:px-3";

  return (
    <>
      {/* Contact strip: plain band that scrolls away — only the bar below
          pins. The sticky bar must not share a wrapper with the strip:
          `sticky` can never leave its containing block, so the old <nav>
          that wrapped both (as tall as the header itself) silently disabled
          the pinning. The pinning nav is therefore a direct child of the
          page flow. */}
      <div className="bg-primary border-b-2">
        <div className="text-primary-foreground container mx-auto flex items-center justify-between gap-4 px-4 py-1 text-sm">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li>
              <a
                href={`mailto:${contactEmail}`}
                aria-label={`Email ${contactEmail}`}
                className={stripLinkClass}
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="hidden font-medium md:inline">
                  {contactEmail}
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className={stripLinkClass}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                <span className="hidden font-medium md:inline">WhatsApp</span>
              </a>
            </li>
          </ul>
          <ul className="flex items-center">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Rahmita on ${label}`}
                  className="hover:bg-primary-hover focus-visible:outline-primary inline-flex size-11 items-center justify-center rounded transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="border-border bg-background sticky top-0 z-10 border-b-2"
      >
        <div className="container mx-auto flex items-center justify-between gap-4 px-10 py-4">
          <Link
            href={"/"}
            onClick={closeMenu}
            className="focus-visible:outline-primary rounded focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {/* md:text-2xl pulls the footer's md:text-4xl back down to the
                reference's navbar wordmark size. */}
            <Logo className="font-head md:text-2xl" />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {listPage.map((item) => {
              const isCurrent = pathname === item.url;

              return (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    onClick={closeMenu}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(linkClass, isCurrent && "underline")}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <BackstageButton />
            </div>
            <LogoutButton />
            <Button
              variant={"outline"}
              size={"icon-lg"}
              onClick={() => setMenuOpen((open) => !open)}
              className="size-11 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="contact-bar-navbar-menu"
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        <div
          id="contact-bar-navbar-menu"
          hidden={!menuOpen}
          className="border-border bg-background border-t-2 md:hidden"
        >
          <ul className="container mx-auto flex flex-col px-10 py-2">
            {listPage.map((item) => {
              const isCurrent = pathname === item.url;

              return (
                <li
                  key={item.title}
                  className="border-border border-b last:border-b-0"
                >
                  <Link
                    href={item.url}
                    onClick={closeMenu}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      linkClass,
                      "block py-3 text-lg",
                      isCurrent && "underline",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-border container mx-auto flex items-center gap-3 border-t-2 py-4">
            <ThemeToggle />
            <BackstageButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
