"use client";

import { useState, useCallback, useMemo } from "react";

interface Icerik {
  id: number;
  isim: string;
  tur: string;
  etiketler: string[];
  emoji: string;
}

const tumIcerikler: Icerik[] = [
  { id: 1, isim: "Uzay Macerası", tur: "Bilim Kurgu", etiketler: ["bilim-kurgu", "macera", "uzay"], emoji: "🚀" },
  { id: 2, isim: "Gizemli Orman", tur: "Gizem", etiketler: ["gizem", "doğa", "macera"], emoji: "🌲" },
  { id: 3, isim: "Matematik Sihirbazı", tur: "Eğitim", etiketler: ["eğitim", "matematik", "bilim"], emoji: "🔢" },
  { id: 4, isim: "Süper Kahraman Okulu", tur: "Macera", etiketler: ["macera", "fantastik", "komedi"], emoji: "🦸" },
  { id: 5, isim: "Denizaltı Keşfi", tur: "Belgesel", etiketler: ["doğa", "bilim", "keşif"], emoji: "🐠" },
];

const oneriHavuzu: Icerik[] = [
  { id: 6, isim: "Galaksiler Arası", tur: "Bilim Kurgu", etiketler: ["bilim-kurgu", "uzay", "macera"], emoji: "🌌" },
  { id: 7, isim: "Kayıp Şehir", tur: "Gizem", etiketler: ["gizem", "macera", "tarih"], emoji: "🏛️" },
  { id: 8, isim: "Robotlar Diyarı", tur: "Bilim Kurgu", etiketler: ["bilim-kurgu", "teknoloji", "macera"], emoji: "🤖" },
  { id: 9, isim: "Doğa Belgeseli", tur: "Belgesel", etiketler: ["doğa", "bilim", "hayvanlar"], emoji: "🦁" },
  { id: 10, isim: "Komik Dostlar", tur: "Komedi", etiketler: ["komedi", "arkadaşlık", "eğlence"], emoji: "😂" },
  { id: 11, isim: "Bilim Deneyleri", tur: "Eğitim", etiketler: ["eğitim", "bilim", "deney"], emoji: "🧪" },
  { id: 12, isim: "Zaman Yolcusu", tur: "Bilim Kurgu", etiketler: ["bilim-kurgu", "tarih", "macera"], emoji: "⏰" },
  { id: 13, isim: "Orman Hayvanları", tur: "Belgesel", etiketler: ["doğa", "hayvanlar", "keşif"], emoji: "🦊" },
  { id: 14, isim: "Korsan Hazinesi", tur: "Macera", etiketler: ["macera", "tarih", "keşif"], emoji: "🏴‍☠️" },
  { id: 15, isim: "Kod Kahramanı", tur: "Eğitim", etiketler: ["eğitim", "teknoloji", "bilim"], emoji: "💻" },
];

export default function OneriSistemiSim() {
  const [puanlar, setPuanlar] = useState<Record<number, number>>({});
  const [adiim, setAdim] = useState<"puanlama" | "sonuc">("puanlama");

  const puanVer = useCallback((icerikId: number, puan: number) => {
    setPuanlar((prev) => ({ ...prev, [icerikId]: puan }));
  }, []);

  const oneriler = useMemo(() => {
    if (Object.keys(puanlar).length < tumIcerikler.length) return [];

    // Etiket ağırlıkları hesapla
    const etiketPuanlari: Record<string, number> = {};
    tumIcerikler.forEach((icerik) => {
      const puan = puanlar[icerik.id] || 0;
      icerik.etiketler.forEach((etiket) => {
        etiketPuanlari[etiket] = (etiketPuanlari[etiket] || 0) + puan;
      });
    });

    // Öneri havuzunu puanla
    const skorlar = oneriHavuzu.map((icerik) => {
      let skor = 0;
      icerik.etiketler.forEach((etiket) => {
        skor += etiketPuanlari[etiket] || 0;
      });
      return { icerik, skor };
    });

    // En yüksek puanlı 3 tanesini seç
    skorlar.sort((a, b) => b.skor - a.skor);
    return skorlar.slice(0, 3);
  }, [puanlar]);

  const oneriGoster = useCallback(() => {
    setAdim("sonuc");
  }, []);

  const tekrarOyna = useCallback(() => {
    setPuanlar({});
    setAdim("puanlama");
  }, []);

  const tumPuanlandi = Object.keys(puanlar).length >= tumIcerikler.length;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">🎬 Öneri Sistemi Simülatörü</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          İçerikleri puanla, yapay zekanın sana ne önerdiğini gör!
        </p>
      </div>

      {adiim === "puanlama" ? (
        <>
          {/* Puanlama Aşaması */}
          <div className="mb-6 rounded-xl bg-sky-50 p-4 dark:bg-sky-900/20">
            <p className="text-sm text-sky-800 dark:text-sky-200">
              <span className="font-bold">Adım 1:</span> Aşağıdaki {tumIcerikler.length} içeriği 1-5 yıldız ile puanla.
              Çok sevdiklerine 5, hiç sevmediklerine 1 yıldız ver.
            </p>
          </div>

          <div className="space-y-3">
            {tumIcerikler.map((icerik) => (
              <div
                key={icerik.id}
                className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{icerik.emoji}</span>
                  <div>
                    <h4 className="font-bold">{icerik.isim}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">{icerik.tur}</p>
                  </div>
                </div>
                <div className="flex gap-1 sm:ml-auto">
                  {[1, 2, 3, 4, 5].map((yildiz) => (
                    <button
                      key={yildiz}
                      type="button"
                      onClick={() => puanVer(icerik.id, yildiz)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        (puanlar[icerik.id] || 0) >= yildiz
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      aria-label={`${yildiz} yıldız`}
                    >
                      ⭐
                    </button>
                  ))}
                  {puanlar[icerik.id] && (
                    <span className="ml-2 flex items-center text-sm font-bold text-amber-600">
                      {puanlar[icerik.id]}/5
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={oneriGoster}
              disabled={!tumPuanlandi}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              {tumPuanlandi ? "Önerileri Gör 🤖" : `Puanlama: ${Object.keys(puanlar).length}/${tumIcerikler.length}`}
            </button>
          </div>
        </>
      ) : (
        /* Sonuç Aşaması */
        <div>
          {/* Puanlamalar Özet */}
          <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
            <h3 className="mb-3 font-bold">📊 Senin Puanlamaların:</h3>
            <div className="flex flex-wrap gap-2">
              {tumIcerikler.map((icerik) => (
                <div
                  key={icerik.id}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-700"
                >
                  <span>{icerik.emoji}</span>
                  <span className="font-medium">{icerik.isim}</span>
                  <span className="text-yellow-500">
                    {"⭐".repeat(puanlar[icerik.id] || 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* YZ Analizi */}
          <div className="mb-6 rounded-xl border-2 border-sky-300 bg-sky-50 p-5 dark:border-sky-700 dark:bg-sky-900/20">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-lg font-bold text-sky-700 dark:text-sky-300">
                YZ Analiz Ediyor...
              </h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>
                Puanlarına bakarak etiketlere ağırlık verdim. Yüksek puanladığın
                içeriklerin ortak özelliklerini buldum:
              </p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(
                  tumIcerikler.reduce((acc, icerik) => {
                    const puan = puanlar[icerik.id] || 0;
                    icerik.etiketler.forEach((e) => {
                      acc[e] = (acc[e] || 0) + puan;
                    });
                    return acc;
                  }, {} as Record<string, number>)
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([etiket, puan]) => (
                    <span
                      key={etiket}
                      className="rounded-full bg-sky-200 px-2 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-800 dark:text-sky-200"
                    >
                      #{etiket} ({puan}p)
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Öneriler */}
          <h3 className="mb-4 text-center text-lg font-bold">
            🎯 Sana Özel Öneriler
          </h3>
          <div className="space-y-3">
            {oneriler.map(({ icerik, skor }, i) => (
              <div
                key={icerik.id}
                className="flex items-center gap-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {i + 1}
                </div>
                <span className="text-3xl">{icerik.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold">{icerik.isim}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {icerik.tur} &middot; Eşleşme puanı: {skor}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {icerik.etiketler.map((e) => (
                      <span
                        key={e}
                        className="rounded bg-emerald-200 px-1.5 py-0.5 text-[10px] text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Açıklama */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-800 dark:bg-amber-900/20">
            <h4 className="mb-2 font-bold text-amber-700 dark:text-amber-300">
              💡 İşbirlikçi Filtreleme Nasıl Çalışır?
            </h4>
            <div className="space-y-2 text-[var(--color-text-secondary)]">
              <p>
                <strong>1. Etiket Analizi:</strong> Her içeriğin etiketleri (bilim-kurgu, macera, doğa vb.)
                senin verdiğin puanlarla ağırlıklandırılır.
              </p>
              <p>
                <strong>2. Benzerlik Bulma:</strong> Yüksek puanladığın içeriklerin ortak etiketleri
                senin zevkini yansıtır.
              </p>
              <p>
                <strong>3. Öneri Üretme:</strong> Bu etiketlere en çok uyan yeni içerikler sana önerilir.
              </p>
              <p>
                Gerçek platformlar (Netflix, Spotify, YouTube) bu mantığı milyonlarca kullanıcının verisiyle çok
                daha gelişmiş şekilde uygular!
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={tekrarOyna}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            >
              🔄 Tekrar Dene
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
