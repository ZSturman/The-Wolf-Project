import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth/verify-token";
import {
  createApplication,
  listApplications,
} from "@/lib/db/applications";
import type {
  Application,
  ApplicationAttachment,
} from "@/types/site";

export const runtime = "nodejs";

const MAX_STRING = 4000;

function s(value: unknown, max = MAX_STRING): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max).trim();
}

function isUrgency(value: unknown): value is Application["urgency"] {
  return (
    value === "immediate" ||
    value === "within-24h" ||
    value === "within-week" ||
    value === "uncertain"
  );
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

export async function POST(request: Request) {
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

  // Honeypot — silently accept and discard if filled.
  if (s(b.website)) {
    return NextResponse.json({ ok: true });
  }

  const application: Omit<Application, "id"> = {
    status: "submitted",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contactName: s(b.contactName, 200),
    contactEmail: s(b.contactEmail, 320),
    contactPhone: s(b.contactPhone, 40),
    contactZip: s(b.contactZip, 20),
    dogName: s(b.dogName, 120),
    dogBreed: s(b.dogBreed, 200),
    dogAge: s(b.dogAge, 40),
    situation: s(b.situation, 8000),
    urgency: isUrgency(b.urgency) ? b.urgency : "uncertain",
    hospitalName: s(b.hospitalName, 200),
    vetContact: s(b.vetContact, 200),
    estimateUsd: s(b.estimateUsd, 40),
    attachments: sanitizeAttachments(b.attachments),
    agreedTransparency: b.agreedTransparency === true,
    agreedContentRights: b.agreedContentRights === true,
  };

  // Required-field validation.
  const missing: string[] = [];
  if (!application.contactName) missing.push("contactName");
  if (!application.contactEmail || !/^.+@.+\..+$/.test(application.contactEmail))
    missing.push("contactEmail");
  if (!application.dogName) missing.push("dogName");
  if (!application.situation) missing.push("situation");
  if (!application.agreedTransparency) missing.push("agreedTransparency");
  if (missing.length) {
    return NextResponse.json(
      { error: "Missing required fields", missing },
      { status: 400 },
    );
  }

  try {
    const id = await createApplication(application);
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Application submit failed:", error);
    return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const apps = await listApplications();
  return NextResponse.json(apps);
}
