"use client";

import type { ReactNode } from "react";

interface RepeaterFieldProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, index: number, update: (item: T) => void) => ReactNode;
  label?: string;
}

export function RepeaterField<T>({
  items,
  onChange,
  newItem,
  renderItem,
  label,
}: RepeaterFieldProps<T>) {
  const add = () => onChange([...items, newItem()]);
  const remove = (index: number) =>
    onChange(items.filter((_, i) => i !== index));
  const update = (index: number, item: T) =>
    onChange(items.map((existing, i) => (i === index ? item : existing)));
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };
  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {label}
        </p>
      )}
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-ink/10 bg-white p-4"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-ink-soft">
              #{index + 1}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="rounded px-1.5 py-0.5 text-xs text-ink-soft hover:bg-ink/5 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index >= items.length - 1}
                className="rounded px-1.5 py-0.5 text-xs text-ink-soft hover:bg-ink/5 disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded px-1.5 py-0.5 text-xs text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
          {renderItem(item, index, (updated) => update(index, updated))}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="rounded-lg border border-dashed border-ink/20 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
      >
        + Add Item
      </button>
    </div>
  );
}
