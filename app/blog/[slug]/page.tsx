import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { BlogCard } from "@/components/blog-card";
import { EmailSignup } from "@/components/email-signup";
import { getPost } from "@/lib/db/posts";
import { getBlogPosts, getCategoryLabel } from "@/lib/get-blog-posts";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getPost(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getPost(slug);
  if (!entry) notFound();

  const renderable = entry.body
    ? Markdoc.transform(Markdoc.parse(entry.body))
    : null;

  // Fetch related posts (same category, excluding current)
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === entry.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <section className="section-shell py-20 lg:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {getCategoryLabel(entry.category)}
            </span>
            <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-4 text-sm text-ink-soft">
              {entry.author}
              {entry.publishedAt && ` · ${entry.publishedAt}`}
            </p>
          </div>
        </Reveal>
      </section>

      {entry.featuredImage && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-ink/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.featuredImage}
                alt={entry.title}
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </section>
      )}

      <section className="section-shell pb-16">
        <Reveal>
          <div className="prose-tight mx-auto max-w-2xl text-ink-soft">
            {renderable ? Markdoc.renderers.react(renderable, React) : null}
          </div>
        </Reveal>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                More in {getCategoryLabel(entry.category)}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="section-shell pb-12">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading="Enjoying This?"
              description="Get case updates and mission milestones in your inbox."
            />
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <ButtonLink href="/blog" variant="ghost">
              ← Back to Blog
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
