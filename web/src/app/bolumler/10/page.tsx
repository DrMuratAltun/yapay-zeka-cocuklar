import BolumSlider from "@/components/BolumSlider";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Bir YZ projesi portfolyosu için en önemli öğeler hangileridir?",
    secenekler: [
      "Sadece kodun kendisi",
      "Problem tanımı, süreç, sonuçlar ve öğrenilen dersler",
      "Sadece ekran görüntüleri",
      "Sadece proje başlığı",
    ],
    dogru: 1,
    aciklama: "İyi bir portfolyo sadece sonucu değil, tüm süreci gösterir: problemi nasıl tanımladığınızı, nasıl çözdüğünüzü ve neler öğrendiğinizi.",
  },
  {
    soru: "YZ alanında çalışabilmek için hangi beceriler en önemlidir?",
    secenekler: [
      "Sadece matematik",
      "Programlama + matematik + problem çözme + iletişim",
      "Sadece programlama",
      "Sadece İngilizce bilmek",
    ],
    dogru: 1,
    aciklama: "YZ alanında disiplinlerarası beceriler gerekir: programlama, matematik, analitik düşünme, iletişim ve sürekli öğrenme.",
  },
  {
    soru: "Aşağıdakilerden hangisi YZ ile ilgili yeni ortaya çıkan bir meslek DEĞİLDİR?",
    secenekler: [
      "Prompt Mühendisi",
      "YZ Etik Danışmanı",
      "Veri Bilimci",
      "Atlı Postacı",
    ],
    dogru: 3,
    aciklama: "Prompt mühendisliği, YZ etik danışmanlığı ve veri bilimi YZ çağının yeni meslekleridir. Atlı postacılık tarihe karışmış bir meslektir.",
  },
  {
    soru: "'Hayat boyu öğrenme' (lifelong learning) YZ çağında neden önemlidir?",
    secenekler: [
      "Çünkü sınav için gereklidir",
      "Teknoloji çok hızlı değiştiği için sürekli yeni beceriler öğrenilmelidir",
      "Sadece üniversite için gereklidir",
      "Önemli değildir, okul yeterlidir",
    ],
    dogru: 1,
    aciklama: "YZ ve teknoloji çok hızlı gelişiyor. Bugün öğrendiğiniz bilgi yarın eskiyebilir. Sürekli öğrenme bir zorunluluk hâline gelmiştir.",
  },
  {
    soru: "Bu kitapta öğrendiğiniz en önemli ders nedir?",
    secenekler: [
      "YZ insanların yerini alacak",
      "YZ sadece büyükler içindir",
      "YZ güçlü bir araçtır ve sorumlulukla kullanılmalıdır",
      "YZ tehlikelidir ve uzak durmak gerekir",
    ],
    dogru: 2,
    aciklama: "YZ güçlü bir araçtır. Onu anlayan, doğru ve sorumlulukla kullanan bireyler geleceğin mimarları olacaktır. Sen de onlardan biri olabilirsin!",
  },
];

const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 p-6 dark:bg-indigo-900/20">
      <h2 className="mb-3 text-lg font-bold text-indigo-700 dark:text-indigo-300">Neler Öğreneceğiz?</h2>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Kapsamlı bir YZ projesi planlayıp hayata geçireceğiz.</li>
        <li>Proje portfolyosu hazırlama becerisi kazanacağız.</li>
        <li>YZ alanındaki kariyer fırsatlarını ve yeni meslekleri keşfedeceğiz.</li>
        <li>Hayat boyu öğrenme yol haritası oluşturacağız.</li>
        <li>Kitap boyunca öğrendiğimiz her şeyi bir final projesiyle birleştireceğiz.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["final projesi", "portfolyo", "kariyer", "hayat boyu öğrenme", "sunum", "proje yönetimi"].map((k) => (
        <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
      ))}
    </div>
  </>
);

const SlaytFinalProjesi = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">1. Final Projesi: Büyük Resim</h2>
      <p>
        Bu bölümdeki final projesi, kitap boyunca öğrendiğiniz tüm bilgi ve becerileri
        bir araya getirmenizi sağlar. Gerçek bir problemi YZ ile çözen kapsamlı bir
        proje geliştireceksiniz.
      </p>
      <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-5 dark:border-indigo-700 dark:bg-indigo-900/20">
        <h3 className="mb-3 font-bold text-indigo-700 dark:text-indigo-400">🎯 Final Projesi Gereksinimleri</h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          {[
            { gereksinim: "Gerçek bir problem çözmeli", icon: "🌍" },
            { gereksinim: "YZ/ML modeli içermeli", icon: "🧠" },
            { gereksinim: "Veri toplama ve hazırlama yapmalı", icon: "📊" },
            { gereksinim: "Etik değerlendirme içermeli", icon: "⚖️" },
            { gereksinim: "Çalışan bir prototip olmalı", icon: "💻" },
            { gereksinim: "Sunum ve belgelendirme yapmalı", icon: "📋" },
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
      <h2 className="text-2xl font-extrabold">2. Proje Adımları</h2>
      <div className="space-y-3">
        {[
          { adim: 1, baslik: "Konu Seçimi", aciklama: "İlginizi çeken bir gerçek dünya problemi seçin. Çevre, sağlık, eğitim, ulaşım...", sure: "1 ders" },
          { adim: 2, baslik: "Araştırma", aciklama: "Problemi araştırın, benzer çözümleri inceleyin, hangi YZ yaklaşımını kullanacağınıza karar verin.", sure: "1 ders" },
          { adim: 3, baslik: "Veri Toplama", aciklama: "Projeniz için gerekli verileri toplayın, temizleyin ve etiketleyin.", sure: "1 ders" },
          { adim: 4, baslik: "Model Geliştirme", aciklama: "Teachable Machine, PictoBlox veya ML for Kids ile modelinizi eğitin ve test edin.", sure: "2 ders" },
          { adim: 5, baslik: "Entegrasyon", aciklama: "Modeli bir uygulama/oyun/sunum ile birleştirin. Kullanıcı arayüzü tasarlayın.", sure: "1 ders" },
          { adim: 6, baslik: "Sunum Hazırlığı", aciklama: "Poster, sunum ve canlı demo hazırlayın. Portfolyo belgesini tamamlayın.", sure: "1 ders" },
          { adim: 7, baslik: "Proje Fuarı", aciklama: "Projenizi sınıfa/okula sunun. Geri bildirim alın ve değerlendirin.", sure: "1 ders" },
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
  </>
);

const SlaytPortfolyoKariyer = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">3. Portfolyo Nasıl Hazırlanır?</h2>
      <p>Portfolyonuz, YZ yolculuğunuzun tüm hikâyesini anlatan bir belge/sunumdur:</p>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Bölüm</th>
              <th className="px-4 py-3 text-left">İçerik</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Kapak", "Proje adı, isminiz, tarih, okul"],
              ["Problem", "Hangi sorunu çözüyorsunuz? Neden önemli?"],
              ["Araştırma", "Benzer çözümler, kullanılan teknolojiler"],
              ["Süreç", "Veri toplama, model eğitimi, kodlama adımları"],
              ["Sonuçlar", "Model başarısı, ekran görüntüleri, demo"],
              ["Dersler", "Ne öğrendiniz? Zorluklar? Farklı ne yapardınız?"],
              ["Kaynaklar", "Kullanılan araçlar, veri kaynakları, referanslar"],
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
      <h2 className="text-2xl font-extrabold">4. YZ Çağında Kariyer Fırsatları</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { meslek: "YZ Mühendisi", aciklama: "YZ modelleri tasarlar ve geliştirir", icon: "👩‍💻" },
          { meslek: "Veri Bilimci", aciklama: "Büyük verileri analiz eder, içgörüler çıkarır", icon: "📊" },
          { meslek: "Prompt Mühendisi", aciklama: "YZ araçlarından en iyi sonucu alacak talimatlar tasarlar", icon: "✍️" },
          { meslek: "YZ Etik Danışmanı", aciklama: "YZ sistemlerinin etik ve adil olmasını sağlar", icon: "⚖️" },
          { meslek: "Robotik Mühendisi", aciklama: "YZ destekli robotlar tasarlar", icon: "🤖" },
          { meslek: "YZ Ürün Yöneticisi", aciklama: "YZ ürünlerinin geliştirme sürecini yönetir", icon: "📋" },
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
      <h2 className="text-2xl font-extrabold">5. Öğrenmeye Devam Et!</h2>
      <p>Bu kitap sadece başlangıç! YZ öğrenme yolculuğunuza devam etmek için:</p>
      <div className="space-y-3">
        {[
          { kaynak: "Scratch + ML for Kids", aciklama: "Blok kodlama ile daha karmaşık YZ projeleri", seviye: "Şimdi" },
          { kaynak: "Python Temelleri", aciklama: "Gerçek programlama dili öğrenmeye başla", seviye: "Sonraki Adım" },
          { kaynak: "Khan Academy / Code.org", aciklama: "Ücretsiz online kodlama kursları", seviye: "Sonraki Adım" },
          { kaynak: "TensorFlow / PyTorch", aciklama: "Profesyonel ML frameworkleri", seviye: "İleri" },
          { kaynak: "Kaggle Yarışmaları", aciklama: "Gerçek veri bilimi yarışmaları ve eğitimler", seviye: "İleri" },
          { kaynak: "Üniversite (Bilgisayar Mühendisliği)", aciklama: "YZ alanında akademik kariyer", seviye: "Gelecek" },
        ].map((k) => (
          <div key={k.kaynak} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <span className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold text-white ${
              k.seviye === "Şimdi" ? "bg-emerald-600" : k.seviye === "Sonraki Adım" ? "bg-blue-600" : k.seviye === "İleri" ? "bg-violet-600" : "bg-indigo-600"
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
        Bu kitabı tamamlayarak yapay zeka dünyasına sağlam bir adım attın.
        Öğrendiğin bilgiler ve kazandığın becerilerle geleceğin teknolojilerine
        hazırsın. Unutma: <strong>Gelecek seninle başlar!</strong>
      </p>
    </div>
  </>
);

const SlaytEtkinlikler = (
  <section className="space-y-6">
    <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-indigo-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
        <span className="text-sm text-[var(--color-text-secondary)]">6 ders saati &middot; Bireysel veya grup</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Final Projesi</h3>
      <p className="text-[var(--color-text-secondary)]">
        Gerçek bir problemi YZ ile çözen kapsamlı bir proje geliştirin. Proje
        planlama formunu doldurun, modeli eğitin, prototipi oluşturun ve portfolyo
        belgesini hazırlayın. Sınıfta canlı demo ile sunun.
      </p>
    </div>

    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">1 ders saati &middot; Sınıf etkinliği</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Gelecek Fuarı</h3>
      <p className="text-[var(--color-text-secondary)]">
        Her öğrenci/grup projesini poster ve canlı demo ile sunar. Diğer sınıflar,
        öğretmenler ve aileler davet edilir. En iyi projeler oylanır ve ödüllendirilir.
        Kategoriler: En Yenilikçi, En Faydalı, En İyi Sunum, En İyi Tasarım.
      </p>
    </div>

    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Gelecek Mektubu</h3>
      <p className="text-[var(--color-text-secondary)]">
        Gelecekteki kendinize bir mektup yazın: YZ hakkında ne öğrendiniz? Gelecekte
        ne yapmak istiyorsunuz? YZ&apos;yi nasıl kullanacaksınız? Mektubu kapatıp
        &quot;1 yıl sonra aç&quot; yazın.
      </p>
    </div>
  </section>
);

const SlaytQuizMateryaller = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
      <div className="space-y-3">
        {["Final Projesi Planlama Formu (PDF)", "Portfolyo Şablonu (PDF)", "Proje Değerlendirme Rubriği (PDF)", "Gelecek Mektubu Şablonu (PDF)", "Sertifika Şablonu (PDF)"].map((d) => (
          <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
            <span className="text-sm font-medium">{d}</span>
            <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakın zamanda</span>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default function Bolum10() {
  const slaytlar = [
    { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
    { baslik: "Final Projesi ve Adımlar", icon: "📖", icerik: SlaytFinalProjesi },
    { baslik: "Portfolyo, Kariyer ve Gelecek", icon: "📖", icerik: SlaytPortfolyoKariyer },
    { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
    { baslik: "Quiz ve Materyaller", icon: "📝", icerik: SlaytQuizMateryaller },
  ];

  return (
    <BolumSlider
      bolumNo={10}
      bolumBaslik="Gelecek Seninle Başlar"
      bolumAltBaslik="Proje ve Portfolyo"
      seviye="8. Sınıf"
      ders={8}
      renk="from-indigo-600 to-purple-700"
      slaytlar={slaytlar}
      oncekiBolum={9}
      sonrakiBolum={null}
    />
  );
}
