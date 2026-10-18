import type { Metadata } from "next";

import BlogCard from "@/components/blog/blog-card";
import FeaturedBlog from "@/components/blog/featured-blog";
import { siteConfig } from "@/config/site";
import { Posts } from "@/data/blog";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.author}`,
  description:
    "Notes from Rahmita Paramita Sudirman's formulation lab — gentle baby care, decorative cosmetics, sunscreen texture and whitelabel lessons.",
};

const BlogPage = () => {
  // Posts are sorted newest first; the newest one is the featured hero.
  const [featured, ...rest] = Posts;

  return (
    <div className="flex items-center justify-center">
      <div className="container flex flex-col gap-y-10 py-20">
        <header className="flex flex-col items-center gap-y-4 px-4 text-center">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground max-w-2xl">
            Notes from my formulation lab — baby care, decorative cosmetics,
            sunscreen and everything behind whitelabel production.
          </p>
        </header>
        <section aria-labelledby="blog-posts-heading" className="px-4">
          <h2 className="sr-only" id="blog-posts-heading">
            Featured story and recent posts
          </h2>
          <FeaturedBlog post={featured} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
