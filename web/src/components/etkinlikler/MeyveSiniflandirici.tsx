"use client";

import { useState, useCallback } from "react";

interface Meyve {
  ad: string;
  emoji: string;
  kategori: "Turuncgil" | "Cekirdekli" | "Uzumsu" | "Tropikal";
  ozellikler: {
    renk: string;
    sekil: string;
    boyut: string;
    kabukTipi: string;
  };
  aciklama: string;
}

const meyveler: Meyve[] = [
  {
    ad: "Elma",
    emoji: "\ud83c\udf4e",
    kategori: "Cekirdekli",
    ozellikler: { renk: "Kirmizi/Yesil", sekil: "Yuvarlak", boyut: "Orta", kabukTipi: "Ince, parlak" },
    aciklama: "Elma cekirdekli meyve grubundandir. Ic kisminda cekirdek yuvasi vardir.",
  },
  {
    ad: "Portakal",
    emoji: "\ud83c\udf4a",
    kategori: "Turuncgil",
    ozellikler: { renk: "Turuncu", sekil: "Yuvarlak", boyut: "Orta", kabukTipi: "Kalin, gozenegeli" },
    aciklama: "Portakal turuncgil ailesinin en bilinen uyesidir. Dilimli yapisi ve kalin kabugu vardir.",
  },
  {
    ad: "Cilek",
    emoji: "\ud83c\udf53",
    kategori: "Uzumsu",
    ozellikler: { renk: "Kirmizi", sekil: "Koni", boyut: "Kucuk", kabukTipi: "Ince, tohumlu" },
    aciklama: "Cilek uzumsu meyveler grubundandir. Yumusak, etli yapisi ve dis yuzeyindeki tohumlariyla taninir.",
  },
  {
    ad: "Muz",
    emoji: "\ud83c\udf4c",
    kategori: "Tropikal",
    ozellikler: { renk: "Sari", sekil: "Uzun, kavisli", boyut: "Orta", kabukTipi: "Kalin, soyulabilir" },
    aciklama: "Muz tropikal bolgelerde yetisir. Sicak iklimlerde buyur ve kendine ozgu kavisli sekli vardir.",
  },
  {
    ad: "Uzum",
    emoji: "\ud83c\udf47",
    kategori: "Uzumsu",
    ozellikler: { renk: "Mor/Yesil", sekil: "Kucuk yuvarlak", boyut: "Kucuk", kabukTipi: "Cok ince" },
    aciklama: "Uzum, uzumsu meyveler grubunun en klasik orneklerinden biridir. Salkimlar halinde yetisir.",
  },
  {
    ad: "Limon",
    emoji: "\ud83c\udf4b",
    kategori: "Turuncgil",
    ozellikler: { renk: "Sari", sekil: "Oval", boyut: "Kucuk-Orta", kabukTipi: "Kalin, gozenegeli" },
    aciklama: "Limon turuncgil ailesinin eksi uyesidir. Portakal gibi dilimli yapisi ve kalin kabugu vardir.",
  },
  {
    ad: "Karpuz",
    emoji: "\ud83c\udf49",
    kategori: "Uzumsu",
    ozellikler: { renk: "Yesil dis, kirmizi ic", sekil: "Buyuk oval", boyut: "Cok buyuk", kabukTipi: "Cok kalin, sert" },
    aciklama: "Karpuz botanik olarak uzumsu meyve ailesine aittir. Sulu ic yapisi ve buyuk boyutuyla bilinir.",
  },
  {
    ad: "Kiraz",
    emoji: "\ud83c\udf52",
    kategori: "Cekirdekli",
    ozellikler: { renk: "Koyu kirmizi", sekil: "Kucuk yuvarlak", boyut: "Kucuk", kabukTipi: "Ince, parlak" },
    aciklama: "Kiraz cekirdekli meyvedir. Ic kisminda sert bir cekirdegi vardir.",
  },
  {
    ad: "Ananas",
    emoji: "\ud83c\udf4d",
    kategori: "Tropikal",
    ozellikler: { renk: "Sari-kahverengi", sekil: "Silindirik", boyut: "Buyuk", kabukTipi: "Sert, pulsu" },
    aciklama: "Ananas tropikal bolgelerde yetisen egzotik bir meyvedir. Pullu dis gorunusu kendine ozgudur.",
  },
  {
    ad: "Seftali",
    emoji: "\ud83c\udf51",
    kategori: "Cekirdekli",
    ozellikler: { renk: "Turuncu-kirmizi", sekil: "Yuvarlak", boyut: "Orta", kabukTipi: "Ince, tuylu" },
    aciklama: "Seftali cekirdekli meyvedir. Ortasinda buyuk, sert bir cekirdek bulunur.",
  },
  {
    ad: "Kivi",
    emoji: "\ud83e\udd5d",
    kategori: "Tropikal",
    ozellikler: { renk: "Kahverengi dis, yesil ic", sekil: "Oval", boyut: "Kucuk", kabukTipi: "Ince, tuylu" },
    aciklama: "Kivi tropikal/subtropikal bolgelerde yetisir. Tuylu kabugu ve yesil, tohumlu ic yapisi vardir.",
  },
  {
    ad: "Mandalina",
    emoji: "\ud83c\udf4a",
    kategori: "Turuncgil",
    ozellikler: { renk: "Turuncu", sekil: "Yuvarlak, basik", boyut: "Kucuk", kabukTipi: "Ince, kolay soyulur" },
    aciklama: "Mandalina turuncgil ailesinin kucuk uyesidir. Portakaldan daha kucuk ve kabugu daha kolay soyulur.",
  },
];

const kategoriler: { ad: Meyve["kategori"]; emoji: string; renk: string; aciklama: string }[] = [
  { ad: "Turuncgil", emoji: "\ud83c\udf4a", renk: "orange", aciklama: "Kalin kabuklu, dilimli, eksi-tatli meyveler" },
  { ad: "Cekirdekli", emoji: "\ud83c\udf51", renk: "red", aciklama: "Ortasinda sert cekirdek bulunan meyveler" },
  { ad: "Uzumsu", emoji: "\ud83c\udf53", renk: "purple", aciklama: "Yumusak, sulu, cok tohumlu meyveler" },
  { ad: "Tropikal", emoji: "\ud83c\udf34", renk: "green", aciklama: "Sicak iklimlerde yetisen egzotik meyveler" },
];

const kategoriRenkleri: Record<string, { bg: string; border: string; text: string; hover: string; selected: string }> = {
  Turuncgil: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-400",
    text: "text-orange-700 dark:text-orange-300",
    hover: "hover:bg-orange-200 dark:hover:bg-orange-800/60",
    selected: "bg-orange-300 dark:bg-orange-700",
  },
  Cekirdekli: {
    bg: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-400",
    text: "text-red-700 dark:text-red-300",
    hover: "hover:bg-red-200 dark:hover:bg-red-800/60",
    selected: "bg-red-300 dark:bg-red-700",
  },
  Uzumsu: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    border: "border-purple-400",
    text: "text-purple-700 dark:text-purple-300",
    hover: "hover:bg-purple-200 dark:hover:bg-purple-800/60",
    selected: "bg-purple-300 dark:bg-purple-700",
  },
  Tropikal: {
    bg: "bg-green-100 dark:bg-green-900/40",
    border: "border-green-400",
    text: "text-green-700 dark:text-green-300",
    hover: "hover:bg-green-200 dark:hover:bg-green-800/60",
    selected: "bg-green-300 dark:bg-green-700",
  },
};

function karistir<T>(dizi: T[]): T[] {
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

export default function MeyveSiniflandirici() {
  const [oyunDurumu, setOyunDurumu] = useState<"bekliyor" | "oynuyor" | "bitti">("bekliyor");
  const [karisikListe, setKarisikListe] = useState<Meyve[]>([]);
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [sonSecim, setSonSecim] = useState<{
    dogru: boolean;
    dogruCevap: string;
    aciklama: string;
  } | null>(null);
  const [animasyon, setAnimasyon] = useState(false);
  const [streak, setStreak] = useState(0);
  const [enYuksekSkor, setEnYuksekSkor] = useState(0);

  const oyunuBaslat = useCallback(() => {
    setKarisikListe(karistir(meyveler));
    setMevcutIndex(0);
    setSkor(0);
    setSonSecim(null);
    setAnimasyon(false);
    setStreak(0);
    setOyunDurumu("oynuyor");
  }, []);

  const secimYap = (secilen: Meyve["kategori"]) => {
    if (sonSecim || oyunDurumu !== "oynuyor") return;

    const mevcutMeyve = karisikListe[mevcutIndex];
    const dogru = secilen === mevcutMeyve.kategori;

    if (dogru) {
      setSkor((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setAnimasyon(true);
    setSonSecim({
      dogru,
      dogruCevap: mevcutMeyve.kategori,
      aciklama: mevcutMeyve.aciklama,
    });

    setTimeout(() => {
      setAnimasyon(false);
      setSonSecim(null);

      if (mevcutIndex + 1 >= karisikListe.length) {
        const finalSkor = dogru ? skor + 1 : skor;
        setEnYuksekSkor((onceki) => Math.max(onceki, finalSkor));
        setOyunDurumu("bitti");
      } else {
        setMevcutIndex((i) => i + 1);
      }
    }, 2500);
  };

  const mevcutMeyve = karisikListe[mevcutIndex];

  // --- Baslangic ekrani ---
  if (oyunDurumu === "bekliyor") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center border-2 border-yellow-300 dark:border-yellow-700 shadow-lg">
          <div className="text-6xl mb-4">{"\ud83c\udf4e\ud83c\udf4a\ud83c\udf53\ud83c\udf4c"}</div>
          <h2 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">
            Meyve Siniflandirici
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 mb-6 text-lg">
            Yapay zekanin nesneleri nasil siniflandirdigini ogren!
            <br />
            Her meyvenin ozelliklerine bakarak dogru kategoriye yerle&scedil;tir.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {kategoriler.map((k) => (
              <div
                key={k.ad}
                className={`${kategoriRenkleri[k.ad].bg} border ${kategoriRenkleri[k.ad].border} rounded-xl p-3`}
              >
                <span className="text-2xl">{k.emoji}</span>
                <p className={`font-bold ${kategoriRenkleri[k.ad].text}`}>{k.ad}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{k.aciklama}</p>
              </div>
            ))}
          </div>

          <button
            onClick={oyunuBaslat}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md"
          >
            {"\ud83c\udf1f"} Oyuna Basla!
          </button>
          {enYuksekSkor > 0 && (
            <p className="mt-3 text-yellow-700 dark:text-yellow-300">
              {"\ud83c\udfc6"} En Yuksek Skor: {enYuksekSkor}/12
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- Bitis ekrani ---
  if (oyunDurumu === "bitti") {
    const yuzde = Math.round((skor / meyveler.length) * 100);
    let mesaj = "";
    let emoji = "";
    if (yuzde >= 90) {
      mesaj = "Muhtesem! Yapay zeka kadar iyi siniflandiriyorsun!";
      emoji = "\ud83c\udfc6";
    } else if (yuzde >= 70) {
      mesaj = "Harika! Siniflandirma becerilerin cok iyi!";
      emoji = "\u2b50";
    } else if (yuzde >= 50) {
      mesaj = "Iyi gidiyorsun! Biraz daha pratikle uzman olursun!";
      emoji = "\ud83d\udcaa";
    } else {
      mesaj = "Pratik yapmaya devam et! Her seferinde daha iyi olacaksin!";
      emoji = "\ud83c\udf31";
    }

    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center border-2 border-yellow-300 dark:border-yellow-700 shadow-lg">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-bold text-yellow-800 dark:text-yellow-200 mb-3">
            Oyun Bitti!
          </h2>
          <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            {skor}/{meyveler.length}
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mb-2 text-lg">{mesaj}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Basari orani: %{yuzde}
          </p>

          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {"\ud83e\udd16"} <strong>Yapay Zeka Bilgisi:</strong> Gercek yapay zeka sistemleri de nesneleri
              ozelliklerine (renk, sekil, boyut, doku) bakarak siniflandirir. Bu islem
              &quot;siniflandirma&quot; (classification) olarak adlandirilir ve makine ogrenmenin
              temel gorevlerinden biridir!
            </p>
          </div>

          <button
            onClick={oyunuBaslat}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-md"
          >
            {"\ud83d\udd04"} Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  // --- Oyun ekrani ---
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Ust bilgi cubugu */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-yellow-100 dark:bg-yellow-900/40 rounded-lg px-4 py-2">
          <span className="text-yellow-800 dark:text-yellow-200 font-bold">
            {"\u2b50"} Skor: {skor}
          </span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm">
          {mevcutIndex + 1} / {karisikListe.length}
        </div>
        {streak >= 3 && (
          <div className="bg-red-100 dark:bg-red-900/40 rounded-lg px-4 py-2 animate-pulse">
            <span className="text-red-600 dark:text-red-400 font-bold">
              {"\ud83d\udd25"} {streak} seri!
            </span>
          </div>
        )}
      </div>

      {/* Ilerleme cubugu */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
        <div
          className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${((mevcutIndex) / karisikListe.length) * 100}%` }}
        />
      </div>

      {/* Meyve karti */}
      {mevcutMeyve && (
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 mb-6 transition-all duration-300 ${
            animasyon ? "scale-95 opacity-80" : "scale-100"
          }`}
        >
          <div className="text-center mb-4">
            <span className="text-7xl block mb-2">{mevcutMeyve.emoji}</span>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {mevcutMeyve.ad}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold mb-1">{"\ud83c\udfa8"} Renk</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mevcutMeyve.ozellikler.renk}</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-3">
              <p className="text-xs text-pink-500 dark:text-pink-400 font-semibold mb-1">{"\u25cf"} Sekil</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mevcutMeyve.ozellikler.sekil}</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3">
              <p className="text-xs text-teal-500 dark:text-teal-400 font-semibold mb-1">{"\ud83d\udccf"} Boyut</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mevcutMeyve.ozellikler.boyut}</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3">
              <p className="text-xs text-amber-500 dark:text-amber-400 font-semibold mb-1">{"\ud83e\udea8"} Kabuk Tipi</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mevcutMeyve.ozellikler.kabukTipi}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sonuc gostergesi */}
      {sonSecim && (
        <div
          className={`rounded-xl p-4 mb-4 border-2 transition-all duration-300 ${
            sonSecim.dogru
              ? "bg-green-50 dark:bg-green-900/30 border-green-400"
              : "bg-red-50 dark:bg-red-900/30 border-red-400"
          }`}
        >
          <p className="font-bold text-lg mb-1">
            {sonSecim.dogru ? "\u2705 Dogru!" : `\u274c Yanlis! Dogru cevap: ${sonSecim.dogruCevap}`}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{sonSecim.aciklama}</p>
        </div>
      )}

      {/* Kategori butonlari */}
      <div className="grid grid-cols-2 gap-3">
        {kategoriler.map((k) => {
          const renkler = kategoriRenkleri[k.ad];
          const secildi = sonSecim !== null;
          const dogruKategori = sonSecim?.dogruCevap === k.ad;

          return (
            <button
              key={k.ad}
              onClick={() => secimYap(k.ad)}
              disabled={secildi}
              className={`${renkler.bg} ${renkler.hover} border-2 ${renkler.border} rounded-xl p-4 transition-all duration-200 ${
                secildi ? "opacity-70 cursor-not-allowed" : "cursor-pointer transform hover:scale-105"
              } ${dogruKategori && secildi ? "ring-4 ring-green-400 " + renkler.selected : ""}`}
            >
              <span className="text-3xl block mb-1">{k.emoji}</span>
              <span className={`font-bold ${renkler.text}`}>{k.ad}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
