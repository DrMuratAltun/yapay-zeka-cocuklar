"use client";

import { useMemo, useState } from "react";

/**
 * Sinir Ağı Oyun Alanı
 * Öğrenciler 3 giriş değerini (Kırmızılık, Yuvarlaklık, Tatlılık) ayarlayarak
 * basit bir sinir ağının elma mı yoksa portakal mı tahmin ettiğini gözlemler.
 * Hedef: Sinir ağlarının "girdiler × ağırlıklar → aktivasyon → çıktı"
 * prensibini sezgisel olarak öğretmek.
 */

type Preset = {
  ad: string;
  emoji: string;
  girisler: [number, number, number];
  aciklama: string;
};

const PRESETLER: Preset[] = [
  {
    ad: "Tipik Elma",
    emoji: "🍎",
    girisler: [0.9, 0.85, 0.6],
    aciklama: "Kırmızı, yuvarlak ve biraz tatlı.",
  },
  {
    ad: "Tipik Portakal",
    emoji: "🍊",
    girisler: [0.1, 0.9, 0.9],
    aciklama: "Turuncu (az kırmızı), yuvarlak ve çok tatlı.",
  },
  {
    ad: "Karışık Meyve",
    emoji: "🤔",
    girisler: [0.5, 0.5, 0.5],
    aciklama: "Her özellikten biraz. Sinir ağı ne diyecek?",
  },
  {
    ad: "Yeşil Elma",
    emoji: "🍏",
    girisler: [0.2, 0.8, 0.4],
    aciklama: "Az kırmızı ama yuvarlak. İlginç bir örnek!",
  },
];

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

// Önceden "eğitilmiş" ağırlıklar (Elma tespiti yapar).
// 3 giriş → 2 gizli nöron → 1 çıkış (elma olasılığı)
const W_GIZLI_BASLANGIC: number[][] = [
  [1.8, -1.2, -0.3], // Gizli Nöron 1: kırmızılık baskın
  [0.4, 1.6, -0.9], // Gizli Nöron 2: yuvarlaklık baskın (portakal ayırıcı)
];
const B_GIZLI_BASLANGIC = [-0.8, -0.4];
const W_CIKIS_BASLANGIC = [1.8, -1.4];
const B_CIKIS_BASLANGIC = -0.3;

export default function SinirAgiOyunAlani() {
  const [girisler, setGirisler] = useState<[number, number, number]>([0.9, 0.85, 0.6]);
  const [kesifModu, setKesifModu] = useState(false);
  const [bilgiAcik, setBilgiAcik] = useState(false);

  // Keşif modunda öğrenci ağırlıkları kendi değiştirebilir
  const [wGizli, setWGizli] = useState<number[][]>(W_GIZLI_BASLANGIC);
  const [wCikis, setWCikis] = useState<number[]>(W_CIKIS_BASLANGIC);

  const { gizliAktivasyonlar, cikisAktivasyon } = useMemo(() => {
    const gizli = wGizli.map((agirliklar, i) => {
      const toplam = agirliklar.reduce(
        (acc, w, j) => acc + w * girisler[j],
        B_GIZLI_BASLANGIC[i]
      );
      return sigmoid(toplam);
    });
    const cikisToplam =
      wCikis.reduce((acc, w, i) => acc + w * gizli[i], B_CIKIS_BASLANGIC);
    return {
      gizliAktivasyonlar: gizli,
      cikisAktivasyon: sigmoid(cikisToplam),
    };
  }, [girisler, wGizli, wCikis]);

  const tahmin = cikisAktivasyon > 0.5 ? "ELMA" : "PORTAKAL";
  const tahminEmoji = cikisAktivasyon > 0.5 ? "🍎" : "🍊";
  const guven = Math.round(
    cikisAktivasyon > 0.5 ? cikisAktivasyon * 100 : (1 - cikisAktivasyon) * 100
  );

  function setGiris(i: number, v: number) {
    setGirisler((prev) => {
      const yeni = [...prev] as [number, number, number];
      yeni[i] = v;
      return yeni;
    });
  }

  function presetYukle(p: Preset) {
    setGirisler(p.girisler);
  }

  function agirliklariSifirla() {
    setWGizli(W_GIZLI_BASLANGIC.map((r) => [...r]));
    setWCikis([...W_CIKIS_BASLANGIC]);
  }

  const girisEtiketleri = [
    { ad: "Kırmızılık", emoji: "🔴", renk: "#ef4444" },
    { ad: "Yuvarlaklık", emoji: "⭕", renk: "#8b5cf6" },
    { ad: "Tatlılık", emoji: "🍯", renk: "#f59e0b" },
  ];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 sm:p-4">
      {/* Kompakt header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-extrabold">🧠 Sinir Ağı Oyun Alanı</h3>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setBilgiAcik((v) => !v)}
            className="cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs transition hover:bg-sky-50"
            aria-label="Bilgi"
          >
            {bilgiAcik ? "✕ Kapat" : "ℹ️ Nasıl?"}
          </button>
          <button
            type="button"
            onClick={() => setKesifModu((v) => !v)}
            className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              kesifModu
                ? "bg-amber-500 text-white"
                : "border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-amber-50"
            }`}
          >
            {kesifModu ? "⚗️ Keşif Açık" : "⚗️ Keşif"}
          </button>
        </div>
      </div>

      {/* Bilgi panel (collapsible) */}
      {bilgiAcik && (
        <div className="mb-3 rounded-lg border-l-4 border-sky-400 bg-sky-50 p-2.5 text-xs text-sky-800 dark:bg-sky-900/20 dark:text-sky-300">
          <strong>Nasıl çalışır?</strong> Her giriş, ağırlıklarla çarpılarak gizli katmana gider.
          Gizli nöronlar girdileri karıştırır, çıkış nöronu son kararı verir. Ağırlıklar
          eğitim sırasında otomatik öğrenilir — Keşif Modu&apos;nu açıp sen de dene!
          <br />
          <span className="mt-1 inline-block">
            <span className="inline-block h-1.5 w-6 align-middle" style={{ background: "#0ea5e9" }} /> pozitif &nbsp;
            <span className="inline-block h-1.5 w-6 align-middle" style={{ background: "#ef4444" }} /> negatif &nbsp;
            kalınlık = büyüklük
          </span>
        </div>
      )}

      {/* 2-kolonlu grid: ağ + tahmin | kontroller */}
      <div className="grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        {/* Sol kolon: SVG + tahmin */}
        <div className="space-y-2">
      {/* Ağ görselleştirme */}
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-slate-50 to-sky-50 p-2 dark:from-slate-900 dark:to-sky-950/40">
        <svg
          viewBox="0 0 600 340"
          className="mx-auto h-auto w-full max-w-2xl"
          role="img"
          aria-label="Sinir ağı diyagramı"
        >
          {/* Bağlantılar: girdiler → gizli */}
          {[0, 1, 2].map((i) =>
            [0, 1].map((h) => {
              const w = wGizli[h][i];
              const signed = Math.abs(w);
              const renk = w >= 0 ? "#0ea5e9" : "#ef4444";
              const kalinlik = Math.max(0.5, Math.min(5, signed * 2.2));
              return (
                <line
                  key={`ih-${i}-${h}`}
                  x1={120}
                  y1={70 + i * 90}
                  x2={310}
                  y2={115 + h * 110}
                  stroke={renk}
                  strokeWidth={kalinlik}
                  strokeOpacity={0.5 + Math.min(0.45, girisler[i] * 0.45)}
                />
              );
            })
          )}
          {/* Bağlantılar: gizli → çıkış */}
          {[0, 1].map((h) => {
            const w = wCikis[h];
            const signed = Math.abs(w);
            const renk = w >= 0 ? "#0ea5e9" : "#ef4444";
            const kalinlik = Math.max(0.5, Math.min(5, signed * 2.2));
            return (
              <line
                key={`ho-${h}`}
                x1={340}
                y1={115 + h * 110}
                x2={500}
                y2={170}
                stroke={renk}
                strokeWidth={kalinlik}
                strokeOpacity={0.5 + Math.min(0.45, gizliAktivasyonlar[h] * 0.45)}
              />
            );
          })}

          {/* Giriş nöronları */}
          {girisler.map((g, i) => {
            const meta = girisEtiketleri[i];
            return (
              <g key={`i-${i}`}>
                <circle
                  cx={90}
                  cy={70 + i * 90}
                  r={28}
                  fill={meta.renk}
                  fillOpacity={0.15 + g * 0.75}
                  stroke={meta.renk}
                  strokeWidth={2.5}
                />
                <text
                  x={90}
                  y={75 + i * 90}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="#0f172a"
                >
                  {g.toFixed(1)}
                </text>
                <text
                  x={20}
                  y={70 + i * 90}
                  fontSize="11"
                  fill="#64748b"
                >
                  {meta.emoji} {meta.ad}
                </text>
              </g>
            );
          })}

          {/* Gizli nöronlar */}
          {gizliAktivasyonlar.map((a, h) => (
            <g key={`h-${h}`}>
              <circle
                cx={325}
                cy={115 + h * 110}
                r={30}
                fill="#8b5cf6"
                fillOpacity={0.1 + a * 0.75}
                stroke="#8b5cf6"
                strokeWidth={2.5}
              />
              <text
                x={325}
                y={120 + h * 110}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#0f172a"
              >
                {a.toFixed(2)}
              </text>
              <text
                x={325}
                y={115 + h * 110 - 40}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                fontWeight="600"
              >
                Gizli {h + 1}
              </text>
            </g>
          ))}

          {/* Çıkış nöronu */}
          <g>
            <circle
              cx={515}
              cy={170}
              r={40}
              fill={cikisAktivasyon > 0.5 ? "#ef4444" : "#f59e0b"}
              fillOpacity={0.2 + Math.abs(cikisAktivasyon - 0.5) * 1.3}
              stroke={cikisAktivasyon > 0.5 ? "#ef4444" : "#f59e0b"}
              strokeWidth={3}
            />
            <text
              x={515}
              y={168}
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#0f172a"
            >
              {tahminEmoji}
            </text>
            <text
              x={515}
              y={186}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#0f172a"
            >
              {(cikisAktivasyon * 100).toFixed(0)}%
            </text>
            <text
              x={515}
              y={225}
              textAnchor="middle"
              fontSize="11"
              fill="#64748b"
              fontWeight="600"
            >
              Çıkış
            </text>
          </g>

          {/* Katman etiketleri */}
          <text x={90} y={300} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            GİRİŞ KATMANI
          </text>
          <text x={325} y={300} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            GİZLİ KATMAN
          </text>
          <text x={515} y={300} textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">
            ÇIKIŞ KATMANI
          </text>
        </svg>
      </div>

      {/* Tahmin paneli — kompakt */}
      <div
        className={`flex items-center justify-between rounded-xl px-4 py-2 text-white shadow-lg ${
          cikisAktivasyon > 0.5
            ? "bg-gradient-to-r from-red-500 to-rose-600"
            : "bg-gradient-to-r from-amber-500 to-orange-600"
        }`}
      >
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/80">Tahmin</p>
          <p className="text-xl font-extrabold">
            {tahminEmoji} {tahmin}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-white/80">Güven</p>
          <p className="text-xl font-extrabold">%{guven}</p>
        </div>
      </div>
        </div>

        {/* Sağ kolon: kontroller */}
        <div className="space-y-2">
          {/* Giriş kaydırıcıları */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2.5">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              🎛️ Girdiler
            </p>
            <div className="space-y-2">
              {girisEtiketleri.map((meta, i) => (
                <div key={meta.ad}>
                  <label className="flex items-center justify-between text-xs font-medium">
                    <span>
                      <span className="mr-1" aria-hidden="true">{meta.emoji}</span>
                      {meta.ad}
                    </span>
                    <span className="font-bold" style={{ color: meta.renk }}>
                      {girisler[i].toFixed(2)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={girisler[i]}
                    onChange={(e) => setGiris(i, Number(e.target.value))}
                    className="mt-0.5 w-full cursor-pointer"
                    style={{ accentColor: meta.renk }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Presetler */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2.5">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              ⚡ Hazır Örnekler
            </p>
            <div className="flex flex-wrap gap-1">
              {PRESETLER.map((p) => (
                <button
                  key={p.ad}
                  type="button"
                  onClick={() => presetYukle(p)}
                  className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[11px] font-medium transition hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                  title={p.aciklama}
                >
                  <span className="mr-0.5">{p.emoji}</span>
                  {p.ad}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keşif modu: ağırlık ayarlama (collapsible) */}
      {kesifModu && (
        <div className="mt-3 rounded-xl border-2 border-amber-300 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">
              ⚗️ Ağırlıkları Kendin Ayarla
            </h4>
            <button
              type="button"
              onClick={agirliklariSifirla}
              className="cursor-pointer rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-amber-600"
            >
              Sıfırla
            </button>
          </div>
          <p className="mb-3 text-xs text-amber-800 dark:text-amber-300">
            Ağırlıklar sinir ağının &quot;öğrendiği&quot; şeyler. Eğitim sırasında
            otomatik ayarlanır; sen de dene bakalım!
          </p>
          <div className="space-y-3">
            {wGizli.map((satir, h) => (
              <div key={h} className="rounded-lg bg-white p-3 dark:bg-slate-900">
                <p className="mb-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                  Gizli Nöron {h + 1} için ağırlıklar:
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {satir.map((w, i) => (
                    <label key={i} className="text-xs">
                      <span className="block text-[var(--color-text-secondary)]">
                        {girisEtiketleri[i].ad}: <span className="font-bold">{w.toFixed(2)}</span>
                      </span>
                      <input
                        type="range"
                        min={-3}
                        max={3}
                        step={0.1}
                        value={w}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setWGizli((prev) => {
                            const yeni = prev.map((r) => [...r]);
                            yeni[h][i] = v;
                            return yeni;
                          });
                        }}
                        className="mt-1 w-full cursor-pointer accent-amber-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-white p-3 dark:bg-slate-900">
              <p className="mb-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                Çıkış katmanı ağırlıkları:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {wCikis.map((w, i) => (
                  <label key={i} className="text-xs">
                    <span className="block text-[var(--color-text-secondary)]">
                      Gizli {i + 1}: <span className="font-bold">{w.toFixed(2)}</span>
                    </span>
                    <input
                      type="range"
                      min={-3}
                      max={3}
                      step={0.1}
                      value={w}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setWCikis((prev) => {
                          const yeni = [...prev];
                          yeni[i] = v;
                          return yeni;
                        });
                      }}
                      className="mt-1 w-full cursor-pointer accent-amber-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
