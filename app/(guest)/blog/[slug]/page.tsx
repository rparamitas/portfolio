import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import AuthorMeta from "@/components/blog/author-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getAdjacentPosts, getPostBySlug, Posts } from "@/data/blog";

export function generateStaticParams() {
  return Posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: `Blog | ${siteConfig.author}` };
  }

  return {
    title: `${post.title} | ${siteConfig.author}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image.src, alt: post.title }],
    },
  };
}

const DetailBlogPage = async ({ params }: PageProps<"/blog/[slug]">) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Posts are newest first, so "previous" is the next list position.
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <div className="flex items-center justify-center">
      <div className="container flex flex-col gap-y-10 py-20">
        <article className="flex flex-col items-center gap-y-6 px-4">
          <div className="flex w-full max-w-3xl sm:justify-start">
            <Button
              size="sm"
              nativeButton={false}
              render={<Link href="/blog" />}
            >
              All posts
              <ArrowLeft aria-hidden="true" />
            </Button>
          </div>
          <Badge>{post.category}</Badge>
          <h1 className="font-head text-center text-3xl font-medium text-balance lg:text-4xl">
            {post.title}
          </h1>
          <AuthorMeta date={post.date} size="lg" />
          <Image
            src={post.image}
            alt=""
            className="border-border w-full max-w-3xl rounded border-2 object-cover shadow-md"
          />
          <div className="flex max-w-3xl flex-col gap-y-10 text-justify sm:text-start">
            {post.content.map((section, index) => (
              <section key={index} className="flex flex-col gap-y-4">
                {section.heading && (
                  <h2 className="font-head text-xl font-medium">
                    {section.heading}
                  </h2>
                )}
                {section.body.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-pretty">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
        <nav
          aria-label="Adjacent posts"
          className="grid w-full max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group border-border bg-card flex flex-col items-start gap-y-1.5 rounded border-2 p-4 text-start shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <ArrowLeft className="size-3.5 shrink-0" aria-hidden="true" />
                Previous story
              </span>
              <span className="font-head line-clamp-2 text-sm font-medium">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group border-border bg-card flex flex-col items-end gap-y-1.5 rounded border-2 p-4 text-end shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:justify-self-end sm:text-right"
            >
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                Next story
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </span>
              <span className="font-head line-clamp-2 text-sm font-medium">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default DetailBlogPage;
