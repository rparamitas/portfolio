import Link from "next/link";

import { geistMono, geistSans } from "@/app/font";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFoundPage = () => {
  return (
    <div className="dark:bg-secondary-black flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative flex min-w-screen flex-col items-center justify-center px-10">
        <h1 className={cn("text-9xl font-bold", geistSans.className)}>404</h1>
        <p
          className={cn(
            "absolute z-10 h-fit rounded bg-white px-1 text-lg",
            geistMono.className,
          )}
        >
          Page not found
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8 lg:max-w-5xl">
        <span className="flex w-full items-center px-20 text-center text-xl leading-normal text-wrap text-gray-400 lg:text-3xl lg:leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been removed or the URL may be incorrect.
        </span>
        <Button>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
