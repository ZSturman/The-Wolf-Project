import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { assetIndex } from "@/data/assets";
import { getStoryContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Wolf's story changed everything, revealing how often access to care disappears between diagnosis and a bill.",
};

export default async function OurStoryPage() {
  const storyContent = await getStoryContent();

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="hero-grid">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
              Our Story
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              {storyContent.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {storyContent.heroIntro}
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              {storyContent.heroBody}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/join-the-pack">Back The Pack</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                Access to Care
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.4rem] border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
              <Image
                src={assetIndex["wolf-hero-1"].localSrc}
                alt={assetIndex["wolf-hero-1"].alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {storyContent.stats.map((stat) => (
              <article key={stat.label} className="panel p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-ink">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {stat.note}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Wolf's Story"
            title={storyContent.sectionTitle}
            intro={storyContent.sectionIntro}
          />
        </Reveal>
        <div className="mt-10 space-y-12">
          {storyContent.chapters.map((chapter, index) => {
            const image = assetIndex[chapter.assetId];

            return (
              <Reveal
                key={chapter.title}
                delay={index * 80}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
              >
                <div
                  className={`relative aspect-4/5 overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={image.localSrc}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
                <article className="panel p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                    Chapter {index + 1}
                  </p>
                  <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-ink">
                    {chapter.lead}
                  </p>
                  <div className="prose-tight mt-6 text-base leading-8 text-ink-soft">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="panel p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
            What it led to
          </p>
          <blockquote className="mt-4 max-w-4xl text-4xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-5xl">
            {storyContent.closingQuote}
          </blockquote>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft">
            {storyContent.closingBody}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/how-it-works" variant="secondary">
              Access to Care
            </ButtonLink>
            <ButtonLink href="/join-the-pack">Back The Pack</ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
