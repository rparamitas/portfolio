import { StaticImageData } from "next/image";

import FormulationProcess from "@/public/featured/formulation-process.png";
import Decorative from "@/public/featured/decorative.jpg";
import Herbiglow from "@/public/herbiglow/herbiglow-1.webp";
import HerbikidsBabyCream from "@/public/herbikids/baby-cream.webp";
import SkinSpace from "@/public/skinspace/skinspace-1.webp";
import WhiteLabel from "@/public/whitelabel/white-label-beauty-products.webp";

interface BlogSection {
  heading?: string;
  body: string[];
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date — yyyy-mm-dd. Formatted for display with formatIsoDate. */
  date: string;
  image: StaticImageData;
  content: BlogSection[];
}

// Sorted newest first. Posts[0] is the featured story on /blog, the rest
// render in the 3-column grid below it.
export const Posts: Blog[] = [
  {
    id: 1,
    slug: "formulating-for-sensitive-skin-lessons-from-baby-care",
    title:
      "Formulating for sensitive skin: what baby care taught me about adult products",
    excerpt:
      "Sensitive skin is not a niche concern — it is the baseline I design for. Here is what formulating baby care for years taught me about building gentle but effective adult products.",
    category: "Formulation",
    date: "2026-10-06",
    image: FormulationProcess,
    content: [
      {
        heading: "Start milder than you think you need to",
        body: [
          "When people describe their skin as sensitive, they usually mean one of three things: it stings with fragrance, it tightens after washing, or it reddens in the first minutes of applying anything new. A formulation that handles all three rarely comes from softening an adult formula — it comes from starting at baby-level mildness and adding performance back carefully.",
          "In practice that means choosing surfactants the way I do for Herbikids: replacing a heavy sodium-laurel base with amphoteric and glucoside-type cleansers that leave the barrier intact, and keeping the pH close to the skin's natural 5.5 instead of chasing a stronger feel of clean. Those two decisions alone prevent a large part of the complaints I used to see in adult cleansers.",
        ],
      },
      {
        heading: "Preservation is a formulation decision, not an afterthought",
        body: [
          "Sensitive-skin products are usually the ones marketed as 'free from', and free-from thinking often pushes preservatives out too. But an unpreserved cream is a risk to the very people it claims to help, so I treat preservation as part of the core chemistry: low-water systems, chelating helpers, and preservative systems proven for the exact water activity of the product — never a leftover system imported from a rougher formula.",
          "The same discipline applies to fragrance. A baby care project I worked on uses no added fragrance at all; the adult version of that thinking is not adding a light fragrance, it is asking whether the product needs one to feel finished. Nearly always the answer is no — the texture should finish the job the scent was pretending to do.",
        ],
      },
      {
        heading: "Testing with real users beats a clean INCI list",
        body: [
          "The best formula I have ever released for reactive skin did not come from an ingredient audit — it came from a panel of twenty people who reacted to everything in their bathroom. Watching what they felt in the first five minutes of use taught me more than any claim could, and taught me that comfort after absorption matters more than the draw of a silky application.",
          "That is why every gentle product I develop now finishes with a wear test, not only a stability test. Stability tells you the product is safe to sell; the wear test tells you whether sensitive skin will actually come back for the second bottle.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "building-herbikids-gentle-baby-care-from-natural-ingredients",
    title:
      "Building Herbikids: gentle baby care with natural ingredients, from scratch",
    excerpt:
      "Herbikids started with one rule: if an ingredient is not gentle enough for daily use on a newborn, it does not ship. How the baby cream and baby perfume came together, barrel by barrel.",
    category: "Baby Care",
    date: "2026-09-08",
    image: HerbikidsBabyCream,
    content: [
      {
        heading: "The brief: soft skin, minimal fragrance, zero shortcuts",
        body: [
          "A baby's skin is thinner, holds more water, and loses moisture faster than adult skin, which makes every formula decision twice as consequential. For the baby cream, that translated into a short ingredient list with a plant-oil backbone — fewer, well-understood emollients that occlude gently instead of a long list of actives borrowed from adult skincare.",
          "I deliberately avoided the usual shortcut of adding a strong 'clean' fragrance to signal freshness. Baby care products should smell like almost nothing; parents do the imagining. What we load instead is function: enough emollience to survive diaper changes and bath time without reapplying every hour.",
        ],
      },
      {
        heading: "Choosing what 'natural' means in practice",
        body: [
          "'Natural' is a marketing word, but it has a formulation meaning I can defend: sourcing the core emollients from crops rather than petrochemical routes, protecting them with mild preservation, and keeping allergen-loving extras like strong botanical extracts out of the formula rather than in it. Natural does not mean every plant on the shelf belongs in a baby product — some of the strongest sensitizers I have seen come from the natural aisle.",
          "So Herbikids leans on a small set of natural workhorses and validates them against the same stability and microbial tests any clinical product must pass. The formula is natural where nature is the gentlest option, and conventional where safety demands it.",
        ],
      },
      {
        heading: "Why baby perfume exists at all",
        body: [
          "The baby perfume surprises people, but the reasoning is concrete: after a bath, parents often reach for an adult cologne next to the nursery, and those are loaded with allergens and alcohol far above what delicate skin handles. A baby-safe alternative — very low alcohol, trace fragrance load, allergen-disclosed — replaces a genuinely risky habit instead of adding a new one.",
          "It also became a lesson in restraint I carry across the whole line: in baby care, what you leave out is the product.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "decorative-cosmetics-cushion-lab-to-market",
    title:
      "Inside decorative cosmetics: cushion and lip tint, from lab to market",
    excerpt:
      "Color cosmetics are chemistry you can see in the mirror — which makes getting them wrong twice as visible. Notes from developing cushions, lip tints and lip creams: texture, payoff, and the decisions that make or break a shade.",
    category: "Decorative Cosmetics",
    date: "2026-08-14",
    image: Decorative,
    content: [
      {
        heading: "Cushion formulas live or die on water management",
        body: [
          "A cushion compact looks simple — a saturated sponge and a lightweight base — but the inside of that sponge is a hostile home for an emulsion. Pigment, film formers and preservatives all behave differently when the base spends months in a closed cup instead of a tube, and every formula decision has to survive that storage.",
          "Evaporation through the holes in the cushion surface, and oxidation of the oils as air replaces the product, mean the cushion formula must be more robust than its tube equivalent. Formulators compensate by over-building the emulsion system, choosing evaporation-resistant humectants, and controlling exactly how much air the refill carries.",
        ],
      },
      {
        heading: "Lip tint: watching pigment bloom in a bottle",
        body: [
          "The pleasure of a lip tint is the afterglow: a stain color that keeps developing minutes after application. In the lab that effect is a controlled dye and solvent system — the solvent carries the dye into the upper layers of the lip and then leaves. Too fast, and the tint disappears with it; too slow, and the shade you swatch is never the shade you wear.",
          "Shading is where decorative formulation becomes honest artistry: a shade that looks perfect on the swatch but shifts toward brick on the lip has been tuned for the swatch, not the mouth. That is why every candidate goes through a wear test on people before a sampling run.",
        ],
      },
      {
        heading: "Quality control before a shade goes out the door",
        body: [
          "Decorative formulas live in public, so QC has to be visible to the customer in the best sense: every batch gets checked for shade drift against the master, spread behavior on artificial skin, and resistance to breaking under transport vibration.",
          "I treat a signed-off shade as a promise: the cushion chosen for a shelf should be identical to the batch that filled it months earlier — same tone, same payoff, same finish.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "a-formulators-guide-to-sunscreen-balancing-protection-texture",
    title:
      "A formulator's guide to sunscreen: balancing protection, texture and comfort",
    excerpt:
      "High SPF means very little if the sunscreen is never reapplied. What I optimize when developing daily sunscreens like SkinSpace — from filter loading to how the product feels thirty minutes after applying it.",
    category: "Sunscreen",
    date: "2026-07-11",
    image: SkinSpace,
    content: [
      {
        heading: "SPF is a floor, not a finish line",
        body: [
          "SPF 30 or 50 is only the start of sunscreen development; it says nothing about the experience. A product can test at an excellent SPF and still be abandoned forever after two sweaty days of feeling like a heavy sticky mask.",
          "So I treat SPF as the floor and everything after it as shaping the wear. I never let a formula leave the lab just because it tests well in the machine when everyone who tries it wants to wash it off.",
        ],
      },
      {
        heading: "Texture is the real compliance engine",
        body: [
          "The best sunscreen is the one people actually wear every day, and compliance is mostly a texture decision. For SkinSpace I chased three things in that order: filters at the protection floor, a base that spreads thin without white cast, and a finish that behaves like skincare rather than like makeup.",
          "That last point matters more than it sounds. When the finish leaves skin matte and silent, sunscreen stops being a chore and starts being the natural step before anything else — which is the whole point of daily protection.",
        ],
      },
      {
        heading: "Mineral or organic filters? It depends.",
        body: [
          "Zinc-oxide formulas have earned their reputation for sensitive and reactive skin, but they bring white cast and textural weight. Modern organic filter blends spread nearly invisible and still hit excellent SPFs, which is why they dominate daily wear products — but they ask more of solubility and compatibility work.",
          "There is no universal 'better' choice, only the right one for the person and the promise. Formulating both, and knowing when to pick which, is the actual skill.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "whitelabel-cosmetics-what-it-takes-to-launch-your-own-line",
    title: "Whitelabel cosmetics: what it really takes to launch your own line",
    excerpt:
      "Launching a skincare or bodycare brand is easier than it has ever been — and easier than ever to get wrong. A practical walkthrough of formula selection, packaging, and go-to-market for whitelabel products.",
    category: "Whitelabel",
    date: "2026-06-05",
    image: WhiteLabel,
    content: [
      {
        heading: "Ready-made vs customizable formulas",
        body: [
          "Whitelabel has two doors. The first is a proven stock formula you rebrand as-is: fast to market, low minimums, and honest about being a product many other brands could also sell. The second is customization — adjusting texture, fragrance, active levels, so the product becomes yours in fact and not just on the label.",
          "Both can work, but they are different businesses. Stock formulas fit a brand built on community and price; customization fits a brand making a specific promise its formula can keep. Knowing which door your idea actually needs saves months and a lot of money.",
        ],
      },
      {
        heading: "Packaging decisions that quietly define the brand",
        body: [
          "For most whitelabel launches, packaging is the first real product decision — buyers feel it before they experience the formula. Pump closures against jars matter for preservation as much as looks; primary packaging has to protect the product's shelf life, not just the shelf.",
          "My rule of thumb: spend your customization budget on the details users touch every day — closure feel, visual weight, the words on the label — before spending it on secondary packaging nobody keeps.",
        ],
      },
      {
        heading: "Minimum viable artistry: where to spend, where to save",
        body: [
          "The most common whitelabel failure I see is not bad chemistry — it is a brand that tried to launch six products at once with the same money that should have launched one great one. A tight line of two to three products, each with a clear reason to exist, beats a full catalog of me-too items every time.",
          "Wherever the money is thin, put it into the hero product's formula and its first impression, because a whitelabel line grows on one repeatable great experience, not a wide launch.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "from-brief-to-formula-reality",
    title: "From brief to formula: translating marketing claims into lab work",
    excerpt:
      "A claim like 'visible glow in four weeks' is a sentence, not a formula. How I break marketing briefs into measurable targets, ingredient candidates and an order of experiments before scale-up.",
    category: "Product Development",
    date: "2026-05-01",
    image: Herbiglow,
    content: [
      {
        heading: "Turning a claim into a measurable target",
        body: [
          "Every brief arrives as language, and language is the enemy of formulation until it becomes numbers. 'Deeply hydrating' might mean higher humectant loading, extra occlusion, or faster absorption — three different chemistries behind one adjective. My first job on any project is to force the words into targets: a texture profile, a sensory word bank, an active level someone is willing to pay for and defend.",
          "For Herbiglow's glowing essence, that meant agreeing on what 'glow' would look and feel like in four weeks — a hydrated surface with visibly calmer tone — before a single gram was weighed.",
        ],
      },
      {
        heading: "Building the experiment ladder",
        body: [
          "With targets fixed, the work becomes planning the shortest ladder of experiments that gets there. Taking the hardest question first — usually the active system — saves whole months compared with the tempting route of perfecting the pleasant base before knowing whether the star ingredient even works in it.",
          "Each rung of the ladder has a pass or fail criterion written down before the beaker is touched, which keeps a project moving when a batch comes back disappointing.",
        ],
      },
      {
        heading: "When to say no to a brief",
        body: [
          "Not every claim is achievable within budget, timeline, and regulation, and the most valuable thing a formulator can bring to a brand conversation is sometimes a polite no — plus the closest thing to it that is achievable. Saying yes to everything is how products end up making promises their ingredients never had a chance to keep.",
          "Honest briefs make honest products, and honest products are what earn the repeat purchase — in whitelabel work as much as in my own brands.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): Blog | undefined {
  return Posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  previous?: Blog;
  next?: Blog;
} {
  const index = Posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  // Posts are newest first, so the previous card is the next list position.
  return { previous: Posts[index + 1], next: Posts[index - 1] };
}
