"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ApplicationAttachment, FamilyUpdate } from "@/types/site";

interface FamilyUpdateFormProps {
  caseSlug: string;
  token: string;
  existingUpdates: FamilyUpdate[];
}

export function FamilyUpdateForm({
  caseSlug,
  token,
  existingUpdates,
}: FamilyUpdateFormProps) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [attachments, setAttachments] = useState<ApplicationAttachment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/applications/upload", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as
        | { url: string; filename: string; contentType: string }
        | { error: string };
      if (!res.ok || !("url" in json)) {
        setError("error" in json ? json.error : "Upload failed");
      } else {
        setAttachments((prev) => [...prev, json]);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!note.trim() && attachments.length === 0) {
      setError("Add a note or upload at least one file.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/portal/${caseSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, note, attachments }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? "Update failed");
        setSubmitting(false);
        return;
      }
      setNote("");
      setAttachments([]);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 panel p-6">
        <h3 className="text-lg font-semibold text-ink">Post an update</h3>
        <p className="text-sm text-ink-soft">
          Share how your dog is doing. Photos and short notes help us tell your story
          and inspire the next family.
        </p>
        <label className="block text-sm">
          <span className="font-semibold text-ink">Note</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink"
            placeholder="A short update on how recovery is going."
          />
        </label>
        <div className="rounded-2xl border border-dashed border-ink/15 bg-white/70 p-4">
          <input
            type="file"
            accept="image/*,application/pdf"
            disabled={uploading}
            onChange={handleFile}
            className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-garnet file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          {uploading && <p className="mt-2 text-xs text-ink-soft">Uploading…</p>}
        </div>
        {attachments.length > 0 && (
          <ul className="space-y-2 text-sm">
            {attachments.map((a) => (
              <li
                key={a.url}
                className="flex items-center justify-between rounded-lg border border-ink/8 bg-white px-3 py-2"
              >
                <span className="truncate">{a.filename}</span>
                <button
                  type="button"
                  onClick={() =>
                    setAttachments((prev) => prev.filter((p) => p.url !== a.url))
                  }
                  className="ml-3 text-xs font-semibold uppercase text-garnet-deep"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {error && (
          <p className="rounded-lg border border-garnet/30 bg-blush px-3 py-2 text-sm text-garnet-deep">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || uploading}
          className="rounded-full bg-garnet px-6 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-garnet-deep disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post update"}
        </button>
      </form>

      {existingUpdates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-ink">Your updates</h3>
          <ul className="mt-4 space-y-4">
            {[...existingUpdates]
              .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
              .map((u) => (
                <li
                  key={u.postedAt}
                  className="rounded-2xl border border-ink/8 bg-white p-5 text-sm"
                >
                  <p className="text-xs text-ink-soft">
                    {new Date(u.postedAt).toLocaleString()}
                  </p>
                  {u.note && (
                    <p className="mt-2 whitespace-pre-wrap text-ink">{u.note}</p>
                  )}
                  {u.attachments.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {u.attachments.map((a) => (
                        <li key={a.url}>
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-forest underline"
                          >
                            {a.filename || "View attachment"}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
