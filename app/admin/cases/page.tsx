"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { DogCase } from "@/types/site";

export default function AdminCasesPage() {
  const { getIdToken } = useAuth();
  const [cases, setCases] = useState<DogCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cases");
    const data = await res.json();
    setCases(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete() {
    if (!deleteSlug) return;
    const token = await getIdToken();
    await fetch(`/api/cases/${deleteSlug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteSlug(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Cases</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {cases.length} case{cases.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/cases/new"
          className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest/90"
        >
          + New Case
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-ink-soft">Loading…</p>
      ) : (
        <div className="mt-6 space-y-2">
          {cases.map((c) => (
            <div
              key={c.slug}
              className="flex items-center justify-between rounded-lg border border-ink/8 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {c.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.heroImage}
                    alt={c.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <Link
                    href={`/admin/cases/${c.slug}`}
                    className="font-medium text-ink hover:text-forest"
                  >
                    {c.name}
                  </Link>
                  <p className="text-xs text-ink-soft">
                    {c.status} · ${c.raisedUsd.toLocaleString()} / $
                    {c.goalUsd.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/cases/${c.slug}`}
                  className="rounded px-2 py-1 text-xs font-medium text-ink-soft hover:bg-ink/5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteSlug(c.slug)}
                  className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteSlug}
        title="Delete Case"
        message={`Are you sure you want to delete "${deleteSlug}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteSlug(null)}
      />
    </div>
  );
}
