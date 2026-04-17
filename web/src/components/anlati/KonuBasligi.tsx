"use client";

import { ReactNode } from "react";

interface KonuBasligiProps {
  numara?: number | string;
  baslik: string;
  altBaslik?: string;
  emoji?: string;
  renkGradient?: string;
  cocuk?: ReactNode;
}

export default function KonuBasligi({
  numara,
  baslik,
  altBaslik,
  emoji,
  renkGradient = "from-sky-500 to-blue-500",
  cocuk,
}: KonuBasligiProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        {numara !== undefined && (
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-extrabold text-white shadow-lg ${renkGradient}`}
          >
            {numara}
          </div>
        )}
        {!numara && emoji && (
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg ${renkGradient}`}
          >
            {emoji}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-extrabold md:text-2xl">
            {emoji && numara !== undefined && (
              <span className="mr-2" aria-hidden="true">
                {emoji}
              </span>
            )}
            {baslik}
          </h3>
          {altBaslik && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] md:text-base">
              {altBaslik}
            </p>
          )}
        </div>
      </div>
      {cocuk && <div className="mt-4">{cocuk}</div>}
      <div
        className={`mt-4 h-1 rounded-full bg-gradient-to-r ${renkGradient} opacity-60`}
      />
    </div>
  );
}
