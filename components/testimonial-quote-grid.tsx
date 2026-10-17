"use client";

import * as React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

import HarveyPhoto from "@/public/HarveyPhoto.jpeg";
import PriyonoPhoto from "@/public/BlankPhotoProfile.webp";
import GhinaPhoto from "@/public/GhinaPhoto.jpeg";
import { cn } from "@/lib/utils";

interface QuoteCardData {
  id: number;
  name: string;
  photo: string;
  position: string;
  quote: string;
}

const cards: QuoteCardData[] = [
  {
    id: 1,
    name: "Harvey",
    photo: HarveyPhoto.src,
    position: "Manager at Pillars — PT Pillars Cosmetiklon Indonesia",
    quote:
      "Rahmita joined our team at PT Pillars Cosmetiklon Indonesia as a Formulation R&D specialist, where they made remarkable contributions in developing high-quality skincare products, including the well-known Whitelab brand. Their creativity in formulating effective and innovative skincare solutions was exceptional. Rahmita demonstrated a deep understanding of active ingredients, excipients, and formulation techniques, which resulted in products that met and exceeded market expectations. Their proactive and solution-driven approach made them a valuable asset to the team.",
  },
  {
    id: 2,
    name: "Pak Priyono",
    photo: PriyonoPhoto.src,
    position: "Manager at PT. Derma Kosmetik Indonesia",
    quote:
      "It was a privilege to mentor Rahmita at PT Derma Kosmetik International. Their eagerness to learn and their ability to grasp complex cosmetic formulation processes stood out from day one. They quickly adapted to working with various active ingredients and excipients, ensuring the creation of high-quality cosmetic products. Rahmita's commitment to learning and improving, combined with their collaborative spirit, made them a standout member of the team. I am confident they will continue to achieve great success in the cosmetic industry.",
  },
  {
    id: 3,
    name: "Ghina",
    photo: GhinaPhoto.src,
    position: "CEO at PT. Glow Industri Herbal Care",
    quote:
      "As the Head of R&D Formulation at PT Glow Industri Herbal Care, Rahmita has demonstrated exceptional leadership and innovation. Under their guidance, the team has developed an impressive range of cosmetic products, from baby care to facial and skincare solutions. The attractive designs and high functionality of the products have garnered a strong customer base, resulting in over 50,000 repeat orders. Their ability to balance customer needs with innovative formulations has truly set a benchmark in the industry. Rahmita's dedication and expertise have made a significant impact on our business's success.",
  },
];

const animationDelays = [
  "[animation-delay:100ms]",
  "[animation-delay:200ms]",
  "[animation-delay:300ms]",
  "[animation-delay:400ms]",
];

// Collapsed quotes show exactly four text-lg lines (4 × 1.75rem).
const COLLAPSED_HEIGHT_PX = 112;

// Quote-card adapted from the neobrutalism "quote card grid" block: person
// photo in the footer strip, no organization logos, quotes capped at four
// lines with a "Read more" link that grows the card toward the bottom with an
// animated height transition.
const QuoteCard = ({
  card,
  className,
}: {
  card: QuoteCardData;
  className?: string;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [fullHeight, setFullHeight] = React.useState<number>();

  // The natural (unclamped) height is measured from an invisible copy of the
  // text so "Read more" only appears when the quote actually gets cut off.
  const measureRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    // Deferred a frame: setState from within the effect synchronously trips
    // react-hooks/set-state-in-effect (an error rule in this repo).
    const raf = requestAnimationFrame(() => {
      setFullHeight(measureRef.current?.offsetHeight);
    });

    return () => cancelAnimationFrame(raf);
  }, [card.quote]);

  const isClamped = fullHeight != null && fullHeight > COLLAPSED_HEIGHT_PX;
  const bodyId = `testimonial-quote-body-${card.id}`;

  return (
    <div
      className={cn(
        "border-border bg-card flex flex-col overflow-hidden rounded border-2 shadow-md",
        "transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex flex-1 items-start gap-4 p-8">
        <div className="text-foreground size-16 shrink-0">
          <Quote className="size-10" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col">
          <div
            id={bodyId}
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{
              maxHeight: expanded
                ? (fullHeight ?? "auto")
                : COLLAPSED_HEIGHT_PX,
            }}
          >
            <blockquote>
              <p
                className={cn("font-sans text-lg", !expanded && "line-clamp-4")}
              >
                {card.quote}
              </p>
            </blockquote>
          </div>
          {/* Invisible twin used only to measure the unclamped text height. */}
          <p
            ref={measureRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute text-lg"
          >
            {card.quote}
          </p>
          {isClamped && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => setExpanded((open) => !open)}
              className="focus-visible:outline-primary mt-3 w-fit cursor-pointer self-start rounded font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
      <div className="border-border flex items-center gap-4 border-t-2">
        <Image
          src={card.photo}
          alt={`Portrait of ${card.name}`}
          width={96}
          height={96}
          className="border-border bg-primary size-24 shrink-0 border-e-2 object-cover"
        />
        <div className="flex flex-col gap-2 pe-4">
          <h3 className="font-head text-xl leading-none font-medium">
            {card.name}
          </h3>
          <p className="text-muted-foreground font-sans text-sm">
            {card.position}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialQuoteGrid = () => {
  return (
    // items-start keeps sibling cards from stretching when one card grows.
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      {cards.map((card, index) => (
        <QuoteCard
          key={card.id}
          card={card}
          className={cn(
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards",
            animationDelays[index],
          )}
        />
      ))}
    </div>
  );
};

export default TestimonialQuoteGrid;
