import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { getCampaignStatus, getProcessContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Access to Care",
  description:
    "A lifeline when treatment exists but access to care doesn't, grounded in urgent need, veterinary judgment, and responsible support.",
};

export default async function HowItWorksPage() {
  const [campaignStatus, processContent] = await Promise.all([
    getCampaignStatus(),
    getProcessContent(),
  ]);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
              Access to Care
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              {processContent.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {processContent.heroIntro}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <StatusCard status={campaignStatus} />
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How The Wolf Project Helps"
            title={processContent.stepsTitle}
            intro={processContent.stepsIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {processContent.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <article className="panel h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  Focus {index + 1}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-ink">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Reality of Emergency Care"
            title={processContent.conditionsTitle}
            intro={processContent.conditionsIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {processContent.conditions.map((condition, index) => (
            <Reveal key={condition.title} delay={index * 70}>
              <article className="panel p-6">
                <h3 className="text-2xl font-semibold text-ink">
                  {condition.title}
                </h3>
                <p className="mt-3 text-3xl font-semibold text-forest">
                  {condition.description}
                </p>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  {condition.outcome}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="How decisions are made"
              title={processContent.eligibilityTitle}
              intro={processContent.eligibilityIntro}
            />
            <div className="mt-8 grid gap-4">
              {processContent.principles.map((principle, index) => (
                <article
                  key={principle}
                  className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                    Principle {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {principle}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Where We Are Now
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              {processContent.statusTitle}
            </h2>
            <div className="prose-tight mt-5 text-base leading-8 text-ink-soft">
              {processContent.statusParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/our-promise" variant="secondary">
                Our Promise
              </ButtonLink>
              <ButtonLink href="/join-the-pack">Back The Pack</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
