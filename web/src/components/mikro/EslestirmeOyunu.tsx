"use client";

import { useState, useCallback } from "react";

interface Cift {
  sol: string;
  sag: string;
}

interface EslestirmeOyunuProps {
  baslik: string;
  ciftler: Cift[];
  onComplete?: () => void;
}

export default function EslestirmeOyunu({ baslik, ciftler, onComplete }: EslestirmeOyunuProps) {
  const [karisikSag] = useState(() => [...ciftler].sort(() => Math.random() - 0.5).map((c) => c.sag));
  const [seciliSol, setSeciliSol] = useState<string | null>(null);
  const [eslesmeler, setEslesmeler] = useState<Map<string, string>>(new Map());
  const [yanlis, setYanlis] = useState<string | null>(null);
  const [tamamlandi, setTamamlandi] = useState(false);

  const solSec = (sol: string) => {
    if (tamamlandi || eslesmeler.has(sol)) return;
    setSeciliSol(seciliSol === sol ? null : sol);
    setYanlis(null);
  };

  const sagSec = useCallback((sag: string) => {
    if (!seciliSol || tamamlandi) return;
    // Zaten eslestirilmis mi
    if ([...eslesmeler.values()].includes(sag)) return;

    const dogruCift = ciftler.find((c) => c.sol === seciliSol);
    if (dogruCift?.sag === sag) {
      const yeni = new Map(eslesmeler);
      yeni.set(seciliSol, sag);
      setEslesmeler(yeni);
      setSeciliSol(null);
      setYanlis(null);
      if (yeni.size === ciftler.length) {
        setTamamlandi(true);
        onComplete?.();
      }
    } else {
      setYanlis(sag);
      setTimeout(() => setYanlis(null), 800);
    }
  }, [seciliSol, eslesmeler, ciftler, tamamlandi, onComplete]);

  const eslesmiseSag = (sag: string) => [...eslesmeler.values()].includes(sag);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-5 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-700 dark:text-pink-300 text-xs font-bold">↔</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{baslik}</p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Soldan bir öğe seç, sağdan eşini bul!
          </p>
        </div>
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
          {eslesmeler.size}/{ciftler.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Sol sutun */}
        <div className="space-y-1.5">
          {ciftler.map((c) => {
            const eslesti = eslesmeler.has(c.sol);
            const secili = seciliSol === c.sol;
            return (
              <button
                key={c.sol}
                onClick={() => solSec(c.sol)}
                disabled={eslesti}
                className={`w-full rounded-lg border px-3 py-2 text-xs sm:text-sm text-left font-medium transition ${
                  eslesti
                    ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 line-through opacity-70"
                    : secili
                    ? "border-pink-400 bg-pink-50 dark:bg-pink-900/20 ring-1 ring-pink-400 text-pink-700 dark:text-pink-300"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-pink-300"
                }`}
              >
                {c.sol}
                {eslesti && " ✓"}
              </button>
            );
          })}
        </div>

        {/* Sag sutun */}
        <div className="space-y-1.5">
          {karisikSag.map((sag) => {
            const eslesti = eslesmiseSag(sag);
            const yanlisEsleme = yanlis === sag;
            return (
              <button
                key={sag}
                onClick={() => sagSec(sag)}
                disabled={eslesti || !seciliSol}
                className={`w-full rounded-lg border px-3 py-2 text-xs sm:text-sm text-left font-medium transition ${
                  eslesti
                    ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 opacity-70"
                    : yanlisEsleme
                    ? "border-red-400 bg-red-50 dark:bg-red-900/20 animate-pulse"
                    : seciliSol
                    ? "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-pink-300 cursor-pointer"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] opacity-60"
                }`}
              >
                {sag}
                {eslesti && " ✓"}
              </button>
            );
          })}
        </div>
      </div>

      {tamamlandi && (
        <div className="mt-3 rounded-lg p-3 text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200">
          <p className="font-semibold">🎉 Harika! Tüm eşleştirmeleri doğru yaptın!</p>
        </div>
      )}
    </div>
  );
}
