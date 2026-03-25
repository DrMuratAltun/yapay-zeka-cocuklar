import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "YZ sistemlerinde 'önyargı' (bias) ne demektir?",
    secenekler: [
      "YZ'nin çok hızlı çalışması",
      "Eğitim verisindeki dengesizlikten kaynaklanan adaletsiz sonuçlar",
      "YZ'nin her zaman doğru karar vermesi",
      "YZ'nin fazla enerji tüketmesi",
    ],
    dogru: 1,
    aciklama: "Önyargı, eğitim verisindeki dengesizlik veya eksiklikten kaynaklanan sistematik hatalardır. Belirli gruplara karşı adaletsiz sonuçlar üretebilir.",
  },
  {
    soru: "Aşağıdakilerden hangisi YZ etiği ile ilgili önemli bir ilke DEĞİLDİR?",
    secenekler: [
      "Şeffaflık (kararların açıklanabilir olması)",
      "Adalet (tüm gruplara eşit davranma)",
      "Kâr maksimizasyonu (en çok para kazanma)",
      "Gizlilik (kişisel verilerin korunması)",
    ],
    dogru: 2,
    aciklama: "YZ etiği şeffaflık, adalet, gizlilik ve hesap verebilirlik gibi ilkeleri kapsar. Kâr maksimizasyonu etik bir ilke değildir.",
  },
  {
    soru: "Deepfake teknolojisi için hangisi doğrudur?",
    secenekler: [
      "Her zaman zararsızdır",
      "Gerçek olmayan video/ses içerikleri üreterek yanıltıcı olabilir",
      "Sadece eğlence amaçlı kullanılır",
      "Kolayca tespit edilebilir",
    ],
    dogru: 1,
    aciklama: "Deepfake, gerçekçi görünen sahte video ve ses içerikleri üretebilir. Dezenformasyon ve dolandırıcılık için kullanılabilir.",
  },
  {
    soru: "YZ'nin çevresel etkisi konusunda hangisi doğrudur?",
    secenekler: [
      "YZ'nin hiç çevresel etkisi yoktur",
      "Büyük YZ modellerinin eğitimi çok enerji tüketir ve karbon salımı yapar",
      "YZ sadece enerji tasarrufu sağlar",
      "YZ sunucuları elektrik tüketmez",
    ],
    dogru: 1,
    aciklama: "Büyük dil modellerinin eğitimi tonlarca CO2 salımı yapar. YZ'nin çevresel etkisini azaltmak için verimli modeller geliştirilmektedir.",
  },
  {
    soru: "Sorumlu YZ kullanımı için en önemli prensip hangisidir?",
    secenekler: [
      "YZ'yi mümkün olduğunca çok kullanmak",
      "YZ'yi hiç kullanmamak",
      "YZ'nin sınırlarını bilmek ve insani denetimle kullanmak",
      "YZ'ye tüm kararları bırakmak",
    ],
    dogru: 2,
    aciklama: "Sorumlu YZ kullanımı, YZ'nin gücünü ve sınırlarını bilmek, her zaman insan denetimini korumak ve etik ilkelere uymak demektir.",
  },
];

export default function Bolum9() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-amber-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">⚖️</div>
            <div>
              <p className="text-sm font-medium text-amber-200">BÖLÜM 9 &middot; 7-8. Sınıf &middot; 4 ders saati</p>
              <h1 className="text-3xl font-extrabold">YZ ve Etik</h1>
              <p className="text-amber-200">Doğru Kullanımın Pusulası</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 dark:bg-amber-900/20">
          <h2 className="mb-3 text-lg font-bold text-amber-700 dark:text-amber-300">Neler Öğreneceğiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>YZ etiği kavramını ve temel ilkelerini öğreneceğiz.</li>
            <li>YZ&apos;deki önyargı (bias) problemini ve etkilerini anlayacağız.</li>
            <li>Deepfake ve dezenformasyon tehlikelerini tartışacağız.</li>
            <li>YZ&apos;nin iş gücüne, gizliliğe ve çevreye etkisini değerlendireceğiz.</li>
            <li>Sorumlu YZ kullanımı için kendi ilkelerimizi oluşturacağız.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["etik", "önyargı (bias)", "adalet", "şeffaflık", "deepfake", "gizlilik", "sorumlu YZ"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. YZ Etiği Nedir?</h2>
          <p>
            YZ etiği, yapay zeka sistemlerinin tasarımında, geliştirilmesinde ve
            kullanımında doğru, adil ve sorumlu davranma ilkelerinin bütünüdür.
            YZ çok güçlü bir araç olduğu için bu gücü nasıl kullandığımız büyük önem taşır.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { ilke: "Şeffaflık", aciklama: "YZ sistemlerinin nasıl karar verdiği anlaşılabilir olmalı", icon: "🔍" },
              { ilke: "Adalet", aciklama: "Tüm insanlara ve gruplara eşit ve adil davranmalı", icon: "⚖️" },
              { ilke: "Gizlilik", aciklama: "Kişisel verileri korumalı ve izinsiz kullanmamalı", icon: "🔒" },
              { ilke: "Hesap Verebilirlik", aciklama: "YZ'nin yaptığı hatalardan biri sorumlu olmalı", icon: "📋" },
              { ilke: "Güvenlik", aciklama: "YZ sistemleri güvenli çalışmalı ve zarar vermemeli", icon: "🛡️" },
              { ilke: "İnsan Denetimi", aciklama: "Kritik kararlarda her zaman insan kontrolü olmalı", icon: "👤" },
            ].map((i) => (
              <div key={i.ilke} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-2xl">{i.icon}</span>
                <div>
                  <h4 className="font-bold">{i.ilke}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{i.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Önyargı (Bias) Problemi</h2>
          <p>
            YZ sistemleri eğitildikleri verilerdeki önyargıları öğrenir ve bu önyargıları
            kararlarında yansıtır. Bu durum adaletsiz sonuçlara yol açabilir.
          </p>
          <div className="space-y-3">
            {[
              { ornek: "İşe Alım YZ'si", sorun: "Geçmiş veriler erkek adayları tercih ediyorsa, YZ de erkekleri tercih eder", etki: "Cinsiyet ayrımcılığı" },
              { ornek: "Yüz Tanıma", sorun: "Eğitim verisinde belirli etnik gruplar az temsil edilmişse, bu gruplar için hata oranı yüksek olur", etki: "Irk ayrımcılığı" },
              { ornek: "Kredi Skoru", sorun: "Belirli semtlerde yaşayanlara otomatik düşük skor verilmesi", etki: "Sosyoekonomik ayrımcılık" },
            ].map((o) => (
              <div key={o.ornek} className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-900/20">
                <h4 className="mb-1 font-bold text-rose-700 dark:text-rose-400">{o.ornek}</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{o.sorun}</p>
                <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">Etki: {o.etki}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Deepfake ve Dezenformasyon</h2>
          <p>
            Deepfake, YZ kullanılarak oluşturulan gerçekçi görünen sahte video ve ses
            içerikleridir. Eğlence için kullanılabileceği gibi yanıltma amaçlı da kullanılabilir.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">⚠️ Tehlikeler</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Sahte haberler ve propaganda</li>
                <li>&#8226; Kişilik hakları ihlali</li>
                <li>&#8226; Dolandırıcılık (sahte ses ile banka işlemi)</li>
                <li>&#8226; Seçim manipülasyonu</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">🛡️ Nasıl Korunuruz?</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Kaynağın güvenilirliğini kontrol et</li>
                <li>&#8226; Görüntüdeki anormallikleri ara (dudak senkronu, göz kırpma)</li>
                <li>&#8226; Birden fazla kaynaktan doğrula</li>
                <li>&#8226; Deepfake tespit araçlarını kullan</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. YZ&apos;nin Toplumsal Etkileri</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { alan: "İş Gücü", icon: "💼", olumlu: "Yeni meslekler (YZ mühendisi, veri bilimci)", olumsuz: "Bazı rutin işlerin otomasyonu" },
              { alan: "Çevre", icon: "🌿", olumlu: "Enerji optimizasyonu, iklim modellemesi", olumsuz: "Büyük modellerin yüksek enerji tüketimi" },
              { alan: "Gizlilik", icon: "👁️", olumlu: "Güvenlik ve dolandırıcılık önleme", olumsuz: "Kitlesel gözetim ve veri toplama" },
            ].map((a) => (
              <div key={a.alan} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">{a.icon}</span>
                  <h4 className="font-bold">{a.alan}</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-emerald-600 dark:text-emerald-400">✅ {a.olumlu}</p>
                  <p className="text-rose-600 dark:text-rose-400">⚠️ {a.olumsuz}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Sınıf tartışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: YZ Mahkemesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Senaryo kartlarından bir etik ikilemi çekin. Sınıf savcı, savunma ve jüri
              olarak üçe ayrılır. Senaryo tartışıldıktan sonra jüri karar verir. Örnek:
              &quot;Bir hastanede YZ yanlış teşhis koydu ve hasta zarar gördü. Kim sorumlu?&quot;
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup çalışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Etik Pusula Oluşturma</h3>
            <p className="text-[var(--color-text-secondary)]">
              Grubunuzla birlikte &quot;Sorumlu YZ Kullanım İlkeleri&quot; bildirisi hazırlayın.
              En az 5 ilke belirleyin, her birini açıklayın ve poster olarak sınıfa asın.
              Sınıfça en iyi ilkeleri seçerek ortak bir sınıf bildirisi oluşturun.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Deepfake Dedektifi</h3>
            <p className="text-[var(--color-text-secondary)]">
              İnternette &quot;deepfake örnekleri&quot; arayın. YZ ile üretilmiş görselleri
              ve videoları tespit etmeye çalışın. İpuçlarını listeleyin. Sınıfla
              &quot;deepfake ile karşılaşırsak ne yapmalıyız?&quot; tartışması yapın.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["YZ Mahkemesi Senaryo Kartları (PDF)", "Etik Pusula Çalışma Yaprağı (PDF)", "Deepfake Tespit Kılavuzu (PDF)", "Değerlendirme Testi (PDF)", "Öz Değerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakın zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/8" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bölüm 8</Link>
          <Link href="/bolumler/10" className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition hover:bg-amber-700">Bölüm 10 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
