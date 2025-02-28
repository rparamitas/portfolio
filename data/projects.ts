import { StaticImageData } from "next/image";
import HerbikidsBabyCream from "@/public/herbikids/baby-cream.webp";
import HerbikidsParfume from "@/public/herbikids/parfume.webp";
import Herbiglow from "@/public/herbiglow/herbiglow-1.webp";

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
    title: "Herbikids",
    image: [HerbikidsBabyCream, HerbikidsParfume],
    description:
      "Herbikids adalah brand perawatan bayi yang fokus pada produk alami dan aman untuk kulit sensitif bayi. Saat ini, Herbikids menawarkan dua produk utama: parfum bayi dan baby cream. Kedua produk ini dirancang dengan bahan-bahan alami yang lembut, bebas dari bahan kimia berbahaya, sehingga cocok untuk menjaga kelembutan dan kesehatan kulit bayi.",
    link: "https://shopee.co.id/herbikids",
    category: ["parfume", "baby cream", "baby lotion"],
  },
  {
    id: 2,
    title: "Herbiglow",
    description:
      "Herbiglow adalah brand produk perawatan kulit yang menawarkan rangkaian produk seperti body lotion, sunscreen, cleansing, face wash, dan lainnya. Brand ini fokus pada perawatan kulit yang sehat dan glowing, dengan formulasi yang dirancang untuk menjaga kelembapan, melindungi dari sinar UV, serta membersihkan kulit secara menyeluruh. Herbiglow cocok untuk semua jenis kulit dan menekankan penggunaan bahan-bahan yang aman serta efektif. Produk-produknya dapat menjadi pilihan tepat untuk merawat kulit sehari-hari, baik untuk wajah maupun tubuh.",
    image: [Herbiglow],
    category: ["sunscreen", "night cream", "face wash"],
    link: "https://shopee.co.id/herbiglow.id",
  },
  {
    id: 3,
    title: "Skinspace",
    description: "A sunscreen that can protect your skin from the sun.",
    image: [HerbikidsBabyCream],
    category: ["sunscreen", "derma"],
  },
  {
    id: 4,
    title: "Whitelabel",
    description: "A lotion that can protect your skin from the sun.",
    image: [HerbikidsBabyCream],
    category: ["lotion", "derma"],
  },
  {
    id: 5,
    title: "One SBC Glowing",
    description: "A sunscreen that can protect your skin from the sun.",
    image: [HerbikidsBabyCream],
    category: ["sunscreen", "derma"],
  },
  {
    id: 6,
    title: "Lotion",
    description: "A lotion that can protect your skin from the sun.",
    image: [HerbikidsBabyCream],
    category: ["lotion", "derma"],
  },
];
