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
    emoji: "\uD83D\uDDE3\uFE0F",
    yzMi: true,
    aciklama:
      "Siri, sesini anlayarak komutlar\u0131 yorumlar ve yan\u0131t verir. Bu bir yapay zeka uygulamas\u0131d\u0131r!",
  },
  {
    ad: "Hesap Makinesi",
    emoji: "\uD83E\uDDEE",
    yzMi: false,
    aciklama:
      "Hesap makinesi sadece tan\u0131ml\u0131 matematik i\u015Flemleri yapar. \u00D6\u011Frenmez veya karar vermez.",
  },
  {
    ad: "Netflix \u00D6neri Sistemi",
    emoji: "\uD83C\uDFAC",
    yzMi: true,
    aciklama:
      "Netflix, izleme al\u0131\u015Fkanl\u0131klar\u0131n\u0131 analiz ederek sana \u00F6zel film \u00F6nerir. Bu bir YZ sistemidir!",
  },
  {
    ad: "Elektrik S\u00FCp\u00FCrgesi",
    emoji: "\uD83E\uDDF9",
    yzMi: false,
    aciklama:
      "Normal bir elektrik s\u00FCp\u00FCrgesi sadece motoru \u00E7al\u0131\u015Ft\u0131r\u0131r. D\u00FC\u015F\u00FCnme yetene\u011Fi yoktur.",
  },
  {
    ad: "ChatGPT",
    emoji: "\uD83E\uDD16",
    yzMi: true,
    aciklama:
      "ChatGPT, do\u011Fal dili anlayan ve metin \u00FCreten g\u00FC\u00E7l\u00FC bir yapay zeka modelidir!",
  },
  {
    ad: "Buzdolab\u0131",
    emoji: "\uD83E\uDDCA",
    yzMi: false,
    aciklama:
      "S\u0131radan bir buzdolab\u0131 sadece so\u011Futma yapar. Ak\u0131ll\u0131 karar vermez.",
  },
  {
    ad: "Tesla Otopilot",
    emoji: "\uD83D\uDE97",
    yzMi: true,
    aciklama:
      "Tesla\u2019n\u0131n otopilotu, \u00E7evreyi alg\u0131lay\u0131p s\u00FCr\u00FC\u015F kararlar\u0131 verir. Bu bir YZ sistemidir!",
  },
  {
    ad: "\u00C7ama\u015F\u0131r Makinesi",
    emoji: "\uD83E\uDDFA",
    yzMi: false,
    aciklama:
      "\u00C7ama\u015F\u0131r makinesi belirli programlar\u0131 \u00E7al\u0131\u015Ft\u0131r\u0131r. \u00D6\u011Frenme kapasitesi yoktur.",
  },
  {
    ad: "Google \u00C7eviri",
    emoji: "\uD83C\uDF10",
    yzMi: true,
    aciklama:
      "Google \u00C7eviri, dil \u00F6r\u00FCnt\u00FClerini \u00F6\u011Frenerek \u00E7eviri yapar. Yapay zeka kullan\u0131r!",
  },
  {
    ad: "Alarm Saati",
    emoji: "\u23F0",
    yzMi: false,
    aciklama:
      "Alarm saati sadece ayarlanan zamanda \u00E7alar. Hi\u00E7bir zek\u00E2 i\u00E7ermez.",
  },
  {
    ad: "Spotify M\u00FCzik \u00D6nerisi",
    emoji: "\uD83C\uDFB5",
    yzMi: true,
    aciklama:
      "Spotify, dinleme al\u0131\u015Fkanl\u0131klar\u0131ndan \u00F6\u011Frenerek sana \u00F6zel \u00E7alma listeleri olu\u015Fturur!",
  },
  {
    ad: "Termometre",
    emoji: "\uD83C\uDF21\uFE0F",
    yzMi: false,
    aciklama:
      "Termometre sadece s\u0131cakl\u0131\u011F\u0131 \u00F6l\u00E7er. Herhangi bir karar verme yetene\u011Fi yoktur.",
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
      {/* Ba\u015Fl\u0131k */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          \uD83E\uDD14 YZ mi De\u011Fil mi?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Her teknolojinin yapay zeka olup olmad\u0131\u011F\u0131n\u0131 tahmin et!
        </p>
      </div>

      {/* \u0130lerleme \u00C7ubu\u011Fu */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>
            Soru {Math.min(mevcutIndex + 1, ogeler.length)} / {ogeler.length}
          </span>
          <span>
            Skor: {skor} \u2B50
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
                {sonCevapDogru ? "\u2705 Do\u011Fru!" : "\u274C Yanl\u0131\u015F!"}
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
                <span className="text-xl">\uD83E\uDD16</span> Yapay Zeka
              </button>
              <button
                type="button"
                onClick={() => cevapVer(false)}
                className="flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-orange-50 px-6 py-3 font-bold text-orange-700 shadow-md transition-all hover:scale-105 hover:bg-orange-100 hover:shadow-lg active:scale-95 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-900/60"
              >
                <span className="text-xl">\u274C</span> De\u011Fil
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
                  ? "Sonucu G\u00F6r \uD83C\uDFC6"
                  : "Sonraki \u27A1\uFE0F"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sonu\u00E7 Ekran\u0131 */
        <div className="text-center" style={{ animation: "slide-up 0.5s ease-out" }}>
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-amber-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-2 text-5xl">
              {skorYuzdesi === 100
                ? "\uD83C\uDFC6"
                : skorYuzdesi >= 75
                ? "\uD83C\uDF89"
                : skorYuzdesi >= 50
                ? "\uD83D\uDC4D"
                : "\uD83D\uDCAA"}
            </p>
            <h3 className="mb-2 text-2xl font-bold">
              {skorYuzdesi === 100
                ? "M\u00FCKEMMEL!"
                : skorYuzdesi >= 75
                ? "Harika!"
                : skorYuzdesi >= 50
                ? "\u0130yi gidiyorsun!"
                : "Tekrar dene!"}
            </h3>
            <p className="mb-4 text-4xl font-bold text-sky-600">
              {skor} / {ogeler.length}
            </p>
            <p className="mb-1 text-sm text-[var(--color-text-secondary)]">
              do\u011Fru cevap
            </p>

            {/* Sonu\u00E7 detay\u0131 */}
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
                  <span>{cevaplar[i] ? "\u2705" : "\u274C"}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            \uD83D\uDD04 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
