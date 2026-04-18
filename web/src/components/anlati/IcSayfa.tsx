"use client";

import { ReactNode, useState } from "react";

export interface IcSayfaOge {
  baslik?: string;
  emoji?: string;
  icerik: ReactNode;
}

interface IcSayfaProps {
  sayfalar: IcSayfaOge[];
  renkGradient?: string;
  baslangic?: number;
  toplamEtiketi?: string;
}

/**
 * İç Sayfa (Inline Pager)
 * BolumSlider slaytının içinde kullanılır — uzun içeriği birden
 * fazla iç-sayfaya böler. Scroll yerine ileri/geri gezinme.
 *
 * Örnek:
 * <IcSayfa sayfalar={[
 *   { emoji: '📖', baslik: 'Tanım', icerik: <p>...</p> },
 *   { emoji: '📊', baslik: 'Tablo', icerik: <table>...</table> },
 *   { emoji: '💡', baslik: 'Örnek', icerik: <div>...</div> },
 * ]} />
 */
export default function IcSayfa({
  sayfalar,
  renkGradient = "from-sky-500 to-violet-500",
  baslangic = 0,
  toplamEtiketi,
}: IcSayfaProps) {
  const [aktif, setAktif] = useState(baslangic);
  const toplam = sayfalar.length;
  const ilerleme = ((aktif + 1) / toplam) * 100;
  const sayfa = sayfalar[aktif];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 sm:p-4">
      {/* Üst bar: başlık + sayaç */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          {sayfa.baslik && (
            <p className="truncate text-sm font-bold">
              {sayfa.emoji && (
                <span className="mr-1" aria-hidden="true">
                  {sayfa.emoji}
                </span>
              )}
              {sayfa.baslik}
            </p>
          )}
        </div>
        <span className="shrink-0 rounded-full bg-[var(--color-bg-secondary)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-text-secondary)]">
          {aktif + 1}/{toplam}
          {toplamEtiketi ? ` ${toplamEtiketi}` : ""}
        </span>
      </div>

      {/* İlerleme */}
      <div className="mb-3 h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${renkGradient} transition-all duration-300`}
          style={{ width: `${ilerleme}%` }}
        />
      </div>

      {/* İçerik */}
      <div className="min-h-[220px]">{sayfa.icerik}</div>

      {/* Alt kontrol */}
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setAktif((i) => Math.max(0, i - 1))}
          disabled={aktif === 0}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            aktif === 0
              ? "cursor-not-allowed opacity-30"
              : "cursor-pointer border border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]"
          }`}
        >
          ← Önceki
        </button>

        {/* Dot pagination */}
        <div className="flex items-center gap-1">
          {sayfalar.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAktif(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === aktif
                  ? "w-5 bg-gradient-to-r " + renkGradient
                  : "w-1.5 bg-[var(--color-border)] hover:bg-slate-400"
              }`}
              aria-label={`Sayfa ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAktif((i) => Math.min(toplam - 1, i + 1))}
          disabled={aktif === toplam - 1}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            aktif === toplam - 1
              ? "cursor-not-allowed opacity-30"
              : `cursor-pointer bg-gradient-to-r ${renkGradient} text-white hover:opacity-90`
          }`}
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
}
