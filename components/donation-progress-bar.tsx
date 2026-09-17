import { getSingleton } from "@/lib/db/singletons";
import { cn } from "@/lib/cn";
import type { DonationProgress } from "@/types/site";

type DonationProgressBarProps = {
  className?: string;
  /** Override the singleton — useful when parent already read the data */
  goalUsd?: number;
  raisedUsd?: number;
  /** Invert colors for dark backgrounds */
  dark?: boolean;
};

async function readProgress() {
  const data = await getSingleton<DonationProgress>("donationProgress");
  return {
    goalUsd: data?.goalUsd ?? 40_000,
    raisedUsd: data?.raisedUsd ?? 0,
  };
}

export async function DonationProgressBar({
  className,
  goalUsd: goalOverride,
  raisedUsd: raisedOverride,
  dark = false,
}: DonationProgressBarProps) {
  const { goalUsd: singletonGoal, raisedUsd: singletonRaised } =
    await readProgress();

  const goal = goalOverride ?? singletonGoal;
  const raised = raisedOverride ?? singletonRaised;
  const pct = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className={cn("text-sm font-semibold", dark ? "text-white" : "text-ink")}>
          ${raised.toLocaleString()}{" "}
          <span className={cn("font-normal", dark ? "text-white/70" : "text-ink-soft")}>
            raised of ${goal.toLocaleString()}
          </span>
        </p>
        <p className={cn("text-sm font-semibold tabular-nums", dark ? "text-white" : "text-ink")}>
          {Math.round(pct)}%
        </p>
      </div>
      <div className={cn("h-3 overflow-hidden rounded-full", dark ? "bg-white/20" : "bg-sand")}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            dark ? "bg-white" : "bg-forest",
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={raised}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label={`${raised.toLocaleString()} of ${goal.toLocaleString()} dollars raised`}
        />
      </div>
    </div>
  );
}
