"use client";

import Link from "next/link";

interface SinifKartProps {
  id: string;
  ad: string;
  kod: string;
  girisTipi: string;
  ogrenciSayisi: number;
  renkIdx?: number;
}

const RENKLER = [
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-orange-400 to-amber-500",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-violet-500",
];

const TIP_EMOJI: Record<string, string> = {
  pin: "🔢",
  emoji: "😊",
  word: "💬",
};

const TIP_AD: Record<string, string> = {
  pin: "PIN",
  emoji: "Emoji",
  word: "Kelime",
};

export default function SinifKarti({
  id,
  ad,
  kod,
  girisTipi,
  ogrenciSayisi,
  renkIdx = 0,
}: SinifKartProps) {
  const renk = RENKLER[renkIdx % RENKLER.length];

  return (
    <Link
      href={`/ogretmen/siniflar/${id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`relative h-24 bg-gradient-to-br ${renk}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-90" aria-hidden="true">
            🏫
          </span>
        </div>
        <div className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-slate-900">
          {TIP_EMOJI[girisTipi] ?? "🔐"} {TIP_AD[girisTipi] ?? girisTipi}
        </div>
      </div>
      <div className="p-4">
        <h4 className="truncate text-base font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {ad}
        </h4>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Sınıf Kodu
            </p>
            <p className="font-mono text-sm font-bold tracking-wide text-violet-600 dark:text-violet-400">
              {kod}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Öğrenci
            </p>
            <p className="text-lg font-extrabold">{ogrenciSayisi}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-violet-600 group-hover:text-violet-700 dark:text-violet-400">
            Yönet →
          </span>
          <div className="flex -space-x-1">
            {[...Array(Math.min(3, ogrenciSayisi))].map((_, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-indigo-500 text-[9px] font-bold text-white dark:border-slate-900"
              >
                👤
              </div>
            ))}
            {ogrenciSayisi > 3 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400">
                +{ogrenciSayisi - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
