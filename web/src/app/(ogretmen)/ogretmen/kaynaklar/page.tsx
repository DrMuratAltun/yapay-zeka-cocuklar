"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardSidebar, { SidebarItem } from "@/components/dashboard/DashboardSidebar";
import SinifKarti from "@/components/dashboard/SinifKarti";
import YeniSinifModal from "@/components/dashboard/YeniSinifModal";

type Sinif = {
  id: string;
  name: string;
  access_code: string;
  credential_type: string;
  teacher_id: string;
  school_id: string;
  created_at: string;
  student_count: number;
};

const DERS_PLANI = [
  { bolum: 1, konu: "Yapay Zeka Nedir?", sinif: "6", saat: 4, emoji: "🤖", renk: "from-sky-400 to-blue-500" },
  { bolum: 2, konu: "Günlük Hayatta YZ", sinif: "6", saat: 4, emoji: "📱", renk: "from-emerald-400 to-teal-500" },
  { bolum: 3, konu: "Verinin Gücü", sinif: "6", saat: 4, emoji: "📊", renk: "from-violet-400 to-purple-500" },
  { bolum: 4, konu: "Makineler Nasıl Öğrenir?", sinif: "6-7", saat: 6, emoji: "🧠", renk: "from-orange-400 to-amber-500" },
  { bolum: 5, konu: "Üretken Yapay Zeka", sinif: "6-7", saat: 6, emoji: "✨", renk: "from-pink-400 to-rose-500" },
  { bolum: 6, konu: "Blok Tabanlı YZ Kodlama", sinif: "7", saat: 8, emoji: "🧩", renk: "from-blue-400 to-indigo-500" },
  { bolum: 7, konu: "Gerçek Hayat Problemleri", sinif: "7-8", saat: 8, emoji: "🌍", renk: "from-teal-400 to-cyan-500" },
  { bolum: 8, konu: "Dijital İçerik Üretimi", sinif: "7-8", saat: 6, emoji: "🎨", renk: "from-rose-400 to-pink-500" },
  { bolum: 9, konu: "YZ ve Etik", sinif: "7-8", saat: 4, emoji: "⚖️", renk: "from-amber-400 to-orange-500" },
  { bolum: 10, konu: "Gelecek Seninle Başlar", sinif: "8", saat: 8, emoji: "🚀", renk: "from-indigo-400 to-violet-500" },
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
  class: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinejoin="round" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinejoin="round" />
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
  link: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function OgretmenPaneli() {
  const [siniflar, setSiniflar] = useState<Sinif[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState<string | null>(null);
  const [modalAcik, setModalAcik] = useState(false);

  async function siniflariGetir() {
    setYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/schools/classes?my=true");
      if (!res.ok) {
        if (res.status === 403) {
          setHata(
            "Sınıf yönetim yetkin yok. Lütfen okul yöneticinle iletişime geç — 'teacher' rolüyle eşleştirilmen gerekiyor."
          );
        } else if (res.status === 401) {
          setHata("Giriş yapılmamış. Öğretmen hesabınla giriş yap.");
        } else {
          const d = await res.json().catch(() => ({}));
          setHata(d.error ?? "Sınıflar yüklenemedi.");
        }
        setSiniflar([]);
      } else {
        const data = await res.json();
        setSiniflar(data.classes ?? []);
      }
    } catch {
      setHata("Ağ hatası. Tekrar dene.");
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    siniflariGetir();
  }, []);

  const toplamOgrenci = siniflar.reduce((acc, s) => acc + s.student_count, 0);

  const sidebarItems: SidebarItem[] = [
    { label: "Ana Sayfa", href: "/", icon: ICON.home },
    { label: "Panelim", href: "/ogretmen", icon: ICON.dashboard, aktif: true },
    { label: "Sınıflarım", href: "/ogretmen#siniflar", icon: ICON.class },
    { label: "Ders Planı", href: "/ogretmen#ders-plani", icon: ICON.book },
    { label: "Kaynaklar", href: "/ogretmen#kaynaklar", icon: ICON.link },
    { label: "Profil", href: "/ogretmen", icon: ICON.user },
  ];

  const sidebar = (
    <DashboardSidebar
      items={sidebarItems}
      logoMetin="GençYZ"
      logoEmoji="🤖"
      kullaniciAd="Öğretmen"
      kullaniciRol="BT Öğretmeni"
    />
  );

  const rightRail = (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 p-4 text-white shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
          Hızlı Eylem
        </p>
        <h3 className="mt-1 text-lg font-extrabold">Yeni sınıf oluştur</h3>
        <p className="mt-1 text-xs text-white/90">
          Öğrencilerini sınıfına ekle, ilerlemelerini takip et.
        </p>
        <button
          type="button"
          onClick={() => setModalAcik(true)}
          className="mt-3 w-full cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 transition hover:scale-[1.02]"
        >
          ➕ Yeni Sınıf
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <h3 className="mb-3 text-sm font-bold">Özet</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Sınıf</p>
              <p className="text-xl font-extrabold text-violet-600">{siniflar.length}</p>
            </div>
            <span className="text-2xl">🏫</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Öğrenci</p>
              <p className="text-xl font-extrabold text-emerald-600">{toplamOgrenci}</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <h3 className="mb-2 text-sm font-bold">💡 İpucu</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Öğrencilerine sınıf kodunu yazdır veya duvara as. <Link href="/kolay-giris" className="font-semibold text-violet-600 hover:underline">/kolay-giris</Link> sayfasından koda gelirler.
        </p>
      </section>
    </div>
  );

  const ustSag = (
    <button
      type="button"
      onClick={() => setModalAcik(true)}
      className="hidden cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-violet-700 sm:flex"
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
      Yeni Sınıf
    </button>
  );

  return (
    <DashboardLayout sidebar={sidebar} rightRail={rightRail} ustSag={ustSag}>
      {/* Hero */}
      <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Öğretmen Paneli
            </p>
            <h1 className="mt-1 text-2xl font-extrabold md:text-3xl">
              Merhaba 👋
            </h1>
            <p className="mt-1 max-w-xl text-sm text-white/90">
              {siniflar.length > 0
                ? `${siniflar.length} sınıfın ve ${toplamOgrenci} öğrencinle yapay zeka maceranı yönet.`
                : "Başlamak için ilk sınıfını oluştur, öğrencilerini ekle."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalAcik(true)}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-full bg-white px-5 py-2 text-sm font-bold text-indigo-700 shadow-lg transition hover:scale-105"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Yeni Sınıf Oluştur
          </button>
        </div>
      </div>

      {/* Sınıflarım */}
      <section id="siniflar" className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold">🏫 Sınıflarım</h2>
            {siniflar.length > 0 && (
              <p className="text-xs text-slate-500">
                {siniflar.length} sınıf · toplam {toplamOgrenci} öğrenci
              </p>
            )}
          </div>
        </div>

        {yukleniyor ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : hata ? (
          <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-center dark:border-amber-800 dark:bg-amber-900/20">
            <div className="text-3xl">⚠️</div>
            <p className="mt-2 font-bold text-amber-800 dark:text-amber-300">Sınıflar yüklenemedi</p>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{hata}</p>
            <button
              type="button"
              onClick={siniflariGetir}
              className="mt-3 cursor-pointer rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              Tekrar Dene
            </button>
          </div>
        ) : siniflar.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="text-5xl">🏫</div>
            <p className="mt-3 text-lg font-bold">Henüz sınıfın yok</p>
            <p className="mt-1 text-sm text-slate-500">
              İlk sınıfını oluştur, öğrencilerini ekle, maceraya başla.
            </p>
            <button
              type="button"
              onClick={() => setModalAcik(true)}
              className="mt-4 cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              ➕ İlk Sınıfı Oluştur
            </button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siniflar.map((s, i) => (
              <SinifKarti
                key={s.id}
                id={s.id}
                ad={s.name}
                kod={s.access_code}
                girisTipi={s.credential_type}
                ogrenciSayisi={s.student_count}
                renkIdx={i}
              />
            ))}
            {/* Ekle kartı */}
            <button
              type="button"
              onClick={() => setModalAcik(true)}
              className="group flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-600 dark:hover:bg-violet-900/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-2xl group-hover:bg-violet-200 dark:bg-slate-800 dark:group-hover:bg-violet-900">
                ➕
              </div>
              <span className="text-sm font-bold">Yeni sınıf oluştur</span>
            </button>
          </div>
        )}
      </section>

      {/* Ders Planı (kompakt) */}
      <section id="ders-plani" className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">📚 Ders Planı</h2>
          <span className="text-xs text-slate-500">10 bölüm · toplam 58 ders saati</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <tr>
                <th className="px-3 py-2.5 text-left font-bold">Bölüm</th>
                <th className="px-3 py-2.5 text-left font-bold">Konu</th>
                <th className="hidden px-3 py-2.5 text-center font-bold sm:table-cell">Sınıf</th>
                <th className="px-3 py-2.5 text-center font-bold">Saat</th>
                <th className="px-3 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {DERS_PLANI.map((d) => (
                <tr
                  key={d.bolum}
                  className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-3 py-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white ${d.renk}`}>
                      {d.bolum}
                    </div>
                  </td>
                  <td className="px-3 py-2 font-medium">
                    <span className="mr-1" aria-hidden="true">{d.emoji}</span>
                    {d.konu}
                  </td>
                  <td className="hidden px-3 py-2 text-center text-slate-500 sm:table-cell">{d.sinif}. Sınıf</td>
                  <td className="px-3 py-2 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      {d.saat}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Link
                      href={`/bolumler/${d.bolum}`}
                      className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700 transition hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300"
                    >
                      Aç →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kaynaklar */}
      <section id="kaynaklar" className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">🔗 Faydalı Kaynaklar</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { ad: "MEB BTY Müfredatı", aciklama: "Bilişim Teknolojileri öğretim programı", url: "https://mufredat.meb.gov.tr/", icon: "🇹🇷" },
            { ad: "AI4K12.org", aciklama: "K-12 için yapay zekanın 5 büyük fikri", url: "https://ai4k12.org/", icon: "🎓" },
            { ad: "MIT Day of AI", aciklama: "MIT'nin YZ okuryazarlığı müfredatı", url: "https://dayofai.org/", icon: "📅" },
            { ad: "Teachable Machine", aciklama: "Kodsuz ML model eğitimi", url: "https://teachablemachine.withgoogle.com/", icon: "🧪" },
            { ad: "PictoBlox", aciklama: "Blok tabanlı YZ kodlama", url: "https://thestempedia.com/product/pictoblox/", icon: "🧩" },
            { ad: "İletişim", aciklama: "emurataltun@gmail.com", url: "mailto:emurataltun@gmail.com", icon: "✉️" },
          ].map((k) => (
            <a
              key={k.ad}
              href={k.url}
              target={k.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-2xl">{k.icon}</span>
              <div>
                <p className="text-sm font-bold">{k.ad}</p>
                <p className="text-xs text-slate-500">{k.aciklama}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Modal */}
      <YeniSinifModal
        acik={modalAcik}
        kapat={() => setModalAcik(false)}
        olusturuldu={() => {
          setModalAcik(false);
          siniflariGetir();
        }}
      />
    </DashboardLayout>
  );
}
