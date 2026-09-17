import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { StatCallout } from "@/components/stat-callout";
import { TrustStrip } from "@/components/trust-strip";
import { assetIndex } from "@/data/assets";
import { storyStats } from "@/data/site-content";
import { getHomeContent, getTrustContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Wolf Project is the access-to-care lifeline. Learn how we got here, what we believe, and where we're going.",
};

const HUB_LINKS = [
  {
    title: "Our Story",
    description: "Wolf's chapters — the moment that started this work.",
    href: "/our-story",
  },
  {
    title: "Cases",
    description: "Active, completed, and remembered families we've stood with.",
    href: "/cases",
  },
  {
    title: "Stories",
    description: "Vet talk, recovery guides, and emergency-care insights.",
    href: "/blog",
  },
  {
    title: "Transparency",
    description: "Where every dollar goes. Reporting framework and commitments.",
    href: "/transparency",
  },
  {
    title: "Membership",
    description: "An emerging path for families to stay ahead of emergencies.",
    href: "/membership",
  },
  {
    title: "Community Fundraisers",
    description: "Spay, neuter, and wellness events for low-income areas.",
    href: "/community-fundraisers",
  },
];

const PHASES = [
  {
    label: "Phase 0 — Founding",
    title: "Build the foundation.",
    body: "Establish the lifeline structure, build founding partner relationships with veterinary hospitals, and earn the first $40,000 in launch funding so we can fully stand behind every case we accept.",
    state: "current" as const,
  },
  {
    label: "Phase 1 — Open the Lifeline",
    title: "Begin accepting emergency cases.",
    body: "Launch the application portal, start funding our first emergency cases through partner hospitals, and report transparently on every outcome.",
    state: "next" as const,
  },
  {
    label: "Phase 2 — Scale the Network",
    title: "Grow the partner network and unlock prevention.",
    body: "Expand to additional veterinary hospitals across multiple regions, launch the membership concept, and run community fundraisers focused on spay, neuter, and wellness.",
    state: "future" as const,
  },
];

export default async function AboutPage() {
  const [home, trust] = await Promise.all([
    getHomeContent(),
    getTrustContent(),
  ]);

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            About The Wolf Project
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            {home.missionTitle}
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            {home.missionIntro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members"
              external
              variant="donate"
            >
              Donate Now
            </ButtonLink>
            <ButtonLink href="/our-story" variant="secondary">
              Read Wolf&apos;s full story
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Mission paragraphs + Wolf hero image */}
      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our mission"
              title="A lifeline at the moment that matters."
            />
            <div className="mt-6 space-y-4 text-base leading-8 text-ink-soft">
              {home.missionParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="relative aspect-4/5 overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)]">
            <Image
              src={assetIndex["wolf-hero-1"].localSrc}
              alt={assetIndex["wolf-hero-1"].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Story stats */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Why this exists"
            title="The cost of access — in numbers."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {storyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <StatCallout value={stat.value} label={stat.label} detail={stat.note} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Phases / where we are */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Where we are"
            title="Building the lifeline in phases."
            intro="We will not over-promise what we can deliver. Here is exactly what's done, what's next, and what we're building toward."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <Reveal key={p.label} delay={i * 70}>
              <article
                className={
                  "panel h-full p-6 " +
                  (p.state === "current" ? "border-garnet/25 bg-blush" : "")
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                  {p.label}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{p.body}</p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  {p.state === "current"
                    ? "Currently"
                    : p.state === "next"
                      ? "Next"
                      : "Future"}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Our promise"
            title="Trust is not assumed. It is built."
          />
        </Reveal>
        <Reveal delay={80}>
          <TrustStrip items={trust.trustFacts} className="mt-8" />
        </Reveal>
      </section>

      {/* Hub links */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Explore further"
            title="Everything that lives under About."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB_LINKS.map((link, i) => (
            <Reveal key={link.href} delay={i * 50}>
              <ButtonLink
                href={link.href}
                variant="ghost"
                className="panel flex h-full w-full flex-col items-start p-6 text-left"
              >
                <span className="text-lg font-semibold text-ink">{link.title}</span>
                <span className="mt-2 text-sm leading-7 text-ink-soft">
                  {link.description}
                </span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-garnet-deep">
                  Read more →
                </span>
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell pb-20">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            Stand with the next family.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-soft">
            Every donation moves us closer to the moment we can say yes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members"
              external
              variant="donate"
            >
              Donate Now
            </ButtonLink>
            <ButtonLink href="/apply" variant="secondary">
              Apply for help
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
