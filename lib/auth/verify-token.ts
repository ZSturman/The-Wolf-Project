import "server-only";

import { adminAuth } from "@/lib/db/firebase-admin";

export async function verifyAuthToken(
  request: Request,
): Promise<{ uid: string } | null> {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return null;
  }
}
