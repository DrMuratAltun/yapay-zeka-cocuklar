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

const bolumler = [
  { no: 1, baslik: "Yapay Zeka Nedir?", renk: "bg-sky-500" },
  { no: 2, baslik: "Günlük Hayatta YZ", renk: "bg-emerald-500" },
  { no: 3, baslik: "Verinin Gücü", renk: "bg-violet-500" },
  { no: 4, baslik: "Makineler Nasıl Öğrenir?", renk: "bg-orange-500" },
  { no: 5, baslik: "Üretken Yapay Zeka", renk: "bg-pink-500" },
  { no: 6, baslik: "Blok Tabanlı YZ Kodlama", renk: "bg-blue-600" },
  { no: 7, baslik: "Gerçek Hayat Problemleri", renk: "bg-teal-500" },
  { no: 8, baslik: "Dijital İçerik Üretimi", renk: "bg-rose-500" },
  { no: 9, baslik: "YZ ve Etik", renk: "bg-amber-600" },
  { no: 10, baslik: "Gelecek Seninle Başlar", renk: "bg-indigo-600" },
];

const navLinks = [
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#araclar", label: "Araçlar" },
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
  teacher: { href: "/okul", label: "Ogretmen Paneli" },
  student: { href: "/ogrenci", label: "Ogrenci Paneli" },
};

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [bolumMenuAcik, setBolumMenuAcik] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userMenuAcik, setUserMenuAcik] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { dark, toggle } = useTheme();

  // Session ve rol kontrolu
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setIsLoggedIn(true);
        // Rol bilgisini al
        const { data: roleData } = await supabase
          .from("school_users")
          .select("role")
          .eq("user_id", data.user.id)
          .limit(1)
          .maybeSingle();
        setUserRole((roleData?.role as UserRole) ?? "student");
      }
    });
  }, []);

  // Dropdown disina tiklayinca kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBolumMenuAcik(false);
      }
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
          {/* Bolumler Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setBolumMenuAcik(!bolumMenuAcik)}
              className="flex items-center gap-1 transition hover:text-sky-600 cursor-pointer"
            >
              Bölümler
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform ${bolumMenuAcik ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {bolumMenuAcik && (
              <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-xl">
                <div className="mb-2 px-3 py-1.5 text-xs font-bold text-[var(--color-text-secondary)]">
                  10 Bölüm
                </div>
                {bolumler.map((b) => {
                  const locked = b.no > 1 && !isLoggedIn;
                  return (
                    <Link
                      key={b.no}
                      href={`/bolumler/${b.no}`}
                      onClick={() => setBolumMenuAcik(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-[var(--color-bg-secondary)]"
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${b.renk}`}>
                        {b.no}
                      </span>
                      <span className="flex-1 text-sm">{b.baslik}</span>
                      {b.no === 1 && (
                        <span className="text-[10px] font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          Ucretsiz
                        </span>
                      )}
                      {locked && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-sky-600">
              {link.label}
            </Link>
          ))}

          {/* Giris yapmamis → Giris Yap butonu */}
          {!isLoggedIn && (
            <Link
              href="/giris"
              className="rounded-lg bg-sky-600 px-4 py-1.5 text-white transition hover:bg-sky-700"
            >
              Giriş Yap
            </Link>
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

          <div className="mb-3 text-xs font-bold text-[var(--color-text-secondary)]">Bölümler</div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {bolumler.map((b) => {
              const locked = b.no > 1 && !isLoggedIn;
              return (
                <Link
                  key={b.no}
                  href={`/bolumler/${b.no}`}
                  onClick={() => setMenuAcik(false)}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium transition hover:bg-[var(--color-bg-secondary)]"
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white ${b.renk}`}>
                    {b.no}
                  </span>
                  <span className="flex-1 truncate">{b.baslik}</span>
                  {locked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-[var(--color-border)] pt-3 space-y-3 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuAcik(false)} className="block transition hover:text-sky-600">
                {link.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                href="/giris"
                onClick={() => setMenuAcik(false)}
                className="block text-sky-600 font-semibold"
              >
                Giriş Yap
              </Link>
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
