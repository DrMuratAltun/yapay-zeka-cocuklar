"use client";

import { useState, useCallback } from "react";

interface OyunOgesi {
  ad: string;
  emoji: string;
  yzMi: boolean;
  aciklama: string;
}

const ogeler: OyunOgesi[] = [
  {
    ad: "Siri Sesli Asistan",
    emoji: "🗣️",
    yzMi: true,
    aciklama:
      "Siri, sesini anlayarak komutları yorumlar ve yanıt verir. Bu bir yapay zeka uygulamasıdır!",
  },
  {
    ad: "Hesap Makinesi",
    emoji: "🧮",
    yzMi: false,
    aciklama:
      "Hesap makinesi sadece tanımlı matematik işlemleri yapar. Öğrenmez veya karar vermez.",
  },
  {
    ad: "Netflix Öneri Sistemi",
    emoji: "🎬",
    yzMi: true,
    aciklama:
      "Netflix, izleme alışkanlıklarını analiz ederek sana özel film önerir. Bu bir YZ sistemidir!",
  },
  {
    ad: "Elektrik Süpürgesi",
    emoji: "🧹",
    yzMi: false,
    aciklama:
      "Normal bir elektrik süpürgesi sadece motoru çalıştırır. Düşünme yeteneği yoktur.",
  },
  {
    ad: "ChatGPT",
    emoji: "🤖",
    yzMi: true,
    aciklama:
      "ChatGPT, doğal dili anlayan ve metin üreten güçlü bir yapay zeka modelidir!",
  },
  {
    ad: "Buzdolabı",
    emoji: "🧊",
    yzMi: false,
    aciklama:
      "Sıradan bir buzdolabı sadece soğutma yapar. Akıllı karar vermez.",
  },
  {
    ad: "Tesla Otopilot",
    emoji: "🚗",
    yzMi: true,
    aciklama:
      "Tesla’nın otopilotu, çevreyi algılayıp sürüş kararları verir. Bu bir YZ sistemidir!",
  },
  {
    ad: "Çamaşır Makinesi",
    emoji: "🧺",
    yzMi: false,
    aciklama:
      "Çamaşır makinesi belirli programları çalıştırır. Öğrenme kapasitesi yoktur.",
  },
  {
    ad: "Google Çeviri",
    emoji: "🌐",
    yzMi: true,
    aciklama:
      "Google Çeviri, dil örüntülerini öğrenerek çeviri yapar. Yapay zeka kullanır!",
  },
  {
    ad: "Alarm Saati",
    emoji: "⏰",
    yzMi: false,
    aciklama:
      "Alarm saati sadece ayarlanan zamanda çalar. Hiçbir zekâ içermez.",
  },
  {
    ad: "Spotify Müzik Önerisi",
    emoji: "🎵",
    yzMi: true,
    aciklama:
      "Spotify, dinleme alışkanlıklarından öğrenerek sana özel çalma listeleri oluşturur!",
  },
  {
    ad: "Termometre",
    emoji: "🌡️",
    yzMi: false,
    aciklama:
      "Termometre sadece sıcaklığı ölçer. Herhangi bir karar verme yeteneği yoktur.",
  },
];

export default function YzMiDegilMi() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [cevaplar, setCevaplar] = useState<(boolean | null)[]>(
    Array(ogeler.length).fill(null)
  );
  const [sonCevapDogru, setSonCevapDogru] = useState<boolean | null>(null);
  const [geribildiriGoster, setGeribildiriGoster] = useState(false);
  const [oyunBitti, setOyunBitti] = useState(false);

  const mevcutOge = ogeler[mevcutIndex];
  const ilerleme = ((mevcutIndex + (oyunBitti ? 1 : 0)) / ogeler.length) * 100;

  const cevapVer = useCallback(
    (yzSecildi: boolean) => {
      if (geribildiriGoster) return;

      const dogru = yzSecildi === mevcutOge.yzMi;
      const yeniCevaplar = [...cevaplar];
      yeniCevaplar[mevcutIndex] = dogru;
      setCevaplar(yeniCevaplar);

      if (dogru) {
        setSkor((s) => s + 1);
      }
      setSonCevapDogru(dogru);
      setGeribildiriGoster(true);
    },
    [geribildiriGoster, mevcutOge.yzMi, cevaplar, mevcutIndex]
  );

  const sonraki = useCallback(() => {
    if (mevcutIndex + 1 >= ogeler.length) {
      setOyunBitti(true);
    } else {
      setMevcutIndex((i) => i + 1);
    }
    setGeribildiriGoster(false);
    setSonCevapDogru(null);
  }, [mevcutIndex]);

  const tekrarOyna = useCallback(() => {
    setMevcutIndex(0);
    setSkor(0);
    setCevaplar(Array(ogeler.length).fill(null));
    setSonCevapDogru(null);
    setGeribildiriGoster(false);
    setOyunBitti(false);
  }, []);

  const skorYuzdesi = Math.round((skor / ogeler.length) * 100);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Başlık */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          🤔 YZ mi Değil mi?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Her teknolojinin yapay zeka olup olmadığını tahmin et!
        </p>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>
            Soru {Math.min(mevcutIndex + 1, ogeler.length)} / {ogeler.length}
          </span>
          <span>
            Skor: {skor} ⭐
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500 ease-out"
            style={{ width: `${ilerleme}%` }}
          />
        </div>
      </div>

      {!oyunBitti ? (
        <>
          {/* Kart */}
          <div
            className="relative mx-auto mb-6 flex min-h-[180px] max-w-md flex-col items-center justify-center rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-sky-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700"
            style={{
              animation: geribildiriGoster ? "none" : "float 4s ease-in-out infinite",
            }}
          >
            <span className="mb-3 text-6xl">{mevcutOge.emoji}</span>
            <h3 className="text-center text-xl font-bold text-[var(--color-text)]">
              {mevcutOge.ad}
            </h3>
          </div>

          {/* Geri bildirim */}
          {geribildiriGoster && (
            <div
              className={`mx-auto mb-6 max-w-md rounded-xl border-2 p-4 text-center ${
                sonCevapDogru
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30"
                  : "border-rose-300 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/30"
              }`}
              style={{ animation: "slide-up 0.3s ease-out" }}
            >
              <p className="mb-1 text-2xl">
                {sonCevapDogru ? "✅ Doğru!" : "❌ Yanlış!"}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {mevcutOge.aciklama}
              </p>
            </div>
          )}

          {/* Butonlar */}
          {!geribildiriGoster ? (
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => cevapVer(true)}
                className="flex items-center gap-2 rounded-xl border-2 border-emerald-400 bg-emerald-50 px-6 py-3 font-bold text-emerald-700 shadow-md transition-all hover:scale-105 hover:bg-emerald-100 hover:shadow-lg active:scale-95 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
              >
                <span className="text-xl">🤖</span> Yapay Zeka
              </button>
              <button
                type="button"
                onClick={() => cevapVer(false)}
                className="flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-orange-50 px-6 py-3 font-bold text-orange-700 shadow-md transition-all hover:scale-105 hover:bg-orange-100 hover:shadow-lg active:scale-95 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-900/60"
              >
                <span className="text-xl">❌</span> Değil
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={sonraki}
                className="rounded-xl bg-sky-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-sky-700 hover:shadow-lg active:scale-95"
              >
                {mevcutIndex + 1 >= ogeler.length
                  ? "Sonucu Gör 🏆"
                  : "Sonraki ➡️"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sonuç Ekranı */
        <div className="text-center" style={{ animation: "slide-up 0.5s ease-out" }}>
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-amber-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-2 text-5xl">
              {skorYuzdesi === 100
                ? "🏆"
                : skorYuzdesi >= 75
                ? "🎉"
                : skorYuzdesi >= 50
                ? "👍"
                : "💪"}
            </p>
            <h3 className="mb-2 text-2xl font-bold">
              {skorYuzdesi === 100
                ? "MÜKEMMEL!"
                : skorYuzdesi >= 75
                ? "Harika!"
                : skorYuzdesi >= 50
                ? "İyi gidiyorsun!"
                : "Tekrar dene!"}
            </h3>
            <p className="mb-4 text-4xl font-bold text-sky-600">
              {skor} / {ogeler.length}
            </p>
            <p className="mb-1 text-sm text-[var(--color-text-secondary)]">
              doğru cevap
            </p>

            {/* Sonuç detayı */}
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {ogeler.map((oge, i) => (
                <div
                  key={oge.ad}
                  className={`flex flex-col items-center rounded-lg p-2 text-xs ${
                    cevaplar[i]
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-rose-100 dark:bg-rose-900/30"
                  }`}
                >
                  <span className="text-lg">{oge.emoji}</span>
                  <span>{cevaplar[i] ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
