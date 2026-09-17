"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, AuthProvider } from "@/lib/auth/auth-context";
import { cn } from "@/lib/cn";
import { useEffect } from "react";
import type { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Cases", href: "/admin/cases" },
  { label: "Blog Posts", href: "/admin/posts" },
  { label: "Site Settings", href: "/admin/settings" },
];

function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const needsRedirect = !loading && !user && pathname !== "/admin/login";

  useEffect(() => {
    if (needsRedirect) {
      router.push("/admin/login");
    }
  }, [needsRedirect, router]);

  if (loading || needsRedirect) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-ink-soft">Loading…</p>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-ink/8 bg-white">
        <div className="border-b border-ink/8 px-5 py-4">
          <Link href="/" className="text-sm font-bold text-ink">
            ← Back to site
          </Link>
          <p className="mt-0.5 text-xs text-ink-soft">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-forest/10 font-semibold text-forest"
                  : "text-ink-soft hover:bg-ink/5 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-ink/8 px-5 py-3">
          <p className="truncate text-xs text-ink-soft">{user?.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-1 text-xs font-medium text-red-600 hover:text-red-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
