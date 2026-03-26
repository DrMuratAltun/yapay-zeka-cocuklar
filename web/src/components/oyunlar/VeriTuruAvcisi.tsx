"use client";

import { useState, useEffect, useCallback } from "react";

interface VeriOgesi {
  ad: string;
  emoji: string;
  tur: "Sayısal" | "Metinsel" | "Görsel" | "Sesli";
}

const veriListesi: VeriOgesi[] = [
  { ad: "Boy uzunluğu (180cm)", emoji: "📏", tur: "Sayısal" },
  { ad: "İsim (Ayşe)", emoji: "📝", tur: "Metinsel" },
  { ad: "Fotoğraf", emoji: "📷", tur: "Görsel" },
  { ad: "Müzik dosyası", emoji: "🎵", tur: "Sesli" },
  { ad: "Sıcaklık (25°C)", emoji: "🌡️", tur: "Sayısal" },
  { ad: "E-posta metni", emoji: "✉️", tur: "Metinsel" },
  { ad: "Röntgen görüntüsü", emoji: "🏥", tur: "Görsel" },
  { ad: "Podcast kaydı", emoji: "🎙️", tur: "Sesli" },
  { ad: "Yaş (12)", emoji: "🔢", tur: "Sayısal" },
  { ad: "Kitap özeti", emoji: "📚", tur: "Metinsel" },
  { ad: "Uydu fotoğrafı", emoji: "🛰️", tur: "Görsel" },
  { ad: "Telefon kaydı", emoji: "📞", tur: "Sesli" },
  { ad: "Nüfus sayısı", emoji: "👥", tur: "Sayısal" },
  { ad: "Tweet metni", emoji: "🐦", tur: "Metinsel" },
  { ad: "MR görüntüsü", emoji: "🧠", tur: "Görsel" },
];

const turRenkleri: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  "Sayısal": { bg: "bg-blue-100 dark:bg-blue-900/40", border: "border-blue-400", text: "text-blue-700 dark:text-blue-300", hover: "hover:bg-blue-200 dark:hover:bg-blue-800/60" },
  "Metinsel": { bg: "bg-green-100 dark:bg-green-900/40", border: "border-green-400", text: "text-green-700 dark:text-green-300", hover: "hover:bg-green-200 dark:hover:bg-green-800/60" },
  "Görsel": { bg: "bg-purple-100 dark:bg-purple-900/40", border: "border-purple-400", text: "text-purple-700 dark:text-purple-300", hover: "hover:bg-purple-200 dark:hover:bg-purple-800/60" },
  "Sesli": { bg: "bg-orange-100 dark:bg-orange-900/40", border: "border-orange-400", text: "text-orange-700 dark:text-orange-300", hover: "hover:bg-orange-200 dark:hover:bg-orange-800/60" },
};

const turEmojileri: Record<string, string> = {
  "Sayısal": "🔢",
  "Metinsel": "📝",
  "Görsel": "🖼️",
  "Sesli": "🔊",
};

function karistir<T>(dizi: T[]): T[] {
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

export default function VeriTuruAvcisi() {
  const [oyunDurumu, setOyunDurumu] = useState<"bekliyor" | "oynuyor" | "bitti">("bekliyor");
  const [karisikListe, setKarisikListe] = useState<VeriOgesi[]>([]);
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [enYuksekSkor, setEnYuksekSkor] = useState(0);
  const [kalanSure, setKalanSure] = useState(30);
  const [sonSecim, setSonSecim] = useState<{ dogru: boolean; dogruCevap: string } | null>(null);
  const [animasyon, setAnimasyon] = useState(false);
  const [streak, setStreak] = useState(0);

  const oyunuBaslat = useCallback(() => {
    setKarisikListe(karistir(veriListesi));
    setMevcutIndex(0);
    setSkor(0);
    setKalanSure(30);
    setSonSecim(null);
    setAnimasyon(false);
    setStreak(0);
    setOyunDurumu("oynuyor");
  }, []);

  useEffect(() => {
    if (oyunDurumu !== "oynuyor") return;
    if (kalanSure <= 0) {
      setOyunDurumu("bitti");
      setEnYuksekSkor((onceki) => Math.max(onceki, skor));
      return;
    }
    const zamanlayici = setTimeout(() => setKalanSure((s) => s - 1), 1000);
    return () => clearTimeout(zamanlayici);
  }, [kalanSure, oyunDurumu, skor]);

  const secimYap = useCallback(
    (secilen: string) => {
      if (oyunDurumu !== "oynuyor" || mevcutIndex >= karisikListe.length) return;

      const mevcutOge = karisikListe[mevcutIndex];
      const dogruMu = secilen === mevcutOge.tur;

      if (dogruMu) {
        setSkor((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }

      setSonSecim({ dogru: dogruMu, dogruCevap: mevcutOge.tur });
      setAnimasyon(true);

      setTimeout(() => {
        setAnimasyon(false);
        setSonSecim(null);
        const yeniIndex = mevcutIndex + 1;
        if (yeniIndex >= karisikListe.length) {
          setOyunDurumu("bitti");
          setEnYuksekSkor((onceki) => Math.max(onceki, dogruMu ? skor + 1 : skor));
        } else {
          setMevcutIndex(yeniIndex);
        }
      }, 800);
    },
    [oyunDurumu, mevcutIndex, karisikListe, skor]
  );

  const toplam = karisikListe.length || veriListesi.length;
  const ilerlemeYuzdesi = oyunDurumu === "oynuyor" ? ((mevcutIndex) / toplam) * 100 : 0;
  const sureYuzdesi = (kalanSure / 30) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Baslik */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-1">🎯 Veri Türü Avcısı</h2>
          <p className="text-sm opacity-90">
            Verileri doğru türüne sınıflandır!
          </p>
        </div>

        <div className="p-6">
          {/* Bekliyor ekrani */}
          {oyunDurumu === "bekliyor" && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🎯</div>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Veri öğelerini <strong>4 kategoriye</strong> ayır:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(["Sayısal", "Metinsel", "Görsel", "Sesli"] as const).map((tur) => (
                    <div
                      key={tur}
                      className={`${turRenkleri[tur].bg} ${turRenkleri[tur].border} border-2 rounded-xl p-3 ${turRenkleri[tur].text} font-semibold`}
                    >
                      {turEmojileri[tur]} {tur}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ⏱️ 30 saniye süren var! Ne kadar hızlı olabilirsin?
                </p>
                {enYuksekSkor > 0 && (
                  <p className="text-amber-600 dark:text-amber-400 font-semibold">
                    🏆 En yüksek skor: {enYuksekSkor}/{toplam}
                  </p>
                )}
              </div>
              <button
                onClick={oyunuBaslat}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🚀 Oyunu Başlat!
              </button>
            </div>
          )}

          {/* Oyun ekrani */}
          {oyunDurumu === "oynuyor" && karisikListe.length > 0 && (
            <div className="space-y-5">
              {/* Ust bilgi cubugu */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    ⭐ {skor}
                  </span>
                  {streak >= 3 && (
                    <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                      🔥 {streak} seri!
                    </span>
                  )}
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {mevcutIndex + 1} / {toplam}
                </span>
                <span
                  className={`font-bold text-lg ${
                    kalanSure <= 10
                      ? "text-red-500 animate-pulse"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  ⏱️ {kalanSure}s
                </span>
              </div>

              {/* Sure cubugu */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    kalanSure <= 10
                      ? "bg-red-500"
                      : kalanSure <= 20
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${sureYuzdesi}%` }}
                />
              </div>

              {/* Ilerleme cubugu */}
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${ilerlemeYuzdesi}%` }}
                />
              </div>

              {/* Veri ogesi karti */}
              <div
                className={`bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8 text-center border-2 border-indigo-200 dark:border-indigo-700 transition-all duration-300 ${
                  animasyon
                    ? sonSecim?.dogru
                      ? "scale-95 border-green-400 bg-green-50 dark:bg-green-900/30"
                      : "scale-95 border-red-400 bg-red-50 dark:bg-red-900/30"
                    : "hover:shadow-lg"
                }`}
              >
                <div className="text-5xl mb-3">
                  {karisikListe[mevcutIndex].emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {karisikListe[mevcutIndex].ad}
                </h3>
                {sonSecim && (
                  <p
                    className={`mt-2 font-semibold text-sm ${
                      sonSecim.dogru
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {sonSecim.dogru
                      ? "✅ Doğru!"
                      : `❌ Yanlış! Doğrusu: ${sonSecim.dogruCevap}`}
                  </p>
                )}
              </div>

              {/* Secim butonlari */}
              <div className="grid grid-cols-2 gap-3">
                {(["Sayısal", "Metinsel", "Görsel", "Sesli"] as const).map(
                  (tur) => (
                    <button
                      key={tur}
                      onClick={() => secimYap(tur)}
                      disabled={animasyon}
                      className={`${turRenkleri[tur].bg} ${turRenkleri[tur].border} ${turRenkleri[tur].text} ${turRenkleri[tur].hover} border-2 rounded-2xl p-4 font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {turEmojileri[tur]} {tur}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Bitis ekrani */}
          {oyunDurumu === "bitti" && (
            <div className="text-center space-y-5">
              <div className="text-6xl">
                {skor >= 13 ? "🏆" : skor >= 10 ? "🌟" : skor >= 7 ? "👍" : "💪"}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {skor >= 13
                  ? "Muhteşem! Veri Ustası!"
                  : skor >= 10
                  ? "Harika İş!"
                  : skor >= 7
                  ? "İyi Gidiyorsun!"
                  : "Pratik Yapmaya Devam!"}
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 space-y-2">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {skor} / {toplam}
                </p>
                <p className="text-gray-600 dark:text-gray-400">doğru cevap</p>
                {skor === enYuksekSkor && skor > 0 && (
                  <p className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                    🎉 Yeni rekor!
                  </p>
                )}
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 text-left text-sm text-indigo-800 dark:text-indigo-300">
                <p className="font-bold mb-2">💡 Biliyor muydun?</p>
                <p>
                  Yapay zeka modelleri de veriyi türüne göre işler! Sayısal veriler
                  hesaplamalar için, metinsel veriler dil modelleri için, görsel veriler
                  bilgisayarla görme için, sesli veriler ise konuşma tanıma için
                  kullanılır.
                </p>
              </div>

              <button
                onClick={oyunuBaslat}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🔄 Tekrar Oyna
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
