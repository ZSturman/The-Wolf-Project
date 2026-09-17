import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { socialLinks } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Wolf Project — by topic, by team, by purpose. Pick the address that matches your reason for reaching out.",
};

const CHANNELS = [
  {
    audience: "Families in crisis",
    headline: "Need help with an emergency?",
    body: "If your dog is facing an emergency you can't afford, the fastest path is the application portal — every submission is read by a real person.",
    primaryHref: "/apply",
    primaryLabel: "Start an application",
    secondaryHref: "mailto:help@thewolfproject.org",
    secondaryLabel: "help@thewolfproject.org",
  },
  {
    audience: "Veterinary partners",
    headline: "Hospital partnerships",
    body: "Refer a case, request partnership materials, or set up a 20-minute conversation with our team.",
    primaryHref: "mailto:vets@thewolfproject.org",
    primaryLabel: "vets@thewolfproject.org",
    secondaryHref: "/for-vets",
    secondaryLabel: "Read the partner page",
  },
  {
    audience: "Sponsors & donors",
    headline: "Sponsorship and major gifts",
    body: "Community fundraiser sponsorships, multi-event packages, in-kind partnerships, and major gift conversations.",
    primaryHref: "mailto:partners@thewolfproject.org",
    primaryLabel: "partners@thewolfproject.org",
    secondaryHref: "/community-fundraisers",
    secondaryLabel: "See sponsor tiers",
  },
  {
    audience: "Press & media",
    headline: "Stories and interviews",
    body: "Press inquiries, podcast and editorial requests, and access to founder commentary.",
    primaryHref: "mailto:press@thewolfproject.org",
    primaryLabel: "press@thewolfproject.org",
  },
  {
    audience: "Careers & volunteers",
    headline: "Join the team",
    body: "Volunteer opportunities, contractor inquiries, and openings as we grow.",
    primaryHref: "mailto:team@thewolfproject.org",
    primaryLabel: "team@thewolfproject.org",
  },
  {
    audience: "Everything else",
    headline: "Just saying hi?",
    body: "General questions, suggestions, or anything that doesn't fit a category above.",
    primaryHref: "mailto:hello@thewolfproject.org",
    primaryLabel: "hello@thewolfproject.org",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            Reach the right person, fast.
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            Pick the channel below that matches your reason for reaching out. We read
            every message and respond within two business days. If you&apos;re in an active
            emergency with your dog, please use the application portal — it routes
            faster than email.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading eyebrow="By topic" title="Channels" />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => {
            const primaryExternal = c.primaryHref.startsWith("mailto:");
            const secondaryExternal = c.secondaryHref?.startsWith("mailto:");
            return (
              <Reveal key={c.audience} delay={i * 50}>
                <article className="panel flex h-full flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                    {c.audience}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-ink">{c.headline}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                    {c.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <ButtonLink
                      href={c.primaryHref}
                      variant="primary"
                      external={primaryExternal}
                      className="text-xs"
                    >
                      {c.primaryLabel}
                    </ButtonLink>
                    {c.secondaryHref && c.secondaryLabel && (
                      <ButtonLink
                        href={c.secondaryHref}
                        variant="ghost"
                        external={secondaryExternal}
                        className="text-xs"
                      >
                        {c.secondaryLabel}
                      </ButtonLink>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
            Find us elsewhere
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            Follow the work in real time.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <ButtonLink key={s.href} href={s.href} external variant="secondary">
                {s.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
