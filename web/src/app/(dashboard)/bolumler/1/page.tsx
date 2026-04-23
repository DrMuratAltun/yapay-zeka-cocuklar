import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 1: Yapay Zeka Nedir? | Yapay Zeka Macerası",
  description:
    "Yapay zeka nedir, nasıl çalışır? Turing testi, YZ tarihçesi ve insan-makine karşılaştırması ile keşif yolculuğuna başla.",
  alternates: { canonical: "https://gencyz.com/bolumler/1" },
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumCerceve from "@/components/BolumCerceve";
import YzMiDegilMi from "@/components/oyunlar/YzMiDegilMi";
import KimDahaZeki from "@/components/etkinlikler/KimDahaZeki";
import YzDedektifi from "@/components/etkinlikler/YzDedektifi";
import ZamanCizelgesi from "@/components/etkinlikler/ZamanCizelgesi";
import InteraktifTarihce from "@/components/etkinlikler/InteraktifTarihce";
import YzTarihcesi380 from "@/components/etkinlikler/YzTarihcesi380";
import TuringTesti from "@/components/etkinlikler/TuringTesti";
import YzZekaKarsilastir from "@/components/etkinlikler/YzZekaKarsilastir";
import TekSecimSoru from "@/components/mikro/TekSecimSoru";
import DogruYanlis from "@/components/mikro/DogruYanlis";
import KategoriSiniflandirma from "@/components/mikro/KategoriSiniflandirma";
import EslestirmeOyunu from "@/components/mikro/EslestirmeOyunu";

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

    <TekSecimSoru
      soru="Bu bölümde en çok hangi konuyu öğrenmeyi bekliyorsun?"
      secenekler={[
        "Yapay zekanın tarihçesi",
        "YZ türleri arasındaki farklar",
        "YZ'nin günlük hayattaki kullanımları",
        "Hepsini merak ediyorum!",
      ]}
      dogruIndex={3}
      aciklama="Harika! Bu bölümde tüm bu konuları keşfedeceksin. Hadi başlayalım!"
    />
  </>
);

/* ---- Slayt 2: Zeka Nedir? ---- */
const SlaytZekaNedir = (
  <section className="space-y-4">
    <h3 className="text-xl font-extrabold">Zeka Nedir?</h3>
    <p>
      Zeka, öğrenme, anlama, problem çözme ve yeni durumlara uyum sağlama
      yeteneklerimizin tamamıdır. İnsanlar bu yetenekleri doğal olarak
      geliştirir: bir bebek yürümesini öğrenir, bir öğrenci matematik
      problemlerini çözer, bir sporcu yeni taktikler geliştirir.
    </p>
    <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
      <p className="font-medium text-amber-800 dark:text-amber-300">
        🤔 Düşün: Bir hesap makinesi saniyeler içinde binlerce çarpma işlemi
        yapabilir. Bu onu zeki yapar mı? Neden?
      </p>
    </div>

    <DogruYanlis
      ifade="Bir hesap makinesi binlerce çarpma yapabildiği için zekidir."
      dogruMu={false}
      aciklama="Hesap makinesi çok hızlı hesap yapar ama yeni bir şey öğrenemez, farklı durumlara uyum sağlayamaz. Hız tek başına zeka değildir — zeka öğrenme, anlama ve uyum sağlama gerektirir."
    />
  </section>
);

/* ---- Slayt 3: Yapay Zeka Nedir? ---- */
const SlaytYapayZekaNedir = (
  <section className="space-y-4">
    <h3 className="text-xl font-extrabold">Yapay Zeka Nedir?</h3>
    <p>
      Yapay zeka, bilgisayarların ve makinelerin insanlara benzer
      &quot;zeki&quot; davranışlar göstermesini sağlayan teknolojilerin genel
      adıdır.
    </p>
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
        <thead className="bg-sky-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Özellik</th>
            <th className="px-4 py-3 text-left">İnsan Zekası</th>
            <th className="px-4 py-3 text-left">Yapay Zeka</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Öğrenme", "Deneyim ve gözlemle", "Veri ve algoritmalarla"],
            ["Yaratıcılık", "Çok güçlü", "Sınırlı (taklit eder)"],
            ["Duygular", "Var", "Yok (taklit edebilir)"],
            ["Hız", "Sınırlı", "Çok hızlı"],
            ["Yorgunluk", "Yorulur", "Yorulmaz"],
            ["Esneklik", "Yeni durumlara uyum sağlar", "Eğitildiği konuda başarılı"],
          ].map(([ozellik, insan, yz], i) => (
            <tr key={ozellik} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
              <td className="px-4 py-2.5 font-medium">{ozellik}</td>
              <td className="px-4 py-2.5">{insan}</td>
              <td className="px-4 py-2.5">{yz}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <EslestirmeOyunu
      baslik="Özellikleri doğru sütunla eşleştir!"
      ciftler={[
        { sol: "Deneyimle öğrenme", sag: "İnsan Zekası" },
        { sol: "Veri ile öğrenme", sag: "Yapay Zeka" },
        { sol: "Yaratıcılık", sag: "İnsan Zekası" },
        { sol: "Yorulmadan çalışma", sag: "Yapay Zeka" },
        { sol: "Duyguları hissetme", sag: "İnsan Zekası" },
      ]}
    />
  </section>
);

/* ---- Slayt 4: Öncüler ---- */
const SlaytOnculer = (
  <section className="grid gap-4 md:grid-cols-2">
    <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
      <div className="mb-3 flex items-center gap-4">
        <Image
          src="/images/bolumler/turing.jpg"
          alt="Alan Turing"
          width={80}
          height={100}
          className="rounded-lg object-cover shadow-md"
        />
        <h4 className="text-lg font-bold">Alan Turing (1912-1954)</h4>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">
        İngiliz matematikçi ve bilgisayar biliminin babası.
        &quot;Makineler düşünebilir mi?&quot; sorusunu ilk kez o sormuştur.
        Turing Testi&apos;ni öne sürmüştür.
      </p>
      <p className="mt-2 text-xs text-[var(--color-text-secondary)] italic">
        Fotoğraf: Public Domain, Wikimedia Commons
      </p>
    </div>
    <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
      <div className="mb-3 flex items-center gap-4">
        <Image
          src="/images/bolumler/cahit-arf.jpg"
          alt="Cahit Arf - 10 TL banknot"
          width={120}
          height={60}
          className="rounded-lg object-cover shadow-md"
        />
        <h4 className="text-lg font-bold">Cahit Arf (1910-1997)</h4>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Türkiye&apos;nin en büyük matematikçilerinden biri. 10 liralık
        banknotların arkasında resmi bulunan Cahit Arf, &quot;Makineler
        düşünebilir mi ve nasıl düşünebilir?&quot; çalışması yayımlamıştır.
      </p>
      <p className="mt-2 text-xs text-[var(--color-text-secondary)] italic">
        Görsel: Public Domain (TR currency), Wikimedia Commons
      </p>
    </div>

    <EslestirmeOyunu
      baslik="Kişileri başarılarıyla eşleştir!"
      ciftler={[
        { sol: "Alan Turing", sag: "Turing Testi'ni öne sürdü" },
        { sol: "Cahit Arf", sag: "Makineler düşünebilir mi? çalışması" },
        { sol: "John McCarthy", sag: "Yapay zeka terimini icat etti" },
        { sol: "Blaise Pascal", sag: "İlk mekanik hesap makinesi" },
      ]}
    />
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

    <TekSecimSoru
      soru="Videoyu izledikten sonra: Yapay zeka alanındaki ilk büyük atılım ne zaman oldu?"
      secenekler={["1930'larda", "1950'lerde", "1970'lerde", "2000'lerde"]}
      dogruIndex={1}
      aciklama="1950'lerde Alan Turing'in çalışmaları ve 1956'da Dartmouth Konferansı ile yapay zeka resmi bir alan olarak doğdu."
    />
  </section>
);

/* ---- Slayt 6: YZ Tarihçesi (İnteraktif) ---- */
const SlaytTarihce = (
  <section className="space-y-4">
    <h3 className="text-xl font-extrabold">YZ Tarihçesi</h3>
    <p className="text-[var(--color-text-secondary)]">
      Kartlara tıklayarak yapay zekanın tarihindeki dönüm noktalarını keşfet, sonra bilgini &quot;Yılı Tahmin Et&quot; modunda test et!
    </p>
    <InteraktifTarihce />
  </section>
);

/* ---- Slayt 6b: YZ Tarihçesi — 380 Yıllık Zaman Makinesi ---- */
const SlaytZamanMakinesi = (
  <section className="space-y-4">
    <div className="flex flex-wrap items-center gap-3">
      <h3 className="text-xl font-extrabold">YZ Tarihçesi: 380 Yıllık Zaman Makinesi</h3>
      <span className="rounded-lg bg-violet-500 px-3 py-1 text-xs font-bold text-white">İNTERAKTİF</span>
    </div>
    <p className="text-[var(--color-text-secondary)]">
      1642 Pascaline&apos;dan günümüze kadar uzanan 380 yıllık yolculukta dönüm
      noktalarını keşfet. Zaman çizgisindeki düğümlere tıklayarak detayları oku,
      her olaydan sonra mini quiz ile bilgini test et.
    </p>
    <YzTarihcesi380 />
  </section>
);

/* ---- Slayt 7: YZ Türleri ---- */
const SlaytYzTurleri = (
  <section className="space-y-4">
    <h3 className="text-xl font-extrabold">Yapay Zeka Türleri</h3>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
        <h4 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">Dar YZ (Narrow AI)</h4>
        <p className="mb-2 text-sm">Sadece belirli bir görevi yapar.</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">Örnekler: Siri, Google Çevirmen, öneri sistemleri</p>
        <p className="mt-2 rounded bg-emerald-200 px-2 py-1 text-center text-xs font-bold dark:bg-emerald-800">BUGÜN KULLANDIĞIMIZ TÜM YZ</p>
      </div>
      <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
        <h4 className="mb-2 font-bold text-amber-700 dark:text-amber-400">Genel YZ (AGI)</h4>
        <p className="mb-2 text-sm">Her türlü zihinsel görev.</p>
        <p className="text-xs text-amber-600 dark:text-amber-400">Henüz geliştirilmedi</p>
        <p className="mt-2 rounded bg-amber-200 px-2 py-1 text-center text-xs font-bold dark:bg-amber-800">ARAŞTIRMA AŞAMASINDA</p>
      </div>
      <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
        <h4 className="mb-2 font-bold text-rose-700 dark:text-rose-400">Süper YZ (ASI)</h4>
        <p className="mb-2 text-sm">İnsandan çok daha zeki.</p>
        <p className="text-xs text-rose-600 dark:text-rose-400">Tamamen teorik</p>
        <p className="mt-2 rounded bg-rose-200 px-2 py-1 text-center text-xs font-bold dark:bg-rose-800">BİLİM KURGU</p>
      </div>
    </div>
    {/* AI-ML-DL ilişki diyagramı */}
    <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <Image
        src="/images/bolumler/ml-diagram.svg"
        alt="Yapay Zeka, Makine Öğrenimi ve Derin Öğrenme ilişkisi"
        width={400}
        height={300}
        className="rounded-lg"
      />
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
        Yapay Zeka, Makine Öğrenimi ve Derin Öğrenme arasındaki ilişki
      </p>
      <p className="text-xs text-[var(--color-text-secondary)] italic">
        Görsel: CC BY-SA 4.0, Wikimedia Commons
      </p>
    </div>

    <KategoriSiniflandirma
      baslik="Bu örnekleri doğru YZ türüne yerleştir!"
      kategoriler={["Dar YZ", "Genel YZ", "Süper YZ"]}
      ogeler={[
        { ad: "Siri", kategori: "Dar YZ" },
        { ad: "Google Çevirmen", kategori: "Dar YZ" },
        { ad: "Satranç bilgisayarı", kategori: "Dar YZ" },
        { ad: "Her konuda düşünen robot", kategori: "Genel YZ" },
        { ad: "İnsandan zeki makine", kategori: "Süper YZ" },
        { ad: "Yüz tanıma", kategori: "Dar YZ" },
      ]}
    />
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
    <InteraktifQuiz sorular={quizSorulari} bolumNo={1} />
  </>
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

    <TekSecimSoru
      soru="Bu bölümde öğrendiğin en şaşırtıcı bilgi hangisiydi?"
      secenekler={[
        "Yapay zeka teriminin 1956'da ortaya çıkması",
        "Cahit Arf'ın YZ üzerine çalışması",
        "Hesap makinesinin zeki sayılmaması",
        "Hepsi ilginçti!",
      ]}
      dogruIndex={3}
      aciklama="Harika! Bu bölümü tamamladın. Öğrendiklerini pekiştirmek için materyalleri incelemeyi unutma!"
    />
  </>
);

export default function Bolum1() {
  return (
    <BolumCerceve
      bolumNo={1}
      bolumBaslik="Yapay Zeka Nedir?"
      bolumAltBaslik="Keşif Yolculuğu"
      seviye="6. Sınıf"
      ders={4}
      renk="from-sky-600 to-blue-700"
      oncekiBolum={null}
      sonrakiBolum={2}
      bolumler={[
        { id: "b1-kazanimlar", baslik: "Kazanımlar", icon: "🎯", tur: "kazanim", icerik: SlaytKazanimlar, varsayilanAcik: true },
        { id: "b1-zeka-nedir", baslik: "Zeka Nedir?", icon: "🧠", tur: "icerik", icerik: SlaytZekaNedir, varsayilanAcik: true },
        { id: "b1-yz-nedir", baslik: "Yapay Zeka Nedir?", icon: "🤖", tur: "icerik", icerik: SlaytYapayZekaNedir, varsayilanAcik: true },
        { id: "b1-onculer", baslik: "Öncüler", icon: "👨‍🔬", tur: "icerik", icerik: SlaytOnculer },
        { id: "b1-video", baslik: "Video", icon: "🎬", tur: "video", icerik: SlaytVideo },
        { id: "b1-tarihce", baslik: "YZ Tarihçesi", icon: "📅", tur: "icerik", icerik: SlaytTarihce },
        { id: "b1-zaman-makinesi", baslik: "YZ Tarihçesi: Zaman Makinesi", icon: "⏳", tur: "etkinlik", icerik: SlaytZamanMakinesi },
        { id: "b1-yz-turleri", baslik: "YZ Türleri", icon: "🔬", tur: "icerik", icerik: SlaytYzTurleri },
        { id: "b1-etkinlik-kim-daha-zeki", baslik: "Etkinlik: Kim Daha Zeki?", icon: "🎮", tur: "etkinlik", icerik: SlaytEtkinlik1 },
        { id: "b1-etkinlik-turing", baslik: "Etkinlik: Turing Testi", icon: "🧪", tur: "etkinlik", icerik: SlaytEtkinlik1b },
        { id: "b1-etkinlik-dedektif", baslik: "Etkinlik: YZ Dedektifi", icon: "🔍", tur: "etkinlik", icerik: SlaytEtkinlik2 },
        { id: "b1-etkinlik-karsilastir", baslik: "Etkinlik: Zeka Karşılaştır", icon: "⚖️", tur: "etkinlik", icerik: SlaytEtkinlik2b },
        { id: "b1-etkinlik-zaman-cizelgesi", baslik: "Etkinlik: YZ Zaman Çizelgesi", icon: "🕰️", tur: "etkinlik", icerik: SlaytEtkinlik3 },
        { id: "b1-oyun", baslik: "İnteraktif Oyun", icon: "🕹️", tur: "oyun", icerik: SlaytOyun },
        { id: "b1-quiz", baslik: "Değerlendirme", icon: "📝", tur: "quiz", icerik: SlaytDegerlendirme },
        { id: "b1-materyaller", baslik: "Materyaller", icon: "📥", tur: "materyal", icerik: SlaytMateryaller },
      ]}
    />
  );
}
