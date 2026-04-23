"use client";

import { useState } from "react";
import { useActivityTracker } from "./ActivityTracker";

interface Soru {
  soru: string;
  secenekler: string[];
  dogru: number;
  aciklama?: string;
}

export default function InteraktifQuiz({
  sorular,
  baslik = "Değerlendirme Testi",
  bolumNo,
}: {
  sorular: Soru[];
  baslik?: string;
  bolumNo?: number;
}) {
  const [cevaplar, setCevaplar] = useState<Record<number, number>>({});
  const [gosterSonuc, setGosterSonuc] = useState(false);
  const { completeActivity } = useActivityTracker();

  const dogruSayisi = Object.entries(cevaplar).filter(
    ([i, c]) => sorular[Number(i)].dogru === c
  ).length;

  function secimYap(soruIndex: number, secenekIndex: number) {
    if (gosterSonuc) return;
    setCevaplar((prev) => ({ ...prev, [soruIndex]: secenekIndex }));
  }

  function kontrolEt() {
    setGosterSonuc(true);
    // Use setTimeout to ensure dogruSayisi is evaluated with latest state if needed, 
    // but dogruSayisi is derived during render, so we recalculate it just in case:
    const anlikDogruSayisi = Object.entries(cevaplar).filter(
      ([i, c]) => sorular[Number(i)].dogru === c
    ).length;
    const score = Math.round((anlikDogruSayisi / sorular.length) * 100);
    completeActivity(score, { dogru: anlikDogruSayisi, toplam: sorular.length });
    // Quiz sonucunu sunucuya kaydet (giriş yapılmamışsa 401 sessizce yutulur)
    if (bolumNo) {
      fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bolumNo, score }),
      }).catch(() => {});
    }
  }

  function sifirla() {
    setCevaplar({});
    setGosterSonuc(false);
  }

  const tumCevaplandi = Object.keys(cevaplar).length === sorular.length;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{baslik}</h2>
        {gosterSonuc && (
          <div
            className={`rounded-full px-4 py-1.5 text-sm font-bold ${
              dogruSayisi === sorular.length
                ? "bg-emerald-100 text-emerald-700"
                : dogruSayisi >= sorular.length / 2
                ? "bg-amber-100 text-amber-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {dogruSayisi} / {sorular.length} doğru
          </div>
        )}
      </div>

      <div className="space-y-6">
        {sorular.map((s, i) => {
          const secildi = cevaplar[i];
          const dogruMu = gosterSonuc && secildi === s.dogru;
          const yanlisMi = gosterSonuc && secildi !== undefined && secildi !== s.dogru;

          return (
            <div key={i}>
              <p className="mb-3 font-medium">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                {s.soru}
              </p>
              <div className="ml-2 space-y-2">
                {s.secenekler.map((sec, j) => {
                  const buSecildi = secildi === j;
                  const buDogru = s.dogru === j;

                  let borderClass = "border-[var(--color-border)]";
                  let bgClass = "";

                  if (gosterSonuc) {
                    if (buDogru) {
                      borderClass = "border-emerald-400";
                      bgClass = "bg-emerald-50 dark:bg-emerald-900/20";
                    } else if (buSecildi && !buDogru) {
                      borderClass = "border-rose-400";
                      bgClass = "bg-rose-50 dark:bg-rose-900/20";
                    }
                  } else if (buSecildi) {
                    borderClass = "border-sky-400";
                    bgClass = "bg-sky-50 dark:bg-sky-900/20";
                  }

                  return (
                    <button
                      key={j}
                      type="button"
                      onClick={() => secimYap(i, j)}
                      disabled={gosterSonuc}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${borderClass} ${bgClass} ${
                        !gosterSonuc ? "hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/10" : ""
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          buSecildi
                            ? gosterSonuc
                              ? buDogru
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-rose-500 bg-rose-500 text-white"
                              : "border-sky-500 bg-sky-500 text-white"
                            : "border-gray-300 text-gray-400"
                        }`}
                      >
                        {String.fromCharCode(65 + j)}
                      </span>
                      <span className="flex-1">{sec}</span>
                      {gosterSonuc && buDogru && (
                        <span className="text-emerald-600 text-lg">&#10003;</span>
                      )}
                      {gosterSonuc && buSecildi && !buDogru && (
                        <span className="text-rose-500 text-lg">&#10007;</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {gosterSonuc && yanlisMi && s.aciklama && (
                <p className="ml-2 mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                  {s.aciklama}
                </p>
              )}
              {gosterSonuc && dogruMu && (
                <p className="ml-2 mt-2 text-sm font-medium text-emerald-600">
                  Doğru!
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        {!gosterSonuc ? (
          <button
            type="button"
            onClick={kontrolEt}
            disabled={!tumCevaplandi}
            className={`rounded-xl px-8 py-3 font-bold text-white transition ${
              tumCevaplandi
                ? "bg-sky-600 hover:bg-sky-700 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Kontrol Et
          </button>
        ) : (
          <button
            type="button"
            onClick={sifirla}
            className="cursor-pointer rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            Tekrar Dene
          </button>
        )}
        {!gosterSonuc && !tumCevaplandi && (
          <p className="flex items-center text-sm text-[var(--color-text-secondary)]">
            Tüm soruları cevaplayın ({Object.keys(cevaplar).length}/{sorular.length})
          </p>
        )}
      </div>
    </section>
  );
}
