"use client";

import { useState } from "react";

interface DogruYanlisProps {
  ifade: string;
  dogruMu: boolean;
  aciklama: string;
  onComplete?: () => void;
}

export default function DogruYanlis({ ifade, dogruMu, aciklama, onComplete }: DogruYanlisProps) {
  const [cevap, setCevap] = useState<boolean | null>(null);
  const tamamlandi = cevap !== null;

  const cevapla = (secim: boolean) => {
    if (tamamlandi) return;
    setCevap(secim);
    onComplete?.();
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-5 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 text-xs font-bold">!</span>
        <p className="font-semibold text-foreground text-sm">{ifade}</p>
      </div>
      <div className="flex gap-3">
        {[
          { label: "Doğru", value: true, emoji: "✓", color: "emerald" },
          { label: "Yanlış", value: false, emoji: "✗", color: "red" },
        ].map((btn) => {
          let cls = `border-[var(--color-border)] bg-[var(--color-bg)] hover:border-${btn.color}-400 cursor-pointer`;
          if (tamamlandi) {
            if (btn.value === dogruMu) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-400";
            else if (btn.value === cevap) cls = "border-red-400 bg-red-50 dark:bg-red-900/20";
            else cls = "border-[var(--color-border)] bg-[var(--color-bg)] opacity-50";
          }
          return (
            <button
              key={btn.label}
              onClick={() => cevapla(btn.value)}
              disabled={tamamlandi}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${cls}`}
            >
              <span className="text-lg">{btn.value ? "👍" : "👎"}</span>
              {btn.label}
            </button>
          );
        })}
      </div>
      {tamamlandi && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${
          cevap === dogruMu
            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"
            : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200"
        }`}>
          <p className="font-semibold mb-0.5">{cevap === dogruMu ? "🎉 Doğru!" : "💡 Bilgi:"}</p>
          <p>{aciklama}</p>
        </div>
      )}
    </div>
  );
}
