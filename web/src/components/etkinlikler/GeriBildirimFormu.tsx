"use client";

import { useState } from "react";

interface Degerlendirme {
  id: number;
  projeAdi: string;
  yenilikcilik: number;
  faydalılik: number;
  sunumKalitesi: number;
  teknikBasari: number;
  gucluYanlari: string;
  gelistirilebilecek: string;
}

const kriterler = [
  { key: "yenilikcilik", baslik: "Yenilikçilik", aciklama: "Proje özgün ve yaratıcı bir fikre sahip mi?", emojiler: ["😐", "🙂", "😊", "🤩", "🌟"] },
  { key: "faydalılik", baslik: "Faydalılık", aciklama: "Proje gerçek bir problemi çözüyor mu?", emojiler: ["😐", "🙂", "😊", "🤩", "🌟"] },
  { key: "sunumKalitesi", baslik: "Sunum Kalitesi", aciklama: "Proje açık ve anlaşılır biçimde sunuldu mu?", emojiler: ["😐", "🙂", "😊", "🤩", "🌟"] },
  { key: "teknikBasari", baslik: "Teknik Başarı", aciklama: "YZ modeli doğru çalışıyor mu?", emojiler: ["😐", "🙂", "😊", "🤩", "🌟"] },
];

const bosDegerlendirme = (): Degerlendirme => ({
  id: Date.now(),
  projeAdi: "",
  yenilikcilik: 0,
  faydalılik: 0,
  sunumKalitesi: 0,
  teknikBasari: 0,
  gucluYanlari: "",
  gelistirilebilecek: "",
});

export default function GeriBildirimFormu() {
  const [aktif, setAktif] = useState(false);
  const [degerlendirmeler, setDegerlendirmeler] = useState<Degerlendirme[]>([]);
  const [mevcut, setMevcut] = useState<Degerlendirme>(bosDegerlendirme());
  const [sonucGoster, setSonucGoster] = useState(false);

  const toplamPuan = mevcut.yenilikcilik + mevcut.faydalılik + mevcut.sunumKalitesi + mevcut.teknikBasari;
  const formGecerli =
    mevcut.projeAdi.trim().length > 0 &&
    mevcut.yenilikcilik > 0 &&
    mevcut.faydalılik > 0 &&
    mevcut.sunumKalitesi > 0 &&
    mevcut.teknikBasari > 0;

  const puanGuncelle = (kriter: string, puan: number) => {
    setMevcut((prev) => ({ ...prev, [kriter]: puan }));
  };

  const kaydet = () => {
    setDegerlendirmeler((prev) => [...prev, { ...mevcut }]);
    setSonucGoster(true);
  };

  const yeniDegerlendirme = () => {
    setMevcut(bosDegerlendirme());
    setSonucGoster(false);
  };

  const sifirla = () => {
    setAktif(false);
    setDegerlendirmeler([]);
    setMevcut(bosDegerlendirme());
    setSonucGoster(false);
  };

  const gaugeRenk = (puan: number) => {
    if (puan >= 16) return "text-green-600 dark:text-green-400";
    if (puan >= 12) return "text-blue-600 dark:text-blue-400";
    if (puan >= 8) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const gaugeYuzde = (puan: number) => Math.round((puan / 20) * 100);

  if (!aktif) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-lg bg-teal-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
          <span className="text-sm text-[var(--color-text-secondary)]">15 dakika &middot; Akran değerlendirmesi</span>
        </div>
        <h3 className="mb-3 text-xl font-bold">Akran Değerlendirme Formu</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Arkadaşlarının projelerini 4 kriterde değerlendir! Her kriter için 1-5 arası puan ver,
          güçlü yanlarını ve geliştirilebilecek noktalarını yaz. Birden fazla proje değerlendirebilirsin.
        </p>
        <button
          onClick={() => setAktif(true)}
          className="rounded-xl bg-teal-500 px-6 py-3 font-bold text-white transition hover:bg-teal-600"
        >
          Değerlendirmeye Başla
        </button>
      </div>
    );
  }

  if (sonucGoster) {
    const son = degerlendirmeler[degerlendirmeler.length - 1];
    const sonPuan = son.yenilikcilik + son.faydalılik + son.sunumKalitesi + son.teknikBasari;

    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <h3 className="mb-4 text-center text-xl font-extrabold">Değerlendirme Kaydedildi! ✅</h3>

        {/* Gauge */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative flex h-36 w-36 items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-700" />
              <circle
                cx="50" cy="50" r="42"
                fill="none" stroke="currentColor" strokeWidth="8"
                strokeDasharray={`${gaugeYuzde(sonPuan) * 2.64} 264`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className={gaugeRenk(sonPuan)}
              />
            </svg>
            <div className="text-center">
              <span className={`text-3xl font-extrabold ${gaugeRenk(sonPuan)}`}>{sonPuan}</span>
              <span className="text-lg text-[var(--color-text-secondary)]">/20</span>
            </div>
          </div>
          <p className="mt-2 text-lg font-bold">{son.projeAdi}</p>
        </div>

        {/* Kriter puanları */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          {kriterler.map((k) => {
            const puan = son[k.key as keyof Degerlendirme] as number;
            return (
              <div key={k.key} className="rounded-lg bg-[var(--color-bg)] p-3 text-center">
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">{k.baslik}</p>
                <p className="text-2xl">{k.emojiler[puan - 1]}</p>
                <p className="text-lg font-bold">{puan}/5</p>
              </div>
            );
          })}
        </div>

        {/* Tüm değerlendirmeler */}
        {degerlendirmeler.length > 1 && (
          <div className="mb-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
            <h4 className="mb-2 text-sm font-bold">Tüm Değerlendirmeler ({degerlendirmeler.length})</h4>
            <div className="space-y-2">
              {degerlendirmeler.map((d) => {
                const p = d.yenilikcilik + d.faydalılik + d.sunumKalitesi + d.teknikBasari;
                return (
                  <div key={d.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
                    <span className="text-sm font-medium">{d.projeAdi}</span>
                    <span className={`text-sm font-bold ${gaugeRenk(p)}`}>{p}/20</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={yeniDegerlendirme}
            className="flex-1 rounded-xl bg-teal-500 px-4 py-3 font-bold text-white transition hover:bg-teal-600"
          >
            Yeni Proje Değerlendir
          </button>
          <button
            onClick={sifirla}
            className="rounded-xl border-2 border-[var(--color-border)] px-4 py-3 font-bold transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sıfırla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Akran Değerlendirme</h3>
        {degerlendirmeler.length > 0 && (
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            {degerlendirmeler.length} proje değerlendirildi
          </span>
        )}
      </div>

      {/* Proje adı */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Proje Adı</label>
        <input
          type="text"
          value={mevcut.projeAdi}
          onChange={(e) => setMevcut((p) => ({ ...p, projeAdi: e.target.value }))}
          placeholder="Değerlendirdiğin projenin adını yaz"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
        />
      </div>

      {/* Kriterler */}
      <div className="mb-5 space-y-4">
        {kriterler.map((k) => {
          const puan = mevcut[k.key as keyof Degerlendirme] as number;
          return (
            <div key={k.key} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <div className="mb-1 flex items-center justify-between">
                <p className="font-bold">{k.baslik}</p>
                {puan > 0 && <span className="text-sm font-bold text-teal-600 dark:text-teal-400">{puan}/5</span>}
              </div>
              <p className="mb-3 text-xs text-[var(--color-text-secondary)]">{k.aciklama}</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => puanGuncelle(k.key, p)}
                    className={`flex flex-1 flex-col items-center rounded-lg border-2 p-2 transition ${
                      puan === p
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30"
                        : "border-transparent hover:border-teal-200 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
                    }`}
                  >
                    <span className="text-xl">{k.emojiler[p - 1]}</span>
                    <span className="mt-1 text-xs font-medium">{p}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Toplam puan göstergesi */}
      <div className="mb-5 flex items-center justify-center gap-3 rounded-xl bg-[var(--color-bg)] p-3">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">Toplam Puan:</span>
        <span className={`text-2xl font-extrabold ${gaugeRenk(toplamPuan)}`}>{toplamPuan}</span>
        <span className="text-lg text-[var(--color-text-secondary)]">/ 20</span>
        <div className="ml-2 h-3 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              toplamPuan >= 16 ? "bg-green-500" : toplamPuan >= 12 ? "bg-blue-500" : toplamPuan >= 8 ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${gaugeYuzde(toplamPuan)}%` }}
          />
        </div>
      </div>

      {/* Metin alanları */}
      <div className="mb-5 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">💪 Güçlü Yanları</label>
          <textarea
            value={mevcut.gucluYanlari}
            onChange={(e) => setMevcut((p) => ({ ...p, gucluYanlari: e.target.value }))}
            placeholder="Projede en beğendiğin şeyler neler?"
            rows={2}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-teal-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">📈 Geliştirilebilecek Yanları</label>
          <textarea
            value={mevcut.gelistirilebilecek}
            onChange={(e) => setMevcut((p) => ({ ...p, gelistirilebilecek: e.target.value }))}
            placeholder="Proje nasıl daha iyi olabilir?"
            rows={2}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <button
        onClick={kaydet}
        disabled={!formGecerli}
        className="w-full rounded-xl bg-teal-500 px-6 py-3 font-bold text-white transition hover:bg-teal-600 disabled:opacity-40"
      >
        Değerlendirmeyi Kaydet ✅
      </button>
    </div>
  );
}
