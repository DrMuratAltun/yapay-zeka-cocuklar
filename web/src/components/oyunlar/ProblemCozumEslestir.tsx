"use client";

import { useState, useMemo } from "react";

const ciftler = [
  { problem: "Trafik sıkışıklığı", cozum: "Akıllı trafik ışıkları (YZ)", emoji: "🚗" },
  { problem: "Hastalık teşhisi", cozum: "Tıbbi görüntü analizi (YZ)", emoji: "🏥" },
  { problem: "Çevre kirliliği", cozum: "Uydu görüntü analizi (YZ)", emoji: "🌍" },
  { problem: "Dil engeli", cozum: "Otomatik çeviri (YZ)", emoji: "🗣️" },
  { problem: "Enerji israfı", cozum: "Akıllı bina yönetimi (YZ)", emoji: "⚡" },
  { problem: "Ürün tavsiyesi", cozum: "Öneri algoritması (YZ)", emoji: "🛒" },
  { problem: "Güvenlik tehdidi", cozum: "Yüz tanıma sistemi (YZ)", emoji: "🔒" },
  { problem: "Tarımda verim düşüklüğü", cozum: "Drone ile alan tarama (YZ)", emoji: "🌾" },
];

function karistir<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ProblemCozumEslestir() {
  const [seciliProblem, setSeciliProblem] = useState<number | null>(null);
  const [eslestirilmis, setEslestirilmis] = useState<Set<number>>(new Set());
  const [hamle, setHamle] = useState(0);
  const [yanlis, setYanlis] = useState<{ problem: number; cozum: number } | null>(null);
  const [bitti, setBitti] = useState(false);

  const karisikCozumler = useMemo(() => {
    const indexed = ciftler.map((c, i) => ({ ...c, originalIndex: i }));
    return karistir(indexed);
  }, []);

  function problemSec(index: number) {
    if (eslestirilmis.has(index) || bitti) return;
    setSeciliProblem(index);
    setYanlis(null);
  }

  function cozumSec(originalIndex: number) {
    if (seciliProblem === null || bitti) return;
    setHamle(hamle + 1);

    if (seciliProblem === originalIndex) {
      const yeniSet = new Set(eslestirilmis);
      yeniSet.add(originalIndex);
      setEslestirilmis(yeniSet);
      setSeciliProblem(null);
      if (yeniSet.size === ciftler.length) setBitti(true);
    } else {
      setYanlis({ problem: seciliProblem, cozum: originalIndex });
      setTimeout(() => {
        setYanlis(null);
        setSeciliProblem(null);
      }, 800);
    }
  }

  function sifirla() {
    setSeciliProblem(null);
    setEslestirilmis(new Set());
    setHamle(0);
    setYanlis(null);
    setBitti(false);
  }

  if (bitti) {
    const verimli = hamle <= ciftler.length + 2;
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{verimli ? "🎯" : "👏"}</div>
        <h3 className="text-2xl font-bold mb-2">Tüm Eşleşmeler Tamamlandı!</h3>
        <p className="text-lg mb-4">
          <span className="font-bold text-teal-600">{hamle}</span> hamlede tamamladın!
        </p>
        {verimli && (
          <div className="inline-block rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1.5 text-sm font-bold text-white mb-4">
            🎯 Problem Çözücü Rozeti!
          </div>
        )}
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          YZ, gerçek dünya problemlerini çözmek için kullanılabilir!
        </p>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-teal-500 px-8 py-3 font-bold text-white hover:bg-teal-600 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🌍 Problem-Çözüm Eşleştir</h3>
        <div className="flex gap-3 text-sm">
          <span className="rounded-full bg-teal-100 px-3 py-1 font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
            {eslestirilmis.size} / {ciftler.length}
          </span>
          <span className="text-[var(--color-text-secondary)]">{hamle} hamle</span>
        </div>
      </div>

      <div className="mb-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-teal-500 transition-all" style={{ width: `${(eslestirilmis.size / ciftler.length) * 100}%` }} />
      </div>

      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Soldan bir problem, sağdan eşleşen YZ çözümünü seç
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Problems */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-1">Problemler</p>
          {ciftler.map((c, i) => {
            const eslesti = eslestirilmis.has(i);
            const secili = seciliProblem === i;
            const yanlisSecim = yanlis?.problem === i;
            return (
              <button
                key={`p-${i}`}
                type="button"
                onClick={() => problemSec(i)}
                disabled={eslesti}
                className={`w-full text-left rounded-xl border-2 p-3 text-sm font-medium transition cursor-pointer ${
                  eslesti
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 opacity-60"
                    : yanlisSecim
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20 animate-[shake_0.3s]"
                    : secili
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-2 ring-teal-300"
                    : "border-[var(--color-border)] hover:border-teal-300"
                }`}
              >
                <span className="mr-2">{c.emoji}</span>
                {c.problem}
                {eslesti && <span className="float-right text-emerald-600">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Solutions */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-1">YZ Çözümleri</p>
          {karisikCozumler.map((c) => {
            const eslesti = eslestirilmis.has(c.originalIndex);
            const yanlisSecim = yanlis?.cozum === c.originalIndex;
            return (
              <button
                key={`c-${c.originalIndex}`}
                type="button"
                onClick={() => cozumSec(c.originalIndex)}
                disabled={eslesti || seciliProblem === null}
                className={`w-full text-left rounded-xl border-2 p-3 text-sm font-medium transition cursor-pointer ${
                  eslesti
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 opacity-60"
                    : yanlisSecim
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                    : seciliProblem !== null
                    ? "border-[var(--color-border)] hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/10"
                    : "border-[var(--color-border)] opacity-60"
                }`}
              >
                {c.cozum}
                {eslesti && <span className="float-right text-emerald-600">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
