import Link from "next/link";

const bolumler = [
  { no: 1, baslik: "Yapay Zeka Nedir?", altBaslik: "Kesif Yolculugu", seviye: "6. Sinif", ders: 4, renk: "from-sky-400 to-blue-500", hazir: true },
  { no: 2, baslik: "Gunluk Hayatta YZ", altBaslik: "Yapay Zeka Etrafimizda", seviye: "6. Sinif", ders: 4, renk: "from-emerald-400 to-teal-500", hazir: true },
  { no: 3, baslik: "Verinin Gucu", altBaslik: "YZ'nin Yakiti", seviye: "6. Sinif", ders: 4, renk: "from-violet-400 to-purple-500", hazir: true },
  { no: 4, baslik: "Makineler Nasil Ogrenir?", altBaslik: "Makine Ogrenimi Temelleri", seviye: "6-7. Sinif", ders: 6, renk: "from-orange-400 to-amber-500", hazir: true },
  { no: 5, baslik: "Uretken Yapay Zeka", altBaslik: "YZ Araclariyla Tanisin", seviye: "6-7. Sinif", ders: 6, renk: "from-pink-400 to-rose-500", hazir: true },
  { no: 6, baslik: "Blok Tabanli YZ Kodlama", altBaslik: "PictoBlox Projeleri", seviye: "7. Sinif", ders: 8, renk: "from-blue-400 to-indigo-500", hazir: true },
  { no: 7, baslik: "Gercek Hayat Problemleri", altBaslik: "STEM Tabanli YZ Cozumleri", seviye: "7-8. Sinif", ders: 8, renk: "from-teal-400 to-cyan-500", hazir: true },
  { no: 8, baslik: "Dijital Icerik Uretimi", altBaslik: "YZ ile Yaraticilik", seviye: "7-8. Sinif", ders: 6, renk: "from-rose-400 to-pink-500", hazir: true },
  { no: 9, baslik: "YZ ve Etik", altBaslik: "Dogru Kullanimin Pusulasi", seviye: "7-8. Sinif", ders: 4, renk: "from-amber-400 to-orange-500", hazir: true },
  { no: 10, baslik: "Gelecek Seninle Baslar", altBaslik: "Proje ve Portfolyo", seviye: "8. Sinif", ders: 8, renk: "from-indigo-400 to-violet-500", hazir: true },
];

export default function AnaSayfa() {
  return (
    <div className="min-h-screen">
      {/* Hero - Day of AI ilhamli */}
      <header className="relative overflow-hidden bg-[#0f172a] text-white">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Sol: Metin */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                Acik Kaynak &middot; Ucretsiz &middot; MEB Uyumlu
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
                Yapay Zeka
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Okuryazarligi
                </span>
                <br />
                Herkes Icindir
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-300">
                Ortaokul ogrencileri icin uygulamali, eglenceli ve kapsayici
                yapay zeka egitim platformu. Kesfet, ogren, uygula!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#bolumler"
                  className="rounded-xl bg-white px-8 py-3.5 font-bold text-slate-900 shadow-lg shadow-white/10 transition hover:scale-105"
                >
                  Bolumleri Kesfet
                </a>
                <a
                  href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-bold backdrop-blur transition hover:bg-white/10"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Sag: Istatistikler */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { sayi: "10", etiket: "Bolum", icon: "📖", renk: "from-sky-500/20 to-blue-500/20 border-sky-500/20" },
                { sayi: "50+", etiket: "Etkinlik", icon: "🎮", renk: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
                { sayi: "30+", etiket: "Quiz Sorusu", icon: "📝", renk: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
                { sayi: "100%", etiket: "Ucretsiz", icon: "🎁", renk: "from-amber-500/20 to-orange-500/20 border-amber-500/20" },
              ].map((s) => (
                <div
                  key={s.etiket}
                  className={`rounded-2xl border bg-gradient-to-br p-6 ${s.renk}`}
                >
                  <span className="text-3xl">{s.icon}</span>
                  <div className="mt-3 text-3xl font-extrabold">{s.sayi}</div>
                  <div className="text-sm text-slate-400">{s.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hedef Kitle Bantlari */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-6 py-10 md:gap-10">
          {[
            { hedef: "Ogrenciler", yas: "6-8. Sinif (11-14 yas)", icon: "🎒", aciklama: "Kesfet, dene, proje gelistir" },
            { hedef: "Ogretmenler", yas: "BT Ogretmenleri", icon: "👩‍🏫", aciklama: "Hazir ders planları ve materyaller" },
            { hedef: "Aileler", yas: "Merakli Ebeveynler", icon: "👨‍👩‍👧‍👦", aciklama: "Birlikte ogrenin" },
          ].map((h) => (
            <div key={h.hedef} className="flex items-center gap-4 rounded-xl px-2">
              <span className="text-4xl">{h.icon}</span>
              <div>
                <h3 className="font-bold">{h.hedef}</h3>
                <p className="text-xs text-[var(--color-text-secondary)]">{h.yas}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{h.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neden Bu Kitap */}
      <section className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">Neden Bu Platform?</h2>
            <p className="mx-auto max-w-2xl text-[var(--color-text-secondary)]">
              MIT ve Stanford arastirmalarindan ilham alan, Turkiye mufredatina uyarlanmis, tamamen uygulamali yaklasilm
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🔌", baslik: "Unplugged Etkinlikler", aciklama: "Bilgisayarsiz, sinifta yapilabilir etkinlikler. Kapsayici — herkes katilir." },
              { icon: "🧪", baslik: "Uygulamali Ogrenme", aciklama: "Teachable Machine, PictoBlox, Scratch ile gercek YZ projeleri." },
              { icon: "🖨️", baslik: "Yazici Dostu", aciklama: "Etkinlik kartlari, calisma yapraklari ve formlar PDF indirilebilir." },
              { icon: "📱", baslik: "QR Kod Entegrasyonu", aciklama: "Kitaptan dogrudan interaktif etkinliklere erisim." },
              { icon: "🧩", baslik: "Interaktif Quizler", aciklama: "Her bolum sonunda aninda geri bildirimli degerlendirme." },
              { icon: "⚖️", baslik: "Etik Odakli", aciklama: "YZ etigi, onyargi ve sorumlu kullanim her bolumde islenir." },
            ].map((o) => (
              <div
                key={o.baslik}
                className="card-hover rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
              >
                <span className="text-4xl">{o.icon}</span>
                <h3 className="mt-4 text-lg font-bold">{o.baslik}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bolumler */}
      <section id="bolumler" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">10 Bolum, Kademeli Ilerleme</h2>
            <p className="mx-auto max-w-lg text-[var(--color-text-secondary)]">
              6. siniftan 8. sinifa, temelden ileriye, adim adim YZ okuryazarligi
            </p>
          </div>

          {/* Sinif gruplari */}
          {[
            { sinif: "6. Sinif — Temel Kavramlar", bolumNolar: [1, 2, 3] },
            { sinif: "6-7. Sinif — Uygulama", bolumNolar: [4, 5] },
            { sinif: "7. Sinif — Kodlama", bolumNolar: [6] },
            { sinif: "7-8. Sinif — Derinlesme", bolumNolar: [7, 8, 9] },
            { sinif: "8. Sinif — Proje", bolumNolar: [10] },
          ].map((grup) => (
            <div key={grup.sinif} className="mb-8">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {grup.sinif}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grup.bolumNolar.map((no) => {
                  const b = bolumler[no - 1];
                  return (
                    <Link
                      key={b.no}
                      href={`/bolumler/${b.no}`}
                      className="card-hover group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]"
                    >
                      <div className={`h-2 bg-gradient-to-r ${b.renk}`} />
                      <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                            BOLUM {b.no}
                          </span>
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {b.ders} ders saati
                          </span>
                        </div>
                        <h4 className="text-lg font-bold group-hover:text-sky-600 transition-colors">
                          {b.baslik}
                        </h4>
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                          {b.altBaslik}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Araclar */}
      <section className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">Kullanilan Araclar</h2>
            <p className="text-[var(--color-text-secondary)]">Hepsi ucretsiz, hepsi web tabanli</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { ad: "Teachable Machine", aciklama: "Kodsuz ML model egitimi", url: "https://teachablemachine.withgoogle.com/", icon: "🧪" },
              { ad: "PictoBlox", aciklama: "Blok tabanli YZ kodlama", url: "https://thestempedia.com/product/pictoblox/", icon: "🧩" },
              { ad: "ML for Kids", aciklama: "Scratch ile ML projeleri", url: "https://machinelearningforkids.co.uk/", icon: "🎓" },
              { ad: "Scratch", aciklama: "Blok tabanli kodlama", url: "https://scratch.mit.edu/", icon: "🐱" },
              { ad: "Canva AI", aciklama: "YZ destekli tasarim", url: "https://canva.com/", icon: "🎨" },
              { ad: "ChatGPT", aciklama: "Uretken YZ deneyimi", url: "https://chatgpt.com/", icon: "💬" },
              { ad: "Gemini", aciklama: "Google YZ asistani", url: "https://gemini.google.com/", icon: "✨" },
              { ad: "Bing Image Creator", aciklama: "Ucretsiz goruntu uretme", url: "https://www.bing.com/images/create", icon: "🖼️" },
            ].map((a) => (
              <a
                key={a.ad}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <h4 className="text-sm font-bold">{a.ad}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ilham Kaynaklari */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">Ilham Kaynaklari</h2>
            <p className="mx-auto max-w-lg text-[var(--color-text-secondary)]">
              Dunya capinda YZ okuryazarligi arastirmalarindan ilham alarak tasarlandi
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { ad: "MIT RAISE", aciklama: "Responsible AI for Social Empowerment", url: "https://raise.mit.edu/", logo: "🏛️" },
              { ad: "Day of AI", aciklama: "AI Literacy is for Everyone", url: "https://dayofai.org/", logo: "📅" },
              { ad: "AI4K12", aciklama: "Five Big Ideas in AI", url: "https://ai4k12.org/", logo: "🎓" },
              { ad: "MEB BTY", aciklama: "Bilisim Teknolojileri Mufredati", url: "https://mufredat.meb.gov.tr/", logo: "🇹🇷" },
            ].map((k) => (
              <a
                key={k.ad}
                href={k.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 text-center"
              >
                <span className="text-4xl">{k.logo}</span>
                <h4 className="mt-3 font-bold">{k.ad}</h4>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{k.aciklama}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            YZ Okuryazarligi Yolculuguna Basla
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            10 bolum, 50+ etkinlik, tamamen ucretsiz. Hemen kesfetmeye basla!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#bolumler"
              className="rounded-xl bg-white px-10 py-4 text-lg font-bold text-indigo-700 shadow-xl shadow-indigo-900/20 transition hover:scale-105"
            >
              Hemen Basla
            </a>
            <Link
              href="/hakkinda"
              className="rounded-xl border-2 border-white/20 px-10 py-4 text-lg font-bold transition hover:bg-white/10"
            >
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-lg font-extrabold">🤖 Yapay Zeka Macerasi</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Dr. Murat ALTUN
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                Ortaokul ogrencileri icin uygulamali yapay zeka egitim platformu.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold">Hizli Erisim</h4>
              <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <Link href="/#bolumler" className="block hover:text-sky-600 transition">Bolumler</Link>
                <Link href="/hakkinda" className="block hover:text-sky-600 transition">Hakkinda</Link>
                <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar" target="_blank" rel="noopener noreferrer" className="block hover:text-sky-600 transition">GitHub</a>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold">Lisans</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Bu eser{" "}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-sky-600"
                >
                  CC BY-NC-SA 4.0
                </a>{" "}
                lisansi ile lisanslanmistir. Egitim amacli kullanima aciktir.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
