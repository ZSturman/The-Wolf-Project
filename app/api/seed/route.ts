import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth/verify-token";
import { seedAll } from "@/lib/db/seed";

export async function POST(request: Request) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await seedAll();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
