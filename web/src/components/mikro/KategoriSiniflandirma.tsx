"use client";

import { useState, useCallback } from "react";

interface Oge {
  ad: string;
  kategori: string;
}

interface KategoriSiniflandirmaProps {
  baslik: string;
  kategoriler: string[];
  ogeler: Oge[];
  onComplete?: () => void;
}

export default function KategoriSiniflandirma({ baslik, kategoriler, ogeler, onComplete }: KategoriSiniflandirmaProps) {
  const [yerlestirilmis, setYerlestirilmis] = useState<Map<string, string>>(new Map());
  const [seciliOge, setSeciliOge] = useState<string | null>(null);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [kontrol, setKontrol] = useState(false);

  const kalanlar = ogeler.filter((o) => !yerlestirilmis.has(o.ad));

  const ogeSecTikla = (ad: string) => {
    if (tamamlandi) return;
    setSeciliOge(seciliOge === ad ? null : ad);
  };

  const kategoriyeYerlestir = useCallback((kategori: string) => {
    if (!seciliOge || tamamlandi) return;
    setYerlestirilmis((prev) => {
      const next = new Map(prev);
      next.set(seciliOge, kategori);
      return next;
    });
    setSeciliOge(null);
  }, [seciliOge, tamamlandi]);

  const kontrolEt = () => {
    setKontrol(true);
    const hepsiDogru = ogeler.every((o) => yerlestirilmis.get(o.ad) === o.kategori);
    if (hepsiDogru) {
      setTamamlandi(true);
      onComplete?.();
    }
  };

  const sifirla = () => {
    setYerlestirilmis(new Map());
    setSeciliOge(null);
    setKontrol(false);
    setTamamlandi(false);
  };

  const dogruSayisi = ogeler.filter((o) => yerlestirilmis.get(o.ad) === o.kategori).length;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-5 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-bold">⟳</span>
        <p className="font-semibold text-foreground text-sm">{baslik}</p>
      </div>

      {/* Kalan ogeler */}
      {kalanlar.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1.5">Bir öğeye tıkla, sonra kategorisine tıkla:</p>
          <div className="flex flex-wrap gap-1.5">
            {kalanlar.map((o) => (
              <button
                key={o.ad}
                onClick={() => ogeSecTikla(o.ad)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  seciliOge === o.ad
                    ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20 ring-1 ring-violet-400 text-violet-700 dark:text-violet-300"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-violet-300"
                }`}
              >
                {o.ad}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Kategoriler */}
      <div className={`grid gap-3 ${kategoriler.length <= 3 ? `grid-cols-${kategoriler.length}` : "grid-cols-2 sm:grid-cols-3"}`}>
        {kategoriler.map((kat) => {
          const iceridekiler = ogeler.filter((o) => yerlestirilmis.get(o.ad) === kat);
          return (
            <button
              key={kat}
              onClick={() => kategoriyeYerlestir(kat)}
              disabled={!seciliOge || tamamlandi}
              className={`rounded-xl border-2 border-dashed p-3 text-left transition min-h-[80px] ${
                seciliOge
                  ? "border-violet-300 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/10 cursor-pointer"
                  : "border-[var(--color-border)]"
              }`}
            >
              <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{kat}</p>
              <div className="flex flex-wrap gap-1">
                {iceridekiler.map((o) => {
                  const dogru = kontrol ? o.kategori === kat : null;
                  return (
                    <span
                      key={o.ad}
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        dogru === null
                          ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                          : dogru
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 line-through"
                      }`}
                    >
                      {o.ad} {dogru === true && "✓"} {dogru === false && "✗"}
                    </span>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Kontrol / Sifirla butonlari */}
      {yerlestirilmis.size === ogeler.length && !tamamlandi && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={kontrolEt}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition"
          >
            Kontrol Et
          </button>
          <button
            onClick={sifirla}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Sıfırla
          </button>
        </div>
      )}

      {kontrol && !tamamlandi && (
        <div className="mt-3 rounded-lg p-3 text-sm bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
          <p className="font-semibold">💡 {dogruSayisi}/{ogeler.length} doğru. Tekrar dene!</p>
          <button onClick={sifirla} className="mt-1 text-amber-700 dark:text-amber-300 underline text-xs font-semibold">
            Sıfırla ve tekrar dene
          </button>
        </div>
      )}

      {tamamlandi && (
        <div className="mt-3 rounded-lg p-3 text-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200">
          <p className="font-semibold">🎉 Harika! Tüm öğeleri doğru sınıflandırdın!</p>
        </div>
      )}
    </div>
  );
}
