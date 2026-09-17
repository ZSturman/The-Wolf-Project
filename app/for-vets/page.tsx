import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { DownloadCard } from "@/components/download-card";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "For Veterinary Partners",
  description:
    "Partner with The Wolf Project to give your team a real option when emergency cost stands between a treatable dog and care.",
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "You identify a case",
    body: "When a treatable, time-sensitive case enters your hospital and cost is the only barrier, you mention us to the family.",
  },
  {
    step: "2",
    title: "Family applies",
    body: "We review the application in coordination with your team — confirming diagnosis, urgency, and viability quickly.",
  },
  {
    step: "3",
    title: "We pay you directly",
    body: "Approved cases are funded by direct wire to your hospital. The family never handles the funds.",
  },
];

const PARTNER_BENEFITS = [
  {
    title: "Reduce financial euthanasia in your hospital",
    body: "Give your clinicians an option besides the worst conversation in medicine.",
  },
  {
    title: "Preserve your team's morale",
    body: "Compassion fatigue is real. Saving treatable dogs because of access — not just cost — protects the people doing the work.",
  },
  {
    title: "Transparent, hospital-direct funding",
    body: "Funds are wired directly to your hospital. We never route money through families.",
  },
  {
    title: "Documented case outcomes",
    body: "We share de-identified outcomes publicly so your team's work compounds across the network.",
  },
];

export default function ForVetsPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
            For Veterinary Partners
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
            A real option when cost is the only barrier.
          </h1>
          <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            You diagnosed it. You can fix it. The family can&apos;t pay. The Wolf Project
            exists for that exact moment — so you don&apos;t have to make the worst phone
            call in medicine when there&apos;s still a path forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="mailto:vets@thewolfproject.org" variant="primary">
              Email our partnerships team
            </ButtonLink>
            <ButtonLink href="#downloads" variant="secondary">
              Download partner materials
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How partnership works"
            title="Three steps. No funds touch the family."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.step} delay={i * 70}>
              <article className="panel h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                  Step {s.step}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Why partner with us"
            title="Built around how veterinary teams actually work."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PARTNER_BENEFITS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="panel h-full p-6">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="downloads" className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Partner materials"
            title="Take this back to your team."
            intro="These working drafts cover what we do, how we fund cases, and the partnership terms. Final, signed PDFs are coming as our 501(c)(3) is finalized."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <DownloadCard
              title="Partnership Overview"
              description="One-page summary of who we are, how funding works, and what we ask of partner hospitals."
              href="/docs/wolf-project-vet-overview.txt"
              filetype="DOC"
            />
          </Reveal>
          <Reveal delay={70}>
            <DownloadCard
              title="Letter of Intent (Template)"
              description="A non-binding LOI template to begin a formal partnership conversation with your hospital's leadership."
              href="/docs/wolf-project-loi.txt"
              filetype="DOC"
            />
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-4 text-xs text-ink-soft">
            Documents are working drafts pending finalization of our nonprofit status.
            Email <a className="underline" href="mailto:vets@thewolfproject.org">vets@thewolfproject.org</a> for the most current materials.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 sm:p-10">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
            Ready to talk?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
            We&apos;re actively building our founding partner network. Reach out and we&apos;ll
            schedule a 20-minute conversation with your team.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="mailto:vets@thewolfproject.org" variant="primary">
              vets@thewolfproject.org
            </ButtonLink>
            <ButtonLink href="/our-promise" variant="secondary">
              Our promise to partners
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading="Stay in the loop"
              description="Quarterly partner updates — case outcomes, network growth, and program changes."
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
