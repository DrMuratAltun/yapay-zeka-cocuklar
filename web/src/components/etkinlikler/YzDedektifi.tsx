"use client";

import { useState, useCallback } from "react";

interface YzOrnegi {
  metin: string;
  emoji: string;
}

interface Kategori {
  ad: string;
  emoji: string;
  renk: string;
  renkDark: string;
  ornekler: YzOrnegi[];
}

const kategoriler: Kategori[] = [
  {
    ad: "Ev",
    emoji: "🏠",
    renk: "bg-blue-50 border-blue-300",
    renkDark: "dark:bg-blue-900/30 dark:border-blue-600",
    ornekler: [
      { metin: "Sesli asistan kullandim (Siri, Alexa, Google)", emoji: "🗣️" },
      { metin: "Netflix/YouTube onerilerini takip ettim", emoji: "🎬" },
      { metin: "Akilli ev cihazi kullandim (robot supurge, akilli lamba)", emoji: "💡" },
      { metin: "Spotify/muzik onerisi dinledim", emoji: "🎵" },
      { metin: "Yuz tanima ile telefon actim", emoji: "📱" },
      { metin: "Akilli termostat veya klima kullandim", emoji: "🌡️" },
    ],
  },
  {
    ad: "Okul",
    emoji: "🏫",
    renk: "bg-emerald-50 border-emerald-300",
    renkDark: "dark:bg-emerald-900/30 dark:border-emerald-600",
    ornekler: [
      { metin: "Google'da arama yaptim (arama onerisi aldi)", emoji: "🔍" },
      { metin: "Otomatik yazim duzeltme kullandim", emoji: "📝" },
      { metin: "Ceviri uygulamasi kullandim (Google Translate)", emoji: "🌐" },
      { metin: "ChatGPT veya yapay zeka asistani kullandim", emoji: "🤖" },
      { metin: "Matematik/fen problemi icin YZ aracindan yardim aldim", emoji: "🧮" },
    ],
  },
  {
    ad: "Yolda",
    emoji: "🚗",
    renk: "bg-amber-50 border-amber-300",
    renkDark: "dark:bg-amber-900/30 dark:border-amber-600",
    ornekler: [
      { metin: "Navigasyon/harita uygulamasi kullandim", emoji: "🗺️" },
      { metin: "Trafik tahmini gordum", emoji: "🚦" },
      { metin: "Otopark asistani/geri gorus kamerasi kullandim", emoji: "📷" },
      { metin: "Akilli bisiklet/scooter kiralama uygulamasi kullandim", emoji: "🛴" },
    ],
  },
  {
    ad: "Alisveris",
    emoji: "🛒",
    renk: "bg-pink-50 border-pink-300",
    renkDark: "dark:bg-pink-900/30 dark:border-pink-600",
    ornekler: [
      { metin: "Online alisveriste 'sana ozel' urunler gordum", emoji: "🎁" },
      { metin: "Chatbot ile musteri hizmetlerine yazdim", emoji: "💬" },
      { metin: "Fiyat karsilastirma araci kullandim", emoji: "💰" },
      { metin: "QR kod taradim", emoji: "📲" },
      { metin: "Sanal deneme/filtre kullandim (gozluk, kiyafet)", emoji: "👓" },
    ],
  },
  {
    ad: "Eglence",
    emoji: "🎮",
    renk: "bg-purple-50 border-purple-300",
    renkDark: "dark:bg-purple-900/30 dark:border-purple-600",
    ornekler: [
      { metin: "Video oyununda YZ rakibe karsi oynadim", emoji: "🕹️" },
      { metin: "Fotograf filtresi/efekt kullandim (Snapchat, Instagram)", emoji: "📸" },
      { metin: "TikTok/Instagram'da 'senin icin' akisini izledim", emoji: "📱" },
      { metin: "Yapay zeka ile resim/gorsel olusturdum", emoji: "🎨" },
      { metin: "Sesli asistana saka/muzik istedim", emoji: "😂" },
    ],
  },
];

const dedektifSeviyeleri = [
  { min: 0, max: 5, seviye: "Caylak Dedektif", emoji: "🔎", renk: "text-gray-600" },
  { min: 6, max: 12, seviye: "Dedektif", emoji: "🕵️", renk: "text-blue-600" },
  { min: 13, max: 19, seviye: "Super Dedektif", emoji: "🦸", renk: "text-purple-600" },
  { min: 20, max: 999, seviye: "YZ Ustasi Dedektif", emoji: "🏆", renk: "text-amber-600" },
];

export default function YzDedektifi() {
  const [isaretliler, setIsaretliler] = useState<Set<string>>(new Set());
  const [tamamlandi, setTamamlandi] = useState(false);
  const [acikKategori, setAcikKategori] = useState<string | null>(kategoriler[0].ad);

  const toplamIsaretli = isaretliler.size;
  const toplamOrnek = kategoriler.reduce((t, k) => t + k.ornekler.length, 0);

  const isaretDegistir = useCallback((kategoriAd: string, ornekMetin: string) => {
    const anahtar = `${kategoriAd}::${ornekMetin}`;
    setIsaretliler((prev) => {
      const yeni = new Set(prev);
      if (yeni.has(anahtar)) {
        yeni.delete(anahtar);
      } else {
        yeni.add(anahtar);
      }
      return yeni;
    });
  }, []);

  const kategoriSayisi = useCallback(
    (kategoriAd: string) => {
      let sayac = 0;
      for (const k of isaretliler) {
        if (k.startsWith(`${kategoriAd}::`)) sayac++;
      }
      return sayac;
    },
    [isaretliler]
  );

  const dedektifSeviyesi = dedektifSeviyeleri.find(
    (s) => toplamIsaretli >= s.min && toplamIsaretli <= s.max
  ) ?? dedektifSeviyeleri[0];

  const tekrarOyna = useCallback(() => {
    setIsaretliler(new Set());
    setTamamlandi(false);
    setAcikKategori(kategoriler[0].ad);
  }, []);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Baslik */}
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          🕵️ YZ Dedektifi
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Gunluk hayatinda kac yapay zeka ile karsilasiyorsun? Kesfet!
        </p>
      </div>

      {/* Sayac */}
      <div className="mx-auto mb-6 flex max-w-xs items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 p-4 dark:from-indigo-900/40 dark:to-purple-900/40">
        <span className="text-3xl">{dedektifSeviyesi.emoji}</span>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {toplamIsaretli}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            YZ etkilesimi bulundu
          </p>
        </div>
      </div>

      {!tamamlandi ? (
        <>
          {/* Kategori Akordeonu */}
          <div className="mx-auto max-w-lg space-y-3">
            {kategoriler.map((kategori) => {
              const acik = acikKategori === kategori.ad;
              const buKategoriSayisi = kategoriSayisi(kategori.ad);

              return (
                <div
                  key={kategori.ad}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${kategori.renk} ${kategori.renkDark}`}
                >
                  {/* Kategori Basligi */}
                  <button
                    type="button"
                    onClick={() => setAcikKategori(acik ? null : kategori.ad)}
                    className="flex w-full items-center justify-between p-4 text-left font-bold transition-all hover:opacity-80"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-2xl">{kategori.emoji}</span>
                      <span>{kategori.ad}</span>
                      {buKategoriSayisi > 0 && (
                        <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-medium text-white">
                          {buKategoriSayisi}
                        </span>
                      )}
                    </span>
                    <span className="text-lg transition-transform duration-200" style={{ transform: acik ? "rotate(180deg)" : "rotate(0)" }}>
                      ▼
                    </span>
                  </button>

                  {/* Ornekler */}
                  {acik && (
                    <div className="space-y-2 px-4 pb-4" style={{ animation: "slide-up 0.2s ease-out" }}>
                      {kategori.ornekler.map((ornek) => {
                        const anahtar = `${kategori.ad}::${ornek.metin}`;
                        const isaretli = isaretliler.has(anahtar);
                        return (
                          <label
                            key={ornek.metin}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all ${
                              isaretli
                                ? "border-indigo-400 bg-indigo-50 shadow-sm dark:border-indigo-500 dark:bg-indigo-900/40"
                                : "border-transparent bg-white/60 hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800/60"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isaretli}
                              onChange={() => isaretDegistir(kategori.ad, ornek.metin)}
                              className="h-5 w-5 rounded border-gray-300 text-indigo-600 accent-indigo-600"
                            />
                            <span className="text-xl">{ornek.emoji}</span>
                            <span className="text-sm">{ornek.metin}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sonucu Gor Butonu */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setTamamlandi(true)}
              className="rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            >
              Sonucu Gor 🏆
            </button>
          </div>
        </>
      ) : (
        /* Sonuc Ekrani */
        <div className="text-center" style={{ animation: "slide-up 0.5s ease-out" }}>
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-indigo-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-3 text-6xl">{dedektifSeviyesi.emoji}</p>
            <h3 className={`mb-2 text-2xl font-bold ${dedektifSeviyesi.renk}`}>
              {dedektifSeviyesi.seviye}
            </h3>
            <p className="mb-4 text-4xl font-bold text-indigo-600">
              {toplamIsaretli} / {toplamOrnek}
            </p>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              yapay zeka etkilesimi kesfettin!
            </p>

            {/* Kategori ozeti */}
            <div className="mt-4 space-y-2">
              {kategoriler.map((k) => {
                const sayi = kategoriSayisi(k.ad);
                return (
                  <div
                    key={k.ad}
                    className="flex items-center justify-between rounded-lg bg-white/60 px-4 py-2 dark:bg-slate-800/40"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <span>{k.emoji}</span>
                      <span>{k.ad}</span>
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {sayi} / {k.ornekler.length}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mesaj */}
            <div className="mt-6 rounded-lg bg-indigo-100 p-4 dark:bg-indigo-900/30">
              <p className="text-sm text-indigo-800 dark:text-indigo-200">
                {toplamIsaretli >= 20
                  ? "Vay! Yapay zeka hayatinin her yerinde! Gercek bir YZ uzmanisın! 🌟"
                  : toplamIsaretli >= 13
                  ? "Harika gozlem! YZ'nin hayatindaki rolunu cok iyi fark ediyorsun! 🎯"
                  : toplamIsaretli >= 6
                  ? "Iyi baslangiç! Ama etrafinda daha fazla YZ var, dikkatli bak! 👀"
                  : "Tekrar dene ve etrafina daha dikkatli bak! YZ her yerde! 🔍"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
