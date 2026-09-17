import { cn } from "@/lib/cn";

type StatCalloutProps = {
  value: string;
  label: string;
  detail?: string;
  /**
   * Visual treatment.
   * - garnet: large garnet numeral on cream — for donation impact + urgency stats.
   * - quiet:  ink numeral on white — for neutral facts in trust contexts.
   */
  tone?: "garnet" | "quiet";
  className?: string;
};

export function StatCallout({
  value,
  label,
  detail,
  tone = "garnet",
  className,
}: StatCalloutProps) {
  const toneClasses =
    tone === "garnet"
      ? "border-garnet/15 bg-blush"
      : "border-ink/8 bg-white/80";
  const valueClasses =
    tone === "garnet" ? "text-garnet-deep" : "text-ink";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-3xl border p-6",
        toneClasses,
        className,
      )}
    >
      <span
        className={cn(
          "font-serif text-4xl font-semibold leading-none tracking-tight md:text-5xl",
          valueClasses,
        )}
      >
        {value}
      </span>
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">
        {label}
      </span>
      {detail ? (
        <p className="text-sm leading-relaxed text-ink-soft">{detail}</p>
      ) : null}
    </div>
  );
}
