"use client";

interface BarChartProps {
  veri: { etiket: string; deger: number }[];
  maksimum?: number;
  baslik?: string;
}

/**
 * Basit bar chart — Ottertag'daki haftalık aktivite grafiği tarzı.
 * Saf SVG, hafif.
 */
export default function BarChart({ veri, maksimum, baslik }: BarChartProps) {
  const max = maksimum ?? Math.max(...veri.map((v) => v.deger), 1);
  const width = 260;
  const height = 120;
  const barWidth = (width - 40) / veri.length - 6;

  return (
    <div>
      {baslik && (
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {baslik}
        </p>
      )}
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {veri.map((d, i) => {
          const barH = (d.deger / max) * (height - 30);
          const x = 20 + i * ((width - 40) / veri.length) + 3;
          const y = height - 20 - barH;
          return (
            <g key={d.etiket}>
              {/* Arka plan bar */}
              <rect
                x={x}
                y={8}
                width={barWidth}
                height={height - 28}
                rx="6"
                fill="#f1f5f9"
                className="dark:fill-slate-800"
              />
              {/* Ana bar */}
              <rect x={x} y={y} width={barWidth} height={barH} rx="6" fill="url(#bar-grad)" />
              <text
                x={x + barWidth / 2}
                y={height - 6}
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
              >
                {d.etiket}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
