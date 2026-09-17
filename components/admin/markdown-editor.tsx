"use client";

import { useState } from "react";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { textareaClass } from "./form-field";
import { cn } from "@/lib/cn";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  rows?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  id,
  rows = 12,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const preview = (() => {
    try {
      const ast = Markdoc.parse(value);
      const renderable = Markdoc.transform(ast);
      return Markdoc.renderers.react(renderable, React);
    } catch {
      return <p className="text-sm text-red-600">Error parsing markdown</p>;
    }
  })();

  return (
    <div>
      <div className="mb-1 flex gap-2">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={cn(
            "text-xs font-medium",
            !showPreview ? "text-forest underline" : "text-ink-soft",
          )}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={cn(
            "text-xs font-medium",
            showPreview ? "text-forest underline" : "text-ink-soft",
          )}
        >
          Preview
        </button>
      </div>
      {showPreview ? (
        <div className="min-h-[120px] rounded-lg border border-ink/15 bg-white/50 p-3 text-sm text-ink-soft prose-tight">
          {preview}
        </div>
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={textareaClass()}
        />
      )}
    </div>
  );
}
