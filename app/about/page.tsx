import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";

import MySelf from "@/public/my-photo.png";

// Layout mirrors neobrutalism.com's "Portrait — About me" block; the copy,
// portrait, expertise, and socials are Rahmita's own.
const expertise = [
  "Product Development",
  "R&D Cosmetic",
  "Time Management",
  "Detail-oriented",
];

const socials = [
  { label: "Instagram", href: siteConfig.links.instagram, Icon: FaInstagram },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: FaLinkedin },
];

const socialIconClass =
  "inline-flex size-11 items-center justify-center rounded border-2 border-border bg-card shadow-md transition-[translate,box-shadow,background-color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:text-primary-foreground/70";

const chipClass =
  "font-semibold rounded inline-flex items-center outline-2 outline-foreground text-foreground px-2.5 py-1.5 text-sm";

const AboutPage = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-16">
          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards relative mx-auto w-full max-w-[400px] duration-500 lg:mx-0">
            <div className="border-border bg-card relative aspect-square border-2 shadow-[-16px_16px_0px_0px_var(--color-primary)]">
              <Image
                src={MySelf}
                alt="Portrait of Rahmita Paramita Sudirman"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="border-border bg-card absolute end-4 -bottom-5 inline-flex items-center gap-2 rounded border-2 px-3 py-1.5 shadow-md">
              <span
                aria-hidden="true"
                className="border-border bg-primary size-3.5 shrink-0 rounded-full border-2"
              ></span>
              <span className="font-head text-sm font-medium">
                Available for new work
              </span>
            </p>
          </div>

          <div className="text-center lg:text-start">
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards duration-500 [animation-delay:100ms]">
              <span className="bg-primary text-primary-foreground mb-6 inline-flex -rotate-1 items-center rounded px-2.5 py-1.5 text-sm font-semibold shadow-xs outline-2">
                About
              </span>
              <h2
                id="about-heading"
                className="font-head mb-3 text-3xl font-semibold lg:text-6xl"
              >
                About Me
              </h2>
              <p className="font-head mb-6 text-lg font-medium">
                Rahmita Paramita Sudirman — Product Development Specialist,
                Indonesia
              </p>
            </div>

            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards text-muted-foreground mb-8 space-y-4 duration-500 [animation-delay:200ms]">
              <p className="font-sans text-lg">
                I am someone who likes to learn new cases that are interesting
                and challenging at work, and focused on finding the best
                alternative solutions to various problems.
              </p>
              <p className="font-sans text-lg">
                I am a hard worker and tend to be able to do things in detail,
                and have good time and work management.
              </p>
            </div>

            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards duration-500 [animation-delay:300ms]">
              <ul className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {expertise.map((item) => (
                  <li key={item}>
                    <span className={chipClass}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  nativeButton={false}
                  render={<Link href="mailto:rparamitas@gmail.com" />}
                >
                  Contact me
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/" />}
                >
                  View portfolio
                </Button>
              </div>
              <ul className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Rahmita on ${label}`}
                      className={socialIconClass}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
