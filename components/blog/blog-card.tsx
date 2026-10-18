import Image from "next/image";
import Link from "next/link";

import AuthorMeta from "@/components/blog/author-meta";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/data/blog";

// Small neobrutalism post card for the /blog grid. `index` drives the
// staggered entrance animation; the link is stretched across the whole card
// with an inset-0 pseudo element, so the author row is part of the click
// area too (same pattern as the neobrutalism.com reference).
const BlogCard = ({ post, index }: { post: Blog; index: number }) => {
  return (
    <article
      className="group motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 fill-mode-backwards border-border bg-card relative flex flex-col rounded border-2 shadow-md transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="p-4 pb-0">
        <Image
          src={post.image}
          alt=""
          className="border-border h-40 w-full rounded border-2 object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-4 p-4">
        <Badge>{post.category}</Badge>
        <h3 className="font-head text-lg font-medium">
          <Link
            href={`/blog/${post.slug}`}
            className="decoration-primary focus-visible:outline-primary decoration-2 underline-offset-2 outline-none group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {post.title}
          </Link>
        </h3>
        <div className="mt-auto">
          <AuthorMeta date={post.date} />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
