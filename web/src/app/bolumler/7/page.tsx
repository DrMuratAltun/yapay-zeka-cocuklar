import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "STEM tabanlı YZ projesi geliştirirken ilk adım ne olmalıdır?",
    secenekler: [
      "Hemen kodlamaya başlamak",
      "Problemi tanımlamak ve anlamak",
      "En pahalı teknolojiyi seçmek",
      "Projeyi bitirmek için acele etmek",
    ],
    dogru: 1,
    aciklama: "Her iyi proje doğru tanımlanmış bir problemle başlar. Problemi anlamadan çözüm üretilemez.",
  },
  {
    soru: "Aşağıdakilerden hangisi YZ ile çözülebilecek gerçek bir problem örneği DEĞİLDİR?",
    secenekler: [
      "Trafik sıkışıklığını azaltma",
      "Bitki hastalığını erken teşhis etme",
      "İnsanların duygularını tamamen kontrol etme",
      "Enerji tüketimini optimize etme",
    ],
    dogru: 2,
    aciklama: "YZ duyguları analiz edebilir ama insanların duygularını kontrol edemez. Bu hem teknik olarak imkansız hem de etik değildir.",
  },
  {
    soru: "'Tasarım Düşüncesi' (Design Thinking) sürecinde doğru sıra hangisidir?",
    secenekler: [
      "Empati > Tanımlama > Fikir Üretme > Prototip > Test",
      "Kodlama > Test > Sunum",
      "Fikir > Ürün > Satış",
      "Test > Tasarım > Üretim",
    ],
    dogru: 0,
    aciklama: "Tasarım Düşüncesi 5 aşamadan oluşur: önce kullanıcıyı anla, problemi tanımla, fikirler üret, prototip yap ve test et.",
  },
  {
    soru: "Bir YZ projesinde 'MVP' (Minimum Viable Product) ne demektir?",
    secenekler: [
      "En pahalı versiyon",
      "Temel özellikleri çalışan en basit versiyon",
      "Sadece güzel görünen versiyon",
      "Sadece sunumu olan versiyon",
    ],
    dogru: 1,
    aciklama: "MVP, projenin temel işlevini yerine getiren en basit versiyonudur. Önce MVP'yi çalıştır, sonra geliştir.",
  },
  {
    soru: "YZ projesinde veri toplama aşamasında en önemli kural nedir?",
    secenekler: [
      "Mümkün olduğunca az veri toplamak",
      "Kaliteli, çeşitli ve etik yollarla toplanmış veri kullanmak",
      "Sadece internetten veri indirmek",
      "Verileri kontrol etmeden kullanmak",
    ],
    dogru: 1,
    aciklama: "Kaliteli ve çeşitli veri, modelin başarısını doğrudan etkiler. Etik kurallara uyarak veri toplamak şarttır.",
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
              <p className="text-sm font-medium text-teal-200">BÖLÜM 7 &middot; 7-8. Sınıf &middot; 8 ders saati</p>
              <h1 className="text-3xl font-extrabold">Gerçek Hayat Problemleri</h1>
              <p className="text-teal-200">STEM Tabanlı YZ Çözümleri</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-teal-500 bg-teal-50 p-6 dark:bg-teal-900/20">
          <h2 className="mb-3 text-lg font-bold text-teal-700 dark:text-teal-300">Neler Öğreneceğiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Gerçek dünya problemlerini YZ ile çözme yaklaşımını öğreneceğiz.</li>
            <li>Tasarım Düşüncesi (Design Thinking) metodolojisini uygulayacağız.</li>
            <li>STEM (Bilim, Teknoloji, Mühendislik, Matematik) tabanlı proje geliştireceğiz.</li>
            <li>Problem tanımlama, veri toplama, model seçimi ve test süreçlerini deneyimleyeceğiz.</li>
            <li>Ekip çalışması ve proje yönetimi becerilerini geliştireceğiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["tasarım düşüncesi", "STEM", "problem çözme", "prototip", "MVP", "ekip çalışması", "proje yönetimi"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Tasarım Düşüncesi (Design Thinking)</h2>
          <p>YZ ile problem çözmek için sistematik bir yaklaşım gerekir. Tasarım Düşüncesi bize bu yaklaşımı sağlar:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "Empati Kur", aciklama: "Problemden etkilenen insanları anla. Onlarla konuş, gözlemle, yaşadıkları zorluğu hisset.", icon: "❤️", renk: "bg-rose-600" },
              { adim: 2, baslik: "Problemi Tanımla", aciklama: "Sorunu net bir cümleyle ifade et: 'Kim, ne, neden?' Kötü tanımlanmış problem çözülemez.", icon: "🎯", renk: "bg-orange-600" },
              { adim: 3, baslik: "Fikir Üret", aciklama: "Mümkün olduğunca çok fikir üret. Beyin fırtınası yap. Hiçbir fikri eleştirme, önce çok üret.", icon: "💡", renk: "bg-amber-600" },
              { adim: 4, baslik: "Prototip Yap", aciklama: "En umut verici fikri hızlıca basit bir prototipe dönüştür (kağıt üzerinde, Scratch'te, Teachable Machine'de).", icon: "🔧", renk: "bg-emerald-600" },
              { adim: 5, baslik: "Test Et", aciklama: "Prototipini gerçek kullanıcılarla test et. Geri bildirim al, geliştir, tekrar test et.", icon: "🧪", renk: "bg-blue-600" },
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
          <h2 className="text-2xl font-extrabold">2. Örnek Problemler ve YZ Çözümleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { problem: "Okul kantininde israf", cozum: "Kameralarla yemek israfını tespit eden YZ sistemi", araclar: "Teachable Machine + PictoBlox", icon: "🍽️" },
              { problem: "Sınıflarda gürültü", cozum: "Ses seviyesini ölçüp uyarı veren akıllı sistem", araclar: "PictoBlox ses tanıma", icon: "🔊" },
              { problem: "Bitki bakımı unutma", cozum: "Toprak nemini izleyip sulama hatırlatması yapan uygulama", araclar: "ML for Kids + Scratch", icon: "🌱" },
              { problem: "Çöp sınıflandırma", cozum: "Atıkları otomatik sınıflandıran geri dönüşüm asistanı", araclar: "Teachable Machine görüntü", icon: "♻️" },
              { problem: "Otopark sorunu", cozum: "Boş park yerlerini tespit eden kamera sistemi", araclar: "Bilgisayar görüsü", icon: "🅿️" },
              { problem: "Hasta bitki tespiti", cozum: "Yaprak fotoğraflarından hastalık teşhisi yapan model", araclar: "Teachable Machine", icon: "🍃" },
            ].map((p) => (
              <div key={p.problem} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-bold">{p.problem}</h4>
                </div>
                <p className="mb-2 text-sm text-[var(--color-text-secondary)]">{p.cozum}</p>
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400">Araçlar: {p.araclar}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Proje Planlama Şablonu</h2>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Aşama</th>
                  <th className="px-4 py-3 text-left">Sorular</th>
                  <th className="px-4 py-3 text-left">Süre</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Problem", "Hangi problemi çözeceğiz? Kimi etkiliyor? Neden önemli?", "1 ders"],
                  ["Araştırma", "Benzer çözümler var mı? Hangi veriler lazım? Hangi araçlar uygun?", "1 ders"],
                  ["Tasarım", "Çözüm nasıl çalışacak? Kullanıcı deneyimi nasıl olacak?", "1 ders"],
                  ["Geliştirme", "Model eğitimi, kodlama, entegrasyon", "3 ders"],
                  ["Test ve Sunum", "Çalışıyor mu? Geri bildirimler? Sunum hazırlığı", "2 ders"],
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
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Grup çalışması (4-5 kişi)</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Problem Avcıları</h3>
            <p className="text-[var(--color-text-secondary)]">
              Grubunuzla okulunuzdaki veya mahallenizdeki problemleri listeleyin. Her problemi
              &quot;YZ ile çözülebilir mi?&quot; sorusuyla değerlendirin. En uygun 1 problemi
              seçin ve Tasarım Düşüncesi şablonuyla çalışmaya başlayın.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
              <span className="text-sm text-[var(--color-text-secondary)]">4 ders saati &middot; Grup çalışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Mini YZ Projesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Seçtiğiniz problemi çözen bir YZ prototipi geliştirin. Teachable Machine,
              PictoBlox veya ML for Kids kullanarak çalışan bir model eğitin. Projenizi
              sınıfa sunun: problem, çözüm, kullanılan teknoloji ve sonuçlar.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Sınıf tartışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Proje Fuarı</h3>
            <p className="text-[var(--color-text-secondary)]">
              Her grup projesini poster ve canlı demo ile sunar. Diğer gruplar geri
              bildirim formu doldurur. En yenilikçi, en faydalı ve en iyi sunulan
              proje sınıfça oylanır.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Tasarım Düşüncesi Şablonu (PDF)", "Proje Planlama Formu (PDF)", "Geri Bildirim Formu (PDF)", "Değerlendirme Testi (PDF)", "Öz Değerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakın zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/6" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bölüm 6</Link>
          <Link href="/bolumler/8" className="rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition hover:bg-teal-700">Bölüm 8 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
