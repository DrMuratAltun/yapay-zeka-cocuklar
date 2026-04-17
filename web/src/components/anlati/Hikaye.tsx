"use client";

import { ReactNode } from "react";

interface HikayeProps {
  karakter?: string;
  karakterEmoji?: string;
  baslik?: string;
  paragraflar: ReactNode[];
  renkGradient?: string;
}

export default function Hikaye({
  karakter = "Zeki",
  karakterEmoji = "🤖",
  baslik,
  paragraflar,
  renkGradient = "from-indigo-500 via-purple-500 to-pink-500",
}: HikayeProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-2xl shadow-lg ${renkGradient}`}
        >
          <span aria-hidden="true">{karakterEmoji}</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
            Seninle konuşuyor
          </p>
          <p className="text-base font-bold">{karakter}</p>
        </div>
      </div>

      {baslik && (
        <h4 className="mb-3 text-lg font-extrabold text-[var(--color-text)]">
          {baslik}
        </h4>
      )}

      <div className="space-y-3 border-l-2 border-indigo-300 pl-4 text-sm leading-relaxed text-[var(--color-text)] dark:border-indigo-700 md:text-base">
        {paragraflar.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
