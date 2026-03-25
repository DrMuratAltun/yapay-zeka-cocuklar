import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Asagidakilerden hangisi yapay zekanin gunluk hayattaki bir uygulamasi DEGILDIR?",
    secenekler: [
      "Telefonun yuz tanima ile acilmasi",
      "Elektrik supurgesinin dugmeyle acilmasi",
      "Netflix'in film onerisi yapmasi",
      "Google Haritalar'in trafik tahmini vermesi",
    ],
    dogru: 1,
    aciklama:
      "Dugmeyle calisan bir elektrik supurgesi basit bir mekanik cihazdir, yapay zeka icermez. Ancak robot supurgeler YZ kullanir!",
  },
  {
    soru: "Bir sesli asistanin (Siri, Google Asistan) calismasi icin hangi YZ teknolojileri gerekir?",
    secenekler: [
      "Sadece ses tanima",
      "Ses tanima + dogal dil isleme + konusma sentezi",
      "Sadece internet baglantisi",
      "Sadece mikrofon",
    ],
    dogru: 1,
    aciklama:
      "Sesli asistanlar birden fazla YZ teknolojisini bir arada kullanir: sesinizi tanir, ne dediginizi anlar ve size yanitlar uretir.",
  },
  {
    soru: "Spotify veya YouTube'un 'Sana Ozel' oynatma listeleri hangi YZ yontemiyle olusturulur?",
    secenekler: [
      "Rastgele secim",
      "Oneri sistemi (tavsiye algoritmalari)",
      "Alfabetik siralama",
      "En yeni sarkilari gosterme",
    ],
    dogru: 1,
    aciklama:
      "Oneri sistemleri, dinleme/izleme aliskanliklarina bakarak sevebilecegin yeni icerikleri tahmin eder.",
  },
  {
    soru: "Akilli ev sistemlerinde yapay zeka ne ise yarar?",
    secenekler: [
      "Sadece isiklari acip kapatir",
      "Aliskanliklarinizi ogrenerek enerji tasarrufu saglar",
      "Sadece uzaktan kumanda gorevi gorur",
      "Internete baglanmayi saglar",
    ],
    dogru: 1,
    aciklama:
      "Akilli ev sistemleri YZ sayesinde aliskanliklarinizi ogrenir: ne zaman eve geldiginizi, hangi sicakligi tercih ettiginizi bilir.",
  },
  {
    soru: "Asagidaki YZ uygulamalarindan hangisi saglik alaninda kullanilir?",
    secenekler: [
      "Spam mail filtreleme",
      "Rontgen ve MR goruntulerinde hastalik tespiti",
      "Sosyal medya filtreleri",
      "Online oyunlardaki NPC karakterler",
    ],
    dogru: 1,
    aciklama:
      "YZ, tibbi goruntuleri analiz ederek doktorlara teshis konusunda yardimci olur. Bu alan 'tibbi yapay zeka' olarak adlandirilir.",
  },
];

const yzAlanlari = [
  {
    alan: "Ulasim",
    icon: "🚗",
    ornekler: [
      "Otonom (surucusuz) araclar",
      "Trafik yonetim sistemleri",
      "Navigasyon ve rota optimizasyonu",
      "Park yeri bulma uygulamalari",
    ],
    renk: "bg-blue-500",
    renkAcik: "bg-blue-50 dark:bg-blue-900/20",
    renkBorder: "border-blue-200 dark:border-blue-800",
  },
  {
    alan: "Saglik",
    icon: "🏥",
    ornekler: [
      "Tibbi goruntu analizi (rontgen, MR)",
      "Ilac gelistirme",
      "Saglik izleme (akilli saatler)",
      "Hastalik riski tahmini",
    ],
    renk: "bg-emerald-500",
    renkAcik: "bg-emerald-50 dark:bg-emerald-900/20",
    renkBorder: "border-emerald-200 dark:border-emerald-800",
  },
  {
    alan: "Egitim",
    icon: "📚",
    ornekler: [
      "Kisisellestirilmis ogrenme platformlari",
      "Otomatik odev degerlendirme",
      "Dil ogrenme uygulamalari (Duolingo)",
      "Akilli ogretim asistanlari",
    ],
    renk: "bg-violet-500",
    renkAcik: "bg-violet-50 dark:bg-violet-900/20",
    renkBorder: "border-violet-200 dark:border-violet-800",
  },
  {
    alan: "Eglence",
    icon: "🎮",
    ornekler: [
      "Video oyunlarindaki NPC karakterler",
      "Muzik ve film onerileri",
      "Sosyal medya akisi (feed) siralama",
      "Yuz filtreleri ve efektleri",
    ],
    renk: "bg-pink-500",
    renkAcik: "bg-pink-50 dark:bg-pink-900/20",
    renkBorder: "border-pink-200 dark:border-pink-800",
  },
  {
    alan: "Guvenlik",
    icon: "🔒",
    ornekler: [
      "Yuz tanima ile telefon acma",
      "Spam ve dolandiricilik tespiti",
      "Guvenlik kamerasi analizi",
      "Siber saldiri onleme",
    ],
    renk: "bg-orange-500",
    renkAcik: "bg-orange-50 dark:bg-orange-900/20",
    renkBorder: "border-orange-200 dark:border-orange-800",
  },
  {
    alan: "Tarim",
    icon: "🌾",
    ornekler: [
      "Bitki hastaligi tespiti",
      "Sulama optimizasyonu",
      "Hasat zamani tahmini",
      "Drone ile tarla izleme",
    ],
    renk: "bg-lime-600",
    renkAcik: "bg-lime-50 dark:bg-lime-900/20",
    renkBorder: "border-lime-200 dark:border-lime-800",
  },
];

const telefonYzOrnekleri = [
  { ozellik: "Yuz tanima ile kilit acma", teknoloji: "Bilgisayar gorusu", icon: "📱" },
  { ozellik: "Sesli asistan (Siri, Google)", teknoloji: "Dogal dil isleme + Konusma tanima", icon: "🎙️" },
  { ozellik: "Otomatik fotoraf iyilestirme", teknoloji: "Goruntu isleme", icon: "📸" },
  { ozellik: "Klavye kelime tahmini", teknoloji: "Dogal dil isleme", icon: "⌨️" },
  { ozellik: "Spam arama engelleme", teknoloji: "Makine ogrenimi", icon: "🚫" },
  { ozellik: "Pil kullanim optimizasyonu", teknoloji: "Makine ogrenimi", icon: "🔋" },
];

export default function Bolum2() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-emerald-200 hover:text-white"
          >
            &larr; Ana Sayfa
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
              🏠
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-200">
                BOLUM 2 &middot; 6. Sinif &middot; 4 ders saati
              </p>
              <h1 className="text-3xl font-extrabold">Gunluk Hayatta YZ</h1>
              <p className="text-emerald-200">Yapay Zeka Etrafimizda</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Kazanimlar */}
        <section className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6 dark:bg-emerald-900/20">
          <h2 className="mb-3 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            Neler Ogrenecegiz?
          </h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Yapay zekanin gunluk hayatta kullanildigi alanlari kesfedecegiz.</li>
            <li>Telefonumuzdaki YZ uygulamalarini tanimlayabilecegiz.</li>
            <li>Farkli sektorlerde (saglik, ulasim, egitim, tarim) YZ kullanimi ornekleri verebilecegiz.</li>
            <li>YZ uygulamalarinin arkasindaki temel teknolojileri anlayacagiz.</li>
          </ul>
        </section>

        {/* Anahtar Kavramlar */}
        <div className="flex flex-wrap gap-2">
          {[
            "oneri sistemi",
            "bilgisayar gorusu",
            "dogal dil isleme",
            "otonom arac",
            "akilli ev",
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

        {/* Giris */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. YZ Her Yerde!</h2>
          <p>
            Sabah alarminiz caldiginda, telefonunuz pil durumuna ve
            aliskanliklariniza gore en uygun zamanda sizi uyandirmis olabilir.
            Kahvaltida telefonunuzu actiginizda size ozel haberler gosterilir.
            Okula giderken navigasyon en kisa yolu bulur. Farkinda olmasak da
            yapay zeka gunluk hayatimizin her aninda bizimle birlikte!
          </p>
          <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <p className="font-medium text-emerald-800 dark:text-emerald-300">
              🤔 Dusun: Bugun sabahtan beri kac farkli YZ uygulamasi
              kullandin? Saymaya calis!
            </p>
          </div>
        </section>

        {/* Telefondaki YZ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">
            2. Cebindeki Yapay Zeka
          </h2>
          <p>
            Akilli telefonlar, iclerinde onlarca YZ teknolojisi barindirir.
            Farkinda olmadan her gun bu teknolojileri kullaniriz:
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

        {/* Biliyor Muydunuz */}
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
          <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">
            💡 Biliyor Muydunuz?
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Ortalama bir akilli telefon kullanicisi gunde 2.600&apos;den
            fazla kez telefonuna dokunur. Bu etkilesimlerin buyuk bir kismi
            yapay zeka tarafindan desteklenir: klavye tahmini, uygulama
            onerileri, bildirim onceliklendirme ve daha fazlasi!
          </p>
        </div>

        {/* YZ Kullanim Alanlari */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">
            3. YZ Kullanim Alanlari
          </h2>
          <p>
            Yapay zeka sadece telefonlarimizda degil, hayatimizin pek cok
            alaninda aktif olarak kullaniliyor:
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

        {/* Oneri Sistemleri */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">
            4. Oneri Sistemleri Nasil Calisir?
          </h2>
          <p>
            Netflix, YouTube, Spotify gibi platformlar &quot;Sana Ozel&quot;
            icerikler sunar. Peki bu nasil calisir?
          </p>
          <div className="space-y-3">
            {[
              {
                adim: 1,
                baslik: "Veri Toplama",
                aciklama:
                  "Neyi izledigini, ne kadar izledigini, neyi begendik, neyi gectigini kaydeder.",
              },
              {
                adim: 2,
                baslik: "Oruntu Bulma",
                aciklama:
                  "Benzer izleme aliskanliklarini olan kullanicilari bulur. 'Seni sevenlerin sevdiklerini' kesfeder.",
              },
              {
                adim: 3,
                baslik: "Tahmin Yapma",
                aciklama:
                  "Senin henuz izlemedigin ama sevebilecegin icerikleri tahmin eder.",
              },
              {
                adim: 4,
                baslik: "Oneri Sunma",
                aciklama:
                  "Ana sayfanda 'Senin icin sectiklarimiz' olarak gosterir.",
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

        {/* Sesli Asistanlar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">
            5. Sesli Asistanlar ve Chatbotlar
          </h2>
          <p>
            Siri, Google Asistan, Alexa gibi sesli asistanlar birden fazla YZ
            teknolojisini bir arada kullanir:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Asama</th>
                  <th className="px-4 py-3 text-left">Teknoloji</th>
                  <th className="px-4 py-3 text-left">Ne Yapar?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "1. Dinleme",
                    "Konusma Tanima (ASR)",
                    "Sesini metne cevirir",
                  ],
                  [
                    "2. Anlama",
                    "Dogal Dil Isleme (NLP)",
                    "Ne demek istedigini anlar",
                  ],
                  [
                    "3. Islem",
                    "Akil Yurume",
                    "En iyi yaniti bulur",
                  ],
                  [
                    "4. Yanitlama",
                    "Konusma Sentezi (TTS)",
                    "Yaniti sesli olarak soyler",
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

        {/* Biliyor muydunuz 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
            <h3 className="mb-2 font-bold">🚗 Otonom Araclar</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Tesla, Waymo gibi sirketlerin surucusuz araclari kameralar,
              radarlar ve LIDAR sensorleri ile cevreyi algilar. YZ, diger
              araclari, yayalari ve trafik isaretlerini tanimlayarak araci
              guvenli bir sekilde surebilir.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-900/20">
            <h3 className="mb-2 font-bold">🌾 Akilli Tarim</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Drone&apos;lar tarlalari havadan tararak hastalıklı bitkileri
              tespit eder. YZ destekli sulama sistemleri toprağın nem durumuna
              gore su tasarrufu saglar. Turkiye&apos;de de akilli tarim
              uygulamalari yayginlasmaktadir.
            </p>
          </div>
        </div>

        {/* Etkinlikler */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          {/* Etkinlik 1 - Unplugged */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
                UNPLUGGED
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                25 dakika &middot; Bireysel + sinif tartismasi
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 1: YZ Haritasi
            </h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              A3 kagida buyuk bir harita cizin. Ortaya &quot;BEN&quot; yazin.
              Etrafina gun boyunca karsilastiginiz YZ uygulamalarini
              yerlestirin (ev, okul, yol, alisveris). Her uygulamanin yanina
              hangi YZ teknolojisini kullandigini yazin.
            </p>
            <div className="rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-900/20">
              <p className="font-medium text-emerald-700 dark:text-emerald-300">
                📋 Malzemeler: A3 kagit, renkli kalemler, yapistirici notlar
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
                20 dakika &middot; Grup calismasi (4 kisi)
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 2: YZ veya Degil?
            </h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Kartlardaki cihaz ve uygulamalari &quot;YZ Kullanan&quot; ve
              &quot;YZ Kullanmayan&quot; olarak siniflandirin. Her kartin neden
              o kategoriye ait oldugunu grubunuzla tartisarak karar verin.
            </p>
            <div className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-900/20">
              <p className="font-medium text-amber-700 dark:text-amber-300">
                ⚠️ Dikkat: Bazi cihazlar/uygulamalar hem YZ kullanan hem de
                kullanmayan versiyonlarda olabilir. Bu durumu tartismak cok
                degerli!
              </p>
            </div>
          </div>

          {/* Etkinlik 3 - Bilgisayarli */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                BILGISAYARLI
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                30 dakika &middot; Bireysel
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 3: Sesli Asistanla Tanisma
            </h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Telefonunuzdaki sesli asistani (Google Asistan veya Siri) acin.
              Asagidaki gorevleri deneyin ve asistanin hangi gorevlerde basarili,
              hangilerinde basarisiz oldugunu kaydedin:
            </p>
            <ul className="mb-4 ml-4 list-disc space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>Bir soru sorun (orn: &quot;Turkiye&apos;nin baskenti neresidir?&quot;)</li>
              <li>Bir alarm kurmesini isteyin</li>
              <li>Bir fikra anlatmasini isteyin</li>
              <li>Duygusal bir soru sorun (orn: &quot;Bugun mutsuzum, ne yapmaliyim?&quot;)</li>
              <li>Belirsiz bir komut verin (orn: &quot;O seyi ac&quot;)</li>
            </ul>
            <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
              <p className="font-medium text-sky-700 dark:text-sky-300">
                📝 Sonuclari &quot;Gozlem Formu&quot;na kaydedin ve sinifta
                karsilastirin.
              </p>
            </div>
          </div>

          {/* Etkinlik 4 - Bilgisayarli */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                BILGISAYARLI
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                20 dakika &middot; Bireysel
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold">
              Etkinlik 4: YZ Roportaji
            </h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Ailenizden birine (anne, baba, buyukanne/buyukbaba) &quot;Yapay
              zeka hakkinda ne dusunuyorsunuz?&quot; diye sorun. Cevaplari
              kisa bir paragrafta ozetleyin. Sinifta farkli nesillerin YZ
              hakkindaki goruslerini karsilastirin.
            </p>
          </div>
        </section>

        {/* Video */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Video Kaynaklar</h2>
          <div className="space-y-3">
            {[
              {
                baslik: "Yapay Zeka Gunluk Hayatimizi Nasil Etkiliyor?",
                tur: "Tanitim",
                sure: "~5 dk",
              },
              {
                baslik: "Sesli Asistan Nasil Calisir? (Adim Adim)",
                tur: "Uygulama",
                sure: "~7 dk",
              },
              {
                baslik: "Oneri Sistemleri: Netflix Sana Nasil Film Oner?",
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
                  Yakin zamanda
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <InteraktifQuiz sorular={quizSorulari} />

        {/* Indirilebilir */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {[
              "YZ Haritasi Calisma Yapragi (PDF)",
              "YZ veya Degil? Kart Seti (PDF)",
              "Sesli Asistan Gozlem Formu (PDF)",
              "Degerlendirme Testi (PDF)",
              "Oz Degerlendirme Formu (PDF)",
            ].map((dosya) => (
              <div
                key={dosya}
                className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3"
              >
                <span className="text-sm font-medium">{dosya}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Yakin zamanda
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigasyon */}
        <div className="flex items-center justify-between pt-6">
          <Link
            href="/bolumler/1"
            className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]"
          >
            &larr; Bolum 1
          </Link>
          <Link
            href="/bolumler/3"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Bolum 3 &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
