"use client";

import { useEffect, useState } from "react";

interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}

export default function BasarilarPage() {
  const [badgeDefs, setBadgeDefs] = useState<BadgeDef[]>([]);
  const [earned, setEarned] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/badges")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setBadgeDefs(data.definitions ?? []);
          setEarned(data.earned ?? []);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Başarılarım</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kazandığın rozetler ve başarılar
        </p>
      </header>

      {badgeDefs.length === 0 ? (
        <p className="text-muted-foreground">Henüz rozet tanımı yüklenmedi.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {badgeDefs.map((def) => {
            const isEarned = earned.includes(def.id);
            return (
              <div
                key={def.id}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
                  isEarned
                    ? "border-amber-300 bg-amber-50 dark:bg-amber-950/20"
                    : "border-[var(--color-border)] opacity-40 grayscale"
                }`}
              >
                <span className="text-4xl">{def.icon}</span>
                <p className="text-sm font-bold text-foreground">{def.name}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {def.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
