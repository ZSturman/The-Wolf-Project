"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type EmailSignupProps = {
  className?: string;
  /** Compact mode for footer / sidebar placement */
  compact?: boolean;
  /** Heading override */
  heading?: string;
  /** Description override */
  description?: string;
  /** Invert colors for dark backgrounds */
  dark?: boolean;
  /** Optional Kit tag to attach (e.g. "membership-waitlist"). */
  interest?: string;
  /** Override CTA label (e.g. "Join the waitlist"). */
  ctaLabel?: string;
};

export function EmailSignup({
  className,
  compact = false,
  heading = "Join the Pack",
  description = "Get updates on cases, milestones, and how the lifeline is growing.",
  dark = false,
  interest,
  ctaLabel,
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...(interest ? { interest } : {}) }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're part of the pack.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("text-center", className)}>
        <p
          className={cn(
            "text-sm font-semibold",
            dark ? "text-white" : "text-ink",
          )}
        >
          ✓ {message}
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
        <p
          className={cn(
            "text-sm font-semibold",
            dark ? "text-white" : "text-ink",
          )}
        >
          {heading}
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={cn(
              "min-w-0 flex-1 rounded-full border px-4 py-2 text-sm outline-none transition focus:ring-2",
              dark
                ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/40"
                : "border-ink/12 bg-white text-ink placeholder:text-ink-soft focus:ring-ink/20",
            )}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              dark
                ? "bg-white text-forest hover:bg-sand"
                : "bg-forest text-white hover:bg-ink",
              status === "loading" && "opacity-60",
            )}
          >
            {status === "loading" ? "…" : (ctaLabel ?? "Join")}
          </button>
        </div>
        {status === "error" && (
          <p className="text-xs text-red-600">{message}</p>
        )}
      </form>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.28em]",
          dark ? "text-sand/76" : "text-ink-soft",
        )}
      >
        {heading}
      </p>
      <p
        className={cn(
          "mx-auto mt-2 max-w-md text-sm leading-7",
          dark ? "text-white/70" : "text-ink-soft",
        )}
      >
        {description}
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-4 flex max-w-md gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(
            "min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition focus:ring-2",
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:ring-white/40"
              : "border-ink/12 bg-white text-ink placeholder:text-ink-soft focus:ring-ink/20",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "rounded-full px-6 py-3 text-sm font-semibold transition",
            dark
              ? "bg-white text-forest hover:bg-sand"
              : "bg-forest text-white hover:bg-ink",
            status === "loading" && "opacity-60",
          )}
        >
          {status === "loading" ? "Joining…" : (ctaLabel ?? "Join")}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600">{message}</p>
      )}
    </div>
  );
}
