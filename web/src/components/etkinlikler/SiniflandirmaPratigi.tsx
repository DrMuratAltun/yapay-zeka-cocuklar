"use client";

import { useState, useCallback } from "react";

interface Nesne {
  ad: string;
  emoji: string;
  ozellikler: {
    renk: string;
    sekil: string;
    boyut: string;
    tur: string;
  };
  kategori: string;
}

interface Kural {
  ozellik: keyof Nesne["ozellikler"];
  deger: string;
  sonuc: string;
}

const nesneler: Nesne[] = [
  { ad: "Elma", emoji: "🍎", ozellikler: { renk: "kırmızı", sekil: "yuvarlak", boyut: "orta", tur: "meyve" }, kategori: "meyve" },
  { ad: "Portakal", emoji: "🍊", ozellikler: { renk: "turuncu", sekil: "yuvarlak", boyut: "orta", tur: "meyve" }, kategori: "meyve" },
  { ad: "Muz", emoji: "🍌", ozellikler: { renk: "sarı", sekil: "uzun", boyut: "orta", tur: "meyve" }, kategori: "meyve" },
  { ad: "Havuç", emoji: "🥕", ozellikler: { renk: "turuncu", sekil: "uzun", boyut: "orta", tur: "sebze" }, kategori: "sebze" },
  { ad: "Brokoli", emoji: "🥦", ozellikler: { renk: "yeşil", sekil: "yuvarlak", boyut: "orta", tur: "sebze" }, kategori: "sebze" },
  { ad: "Domates", emoji: "🍅", ozellikler: { renk: "kırmızı", sekil: "yuvarlak", boyut: "küçük", tur: "sebze" }, kategori: "sebze" },
  { ad: "Kedi", emoji: "🐱", ozellikler: { renk: "çok renkli", sekil: "dört ayaklı", boyut: "orta", tur: "hayvan" }, kategori: "hayvan" },
  { ad: "Köpek", emoji: "🐶", ozellikler: { renk: "çok renkli", sekil: "dört ayaklı", boyut: "büyük", tur: "hayvan" }, kategori: "hayvan" },
  { ad: "Kuş", emoji: "🐦", ozellikler: { renk: "çok renkli", sekil: "kanatlı", boyut: "küçük", tur: "hayvan" }, kategori: "hayvan" },
  { ad: "Araba", emoji: "🚗", ozellikler: { renk: "çok renkli", sekil: "dikdörtgen", boyut: "büyük", tur: "araç" }, kategori: "araç" },
  { ad: "Bisiklet", emoji: "🚲", ozellikler: { renk: "çok renkli", sekil: "iki tekerlekli", boyut: "orta", tur: "araç" }, kategori: "araç" },
  { ad: "Uçak", emoji: "✈️", ozellikler: { renk: "beyaz", sekil: "kanatlı", boyut: "büyük", tur: "araç" }, kategori: "araç" },
];

const ozellikSecenekleri: Record<keyof Nesne["ozellikler"], string[]> = {
  renk: ["kırmızı", "turuncu", "sarı", "yeşil", "beyaz", "çok renkli"],
  sekil: ["yuvarlak", "uzun", "dört ayaklı", "kanatlı", "dikdörtgen", "iki tekerlekli"],
  boyut: ["küçük", "orta", "büyük"],
  tur: ["meyve", "sebze", "hayvan", "araç"],
};

const ozellikEtiketleri: Record<keyof Nesne["ozellikler"], string> = {
  renk: "Renk",
  sekil: "Şekil",
  boyut: "Boyut",
  tur: "Tür",
};

const kategoriler = ["meyve", "sebze", "hayvan", "araç"];

export default function SiniflandirmaPratigi() {
  const [kurallar, setKurallar] = useState<Kural[]>([]);
  const [testSonucu, setTestSonucu] = useState<{
    dogru: number;
    toplam: number;
    detaylar: { nesne: Nesne; tahmin: string; dogru: boolean }[];
  } | null>(null);
  const [yeniKural, setYeniKural] = useState<Kural>({
    ozellik: "tur",
    deger: "meyve",
    sonuc: "meyve",
  });
  const [adim, setAdim] = useState<"ogren" | "kural" | "test">("ogren");

  const kuralEkle = useCallback(() => {
    setKurallar((prev) => [...prev, { ...yeniKural }]);
    setTestSonucu(null);
  }, [yeniKural]);

  const kuralSil = useCallback((index: number) => {
    setKurallar((prev) => prev.filter((_, i) => i !== index));
    setTestSonucu(null);
  }, []);

  const testEt = useCallback(() => {
    const detaylar = nesneler.map((nesne) => {
      let tahmin = "bilinmiyor";
      for (const kural of kurallar) {
        if (nesne.ozellikler[kural.ozellik] === kural.deger) {
          tahmin = kural.sonuc;
          break;
        }
      }
      return {
        nesne,
        tahmin,
        dogru: tahmin === nesne.kategori,
      };
    });
    const dogru = detaylar.filter((d) => d.dogru).length;
    setTestSonucu({ dogru, toplam: nesneler.length, detaylar });
  }, [kurallar]);

  const basariYuzdesi = testSonucu
    ? Math.round((testSonucu.dogru / testSonucu.toplam) * 100)
    : 0;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Makine Öğrenmesinde Sınıflandırma Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Sınıflandırma, yapay zekanın en temel görevlerinden biridir. Nesneleri özelliklerine göre gruplara ayırmak demektir. Örneğin e-postaları &quot;spam&quot; ve &quot;spam değil&quot; diye ayırmak bir sınıflandırma işlemidir. YZ, verdiğin örneklerden kurallar öğrenerek yeni verileri doğru sınıfa yerleştirir.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">🔬 Sınıflandırma Pratiği</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Kendi sınıflandırma kurallarını oluştur ve test et!
        </p>
      </div>

      {/* Adım Sekmeleri */}
      <div className="flex gap-1 rounded-xl bg-[var(--color-bg-secondary)] p-1">
        {[
          { id: "ogren" as const, etiket: "1. Nesneleri Tanı", icon: "👀" },
          { id: "kural" as const, etiket: "2. Kural Oluştur", icon: "📏" },
          { id: "test" as const, etiket: "3. Test Et", icon: "🧪" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setAdim(s.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              adim === s.id
                ? "bg-orange-500 text-white shadow-md"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
            }`}
          >
            {s.icon} {s.etiket}
          </button>
        ))}
      </div>

      {/* Adım 1: Nesneleri Tanı */}
      {adim === "ogren" && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Aşağıdaki nesnelerin özelliklerini incele. Sonra kural oluşturarak onları sınıflandırmaya çalışacaksın.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nesneler.map((nesne) => (
              <div
                key={nesne.ad}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 transition-all hover:shadow-md"
              >
                <div className="mb-2 text-center text-3xl">{nesne.emoji}</div>
                <h4 className="text-center font-bold">{nesne.ad}</h4>
                <div className="mt-2 space-y-1 text-xs">
                  {Object.entries(nesne.ozellikler).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">
                        {ozellikEtiketleri[key as keyof Nesne["ozellikler"]]}:
                      </span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {nesne.kategori}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setAdim("kural")}
            className="mx-auto flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2 font-bold text-white transition-all hover:bg-orange-600"
          >
            Kural Oluşturmaya Başla →
          </button>
        </div>
      )}

      {/* Adım 2: Kural Oluştur */}
      {adim === "kural" && (
        <div className="space-y-4">
          <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
            <p className="text-sm font-medium text-sky-800 dark:text-sky-300">
              💡 Kural formülü: &quot;Eğer [özellik] = [değer] ise → [kategori]&quot;
            </p>
          </div>

          {/* Yeni Kural Ekleme */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
            <h4 className="mb-3 font-bold text-orange-700 dark:text-orange-300">Yeni Kural Ekle</h4>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Eğer</span>
              <select
                value={yeniKural.ozellik}
                onChange={(e) =>
                  setYeniKural((prev) => ({
                    ...prev,
                    ozellik: e.target.value as keyof Nesne["ozellikler"],
                    deger: ozellikSecenekleri[e.target.value as keyof Nesne["ozellikler"]][0],
                  }))
                }
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm"
              >
                {Object.entries(ozellikEtiketleri).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <span className="text-sm">=</span>
              <select
                value={yeniKural.deger}
                onChange={(e) => setYeniKural((prev) => ({ ...prev, deger: e.target.value }))}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm"
              >
                {ozellikSecenekleri[yeniKural.ozellik].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="text-sm">ise →</span>
              <select
                value={yeniKural.sonuc}
                onChange={(e) => setYeniKural((prev) => ({ ...prev, sonuc: e.target.value }))}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm"
              >
                {kategoriler.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <button
                onClick={kuralEkle}
                className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-bold text-white transition-all hover:bg-orange-600"
              >
                + Ekle
              </button>
            </div>
          </div>

          {/* Mevcut Kurallar */}
          <div className="space-y-2">
            <h4 className="font-bold">Kurallarım ({kurallar.length})</h4>
            {kurallar.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)] italic">
                Henüz kural eklenmedi. Yukarıdan kural ekleyin.
              </p>
            ) : (
              kurallar.map((kural, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2"
                >
                  <span className="text-sm">
                    <span className="font-medium text-orange-600 dark:text-orange-400">Kural {i + 1}:</span>{" "}
                    Eğer {ozellikEtiketleri[kural.ozellik]} = &quot;{kural.deger}&quot; ise →{" "}
                    <span className="font-bold">{kural.sonuc}</span>
                  </span>
                  <button
                    onClick={() => kuralSil(i)}
                    className="rounded-lg px-2 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {kurallar.length > 0 && (
            <button
              onClick={() => {
                testEt();
                setAdim("test");
              }}
              className="mx-auto flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2 font-bold text-white transition-all hover:bg-emerald-600"
            >
              🧪 Kuralları Test Et →
            </button>
          )}
        </div>
      )}

      {/* Adım 3: Test Sonuçları */}
      {adim === "test" && testSonucu && (
        <div className="space-y-4">
          {/* Başarı Oranı */}
          <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-6 text-center dark:border-orange-700 dark:bg-orange-900/20">
            <div className="text-5xl font-extrabold text-orange-600 dark:text-orange-400">
              %{basariYuzdesi}
            </div>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {testSonucu.dogru} / {testSonucu.toplam} doğru sınıflandırma
            </p>
            <div className="mx-auto mt-3 h-4 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  basariYuzdesi >= 80
                    ? "bg-emerald-500"
                    : basariYuzdesi >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${basariYuzdesi}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium">
              {basariYuzdesi >= 80
                ? "🎉 Harika! Kuralların çok başarılı!"
                : basariYuzdesi >= 50
                  ? "👍 İyi bir başlangıç! Daha fazla kural ekleyerek geliştirebilirsin."
                  : "🤔 Kurallarını gözden geçir, daha fazla kural eklemeyi dene!"}
            </p>
          </div>

          {/* Detaylı Sonuçlar */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {testSonucu.detaylar.map((d, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  d.dogru
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
                    : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                }`}
              >
                <span className="text-2xl">{d.nesne.emoji}</span>
                <div className="text-sm">
                  <p className="font-medium">{d.nesne.ad}</p>
                  <p className="text-xs">
                    Tahmin: <span className="font-bold">{d.tahmin}</span>
                    {" · "}
                    Gerçek: <span className="font-bold">{d.nesne.kategori}</span>
                  </p>
                </div>
                <span className="ml-auto text-lg">{d.dogru ? "✅" : "❌"}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setAdim("kural")}
              className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-orange-600"
            >
              ← Kuralları Düzenle
            </button>
            <button
              onClick={() => {
                setKurallar([]);
                setTestSonucu(null);
                setAdim("ogren");
              }}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2 text-sm font-bold transition-all hover:bg-[var(--color-bg)]"
            >
              🔄 Baştan Başla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
