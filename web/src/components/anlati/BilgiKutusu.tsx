"use client";

import { ReactNode } from "react";

type KutuTipi =
  | "dusun"
  | "biliyor-muydun"
  | "ipucu"
  | "dikkat"
  | "gercek-hayat"
  | "tarih";

interface BilgiKutusuProps {
  tip: KutuTipi;
  baslik?: string;
  children: ReactNode;
}

const STILLER: Record<
  KutuTipi,
  { emoji: string; etiket: string; renkBorder: string; renkBg: string; renkText: string }
> = {
  dusun: {
    emoji: "🤔",
    etiket: "Düşün",
    renkBorder: "border-amber-400",
    renkBg: "bg-amber-50 dark:bg-amber-900/20",
    renkText: "text-amber-800 dark:text-amber-300",
  },
  "biliyor-muydun": {
    emoji: "💡",
    etiket: "Biliyor Muydun?",
    renkBorder: "border-sky-400",
    renkBg: "bg-sky-50 dark:bg-sky-900/20",
    renkText: "text-sky-800 dark:text-sky-300",
  },
  ipucu: {
    emoji: "✨",
    etiket: "İpucu",
    renkBorder: "border-emerald-400",
    renkBg: "bg-emerald-50 dark:bg-emerald-900/20",
    renkText: "text-emerald-800 dark:text-emerald-300",
  },
  dikkat: {
    emoji: "⚠️",
    etiket: "Dikkat",
    renkBorder: "border-rose-400",
    renkBg: "bg-rose-50 dark:bg-rose-900/20",
    renkText: "text-rose-800 dark:text-rose-300",
  },
  "gercek-hayat": {
    emoji: "🌍",
    etiket: "Gerçek Hayattan",
    renkBorder: "border-violet-400",
    renkBg: "bg-violet-50 dark:bg-violet-900/20",
    renkText: "text-violet-800 dark:text-violet-300",
  },
  tarih: {
    emoji: "📜",
    etiket: "Tarihten Bir Not",
    renkBorder: "border-orange-400",
    renkBg: "bg-orange-50 dark:bg-orange-900/20",
    renkText: "text-orange-800 dark:text-orange-300",
  },
};

export default function BilgiKutusu({ tip, baslik, children }: BilgiKutusuProps) {
  const stil = STILLER[tip];
  return (
    <aside
      className={`rounded-xl border-l-4 p-4 ${stil.renkBorder} ${stil.renkBg}`}
    >
      <div className={`mb-1.5 flex items-center gap-2 text-sm font-bold ${stil.renkText}`}>
        <span className="text-lg" aria-hidden="true">
          {stil.emoji}
        </span>
        <span>{baslik ?? stil.etiket}</span>
      </div>
      <div className={`text-sm leading-relaxed ${stil.renkText}`}>{children}</div>
    </aside>
  );
}
