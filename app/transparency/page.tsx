import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { FundAllocation } from "@/components/fund-allocation";
import { CaseStatusBadge } from "@/components/case-status-badge";
import { TrustStrip } from "@/components/trust-strip";
import { ButtonLink } from "@/components/button-link";
import { getSingleton } from "@/lib/db/singletons";
import { getTransparencyStats } from "@/lib/get-transparency-stats";
import { getTrustContent } from "@/lib/site-content";
import type { SiteSettings } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "How The Wolf Project uses funds — phase status, fund allocation, and case outcomes.",
};

export default async function TransparencyPage() {
  const [settings, stats, trustContent] = await Promise.all([
    getSingleton<SiteSettings>("siteSettings"),
    getTransparencyStats(),
    getTrustContent(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="section-shell py-20 text-center lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Transparency"
            title={trustContent.transparencyHeroTitle}
            intro={trustContent.transparencyHeroIntro}
            align="center"
          />
        </Reveal>
      </section>

      {/* Phase status */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="panel mx-auto max-w-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
              Current Phase
            </p>
            <h2 className="mt-3 text-3xl font-bold text-ink">
              {settings?.phaseLabel ?? "Phase 1 — Building the Lifeline"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {settings?.operationalState ??
                "The Access to Care Lifeline is in its early stages."}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Lifeline progress */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
              Lifeline Progress
            </h2>
            <div className="mt-4">
              <DonationProgressBar />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Fund allocation */}
      {settings?.fundAllocation && settings.fundAllocation.length > 0 && (
        <section className="section-shell pb-16">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                eyebrow="Fund Allocation"
                title="Where Every Dollar Goes"
                intro="A breakdown of how donations to The Wolf Project are directed."
              />
              <div className="mt-8">
                <FundAllocation items={settings.fundAllocation} />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Case overview */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Case Accountability"
              title="Dogs We&apos;ve Served"
              intro="A summary of every case — active, completed, and memorial."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="panel p-6 text-center">
                <p className="text-3xl font-bold tabular-nums text-ink">
                  {stats.activeCases}
                </p>
                <p className="mt-1 text-sm text-ink-soft">Active Cases</p>
              </div>
              <div className="panel p-6 text-center">
                <p className="text-3xl font-bold tabular-nums text-ink">
                  {stats.completedCases}
                </p>
                <p className="mt-1 text-sm text-ink-soft">Completed</p>
              </div>
              <div className="panel p-6 text-center">
                <p className="text-3xl font-bold tabular-nums text-ink">
                  ${stats.totalRaised.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-ink-soft">Total Raised</p>
              </div>
            </div>

            {stats.caseSummaries.length > 0 && (
              <div className="mt-6 space-y-3">
                {stats.caseSummaries.map((c) => {
                  const pct =
                    c.goalUsd > 0
                      ? Math.min(100, (c.raisedUsd / c.goalUsd) * 100)
                      : 0;
                  return (
                    <Link
                      key={c.slug}
                      href={`/cases/${c.slug}`}
                      className="panel flex items-center gap-4 p-4 transition hover:shadow-md"
                    >
                      <CaseStatusBadge status={c.status} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink">
                          {c.name}
                        </p>
                        {c.goalUsd > 0 && (
                          <div className="mt-1 flex items-center gap-3">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
                              <div
                                className="h-full rounded-full bg-forest"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs tabular-nums text-ink-soft">
                              ${c.raisedUsd.toLocaleString()} / $
                              {c.goalUsd.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-6 text-center">
              <ButtonLink href="/cases" variant="secondary">
                View All Cases
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trust commitments */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Our Commitments"
              title={trustContent.transparencyCommitmentsTitle}
              intro={trustContent.transparencyCommitmentsIntro}
            />
            <ul className="mt-6 space-y-3">
              {trustContent.commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="panel flex items-start gap-3 p-4"
                >
                  <span className="mt-0.5 text-forest" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {commitment}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-16">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <TrustStrip items={trustContent.trustFacts} />
          </div>
        </Reveal>
      </section>

      {/* EIN / footer */}
      <section className="section-shell pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm leading-7 text-ink-soft">
              The Wolf Project is an initiative under SGT Canines, a 501(c)(3)
              non-profit organization in the state of Florida. EIN:{" "}
              <span className="font-semibold text-ink">99-4415153</span>. All
              donations are tax deductible. Questions?{" "}
              <a
                href="https://www.instagram.com/_wolf_project/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Reach out on Instagram
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
