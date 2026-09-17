import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getCategoryLabel, type BlogPostEntry } from "@/lib/get-blog-posts";

type BlogCardProps = BlogPostEntry & {
  className?: string;
};

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  featuredImage,
  publishedAt,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "panel group overflow-hidden transition hover:shadow-lg",
        className,
      )}
    >
      {featuredImage ? (
        <div className="relative aspect-video bg-sand">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-sand">
          <span className="text-3xl text-ink-soft/30">✦</span>
        </div>
      )}
      <div className="p-6">
        <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {getCategoryLabel(category)}
        </span>
        <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-ink-soft transition">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{excerpt}</p>
        {publishedAt && (
          <p className="mt-3 text-xs text-ink-soft/70">{publishedAt}</p>
        )}
      </div>
    </Link>
  );
}
