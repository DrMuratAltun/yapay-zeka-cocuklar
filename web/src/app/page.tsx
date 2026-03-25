const bolumler = [
  {
    no: 1,
    baslik: "Yapay Zeka Nedir?",
    altBaslik: "Kesif Yolculugu",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-sky-500",
    emoji: "🤖",
  },
  {
    no: 2,
    baslik: "Gunluk Hayatta YZ",
    altBaslik: "Yapay Zeka Etrafimizda",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-emerald-500",
    emoji: "🏠",
  },
  {
    no: 3,
    baslik: "Verinin Gucu",
    altBaslik: "YZ'nin Yakiti",
    seviye: "6. Sinif",
    ders: 4,
    renk: "bg-violet-500",
    emoji: "📊",
  },
  {
    no: 4,
    baslik: "Makineler Nasil Ogrenir?",
    altBaslik: "Makine Ogrenimi",
    seviye: "6-7. Sinif",
    ders: 6,
    renk: "bg-orange-500",
    emoji: "🧠",
  },
  {
    no: 5,
    baslik: "Uretken Yapay Zeka",
    altBaslik: "YZ Araclariyla Tanisin",
    seviye: "6-7. Sinif",
    ders: 6,
    renk: "bg-pink-500",
    emoji: "✨",
  },
  {
    no: 6,
    baslik: "Blok Tabanli YZ Kodlama",
    altBaslik: "PictoBlox Projeleri",
    seviye: "7. Sinif",
    ders: 8,
    renk: "bg-blue-600",
    emoji: "🧩",
  },
  {
    no: 7,
    baslik: "Gercek Hayat Problemleri",
    altBaslik: "YZ Cozumleri",
    seviye: "7-8. Sinif",
    ders: 8,
    renk: "bg-teal-500",
    emoji: "🌍",
  },
  {
    no: 8,
    baslik: "Dijital Icerik Uretimi",
    altBaslik: "YZ ile Yaraticilik",
    seviye: "7-8. Sinif",
    ders: 6,
    renk: "bg-rose-500",
    emoji: "🎨",
  },
  {
    no: 9,
    baslik: "YZ ve Etik",
    altBaslik: "Dogru Kullanimn Pusulasi",
    seviye: "7-8. Sinif",
    ders: 4,
    renk: "bg-amber-600",
    emoji: "⚖️",
  },
  {
    no: 10,
    baslik: "Gelecek Seninle Baslar",
    altBaslik: "Proje ve Portfolyo",
    seviye: "8. Sinif",
    ders: 8,
    renk: "bg-indigo-600",
    emoji: "🚀",
  },
];

export default function AnaSayfa() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🤖</div>
          <div className="absolute top-20 right-20 text-6xl">🧠</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">💡</div>
          <div className="absolute bottom-20 right-10 text-5xl">🚀</div>
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-sky-200">
            Ortaokul Ogrencileri Icin (6-8. Sinif)
          </p>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Yapay Zeka
            <br />
            <span className="text-amber-300">Macerasi</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-sky-100">
            Uygulamali, eglenceli ve MEB uyumlu yapay zeka egitim kitabi.
            Kesfet, ogren, uygula!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#bolumler"
              className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-sky-50"
            >
              Bolumleri Kesfet
            </a>
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Ozellikler */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "📖",
              baslik: "10 Bolum",
              aciklama:
                "Temel kavramlardan ileri projelere kademeli ilerleme",
            },
            {
              icon: "🎮",
              baslik: "Uygulamali",
              aciklama:
                "Her bolumde bilgisayarli ve bilgisayarsiz etkinlikler",
            },
            {
              icon: "🎥",
              baslik: "Video Egitimler",
              aciklama: "Adim adim 'nasil yapilir' videolari",
            },
            {
              icon: "📱",
              baslik: "QR Kodlar",
              aciklama:
                "Kitaptan dogrudan interaktif etkinliklere erisim",
            },
            {
              icon: "🖨️",
              baslik: "Yazici Dostu",
              aciklama:
                "Etkinlik sayfalari ve formlar PDF indirilebilir",
            },
            {
              icon: "🏫",
              baslik: "MEB Uyumlu",
              aciklama:
                "BTY 6. sinif 5. Tema kazanimlariyla uyumlu",
            },
          ].map((ozellik) => (
            <div
              key={ozellik.baslik}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center"
            >
              <div className="mb-3 text-4xl">{ozellik.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{ozellik.baslik}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {ozellik.aciklama}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bolumler */}
      <section
        id="bolumler"
        className="mx-auto max-w-5xl px-6 py-16"
      >
        <h2 className="mb-12 text-center text-3xl font-extrabold">
          Kitap Bolumleri
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {bolumler.map((bolum) => (
            <a
              key={bolum.no}
              href={`/bolumler/${bolum.no}`}
              className="group flex gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition hover:shadow-lg hover:border-sky-300"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${bolum.renk}`}
              >
                {bolum.emoji}
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                    BOLUM {bolum.no}
                  </span>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                    {bolum.seviye}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {bolum.ders} ders saati
                  </span>
                </div>
                <h3 className="font-bold group-hover:text-sky-600">
                  {bolum.baslik}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {bolum.altBaslik}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Araclar */}
      <section className="bg-[var(--color-bg-secondary)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-center text-3xl font-extrabold">
            Kullanacagimiz Araclar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                ad: "Google Teachable Machine",
                url: "https://teachablemachine.withgoogle.com/",
                aciklama: "Kodsuz ML model egitimi",
              },
              {
                ad: "PictoBlox",
                url: "https://thestempedia.com/product/pictoblox/",
                aciklama: "Blok tabanli YZ kodlama",
              },
              {
                ad: "Scratch",
                url: "https://scratch.mit.edu/",
                aciklama: "Blok tabanli kodlama",
              },
              {
                ad: "ML for Kids",
                url: "https://machinelearningforkids.co.uk/",
                aciklama: "ML projeleri",
              },
              {
                ad: "Canva",
                url: "https://canva.com/",
                aciklama: "Gorsel tasarim",
              },
              {
                ad: "ChatGPT / Gemini",
                url: "#",
                aciklama: "Uretken YZ deneyimi",
              },
            ].map((arac) => (
              <a
                key={arac.ad}
                href={arac.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition hover:shadow-md"
              >
                <h4 className="font-bold">{arac.ad}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {arac.aciklama}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-10 text-center text-sm text-[var(--color-text-secondary)]">
        <p className="mb-2">
          <strong>Yapay Zeka Macerasi</strong> - Dr. Murat ALTUN
        </p>
        <p className="mb-4">
          Bu eser{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-600"
          >
            CC BY-NC-SA 4.0
          </a>{" "}
          lisansi ile lisanslanmistir.
        </p>
        <a
          href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline"
        >
          GitHub&apos;da Acik Kaynak
        </a>
      </footer>
    </div>
  );
}
