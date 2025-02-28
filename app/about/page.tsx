import Image from "next/image";
import React from "react";
import MySelf from "@/public/my-photo.png";

const AboutPage = () => {
  return (
    <div className="container flex flex-row border border-black">
      <div>
        <Image src={MySelf} alt="Rahmita Paramita Sudirman" />
      </div>
      <div>
        I am someone who likes to learn new cases that are interesting and
        challenging at work, and focused on finding the best alternative
        solutions to various problems. I am a hard worker and tend to be able to
        do things in detail, and have good time and work management
      </div>
    </div>
  );
};

export default AboutPage;
