import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "YZ sistemlerinde 'onyargi' (bias) ne demektir?",
    secenekler: [
      "YZ'nin cok hizli calmasi",
      "Egitim verisindeki dengesizlikten kaynaklanan adaletsiz sonuclar",
      "YZ'nin her zaman dogru karar vermesi",
      "YZ'nin fazla enerji tuketmesi",
    ],
    dogru: 1,
    aciklama: "Onyargi, egitim verisindeki dengesizlik veya eksiklikten kaynaklanan sistematik hatalirdir. Belirli gruplara karsi adaletsiz sonuclar uretebilir.",
  },
  {
    soru: "Asagidakilerden hangisi YZ etigi ile ilgili onemli bir ilke DEGILDIR?",
    secenekler: [
      "Seffaflik (kararların aciklanabilir olmasi)",
      "Adalet (tum gruplara esit davranma)",
      "Kar maksimizasyonu (en cok para kazanma)",
      "Gizlilik (kisisel verilerin korunmasi)",
    ],
    dogru: 2,
    aciklama: "YZ etigi seffaflik, adalet, gizlilik ve hesap verebilirlik gibi ilkeleri kapsar. Kar maksimizasyonu etik bir ilke degildir.",
  },
  {
    soru: "Deepfake teknolojisi icin hangisi dogrudur?",
    secenekler: [
      "Her zaman zararsizdir",
      "Gercek olmayan video/ses icerikleri ureterek yaniltici olabilir",
      "Sadece eglence amacli kullanilir",
      "Kolayca tespit edilebilir",
    ],
    dogru: 1,
    aciklama: "Deepfake, gercekci goruneen sahte video ve ses icerikleri uretebilir. Dezenformasyon ve dolandiricilik icin kullnaılabilir.",
  },
  {
    soru: "YZ'nin cevresel etkisi konusunda hangisi dogrudur?",
    secenekler: [
      "YZ'nin hic cevresel etkisi yoktur",
      "Buyuk YZ modellerinin egitimi cok enerji tuketir ve karbon salimi yapar",
      "YZ sadece enerji tasarrufu saglar",
      "YZ sunuculari elektrik tuketmez",
    ],
    dogru: 1,
    aciklama: "Buyuk dil modellerinin egitimi tonlarca CO2 salimi yapar. YZ'nin cevresel etkisini azaltmak icin verimli modeller gelistirilmektedir.",
  },
  {
    soru: "Sorumlu YZ kullanimi icin en onemli prensip hangisidir?",
    secenekler: [
      "YZ'yi mumkun oldugunca cok kullanmak",
      "YZ'yi hic kullanmamak",
      "YZ'nin sinirlarini bilmek ve insani denetimle kullanmak",
      "YZ'ye tum kararlari birakmak",
    ],
    dogru: 2,
    aciklama: "Sorumlu YZ kullanimi, YZ'nin gucunu ve sinirlarini bilmek, her zaman insan denetimini korumak ve etik ilkelere uymak demektir.",
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
              <p className="text-sm font-medium text-amber-200">BOLUM 9 &middot; 7-8. Sinif &middot; 4 ders saati</p>
              <h1 className="text-3xl font-extrabold">YZ ve Etik</h1>
              <p className="text-amber-200">Dogru Kullanimin Pusulasi</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 dark:bg-amber-900/20">
          <h2 className="mb-3 text-lg font-bold text-amber-700 dark:text-amber-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>YZ etigi kavramini ve temel ilkelerini ogrenecegiz.</li>
            <li>YZ&apos;deki onyargi (bias) problemini ve etkilerini anlayacagiz.</li>
            <li>Deepfake ve dezenformasyon tehlikelerini tartisacagiz.</li>
            <li>YZ&apos;nin is gucune, gizlilige ve cevreye etkisini degerlendirecegiz.</li>
            <li>Sorumlu YZ kullanimi icin kendi ilkelerimizi olusturacagiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["etik", "onyargi (bias)", "adalet", "seffaflik", "deepfake", "gizlilik", "sorumlu YZ"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. YZ Etigi Nedir?</h2>
          <p>
            YZ etigi, yapay zeka sistemlerinin tasariminda, gelistirilmesinde ve
            kullaniminda dogru, adil ve sorumlulu davranma ilkelerinin butunudur.
            YZ cok guclu bir araç oldugu icin bu gucu nasil kullandigimiz buyuk onem tasir.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { ilke: "Seffaflik", aciklama: "YZ sistemlerinin nasil karar verdigi anlasilabilir olmali", icon: "🔍" },
              { ilke: "Adalet", aciklama: "Tum insanlara ve gruplara esit ve adil davranmali", icon: "⚖️" },
              { ilke: "Gizlilik", aciklama: "Kisisel verileri korumali ve izinsiz kullanmamali", icon: "🔒" },
              { ilke: "Hesap Verebilirlik", aciklama: "YZ'nin yaptigi hatalardan biri sorumlu olmali", icon: "📋" },
              { ilke: "Guvenlik", aciklama: "YZ sistmeleri guvenli calismalı ve zarar vermemeli", icon: "🛡️" },
              { ilke: "Insan Denetimi", aciklama: "Kritik kararlarda her zaman insan kontrolu olmali", icon: "👤" },
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
          <h2 className="text-2xl font-extrabold">2. Onyargi (Bias) Problemi</h2>
          <p>
            YZ sistemleri egitildikleri verilerdeki onyargilari ogrenir ve bu onyargilari
            kararlarinda yansitir. Bu durum adaletsiz sonuclara yol acabilir.
          </p>
          <div className="space-y-3">
            {[
              { ornek: "Ise Alim YZ'si", sorun: "Gecmis veriler erkek adaylari tercih ediyorsa, YZ de erkekleri tercih eder", etki: "Cinsiyet ayrimciligi" },
              { ornek: "Yuz Tanima", sorun: "Egitim verisinde belirli etnik gruplar az temsil edilmisse, bu gruplar icin hata orani yuksek olur", etki: "Irk ayrimciligi" },
              { ornek: "Kredi Skoru", sorun: "Belirli semtlerde yasayanlara otomatik dusuk skor verilmesi", etki: "Sosyoekonomik ayrimcilik" },
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
            Deepfake, YZ kullanilarak olusturulan gercekci gorunen sahte video ve ses
            icerikleridir. Eglence icin kullanilabilecegi gibi yaniltma amacli da kullanilabiir.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">⚠️ Tehlikeler</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Sahte haberler ve propaganda</li>
                <li>&#8226; Kisilik haklari ihlali</li>
                <li>&#8226; Dolandiricilik (sahte ses ile banka islemi)</li>
                <li>&#8226; Secim manipülasyonu</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">🛡️ Nasil Korunuruz?</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Kaynagin guvenilirligini kontrol et</li>
                <li>&#8226; Goruntudeki anormallikleri ara (dudak senkronuı, goz kirpma)</li>
                <li>&#8226; Birden fazla kaynaktan dogrula</li>
                <li>&#8226; Deepfake tespit araclarini kullan</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. YZ&apos;nin Toplumsal Etkileri</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { alan: "Is Gucu", icon: "💼", olumlu: "Yeni meslekler (YZ muhendisi, veri bilimci)", olumsuz: "Bazi rutin islerin otomasyonu" },
              { alan: "Cevre", icon: "🌿", olumlu: "Enerji optimizasyonu, iklim modellemesi", olumsuz: "Buyuk modellerin yuksek enerji tuketimi" },
              { alan: "Gizlilik", icon: "👁️", olumlu: "Guvenlik ve dolandiricilik onleme", olumsuz: "Kitlesel gozetim ve veri toplama" },
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
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Sinif tartismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: YZ Mahkemesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Senaryo kartlarindan bir etik ikilemi cekin. Sinif savci, savunma ve juri
              olarak ucce ayrilir. Senaryo tartisildiktan sonra juri karar verir. Ornek:
              &quot;Bir hastanede YZ yanlis teshis koydu ve hasta zarar gordu. Kim sorumlu?&quot;
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Etik Pusula Olusturma</h3>
            <p className="text-[var(--color-text-secondary)]">
              Grubunuzla birlikte &quot;Sorumlu YZ Kullanim Ilkeleri&quot; bildirisi hazirlayin.
              En az 5 ilke belirleyin, her birini acklayin ve poster olarak sinifa asin.
              Sinifca en iyi ilkeleri secerek ortak bir sinif bildirisi olusturun.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Deepfake Dedektifi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Internette &quot;deepfake ornekleri&quot; arayin. YZ ile uretilmis gorselleri
              ve videolari tesipt etmeye calisin. Ipucllarini listeleyin. Sinifla
              &quot;deepfake ile karsilasirsak ne yapmaliyiz?&quot; tartismasi yapin.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["YZ Mahkemesi Senaryo Kartlari (PDF)", "Etik Pusula Calisma Yapragi (PDF)", "Deepfake Tespit Kilavuzu (PDF)", "Degerlendirme Testi (PDF)", "Oz Degerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/8" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 8</Link>
          <Link href="/bolumler/10" className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition hover:bg-amber-700">Bolum 10 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
