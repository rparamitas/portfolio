import React from "react";
import Image from "next/image";

import Review1 from "@/public/review/review-1.jpg";
import Review2 from "@/public/review/review-2.jpg";
import Review3 from "@/public/review/review-3.jpg";
import Review4 from "@/public/review/review-4.jpg";
import Review5 from "@/public/review/review-5.jpg";
import Review6 from "@/public/review/review-6.jpg";
import Review7 from "@/public/review/review-7.jpg";
import Review8 from "@/public/review/review-8.jpg";
import Review9 from "@/public/review/review-9.jpg";
import Review10 from "@/public/review/review-10.jpg";
import Review11 from "@/public/review/review-11.jpg";

const Review = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review1}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review2}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review3}
            alt=""
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review4}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review5}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review6}
            alt=""
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review7}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review8}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review9}
            alt=""
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review10}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review11}
            alt=""
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={Review1}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
