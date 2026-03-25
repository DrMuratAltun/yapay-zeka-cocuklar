import Link from "next/link";

const kitaplar = [
  { yil: "2023", baslik: "Yapay Zeka Öğretmen El Kitabı" },
  { yil: "2022", baslik: "Yapay Zeka ve Makine Öğrenmesi" },
  { yil: "2021", baslik: "Arduino ile Robotik Kodlama" },
  { yil: "2020", baslik: "Herkes İçin Python" },
  { yil: "2020", baslik: "Blok Tabanlı Kodlama" },
  { yil: "2019", baslik: "Bilişim Teknolojileri ve Yazılım" },
];

const uzmanliklar = [
  { alan: "Yapay Zeka ve LLM", icon: "🤖" },
  { alan: "Python ve Veri Bilimi", icon: "🐍" },
  { alan: "Makine Öğrenimi", icon: "🧠" },
  { alan: "Bilgisayar Görüsü", icon: "👁️" },
  { alan: "Eğitim Teknolojileri", icon: "🎓" },
  { alan: "Robotik Kodlama", icon: "🔧" },
];

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
        {/* Yazar Profili */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl text-white shadow-lg">
              👨‍🏫
            </div>
            <div className="text-center md:text-left">
              <h2 className="mb-1 text-2xl font-extrabold">Dr. Murat ALTUN</h2>
              <p className="mb-4 text-[var(--color-text-secondary)]">
                Yapay Zeka Eğitmeni &middot; Veri Bilimci &middot; Yazar
              </p>
              <p className="leading-relaxed text-[var(--color-text-secondary)]">
                25+ yıllık yazılım mühendisliği deneyimine sahip, yapay zeka, makine öğrenimi,
                veri bilimi ve bilgisayar görüsü alanlarında uzmanlaşmış eğitimci ve araştırmacı.
                6 kitap yazarı, TÜBİTAK proje yürütücüsü ve danışmanı. Binlerce öğrenci ve
                eğitimciye Python, makine öğrenimi ve büyük dil modelleri (LLM) eğitimi vermiştir.
              </p>

              {/* Sosyal Medya Linkleri */}
              <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href="https://github.com/DrMuratAltun" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] hover:text-sky-600">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/drmurataltun" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] hover:text-sky-600">
                  LinkedIn
                </a>
                <a href="https://instagram.com/drmurataltun" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] hover:text-sky-600">
                  Instagram
                </a>
                <a href="https://researchgate.net/profile/Murat_Altun2" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] hover:text-sky-600">
                  ResearchGate
                </a>
                <a href="https://drmurataltun.github.io/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)] hover:text-sky-600">
                  Web Sitesi
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Eğitim ve Kariyer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Eğitim ve Kariyer</h2>
          <div className="space-y-3">
            {[
              { donem: "2015-2019", kurum: "Akdeniz Üniversitesi", derece: "Doktora", detay: "Eğitim Yönetimi, Teftişi, Planlaması ve Ekonomisi — Veri madenciliği ile öğrenci performans tahmini" },
              { donem: "2009-2013", kurum: "Dokuz Eylül Üniversitesi", derece: "Yüksek Lisans", detay: "Eğitim Bilimleri" },
              { donem: "2000-2004", kurum: "Eskişehir Osmangazi Üniversitesi", derece: "Lisans", detay: "Bilgisayar ve Öğretim Teknolojileri Eğitimi" },
            ].map((e) => (
              <div key={e.donem} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white">{e.donem}</span>
                <div>
                  <h4 className="font-bold">{e.kurum}</h4>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{e.derece}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{e.detay}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { gorev: "MEB / YEĞİTEK", detay: "Bilişim Teknolojileri Öğretmeni", icon: "🏫" },
              { gorev: "BTK Akademi", detay: "Yapay Zeka ve Python Eğitmeni (600+ saat)", icon: "🎓" },
              { gorev: "Antalya Belek Üniversitesi", detay: "Misafir Öğretim Görevlisi", icon: "🏛️" },
              { gorev: "TÜBİTAK", detay: "Proje Yürütücüsü ve Danışmanı", icon: "🔬" },
              { gorev: "Yapay Zeka Okulum", detay: "Kurucu (YZ Eğitim Platformu)", icon: "🤖" },
              { gorev: "Deneyap / Tech Istanbul", detay: "Atölye Eğitmeni", icon: "⚡" },
            ].map((g) => (
              <div key={g.gorev} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <h4 className="text-sm font-bold">{g.gorev}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">{g.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Uzmanlık Alanları */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Uzmanlık Alanları</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {uzmanliklar.map((u) => (
              <div key={u.alan} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-2xl">{u.icon}</span>
                <span className="font-medium">{u.alan}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Yayınlar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Yayınlar (Kitaplar)</h2>
          <div className="space-y-2">
            {kitaplar.map((k) => (
              <div key={k.baslik} className="flex items-center gap-4 rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="shrink-0 rounded bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{k.yil}</span>
                <span className="text-sm font-medium">{k.baslik}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Proje Hakkında */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Bu Proje Hakkında</h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text)]">Yapay Zeka Macerası</strong>,
            6-8. sınıf öğrencilerinin yapay zekayı anlamalarını, deneyimlemelerini ve
            sorumlu bir şekilde kullanmalarını amaçlayan kapsamlı bir eğitim projesidir.
          </p>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            MIT RAISE, Day of AI, AI4K12 gibi dünya çapındaki YZ okuryazarlığı
            araştırmalarından ilham alınarak, MEB Bilişim Teknolojileri ve Yazılım dersi
            müfredatına uygun olarak tasarlanmıştır.
          </p>
        </section>

        {/* Özellikler */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Projenin Özellikleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "📖", baslik: "10 Kapsamlı Bölüm", aciklama: "Temel kavramlardan ileri projelere, kademeli olarak ilerleyen içerik." },
              { icon: "🎮", baslik: "Uygulamalı Öğrenme", aciklama: "Her bölümde bilgisayarlı ve bilgisayarsız (unplugged) etkinlikler." },
              { icon: "🖨️", baslik: "Yazıcı Dostu Materyaller", aciklama: "Etkinlik kartları, çalışma yaprakları ve değerlendirme formları PDF olarak indirilebilir." },
              { icon: "📱", baslik: "İnteraktif Web Platformu", aciklama: "Quizler, etkinlikler ve QR kodlarla kitaptan platforma geçiş." },
              { icon: "🎥", baslik: "Video Eğitimler", aciklama: "Her bölüm için adım adım nasıl yapılır videoları." },
              { icon: "🏫", baslik: "MEB Uyumlu", aciklama: "BTY dersi kazanımlarıyla uyumlu içerik ve etkinlikler." },
            ].map((o) => (
              <div key={o.baslik} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
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
            kullanılabilir, paylaşılabilir ve uyarlanabilir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar" target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 font-bold text-indigo-700 transition hover:bg-indigo-50">
              GitHub&apos;da İncele
            </a>
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr" target="_blank" rel="noopener noreferrer"
              className="rounded-lg border-2 border-white/30 px-6 py-2.5 font-bold transition hover:bg-white/10">
              Lisans Detayları
            </a>
          </div>
        </section>

        {/* Lisans */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">Lisans: CC BY-NC-SA 4.0</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">Yapabilirsiniz</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Sınıflarınızda serbestçe kullanmak</li>
                <li>&#8226; İçeriğe ekleme yaparak uyarlamak</li>
                <li>&#8226; Başka öğretmenlerle paylaşmak</li>
                <li>&#8226; Farklı dillere çevirmek</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">Yapamazsınız</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Ticari amaçla satmak</li>
                <li>&#8226; Kaynak göstermeden kullanmak</li>
                <li>&#8226; Farklı bir lisansla dağıtmak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* İletişim */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">İletişim</h2>
          <p className="text-[var(--color-text-secondary)]">
            Sorularınız, önerileriniz veya katkılarınız için aşağıdaki kanallardan ulaşabilirsiniz:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="mailto:emurataltun@gmail.com"
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition hover:border-sky-300">
              <span className="text-2xl">📧</span>
              <div>
                <h4 className="text-sm font-bold">E-posta</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">emurataltun@gmail.com</p>
              </div>
            </a>
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar/issues" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition hover:border-sky-300">
              <span className="text-2xl">🐛</span>
              <div>
                <h4 className="text-sm font-bold">Hata Bildir / Öneri Ver</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">GitHub Issues</p>
              </div>
            </a>
            <a href="https://linkedin.com/in/drmurataltun" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition hover:border-sky-300">
              <span className="text-2xl">💼</span>
              <div>
                <h4 className="text-sm font-bold">LinkedIn</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">linkedin.com/in/drmurataltun</p>
              </div>
            </a>
            <a href="https://instagram.com/drmurataltun" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition hover:border-sky-300">
              <span className="text-2xl">📸</span>
              <div>
                <h4 className="text-sm font-bold">Instagram</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">@drmurataltun</p>
              </div>
            </a>
          </div>
        </section>

        {/* Geri Dön */}
        <div className="pt-6">
          <Link href="/" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
            &larr; Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    </div>
  );
}
