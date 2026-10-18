import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ExplosionShape,
  GearShape,
  HeartShape,
  Star6Shape,
} from "@/components/ui/shapes";
import Innovation from "@/public/featured/innovation.jpg";
import SkincareProducts from "@/public/featured/skincare-products.webp";
import Decorative from "@/public/featured/decorative.jpg";
import WhiteLabel from "@/public/whitelabel/white-label-beauty-products.webp";

const values = [
  {
    title: "Who I am",
    description:
      "A Product Development Specialist based in Indonesia, focused on R&D for cosmetic products — from skincare to baby care.",
  },
  {
    title: "What I do",
    description:
      "I turn early concepts into effective, market-ready products: ideation, ingredient research and hands-on formulation experiments.",
  },
  {
    title: "How I work",
    description:
      "Lab to production line: analytical development (HPLC), stability testing, process optimization and quality assurance at scale.",
  },
  {
    title: "Why it works",
    description:
      "Because the products earn reorders — over 10,000 pcs every month from customers who keep coming back.",
  },
];

export default function About() {
  return (
    <section
      aria-labelledby="about-me-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards mb-12 flex flex-col items-start justify-between gap-6 duration-500 sm:mb-16 md:flex-row md:items-end">
          <div>
            <h2
              id="about-me-heading"
              className="font-head mb-4 text-3xl font-semibold lg:text-6xl"
            >
              About me
            </h2>
            <p className="text-muted-foreground max-w-md font-sans text-lg">
              I&apos;m a Product Development Specialist turning cosmetic ideas
              into market-ready products — from the first formulation sketch to
              a production line your customers reorder from.
            </p>
          </div>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/about" />}
          >
            Learn more
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-5">
          {/* Numbered cards */}
          <ol className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards col-span-1 grid list-none grid-cols-1 gap-4 p-0 duration-500 [animation-delay:100ms] md:grid-cols-2 lg:col-span-3">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="border-border bg-card border-2 p-6 shadow-md transition-[translate,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="border-border bg-primary font-head text-primary-foreground mb-4 inline-flex size-10 items-center justify-center border-2 text-lg font-bold shadow-xs"
                >
                  {index + 1}
                </span>
                <h3 className="font-head mb-2 text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {value.description}
                </p>
              </li>
            ))}
          </ol>

          {/* Photo collage — stepped bob, staggered per card; one brutalist
              sticker per card, corners chosen so nothing overlaps the gap
              between the two columns or the viewport edge */}
          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards col-span-1 grid grid-cols-2 gap-6 duration-500 [animation-delay:200ms] lg:col-span-2">
            <div className="flex flex-col gap-6 lg:mt-8">
              <div className="bk-bob-step relative [animation-delay:0ms]">
                <GearShape
                  size={48}
                  strokeWidth={4}
                  animation="spin-step"
                  speed="slow"
                  className="pointer-events-none absolute -top-4 -right-4 stroke-(--border) text-(--primary)"
                />
                <div className="border-border bg-card border-2 shadow-lg">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={Innovation}
                      alt="Illustration of a head filled with gears and a lightbulb, symbolizing new product ideas"
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover grayscale transition duration-700 ease-in-out hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
              <div className="bk-bob-step relative [animation-delay:300ms]">
                <Star6Shape
                  size={44}
                  strokeWidth={4}
                  animation="pulse-hard"
                  speed="fast"
                  className="pointer-events-none absolute -bottom-4 -left-4 stroke-(--border) text-(--primary)"
                />
                <div className="border-border bg-card border-2 shadow-lg">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={SkincareProducts}
                      alt="Flat-lay of finished skincare products, from jars to dropper bottles"
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover grayscale transition duration-700 ease-in-out hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:-mt-8">
              <div className="bk-bob-step relative [animation-delay:150ms]">
                <HeartShape
                  size={44}
                  strokeWidth={5}
                  animation="float-step"
                  speed="slow"
                  className="pointer-events-none absolute -top-4 -right-4 stroke-(--border) text-(--destructive)"
                />
                <div className="border-border bg-card border-2 shadow-lg">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={Decorative}
                      alt="Flat-lay of makeup products, brushes and palettes"
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover grayscale transition duration-700 ease-in-out hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
              <div className="bk-bob-step relative [animation-delay:450ms]">
                <ExplosionShape
                  size={52}
                  strokeWidth={4}
                  animation="wiggle-step"
                  className="pointer-events-none absolute -bottom-4 -left-4 stroke-(--border) text-(--destructive)"
                />
                <div className="border-border bg-card border-2 shadow-lg">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={WhiteLabel}
                      alt="White-label beauty packaging ready for a client's brand"
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover grayscale transition duration-700 ease-in-out hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
