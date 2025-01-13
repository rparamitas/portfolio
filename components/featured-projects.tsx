import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";
import defaultImage from "@/public/my-photo.png";

interface DataFeaturedProjects {
  id: number;
  title: string;
  description: string;
  action?: string;
  image?: string | StaticImageData;
}

const data: DataFeaturedProjects[] = [
  {
    id: 1,
    title: "Innovative Cosmetic Product Development",
    description:
      "I specialize in developing effective and market-ready cosmetic products tailored to your brand's goals. Whether you're a startup or an established business, I can assist with concept ideation, ingredient research, and formulation experiments to create innovative products that resonate with your audience and drive growth.",
    action: "Learn More",
  },
  {
    id: 2,
    title: "Formulation & Process Optimization",
    description:
      "From skincare and baby care to facial and personal care, I can formulate products that cater to diverse consumer needs. Leveraging my experience in R&D, I can work with you to refine formulations, select the right active ingredients and excipients, and ensure compliance with industry standards while maintaining product efficacy and appeal.",
    action: "Learn More",
  },
  {
    id: 3,
    title: "Scalable Production and Quality Assurance",
    description:
      "I can help you transition from prototypes to large-scale production with ease. With my experience in managing product development pipelines and overseeing repeat orders of 50,000+ units, I ensure your products maintain consistent quality and meet customer expectations at scale.",
    action: "Learn More",
  },
  {
    id: 4,
    title: "Brand-Aligned Product Design and Packaging",
    description:
      "A product's success isn't just about what's inside—it’s also about how it looks and feels. I can assist in designing attractive and functional product packaging that aligns with your brand identity and captures the attention of your target market.",
  },
];

const FeaturedProjects = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-24">
        {data.map((item) => (
          <div
            key={item.id}
            className="h-72https://www.tailbits.com/components/section?id=61ee75d572231c256ccda2d0 flex flex-row gap-x-12"
          >
            <div
              className={cn(
                item.id % 2 ? "order-1" : "order-2",
                "flex basis-1/2 flex-col justify-between",
              )}
            >
              <div className="flex flex-col gap-y-4">
                <h3 className="text-4xl font-bold">{item.title}</h3>
                <p className="">{item.description}</p>
              </div>
              {item.action && (
                <button className="text-primary w-fit">{item.action}</button>
              )}
            </div>
            <div
              className={cn(
                item.id % 2 ? "order-2" : "order-1",
                "flex basis-1/2 items-center justify-center",
              )}
            >
              <Image
                src={
                  typeof item.image === "string"
                    ? item.image
                    : item.image?.src || defaultImage
                }
                width={200}
                height={400}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
