import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CaseCard } from "@/components/case-card";
import { getCases } from "@/lib/db/cases";
import type { CaseStatus } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Dogs we're helping — see active cases, funded cases, and dogs who made it home.",
};

const statusGroups: { label: string; statuses: CaseStatus[] }[] = [
  { label: "Active Emergencies", statuses: ["active", "funded", "in-treatment"] },
  { label: "Success Stories", statuses: ["completed"] },
  { label: "Memorial", statuses: ["memorial"] },
];

function sortByPriority<T extends { featuredPriority?: number; createdAt?: string | null }>(
  a: T,
  b: T,
) {
  const priorityA = a.featuredPriority ?? 999;
  const priorityB = b.featuredPriority ?? 999;
  if (priorityA !== priorityB) return priorityA - priorityB;
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

export default async function CasesPage() {
  const allCases = await getCases();

  return (
    <>
      <section className="section-shell py-20 text-center lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The Dogs We Serve"
            title="Cases"
            intro="Follow active emergencies in real time, then revisit completed stories to see treatment journeys, outcomes, and donor impact."
            align="center"
          />
        </Reveal>
      </section>

      {allCases.length > 0 ? (
        statusGroups.map((group) => {
          const filtered = allCases.filter((c) =>
            group.statuses.includes(c!.status as CaseStatus),
          ).sort(sortByPriority);
          if (filtered.length === 0) return null;
          return (
            <section key={group.label} className="section-shell pb-16">
              <Reveal>
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                  {group.label}
                </h2>
              </Reveal>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c, i) => (
                  <Reveal key={c!.slug} delay={i * 60}>
                    <CaseCard
                      slug={c!.slug}
                      name={c!.name}
                      summary={c!.summary}
                      heroImage={c!.heroImage}
                      status={c!.status as CaseStatus}
                      goalUsd={c!.goalUsd}
                      raisedUsd={c!.raisedUsd ?? 0}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <section className="section-shell pb-20">
          <Reveal>
            <div className="mx-auto max-w-md text-center">
              <p className="text-ink-soft">
                No cases yet. We&apos;re building the lifeline — the first cases
                will appear here once the Access to Care fund is operational.
              </p>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
