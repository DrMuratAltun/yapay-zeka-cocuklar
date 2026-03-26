"use client";

import { useState } from "react";

interface Tahmin {
  id: number;
  baslik: string;
  icon: string;
  aciklama: string;
  uzmanTahmin: number;
  kategori: string;
}

const tahminler: Tahmin[] = [
  { id: 1, baslik: "Otonom araçlar yaygınlaşır", icon: "🚗", aciklama: "Sürücüsüz arabalar tüm şehirlerde günlük ulaşımda kullanılır.", uzmanTahmin: 2035, kategori: "Ulaşım" },
  { id: 2, baslik: "YZ doktorlar yaygınlaşır", icon: "🏥", aciklama: "YZ destekli teşhis sistemleri her hastanede kullanılır.", uzmanTahmin: 2032, kategori: "Sağlık" },
  { id: 3, baslik: "Uzay keşfinde YZ", icon: "🚀", aciklama: "YZ kontrollü robotlar Mars'ta bağımsız keşif yapar.", uzmanTahmin: 2040, kategori: "Uzay" },
  { id: 4, baslik: "Kişiselleştirilmiş eğitim", icon: "📚", aciklama: "Her öğrenci YZ öğretmen ile kendi hızında öğrenir.", uzmanTahmin: 2030, kategori: "Eğitim" },
  { id: 5, baslik: "Gerçek zamanlı çeviri", icon: "🌐", aciklama: "YZ kulak içi cihazla tüm dillerde anlık çeviri yapılır.", uzmanTahmin: 2028, kategori: "İletişim" },
  { id: 6, baslik: "YZ ile ilaç keşfi", icon: "💊", aciklama: "Yeni ilaçlar YZ ile aylar içinde keşfedilir (şu an yıllar sürüyor).", uzmanTahmin: 2030, kategori: "Sağlık" },
  { id: 7, baslik: "Akıllı şehirler", icon: "🏙️", aciklama: "Trafik, enerji, su tüm altyapı YZ ile yönetilir.", uzmanTahmin: 2038, kategori: "Şehir" },
  { id: 8, baslik: "YZ yaratıcı ortak", icon: "🎨", aciklama: "Sanatçılar ve yazarlar YZ ile birlikte eser üretir.", uzmanTahmin: 2027, kategori: "Sanat" },
  { id: 9, baslik: "Küresel iklim yönetimi", icon: "🌡️", aciklama: "YZ ile iklim değişikliğine karşı küresel koordinasyon sağlanır.", uzmanTahmin: 2042, kategori: "Çevre" },
  { id: 10, baslik: "Genel yapay zeka (AGI)", icon: "🧠", aciklama: "İnsana yakın genel amaçlı düşünme yeteneğine sahip YZ geliştirilir.", uzmanTahmin: 2045, kategori: "Teknoloji" },
];

const yillar = [2025, 2028, 2030, 2032, 2035, 2038, 2040, 2042, 2045, 2050];

export default function YzZamanCizelgesi2050() {
  const [yerlesimler, setYerlesimler] = useState<Record<number, number>>({});
  const [secilenTahmin, setSecilenTahmin] = useState<number | null>(null);
  const [kontrol, setKontrol] = useState(false);

  const handleYilSec = (yil: number) => {
    if (secilenTahmin === null || kontrol) return;
    setYerlesimler((prev) => ({ ...prev, [secilenTahmin]: yil }));
    setSecilenTahmin(null);
  };

  const handleKontrol = () => {
    setKontrol(true);
  };

  const handleSifirla = () => {
    setYerlesimler({});
    setSecilenTahmin(null);
    setKontrol(false);
  };

  const yerlesmis = Object.keys(yerlesimler).length;
  const farkHesapla = (tahminId: number) => {
    const ogrenciYil = yerlesimler[tahminId];
    const uzmanYil = tahminler.find((t) => t.id === tahminId)!.uzmanTahmin;
    return Math.abs(ogrenciYil - uzmanYil);
  };

  const ortalamFark = kontrol
    ? Math.round(
        tahminler.reduce((acc, t) => acc + (yerlesimler[t.id] !== undefined ? farkHesapla(t.id) : 0), 0) / yerlesmis
      )
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-extrabold">YZ Zaman Çizelgesi 2050</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Bu YZ tahminlerinin hangi yılda gerçekleşeceğini düşünüyorsun?
        </p>
      </div>

      {kontrol && (
        <div className={`rounded-2xl p-5 text-center ${
          ortalamFark <= 3 ? "bg-emerald-50 dark:bg-emerald-900/20" : ortalamFark <= 6 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-sky-50 dark:bg-sky-900/20"
        }`}>
          <span className="text-4xl">{ortalamFark <= 3 ? "🎯" : ortalamFark <= 6 ? "👍" : "🔮"}</span>
          <h4 className="mt-2 text-lg font-bold">
            Ortalama {ortalamFark} yıl fark!
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {ortalamFark <= 3
              ? "Harika! Uzman tahminlerine çok yakınsın!"
              : ortalamFark <= 6
                ? "İyi tahminler! Bazı teknolojilerin zamanlaması seni şaşırtabilir."
                : "İlginç bir bakış açısına sahipsin! Uzman tahminleriyle karşılaştır ve tartış."}
          </p>
        </div>
      )}

      {/* Tahmin Kartları */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-[var(--color-text-secondary)]">
          {kontrol ? "Sonuçlar:" : "Bir tahmin seç, sonra zaman çizelgesine yerleştir:"}
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {tahminler.map((t) => {
            const yerlestirildi = yerlesimler[t.id] !== undefined;
            const fark = kontrol && yerlestirildi ? farkHesapla(t.id) : null;
            return (
              <button
                key={t.id}
                onClick={() => !kontrol && !yerlestirildi && setSecilenTahmin(secilenTahmin === t.id ? null : t.id)}
                disabled={kontrol || yerlestirildi}
                className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                  secilenTahmin === t.id
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 dark:bg-indigo-900/20 dark:ring-indigo-800"
                    : kontrol && fark !== null && fark <= 2
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10"
                      : kontrol && fark !== null && fark > 5
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-900/10"
                        : yerlestirildi
                          ? "border-sky-300 bg-sky-50 dark:bg-sky-900/10"
                          : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-indigo-300"
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{t.baslik}</span>
                    <span className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-secondary)]">{t.kategori}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{t.aciklama}</p>
                  {yerlestirildi && (
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Senin tahminin: {yerlesimler[t.id]}</span>
                      {kontrol && (
                        <>
                          <span className="text-[var(--color-text-secondary)]">|</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">Uzman: {t.uzmanTahmin}</span>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            fark! <= 2 ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" : "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }`}>
                            {fark === 0 ? "Tam isabet!" : `${fark} yıl fark`}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zaman Çizelgesi */}
      {!kontrol && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[var(--color-text-secondary)]">
            Zaman Çizelgesi — {secilenTahmin !== null ? `"${tahminler.find((t) => t.id === secilenTahmin)!.baslik}" için bir yıl seç:` : "Önce yukarıdan bir tahmin seç"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {yillar.map((yil) => {
              const buYildakiTahminler = tahminler.filter((t) => yerlesimler[t.id] === yil);
              return (
                <button
                  key={yil}
                  onClick={() => handleYilSec(yil)}
                  disabled={secilenTahmin === null}
                  className={`flex flex-col items-center rounded-xl border-2 px-3 py-2 transition ${
                    secilenTahmin !== null
                      ? "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer dark:hover:bg-indigo-900/20"
                      : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm font-bold">{yil}</span>
                  {buYildakiTahminler.length > 0 && (
                    <div className="mt-1 flex gap-0.5">
                      {buYildakiTahminler.map((t) => (
                        <span key={t.id} className="text-xs">{t.icon}</span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* İlerleme */}
      <div className="text-center text-sm text-[var(--color-text-secondary)]">
        {yerlesmis} / {tahminler.length} tahmin yerleştirildi
      </div>

      {/* Aksiyon Butonları */}
      <div className="flex justify-center gap-3">
        {!kontrol && yerlesmis === tahminler.length && (
          <button
            onClick={handleKontrol}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 font-bold text-white transition hover:bg-emerald-700"
          >
            Uzman Tahminleriyle Karşılaştır
          </button>
        )}
        {kontrol && (
          <button
            onClick={handleSifirla}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-bold text-white transition hover:bg-indigo-700"
          >
            Tekrar Dene
          </button>
        )}
      </div>

      {/* Tartışma Soruları */}
      {kontrol && (
        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
          <h4 className="mb-2 font-bold">Tartışma Soruları:</h4>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>&#8226; Hangi tahminlerin daha erken veya geç gerçekleşeceğini düşünüyorsun?</li>
            <li>&#8226; Bu teknolojilerden hangisi seni en çok heyecanlandırıyor?</li>
            <li>&#8226; Hangi teknolojiler konusunda endişelerin var?</li>
            <li>&#8226; 2050&apos;de bu listede olmayan hangi YZ gelişmeleri olabilir?</li>
            <li>&#8226; Bu gelecekte senin rolün ne olabilir?</li>
          </ul>
        </div>
      )}
    </div>
  );
}
