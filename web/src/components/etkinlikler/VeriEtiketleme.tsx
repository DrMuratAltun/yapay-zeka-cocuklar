"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Hayvan {
  id: number;
  emoji: string;
  aciklama: string;
  dogruCevap: "kedi" | "kopek";
  zorluk: "kolay" | "zor";
}

const hayvanlar: Hayvan[] = [
  { id: 1, emoji: "🐱", aciklama: "Tekir kedi", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 2, emoji: "🐕", aciklama: "Golden Retriever", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 3, emoji: "🐱", aciklama: "Siyah kedi", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 4, emoji: "🐕", aciklama: "Bulldog", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 5, emoji: "🐈", aciklama: "Beyaz Van kedisi", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 6, emoji: "🐕‍🦺", aciklama: "Rehber köpek", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 7, emoji: "🐈‍⬛", aciklama: "Tüylü siyah kedi (köpek gibi büyük)", dogruCevap: "kedi", zorluk: "zor" },
  { id: 8, emoji: "🐩", aciklama: "Küçük kaniş (kedi gibi küçük)", dogruCevap: "kopek", zorluk: "zor" },
  { id: 9, emoji: "🐱", aciklama: "Maine Coon (köpek kadar büyük kedi)", dogruCevap: "kedi", zorluk: "zor" },
  { id: 10, emoji: "🐕", aciklama: "Çivava (kedi kadar küçük köpek)", dogruCevap: "kopek", zorluk: "zor" },
  { id: 11, emoji: "🐱", aciklama: "Sokak kedisi", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 12, emoji: "🐕", aciklama: "Kurt köpeği (Husky)", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 13, emoji: "🐈", aciklama: "Siyam kedisi", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 14, emoji: "🐕", aciklama: "Kangal (Türk çoban köpeği)", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 15, emoji: "🐱", aciklama: "Tüysüz Sfenks kedi (garip görünümlü)", dogruCevap: "kedi", zorluk: "zor" },
  { id: 16, emoji: "🐕", aciklama: "Pomeranian (kedi gibi tüylü köpek)", dogruCevap: "kopek", zorluk: "zor" },
  { id: 17, emoji: "🐈", aciklama: "Ankara kedisi (uzun tüylü)", dogruCevap: "kedi", zorluk: "kolay" },
  { id: 18, emoji: "🐕", aciklama: "Akbaş çoban köpeği", dogruCevap: "kopek", zorluk: "kolay" },
  { id: 19, emoji: "🐱", aciklama: "Ragdoll kedi (köpek gibi davranır)", dogruCevap: "kedi", zorluk: "zor" },
  { id: 20, emoji: "🐕", aciklama: "Shih Tzu (kedi gibi bağımsız köpek)", dogruCevap: "kopek", zorluk: "zor" },
];

export default function VeriEtiketleme() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, "kedi" | "kopek">>({});
  const [sure, setSure] = useState(0);
  const [basladi, setBasladi] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);
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
  }, []);

  const cevapVer = useCallback((cevap: "kedi" | "kopek") => {
    setCevaplar((prev) => ({ ...prev, [hayvanlar[mevcutIndex].id]: cevap }));
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

  // Karışıklık matrisi (confusion matrix)
  const gercekKedi = hayvanlar.filter((h) => h.dogruCevap === "kedi");
  const gercekKopek = hayvanlar.filter((h) => h.dogruCevap === "kopek");
  const dogruPozitif = gercekKedi.filter((h) => cevaplar[h.id] === "kedi").length; // kedi->kedi
  const yanlisPozitif = gercekKopek.filter((h) => cevaplar[h.id] === "kedi").length; // köpek->kedi
  const yanlisNegatif = gercekKedi.filter((h) => cevaplar[h.id] === "kopek").length; // kedi->köpek
  const dogruNegatif = gercekKopek.filter((h) => cevaplar[h.id] === "kopek").length; // köpek->köpek

  const dakika = Math.floor(sure / 60);
  const saniye = sure % 60;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
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
            20 hayvanı &quot;Kedi&quot; veya &quot;Köpek&quot; olarak etiketleyeceksin. Bazıları zor olabilir!
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
          {/* İlerleme çubuğu */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${((mevcutIndex + 1) / hayvanlar.length) * 100}%` }}
            />
          </div>

          {/* Mevcut hayvan */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <span className="text-6xl">{hayvanlar[mevcutIndex].emoji}</span>
            <p className="mt-3 text-lg font-bold">{hayvanlar[mevcutIndex].aciklama}</p>
            {hayvanlar[mevcutIndex].zorluk === "zor" && (
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                ⚠️ Zor
              </span>
            )}
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Bu bir kedi mi yoksa köpek mi?
            </p>

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
          </div>
        </>
      ) : (
        <>
          {/* Sonuçlar */}
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

            {/* Karışıklık matrisi */}
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

            {/* Hatalı etiketlemeler */}
            {hayvanlar.length - dogruSayisi > 0 && (
              <div className="mt-4 rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <h5 className="mb-2 text-sm font-bold">❌ Yanlış etiketlenenler:</h5>
                <div className="space-y-1 text-sm">
                  {hayvanlar
                    .filter((h) => cevaplar[h.id] !== h.dogruCevap)
                    .map((h) => (
                      <div key={h.id} className="flex items-center gap-2">
                        <span>{h.emoji}</span>
                        <span>{h.aciklama}</span>
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
