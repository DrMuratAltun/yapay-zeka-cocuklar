"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface StudentModule {
  bolumNo: number;
  sortOrder: number;
  minQuizScore: number;
  unlocked: boolean;
  quizResult: { score: number; passed: boolean } | null;
}

const BOLUMLER = [
  { no: 1, baslik: "Yapay Zeka Nedir?", altBaslik: "Keşif Yolculuğu", seviye: "6. Sınıf", ders: 4, renk: "from-sky-400 to-blue-500", bg: "from-sky-500 to-blue-600", ikon: "🔍", emoji: "🤖" },
  { no: 2, baslik: "Günlük Hayatta YZ", altBaslik: "Yapay Zeka Etrafımızda", seviye: "6. Sınıf", ders: 4, renk: "from-emerald-400 to-teal-500", bg: "from-emerald-500 to-teal-600", ikon: "🏠", emoji: "🏡" },
  { no: 3, baslik: "Verinin Gücü", altBaslik: "YZ'nin Yakıtı", seviye: "6. Sınıf", ders: 4, renk: "from-violet-400 to-purple-500", bg: "from-violet-500 to-purple-600", ikon: "📊", emoji: "📊" },
  { no: 4, baslik: "Makineler Nasıl Öğrenir?", altBaslik: "ML Temelleri", seviye: "6-7. Sınıf", ders: 6, renk: "from-orange-400 to-amber-500", bg: "from-orange-500 to-amber-600", ikon: "🤖", emoji: "🧠" },
  { no: 5, baslik: "Üretken Yapay Zeka", altBaslik: "YZ Araçları", seviye: "6-7. Sınıf", ders: 6, renk: "from-pink-400 to-rose-500", bg: "from-pink-500 to-rose-600", ikon: "✨", emoji: "✨" },
  { no: 6, baslik: "Blok Tabanlı YZ Kodlama", altBaslik: "PictoBlox Projeleri", seviye: "7. Sınıf", ders: 8, renk: "from-blue-400 to-indigo-500", bg: "from-blue-500 to-indigo-600", ikon: "🧩", emoji: "🧩" },
  { no: 7, baslik: "Gerçek Hayat Problemleri", altBaslik: "STEM Tabanlı YZ Çözümleri", seviye: "7-8. Sınıf", ders: 8, renk: "from-teal-400 to-cyan-500", bg: "from-teal-500 to-cyan-600", ikon: "🌍", emoji: "🌍" },
  { no: 8, baslik: "Dijital İçerik Üretimi", altBaslik: "YZ ile Yaratıcılık", seviye: "7-8. Sınıf", ders: 6, renk: "from-rose-400 to-pink-500", bg: "from-rose-500 to-pink-600", ikon: "🎨", emoji: "🎨" },
  { no: 9, baslik: "YZ ve Etik", altBaslik: "Doğru Kullanımın Pusulası", seviye: "7-8. Sınıf", ders: 4, renk: "from-amber-400 to-orange-500", bg: "from-amber-500 to-orange-600", ikon: "⚖️", emoji: "⚖️" },
  { no: 10, baslik: "Gelecek Seninle Başlar", altBaslik: "Proje ve Portfolyo", seviye: "8. Sınıf", ders: 8, renk: "from-indigo-400 to-violet-500", bg: "from-indigo-500 to-violet-600", ikon: "🚀", emoji: "🚀" },
];

export default function BolumlerPage() {
  const [modules, setModules] = useState<StudentModule[]>([]);
  const [ilerlemeler, setIlerlemeler] = useState<Record<number, number>>({});
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

    try {
      const out: Record<number, number> = {};
      for (let no = 1; no <= 10; no++) {
        const raw = localStorage.getItem(`bolum-${no}-tamamlananlar`);
        if (raw) {
          try {
            const arr = JSON.parse(raw) as string[];
            out[no] = arr.length;
          } catch {}
        }
      }
      setIlerlemeler(out);
    } catch {}
  }, []);

  const moduleMap = useMemo(() => new Map(modules.map((m) => [m.bolumNo, m])), [modules]);
  const hasAssigned = role === "student" && modules.length > 0;
  const visible = hasAssigned ? BOLUMLER.filter((b) => moduleMap.has(b.no)) : BOLUMLER;

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
          const tamamlananSayi = ilerlemeler[b.no] ?? 0;

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
                      {puan}%
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-base font-bold text-foreground group-hover:text-violet-600 transition">
                  {b.baslik}
                </h3>
                <p className="text-xs text-muted-foreground">{b.altBaslik}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{b.seviye}</span>
                  <span>·</span>
                  <span>{b.ders} ders saati</span>
                  {tamamlananSayi > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-violet-600 font-semibold">{tamamlananSayi} içerik</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
