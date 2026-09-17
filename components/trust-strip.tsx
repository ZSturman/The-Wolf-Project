import type { TrustFact } from "@/types/site";

type TrustStripProps = {
  items: TrustFact[];
  className?: string;
};

export function TrustStrip({ items, className }: TrustStripProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-4 ${className ?? ""}`.trim()}>
      {items.map((item) => (
        <article key={item.title} className="panel p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
            Our promise
          </p>
          <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
