import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

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

export default function Bolum1() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-sky-200 hover:text-white"
          >
            &larr; Ana Sayfa
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
              🤖
            </div>
            <div>
              <p className="text-sm font-medium text-sky-200">BÖLÜM 1 &middot; 6. Sınıf &middot; 4 ders saati</p>
              <h1 className="text-3xl font-extrabold">Yapay Zeka Nedir?</h1>
              <p className="text-sky-200">Keşif Yolculuğu</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Kazanimlar */}
        <section className="rounded-2xl border-l-4 border-sky-500 bg-sky-50 p-6 dark:bg-sky-900/20">
          <h2 className="mb-3 text-lg font-bold text-sky-700 dark:text-sky-300">
            Neler Öğreneceğiz?
          </h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Zeka kavramını tanımlayabilir, insan zekası ile yapay zekayı karşılaştırabiliriz.</li>
            <li>Yapay zekanın tarihçesini ve önemli kilometre taşlarını öğreneceğiz.</li>
            <li>Yapay zeka türlerini (dar, genel, süper) ayırt edebileceğiz.</li>
            <li>Yapay zekanın günlük hayattaki örneklerini fark edeceğiz.</li>
          </ul>
        </section>

        {/* Anahtar Kavramlar */}
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

        {/* Zeka Nedir */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Zeka Nedir?</h2>
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

        {/* Yapay Zeka */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Yapay Zeka Nedir?</h2>
          <p>
            Yapay zeka, bilgisayarların ve makinelerin insanlara benzer
            &quot;zeki&quot; davranışlar göstermesini sağlayan teknolojilerin genel
            adıdır.
          </p>

          {/* Karsilastirma tablosu */}
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
                  <tr
                    key={ozellik}
                    className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}
                  >
                    <td className="px-4 py-2.5 font-medium">{ozellik}</td>
                    <td className="px-4 py-2.5">{insan}</td>
                    <td className="px-4 py-2.5">{yz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Biliyor Muydunuz */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
            <h3 className="mb-2 font-bold">Alan Turing (1912-1954)</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              İngiliz matematikçi ve bilgisayar biliminin babası.
              &quot;Makineler düşünebilir mi?&quot; sorusunu ilk kez o sormuştur.
              Turing Testi&apos;ni öne sürmüştür.
            </p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
            <h3 className="mb-2 font-bold">Cahit Arf (1910-1997)</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Türkiye&apos;nin en büyük matematikçilerinden biri. 10 liralık
              banknotların arkasında resmi bulunan Cahit Arf, &quot;Makineler
              düşünebilir mi ve nasıl düşünebilir?&quot; çalışması yayımlamıştır.
            </p>
          </div>
        </section>

        {/* Tarihce */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. YZ Tarihçesi</h2>
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
        </section>

        {/* YZ Turleri */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. Yapay Zeka Türleri</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">
                Dar YZ (Narrow AI)
              </h3>
              <p className="mb-2 text-sm">Sadece belirli bir görevi yapar.</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Örnekler: Siri, Google Çevirmen, Netflix
              </p>
              <p className="mt-2 rounded bg-emerald-200 px-2 py-1 text-center text-xs font-bold dark:bg-emerald-800">
                BUGÜN KULLANDIĞIMIZ TÜM YZ
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
              <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">
                Genel YZ (AGI)
              </h3>
              <p className="mb-2 text-sm">Her türlü zihinsel görev.</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Henüz geliştirilmedi
              </p>
              <p className="mt-2 rounded bg-amber-200 px-2 py-1 text-center text-xs font-bold dark:bg-amber-800">
                ARAŞTIRMA AŞAMASINDA
              </p>
            </div>
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">
                Süper YZ (ASI)
              </h3>
              <p className="mb-2 text-sm">İnsandan çok daha zeki.</p>
              <p className="text-xs text-rose-600 dark:text-rose-400">
                Tamamen teorik
              </p>
              <p className="mt-2 rounded bg-rose-200 px-2 py-1 text-center text-xs font-bold dark:bg-rose-800">
                BİLİM KURGU
              </p>
            </div>
          </div>
        </section>

        {/* Etkinlikler */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          {/* Etkinlik 1 */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
                UNPLUGGED
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup çalışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Kim Daha Zeki?</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Görev kartlarını kesin ve grubunuzla her görev için &quot;İnsan mı yoksa
              Makine mi daha iyi yapar?&quot; tartışmasını yapın.
            </p>
            <a
              href="/indirilebilir/bolum-01-kim-daha-zeki-kartlari.pdf"
              className="inline-block rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Kartları İndir (PDF)
            </a>
          </div>

          {/* Etkinlik 2 */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                GÖZLEM
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">1 gün + 20 dk sınıf tartışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 2: YZ Dedektifi
            </h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Bir gün boyunca karşılaştığınız yapay zeka uygulamalarını gözlem
              formuna kaydedin.
            </p>
            <a
              href="/indirilebilir/bolum-01-yz-dedektifi-formu.pdf"
              className="inline-block rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Gözlem Formunu İndir (PDF)
            </a>
          </div>

          {/* Etkinlik 3 */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
                UNPLUGGED
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup çalışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 3: YZ Zaman Çizelgesi
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              A3 kağıda zaman çizelgesi çizin, önemli olayları yerleştirin ve
              gelecek tahminlerinizi ekleyin. Posterinizi sınıfta sergileyin.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <InteraktifQuiz sorular={quizSorulari} />

        {/* Indirilebilir */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
          <div className="space-y-3">
            {[
              "Kim Daha Zeki? Kart Seti (PDF)",
              "YZ Dedektifi Gözlem Formu (PDF)",
              "Değerlendirme Testi (PDF)",
              "Öz Değerlendirme Formu (PDF)",
            ].map((dosya) => (
              <div
                key={dosya}
                className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3"
              >
                <span className="text-sm font-medium">{dosya}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Yakın zamanda
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigasyon */}
        <div className="flex items-center justify-between pt-6">
          <Link
            href="/"
            className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]"
          >
            &larr; Ana Sayfa
          </Link>
          <Link
            href="/bolumler/2"
            className="rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            Bölüm 2 &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
