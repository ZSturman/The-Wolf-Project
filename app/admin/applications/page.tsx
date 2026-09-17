"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import type { Application, ApplicationStatus } from "@/types/site";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  reviewing: "Reviewing",
  approved: "Approved",
  declined: "Declined",
};

const STATUS_TONE: Record<ApplicationStatus, string> = {
  submitted: "bg-amber-100 text-amber-800",
  reviewing: "bg-sky-100 text-sky-800",
  approved: "bg-emerald-100 text-emerald-800",
  declined: "bg-zinc-200 text-zinc-700",
};

export default function AdminApplicationsPage() {
  const { getIdToken } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError(`Failed to load (${res.status})`);
        setApps([]);
      } else {
        const data = (await res.json()) as Application[];
        setApps(data);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function setStatus(app: Application, status: ApplicationStatus) {
    setBusyId(app.id);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/applications/${app.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        alert(json.error ?? "Update failed");
      } else {
        await load();
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Applications</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Review submitted cases. Approving generates a portal token and case slug.
      </p>

      {loading && <p className="mt-6 text-sm text-ink-soft">Loading…</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {!loading && apps.length === 0 && !error && (
        <p className="mt-6 text-sm text-ink-soft">No applications yet.</p>
      )}

      <ul className="mt-6 space-y-3">
        {apps.map((app) => {
          const isOpen = expandedId === app.id;
          return (
            <li
              key={app.id}
              className="rounded-xl border border-ink/8 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {app.dogName}{" "}
                    <span className="text-sm font-normal text-ink-soft">
                      · {app.contactName}
                    </span>
                  </p>
                  <p className="text-xs text-ink-soft">
                    {new Date(app.submittedAt).toLocaleString()} · {app.urgency}
                    {app.estimateUsd ? ` · est. $${app.estimateUsd}` : ""}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[app.status]}`}
                >
                  {STATUS_LABEL[app.status]}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setExpandedId(isOpen ? null : app.id)}
                  className="rounded-md border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  {isOpen ? "Hide details" : "View details"}
                </button>
                {(["reviewing", "approved", "declined"] as ApplicationStatus[]).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(app, s)}
                      disabled={busyId === app.id || app.status === s}
                      className="rounded-md bg-forest px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                    >
                      Mark {STATUS_LABEL[s]}
                    </button>
                  ),
                )}
              </div>

              {isOpen && (
                <div className="mt-4 grid gap-4 border-t border-ink/8 pt-4 text-sm text-ink md:grid-cols-2">
                  <Detail label="Email" value={app.contactEmail} />
                  <Detail label="Phone" value={app.contactPhone} />
                  <Detail label="ZIP" value={app.contactZip} />
                  <Detail
                    label="Dog"
                    value={[app.dogBreed, app.dogAge].filter(Boolean).join(" · ")}
                  />
                  <Detail label="Hospital" value={app.hospitalName} />
                  <Detail label="Vet contact" value={app.vetContact} />
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                      Situation
                    </p>
                    <p className="mt-1 whitespace-pre-wrap">{app.situation}</p>
                  </div>
                  <Detail
                    label="Content rights"
                    value={app.agreedContentRights ? "Granted" : "Not granted"}
                  />
                  {app.attachments.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                        Attachments
                      </p>
                      <ul className="mt-1 space-y-1">
                        {app.attachments.map((a) => (
                          <li key={a.url}>
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-forest underline"
                            >
                              {a.filename || a.url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {app.portalToken && (
                    <Detail
                      label="Portal link"
                      value={
                        app.caseSlug
                          ? `/portal/${app.caseSlug}?token=${app.portalToken}`
                          : app.portalToken
                      }
                    />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </p>
      <p className="mt-1 wrap-break-word">{value || <span className="text-ink-soft">—</span>}</p>
    </div>
  );
}
