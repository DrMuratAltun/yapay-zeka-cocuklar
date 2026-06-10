"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Hayvan {
  id: number;
  resimUrl: string;
  gizliAd: string;
  dogruCevap: "kedi" | "kopek";
  zorluk: "kolay" | "zor";
  kaynak: string;
}

// Görseller Wikimedia Commons'tan indirilip yerelleştirildi (2026-06-10) —
// dış bağımlılık yok; lisanslar her görselin "kaynak" alanında, cevap sonrası gösterilir.
const hayvanlar: Hayvan[] = [
  // Kediler
  {
    id: 1,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-tekir.jpg",
    gizliAd: "Tekir Kedi",
    dogruCevap: "kedi",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 2,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-siyah.jpg",
    gizliAd: "Siyah Kedi",
    dogruCevap: "kedi",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 3,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-siyam.jpg",
    gizliAd: "Siyam Kedisi",
    dogruCevap: "kedi",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 4,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-mainecoon.jpg",
    gizliAd: "Maine Coon",
    dogruCevap: "kedi",
    zorluk: "zor",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 5,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-sfenks.jpg",
    gizliAd: "Sfenks (Tüysüz Kedi)",
    dogruCevap: "kedi",
    zorluk: "zor",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 6,
    resimUrl: "/etkinlik/veri-etiketleme/kedi-beyaz.jpg",
    gizliAd: "Beyaz Ankara Kedisi",
    dogruCevap: "kedi",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  // Köpekler
  {
    id: 7,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-golden.jpg",
    gizliAd: "Golden Retriever",
    dogruCevap: "kopek",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons (Dietmar Rabich), CC BY-SA 4.0",
  },
  {
    id: 8,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-bulldog.jpg",
    gizliAd: "Bulldog",
    dogruCevap: "kopek",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    id: 9,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-kanis.jpg",
    gizliAd: "Kaniş (Poodle)",
    dogruCevap: "kopek",
    zorluk: "zor",
    kaynak: "Wikimedia Commons, CC BY 2.0",
  },
  {
    id: 10,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-chihuahua.jpg",
    gizliAd: "Chihuahua",
    dogruCevap: "kopek",
    zorluk: "zor",
    kaynak: "Wikimedia Commons, CC BY-SA 3.0",
  },
  {
    id: 11,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-pomeranian.jpg",
    gizliAd: "Pomeranian",
    dogruCevap: "kopek",
    zorluk: "zor",
    kaynak: "Wikimedia Commons, Public Domain",
  },
  {
    id: 12,
    resimUrl: "/etkinlik/veri-etiketleme/kopek-husky.jpg",
    gizliAd: "Sibirya Kurdu (Husky)",
    dogruCevap: "kopek",
    zorluk: "kolay",
    kaynak: "Wikimedia Commons, CC BY 2.5",
  },
];

export default function VeriEtiketleme() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, "kedi" | "kopek">>({});
  const [sure, setSure] = useState(0);
  const [basladi, setBasladi] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [cevapVerildi, setCevapVerildi] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (basladi && !tamamlandi) {
      timerRef.current = setInterval(() => setSure((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [basladi, tamamlandi]);

  const basla = useCallback(() => {
    setBasladi(true);
    setSure(0);
    setCevaplar({});
    setMevcutIndex(0);
    setTamamlandi(false);
    setCevapVerildi(false);
  }, []);

  const cevapVer = useCallback((cevap: "kedi" | "kopek") => {
    setCevaplar((prev) => ({ ...prev, [hayvanlar[mevcutIndex].id]: cevap }));
    setCevapVerildi(true);
  }, [mevcutIndex]);

  const sonrakineGec = useCallback(() => {
    setCevapVerildi(false);
    if (mevcutIndex < hayvanlar.length - 1) {
      setMevcutIndex((i) => i + 1);
    } else {
      setTamamlandi(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [mevcutIndex]);

  const dogruSayisi = Object.entries(cevaplar).filter(
    ([id, cevap]) => hayvanlar.find((h) => h.id === Number(id))?.dogruCevap === cevap
  ).length;

  const dogruluk = tamamlandi ? Math.round((dogruSayisi / hayvanlar.length) * 100) : 0;

  // Karisiklik matrisi (confusion matrix)
  const gercekKedi = hayvanlar.filter((h) => h.dogruCevap === "kedi");
  const gercekKopek = hayvanlar.filter((h) => h.dogruCevap === "kopek");
  const dogruPozitif = gercekKedi.filter((h) => cevaplar[h.id] === "kedi").length;
  const yanlisPozitif = gercekKopek.filter((h) => cevaplar[h.id] === "kedi").length;
  const yanlisNegatif = gercekKedi.filter((h) => cevaplar[h.id] === "kopek").length;
  const dogruNegatif = gercekKopek.filter((h) => cevaplar[h.id] === "kopek").length;

  const dakika = Math.floor(sure / 60);
  const saniye = sure % 60;

  const mevcutHayvan = hayvanlar[mevcutIndex];
  const mevcutCevap = cevaplar[mevcutHayvan?.id];
  const dogruMu = mevcutCevap === mevcutHayvan?.dogruCevap;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Gözetimli Öğrenme ve Veri Etiketleme Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zekanın öğrenmesi için verilere &quot;etiket&quot; eklenmesi gerekir. Örneğin bir kedi fotoğrafına &quot;kedi&quot; etiketi koymak gibi. Buna &quot;gözetimli öğrenme&quot; denir çünkü YZ&apos;ye doğru cevabı gösteriyoruz. Bu etiketler sayesinde YZ, yeni verileri kendi başına tanımayı öğrenebilir.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">🏷️ Veri Etiketleme Atölyesi</h3>
        {basladi && (
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-sky-100 px-3 py-1 font-mono font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              ⏱️ {dakika}:{saniye.toString().padStart(2, "0")}
            </span>
            <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              {Object.keys(cevaplar).length}/{hayvanlar.length}
            </span>
          </div>
        )}
      </div>

      {!basladi ? (
        <div className="rounded-xl bg-violet-50 p-6 text-center dark:bg-violet-900/20">
          <p className="text-4xl">🐱🐕</p>
          <h4 className="mt-2 text-lg font-bold">Veri Etiketleme Simülasyonu</h4>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {hayvanlar.length} hayvan fotoğrafını &quot;Kedi&quot; veya &quot;Köpek&quot; olarak etiketleyeceksin. Bazıları zor olabilir!
            Bir YZ eğitimcisi gibi verileri doğru etiketlemeye çalış.
          </p>
          <button
            onClick={basla}
            className="mt-4 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Başla!
          </button>
        </div>
      ) : !tamamlandi ? (
        <>
          {/* Ilerleme cubugu */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${((mevcutIndex + 1) / hayvanlar.length) * 100}%` }}
            />
          </div>

          {/* Mevcut hayvan */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mevcutHayvan.resimUrl}
                alt="Etiketlenecek hayvan"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            {mevcutHayvan.zorluk === "zor" && (
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                ⚠️ Zor
              </span>
            )}
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Bu bir kedi mi yoksa köpek mi?
            </p>

            {/* Cevap verdikten sonra gizli adi goster */}
            {cevapVerildi && (
              <div className={`mt-3 rounded-lg p-3 ${dogruMu ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-rose-50 dark:bg-rose-900/20"}`}>
                <p className={`text-sm font-bold ${dogruMu ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                  {dogruMu ? "✅ Doğru!" : "❌ Yanlış!"} Bu bir {mevcutHayvan.dogruCevap === "kedi" ? "kedi" : "köpek"}: <span className="underline">{mevcutHayvan.gizliAd}</span>
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {mevcutHayvan.kaynak}
                </p>
                <button
                  onClick={sonrakineGec}
                  className="mt-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  {mevcutIndex < hayvanlar.length - 1 ? "Sonraki →" : "Sonuçları Gör"}
                </button>
              </div>
            )}

            {!cevapVerildi && (
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => cevapVer("kedi")}
                  className="flex items-center gap-2 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-3 text-lg font-bold transition hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                >
                  🐱 Kedi
                </button>
                <button
                  onClick={() => cevapVer("kopek")}
                  className="flex items-center gap-2 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-3 text-lg font-bold transition hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  🐕 Köpek
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Sonuclar */}
          <div className="rounded-xl bg-violet-50 p-6 dark:bg-violet-900/20">
            <h4 className="mb-4 text-center text-xl font-bold">📊 Etiketleme Sonuçları</h4>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-white/60 p-3 text-center dark:bg-black/20">
                <p className="text-2xl font-bold text-emerald-600">{dogruSayisi}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Doğru</p>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center dark:bg-black/20">
                <p className="text-2xl font-bold text-rose-600">{hayvanlar.length - dogruSayisi}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Yanlış</p>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center dark:bg-black/20">
                <p className="text-2xl font-bold text-sky-600">%{dogruluk}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Doğruluk</p>
              </div>
              <div className="rounded-lg bg-white/60 p-3 text-center dark:bg-black/20">
                <p className="text-2xl font-bold text-amber-600">{dakika}:{saniye.toString().padStart(2, "0")}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Süre</p>
              </div>
            </div>

            {/* Karisiklik matrisi */}
            <div className="rounded-lg bg-white/60 p-4 dark:bg-black/20">
              <h5 className="mb-3 text-center text-sm font-bold">Karışıklık Matrisi (Confusion Matrix)</h5>
              <div className="overflow-x-auto">
                <table className="mx-auto border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="p-2" />
                      <th className="p-2" />
                      <th colSpan={2} className="border-b border-[var(--color-border)] p-2 text-center font-bold">
                        Senin Etiketin
                      </th>
                    </tr>
                    <tr>
                      <th className="p-2" />
                      <th className="p-2" />
                      <th className="p-2 text-center font-semibold">🐱 Kedi</th>
                      <th className="p-2 text-center font-semibold">🐕 Köpek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th rowSpan={2} className="border-r border-[var(--color-border)] p-2 text-center font-bold [writing-mode:vertical-rl] rotate-180">
                        Gerçek
                      </th>
                      <th className="p-2 text-center font-semibold">🐱 Kedi</th>
                      <td className="p-2 text-center">
                        <span className="rounded bg-emerald-200 px-3 py-1 font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                          {dogruPozitif}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="rounded bg-rose-200 px-3 py-1 font-bold text-rose-800 dark:bg-rose-800 dark:text-rose-200">
                          {yanlisNegatif}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="p-2 text-center font-semibold">🐕 Köpek</th>
                      <td className="p-2 text-center">
                        <span className="rounded bg-rose-200 px-3 py-1 font-bold text-rose-800 dark:bg-rose-800 dark:text-rose-200">
                          {yanlisPozitif}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span className="rounded bg-emerald-200 px-3 py-1 font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                          {dogruNegatif}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-center text-xs text-[var(--color-text-secondary)]">
                Yeşil = doğru etiketleme, Kırmızı = yanlış etiketleme
              </p>
            </div>

            {/* Hatali etiketlemeler */}
            {hayvanlar.length - dogruSayisi > 0 && (
              <div className="mt-4 rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <h5 className="mb-2 text-sm font-bold">❌ Yanlış etiketlenenler:</h5>
                <div className="space-y-2 text-sm">
                  {hayvanlar
                    .filter((h) => cevaplar[h.id] !== h.dogruCevap)
                    .map((h) => (
                      <div key={h.id} className="flex items-center gap-2">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={h.resimUrl} alt={h.gizliAd} className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium">{h.gizliAd}</span>
                        <span className="text-rose-600">(Sen: {cevaplar[h.id] === "kedi" ? "Kedi" : "Köpek"})</span>
                        <span className="text-emerald-600">(Doğru: {h.dogruCevap === "kedi" ? "Kedi" : "Köpek"})</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-4 rounded-lg bg-amber-100/60 p-3 text-sm dark:bg-amber-900/20">
              <p className="font-medium text-amber-800 dark:text-amber-300">
                {dogruluk >= 90
                  ? "🌟 Harika! Neredeyse mükemmel bir etiketleyicisin!"
                  : dogruluk >= 70
                  ? "👍 İyi iş! Ama bazı zor örneklerde yanıldın. Gerçek YZ eğitiminde de bu tür karışıklıklar yaşanır."
                  : "🤔 Bazı hayvanları karıştırdın. Bu, veri etiketlemenin ne kadar zor olabileceğini gösteriyor!"}
              </p>
            </div>
          </div>

          <button
            onClick={basla}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Tekrar Dene
          </button>
        </>
      )}
    </div>
  );
}
