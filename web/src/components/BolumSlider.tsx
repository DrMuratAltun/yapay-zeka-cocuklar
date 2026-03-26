"use client";

import { useState, useCallback } from "react";
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
  renk: string; // gradient class: "from-sky-600 to-blue-700"
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
  const [aktifSlayt, setAktifSlayt] = useState(0);

  const onceki = useCallback(() => {
    setAktifSlayt((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sonraki = useCallback(() => {
    setAktifSlayt((s) => Math.min(slaytlar.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slaytlar.length]);

  const ilkSlayt = aktifSlayt === 0;
  const sonSlayt = aktifSlayt === slaytlar.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`bg-gradient-to-r ${renk} text-white`}>
        <div className="mx-auto max-w-4xl px-6 py-5">
          <Link href="/" className="mb-3 inline-block text-sm text-white/70 hover:text-white transition">
            &larr; Ana Sayfa
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              {slaytlar[aktifSlayt]?.icon || "📖"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white/70">
                BÖLÜM {bolumNo} &middot; {seviye} &middot; {ders} ders saati
              </p>
              <h1 className="text-2xl font-extrabold truncate">{bolumBaslik}</h1>
              <p className="text-sm text-white/70">{bolumAltBaslik}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Slayt Navigasyonu - üst bar */}
      <div className="sticky top-[53px] z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6">
          {/* Progress bar */}
          <div className="h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${renk} transition-all duration-300`}
              style={{ width: `${((aktifSlayt + 1) / slaytlar.length) * 100}%` }}
            />
          </div>

          {/* Slayt sekmeleri - tümü görünür, eşit genişlik */}
          <div className="flex w-full py-2">
            {slaytlar.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setAktifSlayt(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-1 min-w-0 items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-xs font-medium transition cursor-pointer ${
                  i === aktifSlayt
                    ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                }`}
              >
                <span className="shrink-0">{s.icon}</span>
                <span className="truncate hidden md:inline text-[11px]">{s.baslik}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slayt İçeriği */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-2xl">{slaytlar[aktifSlayt].icon}</span>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {aktifSlayt + 1} / {slaytlar.length}
            </p>
            <h2 className="text-xl font-extrabold">{slaytlar[aktifSlayt].baslik}</h2>
          </div>
        </div>

        <div className="space-y-8">
          {slaytlar[aktifSlayt].icerik}
        </div>
      </main>

      {/* Alt Navigasyon - sabit */}
      <footer className="sticky bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          {/* Sol: Önceki slayt veya önceki bölüm */}
          {ilkSlayt ? (
            oncekiBolum ? (
              <Link
                href={`/bolumler/${oncekiBolum}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
              >
                &larr; Bölüm {oncekiBolum}
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
              >
                &larr; Ana Sayfa
              </Link>
            )
          ) : (
            <button
              type="button"
              onClick={onceki}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] cursor-pointer"
            >
              &larr; Önceki
            </button>
          )}

          {/* Orta: Sayfa göstergesi */}
          <div className="flex gap-1.5">
            {slaytlar.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setAktifSlayt(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === aktifSlayt ? "w-6 bg-sky-500" : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>

          {/* Sağ: Sonraki slayt veya sonraki bölüm */}
          {sonSlayt ? (
            sonrakiBolum ? (
              <Link
                href={`/bolumler/${sonrakiBolum}`}
                className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-4 py-2 text-sm font-bold text-white transition hover:opacity-90`}
              >
                Bölüm {sonrakiBolum} &rarr;
              </Link>
            ) : (
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-4 py-2 text-sm font-bold text-white transition hover:opacity-90`}
              >
                Tamamla &#10003;
              </Link>
            )
          ) : (
            <button
              type="button"
              onClick={sonraki}
              className={`flex items-center gap-2 rounded-lg bg-gradient-to-r ${renk} px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 cursor-pointer`}
            >
              Sonraki &rarr;
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
