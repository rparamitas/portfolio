"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import defaultImage from "@/public/my-photo.png";
import { cn } from "@/lib/utils";

interface DataJobs {
  id: number;
  title: string;
  description: string;
  action?: string;
  image?: string | StaticImageData;
}

const data: DataJobs[] = [
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
            index === currentSlide ? "bg-main" : "bg-gray-300",
          )}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
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
  isActive,
}: {
  title: string;
  description: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={cn(
        isActive ? "z-10 opacity-100" : "z-0 opacity-0",
        "absolute left-0 top-0 h-full w-full transition-opacity duration-300 ease-in-out",
      )}
    >
      <div className="flex h-full flex-col items-center justify-center bg-white p-8">
        <h3 className="mb-4 text-3xl font-bold">{title}</h3>
        <p className="text-center text-lg">{description}</p>
      </div>
    </div>
  );
};

const MyJobs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldPorogress) => {
        if (oldPorogress === 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
          return 0;
        }
        return oldPorogress + 1;
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {data.map((item, index) => (
          <Slide
            key={item.id}
            title={item.title}
            description={item.description}
            isActive={index === currentSlide}
          />
        ))}
      </div>
      <ProgressBar progress={progress} />
      <Pagination
        totalSlides={data.length}
        currentSlide={currentSlide}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
};

export default MyJobs;
