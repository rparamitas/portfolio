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
      "Saya memiliki pengalaman mendalam dalam pembuatan decorative cosmetics, khususnya pada produk seperti ushion, lip tint, lip cream, dan lip serum. Saya telah menguasai seluruh proses produksi, mulai dari formulasi, pencampuran bahan, hingga pengemasan produk akhir. Keahlian saya mencakup pemahaman mendalam tentang bahan-bahan kosmetik, kontrol kualitas, serta penyesuaian produk sesuai dengan tren pasar. Pengalaman ini telah membuat saya mahir dalam menciptakan produk kosmetik dekoratif yang inovatif, aman, dan berkualitas tinggi.",
    category: ["lip tint", "lip cream", "lip serum", "cushion"],
  },
  {
    id: 2,
    title: "Herbikids",
    image: [HerbikidsBabyCream, HerbikidsParfume],
    description:
      "Herbikids adalah brand perawatan bayi yang fokus pada produk alami dan aman untuk kulit sensitif bayi. Saat ini, Herbikids menawarkan dua produk utama: parfum bayi dan baby cream. Kedua produk ini dirancang dengan bahan-bahan alami yang lembut, bebas dari bahan kimia berbahaya, sehingga cocok untuk menjaga kelembutan dan kesehatan kulit bayi.",
    link: "https://shopee.co.id/herbikids",
    category: ["parfume", "baby cream", "baby lotion"],
  },
  {
    id: 3,
    title: "Herbiglow",
    description:
      "Herbiglow adalah brand produk perawatan kulit yang menawarkan rangkaian produk seperti body lotion, sunscreen, cleansing, face wash, dan lainnya. Brand ini fokus pada perawatan kulit yang sehat dan glowing, dengan formulasi yang dirancang untuk menjaga kelembapan, melindungi dari sinar UV, serta membersihkan kulit secara menyeluruh. Herbiglow cocok untuk semua jenis kulit dan menekankan penggunaan bahan-bahan yang aman serta efektif. Produk-produknya dapat menjadi pilihan tepat untuk merawat kulit sehari-hari, baik untuk wajah maupun tubuh.",
    image: [Herbiglow],
    category: ["sunscreen", "night cream", "face wash"],
    link: "https://shopee.co.id/herbiglow.id",
  },
  {
    id: 4,
    title: "Skinspace",
    description:
      "SkinSpace adalah brand perawatan wajah yang fokus pada produk sunscreen berbahan alami, dirancang untuk melindungi kulit dari sinar UV tanpa menggunakan bahan kimia berbahaya. Produk ini cocok untuk semua jenis kulit, termasuk kulit sensitif, dan menekankan keamanan serta kenyamanan pengguna. SkinSpace hadir dengan konsep clean beauty yang ramah lingkungan dan ramah kulit, menjadikannya pilihan ideal bagi mereka yang mencari perawatan kulit yang efektif dan alami.",
    image: [SkinSpace],
    category: ["sunscreen", "natural", "no dangerous chemical"],
    link: "https://www.instagram.com/skinspace.indo/?hl=en",
  },
  {
    id: 5,
    title: "Whitelabel",
    description:
      "Saya memiliki keahlian dalam mengembangkan produk kosmetik whitelabel yang siap disesuaikan dengan kebutuhan dan identitas merek Anda. Dengan pengalaman di industri kecantikan, saya dapat membantu Anda menciptakan produk skincare, Bodycare, Haircare, Babycare, Deocare, Parfume atau perawatan tubuh berkualitas tinggi yang diproduksi secara profesional, namun dengan branding yang sepenuhnya milik Anda. Mulai dari pemilihan formula, desain kemasan, hingga strategi pemasaran, saya siap mendukung Anda menciptakan produk yang unik dan siap bersaing di pasar.",
    image: [WhiteLabel],
    category: ["skincare", "decorative"],
  },
  {
    id: 6,
    title: "One SBC Glowing",
    description:
      "One SBC Glowing adalah produk dari rangkaian GLOGLOWING SKIN CARE, khususnya Toner Essence Acne Booster. Produk ini diformulasikan untuk kulit berminyak dan berjerawat, dengan tujuan membantu membersihkan, menenangkan, dan menyegarkan kulit wajah. Essence ini mengandung bahan-bahan yang dapat membantu mengurangi jerawat, menyeimbangkan produksi minyak, serta memberikan efek glowing alami pada kulit.",
    image: [OneSBCGlowing],
    category: ["toner", "night cream"],
    link: "https://shopee.co.id/GLOGLOWING-Glowing-Essence-Acne-60ml-i.154601267.2434639691?sp_atk=1a577ca9-210e-4640-8b80-d8be5e1751a3&xptdk=1a577ca9-210e-4640-8b80-d8be5e1751a3",
  },
];
