import { NextResponse } from "next/server";

/**
 * Server-side proxy for email subscriptions.
 *
 * Supports Kit (ConvertKit) when KIT_API_KEY and KIT_FORM_ID env vars are set.
 * Returns a graceful fallback when credentials are not configured so the form
 * doesn't break during development.
 */
export async function POST(request: Request) {
  const { email, interest } = (await request.json()) as {
    email?: string;
    interest?: string;
  };

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 },
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const safeInterest =
    typeof interest === "string" && interest.length <= 64
      ? interest.replace(/[^a-z0-9_-]/gi, "")
      : "";

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    // Not configured yet — log and return success so users aren't blocked
    console.log(
      `[subscribe] Email collected (Kit not configured): ${email}${safeInterest ? ` interest=${safeInterest}` : ""}`,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          ...(safeInterest ? { tags: [safeInterest] } : {}),
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("[subscribe] Kit API error:", res.status, body);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Network error:", err);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 502 },
    );
  }
}
