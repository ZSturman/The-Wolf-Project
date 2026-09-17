import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { SponsorGrid } from "@/components/sponsor-grid";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "Community Fundraisers",
  description:
    "Bring spay, neuter, and wellness events to low-income communities — sponsored by businesses who want to stand with The Wolf Project.",
};

const TIERS = [
  {
    tier: "Pack Member",
    amount: "$500",
    benefits: [
      "Logo on event materials and recap",
      "Sponsor shoutout on social",
      "Tax-deductible receipt",
    ],
  },
  {
    tier: "Pack Leader",
    amount: "$2,500",
    benefits: [
      "Featured logo placement at the event",
      "Recap video credit",
      "Premium social mentions",
      "Dedicated thank-you in our quarterly report",
    ],
    highlight: true,
  },
  {
    tier: "Pack Founder",
    amount: "$10,000",
    benefits: [
      "Title sponsorship for one event in our 2026 series",
      "On-site booth and brand activation",
      "Speaker slot at event opening",
      "Year-long recognition on our website",
    ],
  },
  {
    tier: "Custom",
    amount: "Let's talk",
    benefits: [
      "In-kind partnerships",
      "Multi-event sponsorship packages",
      "Cause-marketing collaborations",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    title: "Pick a community",
    body: "We work with local rescues, shelters, and community partners to identify neighborhoods where access to wellness care is the barrier.",
  },
  {
    title: "Stage the event",
    body: "A free or low-cost spay/neuter and wellness day, run alongside licensed veterinary teams who volunteer or partner with us at-cost.",
  },
  {
    title: "Sponsor it",
    body: "Local and national businesses fund the event in exchange for transparent recognition and a real story of impact in the community.",
  },
  {
    title: "Report on it",
    body: "Every event gets a public recap: dogs served, costs, partner credit, and the next community on our list.",
  },
];

export default function CommunityFundraisersPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            Community Fundraisers
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            Prevention is the long game.
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            We host community spay, neuter, and wellness events in low-income
            neighborhoods — funded by sponsors and powered by partner vets — so the
            emergency we&apos;d otherwise be racing to save dogs from never has to happen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="mailto:partners@thewolfproject.org" variant="primary">
              Become a sponsor
            </ButtonLink>
            <ButtonLink href="#tiers" variant="secondary">
              See sponsor tiers
            </ButtonLink>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-ink-soft">
            Our 2026 community fundraiser series is being planned now. Specific event
            dates and locations will be announced as partners are confirmed.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How an event works"
            title="Real wellness, in the neighborhoods that need it most."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <article className="panel h-full p-6">
                <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="tiers" className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Sponsor tiers"
            title="Pick your level. We'll do the rest."
            intro="All tiers are tax-deductible through our 501(c)(3) parent organization, SGT Canines."
          />
        </Reveal>
        <Reveal delay={80}>
          <SponsorGrid tiers={TIERS} className="mt-8" />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            Want your business to back the pack?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-soft">
            Email us with the city you&apos;d like to support and we&apos;ll send the sponsor
            packet for our 2026 event series.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="mailto:partners@thewolfproject.org" variant="primary">
              partners@thewolfproject.org
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading="Get notified about events"
              description="We'll let you know when an event is happening near you."
              interest="community-events"
              ctaLabel="Notify me"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
