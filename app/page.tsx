import Image from "next/image";
import PhotoProfile from "@/public/my-photo.png";
import Testimonial from "@/components/testimonial";
import MyJobs from "@/components/my-jobs";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center bg-bg">
        <div className="container flex items-center justify-between gap-x-16">
          <div className="flex h-full flex-1 flex-col justify-center">
            <p>Hi, my name is Rahmita Paramita Sudirman</p>
            <h1 className="text-wrap text-7xl font-bold">
              I create solutions for beauty growth.
            </h1>
            <p>
              I&apos;m a Product Development Specialist based in Indonesia, with
              extensive experience in R&D for cosmetic products, and i
              successfully made customers reorder cosmetic products as much as
              10000+ pcs in each month.
            </p>
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
              Don&apos;t just take our words. Over 1000+ people trust me.
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
    </div>
  );
}
