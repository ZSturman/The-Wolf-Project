"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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

export default function NewPostPage() {
  const { getIdToken } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState<"idle" | "saving" | "success" | "error">("idle");

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<BlogCategory>("community-updates");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [author, setAuthor] = useState("Wolf Pack Team");
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 10));
  const [featured, setFeatured] = useState(false);
  const [body, setBody] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving("saving");
    try {
      const token = await getIdToken();
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug,
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
      router.push("/admin/posts");
    } catch {
      setSaving("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-ink">New Blog Post</h1>

      <FormField label="Slug" htmlFor="slug">
        <input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          required
          placeholder="e.g. my-first-post"
          className={inputClass()}
        />
      </FormField>

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
