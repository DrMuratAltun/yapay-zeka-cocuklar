"use client";

import { useCallback, useMemo, useRef, useState } from "react";

/**
 * Veri Laboratuvarı
 * Öğrenciler 2D düzlemde iki sınıftan veri noktaları ekler
 * (Örn: Elma 🍎 vs Muz 🍌). Basit bir lineer sınıflandırıcı
 * gradient descent ile eğitilir ve karar sınırı canlı gösterilir.
 */

type Nokta = {
  x: number; // 0-100
  y: number; // 0-100
  sinif: 0 | 1;
};

type Sinif = {
  ad: string;
  emoji: string;
  renk: string;
  kisaAd: string;
};

const SINIFLAR: [Sinif, Sinif] = [
  { ad: "Elma", emoji: "🍎", renk: "#ef4444", kisaAd: "elma" },
  { ad: "Muz", emoji: "🍌", renk: "#f59e0b", kisaAd: "muz" },
];

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const ORNEK_VERI: Nokta[] = [
  { x: 25, y: 75, sinif: 0 },
  { x: 30, y: 65, sinif: 0 },
  { x: 20, y: 80, sinif: 0 },
  { x: 35, y: 70, sinif: 0 },
  { x: 75, y: 30, sinif: 1 },
  { x: 80, y: 25, sinif: 1 },
  { x: 70, y: 35, sinif: 1 },
  { x: 85, y: 20, sinif: 1 },
];

const GENISLIK = 500;
const YUKSEKLIK = 400;

export default function VeriLaboratuvari() {
  const [noktalar, setNoktalar] = useState<Nokta[]>(ORNEK_VERI);
  const [seciliSinif, setSeciliSinif] = useState<0 | 1>(0);
  // Sınıflandırıcı parametreleri: w1*x + w2*y + b
  const [w, setW] = useState<[number, number]>([0, 0]);
  const [b, setB] = useState<number>(0);
  const [epoch, setEpoch] = useState(0);
  const [egitimeBasladik, setEgitimeBasladik] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const ekseneCevir = (kX: number) => (kX / 100) * GENISLIK;
  const eksenY = (kY: number) => YUKSEKLIK - (kY / 100) * YUKSEKLIK;

  function klikNoktaEkle(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const loc = pt.matrixTransform(ctm.inverse());
    const x = Math.round((loc.x / GENISLIK) * 100);
    const y = Math.round(((YUKSEKLIK - loc.y) / YUKSEKLIK) * 100);
    if (x < 0 || x > 100 || y < 0 || y > 100) return;
    setNoktalar((prev) => [...prev, { x, y, sinif: seciliSinif }]);
    // Eğitilmişse, karar sınırı artık geçersiz; ama görsel sürsün
  }

  const tekAdim = useCallback(() => {
    if (noktalar.length === 0) return;
    const lr = 0.08;
    let wYeni: [number, number] = [...w];
    let bYeni = b;
    // Bir epoch: tüm örnekleri bir kez işle
    for (const p of noktalar) {
      const nx = p.x / 100;
      const ny = p.y / 100;
      const hedef = p.sinif;
      const cikti = sigmoid(wYeni[0] * nx + wYeni[1] * ny + bYeni);
      const hata = cikti - hedef;
      wYeni = [wYeni[0] - lr * hata * nx, wYeni[1] - lr * hata * ny];
      bYeni = bYeni - lr * hata;
    }
    setW(wYeni);
    setB(bYeni);
    setEpoch((e) => e + 1);
    setEgitimeBasladik(true);
  }, [noktalar, w, b]);

  function egit() {
    // 40 epoch birden çalıştır
    let wLocal: [number, number] = [...w];
    let bLocal = b;
    const lr = 0.08;
    for (let i = 0; i < 40; i++) {
      for (const p of noktalar) {
        const nx = p.x / 100;
        const ny = p.y / 100;
        const hedef = p.sinif;
        const cikti = sigmoid(wLocal[0] * nx + wLocal[1] * ny + bLocal);
        const hata = cikti - hedef;
        wLocal = [wLocal[0] - lr * hata * nx, wLocal[1] - lr * hata * ny];
        bLocal = bLocal - lr * hata;
      }
    }
    setW(wLocal);
    setB(bLocal);
    setEpoch((e) => e + 40);
    setEgitimeBasladik(true);
  }

  function sifirla() {
    setW([0, 0]);
    setB(0);
    setEpoch(0);
    setEgitimeBasladik(false);
  }

  function tumuTemizle() {
    sifirla();
    setNoktalar([]);
  }

  function ornekVeri() {
    sifirla();
    setNoktalar(ORNEK_VERI);
  }

  const dogruluk = useMemo(() => {
    if (!egitimeBasladik || noktalar.length === 0) return null;
    let dogru = 0;
    for (const p of noktalar) {
      const nx = p.x / 100;
      const ny = p.y / 100;
      const cikti = sigmoid(w[0] * nx + w[1] * ny + b);
      const tahmin = cikti > 0.5 ? 1 : 0;
      if (tahmin === p.sinif) dogru++;
    }
    return Math.round((dogru / noktalar.length) * 100);
  }, [noktalar, w, b, egitimeBasladik]);

  // Karar sınırı: w1*x + w2*y + b = 0 → y = -(w1*x + b) / w2
  const sinirNoktalari = useMemo(() => {
    if (!egitimeBasladik) return null;
    const [w1, w2] = w;
    if (Math.abs(w2) < 0.001) {
      // Dikey çizgi: x = -b / w1
      if (Math.abs(w1) < 0.001) return null;
      const x = -b / w1;
      if (x < 0 || x > 1) return null;
      return [
        { x: x * 100, y: 0 },
        { x: x * 100, y: 100 },
      ];
    }
    const sonuc: { x: number; y: number }[] = [];
    for (const kX of [0, 100]) {
      const nx = kX / 100;
      const ny = -(w1 * nx + b) / w2;
      const kY = ny * 100;
      sonuc.push({ x: kX, y: kY });
    }
    return sonuc;
  }, [w, b, egitimeBasladik]);

  // Arka plan için sınıflandırma gridini oluştur
  const grid = useMemo(() => {
    if (!egitimeBasladik) return null;
    const cells: { x: number; y: number; sinif: 0 | 1; guven: number }[] = [];
    const step = 5;
    for (let x = 0; x <= 100; x += step) {
      for (let y = 0; y <= 100; y += step) {
        const cikti = sigmoid(w[0] * (x / 100) + w[1] * (y / 100) + b);
        cells.push({
          x,
          y,
          sinif: cikti > 0.5 ? 1 : 0,
          guven: Math.abs(cikti - 0.5) * 2,
        });
      }
    }
    return cells;
  }, [w, b, egitimeBasladik]);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 sm:p-4">
      {/* Kompakt header */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-extrabold">🧪 Veri Laboratuvarı</h3>
        <div className="flex items-center gap-1.5">
          {SINIFLAR.map((s, i) => (
            <button
              key={s.ad}
              type="button"
              onClick={() => setSeciliSinif(i as 0 | 1)}
              className={`cursor-pointer rounded-full border-2 px-2.5 py-0.5 text-xs font-bold transition ${
                seciliSinif === i ? "text-white shadow-md" : "bg-[var(--color-bg)] text-[var(--color-text)]"
              }`}
              style={
                seciliSinif === i
                  ? { backgroundColor: s.renk, borderColor: s.renk }
                  : { borderColor: s.renk }
              }
            >
              <span className="mr-0.5">{s.emoji}</span>
              {s.ad}
            </button>
          ))}
          <span className="text-xs text-[var(--color-text-secondary)]">{noktalar.length} nokta</span>
        </div>
      </div>

      {/* Grid: SVG | kontroller + metrikler */}
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-inner dark:bg-slate-950">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${GENISLIK} ${YUKSEKLIK}`}
          className="h-auto w-full cursor-crosshair"
          onClick={klikNoktaEkle}
          role="img"
          aria-label="Veri noktalarının dağılım grafiği"
        >
          {/* Grid arka planı — karar bölgesi */}
          {grid &&
            grid.map((c, i) => (
              <rect
                key={i}
                x={ekseneCevir(c.x - 2.5)}
                y={eksenY(c.y + 2.5)}
                width={(5 / 100) * GENISLIK}
                height={(5 / 100) * YUKSEKLIK}
                fill={SINIFLAR[c.sinif].renk}
                fillOpacity={0.06 + c.guven * 0.12}
              />
            ))}

          {/* Eksen çizgileri */}
          <line
            x1={0}
            y1={YUKSEKLIK}
            x2={GENISLIK}
            y2={YUKSEKLIK}
            stroke="#94a3b8"
            strokeWidth={1}
          />
          <line x1={0} y1={0} x2={0} y2={YUKSEKLIK} stroke="#94a3b8" strokeWidth={1} />

          {/* Izgara */}
          {[20, 40, 60, 80].map((v) => (
            <g key={v}>
              <line
                x1={ekseneCevir(v)}
                y1={0}
                x2={ekseneCevir(v)}
                y2={YUKSEKLIK}
                stroke="#e2e8f0"
                strokeWidth={0.5}
                strokeDasharray="3 3"
              />
              <line
                x1={0}
                y1={eksenY(v)}
                x2={GENISLIK}
                y2={eksenY(v)}
                stroke="#e2e8f0"
                strokeWidth={0.5}
                strokeDasharray="3 3"
              />
            </g>
          ))}

          {/* Karar sınırı çizgisi */}
          {sinirNoktalari && sinirNoktalari.length === 2 && (
            <line
              x1={ekseneCevir(sinirNoktalari[0].x)}
              y1={eksenY(sinirNoktalari[0].y)}
              x2={ekseneCevir(sinirNoktalari[1].x)}
              y2={eksenY(sinirNoktalari[1].y)}
              stroke="#0ea5e9"
              strokeWidth={3}
              strokeDasharray="8 4"
            />
          )}

          {/* Veri noktaları */}
          {noktalar.map((p, i) => {
            const s = SINIFLAR[p.sinif];
            const cikti = egitimeBasladik
              ? sigmoid(w[0] * (p.x / 100) + w[1] * (p.y / 100) + b)
              : 0.5;
            const tahmin = cikti > 0.5 ? 1 : 0;
            const hatali = egitimeBasladik && tahmin !== p.sinif;
            return (
              <g key={i}>
                {hatali && (
                  <circle
                    cx={ekseneCevir(p.x)}
                    cy={eksenY(p.y)}
                    r={12}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth={2}
                    strokeDasharray="3 2"
                  />
                )}
                <circle
                  cx={ekseneCevir(p.x)}
                  cy={eksenY(p.y)}
                  r={8}
                  fill={s.renk}
                  stroke="white"
                  strokeWidth={2}
                />
              </g>
            );
          })}

          {/* Eksen etiketleri */}
          <text x={GENISLIK / 2} y={YUKSEKLIK - 6} textAnchor="middle" fontSize="12" fill="#64748b">
            Uzunluk →
          </text>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
            transform={`rotate(-90 12 ${YUKSEKLIK / 2}) translate(12 ${YUKSEKLIK / 2})`}
          >
            ↑ Sarılık
          </text>

          {/* Çizilecek alan tıklanabilir mesajı */}
          {noktalar.length === 0 && (
            <text
              x={GENISLIK / 2}
              y={YUKSEKLIK / 2}
              textAnchor="middle"
              fontSize="14"
              fill="#94a3b8"
            >
              Nokta eklemek için tıkla
            </text>
          )}
        </svg>
        </div>

        {/* Sağ kolon: kontroller + metrikler */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={egit}
              disabled={noktalar.length < 2}
              className={`rounded-lg px-2.5 py-2 text-xs font-bold text-white transition ${
                noktalar.length < 2 ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              ▶ Eğit
            </button>
            <button
              type="button"
              onClick={tekAdim}
              disabled={noktalar.length < 2}
              className={`rounded-lg border-2 px-2.5 py-2 text-xs font-bold transition ${
                noktalar.length < 2
                  ? "cursor-not-allowed border-gray-300 text-gray-400"
                  : "cursor-pointer border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
              }`}
            >
              ⏭ Tek Adım
            </button>
            <button
              type="button"
              onClick={ornekVeri}
              className="cursor-pointer rounded-lg border-2 border-[var(--color-border)] px-2.5 py-2 text-xs font-medium transition hover:bg-[var(--color-bg)]"
            >
              🔄 Örnek
            </button>
            <button
              type="button"
              onClick={tumuTemizle}
              className="cursor-pointer rounded-lg border-2 border-rose-200 px-2.5 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-900/20"
            >
              🗑️ Temizle
            </button>
          </div>

          {/* Metrikler — kompakt */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2 text-center">
              <p className="text-[9px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                Adım
              </p>
              <p className="text-lg font-extrabold text-sky-600">{epoch}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2 text-center">
              <p className="text-[9px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                Doğruluk
              </p>
              <p
                className={`text-lg font-extrabold ${
                  dogruluk === null
                    ? "text-gray-400"
                    : dogruluk >= 90
                    ? "text-emerald-600"
                    : dogruluk >= 70
                    ? "text-amber-600"
                    : "text-rose-600"
                }`}
              >
                {dogruluk === null ? "—" : `%${dogruluk}`}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2 font-mono text-[10px] text-[var(--color-text-secondary)]">
            w₁={w[0].toFixed(2)} · w₂={w[1].toFixed(2)} · b={b.toFixed(2)}
          </div>

          {/* Mini bilgi */}
          <details className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-2 text-xs">
            <summary className="cursor-pointer font-bold text-violet-700 dark:text-violet-300">
              💡 Neler oluyor?
            </summary>
            <p className="mt-2 text-[11px] text-[var(--color-text-secondary)]">
              Model her adımda noktalarla tahminini karşılaştırır, ağırlıkları azar azar ayarlar.
              Mavi kesik çizgi = öğrenilen <em>karar sınırı</em>. Kırmızı halkalar = yanlış sınıflandırılmış.
              Dengesiz veri seti → <strong>önyargılı model</strong>!
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
