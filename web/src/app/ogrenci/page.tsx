"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardSidebar, { SidebarItem } from "@/components/dashboard/DashboardSidebar";
import ProfilRing from "@/components/dashboard/ProfilRing";
import BarChart from "@/components/dashboard/BarChart";
import BolumIlerleme from "@/components/dashboard/BolumIlerleme";

type Progress = {
  activity_id?: string;
  activity_type?: string;
  score?: number;
  time_spent?: number;
  bolum?: number;
  timestamp?: string;
};

const BOLUMLER = [
  { no: 1, ad: "Yapay Zeka Nedir?", alt: "Keşif Yolculuğu", emoji: "🤖", renk: "from-sky-400 to-blue-500" },
  { no: 2, ad: "Günlük Hayatta YZ", alt: "YZ Etrafımızda", emoji: "📱", renk: "from-emerald-400 to-teal-500" },
  { no: 3, ad: "Verinin Gücü", alt: "YZ'nin Yakıtı", emoji: "📊", renk: "from-violet-400 to-purple-500" },
  { no: 4, ad: "Makineler Nasıl Öğrenir?", alt: "ML Temelleri", emoji: "🧠", renk: "from-orange-400 to-amber-500" },
  { no: 5, ad: "Üretken Yapay Zeka", alt: "YZ Araçları", emoji: "✨", renk: "from-pink-400 to-rose-500" },
];

const ICON = {
  home: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="m3 12 9-9 9 9M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dashboard: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a7 7 0 0 1 14 0v1" strokeLinecap="round" />
    </svg>
  ),
  award: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6" />
      <path d="m8.5 13-2 8 5.5-3 5.5 3-2-8" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function OgrenciDashboard() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [sonZiyaretler, setSonZiyaretler] = useState<{ bolum: number; slayt: number }[]>([]);

  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem("student_progress") || "[]");
      setProgress(localData);
    } catch {
      setProgress([]);
    }
    // Son ziyaret edilen bölümleri localStorage'dan topla
    try {
      const ziyaretler: { bolum: number; slayt: number }[] = [];
      for (let b = 1; b <= 10; b++) {
        const slayt = localStorage.getItem(`bolum-${b}-slide`);
        if (slayt !== null) {
          ziyaretler.push({ bolum: b, slayt: Number(slayt) });
        }
      }
      setSonZiyaretler(ziyaretler);
    } catch {}
  }, []);

  const totalScore = progress.reduce((acc, p) => acc + (p.score || 0), 0);
  const aktiviteSayisi = progress.length;
  const hedefYuzde = Math.min(Math.round((aktiviteSayisi / 62) * 100), 100);
  const rozetSayisi = aktiviteSayisi > 30 ? 3 : aktiviteSayisi > 10 ? 2 : aktiviteSayisi > 0 ? 1 : 0;

  const haftalikVeri = useMemo(() => {
    // Son 7 gün için aktivite sayısı
    const gunler = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
    const bugun = new Date();
    const bugunGun = (bugun.getDay() + 6) % 7; // Pazartesi = 0
    const sayilar = Array(7).fill(0);
    for (const p of progress) {
      if (!p.timestamp) continue;
      const d = new Date(p.timestamp);
      const fark = Math.floor((bugun.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (fark >= 0 && fark < 7) {
        const idx = (bugunGun - fark + 7) % 7;
        sayilar[idx]++;
      }
    }
    return gunler.map((g, i) => ({ etiket: g, deger: sayilar[i] }));
  }, [progress]);

  const devamEt = sonZiyaretler.length
    ? sonZiyaretler.slice(-3).reverse()
    : [{ bolum: 1, slayt: 0 }];

  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { label: "Ana Sayfa", href: "/", icon: ICON.home },
    { label: "Panelim", href: "/ogrenci", icon: ICON.dashboard, aktif: true },
    { label: "Bölümlerim", href: "/#bolumler", icon: ICON.book },
    {
      label: "Profil",
      icon: ICON.user,
      alt: [
        { label: "Hesap Bilgileri", href: "/ogrenci", icon: null },
        { label: "Rozetlerim", href: "/ogrenci#rozetler", icon: null },
        { label: "Aktivitelerim", href: "/ogrenci#aktiviteler", icon: null },
      ],
    },
    { label: "Başarılar", href: "/ogrenci#rozetler", icon: ICON.award },
    { label: "Ayarlar", href: "/ogrenci", icon: ICON.settings },
  ];

  const sidebar = (
    <DashboardSidebar
      items={sidebarItems}
      logoMetin="GençYZ"
      logoEmoji="🤖"
      kullaniciAd="Öğrenci"
      kullaniciRol="YZ Kâşifi"
    />
  );

  // Right rail
  const rightRail = (
    <div className="space-y-5">
      {/* Profil ring */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">Profilim</h3>
          <button
            type="button"
            className="cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Daha fazla"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
          </button>
        </div>
        <ProfilRing
          ad="Kâşif"
          selam="Günaydın"
          altMetin="Yolculuğuna devam et ve hedefine ulaş"
          avatarEmoji="🧑‍🎓"
          ilerleme={hedefYuzde}
        >
          <div className="mt-2 flex justify-center gap-2">
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-700"
              aria-label="Bildirim"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14V11a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-700"
              aria-label="Mesaj"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-700"
              aria-label="Takvim"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </ProfilRing>
      </section>

      {/* Haftalık aktivite grafiği */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold">Haftalık Aktivite</h3>
          <span className="text-xs text-slate-500">Son 7 gün</span>
        </div>
        <BarChart veri={haftalikVeri} />
      </section>

      {/* Öğretmenlerin / arkadaşların */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">Öğretmenlerim</h3>
          <button
            type="button"
            className="cursor-pointer rounded-full border border-slate-200 p-1 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            aria-label="Ekle"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {[
            { ad: "Dr. Murat Altun", rol: "BT Öğretmeni" },
            { ad: "Ayşe Yılmaz", rol: "Sınıf Öğretmeni" },
            { ad: "Mehmet Kaya", rol: "Matematik" },
            { ad: "Zeynep Demir", rol: "Fen Bilimleri" },
          ].map((k, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-bold text-white">
                {k.ad.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">{k.ad}</p>
                <p className="truncate text-[10px] text-slate-500">{k.rol}</p>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold text-violet-700 transition hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300"
              >
                Takip Et
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-3 w-full cursor-pointer rounded-xl bg-violet-50 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100 dark:bg-violet-900/20 dark:text-violet-300"
        >
          Tümünü Gör
        </button>
      </section>
    </div>
  );

  return (
    <DashboardLayout sidebar={sidebar} rightRail={rightRail}>
      {/* Üst bildirimler */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {[
          { ikon: "🎯", etiket: `${aktiviteSayisi}/62 Etkinlik`, aciklama: "Toplam ilerleme" },
          { ikon: "⭐", etiket: `${totalScore} XP`, aciklama: "Kazanılan puan" },
          { ikon: "🏆", etiket: `${rozetSayisi}/3 Rozet`, aciklama: "Başarı madalyası" },
        ].map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl dark:bg-violet-900/30">
              {n.ikon}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{n.etiket}</p>
              <p className="truncate text-xs text-slate-500">{n.aciklama}</p>
            </div>
            <button
              type="button"
              className="ml-auto cursor-pointer rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Daha fazla"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Hero CTA */}
      <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 p-6 sm:p-8 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Günün Hedefi
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
              Yapay Zeka Maceranı Sürdür 🚀
            </h2>
            <p className="mt-1 max-w-md text-sm text-white/90">
              Seviyeni atla, yeni rozetler kazan. Her bölüm yeni bir süper güç!
            </p>
          </div>
          <Link
            href={`/bolumler/${devamEt[0].bolum}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:scale-105"
          >
            Keşfe Çık
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition group-hover:translate-x-0.5">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* İzlemeye Devam Et */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">İzlemeye Devam Et</h3>
          <Link href="/#bolumler" className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {devamEt.map(({ bolum, slayt }) => {
            const b = BOLUMLER[bolum - 1] || BOLUMLER[0];
            const toplamSlayt = 21; // yaklaşık
            const yuzde = Math.round(((slayt + 1) / toplamSlayt) * 100);
            return (
              <Link
                key={bolum}
                href={`/bolumler/${bolum}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className={`relative aspect-[16/9] bg-gradient-to-br ${b.renk}`}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-90">
                    {b.emoji}
                  </div>
                  <div className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2.5">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="p-3">
                  <span className="mb-1 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                    BÖLÜM {bolum}
                  </span>
                  <h4 className="truncate text-sm font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {b.ad}
                  </h4>
                  <p className="truncate text-xs text-slate-500">{b.alt}</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
                      style={{ width: `${yuzde}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">%{yuzde} tamamlandı</span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-[9px] font-bold text-white">
                      👤
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bölüm İlerlemelerim */}
      <section id="ilerleme" className="mb-6">
        <BolumIlerleme baslik="📚 Bölüm İlerlemelerim" />
      </section>

      {/* Son Aktiviteler tablosu */}
      <section id="aktiviteler" className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">Son Aktivitelerin</h3>
          <Link href="#rozetler" className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Etkinlik</th>
                <th className="px-4 py-3 text-left font-bold">Tür</th>
                <th className="hidden px-4 py-3 text-left font-bold sm:table-cell">Süre</th>
                <th className="px-4 py-3 text-right font-bold">Puan</th>
              </tr>
            </thead>
            <tbody>
              {progress.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-500">
                    Henüz hiç etkinlik çözmedin!{" "}
                    <Link href="/#bolumler" className="font-semibold text-violet-600 hover:underline">
                      Maceraya başla →
                    </Link>
                  </td>
                </tr>
              ) : (
                progress
                  .slice(-6)
                  .reverse()
                  .map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-xs dark:bg-violet-900/30">
                            {p.activity_type === "quiz" ? "📝" : p.activity_type === "game" ? "🎮" : "⭐"}
                          </div>
                          <span className="font-medium">
                            {p.activity_id || "Etkinlik"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                          {p.activity_type || "etkinlik"}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                        {p.time_spent ? `${p.time_spent} sn` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          +{p.score || 0}
                        </span>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rozet Galerisi */}
      <section id="rozetler">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">Rozet Galerisi</h3>
          <span className="text-sm text-slate-500">{rozetSayisi}/3 kazandın</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { sart: 0, emoji: "⭐", ad: "İlk Adım", aciklama: "İlk etkinliğini tamamla" },
            { sart: 10, emoji: "🛡️", ad: "Kâşif", aciklama: "10 etkinlik tamamla" },
            { sart: 30, emoji: "🏅", ad: "Uzman", aciklama: "30 etkinlik tamamla" },
          ].map((r) => {
            const kazanildi = aktiviteSayisi > r.sart;
            return (
              <div
                key={r.ad}
                className={`rounded-2xl border-2 p-4 text-center transition ${
                  kazanildi
                    ? "border-violet-400 bg-gradient-to-br from-violet-50 to-indigo-50 dark:border-violet-600 dark:from-violet-900/30 dark:to-indigo-900/30"
                    : "border-slate-200 bg-slate-50 opacity-60 grayscale dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="text-3xl">{r.emoji}</div>
                <p className="mt-2 text-sm font-bold">{r.ad}</p>
                <p className="text-[10px] text-slate-500">{r.aciklama}</p>
                {kazanildi && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[9px] font-bold text-white">
                    ✓ Kazanıldı
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
}
