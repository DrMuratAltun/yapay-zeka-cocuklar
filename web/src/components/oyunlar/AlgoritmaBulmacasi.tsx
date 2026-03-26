"use client";

import { useState } from "react";

const seviyeler = [
  {
    baslik: "Çay Yapma Algoritması",
    emoji: "☕",
    adimlar: ["Su kaynat", "Bardağa çay poşeti koy", "Kaynar suyu bardağa dök", "3 dakika bekle", "Şeker ekle", "Karıştır ve servis et"],
  },
  {
    baslik: "Fotoğraf Sınıflandırma",
    emoji: "📸",
    adimlar: ["Fotoğrafları topla", "Kategorilere ayır (etiketle)", "Modeli eğit", "Test fotoğrafı ver", "Tahmin sonucunu al", "Doğruluğu kontrol et"],
  },
  {
    baslik: "Spam Filtresi Algoritması",
    emoji: "📧",
    adimlar: ["E-postayı al", "Kelimeleri analiz et", "Önceki spam örnekleriyle karşılaştır", "Spam skoru hesapla", "Eşik değeriyle karşılaştır", "Spam veya normal olarak işaretle"],
  },
];

function karistir<T>(dizi: T[]): T[] {
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

export default function AlgoritmaBulmacasi() {
  const [seviye, setSeviye] = useState(0);
  const [karisik, setKarisik] = useState<string[]>(() => karistir(seviyeler[0].adimlar));
  const [yerlesim, setYerlesim] = useState<(string | null)[]>(() => new Array(seviyeler[0].adimlar.length).fill(null));
  const [secili, setSecili] = useState<string | null>(null);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [tumBitti, setTumBitti] = useState(false);
  const [sonuclar, setSonuclar] = useState<boolean[]>([]);

  const mevcutSeviye = seviyeler[seviye];

  function adimSec(adim: string) {
    if (tamamlandi) return;
    setSecili(adim);
  }

  function slotaTikla(index: number) {
    if (tamamlandi || !secili) return;
    if (yerlesim[index] !== null) return;
    const yeniYerlesim = [...yerlesim];
    yeniYerlesim[index] = secili;
    setYerlesim(yeniYerlesim);
    setSecili(null);

    if (yeniYerlesim.every((y) => y !== null)) {
      const dogru = yeniYerlesim.every((y, i) => y === mevcutSeviye.adimlar[i]);
      setTamamlandi(true);
      setSonuclar([...sonuclar, dogru]);
    }
  }

  function adimKaldir(index: number) {
    if (tamamlandi) return;
    const yeniYerlesim = [...yerlesim];
    yeniYerlesim[index] = null;
    setYerlesim(yeniYerlesim);
  }

  function sonrakiSeviye() {
    if (seviye + 1 >= seviyeler.length) {
      setTumBitti(true);
    } else {
      const yeniSeviye = seviye + 1;
      setSeviye(yeniSeviye);
      setKarisik(karistir(seviyeler[yeniSeviye].adimlar));
      setYerlesim(new Array(seviyeler[yeniSeviye].adimlar.length).fill(null));
      setSecili(null);
      setTamamlandi(false);
    }
  }

  function sifirla() {
    setSeviye(0);
    setKarisik(karistir(seviyeler[0].adimlar));
    setYerlesim(new Array(seviyeler[0].adimlar.length).fill(null));
    setSecili(null);
    setTamamlandi(false);
    setTumBitti(false);
    setSonuclar([]);
  }

  function tekrarla() {
    setKarisik(karistir(mevcutSeviye.adimlar));
    setYerlesim(new Array(mevcutSeviye.adimlar.length).fill(null));
    setSecili(null);
    setTamamlandi(false);
    setSonuclar(sonuclar.slice(0, -1));
  }

  const yerlestirilmis = new Set(yerlesim.filter(Boolean));
  const dogruMu = tamamlandi && yerlesim.every((y, i) => y === mevcutSeviye.adimlar[i]);

  if (tumBitti) {
    const dogruSayisi = sonuclar.filter(Boolean).length;
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{dogruSayisi === 3 ? "🏆" : "👏"}</div>
        <h3 className="text-2xl font-bold mb-2">Tüm Seviyeler Tamamlandı!</h3>
        <p className="text-lg mb-2">
          <span className="font-bold text-blue-600">{dogruSayisi}</span> / 3 seviye doğru sıralandı
        </p>
        {dogruSayisi === 3 && (
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-1.5 text-sm font-bold text-white mb-4">
            🏆 Algoritma Ustası Rozeti!
          </div>
        )}
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Algoritma = adım adım talimatlar. Bilgisayarlar da böyle çalışır!
        </p>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🧩 Algoritma Bulmacası</h3>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          Seviye {seviye + 1} / {seviyeler.length}
        </span>
      </div>

      <p className="text-center mb-4 font-medium">
        {mevcutSeviye.emoji} {mevcutSeviye.baslik}
      </p>
      <p className="text-center text-sm text-[var(--color-text-secondary)] mb-6">
        Adımları doğru sıraya yerleştir!
      </p>

      {/* Available steps */}
      <div className="mb-6">
        <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-2">Adımlar (tıkla seç):</p>
        <div className="flex flex-wrap gap-2">
          {karisik.map((adim) => {
            const kullanildi = yerlestirilmis.has(adim);
            return (
              <button
                key={adim}
                type="button"
                onClick={() => adimSec(adim)}
                disabled={kullanildi || tamamlandi}
                className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
                  kullanildi
                    ? "border-gray-200 text-gray-300 dark:border-gray-700 dark:text-gray-600"
                    : secili === adim
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-[var(--color-border)] hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                }`}
              >
                {adim}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots */}
      <div className="space-y-2">
        {yerlesim.map((y, i) => {
          const dogruAdim = tamamlandi && y === mevcutSeviye.adimlar[i];
          const yanlisAdim = tamamlandi && y !== null && y !== mevcutSeviye.adimlar[i];
          return (
            <div
              key={i}
              onClick={() => y ? adimKaldir(i) : slotaTikla(i)}
              className={`flex items-center gap-3 rounded-xl border-2 border-dashed p-3 cursor-pointer transition min-h-[48px] ${
                dogruAdim
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                  : yanlisAdim
                  ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                  : y
                  ? "border-blue-300 bg-blue-50 dark:bg-blue-900/10"
                  : secili
                  ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/5 animate-pulse"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium flex-1">
                {y || (secili ? "Buraya yerleştirmek için tıkla" : "—")}
              </span>
              {tamamlandi && dogruAdim && <span className="text-emerald-600">✓</span>}
              {tamamlandi && yanlisAdim && <span className="text-rose-500">✗</span>}
            </div>
          );
        })}
      </div>

      {tamamlandi && (
        <div className="mt-4 flex gap-3">
          {dogruMu ? (
            <button onClick={sonrakiSeviye} className="cursor-pointer rounded-xl bg-emerald-500 px-8 py-2.5 font-bold text-white hover:bg-emerald-600 transition">
              {seviye + 1 < seviyeler.length ? "Sonraki Seviye →" : "Sonuçları Gör"}
            </button>
          ) : (
            <>
              <button onClick={tekrarla} className="cursor-pointer rounded-xl bg-amber-500 px-6 py-2.5 font-bold text-white hover:bg-amber-600 transition">
                Tekrar Dene
              </button>
              <button onClick={sonrakiSeviye} className="cursor-pointer rounded-xl bg-blue-500 px-6 py-2.5 font-bold text-white hover:bg-blue-600 transition">
                Geç →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
