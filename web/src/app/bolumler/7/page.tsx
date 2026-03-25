import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "STEM tabanli YZ projesi gelistirirken ilk adim ne olmalidir?",
    secenekler: [
      "Hemen kodlamaya baslamak",
      "Problemi tanimlamak ve anlamak",
      "En pahali teknolojiyi secmek",
      "Projeyi bitirmek icin aceele etmek",
    ],
    dogru: 1,
    aciklama: "Her iyi proje dogru tanimlanmis bir problemle baslar. Problemi anlamadan cozum uretilemez.",
  },
  {
    soru: "Asagidakilerden hangisi YZ ile cozulebilecek gercek bir problem ornegi DEGILDIR?",
    secenekler: [
      "Trafik sikisikligini azaltma",
      "Bitki hastaligini erken teshis etme",
      "Insanlarin duygularini tamamen kontrol etme",
      "Enerji tuketimini optimize etme",
    ],
    dogru: 2,
    aciklama: "YZ duygulari analiz edebilir ama insanlarin duygularini kontrol edemez. Bu hem teknik olarak imkansiz hem de etik degildir.",
  },
  {
    soru: "'Tasarim Dusuncesi' (Design Thinking) surecinde dogru sira hangisidir?",
    secenekler: [
      "Empati > Tanimlama > Fikir Uretme > Prototip > Test",
      "Kodlama > Test > Sunum",
      "Fikir > Urun > Satis",
      "Test > Tasarim > Uretim",
    ],
    dogru: 0,
    aciklama: "Tasarim Dusuncesi 5 asamadan olusur: once kullaniciyi anla, problemi tanimla, fikirler uret, prototip yap ve test et.",
  },
  {
    soru: "Bir YZ projesinde 'MVP' (Minimum Viable Product) ne demektir?",
    secenekler: [
      "En pahali versiyon",
      "Temel ozellikleri calisan en basit versiyon",
      "Sadece guzel gorunen versiyon",
      "Sadece sunumu olan versiyon",
    ],
    dogru: 1,
    aciklama: "MVP, projenin temel islevini yerine getiren en basit versiyonudur. Once MVP'yi calistir, sonra gelistir.",
  },
  {
    soru: "YZ projesinde veri toplama asamasinda en onemli kural nedir?",
    secenekler: [
      "Mumkun oldugunca az veri toplamak",
      "Kaliteli, cesitli ve etik yollarla toplanmis veri kullanmak",
      "Sadece internetten veri indirmek",
      "Verileri kontrol etmeden kullanmak",
    ],
    dogru: 1,
    aciklama: "Kaliteli ve cesitli veri, modelin basarisini dogrudan etkiler. Etik kurallara uyarak veri toplamak sarttir.",
  },
];

export default function Bolum7() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-teal-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🌍</div>
            <div>
              <p className="text-sm font-medium text-teal-200">BOLUM 7 &middot; 7-8. Sinif &middot; 8 ders saati</p>
              <h1 className="text-3xl font-extrabold">Gercek Hayat Problemleri</h1>
              <p className="text-teal-200">STEM Tabanli YZ Cozumleri</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-teal-500 bg-teal-50 p-6 dark:bg-teal-900/20">
          <h2 className="mb-3 text-lg font-bold text-teal-700 dark:text-teal-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Gercek duny problemlerini YZ ile cozme yaklasimini ogrenecegiz.</li>
            <li>Tasarim Dusuncesi (Design Thinking) metodolojisini uygulayacagiz.</li>
            <li>STEM (Bilim, Teknoloji, Muhendislik, Matematik) tabanli proje gelistirecegiz.</li>
            <li>Problem tanimlama, veri toplama, model secimi ve test sureclerini deneyimleyecegiz.</li>
            <li>Ekip calismasi ve proje yonetimi becerilerini gelistirecegiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["tasarim dusuncesi", "STEM", "problem cozme", "prototip", "MVP", "ekip calismasi", "proje yonetimi"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Tasarim Dusuncesi (Design Thinking)</h2>
          <p>YZ ile problem cozmek icin sistematik bir yaklasim gerekir. Tasarim Dusuncesi bize bu yaklasimi saglar:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "Empati Kur", aciklama: "Problemden etkilenen insanlari anla. Onlarla konus, gozlemle, yasadiklari zorlugu his et.", icon: "❤️", renk: "bg-rose-600" },
              { adim: 2, baslik: "Problemi Tanimla", aciklama: "Sorunu net bir cumleyle ifade et: 'Kim, ne, neden?' Kotu tanimlanmis problem cozulemez.", icon: "🎯", renk: "bg-orange-600" },
              { adim: 3, baslik: "Fikir Uret", aciklama: "Mumkun oldugunca cok fikir uret. Beyin firtinasi yap. Hic bir fikri eelestirme, once cok uret.", icon: "💡", renk: "bg-amber-600" },
              { adim: 4, baslik: "Prototip Yap", aciklama: "En umut verici fikri hizlica basit bir prototipe donustur (kagit uzerinde, Scratch'te, Teachable Machine'de).", icon: "🔧", renk: "bg-emerald-600" },
              { adim: 5, baslik: "Test Et", aciklama: "Prototipini gercek kullanicilarla test et. Geri bildirim al, gelistir, tekrar test et.", icon: "🧪", renk: "bg-blue-600" },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white ${a.renk}`}>{a.icon}</span>
                <div>
                  <h4 className="font-bold">{a.adim}. {a.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Ornek Problemler ve YZ Cozumleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { problem: "Okul kantininde israf", cozum: "Kameralarla yemek israfini tespite eden YZ sistemi", araclar: "Teachable Machine + PictoBlox", icon: "🍽️" },
              { problem: "Siniflarda gurultu", cozum: "Ses seviyesini olcup uyari veren akilli sistem", araclar: "PictoBlox ses tanima", icon: "🔊" },
              { problem: "Bitki bakimi unutma", cozum: "Toprak nemini izleyip sulama hatirlatmasi yapan uygulama", araclar: "ML for Kids + Scratch", icon: "🌱" },
              { problem: "Cop siniflandirma", cozum: "Atiklari otomatik siniflandiran geri donusum asistani", araclar: "Teachable Machine goruntu", icon: "♻️" },
              { problem: "Otopark sorunu", cozum: "Bos park yerlerini tespit eden kamera sistemi", araclar: "Bilgisayar gorusu", icon: "🅿️" },
              { problem: "Hasta bitki tespiti", cozum: "Yaprak fotograflarindan hastalik teshisi yapan model", araclar: "Teachable Machine", icon: "🍃" },
            ].map((p) => (
              <div key={p.problem} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-bold">{p.problem}</h4>
                </div>
                <p className="mb-2 text-sm text-[var(--color-text-secondary)]">{p.cozum}</p>
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400">Araclar: {p.araclar}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Proje Planlama Sablonu</h2>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Asama</th>
                  <th className="px-4 py-3 text-left">Sorular</th>
                  <th className="px-4 py-3 text-left">Sure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Problem", "Hangi problemi cozecegiz? Kimi etkiliyor? Neden onemli?", "1 ders"],
                  ["Arastirma", "Benzer cozumler var mi? Hangi veriler lazim? Hangi araclar uygun?", "1 ders"],
                  ["Tasarim", "Cozum nasil calisacak? Kullanici deneyimi nasil olacak?", "1 ders"],
                  ["Gelistirme", "Model egitimi, kodlama, entegrasyon", "3 ders"],
                  ["Test ve Sunum", "Calisyor mu? Geri bildirimler? Sunum hazirligi", "2 ders"],
                ].map(([asama, sorular, sure], i) => (
                  <tr key={asama} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 font-medium">{asama}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{sorular}</td>
                    <td className="px-4 py-2.5">{sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Grup calismasi (4-5 kisi)</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Problem Avcilari</h3>
            <p className="text-[var(--color-text-secondary)]">
              Grubunuzla okulunuzdaki veya mahallenizdeki problemleri listeleyin. Her problemi
              &quot;YZ ile cozulebilir mi?&quot; sorusuyla degerlendirin. En uygun 1 problemi
              secin ve Tasarim Dusuncesi sablonuyla calismaya baslayin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
              <span className="text-sm text-[var(--color-text-secondary)]">4 ders saati &middot; Grup calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Mini YZ Projesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Sectiginiz problemi cozen bir YZ prototipi gelistirin. Teachable Machine,
              PictoBlox veya ML for Kids kullanarak calisans bir model egitin. Projenizi
              sinifa sunun: problem, cozum, kullanilan teknoloji ve sonuclar.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Sinif tartismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Proje Fuari</h3>
            <p className="text-[var(--color-text-secondary)]">
              Her grup projesini poster ve canli demo ile sunar. Diger gruplar geri
              bildirim formu doldurur. En yenilikci, en faydali ve en iyi sunulan
              proje sinifca oylanir.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Tasarim Dusuncesi Sablonu (PDF)", "Proje Planlama Formu (PDF)", "Geri Bildirim Formu (PDF)", "Degerlendirme Testi (PDF)", "Oz Degerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/6" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 6</Link>
          <Link href="/bolumler/8" className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700">Bolum 8 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
