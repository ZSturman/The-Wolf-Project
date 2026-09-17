"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { BlogPost } from "@/types/site";

export default function AdminPostsPage() {
  const { getIdToken } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete() {
    if (!deleteSlug) return;
    const token = await getIdToken();
    await fetch(`/api/posts/${deleteSlug}`, {
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
          <h1 className="text-2xl font-bold text-ink">Blog Posts</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest/90"
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-ink-soft">Loading…</p>
      ) : (
        <div className="mt-6 space-y-2">
          {posts.map((p) => (
            <div
              key={p.slug}
              className="flex items-center justify-between rounded-lg border border-ink/8 bg-white px-4 py-3 shadow-sm"
            >
              <div>
                <Link
                  href={`/admin/posts/${p.slug}`}
                  className="font-medium text-ink hover:text-forest"
                >
                  {p.title}
                </Link>
                <p className="text-xs text-ink-soft">
                  {p.category} · {p.author} · {p.publishedAt?.slice(0, 10) ?? "Draft"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/posts/${p.slug}`}
                  className="rounded px-2 py-1 text-xs font-medium text-ink-soft hover:bg-ink/5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteSlug(p.slug)}
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
        title="Delete Post"
        message={`Are you sure you want to delete "${deleteSlug}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteSlug(null)}
      />
    </div>
  );
}
