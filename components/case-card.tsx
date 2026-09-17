import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { CaseStatusBadge } from "@/components/case-status-badge";
import type { CaseStatus } from "@/types/site";

type CaseCardProps = {
  slug: string;
  name: string;
  summary: string;
  heroImage: string | null;
  status: CaseStatus;
  goalUsd: number;
  raisedUsd: number;
  className?: string;
};

export function CaseCard({
  slug,
  name,
  summary,
  heroImage,
  status,
  goalUsd,
  raisedUsd,
  className,
}: CaseCardProps) {
  const pct = goalUsd > 0 ? Math.min(100, (raisedUsd / goalUsd) * 100) : 0;

  return (
    <Link
      href={`/cases/${slug}`}
      className={cn(
        "panel group overflow-hidden transition hover:shadow-lg",
        className,
      )}
    >
      {heroImage ? (
        <div className="relative aspect-video bg-sand">
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-sand">
          <span className="text-3xl font-bold text-ink-soft/30">
            {name.charAt(0)}
          </span>
        </div>
      )}

      <div className="p-6">
        <CaseStatusBadge status={status} />
        <h3 className="mt-3 text-lg font-bold text-ink">{name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{summary}</p>

        {goalUsd > 0 && (
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-sand">
              <div
                className="h-full rounded-full bg-forest transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              ${raisedUsd.toLocaleString()} of ${goalUsd.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
