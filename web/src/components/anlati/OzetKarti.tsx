"use client";

interface OzetKartiProps {
  baslik?: string;
  ogrenilenler: string[];
  anahtarKelimeler?: string[];
  sorular?: string[];
  renkGradient?: string;
}

export default function OzetKarti({
  baslik = "Bölüm Özeti",
  ogrenilenler,
  anahtarKelimeler,
  sorular,
  renkGradient = "from-sky-500 to-blue-600",
}: OzetKartiProps) {
  return (
    <section className="space-y-5">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-xl ${renkGradient}`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white blur-2xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            🎓
          </span>
          <div>
            <h3 className="text-2xl font-extrabold">{baslik}</h3>
            <p className="text-sm text-white/80">Buraya kadar öğrendiklerin</p>
          </div>
        </div>
      </div>

      {/* Öğrendiklerin checklist */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
        <h4 className="mb-3 flex items-center gap-2 text-base font-bold">
          <span aria-hidden="true">✅</span>
          Öğrendiklerin
        </h4>
        <ul className="space-y-2">
          {ogrenilenler.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[var(--color-text)]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Anahtar kelimeler */}
      {anahtarKelimeler && anahtarKelimeler.length > 0 && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
          <h4 className="mb-3 flex items-center gap-2 text-base font-bold">
            <span aria-hidden="true">🔑</span>
            Anahtar Kelimeler
          </h4>
          <div className="flex flex-wrap gap-2">
            {anahtarKelimeler.map((k) => (
              <span
                key={k}
                className="rounded-full bg-gradient-to-r from-sky-100 to-blue-100 px-3 py-1 text-xs font-semibold text-sky-800 dark:from-sky-900/30 dark:to-blue-900/30 dark:text-sky-300"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Düşündürücü sorular */}
      {sorular && sorular.length > 0 && (
        <div className="rounded-2xl border-l-4 border-violet-400 bg-violet-50 p-5 dark:bg-violet-900/20">
          <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-violet-800 dark:text-violet-300">
            <span aria-hidden="true">🤔</span>
            Kendini Sına
          </h4>
          <ul className="space-y-2">
            {sorular.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-violet-800 dark:text-violet-300"
              >
                <span className="mt-0.5 font-bold">Q{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
