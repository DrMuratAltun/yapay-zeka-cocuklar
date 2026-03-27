"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

interface Ogrenci {
  isim: string;
  boy: number;
  kilo: number;
  favoriRenk: string;
  notOrtalamasi: number;
  ekranSuresi: number;
}

const ogrenciler: Ogrenci[] = [
  { isim: "Ali", boy: 155, kilo: 48, favoriRenk: "Mavi", notOrtalamasi: 85, ekranSuresi: 3.5 },
  { isim: "Ayşe", boy: 162, kilo: 52, favoriRenk: "Kırmızı", notOrtalamasi: 92, ekranSuresi: 2.0 },
  { isim: "Mehmet", boy: 170, kilo: 65, favoriRenk: "Yeşil", notOrtalamasi: 78, ekranSuresi: 4.0 },
  { isim: "Zeynep", boy: 158, kilo: 50, favoriRenk: "Mor", notOrtalamasi: 95, ekranSuresi: 1.5 },
  { isim: "Can", boy: 165, kilo: 58, favoriRenk: "Mavi", notOrtalamasi: 72, ekranSuresi: 5.0 },
  { isim: "Elif", boy: 148, kilo: 42, favoriRenk: "Pembe", notOrtalamasi: 88, ekranSuresi: 2.5 },
  { isim: "Burak", boy: 175, kilo: 70, favoriRenk: "Siyah", notOrtalamasi: 68, ekranSuresi: 6.0 },
  { isim: "Selin", boy: 160, kilo: 55, favoriRenk: "Mavi", notOrtalamasi: 90, ekranSuresi: 2.0 },
  { isim: "Emre", boy: 168, kilo: 62, favoriRenk: "Kırmızı", notOrtalamasi: 75, ekranSuresi: 4.5 },
  { isim: "Defne", boy: 153, kilo: 46, favoriRenk: "Yeşil", notOrtalamasi: 93, ekranSuresi: 1.0 },
  { isim: "Kaan", boy: 172, kilo: 68, favoriRenk: "Mavi", notOrtalamasi: 65, ekranSuresi: 5.5 },
  { isim: "Ece", boy: 157, kilo: 49, favoriRenk: "Mor", notOrtalamasi: 87, ekranSuresi: 3.0 },
  { isim: "Yusuf", boy: 163, kilo: 56, favoriRenk: "Yeşil", notOrtalamasi: 82, ekranSuresi: 3.5 },
  { isim: "Deniz", boy: 150, kilo: 44, favoriRenk: "Mavi", notOrtalamasi: 91, ekranSuresi: 2.0 },
  { isim: "Arda", boy: 178, kilo: 72, favoriRenk: "Siyah", notOrtalamasi: 70, ekranSuresi: 5.0 },
  { isim: "Nil", boy: 156, kilo: 51, favoriRenk: "Pembe", notOrtalamasi: 94, ekranSuresi: 1.5 },
  { isim: "Kerem", boy: 167, kilo: 60, favoriRenk: "Kırmızı", notOrtalamasi: 76, ekranSuresi: 4.0 },
  { isim: "Su", boy: 152, kilo: 45, favoriRenk: "Mor", notOrtalamasi: 89, ekranSuresi: 2.5 },
  { isim: "Berk", boy: 174, kilo: 67, favoriRenk: "Mavi", notOrtalamasi: 73, ekranSuresi: 4.5 },
  { isim: "Lara", boy: 159, kilo: 53, favoriRenk: "Yeşil", notOrtalamasi: 86, ekranSuresi: 3.0 },
];

type Grafik = "bar" | "pie" | "scatter";
type SayisalAlan = "boy" | "kilo" | "notOrtalamasi" | "ekranSuresi";

const alanlar: { key: SayisalAlan; label: string }[] = [
  { key: "boy", label: "Boy (cm)" },
  { key: "kilo", label: "Kilo (kg)" },
  { key: "notOrtalamasi", label: "Not Ortalaması" },
  { key: "ekranSuresi", label: "Ekran Süresi (saat)" },
];

const renkHaritasi: Record<string, string> = {
  Mavi: "#3b82f6",
  Kırmızı: "#ef4444",
  Yeşil: "#22c55e",
  Mor: "#a855f7",
  Pembe: "#ec4899",
  Siyah: "#374151",
};

function korelasyonHesapla(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);
  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  if (den === 0) return 0;
  return num / den;
}

function BarGrafik({ alan }: { alan: SayisalAlan }) {
  const alanBilgi = alanlar.find((a) => a.key === alan)!;
  const degerler = ogrenciler.map((o) => o[alan] as number);
  const maxDeger = Math.max(...degerler);

  return (
    <div>
      <h4 className="mb-3 text-center font-bold">{alanBilgi.label} - Çubuk Grafik</h4>
      <div className="overflow-x-auto">
        <div className="flex items-end gap-1 min-w-[600px]" style={{ height: 200 }}>
          {ogrenciler.map((o, i) => {
            const deger = o[alan] as number;
            const yukseklik = (deger / maxDeger) * 180;
            return (
              <div key={o.isim} className="group flex flex-col items-center" style={{ flex: 1 }}>
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                    {deger}
                  </div>
                </div>
                <div
                  className="w-full rounded-t transition-all group-hover:opacity-80"
                  style={{
                    height: yukseklik,
                    backgroundColor: `hsl(${(i * 18) % 360}, 70%, 55%)`,
                    minWidth: 12,
                  }}
                />
                <span className="mt-1 text-[9px] -rotate-45 origin-top-left text-[var(--color-text-secondary)]">
                  {o.isim}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PieGrafik() {
  const renkSayilari: Record<string, number> = {};
  ogrenciler.forEach((o) => {
    renkSayilari[o.favoriRenk] = (renkSayilari[o.favoriRenk] || 0) + 1;
  });

  const toplam = ogrenciler.length;
  const parcalar = Object.entries(renkSayilari).sort(([, a], [, b]) => b - a);

  let toplamAci = 0;

  return (
    <div>
      <h4 className="mb-3 text-center font-bold">Favori Renk Dağılımı - Pasta Grafik</h4>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="relative" style={{ width: 200, height: 200 }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {parcalar.map(([renk, sayi]) => {
              const aci = (sayi / toplam) * 360;
              const baslangicAci = toplamAci;
              toplamAci += aci;
              const x1 = 100 + 90 * Math.cos(((baslangicAci - 90) * Math.PI) / 180);
              const y1 = 100 + 90 * Math.sin(((baslangicAci - 90) * Math.PI) / 180);
              const x2 = 100 + 90 * Math.cos(((baslangicAci + aci - 90) * Math.PI) / 180);
              const y2 = 100 + 90 * Math.sin(((baslangicAci + aci - 90) * Math.PI) / 180);
              const buyukYay = aci > 180 ? 1 : 0;
              const d = `M100,100 L${x1},${y1} A90,90 0 ${buyukYay},1 ${x2},${y2} Z`;
              return (
                <path
                  key={renk}
                  d={d}
                  fill={renkHaritasi[renk] || "#94a3b8"}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {parcalar.map(([renk, sayi]) => (
            <div key={renk} className="flex items-center gap-2 text-sm">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: renkHaritasi[renk] || "#94a3b8" }}
              />
              <span className="font-medium">{renk}</span>
              <span className="text-[var(--color-text-secondary)]">
                {sayi} kişi ({Math.round((sayi / toplam) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScatterGrafik({
  xAlan,
  yAlan,
  trendGoster,
}: {
  xAlan: SayisalAlan;
  yAlan: SayisalAlan;
  trendGoster: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xBilgi = alanlar.find((a) => a.key === xAlan)!;
  const yBilgi = alanlar.find((a) => a.key === yAlan)!;

  const xDegerler = ogrenciler.map((o) => o[xAlan] as number);
  const yDegerler = ogrenciler.map((o) => o[yAlan] as number);

  const korelasyon = korelasyonHesapla(xDegerler, yDegerler);

  const xMin = Math.min(...xDegerler) - 5;
  const xMax = Math.max(...xDegerler) + 5;
  const yMin = Math.min(...yDegerler) - 5;
  const yMax = Math.max(...yDegerler) + 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.clearRect(0, 0, w, h);

    // Eksenler
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Etiketler
    ctx.fillStyle = "#64748b";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(xBilgi.label, w / 2, h - 5);
    ctx.save();
    ctx.translate(10, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yBilgi.label, 0, 0);
    ctx.restore();

    // Noktalar
    ogrenciler.forEach((o) => {
      const x = pad + ((o[xAlan] as number - xMin) / (xMax - xMin)) * (w - 2 * pad);
      const y = h - pad - ((o[yAlan] as number - yMin) / (yMax - yMin)) * (h - 2 * pad);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
      ctx.fillStyle = "#1e293b";
      ctx.font = "9px sans-serif";
      ctx.fillText(o.isim, x, y - 8);
    });

    // Trend çizgisi
    if (trendGoster) {
      const n = xDegerler.length;
      const sumX = xDegerler.reduce((a, b) => a + b, 0);
      const sumY = yDegerler.reduce((a, b) => a + b, 0);
      const sumXY = xDegerler.reduce((a, b, i) => a + b * yDegerler[i], 0);
      const sumX2 = xDegerler.reduce((a, b) => a + b * b, 0);
      const egim = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const kesisim = (sumY - egim * sumX) / n;

      const x1Screen = pad;
      const x2Screen = w - pad;
      const xVal1 = xMin;
      const xVal2 = xMax;
      const yVal1 = egim * xVal1 + kesisim;
      const yVal2 = egim * xVal2 + kesisim;
      const y1Screen = h - pad - ((yVal1 - yMin) / (yMax - yMin)) * (h - 2 * pad);
      const y2Screen = h - pad - ((yVal2 - yMin) / (yMax - yMin)) * (h - 2 * pad);

      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x1Screen, y1Screen);
      ctx.lineTo(x2Screen, y2Screen);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [xAlan, yAlan, trendGoster, xMin, xMax, yMin, yMax, xBilgi.label, yBilgi.label, xDegerler, yDegerler]);

  return (
    <div>
      <h4 className="mb-3 text-center font-bold">
        {xBilgi.label} vs {yBilgi.label} - Saçılım Grafik
      </h4>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="max-w-full rounded-lg border border-[var(--color-border)] bg-white dark:bg-slate-800"
        />
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 text-sm">
        <span className="font-medium">
          Korelasyon: {" "}
          <span
            className={`font-bold ${
              Math.abs(korelasyon) > 0.5
                ? korelasyon > 0
                  ? "text-emerald-600"
                  : "text-rose-600"
                : "text-amber-600"
            }`}
          >
            r = {korelasyon.toFixed(2)}
          </span>
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {Math.abs(korelasyon) > 0.7
            ? "Güçlü ilişki"
            : Math.abs(korelasyon) > 0.4
            ? "Orta ilişki"
            : "Zayıf ilişki"}
        </span>
      </div>
    </div>
  );
}

export default function VeriGorsellestirme() {
  const [grafikTuru, setGrafikTuru] = useState<Grafik>("bar");
  const [barAlan, setBarAlan] = useState<SayisalAlan>("notOrtalamasi");
  const [scatterX, setScatterX] = useState<SayisalAlan>("ekranSuresi");
  const [scatterY, setScatterY] = useState<SayisalAlan>("notOrtalamasi");
  const [trendGoster, setTrendGoster] = useState(false);
  const [veriGoster, setVeriGoster] = useState(false);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Veri Görselleştirme Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Veri görselleştirme, sayıları ve bilgileri grafik, çizelge ve harita gibi görsel şekillere dönüştürmektir. İnsan beyni görselleri sayılardan çok daha hızlı anlar. Bu yüzden veri bilimciler ve yapay zeka uzmanları, verilerdeki kalıpları ve eğilimleri bulmak için görselleştirme kullanır.
        </p>
      </div>

      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">📊 Veri Görselleştirme Stüdyosu</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          20 öğrencilik veri setini farklı grafiklerle keşfet!
        </p>
      </div>

      {/* Veri Tablosu Toggle */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setVeriGoster(!veriGoster)}
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--color-bg)]"
        >
          {veriGoster ? "📋 Veriyi Gizle" : "📋 Veri Setini Göster"}
        </button>
      </div>

      {veriGoster && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-xs border border-[var(--color-border)]">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="px-2 py-1.5 text-left">İsim</th>
                <th className="px-2 py-1.5 text-left">Boy</th>
                <th className="px-2 py-1.5 text-left">Kilo</th>
                <th className="px-2 py-1.5 text-left">F. Renk</th>
                <th className="px-2 py-1.5 text-left">Not Ort.</th>
                <th className="px-2 py-1.5 text-left">Ekran (s)</th>
              </tr>
            </thead>
            <tbody>
              {ogrenciler.map((o, i) => (
                <tr key={o.isim} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : "bg-[var(--color-bg)]"}>
                  <td className="px-2 py-1 font-medium">{o.isim}</td>
                  <td className="px-2 py-1">{o.boy}</td>
                  <td className="px-2 py-1">{o.kilo}</td>
                  <td className="px-2 py-1">{o.favoriRenk}</td>
                  <td className="px-2 py-1">{o.notOrtalamasi}</td>
                  <td className="px-2 py-1">{o.ekranSuresi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grafik Türü Seçimi */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {([
          { key: "bar", label: "📊 Çubuk Grafik", renk: "bg-blue-500" },
          { key: "pie", label: "🥧 Pasta Grafik", renk: "bg-violet-500" },
          { key: "scatter", label: "📈 Saçılım Grafik", renk: "bg-emerald-500" },
        ] as { key: Grafik; label: string; renk: string }[]).map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setGrafikTuru(g.key)}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all hover:scale-105 ${
              grafikTuru === g.key
                ? `${g.renk} border-transparent text-white shadow-lg`
                : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Grafik Kontrolleri */}
      {grafikTuru === "bar" && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {alanlar.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => setBarAlan(a.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                barAlan === a.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}

      {grafikTuru === "scatter" && (
        <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">X Ekseni:</span>
            <select
              value={scatterX}
              onChange={(e) => setScatterX(e.target.value as SayisalAlan)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs"
            >
              {alanlar.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">Y Ekseni:</span>
            <select
              value={scatterY}
              onChange={(e) => setScatterY(e.target.value as SayisalAlan)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs"
            >
              {alanlar.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={trendGoster}
              onChange={(e) => setTrendGoster(e.target.checked)}
              className="rounded"
            />
            Trend Çizgisi
          </label>
        </div>
      )}

      {/* Grafik Alanı */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        {grafikTuru === "bar" && <BarGrafik alan={barAlan} />}
        {grafikTuru === "pie" && <PieGrafik />}
        {grafikTuru === "scatter" && (
          <ScatterGrafik xAlan={scatterX} yAlan={scatterY} trendGoster={trendGoster} />
        )}
      </div>

      {/* Bilgi Kutusu */}
      <div className="mt-6 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm dark:border-violet-800 dark:bg-violet-900/20">
        <h4 className="mb-2 font-bold text-violet-700 dark:text-violet-300">
          💡 Veri Görselleştirme Neden Önemli?
        </h4>
        <p className="text-[var(--color-text-secondary)]">
          Rakamlar tabloda sadece sayılardır. Ama grafiğe dönüştürüldüğünde
          kalıplar, trendler ve ilişkiler görünür hale gelir. Yapay zeka da
          verilerdeki bu kalıpları bulmak için benzer teknikler kullanır.
          Saçılım grafiğinde ekran süresi ile not ortalaması arasındaki ilişkiyi
          keşfetmeyi dene!
        </p>
      </div>
    </section>
  );
}
