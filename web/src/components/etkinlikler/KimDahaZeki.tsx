"use client";

import { useState, useCallback } from "react";

interface GorevKarti {
  gorev: string;
  emoji: string;
  cevap: "insan" | "makine" | "ikisi";
  aciklama: string;
}

const gorevler: GorevKarti[] = [
  {
    gorev: "Resim çizmek",
    emoji: "🎨",
    cevap: "insan",
    aciklama:
      "İnsanlar duygu ve hayal gücüyle özgün sanat eserleri yaratır. YZ resim üretebilir ama gerçek yaratıcılık insana aittir!",
  },
  {
    gorev: "1000 sayıyı toplamak",
    emoji: "🔢",
    cevap: "makine",
    aciklama:
      "Bilgisayarlar saniyenin çok küçük bir bölümünde binlerce hesap yapabilir. İnsan bu kadar hızlı hesaplayamaz!",
  },
  {
    gorev: "Şiir yazmak",
    emoji: "✍️",
    cevap: "insan",
    aciklama:
      "Şiir duygu, deneyim ve yaratıcılık gerektirir. YZ kalıpları taklit edebilir ama gerçek duyguyu hissetmez.",
  },
  {
    gorev: "Satranç oynamak",
    emoji: "♟️",
    cevap: "makine",
    aciklama:
      "Satranç YZ'leri milyonlarca hamleyi analiz ederek en iyi dünya şampiyonlarını bile yenebilir!",
  },
  {
    gorev: "Duygusal destek vermek",
    emoji: "🤗",
    cevap: "insan",
    aciklama:
      "İnsanlar empati kurabilir, hissedebilir ve gerçek duygusal bağ oluşturabilir. Makineler bunu taklit edebilir ama gerçekten hissetmez.",
  },
  {
    gorev: "Yüz tanımak (güvenlik)",
    emoji: "📸",
    cevap: "makine",
    aciklama:
      "YZ sistemleri binlerce yüzü saniyeler içinde tarayıp eşleştirebilir. İnsan gözü bu kadar hızlı ve hassas değildir.",
  },
  {
    gorev: "Yaratıcı hikâye yazmak",
    emoji: "📖",
    cevap: "insan",
    aciklama:
      "Hikâyeler kişisel deneyimler, hayal gücü ve duygulardan beslenir. YZ metin üretebilir ama özgün fikirler insandan gelir.",
  },
  {
    gorev: "Hava durumu tahmin etmek",
    emoji: "🌦️",
    cevap: "makine",
    aciklama:
      "Süper bilgisayarlar devasa miktarda hava verisini analiz ederek doğru tahminler yapabilir.",
  },
  {
    gorev: "Müzik bestemek",
    emoji: "🎵",
    cevap: "ikisi",
    aciklama:
      "İnsanlar duygusal ve özgün besteler yapar. YZ da müzik üretebilir. İkisi birlikte harika eserler ortaya çıkarabilir!",
  },
  {
    gorev: "Hastalık teşhisi koymak",
    emoji: "🏥",
    cevap: "ikisi",
    aciklama:
      "YZ röntgen ve tahlilleri analiz etmede çok başarılı. Ama hastayı dinlemek ve karar vermek için doktora ihtiyaç var. En iyisi birlikte çalışmaları!",
  },
  {
    gorev: "Arkadaşlık kurmak",
    emoji: "🤝",
    cevap: "insan",
    aciklama:
      "Gerçek arkadaşlık güven, paylaşım ve duygusal bağ gerektirir. Makineler bunu yapamaz!",
  },
  {
    gorev: "Spam e-postaları ayıklamak",
    emoji: "📧",
    cevap: "makine",
    aciklama:
      "YZ, milyonlarca e-postayı analiz ederek spam olanları çok yüksek doğrulukla ayırt edebilir.",
  },
];

export default function KimDahaZeki() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [cevaplar, setCevaplar] = useState<(boolean | null)[]>(
    Array(gorevler.length).fill(null)
  );
  const [sonCevapDogru, setSonCevapDogru] = useState<boolean | null>(null);
  const [geribildiriGoster, setGeribildiriGoster] = useState(false);
  const [oyunBitti, setOyunBitti] = useState(false);

  const mevcutGorev = gorevler[mevcutIndex];
  const ilerleme =
    ((mevcutIndex + (oyunBitti ? 1 : 0)) / gorevler.length) * 100;

  const cevapVer = useCallback(
    (secim: "insan" | "makine" | "ikisi") => {
      if (geribildiriGoster) return;

      const dogru = secim === mevcutGorev.cevap;
      const yeniCevaplar = [...cevaplar];
      yeniCevaplar[mevcutIndex] = dogru;
      setCevaplar(yeniCevaplar);

      if (dogru) {
        setSkor((s) => s + 1);
      }
      setSonCevapDogru(dogru);
      setGeribildiriGoster(true);
    },
    [geribildiriGoster, mevcutGorev.cevap, cevaplar, mevcutIndex]
  );

  const sonraki = useCallback(() => {
    if (mevcutIndex + 1 >= gorevler.length) {
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
    setCevaplar(Array(gorevler.length).fill(null));
    setSonCevapDogru(null);
    setGeribildiriGoster(false);
    setOyunBitti(false);
  }, []);

  const skorYuzdesi = Math.round((skor / gorevler.length) * 100);

  const cevapRenkleri: Record<string, { border: string; bg: string; text: string; darkBg: string; darkText: string }> = {
    insan: {
      border: "border-blue-400",
      bg: "bg-blue-50",
      text: "text-blue-700",
      darkBg: "dark:bg-blue-900/40",
      darkText: "dark:text-blue-300",
    },
    makine: {
      border: "border-purple-400",
      bg: "bg-purple-50",
      text: "text-purple-700",
      darkBg: "dark:bg-purple-900/40",
      darkText: "dark:text-purple-300",
    },
    ikisi: {
      border: "border-amber-400",
      bg: "bg-amber-50",
      text: "text-amber-700",
      darkBg: "dark:bg-amber-900/40",
      darkText: "dark:text-amber-300",
    },
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Baslik */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          🧠 Kim Daha Zeki?
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Her gorevde insan mi yoksa makine mi daha basarili? Tahmin et!
        </p>
      </div>

      {/* Ilerleme Cubugu */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>
            Soru {Math.min(mevcutIndex + 1, gorevler.length)} / {gorevler.length}
          </span>
          <span>Skor: {skor} ⭐</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 transition-all duration-500 ease-out"
            style={{ width: `${ilerleme}%` }}
          />
        </div>
      </div>

      {!oyunBitti ? (
        <>
          {/* Kart */}
          <div
            className="relative mx-auto mb-6 flex min-h-[200px] max-w-md flex-col items-center justify-center rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-violet-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700"
            style={{
              animation: geribildiriGoster
                ? "none"
                : "float 4s ease-in-out infinite",
            }}
          >
            <span className="mb-3 text-6xl">{mevcutGorev.emoji}</span>
            <h3 className="text-center text-xl font-bold text-[var(--color-text)]">
              {mevcutGorev.gorev}
            </h3>
            <p className="mt-2 text-center text-xs text-[var(--color-text-secondary)]">
              Bu gorevi kim daha iyi yapar?
            </p>
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
                {sonCevapDogru ? "✅ Dogru!" : "❌ Yanlis!"}
              </p>
              <p className="mb-2 text-sm font-semibold">
                Dogru cevap:{" "}
                {mevcutGorev.cevap === "insan"
                  ? "🧑 Insan Daha Iyi"
                  : mevcutGorev.cevap === "makine"
                  ? "🤖 Makine Daha Iyi"
                  : "🤝 Ikisi de Basarili"}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {mevcutGorev.aciklama}
              </p>
            </div>
          )}

          {/* Butonlar */}
          {!geribildiriGoster ? (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => cevapVer("insan")}
                className={`flex items-center gap-2 rounded-xl border-2 ${cevapRenkleri.insan.border} ${cevapRenkleri.insan.bg} px-5 py-3 font-bold ${cevapRenkleri.insan.text} shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 ${cevapRenkleri.insan.darkBg} ${cevapRenkleri.insan.darkText}`}
              >
                <span className="text-xl">🧑</span> Insan Daha Iyi
              </button>
              <button
                type="button"
                onClick={() => cevapVer("makine")}
                className={`flex items-center gap-2 rounded-xl border-2 ${cevapRenkleri.makine.border} ${cevapRenkleri.makine.bg} px-5 py-3 font-bold ${cevapRenkleri.makine.text} shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 ${cevapRenkleri.makine.darkBg} ${cevapRenkleri.makine.darkText}`}
              >
                <span className="text-xl">🤖</span> Makine Daha Iyi
              </button>
              <button
                type="button"
                onClick={() => cevapVer("ikisi")}
                className={`flex items-center gap-2 rounded-xl border-2 ${cevapRenkleri.ikisi.border} ${cevapRenkleri.ikisi.bg} px-5 py-3 font-bold ${cevapRenkleri.ikisi.text} shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 ${cevapRenkleri.ikisi.darkBg} ${cevapRenkleri.ikisi.darkText}`}
              >
                <span className="text-xl">🤝</span> Ikisi de
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={sonraki}
                className="rounded-xl bg-violet-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-violet-700 hover:shadow-lg active:scale-95"
              >
                {mevcutIndex + 1 >= gorevler.length
                  ? "Sonucu Gor 🏆"
                  : "Sonraki ➡️"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sonuc Ekrani */
        <div
          className="text-center"
          style={{ animation: "slide-up 0.5s ease-out" }}
        >
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-violet-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
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
                ? "MUKEMMEL!"
                : skorYuzdesi >= 75
                ? "Harika!"
                : skorYuzdesi >= 50
                ? "Iyi gidiyorsun!"
                : "Tekrar dene!"}
            </h3>
            <p className="mb-4 text-4xl font-bold text-violet-600">
              {skor} / {gorevler.length}
            </p>
            <p className="mb-1 text-sm text-[var(--color-text-secondary)]">
              dogru cevap
            </p>

            {/* Sonuc detayi */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {gorevler.map((g, i) => (
                <div
                  key={g.gorev}
                  className={`flex flex-col items-center rounded-lg p-2 text-xs ${
                    cevaplar[i]
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-rose-100 dark:bg-rose-900/30"
                  }`}
                >
                  <span className="text-lg">{g.emoji}</span>
                  <span className="truncate text-[10px]">{g.gorev}</span>
                  <span>{cevaplar[i] ? "✅" : "❌"}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
