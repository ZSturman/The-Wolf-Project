"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { getIdToken } = useAuth();
  const [counts, setCounts] = useState({ cases: 0, posts: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [casesRes, postsRes] = await Promise.all([
          fetch("/api/cases"),
          fetch("/api/posts"),
        ]);
        const cases = await casesRes.json();
        const posts = await postsRes.json();
        setCounts({
          cases: Array.isArray(cases) ? cases.length : 0,
          posts: Array.isArray(posts) ? posts.length : 0,
        });
      } catch {
        // ignore
      }
    }
    load();
  }, [seedResult]);

  async function handleSeed() {
    if (!confirm("This will reset all content to demo data. Continue?")) return;
    setSeeding(true);
    setSeedResult(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSeedResult("Demo data seeded successfully.");
      } else {
        const data = await res.json();
        setSeedResult(`Error: ${data.error ?? "Seed failed"}`);
      }
    } catch {
      setSeedResult("Error: Network request failed");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Manage cases, blog posts, and site settings.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/cases"
          className="rounded-xl border border-ink/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-3xl font-bold tabular-nums text-ink">
            {counts.cases}
          </p>
          <p className="mt-1 text-sm text-ink-soft">Cases</p>
        </Link>
        <Link
          href="/admin/posts"
          className="rounded-xl border border-ink/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-3xl font-bold tabular-nums text-ink">
            {counts.posts}
          </p>
          <p className="mt-1 text-sm text-ink-soft">Blog Posts</p>
        </Link>
        <Link
          href="/admin/settings"
          className="rounded-xl border border-ink/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-3xl font-bold tabular-nums text-ink">9</p>
          <p className="mt-1 text-sm text-ink-soft">Site Settings</p>
        </Link>
      </div>

      <div className="mt-10 rounded-xl border border-ink/8 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-ink">Seed / Reset Demo Data</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Reset all content to the default demo data. This will overwrite existing content.
        </p>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {seeding ? "Seeding…" : "Reset Demo Data"}
        </button>
        {seedResult && (
          <p
            className={`mt-3 text-sm ${seedResult.startsWith("Error") ? "text-red-600" : "text-green-600"}`}
          >
            {seedResult}
          </p>
        )}
      </div>
    </div>
  );
}
