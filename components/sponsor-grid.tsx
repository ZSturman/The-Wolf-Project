import { cn } from "@/lib/cn";

interface SponsorTier {
  tier: string;
  amount: string;
  benefits: string[];
  highlight?: boolean;
}

interface SponsorGridProps {
  tiers: SponsorTier[];
  className?: string;
}

export function SponsorGrid({ tiers, className }: SponsorGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {tiers.map((t) => (
        <article
          key={t.tier}
          className={cn(
            "panel flex h-full flex-col p-6",
            t.highlight && "border-garnet/25 bg-blush",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
            {t.tier}
          </p>
          <p className="mt-2 text-3xl font-bold text-ink">{t.amount}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-7 text-ink-soft">
            {t.benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-garnet" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
