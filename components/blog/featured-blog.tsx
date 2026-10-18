import Image from "next/image";
import Link from "next/link";

import AuthorMeta from "@/components/blog/author-meta";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/data/blog";

// Featured story at the top of /blog: a full-width cover with an overlapping
// author/content card hanging below-left (the neobrutalism.com overlapping
// card blog hero). The card overlaps the next section, hence mb-24 sm:mb-28.
const FeaturedBlog = ({ post }: { post: Blog }) => {
  return (
    <article className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 fill-mode-backwards relative mb-24 duration-500 sm:mb-28">
      <div className="border-border h-[320px] overflow-hidden rounded border-2 sm:h-[480px]">
        <Image
          src={post.image}
          alt=""
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="border-border bg-card absolute inset-x-4 -bottom-16 rounded border-2 p-4 shadow-md sm:inset-x-auto sm:start-8 sm:max-w-xl sm:p-8 lg:start-20">
        <Badge className="mb-4">{post.category}</Badge>
        <h3 className="font-head mb-4 text-xl font-medium lg:text-2xl">
          <Link
            href={`/blog/${post.slug}`}
            className="decoration-primary focus-visible:outline-primary decoration-4 underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {post.title}
          </Link>
        </h3>
        <AuthorMeta date={post.date} size="lg" />
      </div>
    </article>
  );
};

export default FeaturedBlog;
