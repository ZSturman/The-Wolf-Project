"use client";

import { useState, useEffect, use, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { FormField, inputClass, textareaClass } from "@/components/admin/form-field";
import { SaveButton } from "@/components/admin/save-button";
import { ImageUpload } from "@/components/admin/image-upload";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { BlogCategory } from "@/types/site";

const CATEGORY_OPTIONS: BlogCategory[] = [
  "emergency-care",
  "emergency-signs",
  "vet-talk",
  "preventative-care",
  "vet-resources",
  "community-updates",
  "case-updates",
];

export default function EditPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = use(props.params);
  const { getIdToken } = useAuth();
  const [saving, setSaving] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [loaded, setLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<BlogCategory>("community-updates");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [featured, setFeatured] = useState(false);
  const [body, setBody] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) return;
      const data = await res.json();
      setTitle(data.title ?? "");
      setExcerpt(data.excerpt ?? "");
      setCategory(data.category ?? "community-updates");
      setFeaturedImage(data.featuredImage ?? null);
      setAuthor(data.author ?? "");
      setPublishedAt(data.publishedAt?.slice(0, 10) ?? "");
      setFeatured(data.featured ?? false);
      setBody(data.body ?? "");
      setLoaded(true);
    }
    load();
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving("saving");
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          excerpt,
          category,
          featuredImage,
          author,
          publishedAt: publishedAt || null,
          featured,
          body,
        }),
      });
      if (!res.ok) throw new Error();
      setSaving("success");
      setTimeout(() => setSaving("idle"), 2000);
    } catch {
      setSaving("error");
    }
  }

  if (!loaded) {
    return <p className="text-sm text-ink-soft">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Edit: {title}</h1>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft">
          {slug}
        </span>
      </div>

      <FormField label="Title" htmlFor="title">
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass()} />
      </FormField>

      <FormField label="Excerpt" htmlFor="excerpt">
        <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={textareaClass()} rows={2} />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category" htmlFor="category">
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value as BlogCategory)} className={inputClass()}>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Author" htmlFor="author">
          <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass()} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Published Date" htmlFor="publishedAt">
          <input id="publishedAt" type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={inputClass()} />
        </FormField>
        <FormField label="Featured">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded" />
            Show as featured
          </label>
        </FormField>
      </div>

      <ImageUpload value={featuredImage} onChange={setFeaturedImage} label="Featured Image" />

      <FormField label="Body (Markdoc)">
        <MarkdownEditor value={body} onChange={setBody} />
      </FormField>

      <div className="flex justify-end pt-4">
        <SaveButton state={saving} type="submit" />
      </div>
    </form>
  );
}
