import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 9: YZ ve Etik | Yapay Zeka Macerası",
};

import Image from "next/image";
import BolumSlider from "@/components/BolumSlider";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import EtikPusula from "@/components/oyunlar/EtikPusula";
import EtikMahkeme from "@/components/etkinlikler/EtikMahkeme";
import DeepfakeTespit from "@/components/etkinlikler/DeepfakeTespit";

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

const SlaytKazanimlar = (
  <>
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
  </>
);

const SlaytEtikIlkeleri = (
  <section className="space-y-4">
    <h2 className="text-2xl font-extrabold">1. YZ Etiği Nedir?</h2>
    <p>
      YZ etiği, yapay zeka sistemlerinin tasarımında, geliştirilmesinde ve
      kullanımında doğru, adil ve sorumlu davranma ilkelerinin bütünüdür.
      YZ çok güçlü bir araç olduğu için bu gücü nasıl kullandığımız büyük önem taşır.
    </p>
    <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <Image src="/images/bolumler/scales.svg" alt="Adalet terazisi - YZ etiği ve adalet ilkesi" width={180} height={180} className="rounded-lg object-cover shadow-md" />
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">YZ etiğinin temel taşı: Adalet ve denge</p>
      <p className="text-xs text-[var(--color-text-secondary)] italic">Public Domain</p>
    </div>
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

    <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-900/20 dark:to-orange-900/20">
      <p className="font-medium">🤔 <strong>Biliyor Muydunuz?</strong> Deepfake videoların %96&apos;sı kadınları hedef alıyor — bu ciddi bir etik sorun!</p>
    </div>
  </section>
);

const SlaytOnyargi = (
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

    <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
      <p className="font-medium">💡 <strong>İpucu:</strong> Bir YZ sistemi adaletsiz sonuç veriyorsa, genellikle sorun YZ&apos;nin kendisinde değil, eğitim verisindeki dengesizliktedir!</p>
    </div>
  </section>
);

const SlaytDeepfake = (
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

    <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
      <p className="font-medium">⚠️ <strong>Dikkat:</strong> Sosyal medyada gördüğünüz her videoya inanmayın! &quot;Bu gerçek mi?&quot; diye sormayı alışkanlık haline getirin.</p>
    </div>
  </section>
);

const SlaytToplumsalEtki = (
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
);

const SlaytEtkinlikler = (
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

    <EtikMahkeme />

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

    <DeepfakeTespit />
  </section>
);

const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Etik Pusula</h2>
    <p className="text-[var(--color-text-secondary)]">
      YZ kullanım senaryolarını değerlendir ve etik farkındalığını test et!
    </p>
    <EtikPusula />
  </section>
);

const SlaytDegerlendirme = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />
  </>
);

const SlaytMateryaller = (
  <>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
      <div className="space-y-3">
        {[
          { ad: "YZ Mahkemesi Senaryo Kartları", url: "/indirilebilir/bolum-09-yz-mahkemesi-senaryo-kartlari.html" },
          { ad: "Etik Pusula Çalışma Yaprağı", url: "/indirilebilir/bolum-09-etik-pusula-calisma-yapragi.html" },
          { ad: "Deepfake Tespit Kılavuzu", url: "/indirilebilir/bolum-09-deepfake-tespit-kilavuzu.html" },
        ].map((dosya) => (
          <a
            key={dosya.ad}
            href={dosya.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 transition hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/10"
          >
            <span className="text-sm font-medium">{dosya.ad}</span>
            <span className="rounded bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              Yazdır / İndir
            </span>
          </a>
        ))}
      </div>
    </section>
  </>
);

export default function Bolum9() {
  const slaytlar = [
    { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
    { baslik: "YZ Etiği Nedir?", icon: "⚖️", icerik: SlaytEtikIlkeleri },
    { baslik: "Önyargı Problemi", icon: "🔍", icerik: SlaytOnyargi },
    { baslik: "Deepfake ve Dezenformasyon", icon: "🎭", icerik: SlaytDeepfake },
    { baslik: "Toplumsal Etkiler", icon: "🌍", icerik: SlaytToplumsalEtki },
    { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
    { baslik: "Etik Pusula", icon: "🧩", icerik: SlaytOyun },
    { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
    { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
  ];

  return (
    <BolumSlider
      bolumNo={9}
      bolumBaslik="YZ ve Etik"
      bolumAltBaslik="Doğru Kullanımın Pusulası"
      seviye="7-8. Sınıf"
      ders={4}
      renk="from-amber-500 to-orange-600"
      slaytlar={slaytlar}
      oncekiBolum={8}
      sonrakiBolum={10}
    />
  );
}
