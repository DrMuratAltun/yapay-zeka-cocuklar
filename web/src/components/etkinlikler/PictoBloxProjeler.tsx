"use client";

import { useState, useCallback } from "react";

interface Adim {
  baslik: string;
  aciklama: string;
  detay: string;
  emoji: string;
}

interface Proje {
  id: number;
  baslik: string;
  aciklama: string;
  emoji: string;
  zorluk: "Başlangıç" | "Orta" | "İleri";
  sure: string;
  renk: string;
  renkBg: string;
  adimlar: Adim[];
}

const projeler: Proje[] = [
  {
    id: 1,
    baslik: "Duygu Dedektörü",
    aciklama: "Kameradaki yüzün duygusunu algılayıp karakterin ifadesini değiştiren bir proje.",
    emoji: "😊",
    zorluk: "Başlangıç",
    sure: "30 dakika",
    renk: "border-emerald-300 dark:border-emerald-700",
    renkBg: "bg-emerald-50 dark:bg-emerald-900/20",
    adimlar: [
      {
        baslik: "PictoBlox'u Hazırla",
        aciklama: "PictoBlox'u aç ve yeni bir proje oluştur.",
        detay: "ai.thestempedia.com adresinden web sürümünü açın veya masaüstü uygulamayı indirin. Yeni bir proje başlatın.",
        emoji: "🖥️",
      },
      {
        baslik: "Yüz Algılama Uzantısını Ekle",
        aciklama: "Uzantılar bölümünden 'Face Detection' uzantısını ekle.",
        detay: "Sol alt köşedeki uzantılar butonuna tıklayın. 'Face Detection' uzantısını bulun ve projeye ekleyin. Yeni bloklar görünecektir.",
        emoji: "🧩",
      },
      {
        baslik: "Karakteri Seç ve Kostümleri Hazırla",
        aciklama: "Bir karakter seç. Mutlu, üzgün ve şaşkın kostümlerini oluştur.",
        detay: "Kedi veya insan karakteri seçin. Kostümler sekmesine gidin ve en az 3 farklı duygu ifadesi (mutlu, üzgün, nötr) için kostüm oluşturun veya düzenleyin.",
        emoji: "🎨",
      },
      {
        baslik: "Kodları Yaz",
        aciklama: "Kameradaki duyguya göre kostüm değiştiren kodları ekle.",
        detay: "Yeşil bayrak tıklandığında → Sürekli tekrarla → Yüz algıla → Eğer duygu='mutlu' ise → mutlu kostümü olsun. Değilse eğer duygu='üzgün' ise → üzgün kostümü olsun. Her koşul için farklı ses de ekleyebilirsin.",
        emoji: "📝",
      },
      {
        baslik: "Test Et ve Geliştir",
        aciklama: "Programı çalıştır, kamera karşısında farklı ifadeler dene.",
        detay: "Yeşil bayrağa bas. Kamera karşısında gülümse, somurt, şaşır. Karakter tepki veriyor mu? Algılama doğru çalışmıyorsa ışık ve mesafeyi ayarla. Ek özellikler ekle: skor sayacı, ses efektleri.",
        emoji: "🧪",
      },
    ],
  },
  {
    id: 2,
    baslik: "El Hareketi Oyunu",
    aciklama: "El hareketleriyle kontrol edilen bir yakalama/kaçma oyunu.",
    emoji: "🖐️",
    zorluk: "Orta",
    sure: "45 dakika",
    renk: "border-blue-300 dark:border-blue-700",
    renkBg: "bg-blue-50 dark:bg-blue-900/20",
    adimlar: [
      {
        baslik: "ML Uzantısını Ekle",
        aciklama: "Machine Learning uzantısını projeye ekle.",
        detay: "Uzantılar bölümünden 'Machine Learning' uzantısını ekleyin. Bu uzantı kendi modelinizi eğitmenize olanak sağlar.",
        emoji: "🧩",
      },
      {
        baslik: "El Sınıflarını Oluştur",
        aciklama: "3 sınıf oluştur: Sağ, Sol, Dur.",
        detay: "ML bölümüne gidin. 'Sağ' sınıfı için elinizi sağa doğru gösteren 30+ fotoğraf çekin. 'Sol' için sola gösteren, 'Dur' için avuç açık 30+ fotoğraf. Farklı açılardan çekim yapın.",
        emoji: "📸",
      },
      {
        baslik: "Modeli Eğit",
        aciklama: "'Train Model' butonuna basarak modeli eğit.",
        detay: "'Train Model' butonuna tıklayın. Eğitim birkaç dakika sürecektir. Eğitim tamamlanınca modeli test edin. Doğruluk oranı düşükse daha fazla örnek ekleyin.",
        emoji: "🎓",
      },
      {
        baslik: "Oyun Sahnesini Hazırla",
        aciklama: "Karakter ve toplanacak nesneleri sahneye ekle.",
        detay: "Bir karakter seçin (kedi, tavşan vb.). Ekrana rastgele konumlarda beliren yıldız/elma gibi nesneler ekleyin. Skor değişkeni oluşturun.",
        emoji: "🎮",
      },
      {
        baslik: "Kontrol Kodlarını Yaz ve Test Et",
        aciklama: "El hareketine göre karakteri hareket ettir, nesneleri topla.",
        detay: "Sürekli tekrarla → Sınıflandır → Eğer sınıf='Sağ' ise → x'i 10 artır. Eğer 'Sol' ise → x'i 10 azalt. Nesneye dokunursa → skor +1 ve nesneyi yeni konuma taşı. 'Dur' hareketi ile oyunu durdur.",
        emoji: "🏆",
      },
    ],
  },
  {
    id: 3,
    baslik: "Sesli Komut Asistanı",
    aciklama: "Sesli komutlarla sahne değiştiren, müzik çalan akıllı asistan.",
    emoji: "🎤",
    zorluk: "İleri",
    sure: "50 dakika",
    renk: "border-purple-300 dark:border-purple-700",
    renkBg: "bg-purple-50 dark:bg-purple-900/20",
    adimlar: [
      {
        baslik: "Ses Tanıma Uzantısını Ekle",
        aciklama: "Speech Recognition uzantısını projeye ekle.",
        detay: "Uzantılar bölümünden 'Speech Recognition' uzantısını ekleyin. Bu uzantı mikrofon ile ses algılama ve metne çevirme imkanı sağlar.",
        emoji: "🎙️",
      },
      {
        baslik: "Sesli Komutları Planla",
        aciklama: "Hangi komutların ne yapacağını planla.",
        detay: "Komut listesi oluşturun: 'merhaba' → Selamlama, 'müzik' → Şarkı çal, 'dans' → Karakter dans etsin, 'değiştir' → Sahne arkaplanını değiştir, 'dur' → Programı durdur.",
        emoji: "📋",
      },
      {
        baslik: "Sahne ve Karakteri Hazırla",
        aciklama: "Birden fazla sahne arkaplanı ve karakter kostümü hazırla.",
        detay: "En az 3 farklı sahne arkaplanı ekleyin (park, uzay, deniz). Karakter için dans kostümleri oluşturun. Farklı sesler/müzikler içe aktarın.",
        emoji: "🎨",
      },
      {
        baslik: "Komut Kodlarını Yaz",
        aciklama: "Her sesli komut için farklı eylemler kodla.",
        detay: "Yeşil bayrak → Sürekli tekrarla → Ses dinle → Eğer algılanan metin 'merhaba' içeriyorsa → 'Merhaba! Size nasıl yardımcı olabilirim?' de. 'müzik' içeriyorsa → müzik çal. Her komut için ayrı koşul blokları ekleyin.",
        emoji: "📝",
      },
      {
        baslik: "Test Et ve İyileştir",
        aciklama: "Farklı seslerle ve tonlarla test et, hata varsa düzelt.",
        detay: "Programı çalıştırın ve komutları söyleyin. Algılanmayan komutlar için alternatif kelimeler ekleyin. Mikrofon hassasiyetini ayarlayın. Tanınmayan komut için 'Anlayamadım, tekrar söyler misiniz?' yanıtı ekleyin.",
        emoji: "🔧",
      },
    ],
  },
];

export default function PictoBloxProjeler() {
  const [aktifProje, setAktifProje] = useState(0);
  const [tamamlananAdimlar, setTamamlananAdimlar] = useState<Record<string, boolean>>({});
  const [acikAdim, setAcikAdim] = useState<string | null>(null);

  const proje = projeler[aktifProje];

  const adimKey = (projeId: number, adimIndex: number) => `${projeId}-${adimIndex}`;

  const adimToggle = useCallback((key: string) => {
    setTamamlananAdimlar((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const detayToggle = useCallback((key: string) => {
    setAcikAdim((prev) => (prev === key ? null : key));
  }, []);

  const projeTamamlanma = (projeId: number, adimSayisi: number) => {
    let tamamlanan = 0;
    for (let i = 0; i < adimSayisi; i++) {
      if (tamamlananAdimlar[adimKey(projeId, i)]) tamamlanan++;
    }
    return tamamlanan;
  };

  const toplamTamamlanan = projeler.reduce(
    (toplam, p) => toplam + projeTamamlanma(p.id, p.adimlar.length),
    0
  );
  const toplamAdim = projeler.reduce((toplam, p) => toplam + p.adimlar.length, 0);

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> PictoBlox ve Görsel Programlama Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          PictoBlox, blok tabanlı bir görsel programlama platformudur ve içinde yapay zeka eklentileri bulunur. Yüz tanıma, nesne algılama, ses tanıma gibi YZ özelliklerini blok kodlama ile kullanabilirsin. Hem kodlama hem de yapay zeka öğrenmenin eğlenceli bir yoludur!
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">🚀 PictoBlox Proje Galerisi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Adım adım YZ projeleri geliştir. Her adımı tamamladıkça işaretle!
        </p>
      </div>

      {/* Genel İlerleme */}
      <div className="rounded-xl bg-[var(--color-bg-secondary)] p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Genel İlerleme</span>
          <span className="font-bold">
            {toplamTamamlanan} / {toplamAdim} adım
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${toplamAdim > 0 ? (toplamTamamlanan / toplamAdim) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Proje Kartları */}
      <div className="grid gap-3 sm:grid-cols-3">
        {projeler.map((p, i) => {
          const tamamlanan = projeTamamlanma(p.id, p.adimlar.length);
          const yuzde = Math.round((tamamlanan / p.adimlar.length) * 100);
          return (
            <button
              key={p.id}
              onClick={() => setAktifProje(i)}
              className={`rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                aktifProje === i
                  ? `${p.renk} ${p.renkBg} ring-2 ring-offset-1 ring-blue-400`
                  : `border-[var(--color-border)] bg-[var(--color-bg-secondary)]`
              }`}
            >
              <div className="mb-2 text-center text-3xl">{p.emoji}</div>
              <h4 className="text-center text-sm font-bold">{p.baslik}</h4>
              <div className="mt-1 flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)]">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium text-white ${
                    p.zorluk === "Başlangıç"
                      ? "bg-emerald-500"
                      : p.zorluk === "Orta"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                >
                  {p.zorluk}
                </span>
                <span>{p.sure}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${yuzde}%` }}
                />
              </div>
              <p className="mt-1 text-center text-xs text-[var(--color-text-secondary)]">
                {tamamlanan}/{p.adimlar.length}
              </p>
            </button>
          );
        })}
      </div>

      {/* Aktif Proje Detayı */}
      <div className={`rounded-xl border-2 p-5 ${proje.renk} ${proje.renkBg}`}>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">{proje.emoji}</span>
          <div>
            <h4 className="text-lg font-bold">{proje.baslik}</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{proje.aciklama}</p>
          </div>
        </div>

        {/* Adımlar */}
        <div className="space-y-3">
          {proje.adimlar.map((adim, i) => {
            const key = adimKey(proje.id, i);
            const tamamlandiMi = tamamlananAdimlar[key] || false;
            const acikMi = acikAdim === key;

            return (
              <div
                key={key}
                className={`rounded-xl border bg-white/60 transition-all dark:bg-white/5 ${
                  tamamlandiMi ? "border-emerald-300 dark:border-emerald-700" : "border-[var(--color-border)]"
                }`}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => adimToggle(key)}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm transition-all ${
                      tamamlandiMi
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-gray-300 bg-white hover:border-emerald-400 dark:border-gray-600 dark:bg-gray-800"
                    }`}
                  >
                    {tamamlandiMi ? "✓" : i + 1}
                  </button>

                  {/* Adım Bilgisi */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{adim.emoji}</span>
                      <span className={`text-sm font-medium ${tamamlandiMi ? "line-through opacity-70" : ""}`}>
                        {adim.baslik}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">{adim.aciklama}</p>
                  </div>

                  {/* Detay Butonu */}
                  <button
                    onClick={() => detayToggle(key)}
                    className="shrink-0 rounded-lg px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    {acikMi ? "Gizle" : "Detay"}
                  </button>
                </div>

                {/* Detay Alanı */}
                {acikMi && (
                  <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    {adim.detay}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tamamlanma Mesajı */}
      {toplamTamamlanan === toplamAdim && toplamAdim > 0 && (
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-700 dark:bg-emerald-900/20">
          <span className="text-3xl">🏆</span>
          <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-300">
            Tebrikler! Tüm projeleri tamamladın!
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Artık kendi YZ projelerini tasarlayabilirsin!
          </p>
        </div>
      )}
    </div>
  );
}
