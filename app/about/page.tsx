import Image from "next/image";
import React from "react";
import MySelf from "@/public/my-photo.png";
import { cn } from "@/lib/utils";
import { redHatText } from "../font";

const AboutPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-x-12 md:flex-row">
      <div className="flex-1">
        <Image src={MySelf} alt="Rahmita Paramita Sudirman" />
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-y-8 px-4 md:mt-0">
        <h2 className={cn("text-5xl font-bold", redHatText.className)}>
          About me
        </h2>
        <p className="text-lg leading-relaxed tracking-wide">
          I am someone who likes to learn new cases that are interesting and
          challenging at work, and focused on finding the best alternative
          solutions to various problems. I am a hard worker and tend to be able
          to do things in detail, and have good time and work management
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
