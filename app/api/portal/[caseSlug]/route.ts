import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  appendFamilyUpdate,
  getApplicationByCaseSlug,
} from "@/lib/db/applications";
import type { ApplicationAttachment, FamilyUpdate } from "@/types/site";

export const runtime = "nodejs";

function tokensMatch(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function s(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max).trim();
}

function sanitizeAttachments(value: unknown): ApplicationAttachment[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((a): a is Record<string, unknown> => typeof a === "object" && a !== null)
    .slice(0, 10)
    .map((a) => ({
      url: s(a.url, 2000),
      filename: s(a.filename, 256),
      contentType: s(a.contentType, 128),
    }))
    .filter((a) => a.url.startsWith("https://"));
}

export async function POST(
  request: Request,
  ctx: { params: Promise<{ caseSlug: string }> },
) {
  const { caseSlug } = await ctx.params;

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
  const token = s(b.token, 200);
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const app = await getApplicationByCaseSlug(caseSlug);
  if (!app || !app.portalToken || !tokensMatch(app.portalToken, token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (app.status !== "approved") {
    return NextResponse.json(
      { error: "Portal is not active for this case" },
      { status: 403 },
    );
  }

  const note = s(b.note, 8000);
  const attachments = sanitizeAttachments(b.attachments);
  if (!note && attachments.length === 0) {
    return NextResponse.json(
      { error: "Add a note or upload at least one file." },
      { status: 400 },
    );
  }

  const update: FamilyUpdate = {
    postedAt: new Date().toISOString(),
    note,
    attachments,
  };

  try {
    await appendFamilyUpdate(app.id, update);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Family update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
