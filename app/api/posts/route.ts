import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/db/posts";
import { verifyAuthToken } from "@/lib/auth/verify-token";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, ...data } = body;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }
  await createPost(slug, data);
  return NextResponse.json({ ok: true }, { status: 201 });
}
