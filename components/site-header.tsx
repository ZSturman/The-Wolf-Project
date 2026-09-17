"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, supportOptions } from "@/data/site-content";
import type { NavItem } from "@/types/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./button-link";

const donateHref = supportOptions[0].href;

function isItemActive(pathname: string, item: NavItem): boolean {
  if (pathname === item.href) return true;
  if (item.href !== "/" && pathname.startsWith(item.href + "/")) return true;
  if (item.children) {
    return item.children.some((child) => isItemActive(pathname, child));
  }
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    function onClick(event: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/6 bg-cream/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garnet focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-ink/8 bg-white">
            <Image
              src="/assets/brand/ydcs-logo.png"
              alt="The Wolf Project / Your Dog Can Stay logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
              The Wolf Project
            </p>
            <p className="text-lg font-bold text-ink sm:text-xl">
              Your Dog Can Stay
            </p>
          </div>
        </Link>

        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isItemActive(pathname, item);
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenu === item.label;

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenMenu(null)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-white/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garnet focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active && "bg-white text-ink shadow-[0_12px_24px_rgba(15,20,18,0.06)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-white/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garnet focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active && "bg-white text-ink shadow-[0_12px_24px_rgba(15,20,18,0.06)]",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-xs transition-transform",
                      isOpen && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
                </button>

                {isOpen ? (
                  <div
                    role="menu"
                    className="absolute left-1/2 top-full z-50 mt-2 w-[min(38rem,90vw)] -translate-x-1/2 rounded-3xl border border-ink/8 bg-white/95 p-4 shadow-[0_28px_60px_rgba(15,20,18,0.12)] backdrop-blur-xl"
                  >
                    <div className="grid gap-1 sm:grid-cols-2">
                      {item.children!.map((child) => {
                        const childActive = isItemActive(pathname, child);
                        return (
                          <Link
                            key={child.href}
                            role="menuitem"
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                            className={cn(
                              "group rounded-2xl px-4 py-3 transition hover:bg-blush focus-visible:outline-none focus-visible:bg-blush focus-visible:ring-2 focus-visible:ring-garnet",
                              childActive && "bg-blush",
                            )}
                          >
                            <div className="text-sm font-semibold text-ink group-hover:text-garnet-deep">
                              {child.label}
                            </div>
                            {child.description ? (
                              <div className="mt-1 text-xs leading-snug text-ink-soft">
                                {child.description}
                              </div>
                            ) : null}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href={donateHref} external variant="donate">
            Donate Now
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/75 text-ink lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/6 bg-cream/95 px-5 py-5 shadow-[0_20px_40px_rgba(17,22,20,0.08)] lg:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const active = isItemActive(pathname, item);
              const hasChildren = item.children && item.children.length > 0;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-3xl px-4 py-3 text-base font-medium text-ink-soft transition hover:bg-white/70 hover:text-ink",
                      active && "bg-white text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              const expanded = mobileExpanded === item.label;
              return (
                <div key={item.label} className="rounded-3xl bg-white/55">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(expanded ? null : item.label)
                    }
                    aria-expanded={expanded}
                    className={cn(
                      "flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-base font-medium text-ink-soft transition hover:text-ink",
                      active && "text-ink",
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-xs transition-transform",
                        expanded && "rotate-180",
                      )}
                    >
                      ▾
                    </span>
                  </button>
                  {expanded ? (
                    <div className="flex flex-col gap-1 px-3 pb-3">
                      {item.children!.map((child) => {
                        const childActive = isItemActive(pathname, child);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "rounded-2xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-blush hover:text-ink",
                              childActive && "bg-blush text-ink",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <ButtonLink
            href={donateHref}
            external
            variant="donate"
            className="mt-5 w-full"
          >
            Donate Now
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
