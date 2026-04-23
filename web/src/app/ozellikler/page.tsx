import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Özellikler",
  description: "GençYZ platformunun özellikleri: unplugged etkinlikler, uygulamalı öğrenme, interaktif quizler ve daha fazlası.",
};

export default function OzelliklerPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Neden Bu Platform?</h1>
          <p className="mx-auto max-w-2xl text-slate-300 text-lg">
            MIT ve Stanford araştırmalarından ilham alan, Türkiye müfredatına uyarlanmış, tamamen uygulamalı yaklaşım
          </p>
        </div>
      </header>

      {/* Ozellikler Grid */}
      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🔌", baslik: "Unplugged Etkinlikler", aciklama: "Bilgisayarsız, sınıfta yapılabilir etkinlikler. Kapsayıcı — herkes katılır.", arka: "Kağıt, makas ve hayal gücüyle yapay zeka keşfet! Her bölümde en az 1 unplugged etkinlik var.", renk: "from-emerald-500 to-teal-500" },
              { icon: "🧪", baslik: "Uygulamalı Öğrenme", aciklama: "Teachable Machine ve PictoBlox ile gerçek YZ projeleri.", arka: "Kendi modelini eğit, kendi oyununu yap! Adım adım rehberlerle pratik YZ deneyimi.", renk: "from-sky-500 to-blue-500" },
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
                  <div className="flip-card-front flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center">
                    <span className="text-5xl">{o.icon}</span>
                    <h3 className="mt-4 text-lg font-bold">{o.baslik}</h3>
                    <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{o.aciklama}</p>
                  </div>
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

      {/* Ek Bilgiler */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">MEB Uyumlu</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                BT ve Yazılım dersi müfredatına uyarlanmış, kazanım odaklı içerik
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold mb-2">Kademeli İlerleme</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                6. sınıftan 8. sınıfa, temelden ileriye adım adım zorluk artışı
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-lg font-bold mb-2">Tamamen Ücretsiz Araçlar</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Tüm kullanılan araçlar web tabanlı ve ücretsiz erişilebilir
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
