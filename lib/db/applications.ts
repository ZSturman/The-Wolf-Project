import "server-only";

import { adminDb } from "./firebase-admin";
import type {
  Application,
  ApplicationStatus,
  FamilyUpdate,
} from "@/types/site";

const COLLECTION = "applications";

export async function listApplications(): Promise<Application[]> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("submittedAt", "desc")
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Application,
  );
}

export async function getApplication(id: string): Promise<Application | null> {
  const doc = await adminDb.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Application;
}

export async function getApplicationByCaseSlug(
  caseSlug: string,
): Promise<Application | null> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where("caseSlug", "==", caseSlug)
    .limit(1)
    .get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Application;
}

export async function createApplication(
  data: Omit<Application, "id">,
): Promise<string> {
  const ref = await adminDb.collection(COLLECTION).add(data);
  return ref.id;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  patch: Partial<Application> = {},
): Promise<void> {
  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .update({
      ...patch,
      status,
      updatedAt: new Date().toISOString(),
    });
}

export async function appendFamilyUpdate(
  id: string,
  update: FamilyUpdate,
): Promise<void> {
  const existing = await getApplication(id);
  const updates = [...(existing?.familyUpdates ?? []), update];
  await adminDb
    .collection(COLLECTION)
    .doc(id)
    .update({
      familyUpdates: updates,
      updatedAt: new Date().toISOString(),
    });
}
