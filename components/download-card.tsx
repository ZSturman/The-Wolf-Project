import Link from "next/link";
import { cn } from "@/lib/cn";

interface DownloadCardProps {
  title: string;
  description: string;
  href: string;
  filetype?: string;
  filesize?: string;
  external?: boolean;
  className?: string;
}

export function DownloadCard({
  title,
  description,
  href,
  filetype = "PDF",
  filesize,
  external,
  className,
}: DownloadCardProps) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      download={!external ? "" : undefined}
      className={cn(
        "panel group flex h-full flex-col p-6 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-garnet/20 bg-blush text-xs font-bold uppercase tracking-wider text-garnet-deep"
        >
          {filetype}
        </span>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-garnet-deep group-hover:underline">
        Download {filetype}
        {filesize ? ` · ${filesize}` : ""} →
      </p>
    </Link>
  );
}
