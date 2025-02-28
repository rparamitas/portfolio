"use client";

import Image from "next/image";
import PhotoProfile from "@/public/my-photo.png";
import Testimonial from "@/components/testimonial";
import MyJobs from "@/components/my-jobs";
import { Projects } from "@/data/projects";
import { cn } from "@/lib/utils";
// import { Item } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Review from "@/components/review";
// import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

// const content = [
//   {
//     title: "Collaborative Editing",
//     description:
//       "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Collaborative Editing
//       </div>
//     ),
//   },
//   {
//     title: "Real time changes",
//     description:
//       "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center text-white">
//         <Image
//           src={PhotoProfile}
//           width={300}
//           height={300}
//           className="h-full w-full object-cover"
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     title: "Version control",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
//         Version control
//       </div>
//     ),
//   },
//   {
//     title: "Running out of content",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Running out of content
//       </div>
//     ),
//   },
// ];

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center bg-bg">
        <div className="container flex items-center justify-between gap-x-16">
          <div className="flex h-full flex-1 flex-col justify-center gap-y-8">
            <p className="text-xl">Hi, my name is Rahmita Paramita Sudirman</p>
            <h1 className="text-wrap text-7xl font-bold">
              I create solutions for beauty growth.
            </h1>
            <p className="text-lg">
              I&apos;m a Product Development Specialist based in Indonesia, with
              extensive experience in R&D for cosmetic products, and i
              successfully made customers reorder cosmetic products as much as
              10000+ pcs in each month.
            </p>
            <Button className="w-fit" variant={"reverse"}>
              <Link href={"mailto:rparamitas@gmail.com"}>Get in touch</Link>
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-[700px] w-full">
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
      <div className="flex items-center justify-center bg-bw">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-24">
            <h2 className="text-center text-3xl font-bold">
              Don&apos;t just take our words. Over 70+ people trust me.
            </h2>
            <div className="flex flex-row">
              <Testimonial />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-bg">
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
      <div className="flex items-center justify-center border bg-bw">
        <div className="container flex flex-col py-20">
          <div className="flex flex-col gap-y-8">
            <h2 className="text-center text-3xl font-bold">
              Featured Projects
            </h2>
            <div className="relative">
              {/* <StickyScroll content={content} /> */}
              <div className="flex flex-col gap-y-8">
                {Projects.map((project, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex w-full flex-row items-center justify-center gap-x-8",
                      index % 2 === 0 ? "flex-row-reverse" : "flex-row",
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
                    <div className="flex flex-1 flex-col gap-y-2">
                      <p className="text-3xl font-bold">{project.title}</p>
                      <div className="flex flex-row gap-x-2">
                        {project.category?.map((item) => (
                          <Badge key={item} variant={"default"}>
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <p>{project.description}</p>
                      {project.link && (
                        <Button className="w-fit" variant={"neutral"}>
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
      <div className="fler">
        <Review />
      </div>
    </div>
  );
}
