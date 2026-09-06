"use client";

import Image from "next/image";
import PhotoProfile from "@/public/my-photo.png";
import Testimonial from "@/components/testimonial";
import MyJobs from "@/components/my-jobs";
import { Projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Review from "@/components/review";

export default function Home() {
  return (
    <div>
      <div className="bg-bg flex items-center justify-center">
        <div className="container flex flex-col items-center justify-between gap-x-16 gap-y-8 px-8 lg:flex-row xl:px-0">
          <div className="mt-12 flex h-full flex-1 flex-col justify-center gap-y-8 md:mt-0">
            <p className="mt-4 text-center text-xl md:text-left">
              Hi, my name is{" "}
              <span className="decoration-red hover:cursor-default hover:underline">
                Rahmita Paramita Sudirman
              </span>
            </p>
            <h1 className="text-center text-4xl font-bold text-pretty md:text-left md:text-6xl">
              I create solutions for beauty growth.
            </h1>
            <p className="text-center text-lg text-pretty md:text-left">
              I&apos;m a Product Development Specialist based in Indonesia, with
              extensive experience in R&D for cosmetic products, and i
              successfully made customers reorder cosmetic products as much as
              10000+ pcs in each month.
            </p>
            <div className="flex flex-row gap-x-4">
              <Button
                className="w-fit self-center md:self-start"
                variant={"default"}
              >
                <Link href={"mailto:email@rahmita.my.id"}>Get in touch</Link>
              </Button>
              <Button variant="secondary" className="">
                <Link
                  href={"/cv-rahmita.pdf"}
                  download={"cv-rahmita-paramita-sudirman.pdf"}
                >
                  Download CV
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[500px] w-[400px] md:h-[700px] md:w-[600px]">
              <Image
                src={PhotoProfile}
                alt="My Photo"
                sizes="100vw"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bw flex items-center justify-center">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-24">
            <h2 className="text-center text-4xl font-bold">
              Don&apos;t just take our words. Over 70+ people trust me.
            </h2>
            <div className="flex flex-row">
              <Testimonial />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bg flex items-center justify-center">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-24">
            <h2 className="text-center text-4xl font-bold">
              What I can do for you
            </h2>
            <div>
              <MyJobs />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bw flex items-center justify-center">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-8 md:mx-8">
            <h2 className="text-center text-4xl font-bold">
              Featured Projects
            </h2>
            <div className="relative">
              <div className="flex flex-col gap-y-8">
                {Projects.map((project, index) => (
                  <div
                    key={index}
                    className={cn(
                      "my-6 flex w-full flex-row items-center justify-center gap-x-8 gap-y-6 md:my-0 md:gap-y-0",
                      index % 2 === 0
                        ? "flex-col md:flex-row-reverse"
                        : "flex-col md:flex-row",
                    )}
                  >
                    <div className="w-[400px] flex-1">
                      {project.image &&
                        (Array.isArray(project.image) ? (
                          <Image src={project.image[0]} alt={project.title} />
                        ) : (
                          <Image src={project.image} alt={project.title} />
                        ))}
                    </div>
                    <div className="flex flex-1 flex-col gap-y-4 text-center md:text-start">
                      <p className="text-3xl font-bold">{project.title}</p>
                      <div className="flex flex-row justify-center gap-x-2 md:justify-start">
                        {project.category?.map((item) => (
                          <Badge key={item} variant={"default"}>
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <p className="mx-8 text-pretty md:mx-0">
                        {project.description}
                      </p>
                      {project.link && (
                        <Button
                          className="w-fit self-center md:self-start"
                          variant="secondary"
                        >
                          <Link href={project.link}>Go to view</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 md:mx-8">
        <h3 className="text-center text-3xl font-bold">What they said</h3>
        <Review />
      </div>
    </div>
  );
}
