import Link from "next/link";
import { notFound } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { getApplicationByCaseSlug } from "@/lib/db/applications";
import { FamilyUpdateForm } from "@/components/family-update-form";
import type { Application, ApplicationStatus } from "@/types/site";

export const dynamic = "force-dynamic";

const STATUS_COPY: Record<ApplicationStatus, { label: string; body: string }> = {
  submitted: {
    label: "Submitted",
    body: "We've received your application and our team is reviewing it.",
  },
  reviewing: {
    label: "Reviewing",
    body: "We're working with our veterinary partners to evaluate your case.",
  },
  approved: {
    label: "Approved",
    body: "Your case is active. Treatment is being coordinated and funded.",
  },
  declined: {
    label: "Declined",
    body: "We weren't able to take this case on. Please see your email for next-step resources.",
  },
};

function tokensMatch(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

interface PortalPageProps {
  params: Promise<{ caseSlug: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function FamilyPortalPage({
  params,
  searchParams,
}: PortalPageProps) {
  const { caseSlug } = await params;
  const { token } = await searchParams;

  if (!token) return notFound();

  let app: Application | null = null;
  try {
    app = await getApplicationByCaseSlug(caseSlug);
  } catch {
    app = null;
  }

  if (
    !app ||
    !app.portalToken ||
    !tokensMatch(app.portalToken, token) ||
    app.status === "declined"
  ) {
    return notFound();
  }

  const status = STATUS_COPY[app.status];
  const updates = app.familyUpdates ?? [];
  const adminAttachments = app.attachments ?? [];

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-garnet-deep">
          Family Portal · Private
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          {app.dogName}&apos;s case
        </h1>
        <p className="mt-2 text-ink-soft">
          Welcome, {app.contactName}. This page is private to your family and
          The Wolf Project team. Do not share the link.
        </p>

        <div className="mt-8 panel p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Status
          </p>
          <p className="mt-1 text-2xl font-semibold text-ink">{status.label}</p>
          <p className="mt-2 text-sm text-ink-soft">{status.body}</p>
          {app.adminNotes && (
            <div className="mt-4 rounded-lg border border-ink/10 bg-cream/60 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Note from our team
              </p>
              <p className="mt-1 whitespace-pre-wrap text-ink">{app.adminNotes}</p>
            </div>
          )}
        </div>

        {app.status === "approved" ? (
          <div className="mt-10">
            <FamilyUpdateForm
              caseSlug={caseSlug}
              token={token}
              existingUpdates={updates}
            />
          </div>
        ) : (
          <div className="mt-10 panel p-6">
            <h2 className="text-lg font-semibold text-ink">What happens next</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Once your case is approved, you&apos;ll be able to post updates and
              photos here. We&apos;ll reach out by email if we need anything from
              you in the meantime. Questions? Email{" "}
              <a
                href="mailto:help@thewolfproject.org"
                className="text-forest underline"
              >
                help@thewolfproject.org
              </a>
              .
            </p>
          </div>
        )}

        {adminAttachments.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-ink">
              Documents you submitted
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {adminAttachments.map((a) => (
                <li
                  key={a.url}
                  className="rounded-lg border border-ink/8 bg-white p-3"
                >
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
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/cases"
            className="text-sm font-semibold uppercase tracking-wider text-garnet-deep underline"
          >
            See other Wolf Project cases
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold uppercase tracking-wider text-ink-soft underline"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
