"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BOLUMLER = [
  { no: 1, ad: "Yapay Zeka Nedir?", emoji: "🤖", renk: "from-sky-400 to-blue-500" },
  { no: 2, ad: "Günlük Hayatta YZ", emoji: "📱", renk: "from-emerald-400 to-teal-500" },
  { no: 3, ad: "Verinin Gücü", emoji: "📊", renk: "from-violet-400 to-purple-500" },
  { no: 4, ad: "Makineler Nasıl Öğrenir?", emoji: "🧠", renk: "from-orange-400 to-amber-500" },
  { no: 5, ad: "Üretken Yapay Zeka", emoji: "✨", renk: "from-pink-400 to-rose-500" },
  { no: 6, ad: "Blok Tabanlı Kodlama", emoji: "🧩", renk: "from-blue-400 to-indigo-500" },
  { no: 7, ad: "Gerçek Hayat Problemleri", emoji: "🌍", renk: "from-teal-400 to-cyan-500" },
  { no: 8, ad: "Dijital İçerik Üretimi", emoji: "🎨", renk: "from-rose-400 to-pink-500" },
  { no: 9, ad: "YZ ve Etik", emoji: "⚖️", renk: "from-amber-400 to-orange-500" },
  { no: 10, ad: "Gelecek Seninle Başlar", emoji: "🚀", renk: "from-indigo-400 to-violet-500" },
];

// Her bölümün yaklaşık slayt sayısı (tam sayı yerine hedef için)
const TOPLAM_SLAYT: Record<number, number> = {
  1: 21, 2: 16, 3: 22, 4: 18, 5: 16, 6: 13, 7: 12, 8: 13, 9: 15, 10: 16,
};

type BolumDurum = {
  no: number;
  ziyaretEdilenSlayt: number[];
  toplamSlayt: number;
  ilerleme: number;
  sonSlayt: number;
};

interface BolumIlerlemeProps {
  baslik?: string;
  kompakt?: boolean;
}

/**
 * Öğrencinin 10 bölümdeki ilerlemesini gösterir.
 * localStorage'dan bolum-X-visited (JSON array) ve bolum-X-slide okuyor.
 */
export default function BolumIlerleme({
  baslik = "Bölüm İlerlemelerim",
  kompakt = false,
}: BolumIlerlemeProps) {
  const [durumlar, setDurumlar] = useState<BolumDurum[]>([]);

  useEffect(() => {
    const liste: BolumDurum[] = BOLUMLER.map((b) => {
      let ziyaret: number[] = [];
      let sonSlayt = -1;
      try {
        const raw = localStorage.getItem(`bolum-${b.no}-visited`);
        if (raw) ziyaret = JSON.parse(raw) as number[];
        const son = localStorage.getItem(`bolum-${b.no}-slide`);
        if (son !== null) sonSlayt = Number(son);
      } catch {}
      const toplam = TOPLAM_SLAYT[b.no] ?? 20;
      const ilerleme = Math.min(100, Math.round((ziyaret.length / toplam) * 100));
      return {
        no: b.no,
        ziyaretEdilenSlayt: ziyaret,
        toplamSlayt: toplam,
        ilerleme,
        sonSlayt,
      };
    });
    setDurumlar(liste);
  }, []);

  const baslanan = durumlar.filter((d) => d.ilerleme > 0).length;
  const tamamlanan = durumlar.filter((d) => d.ilerleme >= 90).length;
  const toplamIlerleme =
    durumlar.length > 0
      ? Math.round(durumlar.reduce((acc, d) => acc + d.ilerleme, 0) / durumlar.length)
      : 0;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold">{baslik}</h3>
          {!kompakt && (
            <p className="text-xs text-slate-500">
              {baslanan}/10 bölüm başladın · {tamamlanan}/10 bölüm tamamlandı · ortalama %
              {toplamIlerleme}
            </p>
          )}
        </div>
        <Link
          href="/#bolumler"
          className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Tümü →
        </Link>
      </div>

      {/* Özet progress bar */}
      {!kompakt && (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2 text-xs font-bold text-slate-500">
            <span>Genel İlerleme</span>
            <span>%{toplamIlerleme}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 transition-all"
              style={{ width: `${toplamIlerleme}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-10 gap-1">
            {durumlar.map((d) => (
              <div
                key={d.no}
                className={`aspect-square rounded ${
                  d.ilerleme >= 90
                    ? "bg-emerald-500"
                    : d.ilerleme >= 40
                    ? "bg-violet-500"
                    : d.ilerleme > 0
                    ? "bg-violet-300 dark:bg-violet-900"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
                title={`Bölüm ${d.no}: %${d.ilerleme}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 10 bölüm kartı */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
        {durumlar.map((d) => {
          const b = BOLUMLER[d.no - 1];
          const href =
            d.sonSlayt >= 0 ? `/bolumler/${d.no}` : `/bolumler/${d.no}`;
          const durum =
            d.ilerleme === 0
              ? "başlanmadı"
              : d.ilerleme >= 90
              ? "tamamlandı"
              : "devam ediyor";
          return (
            <Link
              key={d.no}
              href={href}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg ${b.renk}`}
              >
                {b.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {b.no}. {b.ad}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      d.ilerleme >= 90
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : d.ilerleme > 0
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                    }`}
                  >
                    {durum}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r transition-all ${b.renk}`}
                      style={{ width: `${d.ilerleme}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    %{d.ilerleme}
                  </span>
                </div>
                {d.sonSlayt >= 0 && d.ilerleme < 90 && (
                  <p className="mt-0.5 text-[10px] text-slate-500">
                    Kaldığın yer: {d.sonSlayt + 1}. slayt
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
