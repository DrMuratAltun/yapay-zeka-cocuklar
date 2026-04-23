"use client";

import { ReactNode, useState } from "react";

export interface Adim {
  baslik: string;
  emoji?: string;
  icerik: ReactNode;
}

interface AdimliEtkinlikProps {
  baslik?: string;
  adimlar: Adim[];
  renkGradient?: string;
  baslangicAdim?: number;
  tamamlandiMesaji?: string;
  tamamlandiCallback?: () => void;
}

/**
 * Adımlı Etkinlik Wrapper — çok aşamalı etkinlikler için.
 * Her adım tek bir slayt; sağ/sol navigasyon + dot pagination.
 * Scrollsuz, kompakt. BolumSlider içinde de çalışır.
 */
export default function AdimliEtkinlik({
  baslik,
  adimlar,
  renkGradient = "from-violet-500 to-indigo-600",
  baslangicAdim = 0,
  tamamlandiMesaji,
  tamamlandiCallback,
}: AdimliEtkinlikProps) {
  const [aktif, setAktif] = useState(baslangicAdim);
  const [ziyaret, setZiyaret] = useState<Set<number>>(new Set([baslangicAdim]));
  const [tamamlandi, setTamamlandi] = useState(false);

  const toplam = adimlar.length;
  const son = aktif === toplam - 1;
  const ilerleme = ((aktif + 1) / toplam) * 100;

  function git(i: number) {
    const yeni = Math.max(0, Math.min(toplam - 1, i));
    setAktif(yeni);
    setZiyaret((p) => new Set([...p, yeni]));
  }

  function sonraki() {
    if (son) {
      if (!tamamlandi) {
        setTamamlandi(true);
        tamamlandiCallback?.();
      }
      return;
    }
    git(aktif + 1);
  }

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 sm:p-4">
      {/* Üst bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {baslik && (
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {baslik}
              </p>
            )}
            <p className="truncate text-base font-extrabold sm:text-lg">
              {adimlar[aktif].emoji && (
                <span className="mr-1" aria-hidden="true">{adimlar[aktif].emoji}</span>
              )}
              {adimlar[aktif].baslik}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 text-xs font-bold">
            {aktif + 1}/{toplam}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${renkGradient} transition-all duration-300`}
            style={{ width: `${ilerleme}%` }}
          />
        </div>
      </div>

      {/* İçerik */}
      <div className="min-h-[280px]">
        {tamamlandi && tamamlandiMesaji ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="text-5xl">🎉</div>
            <h3 className="mt-2 text-lg font-extrabold">Tamamladın!</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {tamamlandiMesaji}
            </p>
            <button
              type="button"
              onClick={() => {
                setAktif(0);
                setTamamlandi(false);
                setZiyaret(new Set([0]));
              }}
              className="mt-4 cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Baştan Başla
            </button>
          </div>
        ) : (
          adimlar[aktif].icerik
        )}
      </div>

      {/* Alt kontrol */}
      {!tamamlandi && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => git(aktif - 1)}
            disabled={aktif === 0}
            className={`rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium transition ${
              aktif === 0
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer hover:bg-[var(--color-bg)]"
            }`}
          >
            ← Önceki
          </button>

          <div className="hidden items-center gap-1 sm:flex">
            {adimlar.map((_, i) => {
              const z = ziyaret.has(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => git(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === aktif
                      ? "w-6 bg-violet-500"
                      : z
                      ? "w-2 bg-violet-300 hover:bg-violet-400 dark:bg-violet-700"
                      : "w-2 bg-[var(--color-border)]"
                  }`}
                  aria-label={`Adım ${i + 1}`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={sonraki}
            className={`rounded-lg bg-gradient-to-r ${renkGradient} px-4 py-1.5 text-sm font-bold text-white transition hover:opacity-90`}
          >
            {son ? "Bitir 🏁" : "Sonraki →"}
          </button>
        </div>
      )}
    </section>
  );
}
