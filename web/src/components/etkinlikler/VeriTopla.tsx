"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface OgrenciVerisi {
  boy: number;
  ayakNo: number;
  favoriRenk: string;
  favoriDers: string;
}

const renkSecenekleri = ["Kırmızı", "Mavi", "Yeşil", "Sarı", "Mor", "Turuncu", "Pembe", "Siyah", "Beyaz"];
const dersSecenekleri = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Müzik", "Beden Eğitimi", "Görsel Sanatlar", "Bilişim"];

const renkHex: Record<string, string> = {
  Kırmızı: "#ef4444", Mavi: "#3b82f6", Yeşil: "#10b981", Sarı: "#eab308",
  Mor: "#8b5cf6", Turuncu: "#f97316", Pembe: "#ec4899", Siyah: "#374151", Beyaz: "#d1d5db",
};
const dersRenkleri = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316", "#6366f1"];

const ornekVeriler: OgrenciVerisi[] = [
  { boy: 152, ayakNo: 37, favoriRenk: "Mavi", favoriDers: "Bilişim" },
  { boy: 148, ayakNo: 36, favoriRenk: "Kırmızı", favoriDers: "Matematik" },
  { boy: 160, ayakNo: 39, favoriRenk: "Yeşil", favoriDers: "Fen Bilimleri" },
  { boy: 155, ayakNo: 38, favoriRenk: "Mavi", favoriDers: "Bilişim" },
  { boy: 145, ayakNo: 35, favoriRenk: "Mor", favoriDers: "Görsel Sanatlar" },
  { boy: 163, ayakNo: 40, favoriRenk: "Siyah", favoriDers: "Beden Eğitimi" },
  { boy: 150, ayakNo: 37, favoriRenk: "Pembe", favoriDers: "Müzik" },
  { boy: 158, ayakNo: 39, favoriRenk: "Mavi", favoriDers: "İngilizce" },
  { boy: 142, ayakNo: 34, favoriRenk: "Sarı", favoriDers: "Türkçe" },
  { boy: 167, ayakNo: 41, favoriRenk: "Yeşil", favoriDers: "Fen Bilimleri" },
  { boy: 153, ayakNo: 37, favoriRenk: "Turuncu", favoriDers: "Sosyal Bilgiler" },
  { boy: 156, ayakNo: 38, favoriRenk: "Kırmızı", favoriDers: "Matematik" },
];

// Canvas pie chart
function PastaGrafik({ veriler, baslik, alanAdi }: { veriler: OgrenciVerisi[]; baslik: string; alanAdi: "favoriRenk" | "favoriDers" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secenekler = alanAdi === "favoriRenk" ? renkSecenekleri : dersSecenekleri;
  const renkler = alanAdi === "favoriRenk" ? secenekler.map(s => renkHex[s] || "#999") : dersRenkleri;

  const dagilim = secenekler
    .map((s, i) => ({ ad: s, sayi: veriler.filter(v => v[alanAdi] === s).length, renk: renkler[i] }))
    .filter(d => d.sayi > 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dagilim.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 280 * dpr;
    canvas.height = 280 * dpr;
    ctx.scale(dpr, dpr);

    const cx = 140, cy = 130, r = 100;
    const toplam = dagilim.reduce((t, d) => t + d.sayi, 0);
    let baslangicAci = -Math.PI / 2;

    ctx.clearRect(0, 0, 280, 280);

    dagilim.forEach((d) => {
      const dilimAci = (d.sayi / toplam) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, baslangicAci, baslangicAci + dilimAci);
      ctx.closePath();
      ctx.fillStyle = d.renk;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      if (d.sayi / toplam > 0.05) {
        const labelAci = baslangicAci + dilimAci / 2;
        const lx = cx + Math.cos(labelAci) * (r * 0.65);
        const ly = cy + Math.sin(labelAci) * (r * 0.65);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round((d.sayi / toplam) * 100)}%`, lx, ly);
      }
      baslangicAci += dilimAci;
    });

    // Legend
    let ly = 265;
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    let lx = 10;
    dagilim.forEach((d) => {
      if (lx > 220) { lx = 10; ly += 16; }
      ctx.fillStyle = d.renk;
      ctx.fillRect(lx, ly - 8, 10, 10);
      ctx.fillStyle = "#666";
      ctx.fillText(`${d.ad} (${d.sayi})`, lx + 14, ly);
      lx += ctx.measureText(`${d.ad} (${d.sayi})`).width + 24;
    });
  }, [dagilim]);

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-[var(--color-text)]">🥧 {baslik}</h4>
      {dagilim.length === 0 ? (
        <p className="text-xs text-[var(--color-text-secondary)]">Veri yok</p>
      ) : (
        <canvas ref={canvasRef} className="mx-auto" style={{ width: 280, height: 280 }} />
      )}
    </div>
  );
}

// Scatter plot
function DagılımGrafik({ veriler }: { veriler: OgrenciVerisi[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || veriler.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 400, h = 300;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const boylar = veriler.map(v => v.boy);
    const ayaklar = veriler.map(v => v.ayakNo);
    const minBoy = Math.min(...boylar) - 5;
    const maxBoy = Math.max(...boylar) + 5;
    const minAyak = Math.min(...ayaklar) - 1;
    const maxAyak = Math.max(...ayaklar) + 1;

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (plotH / 5) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, h - pad.bottom);
    ctx.lineTo(w - pad.right, h - pad.bottom);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Boy (cm)", w / 2, h - 5);
    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Ayak No", 0, 0);
    ctx.restore();

    // Ticks
    ctx.textAlign = "center";
    for (let i = 0; i <= 5; i++) {
      const val = minBoy + ((maxBoy - minBoy) / 5) * i;
      const x = pad.left + (plotW / 5) * i;
      ctx.fillText(val.toFixed(0), x, h - pad.bottom + 15);
    }
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const val = minAyak + ((maxAyak - minAyak) / 5) * i;
      const y = h - pad.bottom - (plotH / 5) * i;
      ctx.fillText(val.toFixed(0), pad.left - 8, y + 4);
    }

    // Points
    veriler.forEach((v) => {
      const x = pad.left + ((v.boy - minBoy) / (maxBoy - minBoy)) * plotW;
      const y = h - pad.bottom - ((v.ayakNo - minAyak) / (maxAyak - minAyak)) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = renkHex[v.favoriRenk] || "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Trend line
    if (veriler.length >= 3) {
      const n = veriler.length;
      const sx = boylar.reduce((a, b) => a + b, 0);
      const sy = ayaklar.reduce((a, b) => a + b, 0);
      const sxy = veriler.reduce((a, v) => a + v.boy * v.ayakNo, 0);
      const sx2 = boylar.reduce((a, b) => a + b * b, 0);
      const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
      const intercept = (sy - slope * sx) / n;

      const x1 = pad.left;
      const x2 = w - pad.right;
      const b1 = minBoy;
      const b2 = maxBoy;
      const y1 = h - pad.bottom - ((slope * b1 + intercept - minAyak) / (maxAyak - minAyak)) * plotH;
      const y2 = h - pad.bottom - ((slope * b2 + intercept - minAyak) / (maxAyak - minAyak)) * plotH;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [veriler]);

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-[var(--color-text)]">📈 Boy vs Ayak No (Dağılım Grafiği)</h4>
      {veriler.length === 0 ? (
        <p className="text-xs text-[var(--color-text-secondary)]">Veri yok</p>
      ) : (
        <>
          <canvas ref={canvasRef} className="mx-auto w-full max-w-[400px]" style={{ height: 300 }} />
          <p className="mt-1 text-xs text-[var(--color-text-secondary)] text-center">
            Noktalar favori renkle boyandı. Kırmızı çizgi = trend çizgisi (korelasyon).
          </p>
        </>
      )}
    </div>
  );
}

// Histogram
function Histogram({ veriler, alan, baslik, birim }: { veriler: OgrenciVerisi[]; alan: "boy" | "ayakNo"; baslik: string; birim: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const degerler = veriler.map(v => v[alan]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || degerler.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 400, h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const pad = { top: 15, right: 15, bottom: 35, left: 45 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const min = Math.min(...degerler);
    const max = Math.max(...degerler);
    const range = max - min || 1;
    const binCount = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(degerler.length))));
    const binSize = range / binCount;

    const bins: number[] = new Array(binCount).fill(0);
    degerler.forEach(d => {
      let idx = Math.floor((d - min) / binSize);
      if (idx >= binCount) idx = binCount - 1;
      bins[idx]++;
    });
    const maxBin = Math.max(...bins);

    // Bars
    const barW = plotW / binCount - 4;
    bins.forEach((count, i) => {
      const barH = (count / maxBin) * plotH;
      const x = pad.left + i * (plotW / binCount) + 2;
      const y = pad.top + plotH - barH;

      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, "#8b5cf6");
      grad.addColorStop(1, "#6d28d9");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Count label
      if (count > 0) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(String(count), x + barW / 2, y + 14);
      }

      // X label
      ctx.fillStyle = "#6b7280";
      ctx.font = "9px sans-serif";
      ctx.textAlign = "center";
      const binStart = (min + i * binSize).toFixed(0);
      const binEnd = (min + (i + 1) * binSize).toFixed(0);
      ctx.fillText(`${binStart}-${binEnd}`, x + barW / 2, h - pad.bottom + 14);
    });

    // Axis
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, h - pad.bottom);
    ctx.lineTo(w - pad.right, h - pad.bottom);
    ctx.stroke();

    // Title
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(birim, w / 2, h - 3);
  }, [degerler]);

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-[var(--color-text)]">📊 {baslik}</h4>
      {degerler.length === 0 ? (
        <p className="text-xs text-[var(--color-text-secondary)]">Veri yok</p>
      ) : (
        <canvas ref={canvasRef} className="mx-auto w-full max-w-[400px]" style={{ height: 220 }} />
      )}
    </div>
  );
}

export default function VeriTopla() {
  const [veriler, setVeriler] = useState<OgrenciVerisi[]>([]);
  const [boy, setBoy] = useState("");
  const [ayakNo, setAyakNo] = useState("");
  const [favoriRenk, setFavoriRenk] = useState("");
  const [favoriDers, setFavoriDers] = useState("");
  const [hata, setHata] = useState("");
  const [gorunum, setGorunum] = useState<"form" | "cubuk" | "pasta" | "dagılım" | "istatistik" | "bilgi">("form");

  const veriEkle = useCallback(() => {
    const boyNum = parseFloat(boy);
    const ayakNum = parseFloat(ayakNo);
    if (!boy || !ayakNo || !favoriRenk || !favoriDers) { setHata("Lütfen tüm alanları doldurun!"); return; }
    if (isNaN(boyNum) || boyNum < 100 || boyNum > 210) { setHata("Boy 100-210 cm arasında olmalı!"); return; }
    if (isNaN(ayakNum) || ayakNum < 28 || ayakNum > 46) { setHata("Ayak numarası 28-46 arasında olmalı!"); return; }
    setVeriler(prev => [...prev, { boy: boyNum, ayakNo: ayakNum, favoriRenk, favoriDers }]);
    setBoy(""); setAyakNo(""); setFavoriRenk(""); setFavoriDers(""); setHata("");
  }, [boy, ayakNo, favoriRenk, favoriDers]);

  const ornekYukle = () => { setVeriler(ornekVeriler); setGorunum("cubuk"); };
  const sifirla = () => { setVeriler([]); setBoy(""); setAyakNo(""); setFavoriRenk(""); setFavoriDers(""); setHata(""); setGorunum("form"); };

  // Dağılımlar
  const renkDagilimi = renkSecenekleri.map(r => ({ renk: r, sayi: veriler.filter(v => v.favoriRenk === r).length })).filter(r => r.sayi > 0).sort((a, b) => b.sayi - a.sayi);
  const dersDagilimi = dersSecenekleri.map(d => ({ ders: d, sayi: veriler.filter(v => v.favoriDers === d).length })).filter(d => d.sayi > 0).sort((a, b) => b.sayi - a.sayi);
  const maxRenk = renkDagilimi.length > 0 ? Math.max(...renkDagilimi.map(r => r.sayi)) : 1;
  const maxDers = dersDagilimi.length > 0 ? Math.max(...dersDagilimi.map(d => d.sayi)) : 1;

  // İstatistikler
  const boylar = veriler.map(v => v.boy);
  const ayaklar = veriler.map(v => v.ayakNo);
  const ort = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const medyan = (arr: number[]) => { const s = [...arr].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const mod = (arr: string[]) => { const frek: Record<string, number> = {}; arr.forEach(v => frek[v] = (frek[v] || 0) + 1); return Object.entries(frek).sort((a, b) => b[1] - a[1])[0]?.[0] || "–"; };
  const stdSapma = (arr: number[]) => { const m = ort(arr); return Math.sqrt(arr.reduce((t, v) => t + (v - m) ** 2, 0) / arr.length); };

  // Korelasyon
  const korelasyon = () => {
    if (veriler.length < 3) return 0;
    const n = veriler.length;
    const sx = boylar.reduce((a, b) => a + b, 0);
    const sy = ayaklar.reduce((a, b) => a + b, 0);
    const sxy = veriler.reduce((a, v) => a + v.boy * v.ayakNo, 0);
    const sx2 = boylar.reduce((a, b) => a + b * b, 0);
    const sy2 = ayaklar.reduce((a, b) => a + b * b, 0);
    const r = (n * sxy - sx * sy) / Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy));
    return isNaN(r) ? 0 : r;
  };

  const renkKodlari: Record<string, string> = {
    Kırmızı: "bg-red-500", Mavi: "bg-blue-500", Yeşil: "bg-emerald-500", Sarı: "bg-yellow-400",
    Mor: "bg-purple-500", Turuncu: "bg-orange-500", Pembe: "bg-pink-400", Siyah: "bg-gray-800", Beyaz: "bg-gray-200",
  };

  const sekmeler = [
    ["form", "📝 Veri Gir"], ["cubuk", "📊 Çubuk Grafik"], ["pasta", "🥧 Pasta Grafik"],
    ["dagılım", "📈 Dağılım"], ["istatistik", "🔢 İstatistik"], ["bilgi", "📖 Bilgi"],
  ] as const;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Yapılandırılmış Veri Toplama Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Bilimsel araştırmalarda verilerin düzenli ve tutarlı bir şekilde toplanması çok önemlidir. Yapılandırılmış veri toplama, bilgilerin belirli kategoriler ve formatlar altında kaydedilmesi demektir. Bu sayede veriler kolayca analiz edilebilir ve yapay zeka modelleri tarafından işlenebilir.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-sm font-bold text-white">VERİ STÜDYOSU</span>
        <span className="text-sm text-[var(--color-text-secondary)]">Topla, Görselleştir, Analiz Et</span>
      </div>
      <h3 className="mb-1 text-xl font-bold text-[var(--color-text)]">🔬 Sınıf Veri Stüdyosu</h3>
      <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Veri topla, farklı grafik türleriyle görselleştir ve istatistiksel analiz yap!
      </p>

      {/* Sekmeler */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {sekmeler.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setGorunum(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              gorunum === key
                ? "bg-violet-600 text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-violet-100 dark:hover:bg-violet-900/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Veri sayısı + örnek yükle */}
      <div className="mb-4 flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2 dark:bg-violet-900/20">
        <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
          📁 {veriler.length} kayıt {veriler.length > 0 && `| Ort. boy: ${ort(boylar).toFixed(1)} cm`}
        </p>
        <div className="flex gap-2">
          {veriler.length === 0 && (
            <button onClick={ornekYukle} className="rounded-md bg-violet-200 px-3 py-1 text-xs font-medium text-violet-700 hover:bg-violet-300 dark:bg-violet-800 dark:text-violet-300">
              Örnek Veri Yükle
            </button>
          )}
          {veriler.length > 0 && (
            <button onClick={sifirla} className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
              Sıfırla
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      {gorunum === "form" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Boy (cm)</label>
              <input type="number" value={boy} onChange={e => setBoy(e.target.value)} placeholder="Örn: 155"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Ayak Numarası</label>
              <input type="number" value={ayakNo} onChange={e => setAyakNo(e.target.value)} placeholder="Örn: 38"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Favori Renk</label>
              <select value={favoriRenk} onChange={e => setFavoriRenk(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500">
                <option value="">Seçiniz...</option>
                {renkSecenekleri.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Favori Ders</label>
              <select value={favoriDers} onChange={e => setFavoriDers(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500">
                <option value="">Seçiniz...</option>
                {dersSecenekleri.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          {hata && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{hata}</p>}
          <button onClick={veriEkle} className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700">Veri Ekle</button>

          {veriler.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-xs text-[var(--color-text-secondary)]">
                    <th className="px-2 py-2">#</th><th className="px-2 py-2">Boy</th><th className="px-2 py-2">Ayak</th><th className="px-2 py-2">Renk</th><th className="px-2 py-2">Ders</th>
                  </tr>
                </thead>
                <tbody>
                  {veriler.slice(-8).map((v, i) => (
                    <tr key={i} className="border-b border-[var(--color-border)]">
                      <td className="px-2 py-1.5 text-[var(--color-text-secondary)]">{veriler.length - 7 + i > 0 ? veriler.length - 7 + i : i + 1}</td>
                      <td className="px-2 py-1.5">{v.boy}</td>
                      <td className="px-2 py-1.5">{v.ayakNo}</td>
                      <td className="px-2 py-1.5"><span className={`inline-block h-3 w-3 rounded-full ${renkKodlari[v.favoriRenk]}`} /> {v.favoriRenk}</td>
                      <td className="px-2 py-1.5">{v.favoriDers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {veriler.length > 8 && <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Son 8 kayıt</p>}
            </div>
          )}
        </div>
      )}

      {/* ÇUBUK GRAFİK */}
      {gorunum === "cubuk" && (
        <div className="space-y-6">
          {veriler.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-[var(--color-border)] p-8 text-center">
              <p className="text-[var(--color-text-secondary)]">Henüz veri yok! &quot;Veri Gir&quot; sekmesinden ekleyin veya &quot;Örnek Veri Yükle&quot; butonunu kullanın.</p>
            </div>
          ) : (
            <>
              <div>
                <h4 className="mb-3 font-bold">Favori Renk Dağılımı</h4>
                <div className="space-y-2">
                  {renkDagilimi.map(r => (
                    <div key={r.renk} className="flex items-center gap-3">
                      <span className="w-20 text-right text-sm">{r.renk}</span>
                      <div className="flex-1">
                        <div className={`${renkKodlari[r.renk]} h-7 rounded-md transition-all duration-500`} style={{ width: `${(r.sayi / maxRenk) * 100}%`, minWidth: "2rem" }}>
                          <span className="flex h-full items-center justify-end pr-2 text-xs font-bold text-white drop-shadow">{r.sayi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-bold">Favori Ders Dağılımı</h4>
                <div className="space-y-2">
                  {dersDagilimi.map(d => (
                    <div key={d.ders} className="flex items-center gap-3">
                      <span className="w-28 text-right text-sm">{d.ders}</span>
                      <div className="flex-1">
                        <div className="h-7 rounded-md bg-indigo-500 transition-all duration-500" style={{ width: `${(d.sayi / maxDers) * 100}%`, minWidth: "2rem" }}>
                          <span className="flex h-full items-center justify-end pr-2 text-xs font-bold text-white drop-shadow">{d.sayi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Histogram veriler={veriler} alan="boy" baslik="Boy Dağılımı (Histogram)" birim="Boy (cm)" />
            </>
          )}
        </div>
      )}

      {/* PASTA GRAFİK */}
      {gorunum === "pasta" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <PastaGrafik veriler={veriler} baslik="Favori Renk" alanAdi="favoriRenk" />
          <PastaGrafik veriler={veriler} baslik="Favori Ders" alanAdi="favoriDers" />
        </div>
      )}

      {/* DAĞILIM GRAFİĞİ */}
      {gorunum === "dagılım" && (
        <div className="space-y-4">
          <DagılımGrafik veriler={veriler} />
          {veriler.length >= 3 && (
            <div className="rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 p-4 dark:from-violet-900/20 dark:to-indigo-900/20">
              <h4 className="mb-2 font-bold text-violet-700 dark:text-violet-300">🔗 Korelasyon Analizi</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Boy ve ayak numarası arasındaki korelasyon katsayısı (r): <strong className="text-lg text-violet-700 dark:text-violet-300">{korelasyon().toFixed(3)}</strong>
              </p>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                {Math.abs(korelasyon()) > 0.7 ? "🟢 Güçlü pozitif korelasyon: Boy arttıkça ayak numarası da artıyor!" :
                 Math.abs(korelasyon()) > 0.4 ? "🟡 Orta düzey korelasyon: Bir miktar ilişki var." :
                 "🔴 Zayıf korelasyon: İlişki belirgin değil. Daha fazla veri ekleyin!"}
              </p>
            </div>
          )}
          <Histogram veriler={veriler} alan="ayakNo" baslik="Ayak Numarası Dağılımı" birim="Ayak No" />
        </div>
      )}

      {/* İSTATİSTİK */}
      {gorunum === "istatistik" && (
        <div className="space-y-4">
          {veriler.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-[var(--color-border)] p-8 text-center">
              <p className="text-[var(--color-text-secondary)]">Veri yok!</p>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Kayıt Sayısı", deger: String(veriler.length), ikon: "📊" },
                  { label: "Ort. Boy", deger: `${ort(boylar).toFixed(1)} cm`, ikon: "📏" },
                  { label: "Medyan Boy", deger: `${medyan(boylar)} cm`, ikon: "📐" },
                  { label: "Std. Sapma (Boy)", deger: `${stdSapma(boylar).toFixed(1)} cm`, ikon: "📉" },
                  { label: "Min Boy", deger: `${Math.min(...boylar)} cm`, ikon: "⬇️" },
                  { label: "Max Boy", deger: `${Math.max(...boylar)} cm`, ikon: "⬆️" },
                  { label: "En Popüler Renk", deger: mod(veriler.map(v => v.favoriRenk)), ikon: "🎨" },
                  { label: "En Popüler Ders", deger: mod(veriler.map(v => v.favoriDers)), ikon: "📚" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 text-center">
                    <span className="text-2xl">{s.ikon}</span>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{s.label}</p>
                    <p className="text-lg font-extrabold text-violet-700 dark:text-violet-300">{s.deger}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-900/20">
                <p className="font-medium text-indigo-700 dark:text-indigo-300">
                  💡 <strong>Ortalama (mean):</strong> Tüm değerlerin toplamı bölü sayısı. <strong>Medyan:</strong> Sıralandığında tam ortadaki değer.
                  <strong> Standart Sapma:</strong> Verilerin ortalamadan ne kadar uzaklaştığını gösterir — küçükse veriler birbirine yakın!
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* BİLGİ */}
      {gorunum === "bilgi" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h4 className="mb-3 font-bold text-emerald-700 dark:text-emerald-400">Yapısal Veri</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>✅ <strong>Boy:</strong> Sayısal, ölçülebilir</li>
                <li>✅ <strong>Ayak No:</strong> Sayısal, sıralanabilir</li>
                <li>✅ <strong>Renk / Ders:</strong> Kategorik, sınıflandırılabilir</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
              <h4 className="mb-3 font-bold text-amber-700 dark:text-amber-400">Yapısal Olmayan Veri</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>🔵 Açık uçlu cevaplar, kompozisyonlar</li>
                <li>🔵 Çizimler, fotoğraflar</li>
                <li>🔵 Ses ve video kayıtları</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 p-4 dark:from-violet-900/20 dark:to-indigo-900/20">
            <h4 className="mb-2 font-bold text-violet-700 dark:text-violet-300">📊 Grafik Türleri Ne Zaman Kullanılır?</h4>
            <div className="grid gap-2 sm:grid-cols-2 text-sm text-[var(--color-text-secondary)]">
              <p>📊 <strong>Çubuk grafik:</strong> Kategorileri karşılaştırmak için</p>
              <p>🥧 <strong>Pasta grafik:</strong> Oranları/yüzdeleri göstermek için</p>
              <p>📈 <strong>Dağılım grafiği:</strong> İki sayısal değişkenin ilişkisini görmek için</p>
              <p>📉 <strong>Histogram:</strong> Bir değişkenin dağılımını görmek için</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
