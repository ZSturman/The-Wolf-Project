import type { FAQItem } from "@/types/site";

type FAQListProps = {
  items: FAQItem[];
};

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="panel group p-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-lg font-semibold text-ink outline-none marker:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="text-2xl text-ink-soft transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-ink/8 px-6 py-5 text-sm leading-7 text-ink-soft">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
