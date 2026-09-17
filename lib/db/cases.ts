import "server-only";

import { adminDb } from "./firebase-admin";
import { reviewCases } from "@/data/review-cases";
import type { DogCase } from "@/types/site";

const COLLECTION = "cases";

export async function getCases(): Promise<DogCase[]> {
  const snapshot = await adminDb.collection(COLLECTION).get();
  const merged = new Map<string, DogCase>();

  for (const entry of reviewCases) {
    merged.set(entry.slug, entry);
  }

  for (const doc of snapshot.docs) {
    merged.set(doc.id, { slug: doc.id, ...doc.data() } as DogCase);
  }

  return Array.from(merged.values());
}

export async function getCase(slug: string): Promise<DogCase | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) {
    return reviewCases.find((entry) => entry.slug === slug) ?? null;
  }
  return { slug: doc.id, ...doc.data() } as DogCase;
}

export async function createCase(
  slug: string,
  data: Omit<DogCase, "slug">,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).set(data);
}

export async function updateCase(
  slug: string,
  data: Partial<Omit<DogCase, "slug">>,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).update(data);
}

export async function deleteCase(slug: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).delete();
}
