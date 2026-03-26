"use client";

import { useState } from "react";

const turlar = [
  {
    kotu: "Bir şey yaz",
    secenekler: [
      { metin: "Yaz bana bir şey güzel olsun", puan: 1 },
      { metin: "Bir hikaye yaz", puan: 2 },
      { metin: "Kısa bir bilim kurgu hikayesi yaz", puan: 3 },
      { metin: "6. sınıf öğrencisi için uzayda geçen 200 kelimelik bir bilim kurgu hikayesi yaz, sürpriz sonlu olsun", puan: 4 },
    ],
    dogru: 3,
    ipucu: "İyi bir prompt: Konu + Hedef kitle + Uzunluk + Stil belirtir.",
  },
  {
    kotu: "Resim çiz",
    secenekler: [
      { metin: "Güzel bir resim çiz", puan: 1 },
      { metin: "Bir denizanası çiz", puan: 2 },
      { metin: "Renkli bir denizanası resmi yap, suluboya", puan: 3 },
      { metin: "Okyanusun derinliklerinde süzülen neon renkli bir denizanası, dijital sanat stilinde, karanlık arka plan", puan: 4 },
    ],
    dogru: 3,
    ipucu: "Görsel prompt'ta: Konu + Stil + Renkler + Ortam belirtilmeli.",
  },
  {
    kotu: "Ödev yap",
    secenekler: [
      { metin: "Ödevimi yap hemen", puan: 1 },
      { metin: "Fotosentezi anlat", puan: 2 },
      { metin: "Fotosentezi 3 madde ile açıkla", puan: 3 },
      { metin: "Fotosentez konusunu 3 madde ile açıkla, her maddeye günlük hayattan bir örnek ver, 6. sınıf seviyesinde", puan: 4 },
    ],
    dogru: 3,
    ipucu: "Yapı + Detay seviyesi + Örnekler isteyin. YZ'ye ödevi yaptırmak yerine öğrenme aracı olarak kullanın!",
  },
  {
    kotu: "Kod yaz",
    secenekler: [
      { metin: "Kod yaz bana", puan: 1 },
      { metin: "Python'da bir program yaz", puan: 2 },
      { metin: "Python'da çift sayıları bulan program yaz", puan: 3 },
      { metin: "Python'da 1'den 100'e kadar çift sayıları listeleyen bir program yaz, her satıra açıklama ekle", puan: 4 },
    ],
    dogru: 3,
    ipucu: "Kod promptu: Dil + Görev + Aralık + Ek istekler (açıklama, hata yönetimi) içermeli.",
  },
  {
    kotu: "Çevir",
    secenekler: [
      { metin: "Bunu çevir", puan: 1 },
      { metin: "İngilizce'den Türkçe'ye çevir", puan: 2 },
      { metin: "Bu paragrafı Türkçe'ye çevir, resmi dil kullan", puan: 3 },
      { metin: "Bu İngilizce paragrafı Türkçe'ye çevir, resmi akademik dil kullan, bilimsel terimleri parantez içinde İngilizce olarak da yaz", puan: 4 },
    ],
    dogru: 3,
    ipucu: "Çeviri promptu: Kaynak dil + Hedef dil + Üslup + Terim tercihleri belirtilmeli.",
  },
  {
    kotu: "Yardım et",
    secenekler: [
      { metin: "Bana yardım et", puan: 1 },
      { metin: "Matematik sınavına hazırlan bana yardım et", puan: 2 },
      { metin: "Kesirlerle toplama konusunda sorular oluştur", puan: 3 },
      { metin: "Kesirlerle toplama konusunda 5 alıştırma sorusu oluştur, kolaydan zora sırala, çözümleriyle birlikte ver", puan: 4 },
    ],
    dogru: 3,
    ipucu: "Yardım promptu: Konu + Soru sayısı + Zorluk + Çözüm isteyip istemediğinizi belirtin.",
  },
];

export default function PromptUstasi() {
  const [tur, setTur] = useState(0);
  const [skor, setSkor] = useState(0);
  const [secim, setSecim] = useState<number | null>(null);
  const [gosterGeriBildirim, setGosterGeriBildirim] = useState(false);
  const [bitti, setBitti] = useState(false);

  function sec(index: number) {
    if (gosterGeriBildirim) return;
    setSecim(index);
    setGosterGeriBildirim(true);
    if (index === turlar[tur].dogru) {
      setSkor(skor + 1);
    }
  }

  function sonraki() {
    if (tur + 1 >= turlar.length) {
      setBitti(true);
    } else {
      setTur(tur + 1);
      setSecim(null);
      setGosterGeriBildirim(false);
    }
  }

  function sifirla() {
    setTur(0);
    setSkor(0);
    setSecim(null);
    setGosterGeriBildirim(false);
    setBitti(false);
  }

  if (bitti) {
    const rozet = skor >= 5;
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{rozet ? "🏅" : "💪"}</div>
        <h3 className="text-2xl font-bold mb-2">
          {rozet ? "Prompt Ustası!" : "İyi Deneme!"}
        </h3>
        <p className="text-lg mb-2">
          <span className="font-bold text-pink-600">{skor}</span> / {turlar.length} doğru
        </p>
        {rozet && (
          <div className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-1.5 text-sm font-bold text-white mb-4">
            🏅 Prompt Ustası Rozeti Kazandın!
          </div>
        )}
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          İyi bir prompt: net, detaylı ve bağlam içerir. Rol + Görev + Bağlam + Format formülünü hatırla!
        </p>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-pink-500 px-8 py-3 font-bold text-white hover:bg-pink-600 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  const mevcutTur = turlar[tur];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">✨ Prompt Ustası</h3>
        <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-bold text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
          {tur + 1} / {turlar.length}
        </span>
      </div>

      <div className="mb-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-pink-500 transition-all" style={{ width: `${(tur / turlar.length) * 100}%` }} />
      </div>

      {/* Bad prompt */}
      <div className="mb-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 p-4">
        <p className="text-xs font-bold text-rose-500 mb-1">❌ Kötü Prompt:</p>
        <p className="text-lg font-bold text-rose-700 dark:text-rose-300">&ldquo;{mevcutTur.kotu}&rdquo;</p>
      </div>

      <p className="text-sm font-medium mb-3">En iyi prompt hangisi? 🤔</p>

      <div className="space-y-2">
        {mevcutTur.secenekler.map((s, i) => {
          const buSecildi = secim === i;
          const buDogru = i === mevcutTur.dogru;
          let cls = "border-[var(--color-border)]";
          if (gosterGeriBildirim) {
            if (buDogru) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20";
            else if (buSecildi) cls = "border-rose-400 bg-rose-50 dark:bg-rose-900/20";
          } else if (buSecildi) {
            cls = "border-pink-400 bg-pink-50 dark:bg-pink-900/20";
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => sec(i)}
              disabled={gosterGeriBildirim}
              className={`w-full text-left rounded-xl border-2 p-3 transition cursor-pointer ${cls} ${!gosterGeriBildirim ? "hover:border-pink-300" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{s.metin}</span>
                <div className="flex shrink-0 ml-2">
                  {Array.from({ length: 4 }, (_, j) => (
                    <span key={j} className={`text-sm ${j < s.puan ? "text-amber-400" : "text-gray-300"}`}>★</span>
                  ))}
                </div>
              </div>
              {gosterGeriBildirim && buDogru && (
                <span className="text-xs text-emerald-600 font-medium">✅ En iyi seçim!</span>
              )}
            </button>
          );
        })}
      </div>

      {gosterGeriBildirim && (
        <div className="mt-4">
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3 mb-3">
            <p className="text-sm text-amber-800 dark:text-amber-300">💡 {mevcutTur.ipucu}</p>
          </div>
          <button onClick={sonraki} className="cursor-pointer rounded-xl bg-pink-500 px-8 py-2.5 font-bold text-white hover:bg-pink-600 transition">
            {tur + 1 < turlar.length ? "Sonraki →" : "Sonuçları Gör"}
          </button>
        </div>
      )}
    </div>
  );
}
