import { StaticImageData } from "next/image";
import HerbikidsBabyCream from "@/public/herbikids/baby-cream.webp";
import HerbikidsParfume from "@/public/herbikids/parfume.webp";
import Herbiglow from "@/public/herbiglow/herbiglow-1.webp";
import SkinSpace from "@/public/skinspace/skinspace-1.webp";
import WhiteLabel from "@/public/whitelabel/white-label-beauty-products.webp";
import OneSBCGlowing from "@/public/one-sbc-glowing/one-sbc-glowing-1.webp";
import Decorative from "@/public/featured/decorative.jpg";

interface Project {
  id: number;
  title: string;
  description?: string;
  image?: StaticImageData | StaticImageData[];
  link?: string;
  category?: string[];
}

export const Projects: Project[] = [
  {
    id: 1,
    title: "Decorative",
    image: [Decorative],
    description:
      "I have in-depth experience in decorative cosmetics manufacturing, especially in products such as cushion, lip tint, lip cream, and lip serum. I have mastered the entire production process, from formulation, mixing of ingredients, to packaging of the final product. My expertise includes an in-depth understanding of cosmetic ingredients, quality control, as well as product customization according to market trends. This experience has made me proficient in creating innovative, safe and high-quality decorative cosmetic products.",
    category: ["lip tint", "lip cream", "lip serum", "cushion"],
  },
  {
    id: 2,
    title: "Herbikids",
    image: [HerbikidsBabyCream, HerbikidsParfume],
    description:
      "Herbikids is a baby care brand that focuses on natural and safe products for babies' sensitive skin. Currently, Herbikids offers two main products: baby perfume and baby cream. Both products are designed with gentle natural ingredients, free from harmful chemicals, making them suitable for keeping baby's skin soft and healthy.",
    link: "https://shopee.co.id/herbikids",
    category: ["parfume", "baby cream", "baby lotion"],
  },
  {
    id: 3,
    title: "Herbiglow",
    description:
      "Herbiglow is a skincare brand that offers a range of products such as body lotion, sunscreen, cleansing, face wash, and more. The brand focuses on healthy and glowing skincare, with formulations designed to retain moisture, protect against UV rays, and thoroughly cleanse the skin. Herbiglow is suitable for all skin types and emphasizes the use of safe and effective ingredients. Its products are a great choice for everyday skincare, both for the face and body.",
    image: [Herbiglow],
    category: ["sunscreen", "night cream", "face wash"],
    link: "https://shopee.co.id/herbiglow.id",
  },
  {
    id: 4,
    title: "Skinspace",
    description:
      "SkinSpace is a facial care brand that focuses on natural sunscreen products, designed to protect skin from UV rays without the use of harmful chemicals. The products are suitable for all skin types, including sensitive skin, and emphasize safety and user comfort. SkinSpace comes with a clean beauty concept that is eco-friendly and skin-friendly, making it an ideal choice for those looking for effective and natural skincare.",
    image: [SkinSpace],
    category: ["sunscreen", "natural", "no dangerous chemical"],
    link: "https://www.instagram.com/skinspace.indo/?hl=en",
  },
  {
    id: 5,
    title: "Whitelabel",
    description:
      "I have expertise in developing whitelabel cosmetic products that are readily customized to suit your needs and brand identity. With experience in the beauty industry, I can help you create high quality skincare, bodycare, haircare, babycare, deocare, perfume or body care products that are professionally produced, but with branding that is entirely yours. From formula selection, packaging design, to marketing strategy, I am ready to support you in creating unique products that are ready to compete in the market.",
    image: [WhiteLabel],
    category: ["skincare", "decorative"],
  },
  {
    id: 6,
    title: "One SBC Glowing",
    description:
      "One SBC Glowing is a product from the GLOGLOWING SKIN CARE range, specifically the Toner Essence Acne Booster. This product is formulated for oily and acne-prone skin, with the aim of helping to cleanse, calm and refresh the skin. This essence contains ingredients that can help reduce acne, balance oil production, and give the skin a natural glowing effect.",
    image: [OneSBCGlowing],
    category: ["toner", "night cream"],
    link: "https://shopee.co.id/GLOGLOWING-Glowing-Essence-Acne-60ml-i.154601267.2434639691?sp_atk=1a577ca9-210e-4640-8b80-d8be5e1751a3&xptdk=1a577ca9-210e-4640-8b80-d8be5e1751a3",
  },
];
