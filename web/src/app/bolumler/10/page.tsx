import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Bir YZ projesi portfolyosu icin en onemli ogeler hangileridir?",
    secenekler: [
      "Sadece kodun kendisi",
      "Problem tanimi, surec, sonuclar ve ogrenilen dersler",
      "Sadece ekran goruntuleri",
      "Sadece proje basligi",
    ],
    dogru: 1,
    aciklama: "Iyi bir portfolyo sadece sonucu degil, tum sureci gosterir: problemi nasil tanimladiginizi, nasil cozdugunuzu ve neler ogrendiginizi.",
  },
  {
    soru: "YZ alaninda calisabilmek icin hangi beceriler en onemlider?",
    secenekler: [
      "Sadece matematik",
      "Programlama + matematik + problem cozme + iletisim",
      "Sadece programlama",
      "Sadece Ingilizce bilmek",
    ],
    dogru: 1,
    aciklama: "YZ alanında disiplinlerarasi beceriler gerekir: programlama, matematik, analitik dusunme, iletisim ve surekli ogrenme.",
  },
  {
    soru: "Asagidakilerden hangisi YZ ile ilgili yeni ortaya cikan bir meslek DEGILDIR?",
    secenekler: [
      "Prompt Muhendisi",
      "YZ Etik Danismani",
      "Veri Bilimci",
      "Atlı Postaci",
    ],
    dogru: 3,
    aciklama: "Prompt muhendisligi, YZ etik danismanligi ve veri bilimi YZ cagininn yeni meslekleridir. Atli postacilik tarihe karismis bir meslektir.",
  },
  {
    soru: "'Hayat boyu ogrenme' (lifelong learning) YZ caginda neden onemlidir?",
    secenekler: [
      "Cunku sinav icin gereklidir",
      "Teknoloji cok hizli degistigi icin surekli yeni beceriler ogrenilmelidir",
      "Sadece universite icin gereklidir",
      "Onemli degildir, okul yeterlidir",
    ],
    dogru: 1,
    aciklama: "YZ ve teknoloji cok hizli gelisiyor. Bugun ogrendiginiz bilgi yarin eskiyebilir. Surekli ogrenme bir zorunluluk haline gelmistir.",
  },
  {
    soru: "Bu kitapta ogrendiginiiz en onemli ders nedir?",
    secenekler: [
      "YZ insanlarin yerini alacak",
      "YZ sadece buyukler icindir",
      "YZ guclu bir aractir ve sorumlulukla kullanilmalidir",
      "YZ tehlikelidir ve uzak durmak gerekir",
    ],
    dogru: 2,
    aciklama: "YZ guclu bir aractir. Onu anlayan, dogru ve sorumlulukla kullanan bireyler gelecegin mimarlar olacaktir. Sen de onlardan biri olabilirsin!",
  },
];

export default function Bolum10() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-indigo-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🚀</div>
            <div>
              <p className="text-sm font-medium text-indigo-200">BOLUM 10 &middot; 8. Sinif &middot; 8 ders saati</p>
              <h1 className="text-3xl font-extrabold">Gelecek Seninle Baslar</h1>
              <p className="text-indigo-200">Proje ve Portfolyo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 p-6 dark:bg-indigo-900/20">
          <h2 className="mb-3 text-lg font-bold text-indigo-700 dark:text-indigo-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Kapsamli bir YZ projesi planlayip hayata gecirecegiz.</li>
            <li>Proje portfolyosu hazirlama becerisi kazanacagiz.</li>
            <li>YZ alanindaki kariyer firsatlarini ve yeni meslekleri kesfedecegiz.</li>
            <li>Hayat boyu ogrenme yol haritasi olusturacagiz.</li>
            <li>Kitap boyunca ogrendigimiz her seyi bir final projesiyle birlesterecegiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["final projesi", "portfolyo", "kariyer", "hayat boyu ogrenme", "sunum", "proje yonetimi"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Final Projesi: Buyuk Resim</h2>
          <p>
            Bu bolumdeki final projesi, kitap boyunca ogrendiginiz tum bilgi ve becerileri
            bir araya getirmenizi saglar. Gercek bir problemi YZ ile cozen kapsamli bir
            proje gelistireceksiniz.
          </p>
          <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-5 dark:border-indigo-700 dark:bg-indigo-900/20">
            <h3 className="mb-3 font-bold text-indigo-700 dark:text-indigo-400">🎯 Final Projesi Gereksinimleri</h3>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              {[
                { gereksinim: "Gercek bir problem cozmeli", icon: "🌍" },
                { gereksinim: "YZ/ML modeli icermeli", icon: "🧠" },
                { gereksinim: "Veri toplama ve hazirlama yapmali", icon: "📊" },
                { gereksinim: "Etik degerlendirme icermeli", icon: "⚖️" },
                { gereksinim: "Calisan bir prototip olmali", icon: "💻" },
                { gereksinim: "Sunum ve belgelendirme yapmali", icon: "📋" },
              ].map((g) => (
                <div key={g.gereksinim} className="flex items-center gap-2 rounded-lg bg-white/60 p-2 dark:bg-white/5">
                  <span>{g.icon}</span>
                  <span>{g.gereksinim}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Proje Adimlari</h2>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "Konu Secimi", aciklama: "Ilginizi ceken bir gercek dunya problemi secin. Cevre, saglik, egitim, ulasim...", sure: "1 ders" },
              { adim: 2, baslik: "Arastirma", aciklama: "Problemi arastirin, benzer cozumleri inceleyin, hangi YZ yaklasimini kullanacaginiza karar verin.", sure: "1 ders" },
              { adim: 3, baslik: "Veri Toplama", aciklama: "Projeniz icin gerekli verileri toplayin, temizleyin ve etiketleyin.", sure: "1 ders" },
              { adim: 4, baslik: "Model Gelistirme", aciklama: "Teachable Machine, PictoBlox veya ML for Kids ile modelinizi egitin ve test edin.", sure: "2 ders" },
              { adim: 5, baslik: "Entegrasyon", aciklama: "Modeli bir uygulama/oyun/sunum ile birlestirin. Kullanici arayuzu tasarlayin.", sure: "1 ders" },
              { adim: 6, baslik: "Sunum Hazirligi", aciklama: "Poster, sunum ve canli demo hazirlayın. Portfolyo belgesini tamamlayin.", sure: "1 ders" },
              { adim: 7, baslik: "Proje Fuari", aciklama: "Projenizi sinifa/okula sunun. Geri bildirim alin ve degerlendirin.", sure: "1 ders" },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{a.adim}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">{a.baslik}</h4>
                    <span className="text-xs text-[var(--color-text-secondary)]">{a.sure}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Portfolyo Nasil Hazirlanir?</h2>
          <p>Portfolyonuz, YZ yolculugunuzun tum hikayesini anlatan bir belge/sunumdur:</p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Bolum</th>
                  <th className="px-4 py-3 text-left">Icerik</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kapak", "Proje adi, isminiz, tarih, okul"],
                  ["Problem", "Hangi sorunu cozuyorsunuz? Neden onemli?"],
                  ["Arastirma", "Benzer cozumler, kullanilan teknolojiler"],
                  ["Surec", "Veri toplama, model egitimi, kodlama adimlari"],
                  ["Sonuclar", "Model basarisi, ekran goruntuleri, demo"],
                  ["Dersler", "Ne ogrendiniz? Zorluklar? Farkli ne yaparldiniz?"],
                  ["Kaynaklar", "Kullanilan araclar, veri kaynaklari, referanslar"],
                ].map(([bolum, icerik], i) => (
                  <tr key={bolum} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 font-medium">{bolum}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{icerik}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. YZ Caginda Kariyer Firsatlari</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { meslek: "YZ Muhendisi", aciklama: "YZ modelleri tasarlar ve gelistirir", icon: "👩‍💻" },
              { meslek: "Veri Bilimci", aciklama: "Buyuk verileri analiz eder, ice goruler cikarir", icon: "📊" },
              { meslek: "Prompt Muhendisi", aciklama: "YZ araclarindan en iyi sonucu alacak talimatlar tasarlar", icon: "✍️" },
              { meslek: "YZ Etik Danismani", aciklama: "YZ sistemlerinin etik ve adil olmasini saglar", icon: "⚖️" },
              { meslek: "Robotik Muhendisi", aciklama: "YZ destekli robotlar tasarlar", icon: "🤖" },
              { meslek: "YZ Urun Yoneticisi", aciklama: "YZ urunlerinin gelistirme surecini yonetir", icon: "📋" },
            ].map((m) => (
              <div key={m.meslek} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-center">
                <span className="text-3xl">{m.icon}</span>
                <h4 className="mt-2 font-bold">{m.meslek}</h4>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">5. Ogrenmeye Devam Et!</h2>
          <p>Bu kitap sadece baslangic! YZ ogrenme yolculugunuza devam etmek icin:</p>
          <div className="space-y-3">
            {[
              { kaynak: "Scratch + ML for Kids", aciklama: "Blok kodlama ile daha karmasik YZ projeleri", seviye: "Simdi" },
              { kaynak: "Python Temelleri", aciklama: "Gercek programlama dili ogrenmeye basla", seviye: "Sonraki Adim" },
              { kaynak: "Khan Academy / Code.org", aciklama: "Ucretsiz online kodlama kurslari", seviye: "Sonraki Adim" },
              { kaynak: "TensorFlow / PyTorch", aciklama: "Profesyonel ML frameworkleri", seviye: "Ileri" },
              { kaynak: "Kaggle Yarismalar", aciklama: "Gercek veri bilimi yarismailari ve egitimler", seviye: "Ileri" },
              { kaynak: "Universite (Bilgisayar Muhendisligi)", aciklama: "YZ alaninda akademik kariyer", seviye: "Gelecek" },
            ].map((k) => (
              <div key={k.kaynak} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold text-white ${
                  k.seviye === "Simdi" ? "bg-emerald-600" : k.seviye === "Sonraki Adim" ? "bg-blue-600" : k.seviye === "Ileri" ? "bg-violet-600" : "bg-indigo-600"
                }`}>{k.seviye}</span>
                <div>
                  <h4 className="font-bold">{k.kaynak}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Motivasyon */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center text-white">
          <span className="text-5xl">🚀</span>
          <h2 className="mt-4 text-2xl font-extrabold">Tebrikler!</h2>
          <p className="mx-auto mt-3 max-w-lg text-indigo-100">
            Bu kitabi tamamlayarak yapay zeka dunyasina saglam bir adim attin.
            Ogrendigin bilgiler ve kazandigin becerilerle gelecegin teknolojilerine
            hazirsin. Unutma: <strong>Gelecek seninle baslar!</strong>
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-indigo-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
              <span className="text-sm text-[var(--color-text-secondary)]">6 ders saati &middot; Bireysel veya grup</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Final Projesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Gercek bir problemi YZ ile cozen kapsamli bir proje gelistirin. Proje
              planlama formunu doldurun, modeli egitin, prototipi olusturun ve portfolyo
              belgesini hazirlayin. Sinifta canli demo ile sunun.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">1 ders saati &middot; Sinif etkinligi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Gelecek Fuari</h3>
            <p className="text-[var(--color-text-secondary)]">
              Her ogrenci/grup projesini poster ve canli demo ile sunar. Diger siniflar,
              ogretmenler ve aileler davet edilir. En iyi projeler oylanir ve odullendirilir.
              Kategoriler: En Yenilikci, En Faydali, En Iyi Sunum, En Iyi Tasarim.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Gelecek Mektubu</h3>
            <p className="text-[var(--color-text-secondary)]">
              Gelecekteki kendinize bir mektup yazin: YZ hakkinda ne ogrendiniz? Gelecekte
              ne yapmak istiyorsunuz? YZ&apos;yi nasil kullanacaksiniz? Mektubu kapatip
              &quot;1 yil sonra ac&quot; yazin.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Final Projesi Planlama Formu (PDF)", "Portfolyo Sablonu (PDF)", "Proje Degerlendirme Rubrigi (PDF)", "Gelecek Mektubu Sablonu (PDF)", "Sertifika Sablonu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/9" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 9</Link>
          <Link href="/" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">Ana Sayfaya Don</Link>
        </div>
      </main>
    </div>
  );
}
