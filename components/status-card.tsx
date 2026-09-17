import type { CampaignStatus } from "@/types/site";

type StatusCardProps = {
  status: CampaignStatus;
  className?: string;
};

export function StatusCard({ status, className }: StatusCardProps) {
  return (
    <div
      className={`panel space-y-6 p-6 sm:p-7 ${className ?? ""}`.trim()}
      aria-label="Campaign status"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          Where we are now
        </p>
        <h3 className="text-3xl font-bold leading-tight text-ink">
          {status.phaseLabel}
        </h3>
        <p className="text-sm leading-7 text-ink-soft">{status.summary}</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-ink/8 bg-white/75 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Applications
          </dt>
          <dd className="mt-2 text-lg font-semibold text-ink">
            {status.acceptingApplications ? "Open" : "Not yet open"}
          </dd>
        </div>
        <div className="rounded-3xl border border-ink/8 bg-white/75 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Structure
          </dt>
          <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
            Initiative under SGT Canines
          </dd>
        </div>
        <div className="rounded-3xl border border-ink/8 bg-white/75 p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Priority
          </dt>
          <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
            Build the lifeline responsibly
          </dd>
        </div>
      </dl>

      <p className="rounded-3xl border border-ink/12 bg-ink/4 px-4 py-4 text-sm leading-7 text-ink">
        {status.operationalState}
      </p>
    </div>
  );
}
