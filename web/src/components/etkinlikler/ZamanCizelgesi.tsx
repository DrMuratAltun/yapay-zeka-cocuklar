"use client";

import { useState, useCallback } from "react";

interface Olay {
  id: string;
  yil: number;
  baslik: string;
  aciklama: string;
  emoji: string;
  kullanicininMi: boolean;
}

const varsayilanOlaylar: Olay[] = [
  { id: "1", yil: 1642, baslik: "İlk Mekanik Hesap Makinesi", aciklama: "Blaise Pascal mekanik hesap makinesini icat etti.", emoji: "🔢", kullanicininMi: false },
  { id: "2", yil: 1950, baslik: "Turing Testi", aciklama: "Alan Turing 'Makineler düşünebilir mi?' sorusunu sordu.", emoji: "🧠", kullanicininMi: false },
  { id: "3", yil: 1956, baslik: "Yapay Zeka Terimi", aciklama: "John McCarthy 'yapay zeka' terimini ilk kez kullandı.", emoji: "💡", kullanicininMi: false },
  { id: "4", yil: 1959, baslik: "Cahit Arf'ın Çalışması", aciklama: "Türk matematikçi Cahit Arf, makinelerin düşünmesi üzerine çalıştı.", emoji: "🇹🇷", kullanicininMi: false },
  { id: "5", yil: 1965, baslik: "ELIZA Sohbet Robotu", aciklama: "İlk sohbet robotu ELIZA geliştirildi.", emoji: "💬", kullanicininMi: false },
  { id: "6", yil: 1997, baslik: "Deep Blue Zaferi", aciklama: "IBM Deep Blue, satranç şampiyonu Kasparov'u yendi.", emoji: "♟️", kullanicininMi: false },
  { id: "7", yil: 2011, baslik: "Siri ve Sesli Asistanlar", aciklama: "Apple Siri ile sesli asistan çağı başladı.", emoji: "🎙️", kullanicininMi: false },
  { id: "8", yil: 2014, baslik: "Sesli Asistanlar ve Akıllı Ev", aciklama: "Sesli asistanlar ile akıllı ev sistemleri yaygınlaştı.", emoji: "🏠", kullanicininMi: false },
  { id: "9", yil: 2016, baslik: "AlphaGo Zaferi", aciklama: "Google AlphaGo, Go oyununda dünya şampiyonunu yendi.", emoji: "🎯", kullanicininMi: false },
  { id: "10", yil: 2022, baslik: "ChatGPT Çağı", aciklama: "OpenAI ChatGPT ile üretken YZ çağı başladı.", emoji: "🤖", kullanicininMi: false },
  { id: "11", yil: 2024, baslik: "Çok Modlu YZ", aciklama: "Metin, görüntü, ses ve video birlikte işleyen YZ modelleri.", emoji: "🌐", kullanicininMi: false },
];

export default function ZamanCizelgesi() {
  const [karisikOlaylar, setKarisikOlaylar] = useState<Olay[]>(() => {
    const kopya = [...varsayilanOlaylar];
    for (let i = kopya.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
    }
    return kopya;
  });
  const [yerlestirilmis, setYerlestirilmis] = useState<Olay[]>([]);
  const [seciliOlay, setSeciliOlay] = useState<string | null>(null);
  const [puan, setPuan] = useState(0);
  const [yanlisSayisi, setYanlisSayisi] = useState(0);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [yeniYil, setYeniYil] = useState("");
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [tahminler, setTahminler] = useState<Olay[]>([]);
  const [gosterTahminFormu, setGosterTahminFormu] = useState(false);

  const olayiYerlestir = useCallback((olay: Olay) => {
    setSeciliOlay(olay.id);
  }, []);

  const pozisyonaYerlestir = useCallback((index: number) => {
    if (!seciliOlay) return;
    const olay = karisikOlaylar.find((o) => o.id === seciliOlay);
    if (!olay) return;

    const yeniYerlestirilmis = [...yerlestirilmis];
    yeniYerlestirilmis.splice(index, 0, olay);

    // Doğru sıralamayı kontrol et
    const siraDogruMu = yeniYerlestirilmis.every((o, i) => {
      if (i === 0) return true;
      return o.yil >= yeniYerlestirilmis[i - 1].yil;
    });

    if (siraDogruMu) {
      setYerlestirilmis(yeniYerlestirilmis);
      setKarisikOlaylar((prev) => prev.filter((o) => o.id !== seciliOlay));
      setPuan((p) => p + 10);
    } else {
      setYanlisSayisi((y) => y + 1);
    }
    setSeciliOlay(null);

    // Tamamlandı mı kontrol et
    if (siraDogruMu && karisikOlaylar.length === 1) {
      setTamamlandi(true);
    }
  }, [seciliOlay, karisikOlaylar, yerlestirilmis]);

  const tahminEkle = useCallback(() => {
    const yil = parseInt(yeniYil);
    if (isNaN(yil) || yil < 2025 || yil > 2100 || !yeniBaslik.trim()) return;
    const yeniTahmin: Olay = {
      id: `tahmin-${Date.now()}`,
      yil,
      baslik: yeniBaslik.trim(),
      aciklama: "Senin tahminin!",
      emoji: "🔮",
      kullanicininMi: true,
    };
    setTahminler((prev) => [...prev, yeniTahmin].sort((a, b) => a.yil - b.yil));
    setYeniYil("");
    setYeniBaslik("");
  }, [yeniYil, yeniBaslik]);

  const sifirla = useCallback(() => {
    const kopya = [...varsayilanOlaylar];
    for (let i = kopya.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
    }
    setKarisikOlaylar(kopya);
    setYerlestirilmis([]);
    setSeciliOlay(null);
    setPuan(0);
    setYanlisSayisi(0);
    setTamamlandi(false);
  }, []);

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">🕰️ YZ Zaman Çizelgesi Oluşturucu</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            Puan: {puan}
          </span>
          <span className="rounded-full bg-rose-100 px-3 py-1 font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            Yanlış: {yanlisSayisi}
          </span>
        </div>
      </div>

      {!tamamlandi ? (
        <>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Aşağıdaki olayları kronolojik sıraya göre zaman çizelgesine yerleştir! Bir olaya tıkla, sonra çizelgede doğru yerine tıkla.
          </p>

          {/* Karışık olaylar */}
          {karisikOlaylar.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                Yerleştirilecek Olaylar ({karisikOlaylar.length} kaldı):
              </h4>
              <div className="flex flex-wrap gap-2">
                {karisikOlaylar.map((olay) => (
                  <button
                    key={olay.id}
                    onClick={() => olayiYerlestir(olay)}
                    className={`rounded-lg border-2 px-3 py-2 text-left text-sm transition ${
                      seciliOlay === olay.id
                        ? "border-sky-500 bg-sky-50 shadow-md dark:bg-sky-900/30"
                        : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-sky-300"
                    }`}
                  >
                    <span className="mr-1">{olay.emoji}</span>
                    <span className="font-medium">{olay.baslik}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zaman çizelgesi */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Zaman Çizelgesi:</h4>
            <div className="relative">
              {/* Başa ekleme butonu */}
              {seciliOlay && (
                <button
                  onClick={() => pozisyonaYerlestir(0)}
                  className="mb-1 w-full rounded border-2 border-dashed border-sky-300 bg-sky-50/50 py-2 text-xs text-sky-600 transition hover:bg-sky-100 dark:bg-sky-900/10 dark:hover:bg-sky-900/20"
                >
                  ↓ Buraya yerleştir (en başa)
                </button>
              )}

              {yerlestirilmis.map((olay, i) => (
                <div key={olay.id}>
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-900/20">
                    <span className="shrink-0 rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                      {olay.yil}
                    </span>
                    <span className="text-sm">{olay.emoji}</span>
                    <span className="text-sm font-medium">{olay.baslik}</span>
                  </div>
                  {seciliOlay && (
                    <button
                      onClick={() => pozisyonaYerlestir(i + 1)}
                      className="my-1 w-full rounded border-2 border-dashed border-sky-300 bg-sky-50/50 py-2 text-xs text-sky-600 transition hover:bg-sky-100 dark:bg-sky-900/10 dark:hover:bg-sky-900/20"
                    >
                      ↓ Buraya yerleştir (bu olaydan sonra)
                    </button>
                  )}
                </div>
              ))}

              {yerlestirilmis.length === 0 && !seciliOlay && (
                <div className="rounded-lg border-2 border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-secondary)]">
                  Bir olay seçerek zaman çizelgesini oluşturmaya başla!
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Tamamlanma ekranı */}
          <div className="rounded-xl bg-emerald-50 p-6 text-center dark:bg-emerald-900/20">
            <p className="text-4xl">🎉</p>
            <h4 className="mt-2 text-xl font-bold text-emerald-700 dark:text-emerald-300">Tebrikler!</h4>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              Zaman çizelgesini başarıyla tamamladın!
            </p>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <span className="rounded-full bg-emerald-200 px-4 py-1 font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                Puan: {puan}
              </span>
              <span className="rounded-full bg-rose-200 px-4 py-1 font-bold text-rose-800 dark:bg-rose-800 dark:text-rose-200">
                Yanlış: {yanlisSayisi}
              </span>
              <span className="rounded-full bg-sky-200 px-4 py-1 font-bold text-sky-800 dark:bg-sky-800 dark:text-sky-200">
                Doğruluk: {Math.round((puan / (puan + yanlisSayisi * 10)) * 100)}%
              </span>
            </div>
          </div>

          {/* Tamamlanmış çizelge */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Tamamlanmış Zaman Çizelgesi:</h4>
            <div className="relative ml-4 border-l-2 border-sky-300 pl-4">
              {yerlestirilmis.map((olay) => (
                <div key={olay.id} className="relative mb-3 pb-1">
                  <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-sky-500" />
                  <div className="rounded-lg bg-[var(--color-bg-secondary)] p-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-sky-600 px-2 py-0.5 text-xs font-bold text-white">{olay.yil}</span>
                      <span>{olay.emoji}</span>
                      <span className="font-semibold text-sm">{olay.baslik}</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{olay.aciklama}</p>
                  </div>
                </div>
              ))}
              {/* Tahminler */}
              {tahminler.map((tahmin) => (
                <div key={tahmin.id} className="relative mb-3 pb-1">
                  <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-violet-500" />
                  <div className="rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-800 dark:bg-violet-900/20">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">{tahmin.yil}</span>
                      <span>🔮</span>
                      <span className="font-semibold text-sm">{tahmin.baslik}</span>
                    </div>
                    <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">Senin tahminin!</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gelecek tahmini ekleme */}
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
            <button
              onClick={() => setGosterTahminFormu(!gosterTahminFormu)}
              className="flex w-full items-center justify-between font-semibold text-violet-700 dark:text-violet-300"
            >
              <span>🔮 Gelecek Tahmini Ekle</span>
              <span>{gosterTahminFormu ? "▲" : "▼"}</span>
            </button>
            {gosterTahminFormu && (
              <div className="mt-3 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="number"
                    min={2025}
                    max={2100}
                    value={yeniYil}
                    onChange={(e) => setYeniYil(e.target.value)}
                    placeholder="Yıl (2025-2100)"
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={yeniBaslik}
                    onChange={(e) => setYeniBaslik(e.target.value)}
                    placeholder="Ne olacağını tahmin ediyorsun?"
                    className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
                  />
                  <button
                    onClick={tahminEkle}
                    disabled={!yeniYil || !yeniBaslik.trim()}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
                  >
                    Ekle
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={sifirla}
            className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Tekrar Dene
          </button>
        </>
      )}
    </div>
  );
}
