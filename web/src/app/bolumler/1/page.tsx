import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 1: Yapay Zeka Nedir? | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import YzMiDegilMi from "@/components/oyunlar/YzMiDegilMi";
import KimDahaZeki from "@/components/etkinlikler/KimDahaZeki";
import YzDedektifi from "@/components/etkinlikler/YzDedektifi";
import ZamanCizelgesi from "@/components/etkinlikler/ZamanCizelgesi";
import TuringTesti from "@/components/etkinlikler/TuringTesti";
import YzZekaKarsilastir from "@/components/etkinlikler/YzZekaKarsilastir";

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

/* ---- Slayt 6: YZ Tarihçesi ---- */
const SlaytTarihce = (
  <section className="space-y-4">
    <h3 className="text-xl font-extrabold">YZ Tarihçesi</h3>
    <div className="space-y-3">
      {[
        { yil: "1642", olay: "İlk mekanik hesap makinesi (Pascal)" },
        { yil: "1950", olay: "Turing Testi öne sürüldü" },
        { yil: "1956", olay: "\"Yapay zeka\" terimi ilk kez kullanıldı" },
        { yil: "1959", olay: "Cahit Arf'ın çalışması" },
        { yil: "1965", olay: "ELIZA - ilk sohbet robotu" },
        { yil: "1997", olay: "Deep Blue satranç şampiyonunu yendi" },
        { yil: "2011", olay: "Siri ve sesli asistanlar" },
        { yil: "2016", olay: "AlphaGo, Go şampiyonunu yendi" },
        { yil: "2022", olay: "ChatGPT - üretken YZ çağı" },
      ].map((item) => (
        <div key={item.yil} className="flex items-start gap-4">
          <span className="shrink-0 rounded-lg bg-sky-600 px-3 py-1 text-sm font-bold text-white">
            {item.yil}
          </span>
          <p>{item.olay}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Image
          src="/images/bolumler/deep-blue.jpg"
          alt="IBM Deep Blue"
          width={200}
          height={150}
          className="rounded-lg object-cover shadow-md"
        />
        <div>
          <h4 className="font-bold">1997: Deep Blue vs Kasparov</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            IBM&apos;in Deep Blue bilgisayarı, dünya satranç şampiyonu Garry Kasparov&apos;u yenerek tarihe geçti.
          </p>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)] italic">
            Fotoğraf: James the photographer, CC BY 2.0, Wikimedia Commons
          </p>
        </div>
      </div>
    </div>
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
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Zeka Nedir?", icon: "🧠", icerik: SlaytZekaNedir },
        { baslik: "Yapay Zeka Nedir?", icon: "🤖", icerik: SlaytYapayZekaNedir },
        { baslik: "Öncüler", icon: "👨‍🔬", icerik: SlaytOnculer },
        { baslik: "Video", icon: "🎬", icerik: SlaytVideo },
        { baslik: "YZ Tarihçesi", icon: "📅", icerik: SlaytTarihce },
        { baslik: "YZ Türleri", icon: "🔬", icerik: SlaytYzTurleri },
        { baslik: "Etkinlik: Kim Daha Zeki?", icon: "🎮", icerik: SlaytEtkinlik1 },
        { baslik: "Etkinlik: YZ Dedektifi", icon: "🎮", icerik: SlaytEtkinlik2 },
        { baslik: "Etkinlik: YZ Zaman Çizelgesi", icon: "🎮", icerik: SlaytEtkinlik3 },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
