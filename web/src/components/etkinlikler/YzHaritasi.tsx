"use client";

import { useState } from "react";

interface YzOrnegi {
  ad: string;
  aciklama: string;
}

interface Bolge {
  ad: string;
  icon: string;
  renk: string;
  renkAcik: string;
  renkBorder: string;
  ornekler: YzOrnegi[];
}

const bolgeler: Bolge[] = [
  {
    ad: "Ev",
    icon: "🏠",
    renk: "bg-blue-500",
    renkAcik: "bg-blue-50 dark:bg-blue-900/20",
    renkBorder: "border-blue-300 dark:border-blue-700",
    ornekler: [
      { ad: "Akıllı hoparlör (Alexa, Google Home)", aciklama: "Sesli komutlarla müzik çalar, soruları yanıtlar, ev cihazlarını kontrol eder." },
      { ad: "Robot süpürge", aciklama: "Evin haritasını çıkarır, engelleri algılar ve en verimli temizlik rotasını planlar." },
      { ad: "Film ve video platformu önerileri", aciklama: "İzleme alışkanlıklarını analiz ederek sevebileceğin içerikleri tahmin eder." },
      { ad: "Akıllı termostat", aciklama: "Sıcaklık tercihlerini öğrenerek evi otomatik olarak ısıtır veya soğutur." },
    ],
  },
  {
    ad: "Okul",
    icon: "🏫",
    renk: "bg-emerald-500",
    renkAcik: "bg-emerald-50 dark:bg-emerald-900/20",
    renkBorder: "border-emerald-300 dark:border-emerald-700",
    ornekler: [
      { ad: "Dil öğrenme uygulamaları (Duolingo)", aciklama: "Seviyeni ve hatalarını analiz ederek sana özel alıştırmalar sunar." },
      { ad: "Otomatik çeviri (Google Translate)", aciklama: "Yapay zeka ile metni bir dilden diğerine çevirir, bağlamı anlamaya çalışır." },
      { ad: "Yazım ve dilbilgisi kontrolü", aciklama: "Yazdığın metindeki hataları bulur ve düzeltme önerir." },
      { ad: "Akıllı arama motorları", aciklama: "Sorduğun soruyu anlayarak en alakalı sonuçları gösterir." },
    ],
  },
  {
    ad: "Yolda",
    icon: "🚗",
    renk: "bg-orange-500",
    renkAcik: "bg-orange-50 dark:bg-orange-900/20",
    renkBorder: "border-orange-300 dark:border-orange-700",
    ornekler: [
      { ad: "Navigasyon (Google Maps, Yandex)", aciklama: "Trafik verilerini analiz ederek en hızlı rotayı hesaplar." },
      { ad: "Otonom (sürücüsüz) araçlar", aciklama: "Kameralar ve sensörlerle çevreyi algılayarak aracı güvenle sürer." },
      { ad: "Trafik ışığı yönetimi", aciklama: "Trafik yoğunluğunu ölçerek ışık sürelerini akıllıca ayarlar." },
      { ad: "Park yeri bulma uygulamaları", aciklama: "Boş park yerlerini tespit ederek sürücüleri yönlendirir." },
    ],
  },
  {
    ad: "Alışveriş",
    icon: "🛒",
    renk: "bg-pink-500",
    renkAcik: "bg-pink-50 dark:bg-pink-900/20",
    renkBorder: "border-pink-300 dark:border-pink-700",
    ornekler: [
      { ad: "E-ticaret sitesi ürün önerileri", aciklama: "Geçmiş alışverişlerine bakarak ilgini çekebilecek ürünleri gösterir." },
      { ad: "Fiyat karşılaştırma", aciklama: "Farklı mağazalardaki fiyatları otomatik olarak karşılaştırır." },
      { ad: "Sanal deneme (AR)", aciklama: "Gözlük veya kıyafeti satın almadan önce üzerinde nasıl duracağını gösterir." },
      { ad: "Kasiyersiz mağazalar", aciklama: "Kameralar ve sensörlerle aldığın ürünleri otomatik tanır, kasaya gerek kalmaz." },
    ],
  },
];

export default function YzHaritasi() {
  const [acikBolge, setAcikBolge] = useState<string | null>(null);
  const [isaretliler, setIsaretliler] = useState<Set<string>>(new Set());

  const toplamOrnek = bolgeler.reduce((t, b) => t + b.ornekler.length, 0);

  const toggle = (bolgeAd: string) => {
    setAcikBolge(acikBolge === bolgeAd ? null : bolgeAd);
  };

  const toggleIsaret = (key: string) => {
    setIsaretliler((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Hayatımızdaki Yapay Zeka Uygulamaları Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zeka sadece bilim kurgu filmlerinde değil, hayatımızın her alanında kullanılıyor: evde, okulda, sağlıkta, ulaşımda ve eğlencede. Bu haritada farklı yaşam alanlarındaki YZ uygulamalarını keşfederek, teknolojinin hayatımızı nasıl şekillendirdiğini göreceksin.
        </p>
      </div>

      <h3 className="mb-1 text-xl font-bold">🗺️ İnteraktif YZ Haritası</h3>
      <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Her bölgeye tıklayarak orada kullanılan yapay zeka uygulamalarını keşfet.
        Gerçek hayatta fark ettiklerini işaretle!
      </p>

      {/* Progress */}
      <div className="mb-5 rounded-xl bg-[var(--color-bg)] p-3 text-center">
        <div className="mb-2 text-sm font-medium">
          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
            {isaretliler.size}
          </span>
          <span className="text-[var(--color-text-secondary)]">/{toplamOrnek} YZ uygulaması keşfettin!</span>
        </div>
        <div className="mx-auto h-3 max-w-md overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
            style={{ width: `${(isaretliler.size / toplamOrnek) * 100}%` }}
          />
        </div>
        {isaretliler.size === toplamOrnek && (
          <p className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            🎉 Tebrikler! Tüm YZ uygulamalarını keşfettin!
          </p>
        )}
      </div>

      {/* Zone Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {bolgeler.map((bolge) => {
          const acik = acikBolge === bolge.ad;
          const bolgeIsaretSayisi = bolge.ornekler.filter((o) =>
            isaretliler.has(`${bolge.ad}-${o.ad}`)
          ).length;

          return (
            <div key={bolge.ad} className={`rounded-xl border ${bolge.renkBorder} ${bolge.renkAcik} transition-all duration-300`}>
              <button
                onClick={() => toggle(bolge.ad)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{bolge.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold">{bolge.ad}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {bolgeIsaretSayisi}/{bolge.ornekler.length} keşfedildi
                    </p>
                  </div>
                </div>
                <span className={`text-xl transition-transform duration-300 ${acik ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {acik && (
                <div className="space-y-2 border-t border-[var(--color-border)] px-4 py-3">
                  {bolge.ornekler.map((ornek) => {
                    const key = `${bolge.ad}-${ornek.ad}`;
                    const isaretli = isaretliler.has(key);
                    return (
                      <button
                        key={ornek.ad}
                        onClick={() => toggleIsaret(key)}
                        className={`w-full rounded-lg border p-3 text-left transition-all ${
                          isaretli
                            ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30"
                            : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-emerald-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 text-lg">{isaretli ? "✅" : "⬜"}</span>
                          <div>
                            <p className="text-sm font-semibold">{ornek.ad}</p>
                            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                              {ornek.aciklama}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
