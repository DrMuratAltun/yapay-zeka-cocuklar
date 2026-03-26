import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 2: Günlük Hayatta YZ | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import YzEslestirme from "@/components/oyunlar/YzEslestirme";

const quizSorulari = [
  {
    soru: "Aşağıdakilerden hangisi yapay zekanın günlük hayattaki bir uygulaması DEĞİLDİR?",
    secenekler: [
      "Telefonun yüz tanıma ile açılması",
      "Elektrik süpürgesinin düğmeyle açılması",
      "Netflix'in film önerisi yapması",
      "Google Haritalar'ın trafik tahmini vermesi",
    ],
    dogru: 1,
    aciklama:
      "Düğmeyle çalışan bir elektrik süpürgesi basit bir mekanik cihazdır, yapay zeka içermez. Ancak robot süpürgeler YZ kullanır!",
  },
  {
    soru: "Bir sesli asistanın (Siri, Google Asistan) çalışması için hangi YZ teknolojileri gerekir?",
    secenekler: [
      "Sadece ses tanıma",
      "Ses tanıma + doğal dil işleme + konuşma sentezi",
      "Sadece internet bağlantısı",
      "Sadece mikrofon",
    ],
    dogru: 1,
    aciklama:
      "Sesli asistanlar birden fazla YZ teknolojisini bir arada kullanır: sesinizi tanır, ne dediğinizi anlar ve size yanıtlar üretir.",
  },
  {
    soru: "Spotify veya YouTube'un 'Sana Özel' oynatma listeleri hangi YZ yöntemiyle oluşturulur?",
    secenekler: [
      "Rastgele seçim",
      "Öneri sistemi (tavsiye algoritmaları)",
      "Alfabetik sıralama",
      "En yeni şarkıları gösterme",
    ],
    dogru: 1,
    aciklama:
      "Öneri sistemleri, dinleme/izleme alışkanlıklarına bakarak sevebileceğin yeni içerikleri tahmin eder.",
  },
  {
    soru: "Akıllı ev sistemlerinde yapay zeka ne işe yarar?",
    secenekler: [
      "Sadece ışıkları açıp kapatır",
      "Alışkanlıklarınızı öğrenerek enerji tasarrufu sağlar",
      "Sadece uzaktan kumanda görevi görür",
      "İnternete bağlanmayı sağlar",
    ],
    dogru: 1,
    aciklama:
      "Akıllı ev sistemleri YZ sayesinde alışkanlıklarınızı öğrenir: ne zaman eve geldiğinizi, hangi sıcaklığı tercih ettiğinizi bilir.",
  },
  {
    soru: "Aşağıdaki YZ uygulamalarından hangisi sağlık alanında kullanılır?",
    secenekler: [
      "Spam mail filtreleme",
      "Röntgen ve MR görüntülerinde hastalık tespiti",
      "Sosyal medya filtreleri",
      "Online oyunlardaki NPC karakterler",
    ],
    dogru: 1,
    aciklama:
      "YZ, tıbbi görüntüleri analiz ederek doktorlara teşhis konusunda yardımcı olur. Bu alan 'tıbbi yapay zeka' olarak adlandırılır.",
  },
];

const yzAlanlari = [
  {
    alan: "Ulaşım",
    icon: "🚗",
    ornekler: [
      "Otonom (sürücüsüz) araçlar",
      "Trafik yönetim sistemleri",
      "Navigasyon ve rota optimizasyonu",
      "Park yeri bulma uygulamaları",
    ],
    renk: "bg-blue-500",
    renkAcik: "bg-blue-50 dark:bg-blue-900/20",
    renkBorder: "border-blue-200 dark:border-blue-800",
  },
  {
    alan: "Sağlık",
    icon: "🏥",
    ornekler: [
      "Tıbbi görüntü analizi (röntgen, MR)",
      "İlaç geliştirme",
      "Sağlık izleme (akıllı saatler)",
      "Hastalık riski tahmini",
    ],
    renk: "bg-emerald-500",
    renkAcik: "bg-emerald-50 dark:bg-emerald-900/20",
    renkBorder: "border-emerald-200 dark:border-emerald-800",
  },
  {
    alan: "Eğitim",
    icon: "📚",
    ornekler: [
      "Kişiselleştirilmiş öğrenme platformları",
      "Otomatik ödev değerlendirme",
      "Dil öğrenme uygulamaları (Duolingo)",
      "Akıllı öğretim asistanları",
    ],
    renk: "bg-violet-500",
    renkAcik: "bg-violet-50 dark:bg-violet-900/20",
    renkBorder: "border-violet-200 dark:border-violet-800",
  },
  {
    alan: "Eğlence",
    icon: "🎮",
    ornekler: [
      "Video oyunlarındaki NPC karakterler",
      "Müzik ve film önerileri",
      "Sosyal medya akışı (feed) sıralama",
      "Yüz filtreleri ve efektleri",
    ],
    renk: "bg-pink-500",
    renkAcik: "bg-pink-50 dark:bg-pink-900/20",
    renkBorder: "border-pink-200 dark:border-pink-800",
  },
  {
    alan: "Güvenlik",
    icon: "🔒",
    ornekler: [
      "Yüz tanıma ile telefon açma",
      "Spam ve dolandırıcılık tespiti",
      "Güvenlik kamerası analizi",
      "Siber saldırı önleme",
    ],
    renk: "bg-orange-500",
    renkAcik: "bg-orange-50 dark:bg-orange-900/20",
    renkBorder: "border-orange-200 dark:border-orange-800",
  },
  {
    alan: "Tarım",
    icon: "🌾",
    ornekler: [
      "Bitki hastalığı tespiti",
      "Sulama optimizasyonu",
      "Hasat zamanı tahmini",
      "Drone ile tarla izleme",
    ],
    renk: "bg-lime-600",
    renkAcik: "bg-lime-50 dark:bg-lime-900/20",
    renkBorder: "border-lime-200 dark:border-lime-800",
  },
];

const telefonYzOrnekleri = [
  { ozellik: "Yüz tanıma ile kilit açma", teknoloji: "Bilgisayar görüsü", icon: "📱" },
  { ozellik: "Sesli asistan (Siri, Google)", teknoloji: "Doğal dil işleme + Konuşma tanıma", icon: "🎙️" },
  { ozellik: "Otomatik fotoğraf iyileştirme", teknoloji: "Görüntü işleme", icon: "📸" },
  { ozellik: "Klavye kelime tahmini", teknoloji: "Doğal dil işleme", icon: "⌨️" },
  { ozellik: "Spam arama engelleme", teknoloji: "Makine öğrenimi", icon: "🚫" },
  { ozellik: "Pil kullanım optimizasyonu", teknoloji: "Makine öğrenimi", icon: "🔋" },
];

const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6 dark:bg-emerald-900/20">
      <h2 className="mb-3 text-lg font-bold text-emerald-700 dark:text-emerald-300">
        Neler Öğreneceğiz?
      </h2>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Yapay zekanın günlük hayatta kullanıldığı alanları keşfedeceğiz.</li>
        <li>Telefonumuzdaki YZ uygulamalarını tanımlayabileceğiz.</li>
        <li>Farklı sektörlerde (sağlık, ulaşım, eğitim, tarım) YZ kullanımı örnekleri verebileceğiz.</li>
        <li>YZ uygulamalarının arkasındaki temel teknolojileri anlayacağız.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {[
        "öneri sistemi",
        "bilgisayar görüsü",
        "doğal dil işleme",
        "otonom araç",
        "akıllı ev",
        "chatbot",
      ].map((k) => (
        <span
          key={k}
          className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
        >
          {k}
        </span>
      ))}
    </div>
  </>
);

const SlaytYzHerYerde = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">1. YZ Her Yerde!</h2>
      <p>
        Sabah alarmınız çaldığında, telefonunuz pil durumuna ve
        alışkanlıklarınıza göre en uygun zamanda sizi uyandırmış olabilir.
        Kahvaltıda telefonunuzu açtığınızda size özel haberler gösterilir.
        Okula giderken navigasyon en kısa yolu bulur. Farkında olmasak da
        yapay zeka günlük hayatımızın her anında bizimle birlikte!
      </p>
      <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
        <p className="font-medium text-emerald-800 dark:text-emerald-300">
          🤔 Düşün: Bugün sabahtan beri kaç farklı YZ uygulaması
          kullandın? Saymaya çalış!
        </p>
      </div>

      <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <Image src="/images/bolumler/robot.svg" alt="Sevimli bir yapay zeka robotu" width={280} height={280} className="rounded-lg object-cover shadow-md" />
        <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">Yapay zeka denince aklimiza robotlar gelse de, YZ aslinda hayatimizin her kosesinde!</p>
        <p className="text-xs text-[var(--color-text-secondary)] italic">CC BY-SA 4.0, Giacomo Alessandroni</p>
      </div>
    </section>
  </>
);

const SlaytCebindekiYz = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">
        2. Cebindeki Yapay Zeka
      </h2>
      <p>
        Akıllı telefonlar, içlerinde onlarca YZ teknolojisi barındırır.
        Farkında olmadan her gün bu teknolojileri kullanırız:
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {telefonYzOrnekleri.map((ornek) => (
          <div
            key={ornek.ozellik}
            className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
          >
            <span className="text-2xl">{ornek.icon}</span>
            <div>
              <h4 className="font-bold text-sm">{ornek.ozellik}</h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {ornek.teknoloji}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
      <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">
        💡 Biliyor Muydunuz?
      </h3>
      <p className="text-sm text-amber-800 dark:text-amber-300">
        Ortalama bir akıllı telefon kullanıcısı günde 2.600&apos;den
        fazla kez telefonuna dokunur. Bu etkileşimlerin büyük bir kısmı
        yapay zeka tarafından desteklenir: klavye tahmini, uygulama
        önerileri, bildirim önceliklendirme ve daha fazlası!
      </p>
    </div>
  </>
);

const SlaytYzKullanimAlanlari = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">
        3. YZ Kullanım Alanları
      </h2>
      <p>
        Yapay zeka sadece telefonlarımızda değil, hayatımızın pek çok
        alanında aktif olarak kullanılıyor:
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {yzAlanlari.map((alan) => (
          <div
            key={alan.alan}
            className={`rounded-xl border ${alan.renkBorder} ${alan.renkAcik} p-5`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">{alan.icon}</span>
              <h3 className="font-bold">{alan.alan}</h3>
            </div>
            <ul className="ml-1 space-y-1 text-sm text-[var(--color-text-secondary)]">
              {alan.ornekler.map((ornek) => (
                <li key={ornek} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
                  {ornek}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </>
);

const SlaytOneriSistemleri = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">
        4. Öneri Sistemleri Nasıl Çalışır?
      </h2>
      <p>
        Netflix, YouTube, Spotify gibi platformlar &quot;Sana Özel&quot;
        içerikler sunar. Peki bu nasıl çalışır?
      </p>
      <div className="space-y-3">
        {[
          {
            adim: 1,
            baslik: "Veri Toplama",
            aciklama:
              "Neyi izlediğini, ne kadar izlediğini, neyi beğendiğini, neyi geçtiğini kaydeder.",
          },
          {
            adim: 2,
            baslik: "Örüntü Bulma",
            aciklama:
              "Benzer izleme alışkanlıkları olan kullanıcıları bulur. 'Seni sevenlerin sevdiklerini' keşfeder.",
          },
          {
            adim: 3,
            baslik: "Tahmin Yapma",
            aciklama:
              "Senin henüz izlemediğin ama sevebileceğin içerikleri tahmin eder.",
          },
          {
            adim: 4,
            baslik: "Öneri Sunma",
            aciklama:
              "Ana sayfanda 'Senin için seçtiklerimiz' olarak gösterir.",
          },
        ].map((a) => (
          <div key={a.adim} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
              {a.adim}
            </span>
            <div>
              <h4 className="font-bold">{a.baslik}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {a.aciklama}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

const SlaytSesliAsistanlar = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">
        5. Sesli Asistanlar ve Chatbotlar
      </h2>
      <p>
        Siri, Google Asistan, Alexa gibi sesli asistanlar birden fazla YZ
        teknolojisini bir arada kullanır:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Aşama</th>
              <th className="px-4 py-3 text-left">Teknoloji</th>
              <th className="px-4 py-3 text-left">Ne Yapar?</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "1. Dinleme",
                "Konuşma Tanıma (ASR)",
                "Sesini metne çevirir",
              ],
              [
                "2. Anlama",
                "Doğal Dil İşleme (NLP)",
                "Ne demek istediğini anlar",
              ],
              [
                "3. İşlem",
                "Akıl Yürütme",
                "En iyi yanıtı bulur",
              ],
              [
                "4. Yanıtlama",
                "Konuşma Sentezi (TTS)",
                "Yanıtı sesli olarak söyler",
              ],
            ].map(([asama, teknoloji, neYapar], i) => (
              <tr
                key={asama}
                className={
                  i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""
                }
              >
                <td className="px-4 py-2.5 font-medium">{asama}</td>
                <td className="px-4 py-2.5">{teknoloji}</td>
                <td className="px-4 py-2.5">{neYapar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
        <h3 className="mb-2 font-bold">🚗 Otonom Araçlar</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Tesla, Waymo gibi şirketlerin sürücüsüz araçları kameralar,
          radarlar ve LIDAR sensörleri ile çevreyi algılar. YZ, diğer
          araçları, yayaları ve trafik işaretlerini tanımlayarak aracı
          güvenli bir şekilde sürebilir.
        </p>
        <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <Image src="/images/bolumler/waymo.jpg" alt="Waymo sürücüsüz araç" width={480} height={320} className="rounded-lg object-cover shadow-md" />
          <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">Waymo otonom (surucusuz) araci - yapay zeka ile trafikteki nesneleri algilayarak guvenli suruyor</p>
          <p className="text-xs text-[var(--color-text-secondary)] italic">CC BY-SA 4.0, Dllu</p>
        </div>
      </div>
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
        <h3 className="mb-2 font-bold">🌾 Akıllı Tarım</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Drone&apos;lar tarlaları havadan tarayarak hastalıklı bitkileri
          tespit eder. YZ destekli sulama sistemleri toprağın nem durumuna
          göre su tasarrufu sağlar. Türkiye&apos;de de akıllı tarım
          uygulamaları yaygınlaşmaktadır.
        </p>
      </div>
    </div>
  </>
);

const SlaytEtkinlikler = (
  <>
    <section className="space-y-6">
      <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

      {/* Etkinlik 1 - Unplugged */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
            UNPLUGGED
          </span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            25 dakika &middot; Bireysel + sınıf tartışması
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">
          Etkinlik 1: YZ Haritası
        </h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          A3 kağıda büyük bir harita çizin. Ortaya &quot;BEN&quot; yazın.
          Etrafına gün boyunca karşılaştığınız YZ uygulamalarını
          yerleştirin (ev, okul, yol, alışveriş). Her uygulamanın yanına
          hangi YZ teknolojisini kullandığını yazın.
        </p>
        <div className="rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-900/20">
          <p className="font-medium text-emerald-700 dark:text-emerald-300">
            📋 Malzemeler: A3 kağıt, renkli kalemler, yapıştırıcı notlar
          </p>
        </div>
      </div>

      {/* Etkinlik 2 - Unplugged */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
            UNPLUGGED
          </span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            20 dakika &middot; Grup çalışması (4 kişi)
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">
          Etkinlik 2: YZ veya Değil?
        </h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Kartlardaki cihaz ve uygulamaları &quot;YZ Kullanan&quot; ve
          &quot;YZ Kullanmayan&quot; olarak sınıflandırın. Her kartın neden
          o kategoriye ait olduğunu grubunuzla tartışarak karar verin.
        </p>
        <div className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-900/20">
          <p className="font-medium text-amber-700 dark:text-amber-300">
            ⚠️ Dikkat: Bazı cihazlar/uygulamalar hem YZ kullanan hem de
            kullanmayan versiyonlarda olabilir. Bu durumu tartışmak çok
            değerli!
          </p>
        </div>
      </div>

      {/* Etkinlik 3 - Bilgisayarli */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
            BİLGİSAYARLI
          </span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            30 dakika &middot; Bireysel
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">
          Etkinlik 3: Sesli Asistanla Tanışma
        </h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Telefonunuzdaki sesli asistanı (Google Asistan veya Siri) açın.
          Aşağıdaki görevleri deneyin ve asistanın hangi görevlerde başarılı,
          hangilerinde başarısız olduğunu kaydedin:
        </p>
        <ul className="mb-4 ml-4 list-disc space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li>Bir soru sorun (örn: &quot;Türkiye&apos;nin başkenti neresidir?&quot;)</li>
          <li>Bir alarm kurmasını isteyin</li>
          <li>Bir fıkra anlatmasını isteyin</li>
          <li>Duygusal bir soru sorun (örn: &quot;Bugün mutsuzum, ne yapmalıyım?&quot;)</li>
          <li>Belirsiz bir komut verin (örn: &quot;O şeyi aç&quot;)</li>
        </ul>
        <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
          <p className="font-medium text-sky-700 dark:text-sky-300">
            📝 Sonuçları &quot;Gözlem Formu&quot;na kaydedin ve sınıfta
            karşılaştırın.
          </p>
        </div>
      </div>

      {/* Etkinlik 4 - Bilgisayarli */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
            BİLGİSAYARLI
          </span>
          <span className="text-sm text-[var(--color-text-secondary)]">
            20 dakika &middot; Bireysel
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">
          Etkinlik 4: YZ Röportajı
        </h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Ailenizden birine (anne, baba, büyükanne/büyükbaba) &quot;Yapay
          zeka hakkında ne düşünüyorsunuz?&quot; diye sorun. Cevapları
          kısa bir paragrafta özetleyin. Sınıfta farklı nesillerin YZ
          hakkındaki görüşlerini karşılaştırın.
        </p>
      </div>
    </section>
  </>
);

const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 YZ Eşleştirme Oyunu</h2>
    <p className="text-[var(--color-text-secondary)]">
      Kartları çevir ve yapay zeka uygulamalarını kullanım alanlarıyla eşleştir!
    </p>
    <YzEslestirme />
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
      <h2 className="mb-4 text-2xl font-bold">Video Kaynaklar</h2>
      <div className="space-y-3">
        {[
          {
            baslik: "Yapay Zeka Günlük Hayatımızı Nasıl Etkiliyor?",
            tur: "Tanıtım",
            sure: "~5 dk",
          },
          {
            baslik: "Sesli Asistan Nasıl Çalışır? (Adım Adım)",
            tur: "Uygulama",
            sure: "~7 dk",
          },
          {
            baslik: "Öneri Sistemleri: Netflix Sana Nasıl Film Önerir?",
            tur: "Kavram",
            sure: "~4 dk",
          },
        ].map((video) => (
          <div
            key={video.baslik}
            className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎥</span>
              <div>
                <span className="text-sm font-medium">{video.baslik}</span>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {video.tur} &middot; {video.sure}
                </p>
              </div>
            </div>
            <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Yakın zamanda
            </span>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
      <div className="space-y-3">
        {[
          { ad: "YZ Haritası Çalışma Yaprağı", url: "/indirilebilir/bolum-02-yz-haritasi.html" },
          { ad: "YZ veya Değil? Kart Seti", url: "/indirilebilir/bolum-02-yz-veya-degil-kartlari.html" },
          { ad: "Sesli Asistan Gözlem Formu", url: "/indirilebilir/bolum-02-sesli-asistan-formu.html" },
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

export default function Bolum2() {
  return (
    <BolumSlider
      bolumNo={2}
      bolumBaslik="Günlük Hayatta YZ"
      bolumAltBaslik="Yapay Zeka Etrafımızda"
      seviye="6. Sınıf"
      ders={4}
      renk="from-emerald-600 to-teal-700"
      oncekiBolum={1}
      sonrakiBolum={3}
      slaytlar={[
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "YZ Her Yerde!", icon: "🌍", icerik: SlaytYzHerYerde },
        { baslik: "Cebindeki Yapay Zeka", icon: "📱", icerik: SlaytCebindekiYz },
        { baslik: "YZ Kullanım Alanları", icon: "🌐", icerik: SlaytYzKullanimAlanlari },
        { baslik: "Öneri Sistemleri", icon: "🎬", icerik: SlaytOneriSistemleri },
        { baslik: "Sesli Asistanlar", icon: "🎙️", icerik: SlaytSesliAsistanlar },
        { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
