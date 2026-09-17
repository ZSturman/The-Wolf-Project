import { getCases } from "@/lib/db/cases";
import type { CaseStatus } from "@/types/site";

export type TransparencyStats = {
  activeCases: number;
  completedCases: number;
  totalGoal: number;
  totalRaised: number;
  caseSummaries: {
    slug: string;
    name: string;
    status: CaseStatus;
    goalUsd: number;
    raisedUsd: number;
  }[];
};

export async function getTransparencyStats(): Promise<TransparencyStats> {
  const allCases = await getCases();

  const activeStatuses: CaseStatus[] = ["active", "funded", "in-treatment"];
  const completedStatuses: CaseStatus[] = ["completed"];

  const activeCases = allCases.filter((c) =>
    activeStatuses.includes(c.status as CaseStatus),
  ).length;
  const completedCases = allCases.filter((c) =>
    completedStatuses.includes(c.status as CaseStatus),
  ).length;

  const totalGoal = allCases.reduce((sum, c) => sum + (c.goalUsd ?? 0), 0);
  const totalRaised = allCases.reduce((sum, c) => sum + (c.raisedUsd ?? 0), 0);

  const caseSummaries = allCases.map((c) => ({
    slug: c.slug,
    name: c.name,
    status: c.status as CaseStatus,
    goalUsd: c.goalUsd,
    raisedUsd: c.raisedUsd ?? 0,
  }));

  return { activeCases, completedCases, totalGoal, totalRaised, caseSummaries };
}
