import Link from "next/link";

export default function Hakkinda() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">Proje Hakkında</h1>
          <p className="mx-auto max-w-xl text-lg text-indigo-100">
            Yapay Zeka Macerası, ortaokul öğrencileri için hazırlanan
            açık kaynaklı, uygulamalı bir yapay zeka eğitim projesidir.
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
              Bilişim Teknolojileri Öğretmeni &middot; Eğitim Teknolojisi Araştırmacısı
            </p>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              Ortaokul ve lise öğrencilerine bilişim teknolojileri, kodlama ve yapay zeka
              konularında eğitim vermektedir. Yapay zeka, eğitim teknolojileri ve
              dijital okuryazarlık alanlarında çalışmalar yürütmektedir. Öğrencilerin
              teknolojiyi sadece tüketen değil, üreten bireyler olarak yetişmeleri için
              uygulamalı eğitim yaklaşımlarını benimsemektedir.
            </p>
          </div>
        </section>

        {/* Proje Hakkında */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Proje Nedir?</h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text)]">Yapay Zeka Macerası</strong>,
            6-8. sınıf öğrencilerinin yapay zekayı anlamalarını, deneyimlemelerini ve
            sorumlu bir şekilde kullanmalarını amaçlayan kapsamlı bir eğitim projesidir.
          </p>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            Proje, MEB Bilişim Teknolojileri ve Yazılım dersi müfredatıyla uyumlu
            olarak tasarlanmış olup, hem sınıf içi etkinlikler hem de bireysel
            çalışma için uygundur.
          </p>
        </section>

        {/* Özellikler */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Projenin Özellikleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "📖",
                baslik: "10 Kapsamlı Bölüm",
                aciklama: "Temel kavramlardan ileri projelere, kademeli olarak ilerleyen içerik.",
              },
              {
                icon: "🎮",
                baslik: "Uygulamalı Öğrenme",
                aciklama: "Her bölümde bilgisayarlı ve bilgisayarsız (unplugged) etkinlikler.",
              },
              {
                icon: "🖨️",
                baslik: "Yazıcı Dostu Materyaller",
                aciklama: "Etkinlik kartları, çalışma yaprakları ve değerlendirme formları PDF olarak indirilebilir.",
              },
              {
                icon: "📱",
                baslik: "İnteraktif Web Platformu",
                aciklama: "Quizler, etkinlikler ve QR kodlarla kitaptan platforma geçiş.",
              },
              {
                icon: "🎥",
                baslik: "Video Eğitimler",
                aciklama: "Her bölüm için adım adım nasıl yapılır videoları.",
              },
              {
                icon: "🏫",
                baslik: "MEB Uyumlu",
                aciklama: "BTY dersi kazanımlarıyla uyumlu içerik ve etkinlikler.",
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

        {/* Açık Kaynak */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
          <h2 className="mb-4 text-2xl font-extrabold">Açık Kaynak Proje</h2>
          <p className="mb-6 text-indigo-100">
            Bu proje <strong>CC BY-NC-SA 4.0</strong> lisansı ile lisanslanmıştır.
            Eğitim amaçlı, ticari olmayan kullanımlarda serbestçe
            kullanılabilir, paylaşılabilir ve uyarlanabilir. Kaynak gösterme
            ve aynı lisansla paylaşma koşulları geçerlidir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              GitHub&apos;da İncele
            </a>
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-white/30 px-6 py-2.5 font-bold transition hover:bg-white/10"
            >
              Lisans Detayları
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
                <li>&#8226; Sınıflarınızda serbestçe kullanmak</li>
                <li>&#8226; İçeriğe ekleme yaparak uyarlamak</li>
                <li>&#8226; Başka öğretmenlerle paylaştırmak</li>
                <li>&#8226; Farklı dillere çevirmek</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">❌ Yapamazsınız</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Ticari amaçla satmak</li>
                <li>&#8226; Kaynak göstermeden kullanmak</li>
                <li>&#8226; Farklı bir lisansla dağıtmak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Katkı */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Katkıda Bulunun</h2>
          <p className="text-[var(--color-text-secondary)]">
            Bu projeye katkıda bulunmak isterseniz GitHub üzerinden
            pull request gönderebilir, hata bildirimi yapabilir veya
            yeni içerik önerileri sunabilirsiniz. Her türlü katkı
            değerlidir!
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--color-border)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
            >
              Hata Bildir / Öneri Ver
            </a>
          </div>
        </section>

        {/* Geri Dön */}
        <div className="pt-6">
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
