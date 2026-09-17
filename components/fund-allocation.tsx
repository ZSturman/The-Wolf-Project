import { cn } from "@/lib/cn";

type Allocation = {
  category: string;
  percentage: number | null;
  description: string;
};

type FundAllocationProps = {
  items: readonly Allocation[];
  className?: string;
};

const colors = [
  "bg-forest",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-sky-600",
  "bg-amber-500",
  "bg-rose-500",
];

export function FundAllocation({ items, className }: FundAllocationProps) {
  const withPct = items.filter((item) => item.percentage != null && item.percentage > 0);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stacked bar */}
      {withPct.length > 0 && (
        <div className="flex h-5 overflow-hidden rounded-full bg-sand">
          {withPct.map((item, i) => (
            <div
              key={item.category}
              className={cn("h-full transition-all", colors[i % colors.length])}
              style={{ width: `${item.percentage}%` }}
              title={`${item.category}: ${item.percentage}%`}
            />
          ))}
        </div>
      )}

      {/* Legend + details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <div key={item.category} className="panel p-5">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-block h-3 w-3 rounded-full",
                  colors[i % colors.length],
                )}
              />
              <h3 className="font-semibold text-ink">{item.category}</h3>
            </div>
            {item.percentage != null && (
              <p className="mt-1 text-2xl font-bold tabular-nums text-ink">
                {item.percentage}%
              </p>
            )}
            {item.description && (
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
