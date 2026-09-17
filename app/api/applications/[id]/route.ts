import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth/verify-token";
import { randomBytes } from "node:crypto";
import {
  getApplication,
  updateApplicationStatus,
} from "@/lib/db/applications";
import type { ApplicationStatus } from "@/types/site";

export const runtime = "nodejs";

const VALID_STATUSES: ApplicationStatus[] = [
  "submitted",
  "reviewing",
  "approved",
  "declined",
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const auth = await verifyAuthToken(_request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const app = await getApplication(id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(app);
}

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const status = b.status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as ApplicationStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const existing = await getApplication(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const patch: Record<string, unknown> = {};
  if (typeof b.adminNotes === "string") patch.adminNotes = b.adminNotes.slice(0, 8000);

  // On approval, generate a portal token + slug if not already set.
  if (status === "approved" && !existing.portalToken) {
    patch.portalToken = randomBytes(24).toString("hex");
    if (!existing.caseSlug) {
      patch.caseSlug = `${slugify(existing.dogName)}-${randomBytes(3).toString("hex")}`;
    }
  }

  await updateApplicationStatus(id, status as ApplicationStatus, patch);
  return NextResponse.json({ ok: true });
}
