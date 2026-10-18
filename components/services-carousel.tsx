"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";

import Innovative from "@/public/featured/innovative.jpg";
import FormulationProcess from "@/public/featured/formulation-process.png";
import ProductionCosmetics from "@/public/featured/production-cosmetics.webp";
import AnalyticalDevelopment from "@/public/featured/analytical-development.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Innovative Cosmetic Product Development",
    description:
      "I specialize in developing effective and market-ready cosmetic products tailored to your brand's goals. Whether you're a startup or an established business, I can assist with concept ideation, ingredient research, and formulation experiments to create innovative products that resonate with your audience and drive growth.",
    image: Innovative,
  },
  {
    id: 2,
    title: "Formulation & Process Optimization",
    description:
      "From skincare and baby care to facial and personal care, I can formulate products that cater to diverse consumer needs. Leveraging my experience in R&D, I can work with you to refine formulations, select the right active ingredients and excipients, and ensure compliance with industry standards while maintaining product efficacy and appeal.",
    image: FormulationProcess,
  },
  {
    id: 3,
    title: "Scalable Production and Quality Assurance",
    description:
      "I can help you transition from prototypes to large-scale production with ease. With my experience in managing product development pipelines and overseeing repeat orders of 50,000+ units, I ensure your products maintain consistent quality and meet customer expectations at scale.",
    image: ProductionCosmetics,
  },
  {
    id: 4,
    title: "Analytical Development for Product Quality",
    description:
      "With expertise in analytical development, I ensure the highest quality and consistency in cosmetic formulations. I have hands-on experience using HPLC (High-Performance Liquid Chromatography) to analyze active ingredients, stability, and overall product integrity. This ensures that each batch meets industry standards and performs as expected, enhancing product reliability and customer trust.",
    image: AnalyticalDevelopment,
  },
];

// Each content owns the progress bar individually: it fills 0 → 100% over
// SLIDE_DELAY_MS for the currently shown slide, resets every time the carousel
// moves (autoplay step, manual swipe, keyboard), and at the end of the last
// content the loop animation moves back to content 1 — then it fills from 0% again.
const SLIDE_DELAY_MS = 7000;
const TICK_MS = 60;

// Replacement for the old MyJobs rotor — built on the neobrutalism carousel
// (Embla): swipable full-width slides, no visible arrows, autoplay with a
// per-slide progress bar below the content.
const ServicesCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [progress, setProgress] = React.useState(0);
  const [, setIsHovering] = React.useState(false);

  // Refs mirror the interval's mutable state: the timer'd callbacks read these
  // without re-registering the interval whenever hover state flips.
  const elapsedRef = React.useRef(0);
  const isPausedRef = React.useRef(false);

  const pause = () => {
    isPausedRef.current = true;
    setIsHovering(true);
  };

  const resume = () => {
    isPausedRef.current = false;
    setIsHovering(false);
  };

  // Any slide change (autoplay step, manual swipe, keyboard) restarts the bar.
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      elapsedRef.current = 0;
      setProgress(0);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Autoplay driver: pause on hover → the bar freezes with the slide; when the
  // current content has had its full time, advance to the next one.
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      elapsedRef.current += TICK_MS;

      if (elapsedRef.current >= SLIDE_DELAY_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        api.scrollNext();
      } else {
        setProgress(elapsedRef.current / SLIDE_DELAY_MS);
      }
    }, TICK_MS);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className="w-full" onMouseEnter={pause} onMouseLeave={resume}>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {services.map((service) => (
            <CarouselItem key={service.id}>
              <article className="border-border bg-card flex flex-col items-center gap-6 border-2 p-6 shadow-md md:flex-row md:gap-10 md:p-10">
                <div className="border-border relative h-60 w-full shrink-0 border-2 md:h-72 md:w-2/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-4">
                  <h3 className="font-head text-2xl leading-snug md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Keyboard support only — visually hidden so no arrows are shown. */}
        <CarouselPrevious className="sr-only" />
        <CarouselNext className="sr-only" />
      </Carousel>

      {/* Per-content time progress bar below the content */}
      <div
        role="progressbar"
        aria-label="Time remaining for the current slide"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="border-border bg-card mx-auto mt-8 h-2.5 w-56 max-w-full border-2 shadow-xs"
      >
        <div
          className="bg-primary h-full transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ServicesCarousel;
