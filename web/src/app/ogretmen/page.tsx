import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Öğretmen Paneli | Yapay Zeka Macerası",
  description:
    "BT öğretmenleri için yapay zeka ders planları, rubrikler, etkinlik kartları ve ek kaynaklar.",
};

const dersPlanlari = [
  {
    bolum: 1,
    konu: "Yapay Zeka Nedir?",
    sinif: "6. Sınıf",
    saat: 4,
    kazanimlar: "YZ tanımı, tarihçe, türler",
    materyaller: "Kim Daha Zeki kartları, YZ Dedektifi formu",
    renk: "from-sky-400 to-blue-500",
  },
  {
    bolum: 2,
    konu: "Günlük Hayatta YZ",
    sinif: "6. Sınıf",
    saat: 4,
    kazanimlar: "YZ kullanım alanları",
    materyaller: "YZ Haritası, YZ veya Değil kartları",
    renk: "from-emerald-400 to-teal-500",
  },
  {
    bolum: 3,
    konu: "Verinin Gücü",
    sinif: "6. Sınıf",
    saat: 4,
    kazanimlar: "Veri türleri, büyük veri, KVKK",
    materyaller: "Girdi Avcıları, Sınıf Anketi",
    renk: "from-violet-400 to-purple-500",
  },
  {
    bolum: 4,
    konu: "Makineler Nasıl Öğrenir?",
    sinif: "6-7. Sınıf",
    saat: 6,
    kazanimlar: "ML türleri, Teachable Machine",
    materyaller: "Meyve Sınıflandırıcı, TM Rehberi",
    renk: "from-orange-400 to-amber-500",
  },
  {
    bolum: 5,
    konu: "Üretken Yapay Zeka",
    sinif: "6-7. Sınıf",
    saat: 6,
    kazanimlar: "LLM, prompt, halüsinasyon, etik",
    materyaller: "Prompt Düellosu, Etik Senaryolar",
    renk: "from-pink-400 to-rose-500",
  },
  {
    bolum: 6,
    konu: "Blok Tabanlı YZ Kodlama",
    sinif: "7. Sınıf",
    saat: 8,
    kazanimlar: "PictoBlox, ML for Kids",
    materyaller: "Algoritma Şefi, PictoBlox Rehberi",
    renk: "from-blue-400 to-indigo-500",
  },
  {
    bolum: 7,
    konu: "Gerçek Hayat Problemleri",
    sinif: "7-8. Sınıf",
    saat: 8,
    kazanimlar: "Tasarım düşüncesi, STEM",
    materyaller: "Proje Planlama, Geri Bildirim",
    renk: "from-teal-400 to-cyan-500",
  },
  {
    bolum: 8,
    konu: "Dijital İçerik Üretimi",
    sinif: "7-8. Sınıf",
    saat: 6,
    kazanimlar: "Görüntü üretme, Canva AI",
    materyaller: "Yapay mı Gerçek mi, Dijital Hikaye",
    renk: "from-rose-400 to-pink-500",
  },
  {
    bolum: 9,
    konu: "YZ ve Etik",
    sinif: "7-8. Sınıf",
    saat: 4,
    kazanimlar: "Etik ilkeler, deepfake, önyargı",
    materyaller: "YZ Mahkemesi, Etik Pusula",
    renk: "from-amber-400 to-orange-500",
  },
  {
    bolum: 10,
    konu: "Gelecek Seninle Başlar",
    sinif: "8. Sınıf",
    saat: 8,
    kazanimlar: "Final projesi, portfolyo",
    materyaller: "Proje Planlama, Sertifika",
    renk: "from-indigo-400 to-violet-500",
  },
];

const rubrik = [
  {
    kriter: "Kavramsal Anlama",
    b1: "Temel YZ kavramlarını tanıyamaz",
    b2: "Bazı kavramları tanır ancak açıklayamaz",
    b3: "Kavramları doğru açıklar ve örneklendirir",
    b4: "Kavramları derinlemesine açıklar, ilişkilendirir ve yeni durumlara uygular",
  },
  {
    kriter: "Uygulama Becerisi",
    b1: "Araçları rehberle bile kullanamaz",
    b2: "Rehber eşliğinde basit görevleri tamamlar",
    b3: "Araçları bağımsız kullanır, proje geliştirir",
    b4: "Araçları yaratıcı şekilde kullanır, özgün projeler üretir",
  },
  {
    kriter: "İşbirliği",
    b1: "Grup çalışmasına katılmaz",
    b2: "Sınırlı katkı sağlar",
    b3: "Aktif katılır, görev paylaşır",
    b4: "Liderlik eder, akranlarına destek olur",
  },
  {
    kriter: "Etik Farkındalık",
    b1: "Etik sorunları fark edemez",
    b2: "Bazı etik sorunları tanır",
    b3: "Etik boyutları değerlendirir, çözüm önerir",
    b4: "Etik analiz yapar, toplumsal etkiyi sorgular ve savunuculuk eder",
  },
  {
    kriter: "Sunum/İletişim",
    b1: "Fikirlerini ifade edemez",
    b2: "Basit düzeyde sunar",
    b3: "Açık ve düzenli sunar, görsellerle destekler",
    b4: "Etkili sunar, izleyiciyi bağlar, dijital araçları ustalıkla kullanır",
  },
];

const yillikPlan = [
  {
    ay: "Eylül - Ekim",
    bolumler: "Bölüm 1-3",
    tema: "Temel Kavramlar",
    aciklama: "YZ tanımı, günlük hayatta YZ ve verinin gücü",
    renk: "from-sky-500 to-blue-600",
    icon: "🌱",
  },
  {
    ay: "Kasım - Aralık",
    bolumler: "Bölüm 4-5",
    tema: "Uygulama",
    aciklama: "Makine öğrenimi ve üretken YZ deneyimleri",
    renk: "from-orange-500 to-amber-600",
    icon: "🧪",
  },
  {
    ay: "Ocak - Şubat",
    bolumler: "Bölüm 6-7",
    tema: "Kodlama + STEM",
    aciklama: "Blok tabanlı YZ kodlama ve gerçek hayat projeleri",
    renk: "from-blue-500 to-indigo-600",
    icon: "💻",
  },
  {
    ay: "Mart - Nisan",
    bolumler: "Bölüm 8-9",
    tema: "Yaratıcılık + Etik",
    aciklama: "Dijital içerik üretimi ve YZ etiği",
    renk: "from-pink-500 to-rose-600",
    icon: "🎨",
  },
  {
    ay: "Mayıs - Haziran",
    bolumler: "Bölüm 10",
    tema: "Proje + Portfolyo",
    aciklama: "Final projesi, sunum ve portfolyo oluşturma",
    renk: "from-indigo-500 to-violet-600",
    icon: "🏆",
  },
];

const faydaliLinkler = [
  {
    ad: "MEB BTY Müfredatı",
    aciklama: "Bilişim Teknolojileri ve Yazılım dersi öğretim programı",
    url: "https://mufredat.meb.gov.tr/",
    icon: "🇹🇷",
  },
  {
    ad: "AI4K12.org - Five Big Ideas",
    aciklama: "K-12 için yapay zekanın 5 büyük fikri çerçevesi",
    url: "https://ai4k12.org/",
    icon: "🎓",
  },
  {
    ad: "MIT Day of AI",
    aciklama: "MIT'nin YZ okuryazarlığı müfredatı ve etkinlikleri",
    url: "https://dayofai.org/",
    icon: "📅",
  },
  {
    ad: "Teachable Machine",
    aciklama: "Google'ın kodsuz makine öğrenimi model eğitim aracı",
    url: "https://teachablemachine.withgoogle.com/",
    icon: "🧪",
  },
  {
    ad: "PictoBlox",
    aciklama: "Blok tabanlı yapay zeka kodlama platformu",
    url: "https://thestempedia.com/product/pictoblox/",
    icon: "🧩",
  },
  {
    ad: "ML for Kids",
    aciklama: "Scratch ile makine öğrenimi projeleri geliştirme aracı",
    url: "https://machinelearningforkids.co.uk/",
    icon: "🐱",
  },
];

export default function OgretmenPaneli() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-violet-400/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-400/10 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            BT Öğretmenleri İçin
          </div>
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Öğretmen Paneli
          </h1>
          <p className="mx-auto max-w-xl text-lg text-indigo-100">
            Ders planları, rubrikler ve ek kaynaklar
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        {/* Ders Planı Tablosu */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-extrabold">Ders Planı Tablosu</h2>
            <p className="text-[var(--color-text-secondary)]">
              Her bölüm için önerilen ders planı, kazanımlar ve materyaller
            </p>
          </div>

          {/* Desktop tablo */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[var(--color-border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-bg-secondary)]">
                  <th className="px-4 py-3 text-left font-bold">Bölüm</th>
                  <th className="px-4 py-3 text-left font-bold">Konu</th>
                  <th className="px-4 py-3 text-left font-bold">Sınıf</th>
                  <th className="px-4 py-3 text-center font-bold">Ders Saati</th>
                  <th className="px-4 py-3 text-left font-bold">Kazanımlar</th>
                  <th className="px-4 py-3 text-left font-bold">Materyaller</th>
                </tr>
              </thead>
              <tbody>
                {dersPlanlari.map((d) => (
                  <tr
                    key={d.bolum}
                    className="border-t border-[var(--color-border)] transition hover:bg-[var(--color-bg-secondary)]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/bolumler/${d.bolum}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r text-xs font-bold text-white"
                        style={{}}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${d.renk} text-white font-bold text-xs`}
                        >
                          {d.bolum}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/bolumler/${d.bolum}`}
                        className="hover:text-indigo-600 transition"
                      >
                        {d.konu}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                      {d.sinif}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {d.saat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                      {d.kazanimlar}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                      {d.materyaller}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil kartlar */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {dersPlanlari.map((d) => (
              <Link
                key={d.bolum}
                href={`/bolumler/${d.bolum}`}
                className="card-hover overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]"
              >
                <div className={`h-1.5 bg-gradient-to-r ${d.renk}`} />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r ${d.renk} text-xs font-bold text-white`}
                    >
                      {d.bolum}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {d.sinif} &middot; {d.saat} saat
                    </span>
                  </div>
                  <h3 className="font-bold">{d.konu}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    <strong className="text-[var(--color-text)]">Kazanımlar:</strong>{" "}
                    {d.kazanimlar}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    <strong className="text-[var(--color-text)]">Materyaller:</strong>{" "}
                    {d.materyaller}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Değerlendirme Rubriği */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-extrabold">
              Değerlendirme Rubriği
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Proje ve etkinlik değerlendirmesi için kullanılabilecek örnek rubrik
            </p>
          </div>

          {/* Desktop tablo */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-[var(--color-border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-bg-secondary)]">
                  <th className="px-4 py-3 text-left font-bold">Kriter</th>
                  <th className="px-4 py-3 text-center font-bold">
                    <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                      1 - Başlangıç
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-bold">
                    <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                      2 - Gelişmekte
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-bold">
                    <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                      3 - Yeterli
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center font-bold">
                    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      4 - İleri
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rubrik.map((r) => (
                  <tr
                    key={r.kriter}
                    className="border-t border-[var(--color-border)]"
                  >
                    <td className="px-4 py-3 font-bold">{r.kriter}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">
                      {r.b1}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">
                      {r.b2}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">
                      {r.b3}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">
                      {r.b4}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil kartlar */}
          <div className="space-y-4 md:hidden">
            {rubrik.map((r) => (
              <div
                key={r.kriter}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 space-y-3"
              >
                <h3 className="font-bold text-lg">{r.kriter}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { sev: "1 - Başlangıç", deger: r.b1, renk: "border-red-300 dark:border-red-800" },
                    { sev: "2 - Gelişmekte", deger: r.b2, renk: "border-amber-300 dark:border-amber-800" },
                    { sev: "3 - Yeterli", deger: r.b3, renk: "border-sky-300 dark:border-sky-800" },
                    { sev: "4 - İleri", deger: r.b4, renk: "border-emerald-300 dark:border-emerald-800" },
                  ].map((s) => (
                    <div
                      key={s.sev}
                      className={`rounded-xl border-2 ${s.renk} p-2.5`}
                    >
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                        {s.sev}
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {s.deger}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yıllık Plan Önerisi */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-extrabold">
              Yıllık Plan Önerisi
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Ders yılı boyunca bölümlerin dağılımı için önerilen zaman çizelgesi
            </p>
          </div>

          <div className="relative space-y-0">
            {/* Dikey çizgi */}
            <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-sky-400 via-indigo-500 to-violet-500 sm:block" />

            <div className="space-y-4">
              {yillikPlan.map((p, i) => (
                <div key={p.ay} className="relative flex gap-5">
                  {/* Nokta */}
                  <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${p.renk} text-xl shadow-lg`}
                    >
                      {p.icon}
                    </span>
                  </div>

                  {/* İçerik */}
                  <div className="card-hover flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="sm:hidden text-2xl">{p.icon}</span>
                      <h3 className="font-extrabold text-lg">{p.ay}</h3>
                      <span
                        className={`rounded-full bg-gradient-to-r ${p.renk} px-3 py-0.5 text-xs font-bold text-white`}
                      >
                        {p.bolumler}
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                        {p.tema}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {p.aciklama}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faydalı Bağlantılar */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-extrabold">
              Faydalı Bağlantılar
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              YZ eğitimi için önerilen dış kaynaklar ve platformlar
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faydaliLinkler.map((l) => (
              <a
                key={l.ad}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
              >
                <span className="text-3xl">{l.icon}</span>
                <div>
                  <h4 className="font-bold">{l.ad}</h4>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {l.aciklama}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* İletişim */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-extrabold">İletişim</h2>
          <p className="mb-4 text-indigo-100">
            Sorularınız veya önerileriniz için:
          </p>
          <a
            href="mailto:emurataltun@gmail.com"
            className="inline-block rounded-lg bg-white px-6 py-2.5 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            emurataltun@gmail.com
          </a>
        </section>

        <div className="pt-2">
          <Link
            href="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            &larr; Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    </div>
  );
}
