"use client";

import { useState } from "react";

const meyveler = [
  { ad: "Elma", emoji: "🍎", renk: "Kırmızı", boyut: "Orta", sekil: "Yuvarlak" },
  { ad: "Muz", emoji: "🍌", renk: "Sarı", boyut: "Orta", sekil: "Uzun" },
  { ad: "Portakal", emoji: "🍊", renk: "Turuncu", boyut: "Orta", sekil: "Yuvarlak" },
  { ad: "Çilek", emoji: "🍓", renk: "Kırmızı", boyut: "Küçük", sekil: "Kalp" },
  { ad: "Karpuz", emoji: "🍉", renk: "Yeşil", boyut: "Büyük", sekil: "Yuvarlak" },
  { ad: "Limon", emoji: "🍋", renk: "Sarı", boyut: "Küçük", sekil: "Oval" },
  { ad: "Üzüm", emoji: "🍇", renk: "Mor", boyut: "Küçük", sekil: "Yuvarlak" },
  { ad: "Ananas", emoji: "🍍", renk: "Sarı", boyut: "Büyük", sekil: "Oval" },
];

const sorular: { soru: string; ozellik: "renk" | "boyut" | "sekil"; deger: string }[] = [
  { soru: "Meyve kırmızı mı?", ozellik: "renk", deger: "Kırmızı" },
  { soru: "Meyve sarı mı?", ozellik: "renk", deger: "Sarı" },
  { soru: "Meyve küçük mü?", ozellik: "boyut", deger: "Küçük" },
  { soru: "Meyve büyük mü?", ozellik: "boyut", deger: "Büyük" },
  { soru: "Meyve yuvarlak mı?", ozellik: "sekil", deger: "Yuvarlak" },
  { soru: "Meyve uzun mu?", ozellik: "sekil", deger: "Uzun" },
];

export default function KararAgaci() {
  const [mevcutMeyve, setMevcutMeyve] = useState(0);
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState<{ soru: string; cevap: string }[]>([]);
  const [tahmin, setTahmin] = useState<string | null>(null);
  const [skor, setSkor] = useState(0);
  const [tamamlanan, setTamamlanan] = useState(0);
  const [bitti, setBitti] = useState(false);

  const meyve = meyveler[mevcutMeyve];

  function cevapVer(evet: boolean) {
    const s = sorular[soruIndex];
    const yeniCevaplar = [...cevaplar, { soru: s.soru, cevap: evet ? "Evet" : "Hayır" }];
    setCevaplar(yeniCevaplar);

    // Filter remaining fruits
    const kalanMeyveler = meyveler.filter((m) => {
      return yeniCevaplar.every((c) => {
        const soruObj = sorular.find((sq) => sq.soru === c.soru)!;
        const esuyor = m[soruObj.ozellik] === soruObj.deger;
        return c.cevap === "Evet" ? esuyor : !esuyor;
      });
    });

    if (kalanMeyveler.length === 1) {
      setTahmin(kalanMeyveler[0].ad);
    } else if (soruIndex < sorular.length - 1) {
      setSoruIndex(soruIndex + 1);
    } else {
      setTahmin(kalanMeyveler.length > 0 ? kalanMeyveler[0].ad : "Bilinmiyor");
    }
  }

  function tahminOnayla(dogru: boolean) {
    if (dogru) setSkor(skor + 1);
    const yeniTamamlanan = tamamlanan + 1;
    setTamamlanan(yeniTamamlanan);

    if (yeniTamamlanan >= meyveler.length) {
      setBitti(true);
    } else {
      setMevcutMeyve(yeniTamamlanan);
      setSoruIndex(0);
      setCevaplar([]);
      setTahmin(null);
    }
  }

  function sifirla() {
    setMevcutMeyve(0);
    setSoruIndex(0);
    setCevaplar([]);
    setTahmin(null);
    setSkor(0);
    setTamamlanan(0);
    setBitti(false);
  }

  if (bitti) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{skor >= 6 ? "🏆" : skor >= 4 ? "👏" : "💪"}</div>
        <h3 className="text-2xl font-bold mb-2">Karar Ağacı Tamamlandı!</h3>
        <p className="text-lg mb-4">
          <span className="font-bold text-orange-600">{skor}</span> / {meyveler.length} meyveyi doğru sınıflandırdın!
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Tıpkı bir makine öğrenimi modeli gibi, özelliklere bakarak karar verdin! 🧠
        </p>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🌳 Karar Ağacı Oluşturucu</h3>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
          {tamamlanan + 1} / {meyveler.length}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-orange-500 transition-all" style={{ width: `${(tamamlanan / meyveler.length) * 100}%` }} />
      </div>

      {/* Current fruit */}
      <div className="text-center mb-6">
        <div className="text-7xl mb-2">{meyve.emoji}</div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Bu meyveyi tanımak için soruları cevapla
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {meyve.renk}
          </span>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {meyve.boyut}
          </span>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {meyve.sekil}
          </span>
        </div>
      </div>

      {/* Decision path */}
      {cevaplar.length > 0 && (
        <div className="mb-4 space-y-1">
          {cevaplar.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-orange-500">{"→".repeat(i + 1)}</span>
              <span>{c.soru}</span>
              <span className={`font-bold ${c.cevap === "Evet" ? "text-emerald-600" : "text-rose-500"}`}>
                {c.cevap}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Question or Guess */}
      {tahmin === null ? (
        <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 p-4 text-center">
          <p className="font-bold mb-3">{sorular[soruIndex].soru}</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => cevapVer(true)} className="cursor-pointer rounded-xl bg-emerald-500 px-8 py-2.5 font-bold text-white hover:bg-emerald-600 transition">
              ✅ Evet
            </button>
            <button onClick={() => cevapVer(false)} className="cursor-pointer rounded-xl bg-rose-500 px-8 py-2.5 font-bold text-white hover:bg-rose-600 transition">
              ❌ Hayır
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
          <p className="text-sm mb-1 text-[var(--color-text-secondary)]">Karar ağacına göre bu meyve:</p>
          <p className="text-2xl font-bold mb-3">{meyveler.find((m) => m.ad === tahmin)?.emoji} {tahmin}</p>
          <p className="text-sm mb-3">Bu doğru mu?</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => tahminOnayla(tahmin === meyve.ad)} className="cursor-pointer rounded-xl bg-emerald-500 px-6 py-2 font-bold text-white hover:bg-emerald-600 transition">
              ✅ Doğru
            </button>
            <button onClick={() => tahminOnayla(tahmin !== meyve.ad)} className="cursor-pointer rounded-xl bg-rose-500 px-6 py-2 font-bold text-white hover:bg-rose-600 transition">
              ❌ Yanlış, bu {meyve.ad}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
