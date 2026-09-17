import "server-only";

import { adminDb } from "./firebase-admin";
import type { BlogPost } from "@/types/site";

const COLLECTION = "posts";

export interface PostDocument extends Omit<BlogPost, "slug"> {
  body: string;
}

export interface PostWithBody extends BlogPost {
  body: string;
}

export async function getPosts(): Promise<PostWithBody[]> {
  const snapshot = await adminDb.collection(COLLECTION).get();
  return snapshot.docs.map(
    (doc) => ({ slug: doc.id, ...doc.data() }) as PostWithBody,
  );
}

export async function getPost(slug: string): Promise<PostWithBody | null> {
  const doc = await adminDb.collection(COLLECTION).doc(slug).get();
  if (!doc.exists) return null;
  return { slug: doc.id, ...doc.data() } as PostWithBody;
}

export async function createPost(
  slug: string,
  data: PostDocument,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).set(data);
}

export async function updatePost(
  slug: string,
  data: Partial<PostDocument>,
): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).update(data);
}

export async function deletePost(slug: string): Promise<void> {
  await adminDb.collection(COLLECTION).doc(slug).delete();
}
