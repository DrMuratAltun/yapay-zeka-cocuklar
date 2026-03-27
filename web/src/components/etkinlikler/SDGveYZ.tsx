"use client";

import { useState } from "react";

interface SDG {
  id: number;
  baslik: string;
  icon: string;
  renk: string;
  dogruCozumIdx: number;
}

interface Cozum {
  id: number;
  metin: string;
  aciklama: string;
}

const sdgListesi: SDG[] = [
  { id: 1, baslik: "Yoksulluğa Son", icon: "🏠", renk: "bg-red-500", dogruCozumIdx: 0 },
  { id: 2, baslik: "Açlığa Son", icon: "🌾", renk: "bg-yellow-600", dogruCozumIdx: 1 },
  { id: 3, baslik: "Sağlık ve Kaliteli Yaşam", icon: "🏥", renk: "bg-green-600", dogruCozumIdx: 2 },
  { id: 4, baslik: "Nitelikli Eğitim", icon: "📚", renk: "bg-rose-600", dogruCozumIdx: 3 },
  { id: 6, baslik: "Temiz Su ve Sanitasyon", icon: "💧", renk: "bg-cyan-600", dogruCozumIdx: 4 },
  { id: 7, baslik: "Erişilebilir ve Temiz Enerji", icon: "⚡", renk: "bg-amber-500", dogruCozumIdx: 5 },
  { id: 13, baslik: "İklim Eylemi", icon: "🌡️", renk: "bg-emerald-700", dogruCozumIdx: 6 },
  { id: 15, baslik: "Karasal Yaşam", icon: "🌳", renk: "bg-lime-600", dogruCozumIdx: 7 },
];

const cozumListesi: Cozum[] = [
  { id: 0, metin: "YZ ile mikro-kredi risk analizi yaparak yoksul ailelere uygun finansal destek sağlama", aciklama: "YZ, kişilerin ödeme kapasitesini geleneksel yöntemlerden daha doğru tahmin ederek finansal erişimi artırır." },
  { id: 1, metin: "Uydu görüntüleri ve sensör verilerini analiz ederek mahsul verimini tahmin etme", aciklama: "YZ, tarım alanlarındaki verim düşüşünü önceden tespit ederek gıda krizlerini önlemeye yardımcı olur." },
  { id: 2, metin: "Tıbbi görüntülerden hastalık taraması yapan erken teşhis sistemi", aciklama: "YZ, röntgen ve MR görüntülerinden kanseri ve diğer hastalıkları erken aşamada tespit edebilir." },
  { id: 3, metin: "Öğrenci performansına göre kişiselleştirilmiş öğrenme yolu oluşturma", aciklama: "Adaptif öğrenme sistemleri, her öğrencinin seviyesine uygun içerik sunarak eğitim kalitesini artırır." },
  { id: 4, metin: "Su dağıtım şebekesindeki sızıntıları sensörlerle tespit eden akıllı sistem", aciklama: "YZ, su kayıplarını gerçek zamanlı tespit ederek temiz su kaynaklarının korunmasına yardımcı olur." },
  { id: 5, metin: "Akıllı şebeke yönetimi ile yenilenebilir enerji kullanımını optimize etme", aciklama: "YZ, güneş ve rüzgar enerjisi üretimini tahmin ederek enerji dağıtımını verimli hale getirir." },
  { id: 6, metin: "İklim modellemesi ve karbon emisyonu tahmin sistemi", aciklama: "YZ, iklim değişikliği senaryolarını modelleyerek etkili politikalar geliştirilmesine katkı sağlar." },
  { id: 7, metin: "Kamera tuzakları ve YZ ile nesli tükenmekte olan türleri izleme", aciklama: "YZ, kameralardaki hayvan görüntülerini otomatik sınıflandırarak biyoçeşitlilik takibini kolaylaştırır." },
];

export default function SDGveYZ() {
  const [eslesmeler, setEslesmeler] = useState<Record<number, number | null>>({});
  const [kontrol, setKontrol] = useState(false);
  const [secilenSDG, setSecilenSDG] = useState<number | null>(null);

  const kullanilanCozumler = Object.values(eslesmeler).filter((v) => v !== null) as number[];

  const handleCozumSec = (cozumIdx: number) => {
    if (secilenSDG === null || kontrol) return;
    setEslesmeler((prev) => {
      // Eğer bu çözüm başka bir SDG'ye atanmışsa, oradan kaldır
      const yeni = { ...prev };
      for (const key of Object.keys(yeni)) {
        if (yeni[Number(key)] === cozumIdx) {
          yeni[Number(key)] = null;
        }
      }
      yeni[secilenSDG] = cozumIdx;
      return yeni;
    });
    setSecilenSDG(null);
  };

  const handleKontrol = () => {
    setKontrol(true);
  };

  const handleSifirla = () => {
    setEslesmeler({});
    setKontrol(false);
    setSecilenSDG(null);
  };

  const dogruSayisi = kontrol
    ? sdgListesi.filter((sdg) => eslesmeler[sdg.id] === sdg.dogruCozumIdx).length
    : 0;

  const puan = Math.round((dogruSayisi / sdgListesi.length) * 100);

  return (
    <div className="space-y-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> BM Sürdürülebilir Kalkınma Hedefleri ve YZ Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Birleşmiş Milletler, 2030 yılına kadar dünyayı daha iyi bir yer yapmak için 17 Sürdürülebilir Kalkınma Hedefi (SKH) belirlemiştir: yoksullukla mücadele, temiz enerji, kaliteli eğitim gibi. Yapay zeka, bu hedeflere ulaşmada güçlü bir araç olabilir; hastalık teşhisinden iklim değişikliği takibine kadar birçok alanda katkı sağlar.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-extrabold">Sürdürülebilir Kalkınma ve YZ</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          BM Sürdürülebilir Kalkınma Hedeflerini doğru YZ çözümleriyle eşleştir!
        </p>
      </div>

      {kontrol && (
        <div className={`rounded-2xl p-5 text-center ${puan >= 75 ? "bg-emerald-50 dark:bg-emerald-900/20" : puan >= 50 ? "bg-amber-50 dark:bg-amber-900/20" : "bg-rose-50 dark:bg-rose-900/20"}`}>
          <span className="text-4xl">{puan >= 75 ? "🏆" : puan >= 50 ? "👍" : "💪"}</span>
          <h4 className="mt-2 text-lg font-bold">{dogruSayisi} / {sdgListesi.length} Doğru Eşleşme!</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {puan >= 75 ? "Harika! Küresel sorunlara YZ çözümleri konusunda çok bilgilisin!" : puan >= 50 ? "İyi gidiyorsun! Birkaç eşleşmeyi daha öğrenebilirsin." : "Endişelenme! Her yanlıştan yeni bir şey öğreniyorsun."}
          </p>
          <button
            onClick={handleSifirla}
            className="mt-3 rounded-xl bg-teal-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SDG Listesi */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[var(--color-text-secondary)]">Sürdürülebilir Kalkınma Hedefleri</h4>
          {sdgListesi.map((sdg) => {
            const eslesme = eslesmeler[sdg.id];
            const dogru = kontrol && eslesme === sdg.dogruCozumIdx;
            const yanlis = kontrol && eslesme !== null && eslesme !== sdg.dogruCozumIdx;
            return (
              <button
                key={sdg.id}
                onClick={() => !kontrol && setSecilenSDG(secilenSDG === sdg.id ? null : sdg.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                  secilenSDG === sdg.id
                    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200 dark:bg-teal-900/20 dark:ring-teal-800"
                    : dogru
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                      : yanlis
                        ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                        : eslesme !== null && eslesme !== undefined
                          ? "border-sky-300 bg-sky-50 dark:bg-sky-900/10"
                          : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-teal-300"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-white ${sdg.renk}`}>
                  {sdg.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">SDG {sdg.id}: {sdg.baslik}</p>
                  {eslesme !== null && eslesme !== undefined && (
                    <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                      {cozumListesi[eslesme].metin.slice(0, 60)}...
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  {dogru && <span className="text-lg text-emerald-500">✓</span>}
                  {yanlis && <span className="text-lg text-rose-500">✗</span>}
                  {!kontrol && eslesme !== null && eslesme !== undefined && <span className="text-sky-500">✎</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Çözüm Listesi */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-[var(--color-text-secondary)]">
            {secilenSDG !== null ? `"${sdgListesi.find((s) => s.id === secilenSDG)!.baslik}" için bir çözüm seç:` : "Bir YZ Çözümü Seç"}
          </h4>
          {cozumListesi.map((c) => {
            const kullanildi = kullanilanCozumler.includes(c.id);
            const dogruEslesme = kontrol ? sdgListesi.find((s) => s.dogruCozumIdx === c.id) : null;
            return (
              <button
                key={c.id}
                onClick={() => handleCozumSec(c.id)}
                disabled={secilenSDG === null || kontrol}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  kullanildi && !kontrol
                    ? "border-sky-300 bg-sky-50 opacity-60 dark:bg-sky-900/10"
                    : kontrol
                      ? "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                      : secilenSDG !== null
                        ? "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/10 cursor-pointer"
                        : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] opacity-50 cursor-not-allowed"
                }`}
              >
                <span className="mt-0.5 shrink-0 text-lg">🤖</span>
                <div className="flex-1">
                  <p className="text-sm">{c.metin}</p>
                  {kontrol && (
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                      {dogruEslesme && `→ SDG ${dogruEslesme.id}: ${dogruEslesme.baslik}`}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Açıklamalar (kontrol sonrası) */}
      {kontrol && (
        <div className="space-y-2">
          <h4 className="font-bold">Açıklamalar:</h4>
          {sdgListesi.map((sdg) => {
            const c = cozumListesi[sdg.dogruCozumIdx];
            return (
              <div key={sdg.id} className="rounded-lg bg-[var(--color-bg-secondary)] p-3 text-sm">
                <p className="font-medium">{sdg.icon} SDG {sdg.id} → {c.metin.slice(0, 50)}...</p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{c.aciklama}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Kontrol Et */}
      {!kontrol && Object.values(eslesmeler).filter((v) => v !== null).length === sdgListesi.length && (
        <button
          onClick={handleKontrol}
          className="mx-auto flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          Eşleşmeleri Kontrol Et ✓
        </button>
      )}
    </div>
  );
}
