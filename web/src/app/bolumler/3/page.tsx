import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import VeriTuruAvcisi from "@/components/oyunlar/VeriTuruAvcisi";

const quizSorulari = [
  {
    soru: "Aşağıdakilerden hangisi 'veri' için en doğru tanımdır?",
    secenekler: [
      "Sadece rakamlardan oluşan bilgiler",
      "İşlenebilir, kaydedilebilir her türlü bilgi parçası",
      "Sadece bilgisayarda saklanan dosyalar",
      "İnternetten indirilen içerikler",
    ],
    dogru: 1,
    aciklama: "Veri sadece rakamlar değildir. Metin, görüntü, ses, video, konum bilgisi ve daha fazlası veridir.",
  },
  {
    soru: "Bir yapay zeka modelini eğitmek için hangi tür veri KULLANILMAZ?",
    secenekler: [
      "Etiketlenmiş fotoğraflar",
      "Geçmiş satış kayıtları",
      "Rastgele üretilmiş anlamsız sayılar",
      "Hasta kayıtları (anonim)",
    ],
    dogru: 2,
    aciklama: "YZ modelleri anlamlı, gerçek dünya verileriyle eğitilir. Rastgele anlamsız veriler modele bir şey öğretmez.",
  },
  {
    soru: "Aşağıdakilerden hangisi 'yapısal veri' örneği DEĞİLDİR?",
    secenekler: [
      "Bir sınıfın not çizelgesi (tablo)",
      "Öğrenci numarası listesi",
      "Bir öğrencinin yazdığı kompozisyon",
      "Nüfus sayım verileri",
    ],
    dogru: 2,
    aciklama: "Kompozisyon serbest metin olduğundan yapısal olmayan (yapısız) veridir. Tablolar ve listeler yapısal veridir.",
  },
  {
    soru: "Veri toplama sürecinde aşağıdakilerden hangisi etik bir sorun oluşturur?",
    secenekler: [
      "Anket ile gönüllü veri toplamak",
      "İnsanların izni olmadan kişisel bilgilerini kaydetmek",
      "Açık kaynak veri setleri kullanmak",
      "Anonim istatistik verileri analiz etmek",
    ],
    dogru: 1,
    aciklama: "İzinsiz kişisel veri toplamak hem etik değil hem de yasalara aykırıdır. KVKK bu konuda önemli kurallar içerir.",
  },
  {
    soru: "'Büyük veri' (big data) kavramı için hangisi YANLIŞDIR?",
    secenekler: [
      "Çok büyük miktarda veri içerir",
      "Geleneksel yöntemlerle işlenemez",
      "Sadece büyük şirketler üretir",
      "Hız, çeşitlilik ve hacim özellikleri vardır",
    ],
    dogru: 2,
    aciklama: "Büyük veriyi herkes üretir! Her gün sosyal medya paylaşımlarınız, mesajlarınız, konum bilgileriniz büyük verinin parçasıdır.",
  },
];

const veriTurleri = [
  { tur: "Metin", icon: "📝", ornekler: "Mesajlar, kitaplar, haberler, yorumlar", renk: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700" },
  { tur: "Sayı", icon: "🔢", ornekler: "Sıcaklık, puan, fiyat, nüfus", renk: "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700" },
  { tur: "Görüntü", icon: "🖼️", ornekler: "Fotoğraflar, röntgenler, uydu görüntüleri", renk: "bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700" },
  { tur: "Ses", icon: "🔊", ornekler: "Müzik, konuşmalar, doğal sesler", renk: "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700" },
  { tur: "Video", icon: "🎬", ornekler: "Film, güvenlik kamerası, ders videoları", renk: "bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700" },
  { tur: "Konum", icon: "📍", ornekler: "GPS koordinatları, harita verileri", renk: "bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700" },
];

const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-violet-500 bg-violet-50 p-6 dark:bg-violet-900/20">
      <h2 className="mb-3 text-lg font-bold text-violet-700 dark:text-violet-300">Neler Öğreneceğiz?</h2>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Veri kavramını tanımlayabilir, farklı veri türlerini ayırt edebileceğiz.</li>
        <li>Yapısal ve yapısal olmayan veri arasındaki farkı anlayacağız.</li>
        <li>Verinin YZ için neden önemli olduğunu açıklayabileceğiz.</li>
        <li>Veri toplama, temizleme ve etiketleme süreçlerini öğreneceğiz.</li>
        <li>Veri gizliliği ve KVKK konusunda bilinç kazanacağız.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["veri", "veri seti", "yapısal veri", "büyük veri", "veri etiketleme", "KVKK", "veri gizliliği"].map((k) => (
        <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
      ))}
    </div>
  </>
);

const SlaytKonuAnlatimi = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">1. Veri Nedir?</h2>
      <p>
        Veri, işlenebilir ve kaydedilebilir her türlü bilgi parçasıdır. Bir sınıfın
        boy ölçüleri, hava durumu kayıtları, telefonundaki fotoğraflar, dinlediğin
        şarkılar... hepsi birer veridir!
      </p>
      <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
        <p className="font-medium text-violet-800 dark:text-violet-300">
          🤔 Düşün: Bugün okula gelene kadar kaç farklı veri ürettin? Alarmın çalma saati,
          kahvaltıda yediklerin, adım sayısı, gönderdiğin mesajlar...
        </p>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">2. Veri Türleri</h2>
      <p>Veri pek çok farklı formatta olabilir:</p>
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

    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">3. Yapısal ve Yapısal Olmayan Veri</h2>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Özellik</th>
              <th className="px-4 py-3 text-left">Yapısal Veri</th>
              <th className="px-4 py-3 text-left">Yapısal Olmayan Veri</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Biçim", "Tablo, satır, sütun", "Serbest format"],
              ["Örnek", "Excel tablosu, veritabanı", "E-posta, fotoğraf, video"],
              ["Aranabilirlik", "Kolay aranır", "Zor aranır"],
              ["YZ için", "Doğrudan kullanılabilir", "Önce işlenmesi gerekir"],
              ["Miktar", "~%20 tüm veriler", "~%80 tüm veriler"],
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
          Dünyadaki verilerin %80&apos;den fazlası yapısal olmayan veridir!
          Fotoğraflar, videolar, sesler ve metinler bu kategoriye girer.
          YZ&apos;nin bu verileri anlamlandırılabilmesi için özel teknikler gerekir.
        </p>
      </div>
    </section>
  </>
);

const SlaytVeriYzIliskisi = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">4. Veri Neden YZ için Önemlidir?</h2>
      <p>
        Yapay zeka, veri olmadan öğrenemez. Nasıl ki bir öğrenci kitap okumadan
        sınava hazırlanamıyorsa, YZ de veri olmadan görevlerini yerine getiremez.
      </p>
      <div className="space-y-3">
        {[
          { baslik: "Daha Çok Veri = Daha İyi Sonuç", aciklama: "1.000 kedi fotoğrafı ile eğitilen model ile 1.000.000 fotoğraf ile eğitilen model arasında büyük fark vardır.", icon: "📈" },
          { baslik: "Kaliteli Veri = Doğru Sonuç", aciklama: "Bulanık, yanlış etiketlenmiş veya hatalı veriler yanlış sonuçlara yol açar. 'Çöp girer, çöp çıkar' (GIGO) prensibi.", icon: "✅" },
          { baslik: "Çeşitli Veri = Adil Sonuç", aciklama: "Sadece belirli bir grubun verisiyle eğitilen model, diğer gruplar için yanlış sonuç verebilir (önyargı/bias).", icon: "🌍" },
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

    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">5. Veri Hazırlama Süreci</h2>
      <p>YZ için veri kullanılmadan önce bir hazırlama sürecinden geçer:</p>
      <div className="space-y-3">
        {[
          { adim: 1, baslik: "Toplama", aciklama: "Veriler farklı kaynaklardan toplanır: anketler, sensörler, internet, veritabanları.", renk: "bg-blue-600" },
          { adim: 2, baslik: "Temizleme", aciklama: "Hatalı, eksik veya tekrarlayan veriler ayıklanır. En çok zaman alan adımdır!", renk: "bg-orange-600" },
          { adim: 3, baslik: "Etiketleme", aciklama: "Veriler kategorize edilir. Örneğin: bu fotoğraf 'kedi', bu 'köpek'.", renk: "bg-emerald-600" },
          { adim: 4, baslik: "Bölme", aciklama: "Veri seti ikiye ayrılır: eğitim seti (%80) ve test seti (%20).", renk: "bg-violet-600" },
          { adim: 5, baslik: "Kullanma", aciklama: "Hazır veri YZ modeline verilir. Model bu verilerden öğrenir.", renk: "bg-pink-600" },
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
  </>
);

const SlaytBuyukVeriGizlilik = (
  <>
    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">6. Büyük Veri (Big Data)</h2>
      <p>Her gün üretilen veri miktarı inanılmaz boyutlara ulaşmıştır:</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { baslik: "Hacim (Volume)", deger: "2.5 Quintilyon bayt", aciklama: "Her gün üretilen veri", icon: "📦" },
          { baslik: "Hız (Velocity)", deger: "500 milyon tweet/gün", aciklama: "Verinin üretilme hızı", icon: "⚡" },
          { baslik: "Çeşitlilik (Variety)", deger: "Metin+ses+görüntü+...", aciklama: "Farklı veri tipleri", icon: "🌈" },
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

    <section className="space-y-4">
      <h2 className="text-2xl font-extrabold">7. Veri Gizliliği ve KVKK</h2>
      <p>
        Veri çok güçlü bir araçtır ama dikkatli kullanılmalıdır.
        Türkiye&apos;de kişisel verilerin korunması için <strong>KVKK</strong> (Kişisel
        Verilerin Korunması Kanunu) yürürlüktedir.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
          <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">✅ Doğru Kullanım</h3>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>&#8226; İzin alarak veri toplamak</li>
            <li>&#8226; Verileri güvenli saklamak</li>
            <li>&#8226; Sadece belirtilen amaç için kullanmak</li>
            <li>&#8226; İstendiği zaman silmek</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
          <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">❌ Yanlış Kullanım</h3>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>&#8226; İzinsiz kişisel bilgi toplamak</li>
            <li>&#8226; Verileri üçüncü kişilerle paylaştırmak</li>
            <li>&#8226; Farklı amaçlar için kullanmak</li>
            <li>&#8226; Güvensiz ortamda saklamak</li>
          </ul>
        </div>
      </div>
    </section>
  </>
);

const SlaytEtkinlikler = (
  <>
    <section className="space-y-6">
      <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
          <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup çalışması</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Girdi Avcıları</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Bilgi kartlarındaki ifadeleri &quot;Doğru Veri&quot;, &quot;Yanlış Veri&quot;
          ve &quot;Öznel Veri&quot; olarak sınıflandırın. Her kartın neden o kategoriye
          ait olduğunu grubunuzla tartışarak karar verin.
        </p>
        <div className="rounded-lg bg-violet-50 p-3 text-sm dark:bg-violet-900/20">
          <p className="font-medium text-violet-700 dark:text-violet-300">
            📋 Malzemeler: 20 adet bilgi kartı (basılı), sınıflandırma panosu
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
          <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Sınıf çalışması</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Sınıf Anketi</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Sınıfça bir anket yapın (favori renk, boy, ayak numarası, sevilen ders).
          Sonuçları tahtada tabloya yazın. Bu verileri grafiğe dönüştürün. Hangi veri
          yapısal, hangisi yapısal olmayan? Hangi sonuçlar sürpriz oldu?
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
          <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Bireysel</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Veri Seti Keşfedici</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Google Dataset Search veya Kaggle&apos;da bir veri seti bulun. Veri setini
          inceleyin: kaç satır var? Hangi sütunlar var? Veri türleri neler? Bulgularınızı
          sınıfla paylaşın.
        </p>
        <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
          <p className="font-medium text-sky-700 dark:text-sky-300">
            🔗 datasetsearch.research.google.com veya kaggle.com/datasets
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
          <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
        </div>
        <h3 className="mb-2 text-xl font-bold">Etkinlik 4: Veri Etiketleme Atölyesi</h3>
        <p className="text-[var(--color-text-secondary)]">
          20 hayvan fotoğrafını &quot;kedi&quot; ve &quot;köpek&quot; olarak etiketleyin.
          Zor olan durumlar var mı? Bir fotoğrafta hem kedi hem köpek varsa ne yaparsınız?
          Etiketlemenin ne kadar önemli ve zaman alıcı olduğunu deneyimleyin.
        </p>
      </div>
    </section>
  </>
);

const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Veri Türü Avcısı</h2>
    <p className="text-[var(--color-text-secondary)]">
      Süre bitmeden verileri doğru kategorilere ayır!
    </p>
    <VeriTuruAvcisi />
  </section>
);

const SlaytQuiz = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />

    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
      <div className="space-y-3">
        {[
          { ad: "Girdi Avcıları Bilgi Kartları", url: "/indirilebilir/bolum-03-girdi-avcilari-kartlari.html" },
          { ad: "Sınıf Anketi Formu", url: "/indirilebilir/bolum-03-sinif-anketi-formu.html" },
          { ad: "Veri Seti İnceleme Formu", url: "/indirilebilir/bolum-03-veri-seti-inceleme-formu.html" },
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

export default function Bolum3() {
  return (
    <BolumSlider
      bolumNo={3}
      bolumBaslik="Verinin Gücü"
      bolumAltBaslik="YZ'nin Yakıtı"
      seviye="6. Sınıf"
      ders={4}
      renk="from-violet-600 to-purple-700"
      oncekiBolum={2}
      sonrakiBolum={4}
      slaytlar={[
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Konu Anlatımı", icon: "📖", icerik: SlaytKonuAnlatimi },
        { baslik: "Veri ve YZ İlişkisi", icon: "🔗", icerik: SlaytVeriYzIliskisi },
        { baslik: "Büyük Veri ve Gizlilik", icon: "🔒", icerik: SlaytBuyukVeriGizlilik },
        { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Quiz ve Materyaller", icon: "📝", icerik: SlaytQuiz },
      ]}
    />
  );
}
