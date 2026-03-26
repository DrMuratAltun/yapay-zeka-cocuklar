"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface Kart {
  id: number;
  ciftId: number;
  icerik: string;
  emoji: string;
}

const ciftler: { uygulama: string; uygulamaEmoji: string; alan: string; alanEmoji: string }[] = [
  { uygulama: "Siri", uygulamaEmoji: "🗣️", alan: "Sesli Asistan", alanEmoji: "🎙️" },
  { uygulama: "Netflix", uygulamaEmoji: "🎬", alan: "Öneri Sistemi", alanEmoji: "⭐" },
  { uygulama: "Google Maps", uygulamaEmoji: "🗺️", alan: "Navigasyon", alanEmoji: "🧭" },
  { uygulama: "Alexa", uygulamaEmoji: "🔊", alan: "Akıllı Ev", alanEmoji: "🏠" },
  { uygulama: "YouTube", uygulamaEmoji: "▶️", alan: "Video Önerisi", alanEmoji: "📺" },
  { uygulama: "Google Lens", uygulamaEmoji: "🔍", alan: "Görüntü Tanıma", alanEmoji: "📷" },
];

function kartlariOlustur(): Kart[] {
  const kartlar: Kart[] = [];
  ciftler.forEach((cift, i) => {
    kartlar.push({
      id: i * 2,
      ciftId: i,
      icerik: cift.uygulama,
      emoji: cift.uygulamaEmoji,
    });
    kartlar.push({
      id: i * 2 + 1,
      ciftId: i,
      icerik: cift.alan,
      emoji: cift.alanEmoji,
    });
  });
  // Fisher-Yates karistirma
  for (let j = kartlar.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [kartlar[j], kartlar[k]] = [kartlar[k], kartlar[j]];
  }
  return kartlar;
}

export default function YzEslestirme() {
  const [kartlar, setKartlar] = useState<Kart[]>(() => kartlariOlustur());
  const [acikKartlar, setAcikKartlar] = useState<number[]>([]);
  const [eslesmisler, setEslesmisler] = useState<Set<number>>(new Set());
  const [hamleSayisi, setHamleSayisi] = useState(0);
  const [sure, setSure] = useState(0);
  const [oyunBasladi, setOyunBasladi] = useState(false);
  const [oyunBitti, setOyunBitti] = useState(false);
  const [kontrol, setKontrol] = useState(false);
  const zamanlayiciRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Zamanlayıcı
  useEffect(() => {
    if (oyunBasladi && !oyunBitti) {
      zamanlayiciRef.current = setInterval(() => {
        setSure((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (zamanlayiciRef.current) {
        clearInterval(zamanlayiciRef.current);
      }
    };
  }, [oyunBasladi, oyunBitti]);

  // Oyun bittiş kontrolu
  useEffect(() => {
    if (eslesmisler.size === ciftler.length && eslesmisler.size > 0) {
      setOyunBitti(true);
      if (zamanlayiciRef.current) {
        clearInterval(zamanlayiciRef.current);
      }
    }
  }, [eslesmisler]);

  const kartTikla = useCallback(
    (kartId: number) => {
      if (kontrol) return;
      if (acikKartlar.includes(kartId)) return;

      const kart = kartlar.find((k) => k.id === kartId);
      if (!kart) return;
      if (eslesmisler.has(kart.ciftId)) return;

      if (!oyunBasladi) {
        setOyunBasladi(true);
      }

      const yeniAciklar = [...acikKartlar, kartId];
      setAcikKartlar(yeniAciklar);

      if (yeniAciklar.length === 2) {
        setHamleSayisi((h) => h + 1);
        setKontrol(true);

        const kart1 = kartlar.find((k) => k.id === yeniAciklar[0]);
        const kart2 = kartlar.find((k) => k.id === yeniAciklar[1]);

        if (kart1 && kart2 && kart1.ciftId === kart2.ciftId) {
          // Eslesti!
          setEslesmisler((prev) => {
            const yeni = new Set(prev);
            yeni.add(kart1.ciftId);
            return yeni;
          });
          setAcikKartlar([]);
          setKontrol(false);
        } else {
          // Eslesme basarisiz
          setTimeout(() => {
            setAcikKartlar([]);
            setKontrol(false);
          }, 800);
        }
      }
    },
    [kontrol, acikKartlar, kartlar, eslesmisler, oyunBasladi]
  );

  const tekrarOyna = useCallback(() => {
    setKartlar(kartlariOlustur());
    setAcikKartlar([]);
    setEslesmisler(new Set());
    setHamleSayisi(0);
    setSure(0);
    setOyunBasladi(false);
    setOyunBitti(false);
    setKontrol(false);
    if (zamanlayiciRef.current) {
      clearInterval(zamanlayiciRef.current);
    }
  }, []);

  const sureFormatla = (s: number) => {
    const dk = Math.floor(s / 60);
    const sn = s % 60;
    return `${dk}:${sn.toString().padStart(2, "0")}`;
  };

  const kartAcikMi = (kartId: number) => {
    const kart = kartlar.find((k) => k.id === kartId);
    if (!kart) return false;
    return acikKartlar.includes(kartId) || eslesmisler.has(kart.ciftId);
  };

  const kartEslesmisMi = (kartId: number) => {
    const kart = kartlar.find((k) => k.id === kartId);
    if (!kart) return false;
    return eslesmisler.has(kart.ciftId);
  };

  const performansMesaji = () => {
    if (hamleSayisi <= 8)
      return { mesaj: "Hafıza şampiyonu! Mükemmel!", emoji: "🏆" };
    if (hamleSayisi <= 12)
      return { mesaj: "Harika bir performans!", emoji: "🎉" };
    if (hamleSayisi <= 18)
      return { mesaj: "İyi iş çıkardın!", emoji: "👏" };
    return { mesaj: "Bir daha dene, daha iyi olabilirsin!", emoji: "💪" };
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Başlık */}
      <div className="mb-4 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          🧩 Etrafındaki YZ Eşleştirme
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          YZ uygulamalarını kullanım alanlarıyla eşleştir!
        </p>
      </div>

      {/* Skor paneli */}
      <div className="mb-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-1.5 rounded-lg bg-sky-100 px-3 py-1.5 font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
          <span>👆</span> Hamle: {hamleSayisi}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          <span>⏱️</span> Süre: {sureFormatla(sure)}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          <span>✅</span> Eşleşen: {eslesmisler.size}/{ciftler.length}
        </div>
      </div>

      {!oyunBitti ? (
        /* Kart ızgarası */
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:grid-cols-4">
          {kartlar.map((kart) => {
            const acik = kartAcikMi(kart.id);
            const eslesmis = kartEslesmisMi(kart.id);

            return (
              <button
                key={kart.id}
                type="button"
                onClick={() => kartTikla(kart.id)}
                disabled={eslesmis}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 text-center transition-all duration-300 ${
                  eslesmis
                    ? "border-emerald-400 bg-emerald-50 shadow-md dark:border-emerald-500 dark:bg-emerald-900/30"
                    : acik
                    ? "border-sky-400 bg-sky-50 shadow-md dark:border-sky-500 dark:bg-sky-900/30"
                    : "cursor-pointer border-[var(--color-border)] bg-gradient-to-br from-purple-100 to-pink-100 shadow-sm hover:scale-105 hover:shadow-lg active:scale-95 dark:from-purple-900/40 dark:to-pink-900/40"
                }`}
                style={
                  acik
                    ? { transform: "rotateY(0deg)" }
                    : {}
                }
              >
                {acik ? (
                  <div style={{ animation: "slide-up 0.2s ease-out" }}>
                    <span className="mb-1 block text-3xl sm:text-4xl">{kart.emoji}</span>
                    <span className="block text-[10px] font-bold leading-tight sm:text-xs">
                      {kart.icerik}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl sm:text-5xl">❓</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Tebrik ekranı */
        <div className="text-center" style={{ animation: "slide-up 0.5s ease-out" }}>
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-purple-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-2 text-5xl">{performansMesaji().emoji}</p>
            <h3 className="mb-4 text-2xl font-bold">{performansMesaji().mesaj}</h3>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-sky-100 p-3 dark:bg-sky-900/30">
                <p className="text-2xl font-bold text-sky-700 dark:text-sky-300">
                  {hamleSayisi}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">hamle</p>
              </div>
              <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {sureFormatla(sure)}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">süre</p>
              </div>
            </div>

            {/* Eşleşme özeti */}
            <div className="space-y-2">
              {ciftler.map((cift) => (
                <div
                  key={cift.uygulama}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-bg)] p-2 text-sm"
                >
                  <span>{cift.uygulamaEmoji}</span>
                  <span className="font-medium">{cift.uygulama}</span>
                  <span className="text-[var(--color-text-secondary)]">↔</span>
                  <span>{cift.alanEmoji}</span>
                  <span className="font-medium">{cift.alan}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
