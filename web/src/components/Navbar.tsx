"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type UserRole = "super_admin" | "school_admin" | "teacher" | "student" | null;

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // System preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return { dark, toggle };
}

const navLinks = [
  { href: "/bolumler", label: "Bölümler" },
  { href: "/ozellikler", label: "Özellikler" },
  { href: "/ogretmen", label: "Öğretmen" },
  { href: "/hakkinda", label: "Hakkında" },
];

const roleLabels: Record<string, string> = {
  super_admin: "Sistem Yoneticisi",
  school_admin: "Okul Yoneticisi",
  teacher: "Ogretmen",
  student: "Ogrenci",
};

const rolePanelLinks: Record<string, { href: string; label: string }> = {
  super_admin: { href: "/admin/okullar", label: "Admin Paneli" },
  school_admin: { href: "/okul", label: "Okul Paneli" },
  teacher: { href: "/ogretmen/siniflar", label: "Ogretmen Paneli" },
  student: { href: "/ogrenci", label: "Ogrenci Paneli" },
};

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userMenuAcik, setUserMenuAcik] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { dark, toggle } = useTheme();

  // Session ve rol kontrolu
  useEffect(() => {
    const supabase = createClient();

    async function checkSession(userId: string) {
      setIsLoggedIn(true);
      const { data: roleData } = await supabase
        .from("school_users")
        .select("role")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle();
      setUserRole((roleData?.role as UserRole) ?? "student");
    }

    // Ilk yuklemede session kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkSession(session.user.id);
      }
    });

    // Auth degisikliklerini dinle (giris/cikis)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkSession(session.user.id);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Dropdown disina tiklayinca kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuAcik(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setUserRole(null);
    setUserMenuAcik(false);
    router.push("/");
    router.refresh();
  };

  const panelLink = userRole ? rolePanelLinks[userRole] : null;

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="text-xl">🤖</span>
          <span className="hidden sm:inline">GençYZ</span>
          <span className="sm:hidden">GençYZ</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-sky-600">
              {link.label}
            </Link>
          ))}

          {/* Giris yapmamis → Ogrenci + Ogretmen giris linkleri */}
          {!isLoggedIn && (
            <>
              <Link
                href="/kolay-giris"
                className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-white transition hover:bg-emerald-700"
              >
                Öğrenci Girişi
              </Link>
              <Link
                href="/giris"
                className="rounded-lg border border-sky-600 px-3.5 py-1.5 text-sky-600 transition hover:bg-sky-50"
              >
                Öğretmen Girişi
              </Link>
            </>
          )}

          {/* Giris yapmis → Kullanici menusu */}
          {isLoggedIn && (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuAcik(!userMenuAcik)}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-1.5 transition hover:bg-[var(--color-bg-secondary)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
                  {userRole === "super_admin" ? "SA" : userRole === "school_admin" ? "OY" : userRole === "teacher" ? "OG" : "OS"}
                </span>
                <span className="text-xs">
                  {userRole ? roleLabels[userRole] : "..."}
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform ${userMenuAcik ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {userMenuAcik && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-xl">
                  <div className="px-3 py-2 text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)] mb-1">
                    {userRole ? roleLabels[userRole] : "Kullanici"}
                  </div>
                  {panelLink && (
                    <Link
                      href={panelLink.href}
                      onClick={() => setUserMenuAcik(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-[var(--color-bg-secondary)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      {panelLink.label}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Cikis Yap
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-sm transition hover:bg-[var(--color-bg-secondary)]"
            aria-label={dark ? "Açık moda geç" : "Koyu moda geç"}
          >
            {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
        </div>

        {/* Mobil menu butonu */}
        <button
          type="button"
          onClick={() => setMenuAcik(!menuAcik)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] md:hidden"
          aria-label="Menü"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuAcik ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobil menu */}
      {menuAcik && (
        <div className="border-t border-[var(--color-border)] px-6 py-4 md:hidden max-h-[70vh] overflow-y-auto">
          {/* Giris durumu */}
          {isLoggedIn && (
            <div className="mb-3 flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
                  {userRole === "super_admin" ? "SA" : userRole === "school_admin" ? "OY" : userRole === "teacher" ? "OG" : "OS"}
                </span>
                <span className="text-sm font-medium">
                  {userRole ? roleLabels[userRole] : "..."}
                </span>
              </div>
              {panelLink && (
                <Link
                  href={panelLink.href}
                  onClick={() => setMenuAcik(false)}
                  className="text-xs font-medium text-sky-600 hover:text-sky-700"
                >
                  {panelLink.label} →
                </Link>
              )}
            </div>
          )}

          <div className="space-y-3 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuAcik(false)} className="block transition hover:text-sky-600">
                {link.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <Link
                  href="/kolay-giris"
                  onClick={() => setMenuAcik(false)}
                  className="block text-emerald-600 font-semibold"
                >
                  Öğrenci Girişi
                </Link>
                <Link
                  href="/giris"
                  onClick={() => setMenuAcik(false)}
                  className="block text-sky-600"
                >
                  Öğretmen Girişi
                </Link>
              </>
            )}

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Cikis Yap
              </button>
            )}

            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-2 transition hover:text-sky-600"
            >
              {dark ? "\u2600\uFE0F Açık Mod" : "\uD83C\uDF19 Koyu Mod"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
