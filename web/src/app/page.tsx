import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";

const bolumler = [
  { no: 1, baslik: "Yapay Zeka Nedir?", altBaslik: "Keşif Yolculuğu", seviye: "6. Sınıf", ders: 4, renk: "from-sky-400 to-blue-500", hazir: true },
  { no: 2, baslik: "Günlük Hayatta YZ", altBaslik: "Yapay Zeka Etrafımızda", seviye: "6. Sınıf", ders: 4, renk: "from-emerald-400 to-teal-500", hazir: true },
  { no: 3, baslik: "Verinin Gücü", altBaslik: "YZ'nin Yakıtı", seviye: "6. Sınıf", ders: 4, renk: "from-violet-400 to-purple-500", hazir: true },
  { no: 4, baslik: "Makineler Nasıl Öğrenir?", altBaslik: "Makine Öğrenimi Temelleri", seviye: "6-7. Sınıf", ders: 6, renk: "from-orange-400 to-amber-500", hazir: true },
  { no: 5, baslik: "Üretken Yapay Zeka", altBaslik: "YZ Araçlarıyla Tanışın", seviye: "6-7. Sınıf", ders: 6, renk: "from-pink-400 to-rose-500", hazir: true },
  { no: 6, baslik: "Blok Tabanlı YZ Kodlama", altBaslik: "PictoBlox Projeleri", seviye: "7. Sınıf", ders: 8, renk: "from-blue-400 to-indigo-500", hazir: true },
  { no: 7, baslik: "Gerçek Hayat Problemleri", altBaslik: "STEM Tabanlı YZ Çözümleri", seviye: "7-8. Sınıf", ders: 8, renk: "from-teal-400 to-cyan-500", hazir: true },
  { no: 8, baslik: "Dijital İçerik Üretimi", altBaslik: "YZ ile Yaratıcılık", seviye: "7-8. Sınıf", ders: 6, renk: "from-rose-400 to-pink-500", hazir: true },
  { no: 9, baslik: "YZ ve Etik", altBaslik: "Doğru Kullanımın Pusulası", seviye: "7-8. Sınıf", ders: 4, renk: "from-amber-400 to-orange-500", hazir: true },
  { no: 10, baslik: "Gelecek Seninle Başlar", altBaslik: "Proje ve Portfolyo", seviye: "8. Sınıf", ders: 8, renk: "from-indigo-400 to-violet-500", hazir: true },
];

export default function AnaSayfa() {
  return (
    <div className="min-h-screen">
      {/* Hero - Day of AI ilhamli */}
      <header className="relative overflow-hidden bg-[#0f172a] text-white">
        {/* Neural network animated background */}
        <NeuralBackground />
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
                Açık Kaynak &middot; Ücretsiz &middot; MEB Uyumlu
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
                Yapay Zeka
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Okuryazarlığı
                </span>
                <br />
                Herkes İçindir
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-300">
                Ortaokul öğrencileri için uygulamalı, eğlenceli ve kapsayıcı
                yapay zeka eğitim platformu. Keşfet, öğren, uygula!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#bolumler"
                  className="rounded-xl bg-white px-8 py-3.5 font-bold text-slate-900 shadow-lg shadow-white/10 transition hover:scale-105"
                >
                  Bölümleri Keşfet
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
                { sayi: "10", etiket: "Bölüm", icon: "📖", renk: "from-sky-500/20 to-blue-500/20 border-sky-500/20" },
                { sayi: "50+", etiket: "Etkinlik", icon: "🎮", renk: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
                { sayi: "30+", etiket: "Quiz Sorusu", icon: "📝", renk: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
                { sayi: "100%", etiket: "Ücretsiz", icon: "🎁", renk: "from-amber-500/20 to-orange-500/20 border-amber-500/20" },
              ].map((s) => (
                <div
                  key={s.etiket}
                  className={`glow-hover rounded-2xl border bg-gradient-to-br p-6 transition-transform hover:scale-105 ${s.renk}`}
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
            { hedef: "Öğrenciler", yas: "6-8. Sınıf (11-14 yaş)", icon: "🎒", aciklama: "Keşfet, dene, proje geliştir" },
            { hedef: "Öğretmenler", yas: "BT Öğretmenleri", icon: "👩‍🏫", aciklama: "Hazır ders planları ve materyaller" },
            { hedef: "Aileler", yas: "Meraklı Ebeveynler", icon: "👨‍👩‍👧‍👦", aciklama: "Birlikte öğrenin" },
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
      <section id="ozellikler" className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">Neden Bu Platform?</h2>
            <p className="mx-auto max-w-2xl text-[var(--color-text-secondary)]">
              MIT ve Stanford araştırmalarından ilham alan, Türkiye müfredatına uyarlanmış, tamamen uygulamalı yaklaşım
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🔌", baslik: "Unplugged Etkinlikler", aciklama: "Bilgisayarsız, sınıfta yapılabilir etkinlikler. Kapsayıcı — herkes katılır.", arka: "Kağıt, makas ve hayal gücüyle yapay zeka keşfet! Her bölümde en az 1 unplugged etkinlik var.", renk: "from-emerald-500 to-teal-500" },
              { icon: "🧪", baslik: "Uygulamalı Öğrenme", aciklama: "Teachable Machine, PictoBlox, ML for Kids ile gerçek YZ projeleri.", arka: "Kendi modelini eğit, kendi oyununu yap! Adım adım rehberlerle pratik YZ deneyimi.", renk: "from-sky-500 to-blue-500" },
              { icon: "🖨️", baslik: "Yazıcı Dostu", aciklama: "Etkinlik kartları, çalışma yaprakları ve formlar PDF indirilebilir.", arka: "32 indirilebilir materyal: kart setleri, formlar, rehberler ve sertifika — hepsi yazdırılabilir.", renk: "from-violet-500 to-purple-500" },
              { icon: "📱", baslik: "QR Kod Entegrasyonu", aciklama: "Kitaptan doğrudan interaktif etkinliklere erişim.", arka: "Basılı kitaptaki QR kodlar seni doğrudan web etkinliklerine, quizlere ve videolara götürür.", renk: "from-orange-500 to-amber-500" },
              { icon: "🧩", baslik: "İnteraktif Quizler", aciklama: "Her bölüm sonunda anında geri bildirimli değerlendirme.", arka: "50+ quiz sorusu, anında geri bildirim, puan takibi. Öğrendiğini test et!", renk: "from-pink-500 to-rose-500" },
              { icon: "⚖️", baslik: "Etik Odaklı", aciklama: "YZ etiği, önyargı ve sorumlu kullanım her bölümde işlenir.", arka: "Deepfake tespiti, YZ Mahkemesi, Etik Pusula — sorumlu YZ kullanımı öğren.", renk: "from-amber-500 to-orange-500" },
            ].map((o) => (
              <div
                key={o.baslik}
                className="flip-card h-52"
              >
                <div className="flip-card-inner">
                  {/* Ön yüz */}
                  <div className="flip-card-front flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center">
                    <span className="text-5xl">{o.icon}</span>
                    <h3 className="mt-4 text-lg font-bold">{o.baslik}</h3>
                    <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{o.aciklama}</p>
                  </div>
                  {/* Arka yüz */}
                  <div className={`flip-card-back flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${o.renk} p-6 text-center text-white`}>
                    <span className="text-3xl">{o.icon}</span>
                    <p className="mt-3 text-sm font-medium leading-relaxed">{o.arka}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bolumler */}
      <section id="bolumler" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">10 Bölüm, Kademeli İlerleme</h2>
            <p className="mx-auto max-w-lg text-[var(--color-text-secondary)]">
              6. sınıftan 8. sınıfa, temelden ileriye, adım adım YZ okuryazarlığı
            </p>
          </div>

          {/* Sinif gruplari */}
          {[
            { sinif: "6. Sınıf — Temel Kavramlar", bolumNolar: [1, 2, 3] },
            { sinif: "6-7. Sınıf — Uygulama", bolumNolar: [4, 5] },
            { sinif: "7. Sınıf — Kodlama", bolumNolar: [6] },
            { sinif: "7-8. Sınıf — Derinleşme", bolumNolar: [7, 8, 9] },
            { sinif: "8. Sınıf — Proje", bolumNolar: [10] },
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
                      className="card-hover glow-hover group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]"
                    >
                      <div className={`h-2 bg-gradient-to-r ${b.renk}`} />
                      <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                            BÖLÜM {b.no}
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
      <section id="araclar" className="bg-[var(--color-bg-secondary)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold">Kullanılan Araçlar</h2>
            <p className="text-[var(--color-text-secondary)]">Hepsi ücretsiz, hepsi web tabanlı</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { ad: "Teachable Machine", aciklama: "Kodsuz ML model eğitimi", url: "https://teachablemachine.withgoogle.com/", icon: "🧪" },
              { ad: "PictoBlox", aciklama: "Blok tabanlı YZ kodlama", url: "https://thestempedia.com/product/pictoblox/", icon: "🧩" },
              { ad: "ML for Kids", aciklama: "Scratch ile ML projeleri", url: "https://machinelearningforkids.co.uk/", icon: "🎓" },

              { ad: "Canva AI", aciklama: "YZ destekli tasarım", url: "https://canva.com/", icon: "🎨" },
              { ad: "ChatGPT", aciklama: "Üretken YZ deneyimi", url: "https://chatgpt.com/", icon: "💬" },
              { ad: "Gemini", aciklama: "Google YZ asistanı", url: "https://gemini.google.com/", icon: "✨" },
              { ad: "Bing Image Creator", aciklama: "Ücretsiz görüntü üretme", url: "https://www.bing.com/images/create", icon: "🖼️" },
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
            <h2 className="mb-3 text-3xl font-extrabold">İlham Kaynakları</h2>
            <p className="mx-auto max-w-lg text-[var(--color-text-secondary)]">
              Dünya çapında YZ okuryazarlığı araştırmalarından ilham alarak tasarlandı
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { ad: "MIT RAISE", aciklama: "Responsible AI for Social Empowerment", url: "https://raise.mit.edu/", logo: "🏛️" },
              { ad: "Day of AI", aciklama: "AI Literacy is for Everyone", url: "https://dayofai.org/", logo: "📅" },
              { ad: "AI4K12", aciklama: "Five Big Ideas in AI", url: "https://ai4k12.org/", logo: "🎓" },
              { ad: "MEB BTY", aciklama: "Bilişim Teknolojileri Müfredatı", url: "https://mufredat.meb.gov.tr/", logo: "🇹🇷" },
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
            YZ Okuryazarlığı Yolculuğuna Başla
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            10 bölüm, 50+ etkinlik, tamamen ücretsiz. Hemen keşfetmeye başla!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#bolumler"
              className="rounded-xl bg-white px-10 py-4 text-lg font-bold text-indigo-700 shadow-xl shadow-indigo-900/20 transition hover:scale-105"
            >
              Hemen Başla
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
              <p className="text-lg font-extrabold">🤖 GençYZ</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Dr. Murat ALTUN
              </p>
              <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                Ortaokul öğrencileri için uygulamalı yapay zeka eğitim platformu.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold">Hızlı Erişim</h4>
              <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <Link href="/#bolumler" className="block hover:text-sky-600 transition">Bölümler</Link>
                <Link href="/hakkinda" className="block hover:text-sky-600 transition">Hakkında</Link>
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
                lisansı ile lisanslanmıştır. Eğitim amaçlı kullanıma açıktır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
