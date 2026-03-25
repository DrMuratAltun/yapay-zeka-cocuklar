import Link from "next/link";

const bolumler = [
  {
    no: 1,
    baslik: "Yapay Zeka Nedir?",
    altBaslik: "Kesif Yolculugu",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-sky-500",
    hazir: true,
  },
  {
    no: 2,
    baslik: "Gunluk Hayatta YZ",
    altBaslik: "Yapay Zeka Etrafimizda",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-emerald-500",
    hazir: true,
  },
  {
    no: 3,
    baslik: "Verinin Gucu",
    altBaslik: "YZ'nin Yakiti",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-violet-500",
    hazir: true,
  },
  {
    no: 4,
    baslik: "Makineler Nasil Ogrenir?",
    altBaslik: "Makine Ogrenimi Temelleri",
    seviye: "6-7. Sinif",
    ders: 6,
    renk: "bg-orange-500",
    hazir: true,
  },
  {
    no: 5,
    baslik: "Uretken Yapay Zeka",
    altBaslik: "YZ Araclariyla Tanisin",
    seviye: "6-7. Sinif",
    ders: 6,
    renk: "bg-pink-500",
    hazir: true,
  },
  {
    no: 6,
    baslik: "Blok Tabanli YZ Kodlama",
    altBaslik: "PictoBlox Projeleri",
    seviye: "7. Sinif",
    ders: 8,
    renk: "bg-blue-600",
    hazir: false,
  },
  {
    no: 7,
    baslik: "Gercek Hayat Problemleri",
    altBaslik: "STEM Tabanli YZ Cozumleri",
    seviye: "7-8. Sinif",
    ders: 8,
    renk: "bg-teal-500",
    hazir: false,
  },
  {
    no: 8,
    baslik: "Dijital Icerik Uretimi",
    altBaslik: "YZ ile Yaraticilik",
    seviye: "7-8. Sinif",
    ders: 6,
    renk: "bg-rose-500",
    hazir: false,
  },
  {
    no: 9,
    baslik: "YZ ve Etik",
    altBaslik: "Dogru Kullanimin Pusulasi",
    seviye: "7-8. Sinif",
    ders: 4,
    renk: "bg-amber-600",
    hazir: false,
  },
  {
    no: 10,
    baslik: "Gelecek Seninle Baslar",
    altBaslik: "Proje ve Portfolyo",
    seviye: "8. Sinif",
    ders: 8,
    renk: "bg-indigo-600",
    hazir: false,
  },
];

const ozellikler = [
  {
    icon: "📖",
    baslik: "10 Bolum",
    aciklama: "Temel kavramlardan ileri projelere kademeli ilerleme",
  },
  {
    icon: "🎮",
    baslik: "Uygulamali",
    aciklama: "Her bolumde bilgisayarli ve bilgisayarsiz etkinlikler",
  },
  {
    icon: "🎥",
    baslik: "Video Egitimler",
    aciklama: "Adim adim nasil yapilir videolari",
  },
  {
    icon: "📱",
    baslik: "QR Kodlar",
    aciklama: "Kitaptan dogrudan interaktif etkinliklere erisim",
  },
  {
    icon: "🖨️",
    baslik: "Yazici Dostu",
    aciklama: "Etkinlik sayfalari ve formlar PDF indirilebilir",
  },
  {
    icon: "🏫",
    baslik: "MEB Uyumlu",
    aciklama: "BTY 6. sinif 5. Tema kazanimlariyla uyumlu",
  },
];

const araclar = [
  {
    ad: "Google Teachable Machine",
    url: "https://teachablemachine.withgoogle.com/",
    aciklama: "Kodsuz ML model egitimi",
    icon: "🧪",
  },
  {
    ad: "PictoBlox",
    url: "https://thestempedia.com/product/pictoblox/",
    aciklama: "Blok tabanli YZ kodlama",
    icon: "🧩",
  },
  {
    ad: "Scratch",
    url: "https://scratch.mit.edu/",
    aciklama: "Blok tabanli kodlama",
    icon: "🐱",
  },
  {
    ad: "ML for Kids",
    url: "https://machinelearningforkids.co.uk/",
    aciklama: "Makine ogrenimi projeleri",
    icon: "🎓",
  },
  {
    ad: "Canva",
    url: "https://canva.com/",
    aciklama: "YZ destekli gorsel tasarim",
    icon: "🎨",
  },
  {
    ad: "ChatGPT / Gemini",
    url: "https://chatgpt.com/",
    aciklama: "Uretken YZ deneyimi",
    icon: "💬",
  },
];

export default function AnaSayfa() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 text-white">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="pulse-bg absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="pulse-bg absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="pulse-bg absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        {/* Floating emojis */}
        <div className="pointer-events-none absolute inset-0">
          <div className="float-1 absolute top-12 left-[8%] text-5xl opacity-20 md:text-7xl md:opacity-30">🤖</div>
          <div className="float-2 absolute top-16 right-[12%] text-4xl opacity-20 md:text-6xl md:opacity-25">🧠</div>
          <div className="float-3 absolute bottom-16 left-[20%] text-4xl opacity-15 md:text-5xl md:opacity-20">💡</div>
          <div className="float-4 absolute bottom-24 right-[18%] text-3xl opacity-15 md:text-5xl md:opacity-20">🚀</div>
          <div className="float-5 absolute top-1/2 left-[5%] text-3xl opacity-10 md:text-4xl md:opacity-15">⚡</div>
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <div className="slide-up">
            <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm font-medium tracking-wide text-sky-100 backdrop-blur-sm">
              Ortaokul Ogrencileri Icin &middot; 6-8. Sinif
            </p>
          </div>
          <h1 className="slide-up slide-up-delay-1 mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
            Yapay Zeka
            <br />
            <span className="gradient-text">Macerasi</span>
          </h1>
          <p className="slide-up slide-up-delay-2 mx-auto mb-10 max-w-xl text-lg leading-relaxed text-blue-100/90">
            Kesfet, ogren, uygula! Uygulamali ve eglenceli yapay zeka egitim kitabi ve interaktif platform.
          </p>
          <div className="slide-up slide-up-delay-3 flex flex-wrap justify-center gap-4">
            <a
              href="#bolumler"
              className="rounded-full bg-white px-8 py-3.5 font-bold text-indigo-700 shadow-lg shadow-indigo-900/30 transition hover:scale-105 hover:shadow-xl"
            >
              Bolumleri Kesfet
            </a>
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              GitHub&apos;da Incele
            </a>
          </div>

          {/* Stats */}
          <div className="slide-up slide-up-delay-3 mt-16 flex flex-wrap justify-center gap-8 text-sm md:gap-16">
            {[
              { sayi: "10", etiket: "Bolum" },
              { sayi: "50+", etiket: "Etkinlik" },
              { sayi: "30+", etiket: "Video" },
              { sayi: "100%", etiket: "Ucretsiz" },
            ].map((s) => (
              <div key={s.etiket}>
                <div className="text-3xl font-extrabold">{s.sayi}</div>
                <div className="text-blue-200">{s.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Ozellikler */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-4 text-center text-3xl font-extrabold">
          Bu Kitapta Neler Var?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--color-text-secondary)]">
          Her seviyeye uygun, adim adim ilerleyen, uygulamali yapay zeka egitimi
        </p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {ozellikler.map((o) => (
            <div
              key={o.baslik}
              className="card-hover rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center"
            >
              <div className="mb-4 text-5xl">{o.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{o.baslik}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {o.aciklama}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bolumler */}
      <section id="bolumler" className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 text-center text-3xl font-extrabold">
            Kitap Bolumleri
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-[var(--color-text-secondary)]">
            6. siniftan 8. sinifa kademeli ilerleyen 10 bolum
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {bolumler.map((bolum) => {
              const cls = `card-hover group flex gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 ${
                bolum.hazir ? "cursor-pointer" : "cursor-default opacity-75"
              }`;
              const inner = (
                <>
                  <div className={`number-badge ${bolum.renk}`}>
                    {bolum.no}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                        {bolum.seviye}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {bolum.ders} ders saati
                      </span>
                      {bolum.hazir ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                          Hazir
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Yakin zamanda
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold group-hover:text-sky-600 transition-colors">
                      {bolum.baslik}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {bolum.altBaslik}
                    </p>
                  </div>
                </>
              );
              return bolum.hazir ? (
                <Link key={bolum.no} href={`/bolumler/${bolum.no}`} className={cls}>
                  {inner}
                </Link>
              ) : (
                <div key={bolum.no} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Araclar */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 text-center text-3xl font-extrabold">
            Kullanacagimiz Araclar
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-[var(--color-text-secondary)]">
            Tumunu ucretsiz, hepsi web tabanli
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {araclar.map((arac) => (
              <a
                key={arac.ad}
                href={arac.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
              >
                <span className="text-3xl">{arac.icon}</span>
                <div>
                  <h4 className="font-bold">{arac.ad}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {arac.aciklama}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hedef Kitle */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-extrabold">Bu Kitap Kimin Icin?</h2>
          <div className="grid gap-6 text-left sm:grid-cols-3">
            {[
              {
                baslik: "Ogrenciler",
                icon: "🎒",
                aciklama:
                  "6-8. sinif ogrencileri. Yapay zekayi ogrenmek, denemek ve proje gelistirmek isteyenler.",
              },
              {
                baslik: "Ogretmenler",
                icon: "👩‍🏫",
                aciklama:
                  "BT ogretmenleri. Hazir ders planlari, etkinlik kartlari ve degerlendirme araclari.",
              },
              {
                baslik: "Aileler",
                icon: "👨‍👩‍👧‍👦",
                aciklama:
                  "Cocuklariyla birlikte yapay zekayi kesfetmek isteyen merakli aileler.",
              },
            ].map((k) => (
              <div
                key={k.baslik}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-3 text-4xl">{k.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{k.baslik}</h3>
                <p className="text-sm leading-relaxed text-blue-100">
                  {k.aciklama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-lg font-extrabold">
                Yapay Zeka Macerasi
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Dr. Murat ALTUN
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] transition hover:text-sky-600"
              >
                CC BY-NC-SA 4.0
              </a>
              <a
                href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] transition hover:text-sky-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
