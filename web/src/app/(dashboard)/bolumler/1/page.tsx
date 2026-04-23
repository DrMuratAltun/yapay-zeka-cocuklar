import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 1: Yapay Zeka Nedir? | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import YzMiDegilMi from "@/components/oyunlar/YzMiDegilMi";
import SinirAgiOyunAlani from "@/components/oyunlar/SinirAgiOyunAlani";
import KimDahaZeki from "@/components/etkinlikler/KimDahaZeki";
import YzDedektifi from "@/components/etkinlikler/YzDedektifi";
import ZamanCizelgesi from "@/components/etkinlikler/ZamanCizelgesi";
import TuringTesti from "@/components/etkinlikler/TuringTesti";
import YzZekaKarsilastir from "@/components/etkinlikler/YzZekaKarsilastir";
import OnculerInteraktif from "@/components/etkinlikler/OnculerInteraktif";
import TarihceZamanMakinesi from "@/components/etkinlikler/TarihceZamanMakinesi";
import YzTurleriKesif from "@/components/etkinlikler/YzTurleriKesif";
import BilgiKutusu from "@/components/anlati/BilgiKutusu";
import GecisSlayt from "@/components/anlati/GecisSlayt";
import KonuBasligi from "@/components/anlati/KonuBasligi";
import OzetKarti from "@/components/anlati/OzetKarti";
import Hikaye from "@/components/anlati/Hikaye";
import IcSayfa from "@/components/anlati/IcSayfa";

const quizSorulari = [
  {
    soru: "Aşağıdakilerden hangisi yapay zekanın tanımı için en uygun ifadedir?",
    secenekler: [
      "Bilgisayarların internete bağlanması",
      "Makinelerin insanlara benzer zeki davranışlar göstermesi",
      "Robotların insan şeklinde üretilmesi",
      "Bilgisayarların çok hızlı çalışması",
    ],
    dogru: 1,
  },
  {
    soru: '"Yapay zeka" terimi ilk kez hangi yıl kullanılmıştır?',
    secenekler: ["1943", "1950", "1956", "1997"],
    dogru: 2,
  },
  {
    soru: "Aşağıdakilerden hangisi dar yapay zeka (Narrow AI) örneği DEĞİLDİR?",
    secenekler: [
      "Sesli asistan (Siri)",
      "Satranç oynayan bilgisayar",
      "İnsanlar gibi her konuda düşünebilen robot",
      "Yüz tanıma sistemi",
    ],
    dogru: 2,
  },
  {
    soru: "Turing Testini kim öne sürmüştür?",
    secenekler: ["John McCarthy", "Alan Turing", "Cahit Arf", "Steve Jobs"],
    dogru: 1,
  },
  {
    soru: "Aşağıdaki görevlerden hangisinde yapay zeka insanlardan daha başarılıdır?",
    secenekler: [
      "Bir şiir yazmak",
      "Duyguları anlamak",
      "Milyonlarca veriyi saniyeler içinde analiz etmek",
      "Yeni bir buluşun fikrini ortaya atmak",
    ],
    dogru: 2,
  },
];

/* ---- Slayt 0: Hoş Geldin (yeni) ---- */
const SlaytHosGeldin = (
  <IcSayfa
    renkGradient="from-sky-500 via-blue-500 to-violet-500"
    sayfalar={[
      {
        emoji: "🎉",
        baslik: "Hoş Geldin!",
        icerik: (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-blue-500 to-violet-600 p-5 text-center text-white shadow-lg">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative">
              <span className="inline-block text-5xl float-1" aria-hidden="true">🤖</span>
              <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">Bir Maceraya Hazır mısın?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/90">
                Sen farkında olmadan bugün en az 5 yapay zekayla konuştun. Şimdi onları tanıma zamanı!
              </p>
            </div>
          </div>
        ),
      },
      {
        emoji: "📖",
        baslik: "Zeki ile tanış",
        icerik: (
          <Hikaye
            karakter="Zeki, YZ Asistanın"
            karakterEmoji="🤖"
            baslik="Merhaba kâşif!"
            paragraflar={[
              "Ben Zeki. Bu bölümde yanında olacağım. Birlikte zekanın ne olduğunu, makinelerin nasıl \"zeki\" davranabildiğini ve ben gibi YZ'lerin nasıl çalıştığını keşfedeceğiz.",
              "Sana söz veriyorum: bu bölüm bittiğinde telefonundaki asistana, Netflix'in önerilerine ve ChatGPT'ye farklı bir gözle bakacaksın.",
            ]}
            renkGradient="from-sky-500 via-blue-500 to-violet-500"
          />
        ),
      },
      {
        emoji: "🧭",
        baslik: "Bölümde Neler Var?",
        icerik: (
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { emoji: "⏱️", baslik: "4 ders saati", aciklama: "Kendi hızında ilerle" },
              { emoji: "🎮", baslik: "6 etkinlik", aciklama: "Uygulayarak öğren" },
              { emoji: "🧪", baslik: "2 oyun + 1 lab", aciklama: "Keşfet, dene, anla" },
            ].map((k) => (
              <div key={k.baslik} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 text-center">
                <div className="text-2xl" aria-hidden="true">{k.emoji}</div>
                <div className="mt-1 text-sm font-bold">{k.baslik}</div>
                <div className="text-xs text-[var(--color-text-secondary)]">{k.aciklama}</div>
              </div>
            ))}
          </div>
        ),
      },
    ]}
  />
);

/* ---- Slayt 1: Kazanımlar ---- */
const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-sky-500 bg-sky-50 p-6 dark:bg-sky-900/20">
      <h3 className="mb-3 text-lg font-bold text-sky-700 dark:text-sky-300">
        Neler Öğreneceğiz?
      </h3>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Zeka kavramını tanımlayabilir, insan zekası ile yapay zekayı karşılaştırabiliriz.</li>
        <li>Yapay zekanın tarihçesini ve önemli kilometre taşlarını öğreneceğiz.</li>
        <li>Yapay zeka türlerini (dar, genel, süper) ayırt edebileceğiz.</li>
        <li>Yapay zekanın günlük hayattaki örneklerini fark edeceğiz.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["zeka", "yapay zeka", "algoritma", "Turing Testi", "dar yapay zeka", "genel yapay zeka"].map(
        (k) => (
          <span
            key={k}
            className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
          >
            {k}
          </span>
        )
      )}
    </div>
  </>
);

/* ---- Geçiş 1: Kazanımlardan → Konu Anlatımına ---- */
const SlaytGecis1 = (
  <GecisSlayt
    emoji="🧭"
    renkGradient="from-sky-400 to-blue-600"
    oncekiBaslik="Yol Haritamız Hazır"
    oncekiOzet={
      <p>Bu bölümde neler öğreneceğimizi, hangi anahtar kelimelerle karşılaşacağımızı gördük.</p>
    }
    sonrakiBaslik="Şimdi: Zeka Nedir?"
    sonrakiOzet={
      <p>
        Önce kendi zekamızı tanıyalım. Zeka sadece &quot;matematik&quot; demek değildir —
        öğrenme, problem çözme, uyum sağlama ve hatta{" "}
        <strong>hayal kurma</strong> da zekanın bir parçasıdır.
      </p>
    }
    hikaye={
      <span>
        <strong>Zeki&apos;den not:</strong> Zekanın ne olduğunu anlamadan yapay zekayı anlayamayız.
        Çünkü &quot;yapay zeka&quot;, adı üstünde, insan zekasını taklit etmeye çalışır. İlk soru şu olmalı:
        <em>&quot;Biz nasıl öğreniyoruz?&quot;</em>
      </span>
    }
  />
);

/* ---- Slayt 2: Zeka Nedir? ---- */
const SlaytZekaNedir = (
  <section className="space-y-3">
    <KonuBasligi
      numara={1}
      baslik="Zeka Nedir?"
      altBaslik="Öğrenme, anlama ve uyum sağlama yeteneği"
      renkGradient="from-sky-500 to-blue-600"
    />
    <IcSayfa
      renkGradient="from-sky-500 to-blue-600"
      sayfalar={[
        {
          emoji: "🧠",
          baslik: "Tanım",
          icerik: (
            <div className="space-y-3">
              <p className="text-sm">
                Zeka, <strong>öğrenme, anlama, problem çözme ve yeni durumlara uyum sağlama</strong>
                yeteneklerimizin tamamıdır. Bebek yürümeyi, öğrenci matematiği, sporcu yeni
                taktikleri nasıl öğreniyorsa — zeka işte budur.
              </p>
              <BilgiKutusu tip="dusun">
                Bir hesap makinesi saniyeler içinde binlerce çarpma yapabilir. Bu onu{" "}
                <strong>zeki</strong> yapar mı? Neden?
              </BilgiKutusu>
            </div>
          ),
        },
        {
          emoji: "🎯",
          baslik: "Zekanın 4 bileşeni",
          icerik: (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { emoji: "📚", ad: "Öğrenme", aciklama: "Deneyimlerden ders alma" },
                { emoji: "🧩", ad: "Problem Çözme", aciklama: "Zorlukları aşmak" },
                { emoji: "🔁", ad: "Uyum Sağlama", aciklama: "Değişene ayak uydurma" },
                { emoji: "💭", ad: "Yaratıcılık", aciklama: "Yeni fikirler üretme" },
              ].map((z) => (
                <div
                  key={z.ad}
                  className="flex items-start gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
                >
                  <span className="text-2xl" aria-hidden="true">{z.emoji}</span>
                  <div>
                    <div className="text-sm font-bold">{z.ad}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{z.aciklama}</div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          emoji: "💡",
          baslik: "8 Farklı Zeka Türü",
          icerik: (
            <BilgiKutusu tip="biliyor-muydun" baslik="Howard Gardner'a göre">
              Zekayı ölçmenin tek bir yolu yok! Psikolog Howard Gardner,{" "}
              <strong>8 farklı zeka türü</strong> olduğunu söyler:
              <br />
              <span className="mt-2 inline-block">
                dilsel · mantıksal-matematiksel · uzamsal · bedensel · müzikal · sosyal · içsel · doğa
              </span>
              <br />
              <em>Sen hangisinde güçlüsün?</em>
            </BilgiKutusu>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Slayt 3: Yapay Zeka Nedir? ---- */
const SlaytYapayZekaNedir = (
  <section className="space-y-3">
    <h3 className="text-xl font-extrabold">Yapay Zeka Nedir?</h3>
    <IcSayfa
      renkGradient="from-sky-500 to-blue-600"
      sayfalar={[
        {
          emoji: "🎨",
          baslik: "YZ'nin Kavramsal Resmi",
          icerik: (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <Image
                  src="/images/illustrasyonlar/ai-kavram.svg"
                  alt="YZ: biyolojik beyin + dijital çip"
                  width={800}
                  height={480}
                  className="h-auto w-full"
                />
              </div>
              <p className="text-sm">
                YZ bir <strong>şemsiye terim</strong>: makine öğrenmesi, derin öğrenme,
                sinir ağları, doğal dil işleme ve daha fazlasını içerir.
              </p>
            </div>
          ),
        },
        {
          emoji: "⚖️",
          baslik: "İnsan vs Makine — Karşılaştırma",
          icerik: (
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl border border-[var(--color-border)] text-xs sm:text-sm">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Özellik</th>
                    <th className="px-3 py-2 text-left">İnsan Zekası</th>
                    <th className="px-3 py-2 text-left">YZ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Öğrenme", "Deneyim ve gözlemle", "Veri ve algoritmalarla"],
                    ["Yaratıcılık", "Çok güçlü", "Sınırlı (taklit)"],
                    ["Duygular", "Var", "Yok (taklit edebilir)"],
                    ["Hız", "Sınırlı", "Çok hızlı"],
                    ["Yorgunluk", "Yorulur", "Yorulmaz"],
                    ["Esneklik", "Yeni durumlara uyum", "Eğitildiği konuda başarılı"],
                  ].map(([o, i, y], idx) => (
                    <tr key={o} className={idx % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                      <td className="px-3 py-1.5 font-medium">{o}</td>
                      <td className="px-3 py-1.5">{i}</td>
                      <td className="px-3 py-1.5">{y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          emoji: "💡",
          baslik: "Biliyor muydun?",
          icerik: (
            <BilgiKutusu tip="biliyor-muydun">
              YZ 2024 itibariyle dünyada <strong>günde yaklaşık 100 milyon kez</strong> ChatGPT
              kullanıcılarıyla konuşuyor. Türkiye&apos;de de en çok kullanılan YZ araçlarından biri!
            </BilgiKutusu>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Slayt 4: Öncüler (interaktif) ---- */
const SlaytOnculer = (
  <section className="space-y-3">
    <KonuBasligi
      emoji="👨‍🔬"
      baslik="YZ'nin Öncüleri"
      altBaslik="Kartlara tıkla, hikayelerini oku"
      renkGradient="from-sky-500 to-indigo-600"
    />
    <OnculerInteraktif />
  </section>
);

/* ---- Slayt 5: Video ---- */
const SlaytVideo = (
  <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-6">
    <h3 className="mb-3 text-lg font-bold flex items-center gap-2">🎬 Yapay Zekanın Tarihçesi</h3>
    <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src="https://www.youtube.com/embed/ca_OjAqGpYs"
        title="Yapay Zekanın Tarihçesi"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
      📖 Yapay zekanın 1950&apos;lerden günümüze uzanan yolculuğunu keşfet!
    </p>
  </section>
);

/* ---- Slayt 6: YZ Tarihçesi (interaktif zaman makinesi) ---- */
const SlaytTarihce = (
  <section className="space-y-3">
    <KonuBasligi
      emoji="📅"
      baslik="Zaman Makinesi"
      altBaslik="YZ'nin 380 yıllık yolculuğu"
      renkGradient="from-violet-500 to-purple-600"
    />
    <TarihceZamanMakinesi />
  </section>
);

/* ---- Slayt 7: YZ Türleri (interaktif keşif) ---- */
const SlaytYzTurleri = (
  <section className="space-y-3">
    <KonuBasligi
      emoji="🔬"
      baslik="Yapay Zeka Türleri"
      altBaslik="3 tür YZ: Dar, Genel, Süper"
      renkGradient="from-emerald-500 to-teal-600"
    />
    <YzTurleriKesif />
  </section>
);

/* ---- Slayt 8: Etkinlik 1 - Kim Daha Zeki? ---- */
const SlaytEtkinlik1 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup çalışması</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Kim Daha Zeki?</h3>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Görev kartlarını kesin ve grubunuzla her görev için &quot;İnsan mı yoksa
        Makine mi daha iyi yapar?&quot; tartışmasını yapın.
      </p>
      <div className="flex gap-3">
        <a
          href="/indirilebilir/bolum-01-kim-daha-zeki-kartlari.html"
          target="_blank"
          className="inline-block rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Kartları İndir
        </a>
      </div>
    </div>

    <KimDahaZeki />
  </>
);

/* ---- Slayt 8b: Etkinlik 1b - Turing Testi ---- */
const SlaytEtkinlik1b = (
  <>
    <TuringTesti />
  </>
);

/* ---- Slayt 9: Etkinlik 2 - YZ Dedektifi ---- */
const SlaytEtkinlik2 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">GÖZLEM</span>
        <span className="text-sm text-[var(--color-text-secondary)]">1 gün + 20 dk sınıf tartışması</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 2: YZ Dedektifi</h3>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Bir gün boyunca karşılaştığınız yapay zeka uygulamalarını gözlem formuna kaydedin.
      </p>
      <div className="flex gap-3">
        <a
          href="/indirilebilir/bolum-01-yz-dedektifi-formu.html"
          target="_blank"
          className="inline-block rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Gözlem Formunu İndir
        </a>
      </div>
    </div>

    <YzDedektifi />
  </>
);

/* ---- Slayt 9b: Etkinlik 2b - YZ Zeka Karşılaştır ---- */
const SlaytEtkinlik2b = (
  <>
    <YzZekaKarsilastir />
  </>
);

/* ---- Slayt 10: Etkinlik 3 - YZ Zaman Çizelgesi ---- */
const SlaytEtkinlik3 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup çalışması</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 3: YZ Zaman Çizelgesi</h3>
      <p className="text-[var(--color-text-secondary)]">
        A3 kağıda zaman çizelgesi çizin, önemli olayları yerleştirin ve
        gelecek tahminlerinizi ekleyin. Posterinizi sınıfta sergileyin.
      </p>
    </div>

    <ZamanCizelgesi />
  </>
);

/* ---- Slayt 9: İnteraktif Oyun ---- */
const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 YZ mi Değil mi? Oyunu</h2>
    <p className="text-[var(--color-text-secondary)]">
      Her bir teknoloji veya uygulamanın yapay zeka olup olmadığını tahmin et!
    </p>
    <YzMiDegilMi />
  </section>
);

/* ---- Slayt 10: Değerlendirme ---- */
const SlaytDegerlendirme = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />
  </>
);

/* ---- Geçiş 2: Teoriden → Uygulamaya ---- */
const SlaytGecis2 = (
  <GecisSlayt
    emoji="🎯"
    renkGradient="from-emerald-400 to-teal-500"
    oncekiBaslik="Teorik Temelleri Gördük"
    oncekiOzet={
      <p>
        Zekayı, YZ&apos;nin tanımını, tarihini, Turing ve Cahit Arf&apos;ın katkılarını
        ve YZ türlerini öğrendin. Artık YZ&apos;nin ne olduğunu biliyorsun.
      </p>
    }
    sonrakiBaslik="Şimdi Uygulama Zamanı!"
    sonrakiOzet={
      <p>
        Sırada <strong>etkinlikler</strong> var: kart sıralama, Turing testine katılma,
        YZ dedektifi olma, gerçek hayattan örnekleri yakalama. Önce kendi ellerinle dene!
      </p>
    }
    hikaye={
      <span>
        <strong>Zeki&apos;den ipucu:</strong> Bir konuyu gerçekten anladığının en iyi
        göstergesi, o konuda bir arkadaşına anlatabilmendir. Aşağıdaki etkinlikleri
        yaparken &quot;bunu bir 5. sınıf öğrencisine nasıl anlatırdım?&quot; diye düşün.
      </span>
    }
  />
);

/* ---- Slayt Sinir Ağı Oyun Alanı (yeni interaktif uygulama) ---- */
const SlaytSinirAgiLab = (
  <section className="space-y-3">
    <KonuBasligi
      emoji="🧠"
      baslik="Sinir Ağı Oyun Alanı"
      altBaslik="Yapay zekanın 'beyni' nasıl çalışır?"
      renkGradient="from-violet-500 to-purple-600"
    />
    <IcSayfa
      renkGradient="from-violet-500 to-purple-600"
      sayfalar={[
        {
          emoji: "📖",
          baslik: "Giriş + Diyagram",
          icerik: (
            <div className="space-y-3">
              <p className="text-sm">
                YZ&apos;nin büyük kısmı <strong>yapay sinir ağları</strong> ile çalışır. Bu ağlar
                beynimizdeki nöron bağlantılarından ilham almıştır.
              </p>
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <Image
                  src="/images/illustrasyonlar/sinir-aglari.svg"
                  alt="Sinir ağı katmanları diyagramı"
                  width={900}
                  height={440}
                  className="h-auto w-full"
                />
              </div>
            </div>
          ),
        },
        {
          emoji: "🎮",
          baslik: "Laboratuvar",
          icerik: <SinirAgiOyunAlani />,
        },
        {
          emoji: "💡",
          baslik: "İpuçları + Biliyor muydun?",
          icerik: (
            <div className="space-y-3">
              <BilgiKutusu tip="ipucu" baslik="Nasıl Deneyelim?">
                <ol className="ml-4 list-decimal space-y-1">
                  <li>&quot;Tipik Elma / Portakal&quot; butonlarına bas — doğru tahmin ediyor mu?</li>
                  <li>Kaydırıcıları oynat. Tatlılığı arttırınca ne değişiyor?</li>
                  <li>&quot;Keşif Modu&quot;nu aç. Ağırlıkları sen ayarla — bozabilir misin?</li>
                </ol>
              </BilgiKutusu>
              <BilgiKutusu tip="biliyor-muydun">
                GPT-4 gibi büyük modellerde <strong>1,7 trilyon</strong> ağırlık var. Burada sadece 8
                ağırlık kullandık — prensip aynı!
              </BilgiKutusu>
            </div>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Geçiş 3: Etkinliklerden → Değerlendirmeye ---- */
const SlaytGecis3 = (
  <GecisSlayt
    emoji="🎓"
    renkGradient="from-amber-400 to-orange-500"
    oncekiBaslik="Harika İş Çıkardın!"
    oncekiOzet={
      <p>
        Etkinlikleri yaptın, oyunu oynadın ve YZ&apos;yi kendi ellerinle denedin.
        Artık YZ&apos;yi gerçek hayatta tanımakta çok daha iyisin.
      </p>
    }
    sonrakiBaslik="Şimdi Kendini Sınama Zamanı"
    sonrakiOzet={
      <p>
        Sırada <strong>değerlendirme testi</strong> var. Endişelenme — yarışma değil,
        sadece neleri iyi anladığını, nelere bir daha bakman gerektiğini görmek için.
      </p>
    }
    hikaye={
      <span>
        <strong>Zeki&apos;den motivasyon:</strong> Yanlış cevap vermekten korkma.
        YZ modelleri de <em>yanlış yapa yapa</em> öğrenir. Her hata, öğrenme fırsatıdır!
      </span>
    }
  />
);

/* ---- Bölüm Özeti ---- */
const SlaytBolumOzeti = (
  <OzetKarti
    baslik="Bölüm 1 Özeti"
    renkGradient="from-sky-500 to-blue-700"
    ogrenilenler={[
      "Zeka nedir? Öğrenme, problem çözme, uyum sağlama ve yaratıcılığın birleşimi.",
      "Yapay zeka, makinelerin insanlara benzer zeki davranışlar göstermesini sağlayan teknolojidir.",
      "'Yapay zeka' terimi ilk kez 1956'da John McCarthy tarafından ortaya atıldı.",
      "Alan Turing (1950 Turing Testi) ve Cahit Arf (1959 'Makineler düşünebilir mi?') öncüler.",
      "3 tür YZ var: Dar YZ (bugün), Genel YZ (AGI - araştırma), Süper YZ (ASI - teorik).",
      "Sinir ağları girdi → gizli katmanlar → çıktı şeklinde çalışır; ağırlıklar eğitimle öğrenilir.",
    ]}
    anahtarKelimeler={[
      "zeka",
      "yapay zeka",
      "algoritma",
      "Turing Testi",
      "dar YZ",
      "genel YZ",
      "süper YZ",
      "sinir ağı",
      "nöron",
      "ağırlık",
    ]}
    sorular={[
      "Telefonunda kullandığın en az 3 YZ uygulaması sayabilir misin?",
      "Bir hesap makinesini YZ yapan ya da yapmayan ne olurdu?",
      "Neden bugün kullandığımız her YZ 'Dar YZ' kategorisindedir?",
    ]}
  />
);

/* ---- Slayt 11: İndirilebilir Materyaller ---- */
const SlaytMateryaller = (
  <>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h3 className="mb-4 text-xl font-bold">İndirilebilir Materyaller</h3>
      <div className="space-y-3">
        {[
          { ad: "Kim Daha Zeki? Kart Seti", url: "/indirilebilir/bolum-01-kim-daha-zeki-kartlari.html" },
          { ad: "YZ Dedektifi Gözlem Formu", url: "/indirilebilir/bolum-01-yz-dedektifi-formu.html" },
          { ad: "Değerlendirme Testi", url: "/indirilebilir/bolum-01-degerlendirme-testi.html" },
          { ad: "Öz Değerlendirme Formu", url: "/indirilebilir/bolum-01-oz-degerlendirme.html" },
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

export default function Bolum1() {
  return (
    <BolumSlider
      bolumNo={1}
      bolumBaslik="Yapay Zeka Nedir?"
      bolumAltBaslik="Keşif Yolculuğu"
      seviye="6. Sınıf"
      ders={4}
      renk="from-sky-600 to-blue-700"
      oncekiBolum={null}
      sonrakiBolum={2}
      slaytlar={[
        { baslik: "Hoş Geldin!", icon: "👋", icerik: SlaytHosGeldin },
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Yolculuk Başlıyor", icon: "🧭", icerik: SlaytGecis1 },
        { baslik: "Zeka Nedir?", icon: "🧠", icerik: SlaytZekaNedir },
        { baslik: "Yapay Zeka Nedir?", icon: "🤖", icerik: SlaytYapayZekaNedir },
        { baslik: "Öncüler", icon: "👨‍🔬", icerik: SlaytOnculer },
        { baslik: "Video", icon: "🎬", icerik: SlaytVideo },
        { baslik: "YZ Tarihçesi", icon: "📅", icerik: SlaytTarihce },
        { baslik: "YZ Türleri", icon: "🔬", icerik: SlaytYzTurleri },
        { baslik: "Sinir Ağı Lab", icon: "🧪", icerik: SlaytSinirAgiLab },
        { baslik: "Uygulama Zamanı", icon: "🎯", icerik: SlaytGecis2 },
        { baslik: "Etkinlik: Kim Daha Zeki?", icon: "🎮", icerik: SlaytEtkinlik1 },
        { baslik: "Etkinlik: Turing Testi", icon: "🧪", icerik: SlaytEtkinlik1b },
        { baslik: "Etkinlik: YZ Dedektifi", icon: "🎮", icerik: SlaytEtkinlik2 },
        { baslik: "Etkinlik: Zeka Karşılaştır", icon: "⚖️", icerik: SlaytEtkinlik2b },
        { baslik: "Etkinlik: YZ Zaman Çizelgesi", icon: "🎮", icerik: SlaytEtkinlik3 },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Kendini Sına", icon: "🎓", icerik: SlaytGecis3 },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Bölüm Özeti", icon: "🏆", icerik: SlaytBolumOzeti },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
