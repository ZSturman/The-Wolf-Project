import { cn } from "@/lib/cn";
import type { CaseStatus } from "@/types/site";

const statusConfig: Record<CaseStatus, { label: string; bg: string; text: string }> = {
  active: { label: "Active", bg: "bg-garnet-soft", text: "text-garnet-deep" },
  funded: { label: "Funded", bg: "bg-emerald-100", text: "text-emerald-800" },
  "in-treatment": { label: "In Treatment", bg: "bg-blue-100", text: "text-blue-800" },
  completed: { label: "Completed", bg: "bg-green-100", text: "text-green-800" },
  memorial: { label: "Memorial", bg: "bg-stone-200", text: "text-stone-700" },
};

type CaseStatusBadgeProps = {
  status: CaseStatus;
  className?: string;
};

export function CaseStatusBadge({ status, className }: CaseStatusBadgeProps) {
  const cfg = statusConfig[status] ?? statusConfig.active;
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        cfg.bg,
        cfg.text,
        className,
      )}
    >
      {cfg.label}
    </span>
  );
}
