"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BOLUM_META, okuBolumIlerleme, type BolumIlerlemeOzet } from "@/data/bolumler";

interface StudentModule {
  bolumNo: number;
  sortOrder: number;
  minQuizScore: number;
  unlocked: boolean;
  quizResult: { score: number; passed: boolean } | null;
}

export default function BolumlerPage() {
  const [modules, setModules] = useState<StudentModule[]>([]);
  const [ilerlemeler, setIlerlemeler] = useState<Record<number, BolumIlerlemeOzet>>({});
  const [role, setRole] = useState<"loading" | "anon" | "student" | "other">("loading");

  useEffect(() => {
    fetch("/api/auth/role")
      .then((r) => (r.ok ? r.json() : { role: null }))
      .then((data: { role: string | null }) => {
        if (!data.role) setRole("anon");
        else if (data.role === "student") setRole("student");
        else setRole("other");
      })
      .catch(() => setRole("anon"));

    fetch("/api/student/modules")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.modules) setModules(data.modules as StudentModule[]);
      })
      .catch(() => {});

    const out: Record<number, BolumIlerlemeOzet> = {};
    for (const b of BOLUM_META) out[b.no] = okuBolumIlerleme(b.no);
    setIlerlemeler(out);
  }, []);

  const moduleMap = useMemo(() => new Map(modules.map((m) => [m.bolumNo, m])), [modules]);
  const hasAssigned = role === "student" && modules.length > 0;
  const visible = hasAssigned ? BOLUM_META.filter((b) => moduleMap.has(b.no)) : BOLUM_META;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Bölümlerim</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasAssigned
            ? `Sınıfının yol haritası: ${visible.length} bölüm. Kilidi açık olanları incele, quizleri geçerek ilerle.`
            : "10 bölüm, 6. sınıftan 8. sınıfa kademeli yapay zeka okuryazarlığı."}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((b) => {
          const mod = moduleMap.get(b.no);
          const isLocked = hasAssigned && mod && !mod.unlocked;
          const isPassed = mod?.quizResult?.passed;
          const puan = mod?.quizResult?.score;
          const ilerleme = ilerlemeler[b.no];
          const yuzde = ilerleme?.yuzde ?? 0;
          const basladi = (ilerleme?.tamam ?? 0) > 0;

          if (isLocked) {
            return (
              <div
                key={b.no}
                className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] opacity-60 overflow-hidden"
                title="Önceki bölümün quizini geç"
              >
                <div className={`h-36 bg-gradient-to-br ${b.bg} grayscale flex items-center justify-center`}>
                  <span className="text-5xl">🔒</span>
                </div>
                <div className="p-4">
                  <span className="inline-block rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-bold uppercase text-gray-600">
                    Kilitli
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-muted-foreground">{b.baslik}</h3>
                  <p className="text-xs text-muted-foreground">{b.altBaslik}</p>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={b.no}
              href={`/bolumler/${b.no}`}
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] transition hover:shadow-lg hover:border-violet-300"
            >
              <div className={`relative h-36 bg-gradient-to-br ${b.bg} flex items-center justify-center`}>
                <span className="text-6xl drop-shadow-sm" aria-hidden>{b.emoji}</span>
                {isPassed && (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow text-sm font-bold">
                    ✓
                  </span>
                )}
                {basladi && !isPassed && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-violet-700 shadow">
                    %{yuzde}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                    Bölüm {b.no}
                  </span>
                  {typeof puan === "number" && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isPassed
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                      }`}
                    >
                      Quiz: %{puan}
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-base font-bold text-foreground group-hover:text-violet-600 transition">
                  {b.baslik}
                </h3>
                <p className="text-xs text-muted-foreground">{b.altBaslik}</p>

                {/* İlerleme barı */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${b.renk} transition-all`}
                    style={{ width: `${yuzde}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span>
                    {b.seviye} · {b.ders} ders saati
                  </span>
                  <span className={`font-semibold ${basladi ? "text-violet-600 dark:text-violet-400" : ""}`}>
                    {yuzde >= 100 ? "Tamamlandı 🎉" : basladi ? "Devam Et →" : "Başla →"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
