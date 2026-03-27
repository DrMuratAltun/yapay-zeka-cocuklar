"use client";

import { useState, useCallback } from "react";

interface Hata {
  id: string;
  satir: number;
  sutun: string;
  tur: "eksik" | "yazim" | "imkansiz" | "tekrar";
  aciklama: string;
  ipucu: string;
}

interface VeriSatiri {
  id: number;
  isim: string;
  yas: string;
  boy: string;
  kilo: string;
  sehir: string;
  sinif: string;
}

const kirliVeri: VeriSatiri[] = [
  { id: 1, isim: "Ali Yılmaz", yas: "12", boy: "155", kilo: "48", sehir: "İstanbul", sinif: "6-A" },
  { id: 2, isim: "Ayşe Demir", yas: "13", boy: "162", kilo: "", sehir: "Ankara", sinif: "7-B" },
  { id: 3, isim: "Mehmet Kaya", yas: "150", boy: "170", kilo: "65", sehir: "İzmir", sinif: "8-A" },
  { id: 4, isim: "Zeynep Çelik", yas: "11", boy: "148", kilo: "42", sehir: "İstanbol", sinif: "6-B" },
  { id: 5, isim: "Can Arslan", yas: "14", boy: "165", kilo: "58", sehir: "Bursa", sinif: "8-C" },
  { id: 6, isim: "Ali Yılmaz", yas: "12", boy: "155", kilo: "48", sehir: "İstanbul", sinif: "6-A" },
  { id: 7, isim: "Elif Öztürk", yas: "12", boy: "340", kilo: "45", sehir: "Antalya", sinif: "6-A" },
  { id: 8, isim: "Burak Şahin", yas: "", boy: "170", kilo: "62", sehir: "İstanbul", sinif: "7-A" },
  { id: 9, isim: "Selin Aydın", yas: "13", boy: "158", kilo: "-5", sehir: "Ankara", sinif: "7-B" },
  { id: 10, isim: "Emre Koç", yas: "12", boy: "160", kilo: "55", sehir: "Antlaya", sinif: "6-C" },
];

const hatalar: Hata[] = [
  {
    id: "h1",
    satir: 2,
    sutun: "kilo",
    tur: "eksik",
    aciklama: "Ayşe'nin kilo değeri boş bırakılmış.",
    ipucu: "Boş bir hücre bul.",
  },
  {
    id: "h2",
    satir: 3,
    sutun: "yas",
    tur: "imkansiz",
    aciklama: "Mehmet'in yaşı 150 yazılmış. Bir ortaokul öğrencisinin 150 yaşında olması imkansız!",
    ipucu: "Bir öğrencinin yaşı mantıklı mı?",
  },
  {
    id: "h3",
    satir: 4,
    sutun: "sehir",
    tur: "yazim",
    aciklama: "\"İstanbol\" yazılmış, doğrusu \"İstanbul\" olmalı.",
    ipucu: "Bir şehir adında yazım hatası var.",
  },
  {
    id: "h4",
    satir: 6,
    sutun: "tum",
    tur: "tekrar",
    aciklama: "6. satır, 1. satırın aynısı. Ali Yılmaz'ın kaydı tekrar edilmiş (duplikasyon).",
    ipucu: "İki satır birbirinin aynısı mı?",
  },
  {
    id: "h5",
    satir: 7,
    sutun: "boy",
    tur: "imkansiz",
    aciklama: "Elif'in boyu 340 cm yazılmış. Bu imkansız bir değer! Muhtemelen 140 cm olmalı.",
    ipucu: "Bir boy değeri gerçekçi mi?",
  },
  {
    id: "h6",
    satir: 8,
    sutun: "yas",
    tur: "eksik",
    aciklama: "Burak'ın yaş değeri boş bırakılmış.",
    ipucu: "Başka bir boş hücre var.",
  },
  {
    id: "h7",
    satir: 9,
    sutun: "kilo",
    tur: "imkansiz",
    aciklama: "Selin'in kilosu -5 yazılmış. Negatif kilo olmaz!",
    ipucu: "Negatif bir değer olabilir mi?",
  },
  {
    id: "h8",
    satir: 10,
    sutun: "sehir",
    tur: "yazim",
    aciklama: "\"Antlaya\" yazılmış, doğrusu \"Antalya\" olmalı.",
    ipucu: "Başka bir şehir adında yazım hatası var.",
  },
];

const hataRenkleri: Record<string, { bg: string; text: string; badge: string }> = {
  eksik: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-800 dark:text-amber-300",
    badge: "bg-amber-500",
  },
  yazim: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    badge: "bg-blue-500",
  },
  imkansiz: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-800 dark:text-rose-300",
    badge: "bg-rose-500",
  },
  tekrar: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-800 dark:text-violet-300",
    badge: "bg-violet-500",
  },
};

const hataTurleriLabel: Record<string, string> = {
  eksik: "Eksik Veri",
  yazim: "Yazım Hatası",
  imkansiz: "İmkansız Değer",
  tekrar: "Tekrarlı Kayıt",
};

export default function VeriTemizleme() {
  const [bulunanlar, setBulunanlar] = useState<Set<string>>(new Set());
  const [seciliHucre, setSeciliHucre] = useState<{ satir: number; sutun: string } | null>(null);
  const [ipucuGoster, setIpucuGoster] = useState(false);
  const [oyunBitti, setOyunBitti] = useState(false);

  const hucreTikla = useCallback(
    (satir: number, sutun: string) => {
      if (oyunBitti) return;

      setSeciliHucre({ satir, sutun });

      // Hata var mı kontrol et
      const hata = hatalar.find(
        (h) => h.satir === satir && (h.sutun === sutun || h.sutun === "tum")
      );

      if (hata && !bulunanlar.has(hata.id)) {
        setBulunanlar((prev) => {
          const yeni = new Set(prev);
          yeni.add(hata.id);
          if (yeni.size === hatalar.length) {
            setOyunBitti(true);
          }
          return yeni;
        });
      }
    },
    [bulunanlar, oyunBitti]
  );

  const seciliHata = seciliHucre
    ? hatalar.find(
        (h) =>
          h.satir === seciliHucre.satir &&
          (h.sutun === seciliHucre.sutun || h.sutun === "tum")
      )
    : null;

  const tekrarOyna = useCallback(() => {
    setBulunanlar(new Set());
    setSeciliHucre(null);
    setIpucuGoster(false);
    setOyunBitti(false);
  }, []);

  const hucreHataliMi = (satir: number, sutun: string): Hata | undefined => {
    return hatalar.find(
      (h) =>
        h.satir === satir &&
        (h.sutun === sutun || h.sutun === "tum") &&
        bulunanlar.has(h.id)
    );
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Veri Temizliği Neden Önemlidir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zeka modelleri, eğitildikleri veriler kadar iyidir. Hatalı, eksik veya tutarsız veriler, YZ&apos;nin yanlış sonuçlar üretmesine neden olur. Veri bilimciler zamanlarının büyük bölümünü veri temizlemeye harcar. Temiz veri = güvenilir yapay zeka!
        </p>
      </div>

      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">🧹 Veri Temizleme Atölyesi</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Bu veri setinde 8 hata gizli! Hatalı hücrelere tıklayarak bul.
        </p>
      </div>

      {/* Skor ve Hata Türleri */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">
            Bulunan: {bulunanlar.size} / {hatalar.length}
          </span>
          {oyunBitti && (
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
              Tamamlandı!
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(hataTurleriLabel).map(([tur, label]) => (
            <span
              key={tur}
              className={`rounded-full ${hataRenkleri[tur].badge} px-2 py-0.5 text-[10px] font-bold text-white`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="mb-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-500 ease-out"
            style={{ width: `${(bulunanlar.size / hatalar.length) * 100}%` }}
          />
        </div>
      </div>

      {/* İpucu */}
      {!oyunBitti && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIpucuGoster(!ipucuGoster)}
            className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
          >
            {ipucuGoster ? "İpuçlarını Gizle" : "💡 İpucu Göster"}
          </button>
          {ipucuGoster && (
            <div className="mt-2 space-y-1">
              {hatalar
                .filter((h) => !bulunanlar.has(h.id))
                .slice(0, 2)
                .map((h) => (
                  <p key={h.id} className="text-xs text-amber-600 dark:text-amber-400">
                    Satır {h.satir}: {h.ipucu}
                  </p>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Veri Tablosu */}
      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-violet-600 text-white">
              <th className="border border-violet-700 px-2 py-2 text-left">#</th>
              <th className="border border-violet-700 px-2 py-2 text-left">İsim</th>
              <th className="border border-violet-700 px-2 py-2 text-left">Yaş</th>
              <th className="border border-violet-700 px-2 py-2 text-left">Boy</th>
              <th className="border border-violet-700 px-2 py-2 text-left">Kilo</th>
              <th className="border border-violet-700 px-2 py-2 text-left">Şehir</th>
              <th className="border border-violet-700 px-2 py-2 text-left">Sınıf</th>
            </tr>
          </thead>
          <tbody>
            {kirliVeri.map((satir) => {
              const satirHatasi = hatalar.find(
                (h) => h.satir === satir.id && h.sutun === "tum" && bulunanlar.has(h.id)
              );

              return (
                <tr
                  key={satir.id}
                  className={`transition ${
                    satirHatasi
                      ? "bg-violet-100 dark:bg-violet-900/30"
                      : satir.id % 2 === 0
                      ? "bg-[var(--color-bg)]"
                      : "bg-[var(--color-bg-secondary)]"
                  }`}
                >
                  <td className="border border-[var(--color-border)] px-2 py-1.5 font-bold text-[var(--color-text-secondary)]">
                    {satir.id}
                  </td>
                  {(["isim", "yas", "boy", "kilo", "sehir", "sinif"] as const).map((sutun) => {
                    const hata = hucreHataliMi(satir.id, sutun);
                    const deger = satir[sutun];
                    const secili =
                      seciliHucre?.satir === satir.id &&
                      seciliHucre?.sutun === sutun;

                    return (
                      <td
                        key={sutun}
                        onClick={() => hucreTikla(satir.id, sutun)}
                        className={`cursor-pointer border border-[var(--color-border)] px-2 py-1.5 transition hover:bg-sky-100 dark:hover:bg-sky-900/20 ${
                          hata
                            ? `${hataRenkleri[hata.tur].bg} font-bold ${hataRenkleri[hata.tur].text}`
                            : ""
                        } ${secili ? "ring-2 ring-sky-500" : ""}`}
                      >
                        {deger || (
                          <span className="italic text-gray-400">
                            {hata ? "[BOŞ]" : "—"}
                          </span>
                        )}
                        {hata && (
                          <span className={`ml-1 inline-block rounded px-1 text-[9px] font-bold text-white ${hataRenkleri[hata.tur].badge}`}>
                            {hataTurleriLabel[hata.tur]}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Seçili Hata Açıklaması */}
      {seciliHata && bulunanlar.has(seciliHata.id) && (
        <div className={`mb-4 rounded-xl border-2 p-4 ${hataRenkleri[seciliHata.tur].bg}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`rounded-full ${hataRenkleri[seciliHata.tur].badge} px-2 py-0.5 text-xs font-bold text-white`}>
              {hataTurleriLabel[seciliHata.tur]}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              Satır {seciliHata.satir}, {seciliHata.sutun === "tum" ? "Tüm Satır" : seciliHata.sutun}
            </span>
          </div>
          <p className={`text-sm ${hataRenkleri[seciliHata.tur].text}`}>
            {seciliHata.aciklama}
          </p>
        </div>
      )}

      {seciliHucre && !seciliHata && (
        <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          Bu hücrede bir hata yok. Aramaya devam et!
        </div>
      )}

      {/* Tamamlandı */}
      {oyunBitti && (
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 text-center dark:border-emerald-700 dark:bg-emerald-900/20">
          <p className="mb-2 text-4xl">🎉🧹</p>
          <h3 className="mb-2 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            Tebrikler! Tüm hataları buldun!
          </h3>
          <div className="mx-auto mb-4 max-w-md text-left">
            <p className="mb-2 text-sm text-[var(--color-text-secondary)]">Bulduğun hata türleri:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(hataTurleriLabel).map(([tur, label]) => {
                const sayi = hatalar.filter((h) => h.tur === tur).length;
                return (
                  <div
                    key={tur}
                    className={`flex items-center gap-2 rounded-lg p-2 ${hataRenkleri[tur].bg}`}
                  >
                    <span className={`rounded-full ${hataRenkleri[tur].badge} h-6 w-6 flex items-center justify-center text-xs font-bold text-white`}>
                      {sayi}
                    </span>
                    <span className={`text-xs font-medium ${hataRenkleri[tur].text}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mx-auto mb-4 max-w-md rounded-xl border border-sky-200 bg-sky-50 p-3 text-left text-sm dark:border-sky-800 dark:bg-sky-900/20">
            <h4 className="mb-1 font-bold text-sky-700 dark:text-sky-300">
              💡 Veri Temizleme Neden Önemli?
            </h4>
            <p className="text-[var(--color-text-secondary)]">
              Veri bilimcileri zamanlarının %60-80&apos;ini veri temizlemeye harcar!
              Kirli veri, yapay zekanın yanlış sonuçlar üretmesine neden olur.
              &quot;Çöp girer, çöp çıkar&quot; (GIGO) prensibi burada geçerlidir.
            </p>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
