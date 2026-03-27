"use client";

import { useState } from "react";

interface TestItem {
  id: number;
  gorselAciklama: string;
  modelTahmini: string;
  gercekCevap: string;
  kategori: string;
}

const testVerileri: TestItem[] = [
  { id: 1, gorselAciklama: "Kırmızı elma fotoğrafı", modelTahmini: "Elma", gercekCevap: "Elma", kategori: "Meyve" },
  { id: 2, gorselAciklama: "Sarı muz fotoğrafı", modelTahmini: "Muz", gercekCevap: "Muz", kategori: "Meyve" },
  { id: 3, gorselAciklama: "Turuncu havuç fotoğrafı", modelTahmini: "Portakal", gercekCevap: "Havuç", kategori: "Sebze" },
  { id: 4, gorselAciklama: "Yeşil salatalık fotoğrafı", modelTahmini: "Kabak", gercekCevap: "Salatalık", kategori: "Sebze" },
  { id: 5, gorselAciklama: "Mor patlıcan fotoğrafı", modelTahmini: "Patlıcan", gercekCevap: "Patlıcan", kategori: "Sebze" },
  { id: 6, gorselAciklama: "Kırmızı domates fotoğrafı", modelTahmini: "Elma", gercekCevap: "Domates", kategori: "Sebze" },
  { id: 7, gorselAciklama: "Yeşil elma fotoğrafı", modelTahmini: "Armut", gercekCevap: "Elma", kategori: "Meyve" },
  { id: 8, gorselAciklama: "Turuncu portakal fotoğrafı", modelTahmini: "Portakal", gercekCevap: "Portakal", kategori: "Meyve" },
  { id: 9, gorselAciklama: "Kırmızı çilek fotoğrafı", modelTahmini: "Çilek", gercekCevap: "Çilek", kategori: "Meyve" },
  { id: 10, gorselAciklama: "Yeşil biber fotoğrafı", modelTahmini: "Biber", gercekCevap: "Biber", kategori: "Sebze" },
];

export default function ModelBasariRaporu() {
  const [asamaIdx, setAsamaIdx] = useState(0); // 0: intro, 1: test, 2: sonuc
  const [currentItem, setCurrentItem] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, "dogru" | "yanlis">>({});

  const handleCevap = (itemId: number, cevap: "dogru" | "yanlis") => {
    setCevaplar((prev) => ({ ...prev, [itemId]: cevap }));
  };

  const ilerle = () => {
    if (currentItem < testVerileri.length - 1) {
      setCurrentItem((p) => p + 1);
    } else {
      setAsamaIdx(2);
    }
  };

  const tumCevaplandi = Object.keys(cevaplar).length === testVerileri.length;
  const dogruSayisi = Object.entries(cevaplar).filter(
    ([id, c]) => {
      const item = testVerileri.find((t) => t.id === Number(id));
      if (!item) return false;
      const gercekDogruMu = item.modelTahmini === item.gercekCevap;
      return (gercekDogruMu && c === "dogru") || (!gercekDogruMu && c === "yanlis");
    }
  ).length;

  // Confusion matrix hesaplama
  const dogruPozitif = testVerileri.filter((t) => t.modelTahmini === t.gercekCevap).length;
  const yanlisPozitif = testVerileri.filter((t) => t.modelTahmini !== t.gercekCevap).length;
  const basariOrani = Math.round((dogruPozitif / testVerileri.length) * 100);
  const ogrenciBasarisi = Math.round((dogruSayisi / testVerileri.length) * 100);

  const sifirla = () => {
    setAsamaIdx(0);
    setCurrentItem(0);
    setCevaplar({});
  };

  if (asamaIdx === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
          <span className="text-sm text-[var(--color-text-secondary)]">15 dakika &middot; Bireysel</span>
        </div>
        <h3 className="mb-3 text-xl font-bold">Model Başarı Raporu</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Bir meyve-sebze sınıflandırma modelinin tahminlerini değerlendir!
          Model 10 görsel için tahmin yaptı. Senin görevin her tahminin doğru mu yanlış mı olduğunu belirlemek.
        </p>
        <div className="mb-4 rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
          <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
            📊 Nasıl çalışır: Her adımda görselin açıklamasını, modelin tahminini ve gerçek cevabı göreceksin.
            Modelin tahmini doğru mu yanlış mı belirle!
          </p>
        </div>
        <button
          onClick={() => setAsamaIdx(1)}
          className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          Teste Başla
        </button>
      </div>
    );
  }

  if (asamaIdx === 1) {
    const item = testVerileri[currentItem];
    const cevapVerildi = cevaplar[item.id] !== undefined;
    const progress = ((currentItem + 1) / testVerileri.length) * 100;

    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Model Başarı Raporu</h3>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
            {currentItem + 1} / {testVerileri.length}
          </span>
        </div>

        {/* İlerleme çubuğu */}
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Test kartı */}
        <div className="mb-6 rounded-xl border-2 border-orange-200 bg-white p-5 dark:border-orange-800 dark:bg-gray-800">
          {/* Görsel açıklaması */}
          <div className="mb-4 flex items-center justify-center rounded-lg bg-gray-100 p-6 dark:bg-gray-700">
            <div className="text-center">
              <span className="mb-2 block text-4xl">🖼️</span>
              <p className="text-lg font-medium">{item.gorselAciklama}</p>
              <span className="mt-1 inline-block rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                {item.kategori}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Modelin Tahmini</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{item.modelTahmini}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <p className="text-xs font-medium text-green-600 dark:text-green-400">Gerçek Cevap</p>
              <p className="text-lg font-bold text-green-800 dark:text-green-200">{item.gercekCevap}</p>
            </div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => handleCevap(item.id, "dogru")}
            className={`flex-1 rounded-xl border-2 px-4 py-3 font-bold transition ${
              cevaplar[item.id] === "dogru"
                ? "border-green-500 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                : "border-[var(--color-border)] hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10"
            }`}
          >
            ✅ Doğru Tahmin
          </button>
          <button
            onClick={() => handleCevap(item.id, "yanlis")}
            className={`flex-1 rounded-xl border-2 px-4 py-3 font-bold transition ${
              cevaplar[item.id] === "yanlis"
                ? "border-red-500 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                : "border-[var(--color-border)] hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
            }`}
          >
            ❌ Yanlış Tahmin
          </button>
        </div>

        {cevapVerildi && (
          <button
            onClick={ilerle}
            className="w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            {currentItem < testVerileri.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör"}
          </button>
        )}
      </div>
    );
  }

  // asamaIdx === 2: Sonuç ekranı
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Model Değerlendirme Metrikleri Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Bir yapay zeka modelinin ne kadar iyi çalıştığını ölçmek için başarı oranı, kesinlik ve duyarlılık gibi metrikler kullanılır. %100 başarı her zaman mümkün değildir. Önemli olan, modelin hangi hataları yaptığını anlamak ve onu geliştirmektir.
        </p>
      </div>

      <h3 className="mb-6 text-center text-2xl font-extrabold">📊 Model Başarı Raporu</h3>

      {/* Başarı Kartları */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 p-5 text-center dark:border-orange-700 dark:from-orange-900/20 dark:to-amber-900/20">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Modelin Başarı Oranı</p>
          <p className="my-2 text-5xl font-extrabold text-orange-600 dark:text-orange-400">%{basariOrani}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{dogruPozitif} doğru / {testVerileri.length} toplam</p>
        </div>
        <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 text-center dark:border-blue-700 dark:from-blue-900/20 dark:to-cyan-900/20">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Senin Değerlendirme Başarın</p>
          <p className="my-2 text-5xl font-extrabold text-blue-600 dark:text-blue-400">%{ogrenciBasarisi}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{dogruSayisi} doğru değerlendirme / {testVerileri.length} toplam</p>
        </div>
      </div>

      {/* Basitleştirilmiş Karmaşıklık Matrisi */}
      <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <h4 className="mb-3 text-center text-lg font-bold">Karmaşıklık Matrisi (Confusion Matrix)</h4>
        <div className="mx-auto max-w-xs">
          <div className="grid grid-cols-3 gap-1 text-center text-sm">
            <div />
            <div className="rounded-t bg-green-100 p-2 font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300">Doğru</div>
            <div className="rounded-t bg-red-100 p-2 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">Yanlış</div>
            <div className="rounded-l bg-blue-100 p-2 font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Tahmin</div>
            <div className="bg-green-200 p-3 text-2xl font-extrabold text-green-800 dark:bg-green-800/40 dark:text-green-200">{dogruPozitif}</div>
            <div className="bg-red-200 p-3 text-2xl font-extrabold text-red-800 dark:bg-red-800/40 dark:text-red-200">{yanlisPozitif}</div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-[var(--color-text-secondary)]">
          Doğru Pozitif (DP): Model doğru tahmin etti &middot; Yanlış Pozitif (YP): Model yanlış tahmin etti
        </p>
      </div>

      {/* Detaylı sonuçlar */}
      <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <h4 className="mb-3 text-lg font-bold">Detaylı Sonuçlar</h4>
        <div className="space-y-2">
          {testVerileri.map((item) => {
            const modelDogruMu = item.modelTahmini === item.gercekCevap;
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-lg p-2 text-sm ${
                  modelDogruMu
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-red-50 dark:bg-red-900/10"
                }`}
              >
                <span className="font-medium">{item.gorselAciklama}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-text-secondary)]">
                    {item.modelTahmini} → {item.gercekCevap}
                  </span>
                  <span>{modelDogruMu ? "✅" : "❌"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Yorum */}
      <div className="mb-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          {basariOrani >= 80
            ? "🌟 Bu model oldukça başarılı! Eğitim verisi kaliteli ve yeterli olmuş."
            : basariOrani >= 60
            ? "📈 Model fena değil ama geliştirilebilir. Daha fazla ve çeşitli eğitim verisi ile başarı artırılabilir."
            : "⚠️ Model geliştirilmeli. Eğitim verisi yetersiz veya dengesiz olabilir. Daha fazla örnek ekleyelim!"}
        </p>
      </div>

      <button
        onClick={sifirla}
        className="w-full rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
      >
        Testi Tekrarla
      </button>
    </div>
  );
}
