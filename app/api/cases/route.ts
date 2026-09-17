import { NextResponse } from "next/server";
import { getCases, createCase } from "@/lib/db/cases";
import { verifyAuthToken } from "@/lib/auth/verify-token";

export async function GET() {
  const cases = await getCases();
  return NextResponse.json(cases);
}

export async function POST(request: Request) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, ...data } = body;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }
  await createCase(slug, data);
  return NextResponse.json({ ok: true }, { status: 201 });
}
