"use client";

import { ReactNode } from "react";

interface GecisSlaytProps {
  oncekiBaslik?: string;
  oncekiOzet?: ReactNode;
  sonrakiBaslik: string;
  sonrakiOzet: ReactNode;
  hikaye?: ReactNode;
  emoji?: string;
  renkGradient?: string;
}

export default function GecisSlayt({
  oncekiBaslik,
  oncekiOzet,
  sonrakiBaslik,
  sonrakiOzet,
  hikaye,
  emoji = "🚀",
  renkGradient = "from-sky-500 via-blue-500 to-violet-500",
}: GecisSlaytProps) {
  return (
    <div className="space-y-6">
      {/* Hero bridge */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${renkGradient} p-8 text-center text-white shadow-xl`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <span
            className="inline-block text-6xl"
            style={{ animation: "float 3s ease-in-out infinite" }}
            aria-hidden="true"
          >
            {emoji}
          </span>
          <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">
            Yolculuk Devam Ediyor
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/90 md:text-base">
            Öğrendiklerini topla, yeni maceraya hazırlan!
          </p>
        </div>
      </div>

      {/* Hikaye / geçiş metni */}
      {hikaye && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-indigo-50 to-purple-50 p-6 dark:from-indigo-900/10 dark:to-purple-900/10">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-3xl" aria-hidden="true">
              📖
            </span>
            <div className="text-sm leading-relaxed text-[var(--color-text)] md:text-base">
              {hikaye}
            </div>
          </div>
        </div>
      )}

      {/* İki kart: Öğrendiklerin / Keşfedeceğin */}
      <div className="grid gap-4 md:grid-cols-2">
        {oncekiBaslik && oncekiOzet && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">
                ✓ TAMAMLANDI
              </span>
            </div>
            <h4 className="mb-2 text-lg font-bold text-emerald-800 dark:text-emerald-300">
              {oncekiBaslik}
            </h4>
            <div className="text-sm text-emerald-700 dark:text-emerald-400">
              {oncekiOzet}
            </div>
          </div>
        )}
        <div
          className={`rounded-2xl border-2 border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20 ${
            !oncekiBaslik ? "md:col-span-2" : ""
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-xs font-bold text-white">
              🧭 SIRADA NE VAR?
            </span>
          </div>
          <h4 className="mb-2 text-lg font-bold text-sky-800 dark:text-sky-300">
            {sonrakiBaslik}
          </h4>
          <div className="text-sm text-sky-700 dark:text-sky-400">{sonrakiOzet}</div>
        </div>
      </div>
    </div>
  );
}
