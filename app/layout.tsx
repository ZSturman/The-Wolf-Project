import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import { DemoBanner } from "@/components/demo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrlAsUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrlAsUrl(),
  title: {
    default: "The Wolf Project | Your Dog Can Stay",
    template: "%s | The Wolf Project",
  },
  description:
    "The Wolf Project helps families access emergency veterinary care so dogs can stay in the homes where they belong.",
  openGraph: {
    title: "The Wolf Project | Your Dog Can Stay",
    description:
      "When treatment exists but access to care doesn't, The Wolf Project exists to help families keep dogs where they belong - at home.",
    images: [
      {
        url: "/assets/brand/ydcs-logo.png",
        width: 1200,
        height: 1200,
        alt: "The Wolf Project / Your Dog Can Stay logo mark",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <DemoBanner />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
