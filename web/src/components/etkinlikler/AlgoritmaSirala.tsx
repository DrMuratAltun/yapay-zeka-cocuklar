"use client";

import { useState, useCallback } from "react";

interface Bulmaca {
  baslik: string;
  aciklama: string;
  adimlar: string[];
}

const bulmacalar: Bulmaca[] = [
  {
    baslik: "Çay Demleme Algoritması",
    aciklama: "Bir bardak çay demlemek için gereken adımları doğru sıraya koy.",
    adimlar: [
      "Çaydanlığa su doldur",
      "Suyu kaynat",
      "Demliğe çay ekle",
      "Kaynar suyu demliğe dök",
      "5 dakika demlenmeye bırak",
      "Bardağa çayı süz",
      "İsteğe göre şeker ekle",
    ],
  },
  {
    baslik: "Kitap Ödünç Alma Algoritması",
    aciklama: "Kütüphaneden kitap ödünç almak için gereken adımları sırala.",
    adimlar: [
      "Kütüphaneye git",
      "Okumak istediğin konuyu belirle",
      "Katalogdan kitabı ara",
      "Kitabı rafta bul",
      "Kitabı incele ve beğen",
      "Kütüphane kartını göster",
      "Ödünç alma kaydını yaptır",
      "Kitabı çantana koy",
    ],
  },
  {
    baslik: "Fotoğraf Paylaşma Algoritması",
    aciklama: "Bir fotoğraf çekip sosyal medyada paylaşma adımlarını sırala.",
    adimlar: [
      "Kamera uygulamasını aç",
      "Fotoğraf çekilecek konuyu seç",
      "Kadrajı ayarla",
      "Fotoğrafı çek",
      "Fotoğrafa filtre uygula",
      "Açıklama yaz",
      "Paylaş butonuna bas",
    ],
  },
];

function karistir<T>(dizi: T[]): T[] {
  const yeni = [...dizi];
  for (let i = yeni.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [yeni[i], yeni[j]] = [yeni[j], yeni[i]];
  }
  return yeni;
}

export default function AlgoritmaSirala() {
  const [aktifBulmaca, setAktifBulmaca] = useState(0);
  const [karisikAdimlar, setKarisikAdimlar] = useState<string[]>(() =>
    karistir(bulmacalar[0].adimlar)
  );
  const [seciliIndex, setSeciliIndex] = useState<number | null>(null);
  const [kontrol, setKontrol] = useState(false);
  const [dogruSayi, setDogruSayi] = useState(0);
  const [toplamPuan, setToplamPuan] = useState(0);
  const [tamamlanan, setTamamlanan] = useState<Set<number>>(new Set());

  const bulmaca = bulmacalar[aktifBulmaca];

  const yeniBulmacaYukle = useCallback((index: number) => {
    setKarisikAdimlar(karistir(bulmacalar[index].adimlar));
    setSeciliIndex(null);
    setKontrol(false);
    setDogruSayi(0);
  }, []);

  const adimTikla = (index: number) => {
    if (kontrol) return;

    if (seciliIndex === null) {
      setSeciliIndex(index);
    } else if (seciliIndex === index) {
      setSeciliIndex(null);
    } else {
      // İki adımın yerini değiştir
      const yeni = [...karisikAdimlar];
      [yeni[seciliIndex], yeni[index]] = [yeni[index], yeni[seciliIndex]];
      setKarisikAdimlar(yeni);
      setSeciliIndex(null);
    }
  };

  const yukariTasi = (index: number) => {
    if (kontrol || index === 0) return;
    const yeni = [...karisikAdimlar];
    [yeni[index], yeni[index - 1]] = [yeni[index - 1], yeni[index]];
    setKarisikAdimlar(yeni);
  };

  const asagiTasi = (index: number) => {
    if (kontrol || index === karisikAdimlar.length - 1) return;
    const yeni = [...karisikAdimlar];
    [yeni[index], yeni[index + 1]] = [yeni[index + 1], yeni[index]];
    setKarisikAdimlar(yeni);
  };

  const kontrolEt = () => {
    let dogru = 0;
    karisikAdimlar.forEach((adim, i) => {
      if (adim === bulmaca.adimlar[i]) dogru++;
    });
    setDogruSayi(dogru);
    setKontrol(true);

    const puan = Math.round((dogru / bulmaca.adimlar.length) * 100);
    setToplamPuan((prev) => prev + puan);

    if (dogru === bulmaca.adimlar.length) {
      setTamamlanan((prev) => new Set(prev).add(aktifBulmaca));
    }
  };

  const sonrakiBulmaca = () => {
    if (aktifBulmaca < bulmacalar.length - 1) {
      const yeniIndex = aktifBulmaca + 1;
      setAktifBulmaca(yeniIndex);
      yeniBulmacaYukle(yeniIndex);
    }
  };

  const sifirla = () => {
    setAktifBulmaca(0);
    setToplamPuan(0);
    setTamamlanan(new Set());
    yeniBulmacaYukle(0);
  };

  const tekrarDene = () => {
    yeniBulmacaYukle(aktifBulmaca);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
        <span className="text-sm text-[var(--color-text-secondary)]">Algoritma Sıralama Bulmacası</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--color-text)]">Algoritma Sıralama</h3>
      <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Bir algoritma, belirli bir görevi adım adım tamamlamak için izlenen yoldur.
        Adımları doğru sıraya koyarak algoritmayı tamamla!
      </p>

      {/* İlerleme */}
      <div className="mb-5 flex items-center gap-2">
        {bulmacalar.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-full transition-all ${
              tamamlanan.has(i)
                ? "bg-emerald-500"
                : i === aktifBulmaca
                  ? "bg-blue-500"
                  : "bg-[var(--color-bg-secondary)]"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-[var(--color-text-secondary)]">
          {tamamlanan.size}/{bulmacalar.length}
        </span>
      </div>

      {/* Bulmaca başlığı */}
      <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h4 className="font-bold text-blue-700 dark:text-blue-300">
          Bulmaca {aktifBulmaca + 1}: {bulmaca.baslik}
        </h4>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{bulmaca.aciklama}</p>
        {!kontrol && (
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
            Adımları sıralamak için ok butonlarını kullan veya iki adıma tıklayarak yerlerini değiştir.
          </p>
        )}
      </div>

      {/* Adımlar listesi */}
      <div className="mb-4 space-y-2">
        {karisikAdimlar.map((adim, index) => {
          const dogruMu = kontrol && adim === bulmaca.adimlar[index];
          const yanlisMi = kontrol && adim !== bulmaca.adimlar[index];
          const seciliMi = seciliIndex === index;

          return (
            <div
              key={`${adim}-${index}`}
              onClick={() => adimTikla(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                dogruMu
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
                  : yanlisMi
                    ? "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/20"
                    : seciliMi
                      ? "border-blue-500 bg-blue-50 shadow-md dark:border-blue-400 dark:bg-blue-900/30"
                      : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-blue-300 hover:shadow-sm dark:hover:border-blue-600"
              }`}
            >
              {/* Sıra numarası */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  dogruMu
                    ? "bg-emerald-500 text-white"
                    : yanlisMi
                      ? "bg-red-500 text-white"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                }`}
              >
                {index + 1}
              </span>

              {/* Adım metni */}
              <span className="flex-1 text-sm font-medium text-[var(--color-text)]">{adim}</span>

              {/* Sonuç ikonu */}
              {kontrol && (
                <span className="text-lg">
                  {dogruMu ? "&#10004;" : "&#10008;"}
                </span>
              )}

              {/* Taşıma butonları */}
              {!kontrol && (
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      yukariTasi(index);
                    }}
                    disabled={index === 0}
                    className="rounded px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)] transition hover:bg-blue-100 disabled:opacity-30 dark:hover:bg-blue-900/30"
                    aria-label="Yukarı taşı"
                  >
                    &#9650;
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      asagiTasi(index);
                    }}
                    disabled={index === karisikAdimlar.length - 1}
                    className="rounded px-1.5 py-0.5 text-xs text-[var(--color-text-secondary)] transition hover:bg-blue-100 disabled:opacity-30 dark:hover:bg-blue-900/30"
                    aria-label="Aşağı taşı"
                  >
                    &#9660;
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Kontrol sonucu */}
      {kontrol && (
        <div
          className={`mb-4 rounded-xl p-4 text-center ${
            dogruSayi === bulmaca.adimlar.length
              ? "bg-emerald-50 dark:bg-emerald-900/20"
              : "bg-amber-50 dark:bg-amber-900/20"
          }`}
        >
          {dogruSayi === bulmaca.adimlar.length ? (
            <>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                Mükemmel! Tüm adımlar doğru sırada!
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-500">
                Algoritmayı doğru bir şekilde oluşturdun.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                {dogruSayi}/{bulmaca.adimlar.length} adım doğru sırada
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-500">
                Yanlış sıradaki adımları düzeltip tekrar dene!
              </p>
            </>
          )}
        </div>
      )}

      {/* Doğru sıra (kontrol sonrası) */}
      {kontrol && dogruSayi < bulmaca.adimlar.length && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800 dark:bg-emerald-900/10">
          <h4 className="mb-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">Doğru Sıralama:</h4>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-[var(--color-text-secondary)]">
            {bulmaca.adimlar.map((adim) => (
              <li key={adim}>{adim}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Butonlar */}
      <div className="flex flex-wrap gap-3">
        {!kontrol ? (
          <button
            onClick={kontrolEt}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Kontrol Et
          </button>
        ) : (
          <>
            {dogruSayi < bulmaca.adimlar.length && (
              <button
                onClick={tekrarDene}
                className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600"
              >
                Tekrar Dene
              </button>
            )}
            {aktifBulmaca < bulmacalar.length - 1 && (
              <button
                onClick={sonrakiBulmaca}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Sonraki Bulmaca
              </button>
            )}
          </>
        )}
        <button
          onClick={sifirla}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg)]"
        >
          Tekrar Dene
        </button>
      </div>

      {/* Toplam puan */}
      {toplamPuan > 0 && (
        <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center dark:bg-blue-900/20">
          <p className="text-sm text-[var(--color-text-secondary)]">Toplam Puanın</p>
          <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {toplamPuan}/{bulmacalar.length * 100}
          </p>
          {tamamlanan.size === bulmacalar.length && (
            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Harika! Tüm algoritma bulmacalarını çözdün! Artık algoritmik düşünce ustasısın!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
