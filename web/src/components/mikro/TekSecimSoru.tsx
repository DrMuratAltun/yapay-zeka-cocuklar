"use client";

import { useState } from "react";

interface TekSecimSoruProps {
  soru: string;
  secenekler: string[];
  dogruIndex: number;
  aciklama: string;
  onComplete?: () => void;
}

export default function TekSecimSoru({ soru, secenekler, dogruIndex, aciklama, onComplete }: TekSecimSoruProps) {
  const [secilen, setSecilen] = useState<number | null>(null);
  const [tamamlandi, setTamamlandi] = useState(false);

  const sec = (i: number) => {
    if (tamamlandi) return;
    setSecilen(i);
    setTamamlandi(true);
    if (i === dogruIndex) onComplete?.();
    else setTimeout(() => onComplete?.(), 2000);
  };

  const harfler = ["A", "B", "C", "D"];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-5 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-700 dark:text-sky-300 text-xs font-bold">?</span>
        <p className="font-semibold text-foreground text-sm">{soru}</p>
      </div>
      <div className="space-y-2">
        {secenekler.map((s, i) => {
          let cls = "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-sky-400 cursor-pointer";
          if (tamamlandi) {
            if (i === dogruIndex) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-400";
            else if (i === secilen) cls = "border-red-400 bg-red-50 dark:bg-red-900/20";
            else cls = "border-[var(--color-border)] bg-[var(--color-bg)] opacity-50";
          } else if (i === secilen) {
            cls = "border-sky-400 bg-sky-50 dark:bg-sky-900/20 ring-1 ring-sky-400";
          }
          return (
            <button
              key={i}
              onClick={() => sec(i)}
              disabled={tamamlandi}
              className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition ${cls}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                {harfler[i]}
              </span>
              <span className="flex-1">{s}</span>
              {tamamlandi && i === dogruIndex && <span className="text-emerald-600">✓</span>}
              {tamamlandi && i === secilen && i !== dogruIndex && <span className="text-red-500">✗</span>}
            </button>
          );
        })}
      </div>
      {tamamlandi && (
        <div className={`mt-3 rounded-lg p-3 text-sm ${
          secilen === dogruIndex
            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"
            : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200"
        }`}>
          <p className="font-semibold mb-0.5">
            {secilen === dogruIndex ? "🎉 Doğru!" : "💡 Bilgi:"}
          </p>
          <p>{aciklama}</p>
        </div>
      )}
    </div>
  );
}
