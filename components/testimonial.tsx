import React from "react";
import { Card, CardContent } from "./ui/card";
import Image, { StaticImageData } from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import PillarsLogo from "@/public/PillarsLogo.png";
import HarveyPhoto from "@/public/HarveyPhoto.jpeg";
import DermaLogo from "@/public/DermaLogo.jpg";
import PriyonoPhoto from "@/public/BlankPhotoProfile.webp";
import GlowLogo from "@/public/GlowLogo.png";
import GhinaPhoto from "@/public/GhinaPhoto.jpeg";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  id: number;
  name: string;
  position: string;
  logo?: string | StaticImageData;
  photo?: string | StaticImageData;
  testimonial: string;
}

const defaultLogo = "@/public/vercel.svg";
const defaultPhoto = "@/public/BlankPhotoProfile.webp";

const data: TestimonialProps[] = [
  {
    id: 1,
    name: "Harvey",
    position: "Supervisor at Pillars",
    logo: PillarsLogo,
    photo: HarveyPhoto,
    testimonial:
      "Rahmita joined our team at PT Pillars Cosmetiklon Indonesia as a Formulation R&D specialist, where they made remarkable contributions in developing high-quality skincare products, including the well-known Whitelab brand. Their creativity in formulating effective and innovative skincare solutions was exceptional. Rahmita demonstrated a deep understanding of active ingredients, excipients, and formulation techniques, which resulted in products that met and exceeded market expectations. Their proactive and solution-driven approach made them a valuable asset to the team.",
  },
  {
    id: 2,
    name: "Pak Priyono",
    position: "Manager at PT. Derma Kosmetik Indonesia",
    logo: DermaLogo,
    photo: PriyonoPhoto,
    testimonial:
      "It was a privilege to mentor Rahmita at PT Derma Kosmetik International. Their eagerness to learn and their ability to grasp complex cosmetic formulation processes stood out from day one. They quickly adapted to working with various active ingredients and excipients, ensuring the creation of high-quality cosmetic products. Rahmita's commitment to learning and improving, combined with their collaborative spirit, made them a standout member of the team. I am confident they will continue to achieve great success in the cosmetic industry.",
  },
  {
    id: 3,
    name: "Ghina",
    position: "CEO at PT. Glow Industri Herbal Care",
    logo: GlowLogo,
    photo: GhinaPhoto,
    testimonial:
      "As the Head of R&D Formulation at PT Glow Industri Herbal Care, Rahmita has demonstrated exceptional leadership and innovation. Under their guidance, the team has developed an impressive range of cosmetic products, from baby care to facial and skincare solutions. The attractive designs and high functionality of the products have garnered a strong customer base, resulting in over 50,000 repeat orders. Their ability to balance customer needs with innovative formulations has truly set a benchmark in the industry. Rahmita's dedication and expertise have made a significant impact on our business's success.",
  },
];

const Testimonial = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-x-12 md:flex-row">
        {data.map((item) => (
          <Card
            key={item.id}
            className={cn(
              item.id % 2 === 0
                ? "m-8 rotate-2 bg-bw md:m-0 md:rotate-6"
                : "m-8 -rotate-2 md:m-0 md:-rotate-6",
            )}
          >
            <CardContent className="">
              <div className="flex flex-col gap-y-8 pt-6">
                <p className="leading-relaxed tracking-wide">
                  {item.testimonial}
                </p>
                <div className="flex flex-col">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.position}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <Image
                    src={item.logo || defaultLogo}
                    alt="logo"
                    width={100}
                    className="overflow-hidden"
                  />
                  <Avatar className="flex size-20 self-center">
                    <AvatarImage
                      src={
                        typeof item.photo === "string"
                          ? item.photo
                          : item.photo?.src || defaultPhoto
                      }
                      alt="rahmita"
                    />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
