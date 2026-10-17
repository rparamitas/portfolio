"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Review1 from "@/public/review/review-1.jpg";
import Review4 from "@/public/review/review-4.jpg";
import Review5 from "@/public/review/review-5.jpg";
import Review7 from "@/public/review/review-7.jpg";
import Review8 from "@/public/review/review-8.jpg";
import Review9 from "@/public/review/review-9.jpg";
import Review10 from "@/public/review/review-10.jpg";
import Review11 from "@/public/review/review-11.jpg";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReviewShot {
  id: string;
  /** Static import object, so the lightbox can render it with intrinsic size. */
  img: StaticImageData;
  alt: string;
  /**
   * Every card window crops away the top quarter of the screenshot (status
   * bar + contact header). object-bottom keeps the newest messages; a custom
   * percentage slides the visible band up when the quote sits higher.
   */
  objectPosition?: string;
  /** Optional extra scale for screenshots whose header band runs deeper. */
  zoom?: number;
}

const rowOneShots: ReviewShot[] = [
  {
    id: "review-11",
    img: Review11,
    alt: 'Order invoice and payment proof for a 100-pcs re-order — "Masyaallah, di suruh order 100 pcs jadi malah segini 😭"',
  },
  {
    id: "review-10",
    img: Review10,
    alt: 'Before-and-after comparison after one and two weeks of use — "Masyallah pemakaian beberapa minggu aja udah keliatan banget hasilnya"',
  },
  {
    id: "review-7",
    img: Review7,
    alt: 'Customer chat: many followers pre-ordering — "produknya sudah banyak yang ikutan p.o… mantul pokoknyaa 💯💸"',
    objectPosition: "50% 88%",
  },
  {
    id: "review-1",
    img: Review1,
    alt: 'Customer chat asking to keep the product quality consistent — "pertahankan kualitasnya"',
    objectPosition: "50% 100%",
  },
];

const rowTwoShots: ReviewShot[] = [
  {
    id: "review-5",
    img: Review5,
    alt: 'Customer approving the sample straight to production — "Alhamdulillah cocok kakk, wanginya juga nempel… Sat set langsung produksiii 🤗"',
  },
  {
    id: "review-9",
    img: Review9,
    alt: 'Customer feedback on the formulation — "formulasiny okk, kulitku yang sensitif ternyata adem… aromanya juga enak"',
  },
  {
    id: "review-4",
    img: Review4,
    alt: 'Customer message: "Mantul banget produknyaa 😭💯"',
    objectPosition: "50% 100%",
    zoom: 1.15,
  },
  {
    id: "review-8",
    img: Review8,
    alt: 'Customer sharing the sample with friends — "Aku share ke temen2 ku, cuma kasih 5gr aja udah pada kelihatan"',
  },
];

const shots = [...rowOneShots, ...rowTwoShots];
const shotsPerPage = 4;

const TILTS = ["rotate-2", "-rotate-2"];

// Each copy renders the same cards with a trailing padding equal to the inner
// gap, so the animated -50% track shift loops without a seam.
const ReviewRowCopy = ({
  cards,
  clone = false,
  onCardClick,
}: {
  cards: ReviewShot[];
  clone?: boolean;
  onCardClick?: (index: number) => void;
}) => (
  <div aria-hidden={clone || undefined} className="flex items-start gap-6 pe-6">
    {cards.map((shot, index) => (
      <button
        key={shot.id}
        type="button"
        tabIndex={clone ? -1 : undefined}
        aria-label={`Zoom WhatsApp review: ${shot.alt}`}
        onClick={() => onCardClick?.(index)}
        className={cn(
          "border-border bg-card relative w-64 shrink-0 rounded-lg border-2 p-2 shadow-md",
          "transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg",
          "focus-visible:outline-ring cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4",
          TILTS[index % TILTS.length],
          !clone &&
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-backwards",
          !clone &&
            (index % TILTS.length === 0
              ? "[animation-delay:100ms]"
              : "[animation-delay:200ms]"),
        )}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md">
          <Image
            src={shot.img.src}
            alt=""
            fill
            sizes="256px"
            className="object-cover"
            style={{
              objectPosition: shot.objectPosition ?? "bottom",
              transform: shot.zoom ? `scale(${shot.zoom})` : undefined,
            }}
          />
        </div>
      </button>
    ))}
  </div>
);

const MarqueeRow = ({
  cards,
  animationClass,
  delay,
  onOpen,
}: {
  cards: ReviewShot[];
  /** Tailwind animation utility (direction + duration) for this row's track. */
  animationClass: string;
  /** Negative delays offset each row so they don't move in lockstep. */
  delay: string;
  onOpen: (index: number) => void;
}) => (
  <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_13%,black_87%,transparent)]">
    <div
      style={{ animationDelay: delay }}
      className={cn(
        "flex w-max items-start",
        animationClass,
        "group-hover/row:[animation-play-state:paused]",
      )}
    >
      <ReviewRowCopy cards={cards} onCardClick={onOpen} />
      <ReviewRowCopy cards={cards} clone onCardClick={onOpen} />
    </div>
  </div>
);

// Replacement for the old 11-image masonry: the eight strongest WhatsApp
// screenshots drift as two auto-scrolling rows (pause on hover), each opening
// the uncropped original in a neobrutalist dialog.
const ReviewMarquee = () => {
  const [selected, setSelected] = React.useState<number | null>(null);

  const move = (delta: number) =>
    setSelected((current) =>
      current === null
        ? current
        : (current + delta + shots.length) % shots.length,
    );

  const handleDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      <MarqueeRow
        cards={rowOneShots}
        animationClass="motion-safe:animate-[marquee-left_44s_linear_infinite]"
        delay="0s"
        onOpen={(index) => setSelected(index)}
      />
      <MarqueeRow
        cards={rowTwoShots}
        animationClass="motion-safe:animate-[marquee-right_52s_linear_infinite]"
        delay="-18s"
        onOpen={(index) => setSelected(shotsPerPage + index)}
      />

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          onKeyDown={handleDialogKeyDown}
          className="rounded-lg sm:max-w-md"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>WhatsApp customer review</DialogTitle>
            <DialogDescription>
              Browse with the arrow buttons or your keyboard&apos;s left and
              right keys, press Esc or click outside to close.
            </DialogDescription>
          </DialogHeader>
          {selected !== null && (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() => move(-1)}
                  className="border-border bg-card hover:bg-accent focus-visible:outline-primary grid size-11 shrink-0 cursor-pointer place-items-center self-center rounded border-2 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0.5"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <div className="relative min-w-0 flex-1">
                  <Image
                    src={shots[selected].img}
                    alt={shots[selected].alt}
                    draggable={false}
                    sizes="640px"
                    className="mx-auto max-h-[72vh] w-auto rounded-md"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() => move(1)}
                  className="border-border bg-card hover:bg-accent focus-visible:outline-primary grid size-11 shrink-0 cursor-pointer place-items-center self-center rounded border-2 shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0.5"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-center font-sans text-sm">
                {shots[selected].alt}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewMarquee;
