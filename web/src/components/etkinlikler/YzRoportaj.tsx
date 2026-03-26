"use client";

import { useState, useCallback } from "react";

interface RoportajVerisi {
  kisiSecimi: string;
  aklina: string;
  kullaniyor: string;
  kullanimDetay: string;
  gelecek: string;
  begenilenUygulama: string;
}

const kisiler = [
  { value: "anne", label: "Anne", emoji: "👩" },
  { value: "baba", label: "Baba", emoji: "👨" },
  { value: "dede", label: "Dede", emoji: "👴" },
  { value: "nine", label: "Nine / Babaanne", emoji: "👵" },
  { value: "kardes", label: "Kardeş", emoji: "🧒" },
  { value: "ogretmen", label: "Öğretmen", emoji: "👨‍🏫" },
  { value: "diger", label: "Diğer", emoji: "👤" },
];

export default function YzRoportaj() {
  const [adim, setAdim] = useState(0);
  const [veri, setVeri] = useState<RoportajVerisi>({
    kisiSecimi: "",
    aklina: "",
    kullaniyor: "",
    kullanimDetay: "",
    gelecek: "",
    begenilenUygulama: "",
  });
  const [tamamlandi, setTamamlandi] = useState(false);

  const guncelle = useCallback((alan: keyof RoportajVerisi, deger: string) => {
    setVeri((prev) => ({ ...prev, [alan]: deger }));
  }, []);

  const sonraki = useCallback(() => {
    if (adim < 4) setAdim((a) => a + 1);
    else setTamamlandi(true);
  }, [adim]);

  const onceki = useCallback(() => {
    if (adim > 0) setAdim((a) => a - 1);
  }, [adim]);

  const sifirla = useCallback(() => {
    setVeri({ kisiSecimi: "", aklina: "", kullaniyor: "", kullanimDetay: "", gelecek: "", begenilenUygulama: "" });
    setAdim(0);
    setTamamlandi(false);
  }, []);

  const secilenKisi = kisiler.find((k) => k.value === veri.kisiSecimi);

  const adimlarGecerliMi = [
    veri.kisiSecimi !== "",
    veri.aklina.trim().length >= 5,
    veri.kullaniyor !== "" && (veri.kullaniyor === "hayir" || veri.kullanimDetay.trim().length >= 3),
    veri.gelecek.trim().length >= 5,
    veri.begenilenUygulama.trim().length >= 3,
  ];

  const adimlar = [
    {
      baslik: "Kimi röportaj yaptın?",
      icerik: (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kisiler.map((kisi) => (
            <button
              key={kisi.value}
              onClick={() => guncelle("kisiSecimi", kisi.value)}
              className={`rounded-xl border-2 p-3 text-center text-sm transition ${
                veri.kisiSecimi === kisi.value
                  ? "border-sky-500 bg-sky-50 shadow-md dark:bg-sky-900/30"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-sky-300"
              }`}
            >
              <span className="text-2xl">{kisi.emoji}</span>
              <p className="mt-1 font-medium">{kisi.label}</p>
            </button>
          ))}
        </div>
      ),
    },
    {
      baslik: "\"Yapay zeka deyince aklına ne geliyor?\"",
      icerik: (
        <textarea
          value={veri.aklina}
          onChange={(e) => guncelle("aklina", e.target.value)}
          placeholder="Röportaj yaptığın kişinin cevabını buraya yaz..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm"
          rows={4}
        />
      ),
    },
    {
      baslik: "\"Günlük hayatta YZ kullanıyor musun?\"",
      icerik: (
        <div className="space-y-3">
          <div className="flex gap-3">
            {(["evet", "hayir"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => guncelle("kullaniyor", sec)}
                className={`flex-1 rounded-xl border-2 py-3 text-center font-semibold transition ${
                  veri.kullaniyor === sec
                    ? sec === "evet"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                    : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-sky-300"
                }`}
              >
                {sec === "evet" ? "Evet ✅" : "Hayır ❌"}
              </button>
            ))}
          </div>
          {veri.kullaniyor === "evet" && (
            <textarea
              value={veri.kullanimDetay}
              onChange={(e) => guncelle("kullanimDetay", e.target.value)}
              placeholder="Hangi uygulamaları kullanıyor? Detayları yaz..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm"
              rows={3}
            />
          )}
        </div>
      ),
    },
    {
      baslik: "\"YZ'nin geleceği hakkında ne düşünüyorsun?\"",
      icerik: (
        <textarea
          value={veri.gelecek}
          onChange={(e) => guncelle("gelecek", e.target.value)}
          placeholder="Röportaj yaptığın kişinin gelecek hakkındaki görüşlerini yaz..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm"
          rows={4}
        />
      ),
    },
    {
      baslik: "\"En çok hangi YZ uygulamasını beğeniyorsun?\"",
      icerik: (
        <textarea
          value={veri.begenilenUygulama}
          onChange={(e) => guncelle("begenilenUygulama", e.target.value)}
          placeholder="Röportaj yaptığın kişinin en çok beğendiği YZ uygulaması ve nedeni..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm"
          rows={3}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <h3 className="text-lg font-bold">🎤 YZ Röportajı</h3>

      {!tamamlandi ? (
        <>
          {/* İlerleme */}
          <div className="flex items-center gap-1">
            {adimlar.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition ${
                  i <= adim ? "bg-sky-500" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Soru */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <p className="mb-1 text-xs text-[var(--color-text-secondary)]">Soru {adim + 1}/5</p>
            <h4 className="mb-4 text-base font-bold">{adimlar[adim].baslik}</h4>
            {adimlar[adim].icerik}
          </div>

          {/* Navigasyon */}
          <div className="flex justify-between">
            <button
              onClick={onceki}
              disabled={adim === 0}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-300 disabled:opacity-40 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              ← Önceki
            </button>
            <button
              onClick={sonraki}
              disabled={!adimlarGecerliMi[adim]}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-40"
            >
              {adim === 4 ? "Röportajı Tamamla" : "Sonraki →"}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Röportaj sonuç kartı */}
          <div className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-6 dark:border-sky-800 dark:from-sky-900/20 dark:to-blue-900/20">
            <div className="mb-4 text-center">
              <span className="text-4xl">{secilenKisi?.emoji}</span>
              <h4 className="mt-2 text-xl font-bold">YZ Röportajı</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Röportaj yapılan kişi: <strong>{secilenKisi?.label}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <p className="mb-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  S: Yapay zeka deyince aklına ne geliyor?
                </p>
                <p className="text-sm italic">&ldquo;{veri.aklina}&rdquo;</p>
              </div>

              <div className="rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <p className="mb-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  S: Günlük hayatta YZ kullanıyor musun?
                </p>
                <p className="text-sm">
                  {veri.kullaniyor === "evet" ? (
                    <span>Evet &mdash; &ldquo;{veri.kullanimDetay}&rdquo;</span>
                  ) : (
                    <span>Hayır, günlük hayatta YZ kullanmıyor.</span>
                  )}
                </p>
              </div>

              <div className="rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <p className="mb-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  S: YZ&apos;nin geleceği hakkında ne düşünüyorsun?
                </p>
                <p className="text-sm italic">&ldquo;{veri.gelecek}&rdquo;</p>
              </div>

              <div className="rounded-lg bg-white/60 p-4 dark:bg-black/20">
                <p className="mb-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  S: En çok hangi YZ uygulamasını beğeniyorsun?
                </p>
                <p className="text-sm italic">&ldquo;{veri.begenilenUygulama}&rdquo;</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-amber-100/60 p-3 text-sm dark:bg-amber-900/20">
              <p className="font-medium text-amber-800 dark:text-amber-300">
                💡 İpucu: Bu röportajı sınıfta paylaş! Farklı nesillerin yapay zeka hakkındaki düşüncelerini karşılaştırın.
              </p>
            </div>
          </div>

          <button
            onClick={sifirla}
            className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Yeni Röportaj Yap
          </button>
        </>
      )}
    </div>
  );
}
