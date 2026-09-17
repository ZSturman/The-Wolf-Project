"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const { getIdToken } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {label}
        </p>
      )}
      {value && (
        <div className="relative w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded"
            className="h-32 w-48 rounded-lg border border-ink/10 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1.5 py-0.5 text-xs text-white shadow"
          >
            ✕
          </button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-ink/5 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : value ? "Replace Image" : "Upload Image"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {!value && (
          <input
            type="text"
            placeholder="Or paste URL"
            className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm text-ink outline-none focus:border-forest"
            onBlur={(e) => {
              if (e.target.value.trim()) {
                onChange(e.target.value.trim());
                e.target.value = "";
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                  onChange(target.value.trim());
                  target.value = "";
                }
              }
            }}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
