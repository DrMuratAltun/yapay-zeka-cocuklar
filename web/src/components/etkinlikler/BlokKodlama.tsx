"use client";

import { useState, useCallback } from "react";

interface Blok {
  id: string;
  tip: "olay" | "kosul" | "dongu" | "eylem" | "yz" | "degisken";
  metin: string;
  renk: string;
  emoji: string;
}

interface Bulmaca {
  id: number;
  baslik: string;
  aciklama: string;
  zorluk: "Kolay" | "Orta" | "Zor";
  mevcutBloklar: Blok[];
  dogruSira: string[];
  ipucu: string;
}

const blokRenkleri: Record<string, string> = {
  olay: "bg-amber-500 border-amber-600",
  kosul: "bg-orange-500 border-orange-600",
  dongu: "bg-green-500 border-green-600",
  eylem: "bg-blue-500 border-blue-600",
  yz: "bg-purple-500 border-purple-600",
  degisken: "bg-red-500 border-red-600",
};

const bulmacalar: Bulmaca[] = [
  {
    id: 1,
    baslik: "Selam Veren Robot",
    aciklama: "Bir robotun insanı gördüğünde selam vermesini sağla. Doğru sırayla blokları yerleştir.",
    zorluk: "Kolay",
    mevcutBloklar: [
      { id: "b1_1", tip: "eylem", metin: "\"Merhaba!\" de", renk: blokRenkleri.eylem, emoji: "💬" },
      { id: "b1_2", tip: "olay", metin: "Yeşil bayrak tıklandığında", renk: blokRenkleri.olay, emoji: "🚩" },
      { id: "b1_3", tip: "yz", metin: "Kamerada insan algıla", renk: blokRenkleri.yz, emoji: "🤖" },
      { id: "b1_4", tip: "kosul", metin: "Eğer insan algılandıysa", renk: blokRenkleri.kosul, emoji: "❓" },
    ],
    dogruSira: ["b1_2", "b1_3", "b1_4", "b1_1"],
    ipucu: "Önce programı başlat, sonra algıla, kontrol et ve son olarak eylem yap.",
  },
  {
    id: 2,
    baslik: "Duygu Dedektörü",
    aciklama: "Kameradaki yüzün mutlu mu üzgün mü olduğunu anlayan ve buna göre tepki veren bir program yap.",
    zorluk: "Orta",
    mevcutBloklar: [
      { id: "b2_1", tip: "eylem", metin: "Sahne rengini mavi yap", renk: blokRenkleri.eylem, emoji: "🔵" },
      { id: "b2_2", tip: "kosul", metin: "Eğer duygu = \"mutlu\" ise", renk: blokRenkleri.kosul, emoji: "😊" },
      { id: "b2_3", tip: "olay", metin: "Yeşil bayrak tıklandığında", renk: blokRenkleri.olay, emoji: "🚩" },
      { id: "b2_4", tip: "eylem", metin: "Sahne rengini sarı yap", renk: blokRenkleri.eylem, emoji: "🟡" },
      { id: "b2_5", tip: "yz", metin: "Yüz duygu analizi yap", renk: blokRenkleri.yz, emoji: "🤖" },
      { id: "b2_6", tip: "kosul", metin: "Değilse (üzgün ise)", renk: blokRenkleri.kosul, emoji: "😢" },
    ],
    dogruSira: ["b2_3", "b2_5", "b2_2", "b2_4", "b2_6", "b2_1"],
    ipucu: "Başlat → YZ analiz → mutlu ise sarı → değilse mavi sırası ile ilerle.",
  },
  {
    id: 3,
    baslik: "Nesne Sayacı",
    aciklama: "Kameradaki nesneleri sürekli sayıp ekrana yazan, 5'ten fazla nesne görünce uyarı veren program.",
    zorluk: "Zor",
    mevcutBloklar: [
      { id: "b3_1", tip: "dongu", metin: "Sürekli tekrarla", renk: blokRenkleri.dongu, emoji: "🔄" },
      { id: "b3_2", tip: "eylem", metin: "\"Çok kalabalık!\" de", renk: blokRenkleri.eylem, emoji: "⚠️" },
      { id: "b3_3", tip: "degisken", metin: "sayac = algılanan nesne sayısı", renk: blokRenkleri.degisken, emoji: "📊" },
      { id: "b3_4", tip: "olay", metin: "Yeşil bayrak tıklandığında", renk: blokRenkleri.olay, emoji: "🚩" },
      { id: "b3_5", tip: "kosul", metin: "Eğer sayac > 5 ise", renk: blokRenkleri.kosul, emoji: "❓" },
      { id: "b3_6", tip: "yz", metin: "Kamerada nesne algıla", renk: blokRenkleri.yz, emoji: "🤖" },
      { id: "b3_7", tip: "eylem", metin: "sayac değerini ekrana yaz", renk: blokRenkleri.eylem, emoji: "💬" },
    ],
    dogruSira: ["b3_4", "b3_1", "b3_6", "b3_3", "b3_7", "b3_5", "b3_2"],
    ipucu: "Başlat → Döngü → Algıla → Sayacı güncelle → Ekrana yaz → 5'ten fazla mı kontrol et → Uyarı ver.",
  },
];

export default function BlokKodlama() {
  const [aktifBulmaca, setAktifBulmaca] = useState(0);
  const [yerlestirilmisler, setYerlestirilmisler] = useState<Record<number, string[]>>({});
  const [sonuclar, setSonuclar] = useState<Record<number, boolean | null>>({});
  const [ipucuGoster, setIpucuGoster] = useState(false);

  const bulmaca = bulmacalar[aktifBulmaca];
  const simdikiYerlestirme = yerlestirilmisler[bulmaca.id] || [];
  const sonuc = sonuclar[bulmaca.id] ?? null;

  const kalanBloklar = bulmaca.mevcutBloklar.filter(
    (b) => !simdikiYerlestirme.includes(b.id)
  );

  const blokEkle = useCallback(
    (blokId: string) => {
      if (sonuc !== null) return;
      setYerlestirilmisler((prev) => ({
        ...prev,
        [bulmaca.id]: [...(prev[bulmaca.id] || []), blokId],
      }));
    },
    [bulmaca.id, sonuc]
  );

  const blokCikar = useCallback(
    (index: number) => {
      if (sonuc !== null) return;
      setYerlestirilmisler((prev) => ({
        ...prev,
        [bulmaca.id]: (prev[bulmaca.id] || []).filter((_, i) => i !== index),
      }));
    },
    [bulmaca.id, sonuc]
  );

  const kontrolEt = useCallback(() => {
    const dogru =
      simdikiYerlestirme.length === bulmaca.dogruSira.length &&
      simdikiYerlestirme.every((id, i) => id === bulmaca.dogruSira[i]);
    setSonuclar((prev) => ({ ...prev, [bulmaca.id]: dogru }));
  }, [simdikiYerlestirme, bulmaca]);

  const sifirla = useCallback(() => {
    setYerlestirilmisler((prev) => ({ ...prev, [bulmaca.id]: [] }));
    setSonuclar((prev) => ({ ...prev, [bulmaca.id]: null }));
    setIpucuGoster(false);
  }, [bulmaca.id]);

  const tamamlananSayisi = Object.values(sonuclar).filter((s) => s === true).length;

  const blokBul = (id: string) => bulmaca.mevcutBloklar.find((b) => b.id === id);

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">🧩 Blok Kodlama Simülatörü</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Blokları doğru sırayla yerleştirerek programı oluştur!
        </p>
      </div>

      {/* Blok Tipleri Açıklama */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { tip: "olay", ad: "Olay", emoji: "🚩" },
          { tip: "yz", ad: "YZ", emoji: "🤖" },
          { tip: "kosul", ad: "Koşul", emoji: "❓" },
          { tip: "dongu", ad: "Döngü", emoji: "🔄" },
          { tip: "eylem", ad: "Eylem", emoji: "💬" },
          { tip: "degisken", ad: "Değişken", emoji: "📊" },
        ].map((t) => (
          <div
            key={t.tip}
            className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium text-white ${blokRenkleri[t.tip]}`}
          >
            {t.emoji} {t.ad}
          </div>
        ))}
      </div>

      {/* Bulmaca Seçici */}
      <div className="flex gap-2">
        {bulmacalar.map((b, i) => (
          <button
            key={b.id}
            onClick={() => {
              setAktifBulmaca(i);
              setIpucuGoster(false);
            }}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              aktifBulmaca === i
                ? "bg-blue-500 text-white shadow-md"
                : sonuclar[b.id] === true
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
            }`}
          >
            {sonuclar[b.id] === true && "✓ "}
            {b.zorluk}
          </button>
        ))}
      </div>

      {/* Bulmaca Bilgisi */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-lg px-2 py-0.5 text-xs font-bold text-white ${
              bulmaca.zorluk === "Kolay" ? "bg-emerald-500" : bulmaca.zorluk === "Orta" ? "bg-amber-500" : "bg-red-500"
            }`}
          >
            {bulmaca.zorluk}
          </span>
          <h4 className="font-bold">{bulmaca.baslik}</h4>
        </div>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{bulmaca.aciklama}</p>
      </div>

      {/* Kodlama Alanı */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Kullanılabilir Bloklar */}
        <div>
          <h4 className="mb-2 text-sm font-bold">📦 Kullanılabilir Bloklar</h4>
          <div className="min-h-[200px] space-y-2 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3">
            {kalanBloklar.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-text-secondary)] italic">
                Tüm bloklar yerleştirildi!
              </p>
            ) : (
              kalanBloklar.map((blok) => (
                <button
                  key={blok.id}
                  onClick={() => blokEkle(blok.id)}
                  disabled={sonuc !== null}
                  className={`flex w-full items-center gap-2 rounded-lg border-2 border-b-4 px-3 py-2 text-left text-sm font-medium text-white transition-all hover:translate-y-[-1px] hover:shadow-md disabled:opacity-60 ${blok.renk}`}
                >
                  <span>{blok.emoji}</span>
                  <span>{blok.metin}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Yerleştirme Alanı */}
        <div>
          <h4 className="mb-2 text-sm font-bold">📋 Programın (Sırayla Tıkla)</h4>
          <div className="min-h-[200px] space-y-2 rounded-xl border-2 border-blue-300 bg-blue-50/50 p-3 dark:border-blue-700 dark:bg-blue-900/10">
            {simdikiYerlestirme.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-text-secondary)] italic">
                Blokları sırasıyla tıklayarak buraya ekle
              </p>
            ) : (
              simdikiYerlestirme.map((blokId, index) => {
                const blok = blokBul(blokId);
                if (!blok) return null;
                return (
                  <div key={`${blokId}-${index}`} className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs font-bold text-[var(--color-text-secondary)]">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => blokCikar(index)}
                      disabled={sonuc !== null}
                      className={`flex flex-1 items-center gap-2 rounded-lg border-2 border-b-4 px-3 py-2 text-left text-sm font-medium text-white transition-all disabled:opacity-80 ${blok.renk}`}
                    >
                      <span>{blok.emoji}</span>
                      <span>{blok.metin}</span>
                      {sonuc === null && <span className="ml-auto text-xs opacity-70">✕</span>}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* İpucu */}
      {sonuc === null && (
        <button
          onClick={() => setIpucuGoster((prev) => !prev)}
          className="mx-auto flex items-center gap-1 text-sm text-amber-600 hover:underline dark:text-amber-400"
        >
          💡 {ipucuGoster ? "İpucunu Gizle" : "İpucu Göster"}
        </button>
      )}
      {ipucuGoster && sonuc === null && (
        <div className="rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          {bulmaca.ipucu}
        </div>
      )}

      {/* Kontrol ve Sıfırla Butonları */}
      <div className="flex justify-center gap-3">
        {sonuc === null && simdikiYerlestirme.length === bulmaca.dogruSira.length && (
          <button
            onClick={kontrolEt}
            className="rounded-xl bg-blue-500 px-6 py-2 font-bold text-white transition-all hover:bg-blue-600"
          >
            ✓ Kontrol Et
          </button>
        )}
        <button
          onClick={sifirla}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2 text-sm font-medium transition-all hover:bg-[var(--color-bg)]"
        >
          🔄 Sıfırla
        </button>
      </div>

      {/* Sonuç */}
      {sonuc !== null && (
        <div
          className={`rounded-xl border-l-4 p-4 ${
            sonuc
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
              : "border-red-500 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          <p className="font-bold">
            {sonuc
              ? "🎉 Harika! Program doğru sırada!"
              : "❌ Sıralama yanlış. İpucunu oku ve tekrar dene!"}
          </p>
          {!sonuc && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{bulmaca.ipucu}</p>
          )}
        </div>
      )}

      {/* İlerleme */}
      <div className="rounded-lg bg-[var(--color-bg-secondary)] p-3 text-center text-sm">
        <span className="font-medium">
          Çözülen Bulmaca: {tamamlananSayisi} / {bulmacalar.length}
        </span>
      </div>
    </div>
  );
}
