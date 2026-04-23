"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "super_admin" | "school_admin" | "teacher" | "student" | null;

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const IconHome = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a0 0 0 010 0v-7h-6v7a0 0 0 010 0H5a2 2 0 01-2-2z" />
  </svg>
);
const IconDashboard = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconBook = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
    <path d="M4 19.5A2.5 2.5 0 006.5 22H20v-5" />
  </svg>
);
const IconUser = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconTrophy = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" />
    <path d="M17 4h3v3a3 3 0 01-3 3M7 4H4v3a3 3 0 003 3" />
  </svg>
);
const IconSettings = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconClasses = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const IconSearch = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconChevron = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconMenu = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

function studentLinks(): NavItem[] {
  return [
    { href: "/", label: "Ana Sayfa", icon: IconHome },
    { href: "/ogrenci", label: "Panelim", icon: IconDashboard },
    { href: "/bolumler", label: "Bölümlerim", icon: IconBook },
    { href: "/ogrenci/profil", label: "Profil", icon: IconUser },
    { href: "/ogrenci/basarilar", label: "Başarılar", icon: IconTrophy },
    { href: "/ogrenci/ayarlar", label: "Ayarlar", icon: IconSettings },
  ];
}

function teacherLinks(): NavItem[] {
  return [
    { href: "/", label: "Ana Sayfa", icon: IconHome },
    { href: "/ogretmen", label: "Panelim", icon: IconDashboard },
    { href: "/ogretmen/siniflar", label: "Sınıflarım", icon: IconClasses },
    { href: "/bolumler", label: "Bölümler", icon: IconBook },
    { href: "/ogretmen/kilavuz", label: "Kılavuzlar", icon: IconUser },
    { href: "/ogretmen/kaynaklar", label: "Kaynaklar", icon: IconBook },
  ];
}

function schoolAdminLinks(): NavItem[] {
  return [
    { href: "/", label: "Ana Sayfa", icon: IconHome },
    { href: "/okul", label: "Okul Paneli", icon: IconDashboard },
    { href: "/ogretmen/siniflar", label: "Sınıflar", icon: IconClasses },
    { href: "/bolumler", label: "Bölümler", icon: IconBook },
  ];
}

function superAdminLinks(): NavItem[] {
  return [
    { href: "/", label: "Ana Sayfa", icon: IconHome },
    { href: "/admin/okullar", label: "Okullar", icon: IconClasses },
    { href: "/ogretmen/siniflar", label: "Sınıflar", icon: IconClasses },
    { href: "/okul", label: "Okul Paneli", icon: IconDashboard },
    { href: "/bolumler", label: "Bölümler", icon: IconBook },
  ];
}

function linksForRole(role: Exclude<Role, null>): NavItem[] {
  if (role === "student") return studentLinks();
  if (role === "teacher") return teacherLinks();
  if (role === "school_admin") return schoolAdminLinks();
  return superAdminLinks();
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<Role | "loading">("loading");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/auth/role")
      .then((r) => (r.ok ? r.json() : { role: null }))
      .then((data: { role: Role }) => setRole(data.role))
      .catch(() => setRole(null));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (role === "loading" || role === null) return null;

  const navItems = linksForRole(role);

  const content = (
    <div className="flex flex-col gap-5 p-4">
      {/* Marka */}
      <Link href="/" className="flex items-center gap-2 px-2 py-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md">
          <span className="text-lg">🤖</span>
        </span>
        <span className="text-lg font-extrabold tracking-tight text-foreground">
          <span>Genç</span>
          <span className="text-violet-600">YZ</span>
        </span>
      </Link>

      {/* Arama */}
      <label className="flex items-center gap-2 rounded-xl bg-[var(--color-bg-secondary)] px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-violet-400">
        <span className="text-muted-foreground">{IconSearch}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ara..."
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-[13px]"
        />
      </label>

      {/* Navigasyon */}
      <nav className="space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");
          const hasChildren = item.label === "Profil";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-violet-50 text-violet-700 font-semibold ring-1 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900"
                  : "text-muted-foreground hover:bg-[var(--color-bg-secondary)] hover:text-foreground"
              }`}
            >
              <span className={isActive ? "text-violet-600 dark:text-violet-400" : ""}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {hasChildren && IconChevron}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobil tetikleyici */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed left-3 top-[4.25rem] z-30 flex items-center gap-1.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] px-3 py-1.5 text-sm font-semibold shadow-sm"
        aria-label="Paneli aç"
      >
        {IconMenu}
        Menü
      </button>

      {/* Mobil off-canvas */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-[var(--color-bg)] border-r border-[var(--color-border)] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <span className="text-sm font-bold">Menü</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-[var(--color-bg-secondary)]"
                aria-label="Menüyü kapat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}

      {/* Desktop sabit */}
      <aside className="hidden lg:block w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="sticky top-14">{content}</div>
      </aside>
    </>
  );
}
