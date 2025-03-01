/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import defaultImage from "@/public/BlankPhotoProfile.webp";
import Innovative from "@/public/featured/innovative.jpg";
import FormulationProcess from "@/public/featured/formulation-process.png";
import ProductionCosmetics from "@/public/featured/production-cosmetics.webp";
import AnalyticalDevelopment from "@/public/featured/analytical-development.jpeg";

interface DataJobs {
  id: number;
  title: string;
  description: string;
  action?: string;
  image?: string | StaticImageData;
  link?: string;
}

const data: DataJobs[] = [
  {
    id: 1,
    title: "Innovative Cosmetic Product Development",
    description:
      "I specialize in developing effective and market-ready cosmetic products tailored to your brand's goals. Whether you're a startup or an established business, I can assist with concept ideation, ingredient research, and formulation experiments to create innovative products that resonate with your audience and drive growth.",
    action: "Learn More",
    link: "https://google.com",
    image: Innovative,
  },
  {
    id: 2,
    title: "Formulation & Process Optimization",
    description:
      "From skincare and baby care to facial and personal care, I can formulate products that cater to diverse consumer needs. Leveraging my experience in R&D, I can work with you to refine formulations, select the right active ingredients and excipients, and ensure compliance with industry standards while maintaining product efficacy and appeal.",
    action: "Learn More",
    link: "https://google.com",
    image: FormulationProcess,
  },
  {
    id: 3,
    title: "Scalable Production and Quality Assurance",
    description:
      "I can help you transition from prototypes to large-scale production with ease. With my experience in managing product development pipelines and overseeing repeat orders of 50,000+ units, I ensure your products maintain consistent quality and meet customer expectations at scale.",
    action: "Learn More",
    link: "https://google.com",
    image: ProductionCosmetics,
  },
  {
    id: 4,
    title: "Analytical Development for Product Quality",
    description:
      "With expertise in analytical development, I ensure the highest quality and consistency in cosmetic formulations. I have hands-on experience using HPLC (High-Performance Liquid Chromatography) to analyze active ingredients, stability, and overall product integrity. This ensures that each batch meets industry standards and performs as expected, enhancing product reliability and customer trust.",
    link: "#",
    image: AnalyticalDevelopment,
  },
];

const Pagination = ({
  totalSlides,
  currentSlide,
  onSlideChange,
}: {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={cn(
            "h-1 w-8 rounded-full transition-all duration-300",
            index === currentSlide ? "bg-main" : "hover:bg-main/80 bg-gray-300",
          )}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );
};

const ProgressBar = ({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 h-1 w-full bg-gray-200",
        className,
      )}
    >
      <div
        className="h-full bg-main transition-all duration-75 ease-linear"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

const Slide = ({
  title,
  description,
  image,
  // action,
  // link,
  isActive,
}: {
  title: string;
  description: string;
  image?: string | StaticImageData;
  action?: string;
  link?: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={cn(
        isActive ? "z-10 opacity-100" : "z-0 opacity-0",
        "absolute left-0 top-0 h-full w-full transition-opacity duration-300 ease-in-out",
      )}
    >
      <div className="flex h-full flex-col items-center justify-center gap-x-20 gap-y-12 p-4 md:flex-row md:p-12">
        <div className="relative flex h-[500px] w-[300px] basis-5/12 justify-center md:h-full md:w-full">
          <Image
            src={image || defaultImage}
            alt={title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            className="flex items-center justify-center rounded-xl"
          />
        </div>
        <div className="flex h-full basis-7/12 flex-col justify-center gap-y-4">
          <h3 className="mb-4 text-3xl font-bold">{title}</h3>
          <div className="flex flex-col gap-y-8">
            <p className="text-justify text-lg leading-relaxed tracking-wide">
              {description}
            </p>
            {/* // TODOS */}
            {/* <Button className="w-fit">
              <Link href={link || "javascript:void(0)"} className="w-fit">
                {action || "Learn More"}
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyJobs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
            return 0;
          }
          return oldProgress + 1;
        });
      }
    }, 50);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide, isPaused]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="relative mx-auto h-[550px] w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex h-[510px] w-full items-center justify-center justify-self-center">
        {data.map((item, index) => (
          <Slide
            key={item.id}
            title={item.title}
            image={item.image}
            description={item.description}
            isActive={index === currentSlide}
            action={item.action}
            link={item.link}
          />
        ))}
      </div>
      <ProgressBar progress={progress} className="" />
      <Pagination
        totalSlides={data.length}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
};

export default MyJobs;
