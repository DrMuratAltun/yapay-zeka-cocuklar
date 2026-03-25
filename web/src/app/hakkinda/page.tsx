import Link from "next/link";

export default function Hakkinda() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">Proje Hakkinda</h1>
          <p className="mx-auto max-w-xl text-lg text-indigo-100">
            Yapay Zeka Macerasi, ortaokul ogrencileri icin hazirlanan
            acik kaynakli, uygulamali bir yapay zeka egitim projesidir.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
        {/* Yazar */}
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl text-white shadow-lg">
            👨‍🏫
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-extrabold">Dr. Murat ALTUN</h2>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Bilisim Teknolojileri Ogretmeni &middot; Egitim Teknolojisi Arastirmacisi
            </p>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              Ortaokul ve lise ogrencilerine bilisim teknolojileri, kodlama ve yapay zeka
              konularinda egitim vermektedir. Yapay zeka, egitim teknolojileri ve
              dijital okuryazarlik alanlarinda calismalar yurutmektedir. Ogrencilerin
              teknolojiyi sadece tuketen degil, ureten bireyler olarak yetismeleri icin
              uygulamali egitim yaklasimlarini benimsemektedir.
            </p>
          </div>
        </section>

        {/* Proje Hakkinda */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Proje Nedir?</h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text)]">Yapay Zeka Macerasi</strong>,
            6-8. sinif ogrencilerinin yapay zekayi anlamalarini, deneyimlemelerini ve
            sorumlu bir sekilde kullanmalarini amaclayan kapsamli bir egitim projesidir.
          </p>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            Proje, MEB Bilisim Teknolojileri ve Yazilim dersi mufredatiyla uyumlu
            olarak tasarlanmis olup, hem sinif ici etkinlikler hem de bireysel
            calisma icin uygundur.
          </p>
        </section>

        {/* Ozellikler */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Projenin Ozellikleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "📖",
                baslik: "10 Kapsamli Bolum",
                aciklama: "Temel kavramlardan ileri projelere, kademeli olarak ilerleyen icerik.",
              },
              {
                icon: "🎮",
                baslik: "Uygulamali Ogrenme",
                aciklama: "Her bolumde bilgisayarli ve bilgisayarsiz (unplugged) etkinlikler.",
              },
              {
                icon: "🖨️",
                baslik: "Yazici Dostu Materyaller",
                aciklama: "Etkinlik kartlari, calisma yapraklari ve degerlendirme formlari PDF olarak indirilebilir.",
              },
              {
                icon: "📱",
                baslik: "Interaktif Web Platformu",
                aciklama: "Quizler, etkinlikler ve QR kodlarla kitaptan platforma gecis.",
              },
              {
                icon: "🎥",
                baslik: "Video Egitimler",
                aciklama: "Her bolum icin adim adim nasil yapilir videolari.",
              },
              {
                icon: "🏫",
                baslik: "MEB Uyumlu",
                aciklama: "BTY dersi kazanimlariyla uyumlu icerik ve etkinlikler.",
              },
            ].map((o) => (
              <div
                key={o.baslik}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
              >
                <span className="text-2xl">{o.icon}</span>
                <div>
                  <h3 className="font-bold">{o.baslik}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{o.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Acik Kaynak */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
          <h2 className="mb-4 text-2xl font-extrabold">Acik Kaynak Proje</h2>
          <p className="mb-6 text-indigo-100">
            Bu proje <strong>CC BY-NC-SA 4.0</strong> lisansi ile lisanslanmistir.
            Egitim amacli, ticari olmayan kullanimlarda serbestce
            kullanilabilir, paylasilabilir ve uyarlanabilir. Kaynak gosterme
            ve ayni lisansla paylasma kosullari gecerlidir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              GitHub&apos;da Incele
            </a>
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-white/30 px-6 py-2.5 font-bold transition hover:bg-white/10"
            >
              Lisans Detaylari
            </a>
          </div>
        </section>

        {/* Lisans Detay */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Lisans: CC BY-NC-SA 4.0</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">✅ Yapabilirsiniz</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Siniflarinizda serbestce kullanmak</li>
                <li>&#8226; Icerige ekleme yaparak uyarlamak</li>
                <li>&#8226; Baska ogretmenlerle paylastirmak</li>
                <li>&#8226; Farkli dillere cevirmek</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">❌ Yapamazsiniz</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Ticari amacla satmak</li>
                <li>&#8226; Kaynak gostermeden kullanmak</li>
                <li>&#8226; Farkli bir lisansla dagitmak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Katki */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Katkida Bulunun</h2>
          <p className="text-[var(--color-text-secondary)]">
            Bu projeye katkida bulunmak isterseniz GitHub uzerinden
            pull request gonderebilir, hata bildirimi yapabilir veya
            yeni icerik onerileri sunabilirsiniz. Her turlu katki
            degerlidir!
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--color-border)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
            >
              Hata Bildir / Oneri Ver
            </a>
          </div>
        </section>

        {/* Geri Don */}
        <div className="pt-6">
          <Link
            href="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            &larr; Ana Sayfaya Don
          </Link>
        </div>
      </main>
    </div>
  );
}
