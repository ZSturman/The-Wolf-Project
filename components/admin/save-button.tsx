"use client";

import { cn } from "@/lib/cn";

type SaveState = "idle" | "saving" | "success" | "error";

interface SaveButtonProps {
  state: SaveState;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const labels: Record<SaveState, string> = {
  idle: "Save Changes",
  saving: "Saving…",
  success: "Saved!",
  error: "Error — Retry",
};

export function SaveButton({
  state,
  onClick,
  type = "button",
  className,
}: SaveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={state === "saving"}
      className={cn(
        "rounded-lg px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors",
        state === "success"
          ? "bg-green-600 text-white"
          : state === "error"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-forest text-white hover:bg-forest/90",
        "disabled:opacity-50",
        className,
      )}
    >
      {labels[state]}
    </button>
  );
}
