"use client";

import { useState } from "react";

const yzAraclari = [
  "Google Teachable Machine",
  "ML for Kids",
  "PictoBlox",
  "ChatGPT / Gemini (Metin)",
  "Scratch + ML uzantısı",
  "RunwayML (Görsel)",
  "Hugging Face (Model)",
  "DALL-E / Midjourney (Görsel üretim)",
  "Diğer",
];

const bosForm = {
  projeAdi: "",
  problemTanimi: "",
  hedefKitle: "",
  yzAraci: "",
  veriKaynagi: "",
  hafta1: "",
  hafta2: "",
  hafta3: "",
  hafta4: "",
  beklenenSonuclar: "",
};

export default function ProjePlanlama() {
  const [adim, setAdim] = useState(0); // 0: intro, 1-7: adımlar, 8: özet
  const [form, setForm] = useState(bosForm);
  const [ozetGoster, setOzetGoster] = useState(false);

  const adimlar = [
    { baslik: "Proje Adı", icon: "📝" },
    { baslik: "Problem Tanımı", icon: "🔍" },
    { baslik: "Hedef Kitle", icon: "👥" },
    { baslik: "YZ Aracı", icon: "🤖" },
    { baslik: "Veri Kaynağı", icon: "📊" },
    { baslik: "Haftalık Plan", icon: "📅" },
    { baslik: "Beklenen Sonuçlar", icon: "🎯" },
  ];

  const guncelle = (alan: string, deger: string) => {
    setForm((prev) => ({ ...prev, [alan]: deger }));
  };

  const adimGecerliMi = () => {
    switch (adim) {
      case 1: return form.projeAdi.trim().length > 0;
      case 2: return form.problemTanimi.trim().length > 0;
      case 3: return form.hedefKitle.trim().length > 0;
      case 4: return form.yzAraci.length > 0;
      case 5: return form.veriKaynagi.trim().length > 0;
      case 6: return form.hafta1.trim().length > 0 && form.hafta2.trim().length > 0 && form.hafta3.trim().length > 0 && form.hafta4.trim().length > 0;
      case 7: return form.beklenenSonuclar.trim().length > 0;
      default: return true;
    }
  };

  const ilerlemeYuzdesi = adim === 0 ? 0 : Math.round((Math.min(adim, 7) / 7) * 100);

  const sifirla = () => {
    setAdim(0);
    setForm(bosForm);
    setOzetGoster(false);
  };

  if (adim === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-lg bg-teal-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
          <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel veya grup</span>
        </div>
        <h3 className="mb-3 text-xl font-bold">Proje Planlama Formu</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          YZ projen için adım adım bir plan oluştur! 7 adımda projenin tüm detaylarını belirleyeceksin.
          Sonunda planını özetleyen güzel bir rapor göreceksin.
        </p>
        <div className="mb-4 grid grid-cols-7 gap-1">
          {adimlar.map((a, i) => (
            <div key={i} className="flex flex-col items-center rounded-lg bg-teal-50 p-2 text-center dark:bg-teal-900/20">
              <span className="text-lg">{a.icon}</span>
              <span className="mt-1 text-[10px] font-medium leading-tight text-teal-700 dark:text-teal-300">{a.baslik}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setAdim(1)}
          className="rounded-xl bg-teal-500 px-6 py-3 font-bold text-white transition hover:bg-teal-600"
        >
          Planlamaya Başla
        </button>
      </div>
    );
  }

  if (ozetGoster) {
    return (
      <div className="rounded-2xl border-2 border-teal-300 bg-[var(--color-bg-secondary)] p-6 dark:border-teal-700">
        <h3 className="mb-6 text-center text-2xl font-extrabold">📋 Proje Planın</h3>

        <div className="mb-6 rounded-xl border border-teal-200 bg-white p-5 dark:border-teal-800 dark:bg-gray-800">
          <h4 className="mb-4 text-center text-xl font-bold text-teal-700 dark:text-teal-300">{form.projeAdi}</h4>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Problem Tanımı</p>
              <p className="mt-1 text-[var(--color-text)]">{form.problemTanimi}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Hedef Kitle</p>
                <p className="mt-1 text-[var(--color-text)]">{form.hedefKitle}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">YZ Aracı</p>
                <p className="mt-1 text-[var(--color-text)]">{form.yzAraci}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Veri Kaynağı</p>
              <p className="mt-1 text-[var(--color-text)]">{form.veriKaynagi}</p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Haftalık Plan</p>
              <div className="space-y-2">
                {[
                  { hafta: "1. Hafta", icerik: form.hafta1 },
                  { hafta: "2. Hafta", icerik: form.hafta2 },
                  { hafta: "3. Hafta", icerik: form.hafta3 },
                  { hafta: "4. Hafta", icerik: form.hafta4 },
                ].map((h) => (
                  <div key={h.hafta} className="flex items-start gap-2 rounded-lg bg-teal-50 p-2 dark:bg-teal-900/20">
                    <span className="whitespace-nowrap rounded bg-teal-200 px-2 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-800 dark:text-teal-200">{h.hafta}</span>
                    <span className="text-sm">{h.icerik}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">Beklenen Sonuçlar</p>
              <p className="mt-1 text-[var(--color-text)]">{form.beklenenSonuclar}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOzetGoster(false)}
            className="flex-1 rounded-xl border-2 border-[var(--color-border)] px-4 py-3 font-bold transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ← Düzenle
          </button>
          <button
            onClick={sifirla}
            className="flex-1 rounded-xl bg-teal-500 px-4 py-3 font-bold text-white transition hover:bg-teal-600"
          >
            Yeni Plan Oluştur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Üst bar */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Proje Planlama</h3>
        <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
          Adım {adim} / 7
        </span>
      </div>

      {/* İlerleme çubuğu */}
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-500"
          style={{ width: `${ilerlemeYuzdesi}%` }}
        />
      </div>
      <div className="mb-6 flex justify-between text-xs text-[var(--color-text-secondary)]">
        {adimlar.map((a, i) => (
          <span key={i} className={i + 1 <= adim ? "font-bold text-teal-600 dark:text-teal-400" : ""}>{a.icon}</span>
        ))}
      </div>

      {/* Adım başlığı */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">{adimlar[adim - 1].icon}</span>
        <h4 className="text-xl font-bold">{adimlar[adim - 1].baslik}</h4>
      </div>

      {/* Adım içerikleri */}
      <div className="mb-6">
        {adim === 1 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Projen için çekici bir isim bul:</label>
            <input
              type="text"
              value={form.projeAdi}
              onChange={(e) => guncelle("projeAdi", e.target.value)}
              placeholder="Örn: Akıllı Bitki Bakıcısı"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
            />
          </div>
        )}
        {adim === 2 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Hangi problemi çözmek istiyorsun?</label>
            <textarea
              value={form.problemTanimi}
              onChange={(e) => guncelle("problemTanimi", e.target.value)}
              placeholder="Örn: Okulumuzda yemekhanede çok fazla yemek israfı oluyor..."
              rows={3}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
            />
          </div>
        )}
        {adim === 3 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Bu proje kimin işine yarayacak?</label>
            <input
              type="text"
              value={form.hedefKitle}
              onChange={(e) => guncelle("hedefKitle", e.target.value)}
              placeholder="Örn: Okulumuzun öğrencileri ve yemekhane personeli"
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
            />
          </div>
        )}
        {adim === 4 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Hangi YZ aracını kullanacaksın?</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {yzAraclari.map((arac) => (
                <button
                  key={arac}
                  onClick={() => guncelle("yzAraci", arac)}
                  className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-medium transition ${
                    form.yzAraci === arac
                      ? "border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                      : "border-[var(--color-border)] hover:border-teal-300"
                  }`}
                >
                  {form.yzAraci === arac ? "✅ " : ""}{arac}
                </button>
              ))}
            </div>
          </div>
        )}
        {adim === 5 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Verilerini nereden toplayacaksın?</label>
            <textarea
              value={form.veriKaynagi}
              onChange={(e) => guncelle("veriKaynagi", e.target.value)}
              placeholder="Örn: Yemekhaneden günlük israf fotoğrafları çekeceğim, 2 hafta boyunca her gün..."
              rows={3}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
            />
          </div>
        )}
        {adim === 6 && (
          <div className="space-y-3">
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Her hafta ne yapacaksın?</label>
            {[
              { key: "hafta1", label: "1. Hafta: Araştırma ve Planlama", placeholder: "Problemi araştır, veri topla..." },
              { key: "hafta2", label: "2. Hafta: Veri Toplama ve Hazırlama", placeholder: "Verileri topla, temizle, etiketle..." },
              { key: "hafta3", label: "3. Hafta: Model Eğitimi ve Test", placeholder: "Modeli eğit, test et, iyileştir..." },
              { key: "hafta4", label: "4. Hafta: Sunum ve Değerlendirme", placeholder: "Prototip hazırla, sunum yap..." },
            ].map((h) => (
              <div key={h.key}>
                <p className="mb-1 text-sm font-bold text-teal-700 dark:text-teal-300">{h.label}</p>
                <input
                  type="text"
                  value={form[h.key as keyof typeof form]}
                  onChange={(e) => guncelle(h.key, e.target.value)}
                  placeholder={h.placeholder}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-teal-500"
                />
              </div>
            ))}
          </div>
        )}
        {adim === 7 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">Projeden ne sonuçlar bekliyorsun?</label>
            <textarea
              value={form.beklenenSonuclar}
              onChange={(e) => guncelle("beklenenSonuclar", e.target.value)}
              placeholder="Örn: Yemek israfını %30 azaltmayı hedefliyorum. Model en az %80 doğrulukla..."
              rows={3}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-teal-500"
            />
          </div>
        )}
      </div>

      {/* Navigasyon */}
      <div className="flex gap-3">
        <button
          onClick={() => setAdim((p) => Math.max(1, p - 1))}
          disabled={adim === 1}
          className="rounded-xl border-2 border-[var(--color-border)] px-4 py-3 font-bold transition hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800"
        >
          ← Geri
        </button>
        {adim < 7 ? (
          <button
            onClick={() => setAdim((p) => p + 1)}
            disabled={!adimGecerliMi()}
            className="flex-1 rounded-xl bg-teal-500 px-4 py-3 font-bold text-white transition hover:bg-teal-600 disabled:opacity-40"
          >
            Devam →
          </button>
        ) : (
          <button
            onClick={() => setOzetGoster(true)}
            disabled={!adimGecerliMi()}
            className="flex-1 rounded-xl bg-teal-500 px-4 py-3 font-bold text-white transition hover:bg-teal-600 disabled:opacity-40"
          >
            Planını Gör ✨
          </button>
        )}
      </div>
    </div>
  );
}
