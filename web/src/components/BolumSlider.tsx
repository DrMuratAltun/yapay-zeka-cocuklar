"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

interface Slayt {
  baslik: string;
  icon: string;
  icerik: React.ReactNode;
}

interface BolumSliderProps {
  bolumNo: number;
  bolumBaslik: string;
  bolumAltBaslik: string;
  seviye: string;
  ders: number;
  renk: string;
  oncekiBolum: number | null;
  sonrakiBolum: number | null;
  slaytlar: Slayt[];
}

export default function BolumSlider({
  bolumNo,
  bolumBaslik,
  bolumAltBaslik,
  seviye,
  ders,
  renk,
  oncekiBolum,
  sonrakiBolum,
  slaytlar,
}: BolumSliderProps) {
  const [aktifSlayt, setAktifSlayt] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem(`bolum-${bolumNo}-slide`);
      return saved !== null ? Math.min(Number(saved), slaytlar.length - 1) : 0;
    } catch {
      return 0;
    }
  });
  const [sidebarAcik, setSidebarAcik] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set([0]);
    try {
      const saved = localStorage.getItem(`bolum-${bolumNo}-visited`);
      const parsed: number[] = saved ? JSON.parse(saved) : [];
      return new Set([...parsed, 0]);
    } catch {
      return new Set([0]);
    }
  });

  const git = useCallback((i: number) => {
    setAktifSlayt(i);
    setSidebarAcik(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onceki = useCallback(() => {
    setAktifSlayt((s) => { const n = Math.max(0, s - 1); return n; });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sonraki = useCallback(() => {
    setAktifSlayt((s) => Math.min(slaytlar.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slaytlar.length]);

  // Save current slide and visited slides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`bolum-${bolumNo}-slide`, String(aktifSlayt));
      setVisitedSlides((prev) => {
        const next = new Set(prev);
        next.add(aktifSlayt);
        localStorage.setItem(
          `bolum-${bolumNo}-visited`,
          JSON.stringify([...next])
        );
        return next;
      });
    } catch {
      // localStorage unavailable
    }
  }, [aktifSlayt, bolumNo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight" && aktifSlayt < slaytlar.length - 1) {
        setAktifSlayt((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" && aktifSlayt > 0) {
        setAktifSlayt((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aktifSlayt, slaytlar.length]);

  const tamamlanan = visitedSlides.size;

  const ilkSlayt = aktifSlayt === 0;
  const sonSlayt = aktifSlayt === slaytlar.length - 1;
  const ilerleme = ((aktifSlayt + 1) / slaytlar.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`bg-gradient-to-r ${renk} text-white`}>
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <Link href="/" className="mb-2 inline-block text-sm text-white/70 hover:text-white transition">
            &larr; Ana Sayfa
          </Link>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-white/70">
                BÖLÜM {bolumNo} &middot; {seviye} &middot; {ders} ders saati
              </p>
              <h1 className="text-xl font-extrabold sm:text-2xl">{bolumBaslik}</h1>
              <p className="text-sm text-white/70">{bolumAltBaslik}</p>
            </div>
          </div>
        </div>
      </header>

      {/* İlerleme çubuğu */}
      <div className="h-1 bg-[var(--color-border)]">
        <div
          className={`h-full bg-gradient-to-r ${renk} transition-all duration-300`}
          style={{ width: `${ilerleme}%` }}
        />
      </div>

      {/* Ana içerik: Sidebar + Content */}
      <div className="flex flex-1 relative">
        {/* Mobil sidebar toggle */}
        <button
          type="button"
          onClick={() => setSidebarAcik(!sidebarAcik)}
          className="lg:hidden fixed bottom-20 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg cursor-pointer"
          aria-label="Menüyü aç/kapat"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        </button>

        {/* Mobil overlay */}
        {sidebarAcik && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarAcik(false)}
          />
        )}

        {/* Sol Sidebar - Slayt Navigasyonu */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-64 bg-[var(--color-bg)] border-r border-[var(--color-border)] overflow-y-auto pt-4 pb-24 transition-transform duration-200
            lg:sticky lg:top-[53px] lg:z-auto lg:h-[calc(100vh-53px)] lg:w-56 lg:shrink-0 lg:translate-x-0 lg:pt-4
            ${sidebarAcik ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Mobil kapatma butonu */}
          <div className="lg:hidden flex justify-end px-3 mb-2">
            <button
              type="button"
              onClick={() => setSidebarAcik(false)}
              className="rounded-lg p-1.5 hover:bg-[var(--color-bg-secondary)] cursor-pointer"
            >
              ✕
            </button>
          </div>

          <nav className="px-2 space-y-0.5">
            {slaytlar.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => git(i)}
                className={`w-full flex items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition cursor-pointer ${
                  i === aktifSlayt
                    ? "bg-sky-50 text-sky-700 font-semibold dark:bg-sky-900/20 dark:text-sky-300 border-l-4 border-sky-500"
                    : i < aktifSlayt
                    ? "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                }`}
              >
                <span className={`shrink-0 mt-0.5 ${visitedSlides.has(i) && i !== aktifSlayt ? "text-green-500" : ""}`}>
                  {visitedSlides.has(i) && i !== aktifSlayt ? "✓" : s.icon}
                </span>
                <span className="leading-tight">{s.baslik}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar alt: İlerleme */}
          <div className="mt-6 mx-3 rounded-lg bg-[var(--color-bg-secondary)] p-3">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1.5">
              <span>İlerleme</span>
              <span className="font-bold">{aktifSlayt + 1}/{slaytlar.length}</span>
            </div>
            <p className="text-[10px] text-green-600 dark:text-green-400 mb-1.5">{tamamlanan}/{slaytlar.length} tamamlandı</p>
            <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${renk} rounded-full transition-all duration-300`}
                style={{ width: `${ilerleme}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Ana İçerik */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-3xl">
            {/* Slayt başlık */}
            <div className="mb-6">
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                {aktifSlayt + 1} / {slaytlar.length}
                <span className="ml-2 text-green-600 dark:text-green-400">({tamamlanan}/{slaytlar.length} tamamlandı)</span>
              </p>
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <span>{slaytlar[aktifSlayt].icon}</span>
                {slaytlar[aktifSlayt].baslik}
              </h2>
            </div>

            {/* Slayt içerik */}
            <div className="space-y-8">
              {slaytlar[aktifSlayt].icerik}
            </div>

            {/* Alt navigasyon */}
            <div className="mt-12 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
              {ilkSlayt ? (
                oncekiBolum ? (
                  <Link
                    href={`/bolumler/${oncekiBolum}`}
                    className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
                  >
                    &larr; Bölüm {oncekiBolum}
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
                  >
                    &larr; Ana Sayfa
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  onClick={onceki}
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] cursor-pointer"
                >
                  &larr; Önceki
                </button>
              )}

              {sonSlayt ? (
                sonrakiBolum ? (
                  <Link
                    href={`/bolumler/${sonrakiBolum}`}
                    className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90`}
                  >
                    Bölüm {sonrakiBolum} &rarr;
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90`}
                  >
                    Tamamla &#10003;
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  onClick={sonraki}
                  className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 cursor-pointer`}
                >
                  Sonraki &rarr;
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
