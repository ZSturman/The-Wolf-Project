"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "wolf-pack-demo-banner-dismissed";

export function DemoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="relative bg-amber-500 px-4 py-2 text-center text-sm font-medium text-black">
      <span>
        This is a <strong>portfolio demo</strong> — content is editable via the{" "}
        <a href="/admin" className="underline hover:no-underline">
          Admin Panel
        </a>
        .
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-black/60 hover:text-black"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}
