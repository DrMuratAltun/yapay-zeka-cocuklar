import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 10: Gelecek Seninle Başlar | Yapay Zeka Macerası",
};

import Image from "next/image";
import BolumSlider from "@/components/BolumSlider";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import KariyerKeswordi from "@/components/oyunlar/KariyerKeswordi";
import PortfolyoOlusturucu from "@/components/etkinlikler/PortfolyoOlusturucu";
import GelecekMektubu from "@/components/etkinlikler/GelecekMektubu";
import KariyerYolHaritasi from "@/components/etkinlikler/KariyerYolHaritasi";
import YzZamanCizelgesi2050 from "@/components/etkinlikler/YzZamanCizelgesi2050";
import BilgiKutusu from "@/components/anlati/BilgiKutusu";
import GecisSlayt from "@/components/anlati/GecisSlayt";
import OzetKarti from "@/components/anlati/OzetKarti";
import Hikaye from "@/components/anlati/Hikaye";

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

/* ---- Hoş Geldin (yeni — 9 bölüm sonrası özel karşılama) ---- */
const SlaytHosGeldin10 = (
  <>
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
      <Image
        src="/images/illustrasyonlar/gelecek-vizyon.svg"
        alt="İnsan ve YZ işbirliği — geleceğe vizyon"
        width={1000}
        height={640}
        className="h-auto w-full"
      />
    </div>

    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-center text-white shadow-xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white blur-3xl" />
      </div>
      <div className="relative">
        <span className="inline-block text-6xl float-2" aria-hidden="true">🚀</span>
        <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">İşte Son Bölüm!</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 md:text-base">
          9 bölüm boyunca öğrendiğin her şeyi bir araya getirme zamanı.
          Sırada <strong>kendi YZ projeni</strong> tasarlamak var.
        </p>
      </div>
    </div>

    <Hikaye
      karakter="Zeki"
      karakterEmoji="🤖"
      baslik="Buraya kadar gelmek başardın!"
      paragraflar={[
        "Hatırlıyor musun, Bölüm 1'de \"YZ nedir?\" diye sormuştun. Şimdi cevabını biliyorsun. Hatta sinir ağı çalıştırdın, veri seti eğittin, etik mahkemede yargılama yaptın.",
        "Bu son bölüm farklı: bilgi vermeyeceğim. Bilgini KULLANACAKSIN. Kendi projeni planlayacak, portfolyonu hazırlayacak, geleceğe mektup yazacaksın.",
        <span key="end">
          Çünkü öğrenme bitmedi, başlıyor. Sen artık bir <strong>YZ okuryazarı</strong>sın.
          Geleceği inşa edecek olan sensin. Hadi başlayalım.
        </span>,
      ]}
      renkGradient="from-indigo-600 via-purple-600 to-pink-600"
    />
  </>
);

/* ---- Geçiş: Plandan → Yapmaya ---- */
const SlaytGecis10_1 = (
  <GecisSlayt
    emoji="🛠️"
    renkGradient="from-indigo-500 to-purple-600"
    oncekiBaslik="Yol Haritan Hazır"
    oncekiOzet={
      <p>
        Final projesinin nasıl olması gerektiğini, portfolyo hazırlamayı ve
        YZ kariyer fırsatlarını gördün.
      </p>
    }
    sonrakiBaslik="Şimdi: Yap, Sergile, Paylaş"
    sonrakiOzet={
      <p>
        Sıradaki etkinliklerde <strong>kendi final projeni planlayacak</strong>,
        kariyer haritanı çizecek ve geleceğe bir mektup yazacaksın. Bu mektubu 5 yıl sonra aç!
      </p>
    }
    hikaye={
      <span>
        <strong>Zeki&apos;den son söz:</strong> &quot;Bilmek&quot; ile &quot;yapmak&quot; arasında bir kıta var.
        En iyi öğrenenler — yapanlardır. Mükemmel olmasın, sadece <em>başla</em>.
      </span>
    }
  />
);

/* ---- Bölüm 10 Özeti = Tüm Yolculuğun Özeti ---- */
const SlaytBolumOzeti10 = (
  <>
    <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-center text-white shadow-xl">
      <span className="text-5xl" aria-hidden="true">🎓</span>
      <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">10 Bölümlük Yolculuğun Özeti</h3>
      <p className="mt-2 text-sm text-white/90 md:text-base">
        Yapay Zeka okuryazarı oldun. İşte birlikte öğrendiklerimiz:
      </p>
    </div>

    <OzetKarti
      baslik="Final Özet"
      renkGradient="from-indigo-600 to-purple-700"
      ogrenilenler={[
        "Bölüm 1: YZ nedir, türleri, tarihi (Turing, Cahit Arf).",
        "Bölüm 2: YZ günlük hayatta — telefon, öneri, sesli asistan, otonom araç.",
        "Bölüm 3: Veri YZ'nin yakıtı — toplama, temizleme, etiketleme, KVKK.",
        "Bölüm 4: Makine öğrenmesi — denetimli, denetimsiz, pekiştirmeli; sinir ağları.",
        "Bölüm 5: Üretken YZ — LLM'ler, prompt mühendisliği, halüsinasyon, etik kullanım.",
        "Bölüm 6: PictoBlox ile blok tabanlı YZ kodlama.",
        "Bölüm 7: Tasarım Düşüncesi ile gerçek dünya problemlerini çözme.",
        "Bölüm 8: YZ ile dijital içerik üretimi ve yaratıcılık.",
        "Bölüm 9: Etik — önyargı, deepfake, sorumluluk.",
        "Bölüm 10: Kendi projen, portfolyon, kariyerin.",
      ]}
      anahtarKelimeler={[
        "YZ okuryazarlığı",
        "veri",
        "model",
        "etik",
        "yaratıcılık",
        "tasarım düşüncesi",
        "kariyer",
        "portfolyo",
        "geleceğin meslekleri",
      ]}
      sorular={[
        "5 yıl sonraki seni hayal et — YZ ile ne yapıyor olacaksın?",
        "Çevrendeki bir problemi YZ ile nasıl çözmeyi denerdin?",
        "Yeni başlayan birine YZ konusunda vereceğin tek tavsiye nedir?",
      ]}
    />
  </>
);

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

    <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-900/20 dark:to-orange-900/20">
      <p className="font-medium">🤔 <strong>Biliyor Muydunuz?</strong> 2030&apos;da iş dünyasındaki görevlerin %30&apos;u YZ ile değişecek!</p>
    </div>
  </section>
);

const SlaytProjeAdimlari = (
  <section className="space-y-4">
    <h2 className="text-2xl font-extrabold">2. Proje Adımları</h2>
    <div className="space-y-3">
      {[
        { adim: 1, baslik: "Konu Seçimi", aciklama: "İlginizi çeken bir gerçek dünya problemi seçin. Çevre, sağlık, eğitim, ulaşım...", sure: "1 ders" },
        { adim: 2, baslik: "Araştırma", aciklama: "Problemi araştırın, benzer çözümleri inceleyin, hangi YZ yaklaşımını kullanacağınıza karar verin.", sure: "1 ders" },
        { adim: 3, baslik: "Veri Toplama", aciklama: "Projeniz için gerekli verileri toplayın, temizleyin ve etiketleyin.", sure: "1 ders" },
        { adim: 4, baslik: "Model Geliştirme", aciklama: "Teachable Machine veya PictoBlox ile modelinizi eğitin ve test edin.", sure: "2 ders" },
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

    <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
      <p className="font-medium">💡 <strong>İpucu:</strong> Projenizi küçük parçalara bölün ve her adımı tamamladığınızda kutlayın. Büyük projeler küçük başarılarla tamamlanır!</p>
    </div>
  </section>
);

const SlaytPortfolyo = (
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

    <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
      <p className="font-medium">⚠️ <strong>Dikkat:</strong> Portfolyonuza sadece sonucu değil, süreci de ekleyin. Hatalar ve öğrendiğiniz dersler en değerli kısımlardır!</p>
    </div>
  </section>
);

const SlaytKariyer = (
  <section className="space-y-4">
    <h2 className="text-2xl font-extrabold">4. YZ Çağında Kariyer Fırsatları</h2>
    <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <Image src="/images/bolumler/ai-future.jpg" alt="Yapay zeka ve gelecek konsepti - YZ çağında kariyer fırsatları" width={600} height={400} className="rounded-lg object-cover shadow-md" />
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">YZ teknolojileri geleceğin mesleklerini şekillendiriyor</p>
      <p className="text-xs text-[var(--color-text-secondary)] italic">Fotoğraf: Elekes Andor, CC BY-SA 4.0</p>
    </div>
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
);

const SlaytOgrenmeDevam = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">5. Öğrenmeye Devam Et!</h2>
      <p>Bu kitap sadece başlangıç! YZ öğrenme yolculuğunuza devam etmek için:</p>
      <div className="space-y-3">
        {[
          { kaynak: "PictoBlox", aciklama: "Blok tabanlı YZ kodlama ile daha karmaşık projeler", seviye: "Şimdi" },
          { kaynak: "Python Temelleri", aciklama: "Gerçek programlama dili öğrenmeye başla", seviye: "Sonraki Adım" },
          { kaynak: "Khan Academy / Code.org", aciklama: "Online kodlama kursları", seviye: "Sonraki Adım" },
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

/* ---- Etkinlik 1: Final Projesi ---- */
const SlaytEtkinlik1 = (
  <>
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

    <PortfolyoOlusturucu />
  </>
);

/* ---- Etkinlik 1b: Kariyer Yol Haritası ---- */
const SlaytEtkinlik1b = (
  <>
    <KariyerYolHaritasi />
  </>
);

/* ---- Etkinlik 2: Gelecek Fuarı ---- */
const SlaytEtkinlik2 = (
  <>
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

    <YzZamanCizelgesi2050 />
  </>
);

/* ---- Etkinlik 3: Gelecek Mektubu ---- */
const SlaytEtkinlik3 = (
  <>
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

    <GelecekMektubu />
  </>
);

const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 YZ Kariyer Keşfi</h2>
    <p className="text-[var(--color-text-secondary)]">
      Sorulara cevap ver ve sana en uygun YZ kariyer yolunu keşfet!
    </p>
    <KariyerKeswordi />
  </section>
);

const SlaytDegerlendirme = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />
  </>
);

const SlaytMateryaller = (
  <>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
      <div className="space-y-3">
        {[
          { ad: "Final Projesi Planlama Formu", url: "/indirilebilir/bolum-10-final-projesi-planlama.html" },
          { ad: "Portfolyo Şablonu", url: "/indirilebilir/bolum-10-portfolyo-sablonu.html" },
          { ad: "Gelecek Mektubu Şablonu", url: "/indirilebilir/bolum-10-gelecek-mektubu.html" },
          { ad: "Sertifika Şablonu", url: "/indirilebilir/bolum-10-sertifika.html" },
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

export default function Bolum10() {
  const slaytlar = [
    { baslik: "Hoş Geldin!", icon: "👋", icerik: SlaytHosGeldin10 },
    { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
    { baslik: "Final Projesi", icon: "🌟", icerik: SlaytFinalProjesi },
    { baslik: "Proje Adımları", icon: "📋", icerik: SlaytProjeAdimlari },
    { baslik: "Portfolyo Hazırlama", icon: "📂", icerik: SlaytPortfolyo },
    { baslik: "Kariyer Fırsatları", icon: "💼", icerik: SlaytKariyer },
    { baslik: "Öğrenmeye Devam Et", icon: "🚀", icerik: SlaytOgrenmeDevam },
    { baslik: "Yapma Zamanı", icon: "🛠️", icerik: SlaytGecis10_1 },
    { baslik: "Etkinlik: Final Projesi", icon: "🎮", icerik: SlaytEtkinlik1 },
    { baslik: "Etkinlik: Kariyer Yol Haritası", icon: "🗺️", icerik: SlaytEtkinlik1b },
    { baslik: "Etkinlik: Gelecek Fuarı", icon: "🎮", icerik: SlaytEtkinlik2 },
    { baslik: "Etkinlik: Gelecek Mektubu", icon: "🎮", icerik: SlaytEtkinlik3 },
    { baslik: "YZ Kariyer Keşfi", icon: "🧩", icerik: SlaytOyun },
    { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
    { baslik: "Final Özet", icon: "🎓", icerik: SlaytBolumOzeti10 },
    { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
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
