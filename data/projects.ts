import Product1 from "@/public/DermaLogo.jpg";
import { StaticImageData } from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  link?: string;
  category?: string[];
}

export const Projects: Project[] = [
  {
    id: 1,
    title: "Sunscreen",
    description: "A sunscreen that can protect your skin from the sun.",
    image: Product1,
    link: "/projects/1",
    category: ["sunscreen", "derma"],
  },
  {
    id: 2,
    title: "Lotion",
    description: "A lotion that can protect your skin from the sun.",
    image: Product1,
    category: ["lotion", "derma"],
  },
  {
    id: 3,
    title: "Sunscreen",
    description: "A sunscreen that can protect your skin from the sun.",
    image: Product1,
    category: ["sunscreen", "derma"],
  },
  {
    id: 4,
    title: "Lotion",
    description: "A lotion that can protect your skin from the sun.",
    image: Product1,
    category: ["lotion", "derma"],
  },
  {
    id: 5,
    title: "Sunscreen",
    description: "A sunscreen that can protect your skin from the sun.",
    image: Product1,
    category: ["sunscreen", "derma"],
  },
  {
    id: 6,
    title: "Lotion",
    description: "A lotion that can protect your skin from the sun.",
    image: Product1,
    category: ["lotion", "derma"],
  },
];
