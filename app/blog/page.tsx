import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { EmailSignup } from "@/components/email-signup";
import { getBlogPosts, getCategoryLabel } from "@/lib/get-blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, resources, and updates from The Wolf Project — education, community news, and case updates.",
};

const categories = [
  "emergency-care",
  "emergency-signs",
  "vet-talk",
  "preventative-care",
  "vet-resources",
  "community-updates",
  "case-updates",
] as const;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const allPosts = await getBlogPosts();
  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <>
      <section className="section-shell py-20 text-center lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="From the Pack"
            title="Blog & Resources"
            intro="Stories, educational resources, and updates from The Wolf Project community."
          />
        </Reveal>
      </section>

      {/* Category filter tabs */}
      <section className="section-shell pb-8">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                !activeCategory
                  ? "bg-forest text-white"
                  : "bg-sand text-ink-soft hover:bg-ink/8"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  activeCategory === cat
                    ? "bg-forest text-white"
                    : "bg-sand text-ink-soft hover:bg-ink/8"
                }`}
              >
                {getCategoryLabel(cat)}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-16">
        <Reveal>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md text-center">
              <p className="text-ink-soft">
                {activeCategory
                  ? `No posts in ${getCategoryLabel(activeCategory)} yet. Check back soon.`
                  : "No posts yet. Check back soon for stories, resources, and community updates."}
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Email signup */}
      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading="Stay Updated"
              description="Get the latest posts, case updates, and mission milestones in your inbox."
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
