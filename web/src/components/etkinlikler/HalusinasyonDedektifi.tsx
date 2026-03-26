"use client";

import { useState, useCallback } from "react";

interface Iddia {
  id: number;
  metin: string;
  halusinasyon: boolean;
  aciklama: string;
  kategori: string;
  ipucu: string;
}

const iddialar: Iddia[] = [
  {
    id: 1,
    metin: "İnsan beyni yaklaşık 86 milyar nöron içerir.",
    halusinasyon: false,
    aciklama: "Bu doğru bir bilgidir. Bilim insanları insan beyninde yaklaşık 86 milyar nöron olduğunu tespit etmiştir.",
    kategori: "Bilim",
    ipucu: "Bu bilgi birçok bilimsel kaynakta geçer mi?",
  },
  {
    id: 2,
    metin: "Albert Einstein 1927 yılında Bilgisayar Bilimi alanında Nobel Ödülü kazanmıştır.",
    halusinasyon: true,
    aciklama: "Bu bir halüsinasyondur. Einstein 1921'de Fizik Nobel Ödülü aldı. Bilgisayar Bilimi alanında Nobel Ödülü yoktur.",
    kategori: "Tarih",
    ipucu: "Nobel Ödülü hangi alanlarda veriliyor? Einstein ne zaman Nobel aldı?",
  },
  {
    id: 3,
    metin: "Python programlama dili, adını piton yılanından değil, Monty Python komedi grubundan almıştır.",
    halusinasyon: false,
    aciklama: "Bu doğrudur. Python'un yaratıcısı Guido van Rossum, dili Monty Python's Flying Circus adlı İngiliz komedi dizisinden esinlenerek adlandırmıştır.",
    kategori: "Teknoloji",
    ipucu: "Programlama dilleri bazen ilginç isim kaynaklarına sahip olabilir.",
  },
  {
    id: 4,
    metin: "Türkiye'nin başkenti İstanbul'dur ve 1923 yılında başkent ilan edilmiştir.",
    halusinasyon: true,
    aciklama: "Bu bir halüsinasyondur. Türkiye'nin başkenti Ankara'dır. 13 Ekim 1923'te Ankara başkent olarak kabul edilmiştir.",
    kategori: "Coğrafya",
    ipucu: "Türkiye'nin başkenti neresidir? Bildiğinle karşılaştır!",
  },
  {
    id: 5,
    metin: "Su molekülü iki hidrojen ve bir oksijen atomundan oluşur (H₂O).",
    halusinasyon: false,
    aciklama: "Bu doğru bir bilgidir. Su (H₂O), 2 hidrojen ve 1 oksijen atomundan oluşan bir moleküldür.",
    kategori: "Bilim",
    ipucu: "Kimya derslerinden bildiğin suyun formülünü hatırla.",
  },
  {
    id: 6,
    metin: "ChatGPT, OpenAI tarafından geliştirilen bir yapay zeka aracıdır ve 2019 yılında halka açılmıştır.",
    halusinasyon: true,
    aciklama: "Kısmen halüsinasyondur. ChatGPT, OpenAI tarafından geliştirilmiştir (doğru), ancak halka 30 Kasım 2022'de açılmıştır, 2019'da değil.",
    kategori: "Teknoloji",
    ipucu: "ChatGPT ne zaman popüler oldu? 2019 mu yoksa daha sonra mı?",
  },
  {
    id: 7,
    metin: "Dünya'nın en derin okyanus noktası olan Mariana Çukuru, Pasifik Okyanusu'nda yer alır.",
    halusinasyon: false,
    aciklama: "Bu doğrudur. Mariana Çukuru, Pasifik Okyanusu'ndadır ve yaklaşık 11.034 metre derinliğiyle dünyanın en derin noktasıdır.",
    kategori: "Coğrafya",
    ipucu: "En derin okyanus noktası hakkında bildiklerini düşün.",
  },
  {
    id: 8,
    metin: "Yapay zeka terimi ilk olarak 1842 yılında Charles Darwin tarafından kullanılmıştır.",
    halusinasyon: true,
    aciklama: "Bu bir halüsinasyondur. 'Yapay Zeka' terimi 1956 yılında John McCarthy tarafından Dartmouth Konferansı'nda ortaya atılmıştır. Darwin bir biyologdu ve YZ ile ilgisi yoktur.",
    kategori: "Tarih",
    ipucu: "YZ'nin tarihi ne kadar eskiye dayanıyor? Darwin ne ile ünlüdür?",
  },
];

const seviyeler = [
  { min: 0, ad: "Çaylak Dedektif", emoji: "🔍", renk: "text-gray-600" },
  { min: 3, ad: "Genç Dedektif", emoji: "🕵️", renk: "text-blue-600" },
  { min: 5, ad: "Kıdemli Dedektif", emoji: "🦸", renk: "text-purple-600" },
  { min: 7, ad: "Baş Dedektif", emoji: "🏆", renk: "text-amber-600" },
  { min: 8, ad: "Efsane Dedektif", emoji: "⭐", renk: "text-emerald-600" },
];

function getSeviye(puan: number) {
  let seviye = seviyeler[0];
  for (const s of seviyeler) {
    if (puan >= s.min) seviye = s;
  }
  return seviye;
}

export default function HalusinasyonDedektifi() {
  const [aktifIddia, setAktifIddia] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, boolean>>({});
  const [gosterAciklama, setGosterAciklama] = useState(false);
  const [ipucuGoster, setIpucuGoster] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);

  const iddia = iddialar[aktifIddia];
  const kullaniciCevabi = cevaplar[iddia.id];
  const cevaplandiMi = kullaniciCevabi !== undefined;
  const dogruMu = cevaplandiMi && kullaniciCevabi === iddia.halusinasyon;

  const cevapVer = useCallback(
    (halusinasyonMu: boolean) => {
      if (cevaplandiMi) return;
      setCevaplar((prev) => ({ ...prev, [iddia.id]: halusinasyonMu }));
      setGosterAciklama(true);
      setIpucuGoster(false);
    },
    [cevaplandiMi, iddia.id]
  );

  const sonraki = useCallback(() => {
    if (aktifIddia < iddialar.length - 1) {
      setAktifIddia((prev) => prev + 1);
      setGosterAciklama(false);
      setIpucuGoster(false);
    } else {
      setTamamlandi(true);
    }
  }, [aktifIddia]);

  const tekrar = useCallback(() => {
    setAktifIddia(0);
    setCevaplar({});
    setGosterAciklama(false);
    setIpucuGoster(false);
    setTamamlandi(false);
  }, []);

  const toplamDogru = iddialar.filter((i) => cevaplar[i.id] === i.halusinasyon).length;
  const seviye = getSeviye(toplamDogru);

  if (tamamlandi) {
    return (
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">🏅 Soruşturma Tamamlandı!</h3>
          <div className="mt-4 text-6xl">{seviye.emoji}</div>
          <p className={`mt-2 text-xl font-extrabold ${seviye.renk}`}>{seviye.ad}</p>
          <p className="mt-1 text-3xl font-bold">
            {toplamDogru} / {iddialar.length}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">doğru tespit</p>
        </div>

        {/* Doğrulama İpuçları */}
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
          <h4 className="mb-2 font-bold text-amber-800 dark:text-amber-300">🔑 Gerçek Doğrulama İpuçları</h4>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>1. Tarih ve isim kombinasyonlarını her zaman kontrol et</li>
            <li>2. Çok spesifik sayılar ve tarihler halüsinasyon belirtisi olabilir</li>
            <li>3. Birden fazla güvenilir kaynaktan doğrula</li>
            <li>4. YZ&apos;nin eski bilgi kullanabileceğini unutma</li>
            <li>5. &quot;Kulağa doğru geliyor&quot; yeterli bir doğrulama değildir!</li>
          </ul>
        </div>

        {/* Sonuç Tablosu */}
        <div className="grid gap-2 sm:grid-cols-2">
          {iddialar.map((i) => {
            const dogruMuOzet = cevaplar[i.id] === i.halusinasyon;
            return (
              <div
                key={i.id}
                className={`rounded-lg border p-3 text-sm ${
                  dogruMuOzet
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
                    : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span>{dogruMuOzet ? "✅" : "❌"}</span>
                  <div>
                    <p className="font-medium">{i.kategori}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {i.halusinasyon ? "🤥 Halüsinasyon" : "✓ Gerçek"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={tekrar}
          className="mx-auto flex items-center gap-2 rounded-xl bg-pink-500 px-6 py-2 font-bold text-white transition-all hover:bg-pink-600"
        >
          🔄 Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">🕵️ Halüsinasyon Dedektifi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          YZ tarafından üretilen bilgileri incele. Hangisi gerçek, hangisi halüsinasyon?
        </p>
      </div>

      {/* İlerleme */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {aktifIddia + 1} / {iddialar.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-pink-500 transition-all duration-500"
            style={{ width: `${((aktifIddia + 1) / iddialar.length) * 100}%` }}
          />
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          ✓ {toplamDogru}
        </span>
      </div>

      {/* İddia Kartı */}
      <div className="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {iddia.kategori}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)]">YZ Çıktısı</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <p className="text-lg leading-relaxed">&quot;{iddia.metin}&quot;</p>
        </div>
      </div>

      {/* İpucu */}
      {!cevaplandiMi && (
        <button
          onClick={() => setIpucuGoster((prev) => !prev)}
          className="mx-auto flex items-center gap-1 text-sm text-amber-600 hover:underline dark:text-amber-400"
        >
          💡 {ipucuGoster ? "İpucunu Gizle" : "İpucu Göster"}
        </button>
      )}
      {ipucuGoster && !cevaplandiMi && (
        <div className="rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          {iddia.ipucu}
        </div>
      )}

      {/* Seçenekler */}
      {!cevaplandiMi && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => cevapVer(false)}
            className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 text-center transition-all hover:shadow-md dark:border-emerald-700 dark:bg-emerald-900/20"
          >
            <span className="text-3xl">✅</span>
            <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-300">Gerçek Bilgi</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Bu bilgi doğru</p>
          </button>
          <button
            onClick={() => cevapVer(true)}
            className="rounded-xl border-2 border-red-300 bg-red-50 p-4 text-center transition-all hover:shadow-md dark:border-red-700 dark:bg-red-900/20"
          >
            <span className="text-3xl">🤥</span>
            <p className="mt-2 font-bold text-red-700 dark:text-red-300">Halüsinasyon</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Bu bilgi yanlış/uydurma</p>
          </button>
        </div>
      )}

      {/* Geri Bildirim */}
      {gosterAciklama && (
        <>
          <div
            className={`rounded-xl border-l-4 p-4 ${
              dogruMu
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                : "border-red-500 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <p className="font-bold">{dogruMu ? "✅ Doğru tespit!" : "❌ Yanlış tespit!"}</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{iddia.aciklama}</p>
          </div>

          <button
            onClick={sonraki}
            className="mx-auto flex items-center gap-2 rounded-xl bg-pink-500 px-6 py-2 font-bold text-white transition-all hover:bg-pink-600"
          >
            {aktifIddia < iddialar.length - 1 ? "Sonraki İddia →" : "Sonuçları Gör 🏅"}
          </button>
        </>
      )}
    </div>
  );
}
