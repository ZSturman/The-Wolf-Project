import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="text-base leading-8 text-ink-soft sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}
