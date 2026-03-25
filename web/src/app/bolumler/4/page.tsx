import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";

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

/* ---- Slayt 2: Geleneksel vs ML + Öğrenme Türleri ---- */
const SlaytKonuAnlatimi = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">1. Geleneksel Programlama vs Makine Öğrenimi</h3>
      <p>
        Geleneksel programlamada bilgisayara her adımı tek tek söyleriz.
        Makine öğreniminde ise bilgisayara örnekler veririz ve o kendisi öğrenir.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 dark:border-blue-700 dark:bg-blue-900/20">
          <h4 className="mb-3 font-bold text-blue-700 dark:text-blue-400">Geleneksel Programlama</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 rounded-lg bg-white/60 p-2 dark:bg-white/5">
              <span className="font-mono text-blue-600">Veri</span>
              <span>+</span>
              <span className="font-mono text-blue-600">Kurallar</span>
              <span>=</span>
              <span className="font-bold">Sonuç</span>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              Programcı kuralları yazar:<br/>
              &quot;Sıcaklık &gt; 30 ise &apos;sıcak&apos; yaz&quot;
            </p>
          </div>
        </div>
        <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-5 dark:border-orange-700 dark:bg-orange-900/20">
          <h4 className="mb-3 font-bold text-orange-700 dark:text-orange-400">Makine Öğrenimi</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 rounded-lg bg-white/60 p-2 dark:bg-white/5">
              <span className="font-mono text-orange-600">Veri</span>
              <span>+</span>
              <span className="font-mono text-orange-600">Sonuçlar</span>
              <span>=</span>
              <span className="font-bold">Kurallar</span>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              Bilgisayar kuralları kendisi bulur:<br/>
              1000 örnek &rarr; &quot;sıcak/soğuk&quot; kalıbını öğrenir
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
        <p className="font-medium text-orange-800 dark:text-orange-300">
          🤔 Düşün: Bir çocuğa &quot;kedi&quot;yi tanımlamayı nasıl öğretirsin?
          Kuralları mı anlatırsın (&quot;4 bacaklı, tüylü, miyavlar&quot;)
          yoksa çok sayıda kedi fotoğrafı mı gösterirsin?
        </p>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">2. Makine Öğrenimi Türleri</h3>
      <div className="space-y-4">
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
          <h4 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">🏷️ Gözetimli Öğrenme (Supervised Learning)</h4>
          <p className="mb-2 text-sm">Her veri için doğru cevap (etiket) verilir. Model, girdi-çıktı ilişkisini öğrenir.</p>
          <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
            <p className="font-medium">Örnekler:</p>
            <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
              <li>E-posta: &quot;spam&quot; veya &quot;spam değil&quot; sınıflandırması</li>
              <li>Görüntü: &quot;kedi&quot; veya &quot;köpek&quot; tanıma</li>
              <li>Ev fiyatı tahmini (m2, oda sayısı &rarr; fiyat)</li>
            </ul>
          </div>
          <p className="mt-2 rounded bg-emerald-200 px-2 py-1 text-center text-xs font-bold dark:bg-emerald-800">EN YAYGIN TÜR</p>
        </div>

        <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 dark:border-blue-700 dark:bg-blue-900/20">
          <h4 className="mb-2 font-bold text-blue-700 dark:text-blue-400">🔍 Gözetimsiz Öğrenme (Unsupervised Learning)</h4>
          <p className="mb-2 text-sm">Etiket yoktur. Model verideki gizli örüntüleri ve grupları kendisi keşfeder.</p>
          <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
            <p className="font-medium">Örnekler:</p>
            <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
              <li>Müşteri segmentasyonu (benzer müşterileri gruplama)</li>
              <li>Haber konularını otomatik gruplama</li>
              <li>Anormal davranış tespiti</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border-2 border-violet-300 bg-violet-50 p-5 dark:border-violet-700 dark:bg-violet-900/20">
          <h4 className="mb-2 font-bold text-violet-700 dark:text-violet-400">🎮 Pekiştirmeli Öğrenme (Reinforcement Learning)</h4>
          <p className="mb-2 text-sm">Model deneme-yanılma ile öğrenir. Doğru davranışlar ödül, yanlış davranışlar ceza alır.</p>
          <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
            <p className="font-medium">Örnekler:</p>
            <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
              <li>AlphaGo - Go oyununu öğrenen YZ</li>
              <li>Robotların yürümesini öğrenmesi</li>
              <li>Otonom araçların sürüşü öğrenmesi</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </>
);

/* ---- Slayt 3: Sınıflandırma, Karar Ağacı, Teachable Machine ---- */
const SlaytUygulama = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">3. Sınıflandırma ve Tahmin</h3>
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
    </section>

    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">4. Karar Ağacı ile Sınıflandırma</h3>
      <p>
        Karar ağacı, en anlaşılır makine öğrenimi algoritmalarından biridir.
        Her düğümde bir soru sorulur ve cevaba göre dallanılır:
      </p>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="inline-block text-left text-sm">
          <div className="mb-4 rounded-lg bg-orange-500 px-4 py-2 text-center font-bold text-white">Meyve hangisi?</div>
          <div className="ml-4 space-y-3">
            <div>
              <span className="font-medium">Rengi kırmızı mı?</span>
              <div className="ml-6 mt-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                  <span>Yuvarlak mı?</span>
                </div>
                <div className="ml-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                    <span className="rounded bg-red-100 px-2 py-0.5 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍎 Elma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-600 font-bold">Hayır &rarr;</span>
                    <span className="rounded bg-red-100 px-2 py-0.5 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍓 Çilek</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-bold">Hayır &rarr;</span>
                  <span>Sarı mı?</span>
                </div>
                <div className="ml-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                    <span className="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">🍌 Muz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-600 font-bold">Hayır &rarr;</span>
                    <span className="rounded bg-orange-100 px-2 py-0.5 font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">🍊 Portakal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">5. Teachable Machine ile Model Eğitimi</h3>
      <p>
        Google Teachable Machine, kodlama bilmeden kendi YZ modelinizi eğitmenizi
        sağlar. Üç türde model eğitebilirsiniz:
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { tur: "Görüntü", icon: "📸", aciklama: "Kamera veya resim yükleme ile görüntü sınıflandırma modeli" },
          { tur: "Ses", icon: "🎙️", aciklama: "Mikrofon ile farklı sesleri tanıyabilen model" },
          { tur: "Poz", icon: "🤸", aciklama: "Vücut pozlarını tanıma ve sınıflandırma modeli" },
        ].map((m) => (
          <div key={m.tur} className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-center dark:border-orange-800 dark:bg-orange-900/20">
            <span className="text-4xl">{m.icon}</span>
            <h4 className="mt-2 font-bold">{m.tur} Modeli</h4>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{m.aciklama}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <h4 className="font-bold">Adım Adım: Görüntü Sınıflandırma Modeli</h4>
        {[
          { adim: 1, baslik: "Sınıf Oluştur", aciklama: "En az 2 sınıf oluşturun (örnek: 'Kedi' ve 'Köpek')" },
          { adim: 2, baslik: "Örnek Topla", aciklama: "Her sınıf için en az 50 fotoğraf çekin veya yükleyin" },
          { adim: 3, baslik: "Modeli Eğit", aciklama: "'Train Model' butonuna basın. Model örneklerden öğrenir" },
          { adim: 4, baslik: "Test Et", aciklama: "Kameranızı açın veya yeni fotoğraf yükleyin. Model doğru mu tahmin ediyor?" },
          { adim: 5, baslik: "Geliştir", aciklama: "Başarı düşükse daha fazla örnek ekleyin, farklı açılardan fotoğraflar çekin" },
        ].map((a) => (
          <div key={a.adim} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 font-bold text-white">{a.adim}</span>
            <div>
              <h4 className="font-bold">{a.baslik}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
        <p className="font-medium text-sky-700 dark:text-sky-300">
          🔗 teachablemachine.withgoogle.com adresinden hemen başlayabilirsiniz!
        </p>
      </div>
    </section>

    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
      <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">💡 Biliyor Muydunuz?</h3>
      <p className="text-sm text-amber-800 dark:text-amber-300">
        GPT-4 modeli yaklaşık 1 trilyon parametreye sahiptir ve internetin büyük bir
        bölümündeki metin verileriyle eğitilmiştir. Eğitim süreci aylarca sürmüş ve
        milyonlarca dolar maliyeti olmuştur. Ama siz Teachable Machine ile dakikalar
        içinde kendi modelinizi eğitebilirsiniz!
      </p>
    </div>
  </>
);

/* ---- Slayt 4: Etkinlikler ---- */
const SlaytEtkinlikler = (
  <>
    <section className="space-y-6">
      <h3 className="text-2xl font-extrabold">Etkinlikler</h3>

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

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
          <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
        </div>
        <h4 className="mb-2 text-xl font-bold">Etkinlik 3: ML for Kids - Sınıflandırma</h4>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          machinelearningforkids.co.uk adresinde bir proje oluşturun. Metin sınıflandırma
          projesi yapın: &quot;mutlu&quot; ve &quot;üzgün&quot; cümleleri ayıran bir model eğitin.
          Modelinizi Scratch&apos;te kullanan küçük bir program yapın.
        </p>
      </div>

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
    </section>
  </>
);

/* ---- Slayt 5: Quiz ve Materyaller ---- */
const SlaytQuiz = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h3 className="mb-4 text-xl font-bold">İndirilebilir Materyaller</h3>
      <div className="space-y-3">
        {[
          "Meyve Sınıflandırıcı Kartları (PDF)",
          "Teachable Machine Rehberi (PDF)",
          "Model Başarı Raporu Formu (PDF)",
          "Değerlendirme Testi (PDF)",
          "Öz Değerlendirme Formu (PDF)",
        ].map((dosya) => (
          <div key={dosya} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
            <span className="text-sm font-medium">{dosya}</span>
            <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakın zamanda</span>
          </div>
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
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Konu Anlatımı", icon: "📖", icerik: SlaytKonuAnlatimi },
        { baslik: "Uygulama ve Araçlar", icon: "📊", icerik: SlaytUygulama },
        { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
        { baslik: "Quiz ve Materyaller", icon: "📝", icerik: SlaytQuiz },
      ]}
    />
  );
}
