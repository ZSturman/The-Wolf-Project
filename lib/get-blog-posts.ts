import { getPosts } from "@/lib/db/posts";

export type BlogPostEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage: string | null;
  author: string | null;
  publishedAt: string | null;
  featured: boolean;
};

const categoryLabels: Record<string, string> = {
  "emergency-care": "Emergency Care",
  "emergency-signs": "Emergency Signs",
  "vet-talk": "Vet Talk",
  "preventative-care": "Preventative Care",
  "vet-resources": "Vet Resources",
  "community-updates": "Community Updates",
  "case-updates": "Case Updates",
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}

export async function getBlogPosts(): Promise<BlogPostEntry[]> {
  const allPosts = await getPosts();
  return allPosts
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category as string,
      featuredImage: post.featuredImage,
      author: post.author,
      publishedAt: post.publishedAt,
      featured: post.featured,
    }))
    .sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
    );
}

export async function getRecentPosts(count = 3): Promise<BlogPostEntry[]> {
  const all = await getBlogPosts();
  return all.slice(0, count);
}

export async function getPostsByCategory(
  category: string,
): Promise<BlogPostEntry[]> {
  const all = await getBlogPosts();
  return all.filter((p) => p.category === category);
}
