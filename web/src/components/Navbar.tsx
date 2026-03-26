"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [bolumMenuAcik, setBolumMenuAcik] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { dark, toggle } = useTheme();

  // Dropdown dışına tıklayınca kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBolumMenuAcik(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="text-xl">🤖</span>
          <span className="hidden sm:inline">Yapay Zeka Macerası</span>
          <span className="sm:hidden">YZ Macerası</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 text-sm font-medium md:flex">
          {/* Bölümler Dropdown */}
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
                {bolumler.map((b) => (
                  <Link
                    key={b.no}
                    href={`/bolumler/${b.no}`}
                    onClick={() => setBolumMenuAcik(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-[var(--color-bg-secondary)]"
                  >
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${b.renk}`}>
                      {b.no}
                    </span>
                    <span className="text-sm">{b.baslik}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-sky-600">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-sm transition hover:bg-[var(--color-bg-secondary)]"
            aria-label={dark ? "Açık moda geç" : "Koyu moda geç"}
          >
            {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
          <a
            href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--color-border)] px-4 py-1.5 transition hover:bg-[var(--color-bg-secondary)]"
          >
            GitHub
          </a>
        </div>

        {/* Mobil menü butonu */}
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

      {/* Mobil menü */}
      {menuAcik && (
        <div className="border-t border-[var(--color-border)] px-6 py-4 md:hidden max-h-[70vh] overflow-y-auto">
          <div className="mb-3 text-xs font-bold text-[var(--color-text-secondary)]">Bölümler</div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {bolumler.map((b) => (
              <Link
                key={b.no}
                href={`/bolumler/${b.no}`}
                onClick={() => setMenuAcik(false)}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium transition hover:bg-[var(--color-bg-secondary)]"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white ${b.renk}`}>
                  {b.no}
                </span>
                <span className="truncate">{b.baslik}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-[var(--color-border)] pt-3 space-y-3 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuAcik(false)} className="block transition hover:text-sky-600">
                {link.label}
              </Link>
            ))}
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar" target="_blank" rel="noopener noreferrer" className="block transition hover:text-sky-600">
              GitHub
            </a>
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
