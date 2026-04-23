"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
}

interface StudentModule {
  bolumNo: number;
  sortOrder: number;
  minQuizScore: number;
  unlocked: boolean;
  quizResult: { score: number; passed: boolean } | null;
}

interface Teacher {
  id: string;
  displayName: string;
  subject?: string;
}

const BOLUMLER = [
  { no: 1, baslik: "Yapay Zeka Nedir?",           altBaslik: "Keşif Yolculuğu",        renk: "from-sky-400 to-blue-500",    bg: "from-sky-500 to-blue-600",    ikon: "🔍", emoji: "🤖" },
  { no: 2, baslik: "Günlük Hayatta YZ",           altBaslik: "Yapay Zeka Etrafımızda", renk: "from-emerald-400 to-teal-500", bg: "from-emerald-500 to-teal-600", ikon: "🏠", emoji: "🏡" },
  { no: 3, baslik: "Verinin Gücü",                altBaslik: "YZ'nin Yakıtı",          renk: "from-violet-400 to-purple-500", bg: "from-violet-500 to-purple-600", ikon: "📊", emoji: "📊" },
  { no: 4, baslik: "Makineler Nasıl Öğrenir?",    altBaslik: "ML Temelleri",           renk: "from-orange-400 to-amber-500",  bg: "from-orange-500 to-amber-600",  ikon: "🤖", emoji: "🧠" },
  { no: 5, baslik: "Üretken Yapay Zeka",          altBaslik: "YZ Araçları",            renk: "from-pink-400 to-rose-500",     bg: "from-pink-500 to-rose-600",     ikon: "✨", emoji: "✨" },
  { no: 6, baslik: "Blok Tabanlı YZ Kodlama",     altBaslik: "PictoBlox Projeleri",    renk: "from-blue-400 to-indigo-500",   bg: "from-blue-500 to-indigo-600",   ikon: "🧩", emoji: "🧩" },
  { no: 7, baslik: "Gerçek Hayat Problemleri",    altBaslik: "Keşif Yolculuğu",        renk: "from-teal-400 to-cyan-500",     bg: "from-sky-500 to-blue-600",      ikon: "🌍", emoji: "🤖" },
  { no: 8, baslik: "Dijital İçerik Üretimi",      altBaslik: "YZ ile Yaratıcılık",     renk: "from-rose-400 to-pink-500",     bg: "from-rose-500 to-pink-600",     ikon: "🎨", emoji: "🎨" },
  { no: 9, baslik: "YZ ve Etik",                  altBaslik: "Doğru Kullanım",         renk: "from-amber-400 to-orange-500",  bg: "from-amber-500 to-orange-600",  ikon: "⚖️", emoji: "⚖️" },
  { no: 10, baslik: "Gelecek Seninle Başlar",     altBaslik: "Proje ve Portfolyo",     renk: "from-indigo-400 to-violet-500", bg: "from-indigo-500 to-violet-600", ikon: "🚀", emoji: "🚀" },
];

const TOPLAM_ETKINLIK = 62;

function greeting(): string {
  const h = new Date().getHours();
  if (h < 6) return "İyi geceler";
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
}

function StatCard({
  sayi, toplam, etiket, altEtiket, ikon, renk,
}: {
  sayi: number; toplam?: number; etiket: string; altEtiket: string; ikon: string; renk: string;
}) {
  return (
    <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${renk} text-lg`}>
          {ikon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-foreground">{sayi}</span>
            {typeof toplam === "number" && (
              <span className="text-sm font-semibold text-muted-foreground">/{toplam}</span>
            )}
            <span className="ml-1 text-sm font-bold text-foreground">{etiket}</span>
          </div>
          <p className="text-xs text-muted-foreground">{altEtiket}</p>
        </div>
        <button type="button" className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Daha fazla">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function BolumIzleCard({ bolum, ilerlemePct }: { bolum: typeof BOLUMLER[number]; ilerlemePct: number }) {
  return (
    <Link
      href={`/bolumler/${bolum.no}`}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] transition hover:shadow-lg"
    >
      {/* Kart görseli */}
      <div className={`relative h-44 bg-gradient-to-br ${bolum.bg} flex items-center justify-center`}>
        <span className="text-7xl drop-shadow-sm" aria-hidden>{bolum.emoji}</span>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-foreground shadow hover:bg-white"
          aria-label="Favorilere ekle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
      {/* Kart bilgisi */}
      <div className="p-4">
        <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
          Bölüm {bolum.no}
        </span>
        <h3 className="mt-1.5 text-base font-bold text-foreground group-hover:text-violet-600 transition">
          {bolum.baslik}
        </h3>
        <p className="text-xs text-muted-foreground">{bolum.altBaslik}</p>
        <div className="mt-3 h-1.5 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${bolum.renk}`}
            style={{ width: `${ilerlemePct}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-muted-foreground">
            %{ilerlemePct} tamamlandı
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white">
            ✓
          </span>
        </div>
      </div>
    </Link>
  );
}

function IlerlemeBar({ bolum, ilerlemePct, passed }: { bolum: typeof BOLUMLER[number]; ilerlemePct: number; passed: boolean }) {
  return (
    <Link
      href={`/bolumler/${bolum.no}`}
      className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 hover:border-violet-300 hover:bg-[var(--color-bg-secondary)] transition"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${bolum.bg} text-lg`}>
        {bolum.ikon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Bölüm {bolum.no}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">%{ilerlemePct}</span>
        </div>
        <p className="text-sm font-semibold text-foreground truncate">{bolum.baslik}</p>
        <div className="mt-1.5 h-1.5 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${bolum.renk}`}
            style={{ width: `${ilerlemePct}%` }}
          />
        </div>
      </div>
      {passed && <span className="shrink-0 text-emerald-500">✓</span>}
    </Link>
  );
}

export default function OgrenciDashboard() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [studentModules, setStudentModules] = useState<StudentModule[]>([]);
  const [badgeDefs, setBadgeDefs] = useState<BadgeDef[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [bolumIlerlemeleri, setBolumIlerlemeleri] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: studentData } = await supabase
        .from("class_students")
        .select("nickname")
        .eq("user_id", data.user.id)
        .limit(1)
        .maybeSingle();
      if (studentData?.nickname) setNickname(studentData.nickname);
    });

    fetch("/api/student/modules")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.modules) setStudentModules(data.modules as StudentModule[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/badges")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setBadgeDefs(data.definitions ?? []);
          setEarnedBadges(data.earned ?? []);
        }
      })
      .catch(() => {});

    fetch("/api/student/teachers")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.teachers) setTeachers(data.teachers as Teacher[]);
      })
      .catch(() => {});

    try {
      const out: Record<number, number> = {};
      for (let no = 1; no <= 10; no++) {
        const raw = localStorage.getItem(`bolum-${no}-tamamlananlar`);
        const toplamRaw = localStorage.getItem(`bolum-${no}-toplam`);
        if (raw) {
          try {
            const arr = JSON.parse(raw) as string[];
            const toplam = toplamRaw ? Number(toplamRaw) : arr.length || 1;
            out[no] = Math.round((arr.length / Math.max(toplam, 1)) * 100);
          } catch {}
        }
      }
      setBolumIlerlemeleri(out);
    } catch {}
  }, []);

  const moduleMap = useMemo(() => new Map(studentModules.map((m) => [m.bolumNo, m])), [studentModules]);
  const assignedBolumler = studentModules.length > 0
    ? BOLUMLER.filter((b) => moduleMap.has(b.no))
    : BOLUMLER;

  const izleCards = useMemo(() => {
    const withProgress = assignedBolumler
      .map((b) => ({ b, p: bolumIlerlemeleri[b.no] ?? 0, passed: moduleMap.get(b.no)?.quizResult?.passed ?? false }))
      .filter(({ passed }) => !passed);
    withProgress.sort((a, b) => b.p - a.p);
    const cands = withProgress.length > 0 ? withProgress : assignedBolumler.map((b) => ({ b, p: 0, passed: false }));
    return cands.slice(0, 3);
  }, [assignedBolumler, bolumIlerlemeleri, moduleMap]);

  const ilerlemeler = useMemo(() => {
    return assignedBolumler.map((b) => ({
      b,
      p: bolumIlerlemeleri[b.no] ?? (moduleMap.get(b.no)?.quizResult?.passed ? 100 : 0),
      passed: moduleMap.get(b.no)?.quizResult?.passed ?? false,
    }));
  }, [assignedBolumler, bolumIlerlemeleri, moduleMap]);

  const tamamlananEtkinlik = Math.round(
    Math.min(
      TOPLAM_ETKINLIK,
      Object.values(bolumIlerlemeleri).reduce((acc, p) => acc + (p / 100) * 6, 0) // yaklaşık etkinlik sayısı
    )
  );
  const xpToplam = studentModules.reduce((acc, m) => acc + (m.quizResult?.score ?? 0), 0);
  const rozetSayisi = earnedBadges.length;
  const rozetToplam = badgeDefs.length || 3;

  const nextBolum = useMemo(() => {
    const pending = ilerlemeler.find((x) => !x.passed && x.p > 0) ?? ilerlemeler.find((x) => !x.passed);
    return pending?.b ?? assignedBolumler[0];
  }, [ilerlemeler, assignedBolumler]);

  const aktivite7Gun = [0, 0, 0, 0, 0, 0, 0]; // placeholder — ileride /api/student/activity

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen gap-6 p-4 sm:p-6 lg:p-8">
      {/* Ana içerik */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Arama */}
        <div className="relative lg:hidden">
          <input
            type="search"
            placeholder="Ders, bölüm veya etkinlik ara..."
            className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 pl-10 text-sm"
          />
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="relative hidden lg:block">
          <input
            type="search"
            placeholder="Ders, bölüm veya etkinlik ara..."
            className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* İstatistik kartları */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            sayi={tamamlananEtkinlik}
            toplam={TOPLAM_ETKINLIK}
            etiket="Etkinlik"
            altEtiket="Toplam ilerleme"
            ikon="🎯"
            renk="bg-violet-100 dark:bg-violet-950/40"
          />
          <StatCard
            sayi={xpToplam}
            etiket="XP"
            altEtiket="Kazanılan puan"
            ikon="⭐"
            renk="bg-amber-100 dark:bg-amber-950/40"
          />
          <StatCard
            sayi={rozetSayisi}
            toplam={rozetToplam}
            etiket="Rozet"
            altEtiket="Başarı madalyası"
            ikon="🏆"
            renk="bg-yellow-100 dark:bg-yellow-950/40"
          />
        </div>

        {/* Günün Hedefi */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 p-6 sm:p-8 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            Günün Hedefi
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
            Yapay Zeka Maceranı Sürdür 🚀
          </h2>
          <p className="mt-2 text-sm text-white/85 max-w-xl">
            Seviyeni atla, yeni rozetler kazan. Her bölüm yeni bir süper güç!
          </p>
          {nextBolum && (
            <Link
              href={`/bolumler/${nextBolum.no}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-violet-700 shadow transition hover:bg-white/90"
            >
              Keşfe Çık
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          )}
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* İzlemeye Devam Et */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">İzlemeye Devam Et</h3>
            <Link href="/bolumler" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {izleCards.map(({ b, p }) => (
              <BolumIzleCard key={b.no} bolum={b} ilerlemePct={p} />
            ))}
          </div>
        </section>

        {/* Bölüm İlerlemelerim */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">📚 Bölüm İlerlemelerim</h3>
            <Link href="/bolumler" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ilerlemeler.map(({ b, p, passed }) => (
              <IlerlemeBar key={b.no} bolum={b} ilerlemePct={p} passed={passed} />
            ))}
          </div>
        </section>
      </div>

      {/* Sağ widget panel */}
      <aside className="hidden xl:flex xl:w-72 shrink-0 flex-col gap-5">
        {/* Profilim */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">Profilim</h4>
            <button type="button" className="text-muted-foreground" aria-label="Daha fazla">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/20">
              <span className="text-4xl">🧑‍🎓</span>
            </div>
            <p className="mt-3 text-sm font-bold text-foreground">
              {greeting()} <span className="text-violet-600">{nickname ?? "Kâşif"}</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Yolculuğuna devam et ve hedefine ulaş
            </p>
            <div className="mt-3 flex items-center gap-3 text-muted-foreground">
              <button type="button" aria-label="Bildirimler" className="rounded-full border border-[var(--color-border)] p-1.5 hover:bg-[var(--color-bg-secondary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>
              <button type="button" aria-label="Mesajlar" className="rounded-full border border-[var(--color-border)] p-1.5 hover:bg-[var(--color-bg-secondary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </button>
              <button type="button" aria-label="Takvim" className="rounded-full border border-[var(--color-border)] p-1.5 hover:bg-[var(--color-bg-secondary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Haftalık Aktivite */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">Haftalık Aktivite</h4>
            <span className="text-[11px] text-muted-foreground">Son 7 gün</span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-1.5 h-24">
            {aktivite7Gun.map((v, i) => {
              const max = Math.max(...aktivite7Gun, 1);
              const h = v === 0 ? 8 : (v / max) * 100;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-md bg-gradient-to-t from-violet-100 to-violet-200 dark:from-violet-950/60 dark:to-violet-900/60"
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-muted-foreground">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span>Cmt</span>
            <span>Paz</span>
          </div>
        </div>

        {/* Öğretmenlerim */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-foreground">Öğretmenlerim</h4>
            <button
              type="button"
              aria-label="Ekle"
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] text-muted-foreground hover:bg-[var(--color-bg-secondary)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          {teachers.length === 0 ? (
            <p className="text-xs text-muted-foreground">Henüz atanmış öğretmen yok.</p>
          ) : (
            <ul className="space-y-2">
              {teachers.map((t) => {
                const initial = t.displayName?.charAt(0)?.toUpperCase() ?? "?";
                return (
                  <li key={t.id} className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-[var(--color-bg-secondary)]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-bold text-white">
                      {initial}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{t.displayName}</p>
                      {t.subject && <p className="text-[11px] text-muted-foreground truncate">{t.subject}</p>}
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold text-violet-700 hover:bg-violet-200 dark:bg-violet-950/40 dark:text-violet-300"
                    >
                      Takip Et
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
