import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Asagidakilerden hangisi 'veri' icin en dogru tanimdir?",
    secenekler: [
      "Sadece rakamlardan olusan bilgiler",
      "Islenebilir, kaydedilebilir her turlu bilgi parcasi",
      "Sadece bilgisayarda saklanan dosyalar",
      "Internetten indirilen icerikler",
    ],
    dogru: 1,
    aciklama: "Veri sadece rakamlar degildir. Metin, goruntu, ses, video, konum bilgisi ve daha fazlasi veridir.",
  },
  {
    soru: "Bir yapay zeka modelini egitmek icin hangi tur veri KULLANILMAZ?",
    secenekler: [
      "Etiketlenmis fotograflar",
      "Gecmis satis kayitlari",
      "Rastgele uretilmis anlamsiz sayilar",
      "Hasta kayitlari (anonim)",
    ],
    dogru: 2,
    aciklama: "YZ modelleri anlamli, gercek dunya verileriyle egitilir. Rastgele anlamsiz veriler modele bir sey ogretmez.",
  },
  {
    soru: "Asagidakilerden hangisi 'yapisal veri' ornegi DEGILDIR?",
    secenekler: [
      "Bir sinifin not cizelgesi (tablo)",
      "Ogrenci numarasi listesi",
      "Bir ogrencinin yazdigi kompozisyon",
      "Nufus sayim verileri",
    ],
    dogru: 2,
    aciklama: "Kompozisyon serbest metin oldugundan yapisal olmayan (yapisiz) veridir. Tablolar ve listeler yapisal veridir.",
  },
  {
    soru: "Veri toplama surecinde asagidakilerden hangisi etik bir sorun olusturur?",
    secenekler: [
      "Anket ile gonullu veri toplamak",
      "Insanlarin izni olmadan kisisel bilgilerini kaydetmek",
      "Acik kaynak veri setleri kullanmak",
      "Anonim istatistik verileri analiz etmek",
    ],
    dogru: 1,
    aciklama: "Izinsiz kisisel veri toplamak hem etik degil hem de yasalara aykiridir. KVKK bu konuda onemli kurallar icerir.",
  },
  {
    soru: "'Buyuk veri' (big data) kavrami icin hangisi YANLISTIR?",
    secenekler: [
      "Cok buyuk miktarda veri iceri",
      "Geleneksel yontemlerle islenemez",
      "Sadece buyuk sirketler uretir",
      "Hiz, cesitlilik ve hacim ozellikleri vardir",
    ],
    dogru: 2,
    aciklama: "Buyuk veriyi herkes uretir! Her gun sosyal medya paylasimlariniz, mesajlariniz, konum bilgileriniz buyuk verinin parcasidir.",
  },
];

const veriTurleri = [
  { tur: "Metin", icon: "📝", ornekler: "Mesajlar, kitaplar, haberler, yorumlar", renk: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700" },
  { tur: "Sayi", icon: "🔢", ornekler: "Sicaklik, puan, fiyat, nufus", renk: "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700" },
  { tur: "Goruntu", icon: "🖼️", ornekler: "Fotograflar, rontgenler, uydu goruntuleri", renk: "bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700" },
  { tur: "Ses", icon: "🔊", ornekler: "Muzik, konusmalar, dogal sesler", renk: "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700" },
  { tur: "Video", icon: "🎬", ornekler: "Film, guvenlik kamerasi, ders videolari", renk: "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700" },
  { tur: "Konum", icon: "📍", ornekler: "GPS koordinatlari, harita verileri", renk: "bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700" },
];

export default function Bolum3() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-violet-200 hover:text-white">
            &larr; Ana Sayfa
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">📊</div>
            <div>
              <p className="text-sm font-medium text-violet-200">BOLUM 3 &middot; 6. Sinif &middot; 4 ders saati</p>
              <h1 className="text-3xl font-extrabold">Verinin Gucu</h1>
              <p className="text-violet-200">YZ&apos;nin Yakiti</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Kazanimlar */}
        <section className="rounded-2xl border-l-4 border-violet-500 bg-violet-50 p-6 dark:bg-violet-900/20">
          <h2 className="mb-3 text-lg font-bold text-violet-700 dark:text-violet-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Veri kavramini tanimlayabilir, farkli veri turlerini ayirt edebilecegiz.</li>
            <li>Yapisal ve yapisal olmayan veri arasindaki farki anlayacagiz.</li>
            <li>Verinin YZ icin neden onemli oldugunu aciklayabilecegiz.</li>
            <li>Veri toplama, temizleme ve etiketleme sureclerini ogrenecegiz.</li>
            <li>Veri gizliligi ve KVKK konusunda bilinc kazanacagiz.</li>
          </ul>
        </section>

        {/* Anahtar Kavramlar */}
        <div className="flex flex-wrap gap-2">
          {["veri", "veri seti", "yapisal veri", "buyuk veri", "veri etiketleme", "KVKK", "veri gizliligi"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        {/* Veri Nedir */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Veri Nedir?</h2>
          <p>
            Veri, islenebilir ve kaydedilebilir her turlu bilgi parcasidir. Bir sinifin
            boy olculeri, hava durumu kayitlari, telefonundaki fotograflar, dinledigin
            sarkilar... hepsi birer veridir!
          </p>
          <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
            <p className="font-medium text-violet-800 dark:text-violet-300">
              🤔 Dusun: Bugun okula gelene kadar kac farkli veri urettin? Alarmin calma saati,
              kahvaltida yediklerin, adim sayisi, gonderdigin mesajlar...
            </p>
          </div>
        </section>

        {/* Veri Turleri */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Veri Turleri</h2>
          <p>Veri pek cok farkli formatta olabilir:</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {veriTurleri.map((v) => (
              <div key={v.tur} className={`rounded-xl border p-4 ${v.renk}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="font-bold">{v.tur} Verisi</h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{v.ornekler}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yapisal vs Yapisiz */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Yapisal ve Yapisal Olmayan Veri</h2>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-violet-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Ozellik</th>
                  <th className="px-4 py-3 text-left">Yapisal Veri</th>
                  <th className="px-4 py-3 text-left">Yapisal Olmayan Veri</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Biçim", "Tablo, satir, sutun", "Serbest format"],
                  ["Ornek", "Excel tablosu, veritabani", "E-posta, fotograf, video"],
                  ["Aranabilirlik", "Kolay aranir", "Zor aranir"],
                  ["YZ icin", "Dogrudan kullanilabilir", "Once islenmesi gerekir"],
                  ["Miktar", "~%20 tum veriler", "~%80 tum veriler"],
                ].map(([ozellik, yapisal, yapisiz], i) => (
                  <tr key={ozellik} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 font-medium">{ozellik}</td>
                    <td className="px-4 py-2.5">{yapisal}</td>
                    <td className="px-4 py-2.5">{yapisiz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
            <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">💡 Biliyor Muydunuz?</h3>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Dunyadaki verilerin %80&apos;den fazlasi yapisal olmayan veridir!
              Fotograflar, videolar, sesler ve metinler bu kategoriye girer.
              YZ&apos;nin bu verileri anlamlandirilabilmesi icin ozel teknikler gerekir.
            </p>
          </div>
        </section>

        {/* Veri YZ iliskisi */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. Veri Neden YZ icin Onemlidir?</h2>
          <p>
            Yapay zeka, veri olmadan ogrenemez. Nasil ki bir ogrenci kitap okumadan
            sinava hazirlanamiyorsa, YZ de veri olmadan gorevlerini yerine getiremez.
          </p>
          <div className="space-y-3">
            {[
              { baslik: "Daha Cok Veri = Daha Iyi Sonuc", aciklama: "1.000 kedi fotografi ile egitilen model ile 1.000.000 fotograf ile egitilen model arasinda buyuk fark vardir.", icon: "📈" },
              { baslik: "Kaliteli Veri = Dogru Sonuc", aciklama: "Bulanik, yanlis etiketlenmis veya hatali veriler yanlis sonuclara yol acar. 'Cop girer, cop cikar' (GIGO) prensibi.", icon: "✅" },
              { baslik: "Cesitli Veri = Adil Sonuc", aciklama: "Sadece belirli bir grubun verisiyle egitilen model, diger gruplar icin yanlis sonuc verebilir (onyargi/bias).", icon: "🌍" },
            ].map((madde) => (
              <div key={madde.baslik} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-3xl">{madde.icon}</span>
                <div>
                  <h4 className="font-bold">{madde.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{madde.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Veri Hazirlama */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">5. Veri Hazirlama Sureci</h2>
          <p>YZ icin veri kullanilmadan once bir hazirlama surecinden gecer:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "Toplama", aciklama: "Veriler farkli kaynaklardan toplanir: anketler, sensorler, internet, veritabanlari.", renk: "bg-blue-600" },
              { adim: 2, baslik: "Temizleme", aciklama: "Hatali, eksik veya tekrarlayan veriler ayiklanir. En cok zaman alan adimdir!", renk: "bg-orange-600" },
              { adim: 3, baslik: "Etiketleme", aciklama: "Veriler kategorize edilir. Ornegin: bu fotograf 'kedi', bu 'kopek'.", renk: "bg-emerald-600" },
              { adim: 4, baslik: "Bolme", aciklama: "Veri seti ikiye ayrilir: egitim seti (%80) ve test seti (%20).", renk: "bg-violet-600" },
              { adim: 5, baslik: "Kullanma", aciklama: "Hazir veri YZ modeline verilir. Model bu verilerden ogrenir.", renk: "bg-pink-600" },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${a.renk}`}>
                  {a.adim}
                </span>
                <div>
                  <h4 className="font-bold">{a.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buyuk Veri */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">6. Buyuk Veri (Big Data)</h2>
          <p>Her gun uretilen veri miktari inanilmaz boyutlara ulasmistir:</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { baslik: "Hacim (Volume)", deger: "2.5 Quintilyon bayt", aciklama: "Her gun uretilen veri", icon: "📦" },
              { baslik: "Hiz (Velocity)", deger: "500 milyon tweet/gun", aciklama: "Verinin uretilme hizi", icon: "⚡" },
              { baslik: "Cesitlilik (Variety)", deger: "Metin+ses+goruntu+...", aciklama: "Farkli veri tipleri", icon: "🌈" },
            ].map((v) => (
              <div key={v.baslik} className="rounded-xl border border-violet-200 bg-violet-50 p-5 text-center dark:border-violet-800 dark:bg-violet-900/20">
                <span className="text-3xl">{v.icon}</span>
                <h4 className="mt-2 font-bold text-violet-700 dark:text-violet-300">{v.baslik}</h4>
                <p className="text-lg font-extrabold">{v.deger}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KVKK ve Gizlilik */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">7. Veri Gizliligi ve KVKK</h2>
          <p>
            Veri cok guclu bir aractir ama dikkatli kullanilmalidir.
            Turkiye&apos;de kisisel verilerin korunmasi icin <strong>KVKK</strong> (Kisisel
            Verilerin Korunmasi Kanunu) yururluktedir.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">✅ Dogru Kullanim</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Izin alarak veri toplamak</li>
                <li>&#8226; Verileri guvenli saklamak</li>
                <li>&#8226; Sadece belirtilen amac icin kullanmak</li>
                <li>&#8226; Istendigi zaman silmek</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">❌ Yanlis Kullanim</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Izinsiz kisisel bilgi toplamak</li>
                <li>&#8226; Verileri ucuncu kisilerle paylastirmak</li>
                <li>&#8226; Farkli amaclar icin kullanmak</li>
                <li>&#8226; Guvensiz ortamda saklamak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Etkinlikler */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Girdi Avcilari</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Bilgi kartlarindaki ifadeleri &quot;Dogru Veri&quot;, &quot;Yanlis Veri&quot;
              ve &quot;Oznel Veri&quot; olarak siniflandirin. Her kartin neden o kategoriye
              ait oldugunu grubunuzla tartisarak karar verin.
            </p>
            <div className="rounded-lg bg-violet-50 p-3 text-sm dark:bg-violet-900/20">
              <p className="font-medium text-violet-700 dark:text-violet-300">
                📋 Malzemeler: 20 adet bilgi karti (basili), siniflandirma panosu
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Sinif calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Sinif Anketi</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Sinifca bir anket yapin (favori renk, boy, ayak numarasi, sevilen ders).
              Sonuclari tahtada tabloya yazin. Bu verileri grafige donusturun. Hangi veri
              yapisal, hangisi yapisal olmayan? Hangi sonuclar surpriz oldu?
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Veri Seti Kesfedici</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Google Dataset Search veya Kaggle&apos;da bir veri seti bulun. Veri setini
              inceleyin: kac satir var? Hangi sutunlar var? Veri turleri neler? Bulgularinizi
              sinifla paylasin.
            </p>
            <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
              <p className="font-medium text-sky-700 dark:text-sky-300">
                🔗 datasetsearch.research.google.com veya kaggle.com/datasets
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 4: Veri Etiketleme Atolyesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              20 hayvan fotografini &quot;kedi&quot; ve &quot;kopek&quot; olarak etiketleyin.
              Zor olan durumlar var mi? Bir fotografta hem kedi hem kopek varsa ne yaparsiniz?
              Etiketlemenin ne kadar onemli ve zaman alici oldugunu deneyimleyin.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <InteraktifQuiz sorular={quizSorulari} />

        {/* Indirilebilir */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {[
              "Girdi Avcilari Bilgi Kartlari (PDF)",
              "Sinif Anketi Formu (PDF)",
              "Veri Seti Inceleme Formu (PDF)",
              "Degerlendirme Testi (PDF)",
              "Oz Degerlendirme Formu (PDF)",
            ].map((dosya) => (
              <div key={dosya} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{dosya}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigasyon */}
        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/2" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">
            &larr; Bolum 2
          </Link>
          <Link href="/bolumler/4" className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700">
            Bolum 4 &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
