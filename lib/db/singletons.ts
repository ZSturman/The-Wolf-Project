import "server-only";

import { adminDb } from "./firebase-admin";

const COLLECTION = "singletons";

export async function getSingleton<T>(key: string): Promise<T | null> {
  const doc = await adminDb.collection(COLLECTION).doc(key).get();
  if (!doc.exists) return null;
  return doc.data() as T;
}

export async function setSingleton<T extends Record<string, unknown>>(
  key: string,
  data: T,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(key).set(data, { merge: true });
}
