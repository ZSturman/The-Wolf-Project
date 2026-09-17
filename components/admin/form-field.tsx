"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function inputClass(hasError = false) {
  return cn(
    "w-full rounded-lg border px-3 py-2 text-sm text-ink outline-none transition-colors",
    "focus:border-forest focus:ring-1 focus:ring-forest",
    hasError ? "border-red-400" : "border-ink/15",
  );
}

export function textareaClass(hasError = false) {
  return cn(inputClass(hasError), "min-h-[120px] resize-y");
}
