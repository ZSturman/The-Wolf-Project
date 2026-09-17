const DEFAULT_SITE_URL = "https://yourdogcanstay.com";

function normalizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
}

export function getSiteUrlAsUrl(): URL {
  return new URL(getSiteUrl());
}