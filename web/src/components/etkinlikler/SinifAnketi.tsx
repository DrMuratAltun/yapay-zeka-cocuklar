"use client";

import { useState } from "react";

interface SinifArkadasi {
  ad: string;
  boy: number;
  ayakNo: number;
  favoriRenk: string;
  hayvan: string;
  ekranSuresi: number;
}

const sahteVeriler: SinifArkadasi[] = [
  { ad: "Elif", boy: 152, ayakNo: 37, favoriRenk: "Mavi", hayvan: "Kedi", ekranSuresi: 2 },
  { ad: "Ahmet", boy: 158, ayakNo: 39, favoriRenk: "Kırmızı", hayvan: "Köpek", ekranSuresi: 3 },
  { ad: "Zeynep", boy: 148, ayakNo: 36, favoriRenk: "Mor", hayvan: "Tavşan", ekranSuresi: 1.5 },
  { ad: "Can", boy: 162, ayakNo: 40, favoriRenk: "Yeşil", hayvan: "Kedi", ekranSuresi: 4 },
  { ad: "Defne", boy: 155, ayakNo: 37, favoriRenk: "Mavi", hayvan: "Kuş", ekranSuresi: 2.5 },
  { ad: "Baran", boy: 160, ayakNo: 41, favoriRenk: "Siyah", hayvan: "Köpek", ekranSuresi: 3.5 },
  { ad: "Sude", boy: 145, ayakNo: 35, favoriRenk: "Pembe", hayvan: "Kedi", ekranSuresi: 2 },
  { ad: "Emre", boy: 157, ayakNo: 39, favoriRenk: "Mavi", hayvan: "Balık", ekranSuresi: 5 },
  { ad: "Nil", boy: 150, ayakNo: 36, favoriRenk: "Turuncu", hayvan: "Köpek", ekranSuresi: 1 },
  { ad: "Kaan", boy: 164, ayakNo: 42, favoriRenk: "Lacivert", hayvan: "Kaplumbağa", ekranSuresi: 3 },
];

const renkSecenekleri = ["Mavi", "Kırmızı", "Yeşil", "Mor", "Pembe", "Siyah", "Turuncu", "Sarı", "Lacivert", "Beyaz"];

export default function SinifAnketi() {
  const [adim, setAdim] = useState<"form" | "sonuc">("form");
  const [boy, setBoy] = useState("");
  const [ayakNo, setAyakNo] = useState("");
  const [favoriRenk, setFavoriRenk] = useState("");
  const [hayvan, setHayvan] = useState("");
  const [ekranSuresi, setEkranSuresi] = useState("");

  const tumVeriler: SinifArkadasi[] = adim === "sonuc"
    ? [
        ...sahteVeriler,
        {
          ad: "Sen",
          boy: Number(boy),
          ayakNo: Number(ayakNo),
          favoriRenk,
          hayvan,
          ekranSuresi: Number(ekranSuresi),
        },
      ]
    : sahteVeriler;

  const formGecerli = boy && ayakNo && favoriRenk && hayvan && ekranSuresi;

  const gonder = () => {
    if (formGecerli) setAdim("sonuc");
  };

  // Stats
  const ortalamaBoy = Math.round(tumVeriler.reduce((t, v) => t + v.boy, 0) / tumVeriler.length * 10) / 10;
  const ortalamaAyak = Math.round(tumVeriler.reduce((t, v) => t + v.ayakNo, 0) / tumVeriler.length * 10) / 10;
  const ortalamaEkran = Math.round(tumVeriler.reduce((t, v) => t + v.ekranSuresi, 0) / tumVeriler.length * 10) / 10;

  const renkSayilari: Record<string, number> = {};
  tumVeriler.forEach((v) => { renkSayilari[v.favoriRenk] = (renkSayilari[v.favoriRenk] || 0) + 1; });
  const enPopulerRenk = Object.entries(renkSayilari).sort((a, b) => b[1] - a[1])[0];

  const hayvanSayilari: Record<string, number> = {};
  tumVeriler.forEach((v) => { hayvanSayilari[v.hayvan] = (hayvanSayilari[v.hayvan] || 0) + 1; });
  const enPopulerHayvan = Object.entries(hayvanSayilari).sort((a, b) => b[1] - a[1])[0];

  const maxBoy = Math.max(...tumVeriler.map((v) => v.boy));
  const minBoy = Math.min(...tumVeriler.map((v) => v.boy));

  if (adim === "form") {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
        <h3 className="mb-1 text-xl font-bold">📊 Sınıf Anketi</h3>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          Sorulara cevap ver ve sınıf arkadaşlarının verileriyle karşılaştır! 10 sınıf arkadaşının
          cevapları zaten yüklü.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Boyun (cm)</label>
            <input
              type="number"
              value={boy}
              onChange={(e) => setBoy(e.target.value)}
              placeholder="Örn: 155"
              min={100}
              max={200}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Ayak Numaran</label>
            <input
              type="number"
              value={ayakNo}
              onChange={(e) => setAyakNo(e.target.value)}
              placeholder="Örn: 38"
              min={30}
              max={48}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Favori Rengin</label>
            <div className="flex flex-wrap gap-2">
              {renkSecenekleri.map((r) => (
                <button
                  key={r}
                  onClick={() => setFavoriRenk(r)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    favoriRenk === r
                      ? "bg-violet-600 text-white"
                      : "bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-violet-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">En Sevdiğin Hayvan</label>
            <input
              type="text"
              value={hayvan}
              onChange={(e) => setHayvan(e.target.value)}
              placeholder="Örn: Kedi"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Günlük Ekran Süresi (saat)</label>
            <input
              type="number"
              value={ekranSuresi}
              onChange={(e) => setEkranSuresi(e.target.value)}
              placeholder="Örn: 2.5"
              min={0}
              max={16}
              step={0.5}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none"
            />
          </div>

          <button
            onClick={gonder}
            disabled={!formGecerli}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-bold text-white transition hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gönder ve Sonuçları Gör 📊
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <h3 className="mb-1 text-xl font-bold">📊 Sınıf Anketi Sonuçları</h3>
      <p className="mb-5 text-sm text-[var(--color-text-secondary)]">
        Senin verilerin de eklendi! Toplam {tumVeriler.length} kişinin verileri:
      </p>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center dark:border-violet-700 dark:bg-violet-900/20">
          <p className="text-xs text-[var(--color-text-secondary)]">Ortalama Boy</p>
          <p className="text-2xl font-extrabold text-violet-700 dark:text-violet-300">{ortalamaBoy} cm</p>
          <p className="text-xs text-[var(--color-text-secondary)]">En kısa: {minBoy} cm &middot; En uzun: {maxBoy} cm</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-700 dark:bg-blue-900/20">
          <p className="text-xs text-[var(--color-text-secondary)]">Ortalama Ayak No</p>
          <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">{ortalamaAyak}</p>
        </div>
        <div className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-center dark:border-pink-700 dark:bg-pink-900/20">
          <p className="text-xs text-[var(--color-text-secondary)]">Ort. Ekran Süresi</p>
          <p className="text-2xl font-extrabold text-pink-700 dark:text-pink-300">{ortalamaEkran} saat</p>
        </div>
      </div>

      {/* Renk Chart */}
      <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <h4 className="mb-3 text-sm font-bold">🎨 En Popüler Renk: {enPopulerRenk[0]} ({enPopulerRenk[1]} kişi)</h4>
        <div className="space-y-2">
          {Object.entries(renkSayilari)
            .sort((a, b) => b[1] - a[1])
            .map(([renk, sayi]) => (
              <div key={renk} className="flex items-center gap-2">
                <span className="w-16 text-xs font-medium">{renk}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-500 flex items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-500"
                    style={{ width: `${(sayi / tumVeriler.length) * 100}%`, minWidth: "2rem" }}
                  >
                    {sayi}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Hayvan Chart */}
      <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <h4 className="mb-3 text-sm font-bold">🐾 En Popüler Hayvan: {enPopulerHayvan[0]} ({enPopulerHayvan[1]} kişi)</h4>
        <div className="space-y-2">
          {Object.entries(hayvanSayilari)
            .sort((a, b) => b[1] - a[1])
            .map(([h, sayi]) => (
              <div key={h} className="flex items-center gap-2">
                <span className="w-24 text-xs font-medium">{h}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-500"
                    style={{ width: `${(sayi / tumVeriler.length) * 100}%`, minWidth: "2rem" }}
                  >
                    {sayi}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Boy distribution */}
      <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <h4 className="mb-3 text-sm font-bold">📏 Boy Dağılımı</h4>
        <div className="flex items-end gap-1 justify-center h-32">
          {tumVeriler
            .sort((a, b) => a.boy - b.boy)
            .map((v) => (
              <div key={v.ad} className="flex flex-col items-center">
                <div
                  className={`w-5 sm:w-7 rounded-t transition-all ${v.ad === "Sen" ? "bg-pink-500" : "bg-violet-400"}`}
                  style={{ height: `${((v.boy - minBoy + 5) / (maxBoy - minBoy + 10)) * 100}%`, minHeight: "8px" }}
                  title={`${v.ad}: ${v.boy} cm`}
                />
                <span className={`mt-1 text-[9px] sm:text-[10px] ${v.ad === "Sen" ? "font-bold text-pink-600" : "text-[var(--color-text-secondary)]"}`}>
                  {v.ad === "Sen" ? "Sen" : v.ad.slice(0, 3)}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Discussion */}
      <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
        <h4 className="mb-2 font-bold text-amber-700 dark:text-amber-400">🤔 Tartışma Soruları</h4>
        <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
          <li>&#8226; En popüler renk hangisi? Sürpriz oldu mu?</li>
          <li>&#8226; Ortalama boy kaç cm? Sen ortalamanın üstünde misin altında mı?</li>
          <li>&#8226; Ekran süresi ile boy arasında bir ilişki olabilir mi?</li>
          <li>&#8226; Bu veriler &quot;yapısal veri&quot; mi yoksa &quot;yapısal olmayan veri&quot; mi?</li>
        </ul>
      </div>

      <button
        onClick={() => { setAdim("form"); setBoy(""); setAyakNo(""); setFavoriRenk(""); setHayvan(""); setEkranSuresi(""); }}
        className="mt-4 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
