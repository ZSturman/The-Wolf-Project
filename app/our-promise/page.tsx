import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { FAQList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { TrustStrip } from "@/components/trust-strip";
import { supportOptions } from "@/data/site-content";
import { getCampaignStatus, getTrustContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Promise",
  description:
    "The Promise We Keep: clarity, accountability, and a commitment to access when a life can still be saved.",
};

export default async function OurPromisePage() {
  const [campaignStatus, trustContent] = await Promise.all([
    getCampaignStatus(),
    getTrustContent(),
  ]);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
              Our Promise
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              {trustContent.promiseHeroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {trustContent.promiseHeroIntro}
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              {trustContent.promiseHeroBody}
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
            eyebrow="What That Promise Means"
            title={trustContent.commitmentsTitle}
            intro={trustContent.commitmentsIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trustContent.commitments.map((commitment, index) => (
            <Reveal key={commitment} delay={index * 60}>
              <article className="panel h-full p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  Commitment {index + 1}
                </p>
                <p className="mt-4 text-lg leading-8 text-ink">{commitment}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <TrustStrip items={trustContent.trustFacts} />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Transparency & Accountability"
              title={trustContent.faqTitle}
              intro={trustContent.faqIntro}
            />
            <div className="mt-8">
              <FAQList items={trustContent.faqItems} />
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Where We Are Now
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              {trustContent.promiseCalloutTitle}
            </h2>
            <div className="prose-tight mt-6 text-base leading-8 text-ink-soft">
              {trustContent.promiseCalloutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={supportOptions[0].href} external>
                {supportOptions[0].label}
              </ButtonLink>
              <ButtonLink href="/impact" variant="secondary">
                Where We Are Now
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
