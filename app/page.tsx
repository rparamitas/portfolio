import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import PhotoProfile from "@/public/rahmita.png";
import TestimonialQuoteGrid from "@/components/testimonial-quote-grid";
import About from "@/components/about";
import ServicesCarousel from "@/components/services-carousel";
import ProjectsList from "@/components/projects-list";
import ReviewMarquee from "@/components/review-marquee";
import ContactDialog from "@/components/contact-dialog";
import { Button } from "@/components/ui/button";
import { BurstShape, LightningShape, Star5Shape } from "@/components/ui/shapes";
import { cn } from "@/lib/utils";

// Home page section order (see README "Home page section order"):
// Hero → About → Services → Featured Projects → Testimonials → Footer.
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="border-border bg-muted relative overflow-hidden border-y-2 px-4 py-20 lg:px-8"
      >
        {/* Stepped brutalist decor — the lightning sits in the bottom
            padding band, clear of content at every breakpoint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <LightningShape
            size={64}
            strokeWidth={4}
            animation="wiggle-step"
            speed="fast"
            className="absolute bottom-8 left-[4%] stroke-(--border) text-(--destructive)"
          />
        </div>
        <div className="container mx-auto w-full">
          <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-12 xl:gap-16">
            <div className="relative order-2 flex flex-1 flex-col items-center text-center md:order-1 md:items-start md:text-left">
              <Star5Shape
                size={52}
                strokeWidth={5}
                animation="spin-step"
                speed="slow"
                className="pointer-events-none absolute -top-10 -left-10 hidden stroke-(--border) text-(--primary) lg:block"
              />
              <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards duration-500">
                <p className="font-sans text-base lg:text-lg">
                  Hi, my name is Rahmita Paramita Sudirman
                </p>
                <h1
                  id="hero-heading"
                  className="font-head mt-4 text-4xl leading-tight font-medium lg:text-5xl"
                >
                  I turn ideas <br />
                  into{" "}
                  <span className="border-border bg-primary text-primary-foreground mt-3 inline-block rotate-3 border-2 px-2">
                    realities.
                  </span>
                </h1>
              </div>
              <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards mt-4 max-w-xl font-sans text-base duration-500 [animation-delay:100ms] lg:text-lg">
                I&apos;m a Product Development Specialist based in Indonesia,
                with extensive experience in R&amp;D for cosmetic products, and
                I successfully made customers reorder cosmetic products as much
                as 10000+ pcs in each month.
              </p>
              <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards mt-8 flex flex-row gap-x-4 duration-500 [animation-delay:200ms]">
                <ContactDialog />
                <Button
                  size="lg"
                  variant="secondary"
                  nativeButton={false}
                  render={
                    <Link
                      href="/cv-rahmita.pdf"
                      download="cv-rahmita-paramita-sudirman.pdf"
                    />
                  }
                >
                  Download CV
                  <Download className="size-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards order-1 flex w-full flex-1 items-center justify-center duration-500 [animation-delay:300ms] md:order-2 md:justify-end">
              <div className="relative w-full max-w-sm">
                <BurstShape
                  size={72}
                  strokeWidth={5}
                  animation="pulse-hard"
                  speed="slow"
                  className="pointer-events-none absolute -top-8 -right-4 hidden stroke-(--border) text-(--primary) md:block lg:-right-8"
                />
                <div className="border-border bg-card relative border-2 shadow-xl">
                  <Image
                    src={PhotoProfile}
                    alt="Rahmita Paramita Sudirman"
                    priority
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="h-auto w-full grayscale transition duration-700 ease-in-out hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <About />

      {/* Services */}
      {/* `scroll-mt` clears the pinned navbar when /#services lands here. */}
      <div
        id="services"
        className="flex scroll-mt-24 items-center justify-center"
      >
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-24">
            <h2 className="text-center text-4xl font-bold">
              What I can do for you
            </h2>
            <ServicesCarousel />
          </div>
        </div>
      </div>

      {/* Featured Projects (subset + view all) */}
      <div className="bg-muted flex items-center justify-center">
        <div className="container flex flex-col gap-y-10 py-20">
          <h2 className="text-center text-4xl font-bold">Featured Projects</h2>
          <ProjectsList limit={3} />
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/projects" />}
            className={cn("self-center")}
          >
            View all projects
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Social proof (quotes + WhatsApp screenshots, merged) */}
      <div className="flex items-center justify-center">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-col items-center gap-y-2 text-center">
              <p className="font-head text-muted-foreground text-sm font-medium tracking-wide uppercase">
                What our customers say
              </p>
              <h2 className="text-center text-4xl font-bold">
                Don&apos;t just take our words. Over 70+ people trust me.
              </h2>
            </div>
            <TestimonialQuoteGrid />
            <div className="flex flex-col gap-y-10 md:mx-8">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-center text-3xl font-bold">
                  What they said
                </h3>
                <p className="text-muted-foreground text-center font-sans text-sm">
                  Click any chat to zoom in
                </p>
              </div>
              <ReviewMarquee />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
