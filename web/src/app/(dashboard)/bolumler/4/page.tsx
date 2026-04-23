import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 4: Makineler Nasıl Öğrenir? | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import KararAgaci from "@/components/oyunlar/KararAgaci";
import SinirAgiOyunAlani from "@/components/oyunlar/SinirAgiOyunAlani";
import OgrenmeTurleri from "@/components/oyunlar/OgrenmeTurleri";
import MeyveSiniflandirici from "@/components/etkinlikler/MeyveSiniflandirici";
import ModelBasariRaporu from "@/components/etkinlikler/ModelBasariRaporu";
import TeachableMachineRehber from "@/components/etkinlikler/TeachableMachineRehber";
import MLForKidsRehber from "@/components/etkinlikler/MLForKidsRehber";
import SiniflandirmaPratigi from "@/components/etkinlikler/SiniflandirmaPratigi";
import OgrenimTurleriQuiz from "@/components/etkinlikler/OgrenimTurleriQuiz";
import BilgiKutusu from "@/components/anlati/BilgiKutusu";
import GecisSlayt from "@/components/anlati/GecisSlayt";
import KonuBasligi from "@/components/anlati/KonuBasligi";
import OzetKarti from "@/components/anlati/OzetKarti";
import Hikaye from "@/components/anlati/Hikaye";
import IcSayfa from "@/components/anlati/IcSayfa";

const quizSorulari = [
  {
    soru: "Makine öğrenimi için en doğru tanım hangisidir?",
    secenekler: [
      "Bilgisayarların insan gibi düşünmesi",
      "Makinelerin veriden örüntü öğrenerek tahmin yapması",
      "Robotların fiziksel olarak öğrenmesi",
      "Programcıların her kuralı tek tek yazması",
    ],
    dogru: 1,
    aciklama: "Makine öğrenimi, makinelerin açıkça programlanmadan verilerden örüntü keşfetmesi ve bu örüntülerle tahmin yapmasıdır.",
  },
  {
    soru: "Google Teachable Machine ile hangi tür model eğitilebilir?",
    secenekler: [
      "Sadece ses tanıma",
      "Görüntü, ses ve vücut pozu tanıma",
      "Sadece metin sınıflandırma",
      "Sadece yüz tanıma",
    ],
    dogru: 1,
    aciklama: "Teachable Machine üç farklı model türünü destekler: görüntü sınıflandırma, ses tanıma ve vücut pozu tanıma.",
  },
  {
    soru: "Bir makine öğrenimi modelini eğitirken 'eğitim verisi' ne işe yarar?",
    secenekler: [
      "Modelin performansını test etmek",
      "Modelin örüntüleri öğrenmesini sağlamak",
      "Modeli internete bağlamak",
      "Modelin hızını artırmak",
    ],
    dogru: 1,
    aciklama: "Eğitim verisi, modelin örüntüleri ve ilişkileri öğrendiği veri setidir. Model bu verilerle 'ders çalışır'.",
  },
  {
    soru: "Aşağıdakilerden hangisi 'gözetimli öğrenme' örneği DEĞİLDİR?",
    secenekler: [
      "Etiketli fotoğraflarla kedi/köpek ayırma",
      "Spam/spam değil e-posta sınıflandırma",
      "Müşterileri otomatik gruplara ayırma (etiket olmadan)",
      "Ev fiyatı tahmini",
    ],
    dogru: 2,
    aciklama: "Etiket olmadan gruplama 'gözetimsiz öğrenme' örneğidir. Gözetimli öğrenmede her veri için doğru cevap (etiket) verilir.",
  },
  {
    soru: "Bir modelin eğitim verisinde çok iyi, yeni verilerde kötü performans göstermesine ne denir?",
    secenekler: [
      "Overfitting (aşırı uyum)",
      "Underfitting (yetersiz uyum)",
      "Transfer öğrenimi",
      "Pekiştirmeli öğrenme",
    ],
    dogru: 0,
    aciklama: "Overfitting, modelin eğitim verisini 'ezberlemesi' anlamına gelir. Bu model yeni, görmediği verilerde başarısız olur.",
  },
];

/* ---- Slayt 1: Kazanımlar ---- */
/* ---- Hoş Geldin (yeni) ---- */
const SlaytHosGeldin4 = (
  <>
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 text-center text-white shadow-xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white blur-3xl" />
      </div>
      <div className="relative">
        <span className="inline-block text-6xl float-1" aria-hidden="true">🤖</span>
        <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">Makineler Nasıl Öğrenir?</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 md:text-base">
          Bu bölüm yapay zekanın kalbi! Makinelerin nasıl &quot;deneyimden&quot; öğrendiğini, kendi modelini eğitebildiğini göreceksin.
        </p>
      </div>
    </div>

    <Hikaye
      karakter="Zeki"
      karakterEmoji="🤖"
      baslik="Bir bebek kediyi nasıl tanır?"
      paragraflar={[
        "Bir bebek için \"kedi\" tanımı yapamazsın. Onun yerine ona kedi gösterirsin: \"İşte kedi!\" Bir, iki, on, yüz... Sonunda bebek kediyi tanır oldu.",
        "Makine öğrenmesi tam olarak bu. Önceden kural yazmak yerine örnek gösterir, makine örüntüyü kendi keşfeder.",
        <span key="end">
          Bu bölümde: 3 öğrenme türünü öğreneceksin (denetimli/denetimsiz/pekiştirmeli),
          <strong> Sinir Ağı Oyun Alanı</strong>nda canlı bir ağı çalıştıracaksın ve
          <strong> Öğrenme Türleri Sıralayıcı</strong>&apos;da gerçek problemleri kategorize edeceksin.
        </span>,
      ]}
      renkGradient="from-orange-500 via-amber-500 to-yellow-500"
    />
  </>
);

/* ---- Geçiş: Teori → Sinir Ağı Lab ---- */
const SlaytGecis4_1 = (
  <GecisSlayt
    emoji="🧠"
    renkGradient="from-amber-500 to-orange-500"
    oncekiBaslik="ML Türlerini Tanıdık"
    oncekiOzet={
      <p>
        Geleneksel programlamayla makine öğrenmesinin farkını, 3 öğrenme türünü ve karar ağaçlarını gördün.
      </p>
    }
    sonrakiBaslik="Şimdi: Canlı Bir Sinir Ağı"
    sonrakiOzet={
      <p>
        Sıradaki <strong>Sinir Ağı Oyun Alanı</strong>&apos;nda kaydırıcılarla giriş değiştirip
        ağın tahminini canlı izleyeceksin. Bu &quot;derin öğrenme&quot;nin en küçük örneği!
      </p>
    }
  />
);

/* ---- Sinir Ağı Lab Slaytı ---- */
const SlaytSinirAgiLab4 = (
  <section className="space-y-6">
    <KonuBasligi
      emoji="🧠"
      baslik="Sinir Ağı Oyun Alanı"
      altBaslik="Beyin gibi öğrenen yapay ağlar"
      renkGradient="from-violet-500 to-purple-600"
    />

    <p className="text-sm text-[var(--color-text-secondary)] md:text-base">
      Yapay sinir ağları, beynimizdeki nöron bağlantılarından ilham alır. Aşağıdaki laboratuvarda
      gerçek bir &quot;mini sinir ağı&quot; çalıştırıyorsun!
    </p>

    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
      <Image
        src="/images/illustrasyonlar/sinir-aglari.svg"
        alt="Sinir ağı katmanları diyagramı"
        width={1000}
        height={600}
        className="h-auto w-full"
      />
    </div>

    <SinirAgiOyunAlani />

    <BilgiKutusu tip="biliyor-muydun">
      Bir insan beyninde yaklaşık <strong>86 milyar nöron</strong> ve trilyonlarca bağlantı var.
      GPT-4&apos;te ise <strong>1,7 trilyon ağırlık</strong> var. Yine de insan beyninin verimliliği eşsiz!
    </BilgiKutusu>
  </section>
);

/* ---- Öğrenme Türleri Sıralayıcı Slaytı ---- */
const SlaytOgrenmeTurleriLab = (
  <section className="space-y-6">
    <KonuBasligi
      emoji="🎓"
      baslik="Öğrenme Türleri Sıralayıcı"
      altBaslik="Hangi problem hangi türle çözülür?"
      renkGradient="from-sky-500 to-violet-500"
    />

    <p className="text-sm text-[var(--color-text-secondary)] md:text-base">
      12 gerçek dünya problemi var. Her birini doğru öğrenme türüne yerleştir!
      Sürükle-bırak veya butonlarla seç.
    </p>

    <OgrenmeTurleri />

    <BilgiKutusu tip="ipucu">
      <strong>İpucu:</strong> &quot;Önceden doğru cevabı biliyor muyuz?&quot; → <em>Denetimli</em>.
      &quot;Sadece veri var, kategorize et&quot; → <em>Denetimsiz</em>.
      &quot;Ödül-ceza ile öğreniyor mu?&quot; → <em>Pekiştirmeli</em>.
    </BilgiKutusu>
  </section>
);

/* ---- Bölüm 4 Özeti ---- */
const SlaytBolumOzeti4 = (
  <OzetKarti
    baslik="Bölüm 4 Özeti"
    renkGradient="from-orange-500 to-amber-600"
    ogrenilenler={[
      "Geleneksel programlama: insan kural yazar. ML: makine veriden öğrenir.",
      "Denetimli öğrenme: etiketli veri (girdi + doğru cevap) ile eğitim.",
      "Denetimsiz öğrenme: etiketsiz veride örüntü/grup keşfi.",
      "Pekiştirmeli öğrenme: ödül-ceza ile deneme-yanılma.",
      "Sınıflandırma vs Regresyon: sınıf tahmin et VS sayı tahmin et.",
      "Karar ağacı: 'evet/hayır' soruları zinciri ile karar verir.",
      "Sinir ağı: Giriş → Gizli katmanlar → Çıkış. Ağırlıklar eğitimle öğrenilir.",
    ]}
    anahtarKelimeler={[
      "makine öğrenmesi",
      "denetimli",
      "denetimsiz",
      "pekiştirmeli",
      "sınıflandırma",
      "regresyon",
      "karar ağacı",
      "sinir ağı",
      "model eğitimi",
      "doğruluk",
    ]}
    sorular={[
      "Spotify'ın sana öneri yapması hangi öğrenme türü? Neden?",
      "Yeni bir oyun öğrenen YZ asistanı hangi tür?",
      "Karar ağacının sinir ağına göre artıları ne olabilir?",
    ]}
  />
);

const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-orange-500 bg-orange-50 p-6 dark:bg-orange-900/20">
      <h3 className="mb-3 text-lg font-bold text-orange-700 dark:text-orange-300">Neler Öğreneceğiz?</h3>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Makine öğrenimi kavramını ve geleneksel programlamadan farkını anlayacağız.</li>
        <li>Gözetimli, gözetimsiz ve pekiştirmeli öğrenme türlerini ayırt edebileceğiz.</li>
        <li>Sınıflandırma ve tahmin kavramlarını öğreneceğiz.</li>
        <li>Google Teachable Machine ile kendi modelimizi eğiteceğiz.</li>
        <li>Bir modelin başarısını değerlendirmenin temellerini öğreneceğiz.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["makine öğrenimi", "model", "eğitim", "sınıflandırma", "tahmin", "gözetimli öğrenme", "özellik (feature)"].map((k) => (
        <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
      ))}
    </div>
  </>
);

/* ---- Slayt 2: Geleneksel Programlama vs Makine Öğrenimi ---- */
const SlaytGelenekselVsML = (
  <section className="space-y-3">
    <h3 className="text-xl font-extrabold">1. Geleneksel Programlama vs Makine Öğrenimi</h3>
    <IcSayfa
      renkGradient="from-blue-500 to-orange-500"
      sayfalar={[
        {
          emoji: "🎯",
          baslik: "İki Yaklaşım Karşılaştırması",
          icerik: (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
                <h4 className="mb-2 font-bold text-blue-700 dark:text-blue-400">Geleneksel</h4>
                <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-white/60 p-2 text-xs dark:bg-white/5">
                  <span className="font-mono text-blue-600">Veri</span>+
                  <span className="font-mono text-blue-600">Kurallar</span>=
                  <span className="font-bold">Sonuç</span>
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  Programcı kuralları yazar:<br />
                  &quot;Sıcaklık &gt; 30 ise &apos;sıcak&apos;&quot;
                </p>
              </div>
              <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-900/20">
                <h4 className="mb-2 font-bold text-orange-700 dark:text-orange-400">Makine Öğrenimi</h4>
                <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-white/60 p-2 text-xs dark:bg-white/5">
                  <span className="font-mono text-orange-600">Veri</span>+
                  <span className="font-mono text-orange-600">Sonuçlar</span>=
                  <span className="font-bold">Kurallar</span>
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  Bilgisayar kuralları kendisi bulur:<br />
                  1000 örnek → &quot;sıcak/soğuk&quot; kalıbını öğrenir
                </p>
              </div>
            </div>
          ),
        },
        {
          emoji: "🤔",
          baslik: "Düşünelim",
          icerik: (
            <div className="space-y-3">
              <BilgiKutusu tip="dusun">
                Bir çocuğa &quot;kedi&quot;yi tanımlamayı nasıl öğretirsin? Kuralları mı anlatırsın
                (&quot;4 bacaklı, tüylü, miyavlar&quot;) yoksa çok sayıda kedi fotoğrafı mı
                gösterirsin?
              </BilgiKutusu>
              <BilgiKutusu tip="biliyor-muydun">
                Google&apos;ın YZ&apos;si bir günde <strong>10 milyon kedili fotoğrafı</strong>
                analiz edebilir!
              </BilgiKutusu>
            </div>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Slayt 3: Makine Öğrenimi Türleri ---- */
const SlaytOgrenimTurleri = (
  <section className="space-y-3">
    <h3 className="text-xl font-extrabold">2. Makine Öğrenimi Türleri</h3>
    <IcSayfa
      renkGradient="from-emerald-500 via-blue-500 to-violet-500"
      sayfalar={[
        {
          emoji: "🏷️",
          baslik: "Gözetimli Öğrenme (Supervised)",
          icerik: (
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20">
              <p className="mb-2 text-sm">
                Her veri için doğru cevap (etiket) verilir. Model, girdi-çıktı ilişkisini öğrenir.
              </p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Örnekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>E-posta: &quot;spam&quot; veya &quot;spam değil&quot; sınıflandırması</li>
                  <li>Görüntü: &quot;kedi&quot; veya &quot;köpek&quot; tanıma</li>
                  <li>Ev fiyatı tahmini (m2, oda sayısı → fiyat)</li>
                </ul>
              </div>
              <p className="mt-2 rounded bg-emerald-200 px-2 py-1 text-center text-xs font-bold dark:bg-emerald-800">
                EN YAYGIN TÜR
              </p>
            </div>
          ),
        },
        {
          emoji: "🔍",
          baslik: "Gözetimsiz Öğrenme (Unsupervised)",
          icerik: (
            <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
              <p className="mb-2 text-sm">
                Etiket yoktur. Model verideki gizli örüntüleri ve grupları kendisi keşfeder.
              </p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Örnekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>Müşteri segmentasyonu (benzer müşterileri gruplama)</li>
                  <li>Haber konularını otomatik gruplama</li>
                  <li>Anormal davranış tespiti</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          emoji: "🎮",
          baslik: "Pekiştirmeli Öğrenme (Reinforcement)",
          icerik: (
            <div className="rounded-xl border-2 border-violet-300 bg-violet-50 p-4 dark:border-violet-700 dark:bg-violet-900/20">
              <p className="mb-2 text-sm">
                Model deneme-yanılma ile öğrenir. Doğru davranışlar ödül, yanlış davranışlar ceza alır.
              </p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Örnekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>AlphaGo - Go oyununu öğrenen YZ</li>
                  <li>Robotların yürümesini öğrenmesi</li>
                  <li>Otonom araçların sürüşü öğrenmesi</li>
                </ul>
              </div>
            </div>
          ),
        },
        {
          emoji: "🧠",
          baslik: "Sinir Ağları — Büyük Resim",
          icerik: (
            <div className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
              <Image
                src="/images/bolumler/neural-network.svg"
                alt="Yapay sinir agi diyagrami"
                width={500}
                height={360}
                className="rounded-lg object-cover shadow-md"
              />
              <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
                Yapay sinir ağı: Nöronların katmanlar halinde bağlantısı
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] italic">
                Görsel: Cburnett, CC BY-SA 3.0
              </p>
            </div>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Slayt 4: Sınıflandırma ve Tahmin ---- */
const SlaytSiniflandirma = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">3. Sınıflandırma ve Tahmin</h3>

    <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <Image src="/images/bolumler/ml-nutshell.svg" alt="Gozetimli makine ogrenimi sureci" width={600} height={350} className="rounded-lg object-cover shadow-md" />
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">Gozetimli makine ogrenimi sureci: Veri, egitim ve tahmin adimlari</p>
      <p className="text-xs text-[var(--color-text-secondary)] italic">Gorsel: EpochFail, CC BY-SA 4.0</p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Özellik</th>
            <th className="px-4 py-3 text-left">Sınıflandırma</th>
            <th className="px-4 py-3 text-left">Tahmin (Regresyon)</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Çıktı", "Kategori (sınıf)", "Sayı (değer)"],
            ["Örnek", "Kedi mi köpek mi?", "Evin fiyatı kaç TL?"],
            ["Örnek 2", "Spam mı değil mi?", "Yarın sıcaklık kaç derece?"],
            ["Sonuç türü", "Ayrık (2+ sınıf)", "Sürekli (sayısal)"],
          ].map(([ozellik, sinif, tahmin], i) => (
            <tr key={ozellik} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
              <td className="px-4 py-2.5 font-medium">{ozellik}</td>
              <td className="px-4 py-2.5">{sinif}</td>
              <td className="px-4 py-2.5">{tahmin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
      <p className="font-medium">💡 <strong>İpucu:</strong> Sınıflandırma &quot;hangi kutuya?&quot; sorusunu, tahmin ise &quot;ne kadar?&quot; sorusunu cevaplar. Bunu hatırla!</p>
    </div>
  </section>
);

/* ---- Slayt 5: Karar Ağacı ile Sınıflandırma ---- */
const SlaytKararAgaci = (
  <section className="space-y-3">
    <h3 className="text-xl font-extrabold">4. Karar Ağacı ile Sınıflandırma</h3>
    <IcSayfa
      renkGradient="from-orange-500 to-amber-500"
      sayfalar={[
        {
          emoji: "🌳",
          baslik: "Ne işe yarar?",
          icerik: (
            <p className="text-sm">
              Karar ağacı, <strong>en anlaşılır ML algoritmalarından biri</strong>. Her düğümde
              bir soru sorulur, cevaba göre dallanılır. Sonunda yaprakta bir karar/sınıf vardır.
              İnsan gibi düşünür — bu yüzden &quot;açıklanabilir YZ&quot;.
            </p>
          ),
        },
        {
          emoji: "🍎",
          baslik: "Örnek: Meyve Tanıma",
          icerik: (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm">
              <div className="mb-3 inline-block rounded-lg bg-orange-500 px-3 py-1.5 font-bold text-white">
                Meyve hangisi?
              </div>
              <div className="ml-3 space-y-2">
                <span className="font-medium">Rengi kırmızı mı?</span>
                <div className="ml-4 space-y-1.5">
                  <div>
                    <span className="font-bold text-emerald-600">Evet →</span> Yuvarlak mı?
                    <div className="ml-6 mt-1 space-y-0.5">
                      <div><span className="font-bold text-emerald-600">Evet →</span> <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍎 Elma</span></div>
                      <div><span className="font-bold text-rose-600">Hayır →</span> <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍓 Çilek</span></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-rose-600">Hayır →</span> Sarı mı?
                    <div className="ml-6 mt-1 space-y-0.5">
                      <div><span className="font-bold text-emerald-600">Evet →</span> <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">🍌 Muz</span></div>
                      <div><span className="font-bold text-rose-600">Hayır →</span> <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">🍊 Portakal</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          emoji: "⚠️",
          baslik: "Dikkat: Aşırı Uyum",
          icerik: (
            <BilgiKutusu tip="dikkat">
              Karar ağacı çok derinleşirse <strong>aşırı uyum (overfitting)</strong> problemi
              oluşabilir. Model eğitim örneklerini ezberler, yeni verilerde hata yapar. Ağacın
              <em> basit ama etkili</em> olması önemlidir!
            </BilgiKutusu>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Slayt 6: Teachable Machine ile Model Eğitimi ---- */
const SlaytTeachableMachine = (
  <section className="space-y-3">
    <h3 className="text-xl font-extrabold">5. Teachable Machine ile Model Eğitimi</h3>
    <IcSayfa
      renkGradient="from-orange-500 to-amber-500"
      sayfalar={[
        {
          emoji: "🧪",
          baslik: "3 Model Türü",
          icerik: (
            <div className="space-y-3">
              <p className="text-sm">
                Google Teachable Machine, kodlama bilmeden kendi YZ modelini eğitmeni sağlar.
                Üç türde model eğitebilirsin:
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { tur: "Görüntü", icon: "📸", aciklama: "Kamera/resim sınıflandırma" },
                  { tur: "Ses", icon: "🎙️", aciklama: "Mikrofonla ses tanıma" },
                  { tur: "Poz", icon: "🤸", aciklama: "Vücut pozu sınıflandırma" },
                ].map((m) => (
                  <div key={m.tur} className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-center dark:border-orange-800 dark:bg-orange-900/20">
                    <span className="text-3xl">{m.icon}</span>
                    <h4 className="mt-1 text-sm font-bold">{m.tur}</h4>
                    <p className="text-[10px] text-[var(--color-text-secondary)]">{m.aciklama}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          emoji: "🛠️",
          baslik: "5 Adımda Model Eğitimi",
          icerik: (
            <div className="space-y-2">
              {[
                { adim: 1, baslik: "Sınıf Oluştur", aciklama: "En az 2 sınıf (örn. 'Kedi' ve 'Köpek')" },
                { adim: 2, baslik: "Örnek Topla", aciklama: "Her sınıf için en az 50 fotoğraf" },
                { adim: 3, baslik: "Modeli Eğit", aciklama: "'Train Model' butonu → model öğrenir" },
                { adim: 4, baslik: "Test Et", aciklama: "Kamera aç, yeni fotoğraf yükle, kontrol et" },
                { adim: 5, baslik: "Geliştir", aciklama: "Başarı düşükse → daha çok örnek, farklı açı" },
              ].map((a) => (
                <div key={a.adim} className="flex items-start gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                    {a.adim}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold">{a.baslik}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">{a.aciklama}</p>
                  </div>
                </div>
              ))}
              <div className="mt-2 rounded-lg bg-sky-50 p-2 text-xs font-medium text-sky-700 dark:bg-sky-900/20 dark:text-sky-300">
                🔗 teachablemachine.withgoogle.com
              </div>
            </div>
          ),
        },
        {
          emoji: "💡",
          baslik: "Biliyor muydun?",
          icerik: (
            <BilgiKutusu tip="biliyor-muydun">
              GPT-4 modeli yaklaşık <strong>1 trilyon parametreye</strong> sahiptir. Eğitim süreci
              aylarca sürmüş, milyonlarca dolar maliyeti olmuştur. Ama sen Teachable Machine ile
              <strong> dakikalar içinde</strong> kendi modelini eğitebilirsin!
            </BilgiKutusu>
          ),
        },
      ]}
    />
  </section>
);

/* ---- Etkinlik 1: Meyve Sınıflandırıcı ---- */
const SlaytEtkinlik1 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup çalışması</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 1: Meyve Sınıflandırıcı</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Meyve resimlerini kesin. Özellik kartlarını (renk, şekil, boyut) kullanarak
        kendi karar ağacınızı oluşturun. Arkadaşlarınızın karar ağacıyla sizinkini
        karşılaştırın. Farklı ağaçlar aynı sonucu verebilir mi?
      </p>
      <div className="rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-900/20">
        <p className="font-medium text-emerald-700 dark:text-emerald-300">
          📋 Malzemeler: Meyve resimleri, özellik kartları, sınıflandırma panosu, makas
        </p>
      </div>
    </div>

    <MeyveSiniflandirici />

    <SiniflandirmaPratigi />
  </>
);

/* ---- Etkinlik 2: Teachable Machine ---- */
const SlaytEtkinlik2 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
        <span className="text-sm text-[var(--color-text-secondary)]">40 dakika &middot; Bireysel</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 2: Teachable Machine - Görüntü Modeli</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        teachablemachine.withgoogle.com adresine gidin. İki sınıflı bir görüntü
        sınıflandırma modeli eğitin (örnek: kalem/silgi, el/yumruk, gülme/ciddi yüz).
        En az 50 örnek toplayın. Modelinizi test edin ve başarı oranını kaydedin.
      </p>
    </div>

    <TeachableMachineRehber />

    <OgrenimTurleriQuiz />
  </>
);

/* ---- Etkinlik 3: PictoBlox Sınıflandırma ---- */
const SlaytEtkinlik3 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
        <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 3: PictoBlox - Sınıflandırma</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        PictoBlox&apos;ta bir metin sınıflandırma projesi oluşturun. &quot;Mutlu&quot; ve &quot;üzgün&quot; cümleleri ayıran bir model eğitin.
        Modelinizi blok kodlama ile kullanan küçük bir program yapın.
      </p>
    </div>

    <MLForKidsRehber />
  </>
);

/* ---- Etkinlik 4: Model Başarı Raporu ---- */
const SlaytEtkinlik4 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup tartışması</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 4: Model Başarı Raporu</h4>
      <p className="text-[var(--color-text-secondary)]">
        Eğittiğiniz modelin başarı oranını sınıfla paylaşın. Hangi modeller daha
        başarılı? Neden? Daha fazla örnek mi, daha iyi örüntüler mi? Tartışarak
        &quot;iyi bir model&quot; için nelerin gerektiğini listeleyin.
      </p>
    </div>

    <ModelBasariRaporu />
  </>
);

/* ---- Slayt 5: İnteraktif Oyun ---- */
const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Karar Ağacı Oluşturucu</h2>
    <p className="text-[var(--color-text-secondary)]">
      Meyveleri özelliklerine göre sınıflandırarak kendi karar ağacını oluştur!
    </p>
    <KararAgaci />
  </section>
);

/* ---- Slayt 6: Değerlendirme ---- */
const SlaytDegerlendirme = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />
  </>
);

/* ---- Slayt 7: İndirilebilir Materyaller ---- */
const SlaytMateryaller = (
  <>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h3 className="mb-4 text-xl font-bold">İndirilebilir Materyaller</h3>
      <div className="space-y-3">
        {[
          { ad: "Meyve Sınıflandırıcı Kartları", url: "/indirilebilir/bolum-04-meyve-siniflandirici-kartlari.html" },
          { ad: "Teachable Machine Rehberi", url: "/indirilebilir/bolum-04-teachable-machine-rehberi.html" },
          { ad: "Model Başarı Raporu Formu", url: "/indirilebilir/bolum-04-model-basari-raporu.html" },
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

export default function Bolum4() {
  return (
    <BolumSlider
      bolumNo={4}
      bolumBaslik="Makineler Nasıl Öğrenir?"
      bolumAltBaslik="Makine Öğrenimi Temelleri"
      seviye="6-7. Sınıf"
      ders={6}
      renk="from-orange-500 to-amber-600"
      oncekiBolum={3}
      sonrakiBolum={5}
      slaytlar={[
        { baslik: "Hoş Geldin!", icon: "👋", icerik: SlaytHosGeldin4 },
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Geleneksel vs ML", icon: "📖", icerik: SlaytGelenekselVsML },
        { baslik: "Öğrenme Türleri", icon: "🧠", icerik: SlaytOgrenimTurleri },
        { baslik: "Öğrenme Türleri Lab", icon: "🎓", icerik: SlaytOgrenmeTurleriLab },
        { baslik: "Sınıflandırma ve Tahmin", icon: "📊", icerik: SlaytSiniflandirma },
        { baslik: "Karar Ağacı", icon: "🌳", icerik: SlaytKararAgaci },
        { baslik: "Sinir Ağına Geçiş", icon: "🧭", icerik: SlaytGecis4_1 },
        { baslik: "Sinir Ağı Lab", icon: "🧪", icerik: SlaytSinirAgiLab4 },
        { baslik: "Teachable Machine", icon: "🤖", icerik: SlaytTeachableMachine },
        { baslik: "Etkinlik: Meyve Sınıflandırıcı", icon: "🎮", icerik: SlaytEtkinlik1 },
        { baslik: "Etkinlik: Teachable Machine", icon: "🎮", icerik: SlaytEtkinlik2 },
        { baslik: "Etkinlik: PictoBlox", icon: "🎮", icerik: SlaytEtkinlik3 },
        { baslik: "Etkinlik: Model Başarı Raporu", icon: "🎮", icerik: SlaytEtkinlik4 },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Bölüm Özeti", icon: "🏆", icerik: SlaytBolumOzeti4 },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
