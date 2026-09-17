import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "An emerging concept where families support The Wolf Project monthly and may receive instant access for life-saving care plus annual wellness through partner vets.",
};

const PILLARS = [
  {
    title: "Stand with the lifeline",
    body: "Members fund the safety net that catches families in crisis. Your monthly support is what makes a yes possible.",
  },
  {
    title: "Direct vet partnerships",
    body: "We're designing membership to plug into our partner hospital network — so members may benefit from preferred access and discounted wellness through participating vets.",
  },
  {
    title: "Annual wellness",
    body: "An annual wellness check is at the heart of preventative care. We're exploring how to bundle that into membership so it's never the line item that gets skipped.",
  },
  {
    title: "Emergency access",
    body: "When the unthinkable happens, members would have a streamlined path into the lifeline — fewer forms, faster review, same direct-to-hospital funding model.",
  },
];

const TRUTHS = [
  "Membership is not yet live. We are building it carefully so we can stand behind every benefit.",
  "Our 501(c)(3) status under SGT Canines is in place. The membership program will follow once the lifeline is fully operational and our partner network can support it.",
  "When we open, founding waitlist members will be invited first.",
];

export default function MembershipPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            Concept · Coming next
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            Stay ahead of the emergency.
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            We&apos;re designing a membership where families help us keep the lifeline open
            — and may receive direct access to partner vets, annual wellness benefits,
            and a faster path into emergency funding when life turns sideways.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-ink-soft">
            This page describes a developing concept. Specific benefits are being shaped
            in partnership with our founding veterinary network.
          </p>
        </Reveal>
      </section>

      {/* Concept pillars */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="What membership could look like"
            title="The shape of the idea."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="panel h-full p-6">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Honest truths */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
            Honest about where we are
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            We will not promise what we can&apos;t deliver.
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-ink-soft">
            {TRUTHS.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-garnet" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Founding waitlist"
            title="Be first in line when membership opens."
            intro="Drop your email and we'll notify you the moment we're ready. Founding waitlist members get priority access at launch."
            align="center"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="panel mx-auto mt-8 max-w-xl p-8">
            <EmailSignup
              heading="Join the membership waitlist"
              description="No spam — just a single message when membership goes live."
              interest="membership-waitlist"
              ctaLabel="Join the waitlist"
            />
          </div>
        </Reveal>
      </section>

      {/* CTA — until membership opens, donate */}
      <section className="section-shell pb-20">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            Until then — back the pack.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-soft">
            Every donation today funds the structure that makes membership possible.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members"
              external
              variant="donate"
            >
              Donate Now
            </ButtonLink>
            <ButtonLink
              href="https://www.zeffy.com/en-US/donation-form/monthly-pack-leaders"
              external
              variant="secondary"
            >
              Become a monthly Pack Leader
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
