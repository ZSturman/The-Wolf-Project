import { NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "@/lib/db/posts";
import { verifyAuthToken } from "@/lib/auth/verify-token";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  const entry = await getPost(slug);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function PUT(request: Request, context: Context) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await context.params;
  const body = await request.json();
  await updatePost(slug, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, context: Context) {
  const auth = await verifyAuthToken(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await context.params;
  await deletePost(slug);
  return NextResponse.json({ ok: true });
}
