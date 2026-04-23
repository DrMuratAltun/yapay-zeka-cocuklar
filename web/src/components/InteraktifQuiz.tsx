"use client";

import { useState } from "react";
import { useActivityTracker } from "./ActivityTracker";

interface Soru {
  soru: string;
  secenekler: string[];
  dogru: number;
  aciklama?: string;
}

/**
 * İnteraktif Quiz — stepper/slayt tipi
 * Her soru tek bir slayt. En sonda sonuç özeti.
 * Sağ/sol ok tuşlarıyla geçiş de mümkün.
 */
export default function InteraktifQuiz({
  sorular,
  baslik = "Değerlendirme Testi",
}: {
  sorular: Soru[];
  baslik?: string;
}) {
  const [aktif, setAktif] = useState(0); // 0..N-1 soru, N sonuç
  const [cevaplar, setCevaplar] = useState<Record<number, number>>({});
  const [sonucKaydedildi, setSonucKaydedildi] = useState(false);
  const { completeActivity } = useActivityTracker();

  const toplam = sorular.length;
  const sonucAdimi = aktif === toplam;
  const ilerleme = Math.min(100, (aktif / toplam) * 100);

  const dogruSayisi = Object.entries(cevaplar).filter(
    ([i, c]) => sorular[Number(i)].dogru === c
  ).length;
  const skor = Math.round((dogruSayisi / toplam) * 100);

  function secimYap(secenekIndex: number) {
    if (sonucAdimi) return;
    setCevaplar((prev) => ({ ...prev, [aktif]: secenekIndex }));
  }

  function sonraki() {
    if (aktif >= toplam) return;
    if (aktif === toplam - 1) {
      // Son soru → sonucu hesapla ve kaydet
      if (!sonucKaydedildi) {
        completeActivity(skor, { dogru: dogruSayisi, toplam });
        setSonucKaydedildi(true);
      }
    }
    setAktif((a) => a + 1);
  }

  function onceki() {
    if (aktif > 0) setAktif((a) => a - 1);
  }

  function sifirla() {
    setCevaplar({});
    setAktif(0);
    setSonucKaydedildi(false);
  }

  const aktifCevap = cevaplar[aktif];
  const aktifCevaplandi = aktifCevap !== undefined;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-6">
      {/* Üst bar: başlık + ilerleme */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold sm:text-lg">{baslik}</h2>
          <span className="rounded-full bg-[var(--color-bg)] px-3 py-0.5 text-xs font-bold text-[var(--color-text-secondary)]">
            {sonucAdimi ? `Sonuç` : `${aktif + 1} / ${toplam}`}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${sonucAdimi ? 100 : ilerleme + (100 / toplam)}%` }}
          />
        </div>
      </div>

      {/* İçerik: soru veya sonuç */}
      {!sonucAdimi ? (
        <div className="min-h-[320px]">
          {/* Soru */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Soru {aktif + 1}
            </p>
            <p className="mt-1 text-lg font-bold leading-snug sm:text-xl">
              {sorular[aktif].soru}
            </p>
          </div>

          {/* Seçenekler */}
          <div className="space-y-2">
            {sorular[aktif].secenekler.map((sec, j) => {
              const seciliMi = aktifCevap === j;
              return (
                <button
                  key={j}
                  type="button"
                  onClick={() => secimYap(j)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                    seciliMi
                      ? "border-sky-400 bg-sky-50 dark:bg-sky-900/20"
                      : "border-[var(--color-border)] hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-900/10"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                      seciliMi
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {String.fromCharCode(65 + j)}
                  </span>
                  <span className="flex-1 text-sm sm:text-base">{sec}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Sonuç ekranı */
        <div className="min-h-[320px]">
          <div
            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-lg ${
              skor === 100
                ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
                : skor >= 70
                ? "bg-gradient-to-br from-sky-400 to-blue-500 text-white"
                : skor >= 50
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                : "bg-gradient-to-br from-rose-400 to-red-500 text-white"
            }`}
          >
            {skor === 100 ? "🏆" : skor >= 70 ? "🎉" : skor >= 50 ? "💪" : "📚"}
          </div>
          <h3 className="text-center text-xl font-extrabold sm:text-2xl">
            {skor === 100
              ? "Mükemmel!"
              : skor >= 70
              ? "Harika iş!"
              : skor >= 50
              ? "İyi çaba!"
              : "Tekrar dene!"}
          </h3>
          <p className="mt-1 text-center text-sm text-[var(--color-text-secondary)]">
            {dogruSayisi} / {toplam} doğru cevap
          </p>

          {/* Skor ring */}
          <div className="mx-auto my-4 flex justify-center">
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold ${
                skor >= 70
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : skor >= 50
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              }`}
            >
              %{skor}
            </div>
          </div>

          {/* Soru listesi - kısa özet */}
          <div className="space-y-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
            {sorular.map((s, i) => {
              const c = cevaplar[i];
              const dogruMu = c === s.dogru;
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs sm:text-sm"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                      dogruMu ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  >
                    {dogruMu ? "✓" : "✗"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[var(--color-text)]">
                      {i + 1}. {s.soru}
                    </p>
                    {!dogruMu && s.aciklama && (
                      <p className="mt-0.5 rounded bg-amber-50 p-1.5 text-[11px] text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        💡 {s.aciklama}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alt kontrol: Önceki / Sonraki / Tekrar Dene */}
      <div className="mt-5 flex items-center justify-between">
        {!sonucAdimi ? (
          <>
            <button
              type="button"
              onClick={onceki}
              disabled={aktif === 0}
              className={`rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition ${
                aktif === 0
                  ? "cursor-not-allowed text-[var(--color-text-secondary)] opacity-40"
                  : "cursor-pointer hover:bg-[var(--color-bg)]"
              }`}
            >
              ← Önceki
            </button>

            {/* Orta — soru navigasyon dots */}
            <div className="hidden items-center gap-1 sm:flex">
              {sorular.map((_, i) => {
                const cevaplandi = cevaplar[i] !== undefined;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAktif(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === aktif
                        ? "w-6 bg-sky-500"
                        : cevaplandi
                        ? "w-2 bg-sky-300 hover:bg-sky-400 dark:bg-sky-700"
                        : "w-2 bg-[var(--color-border)] hover:bg-slate-300"
                    }`}
                    aria-label={`Soru ${i + 1}`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={sonraki}
              disabled={!aktifCevaplandi}
              className={`rounded-lg px-5 py-2 text-sm font-bold text-white transition ${
                !aktifCevaplandi
                  ? "cursor-not-allowed bg-gray-300"
                  : "cursor-pointer bg-sky-600 hover:bg-sky-700"
              }`}
            >
              {aktif === toplam - 1 ? "Bitir 🏁" : "Sonraki →"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onceki}
              className="cursor-pointer rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg)]"
            >
              ← Sorulara Bak
            </button>
            <button
              type="button"
              onClick={sifirla}
              className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              🔄 Tekrar Dene
            </button>
          </>
        )}
      </div>
    </section>
  );
}
