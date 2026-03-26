"use client";

import { useState } from "react";

const temalar = [
  { id: "doga", baslik: "Doğa", icon: "🌿", aciklama: "Ormanlar, hayvanlar, çevre" },
  { id: "uzay", baslik: "Uzay", icon: "🚀", aciklama: "Gezegenler, astronotlar" },
  { id: "tarih", baslik: "Tarih", icon: "🏛️", aciklama: "Eski medeniyetler, kahramanlar" },
  { id: "gunluk", baslik: "Günlük Hayat", icon: "🏠", aciklama: "Okul, aile, arkadaşlık" },
];

const yzAraclari = [
  { id: "chatgpt", label: "ChatGPT (metin)", icon: "💬" },
  { id: "bing", label: "Bing (görsel)", icon: "🖼️" },
  { id: "canva", label: "Canva (tasarım)", icon: "🎨" },
];

interface Sahne {
  baslik: string;
  metin: string;
  gorselPrompt: string;
  sesNotu: string;
  araclar: string[];
}

const bosSahne = (): Sahne => ({
  baslik: "",
  metin: "",
  gorselPrompt: "",
  sesNotu: "",
  araclar: [],
});

export default function DijitalHikayeFormu() {
  const [tema, setTema] = useState("");
  const [sahneler, setSahneler] = useState<Sahne[]>([
    bosSahne(),
    bosSahne(),
    bosSahne(),
    bosSahne(),
    bosSahne(),
  ]);
  const [aktifSahne, setAktifSahne] = useState(0);
  const [onizleme, setOnizleme] = useState(false);

  const updateSahne = (index: number, alan: keyof Sahne, deger: string | string[]) => {
    setSahneler((prev) => {
      const yeni = [...prev];
      yeni[index] = { ...yeni[index], [alan]: deger };
      return yeni;
    });
  };

  const toggleArac = (sahneIndex: number, aracId: string) => {
    setSahneler((prev) => {
      const yeni = [...prev];
      const mevcutAraclar = [...yeni[sahneIndex].araclar];
      const idx = mevcutAraclar.indexOf(aracId);
      if (idx >= 0) {
        mevcutAraclar.splice(idx, 1);
      } else {
        mevcutAraclar.push(aracId);
      }
      yeni[sahneIndex] = { ...yeni[sahneIndex], araclar: mevcutAraclar };
      return yeni;
    });
  };

  const sahneProgress = sahneler.map((s) => {
    let puan = 0;
    if (s.baslik.trim()) puan++;
    if (s.metin.trim()) puan++;
    if (s.gorselPrompt.trim()) puan++;
    if (s.sesNotu.trim()) puan++;
    return puan;
  });

  const toplamProgress = sahneProgress.reduce((a, b) => a + b, 0);
  const maxProgress = 20; // 5 sahne × 4 alan

  const sifirla = () => {
    setTema("");
    setSahneler([bosSahne(), bosSahne(), bosSahne(), bosSahne(), bosSahne()]);
    setAktifSahne(0);
    setOnizleme(false);
  };

  const sahne = sahneler[aktifSahne];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Dijital Hikaye Projesi
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--color-text)]">
        5 Sahnelik Dijital Hikaye Planlama
      </h3>

      {/* İlerleme */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>İlerleme</span>
          <span>
            {toplamProgress}/{maxProgress} alan dolduruldu
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-bg-secondary)]">
          <div
            className="h-2 rounded-full bg-rose-500 transition-all duration-500"
            style={{ width: `${(toplamProgress / maxProgress) * 100}%` }}
          />
        </div>
      </div>

      {!onizleme ? (
        <>
          {/* Tema Seçimi */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-[var(--color-text)]">
              Hikaye Teması
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {temalar.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTema(t.id)}
                  className={`rounded-xl border-2 p-3 text-center transition ${
                    tema === t.id
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20"
                      : "border-[var(--color-border)] hover:border-rose-300"
                  }`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <p className="mt-1 text-xs font-bold text-[var(--color-text)]">
                    {t.baslik}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Sahne Sekmeleri */}
          <div className="mb-4 flex gap-1 overflow-x-auto">
            {sahneler.map((_, i) => (
              <button
                key={i}
                onClick={() => setAktifSahne(i)}
                className={`flex shrink-0 items-center gap-1 rounded-t-lg px-3 py-2 text-sm font-bold transition ${
                  aktifSahne === i
                    ? "bg-rose-500 text-white"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-rose-100"
                }`}
              >
                Sahne {i + 1}
                {sahneProgress[i] === 4 && (
                  <span className="text-xs">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Aktif Sahne Formu */}
          <div className="space-y-4 rounded-xl border border-[var(--color-border)] p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[var(--color-text)]">
                Sahne {aktifSahne + 1}
              </h4>
              <span className="text-xs text-[var(--color-text-secondary)]">
                {sahneProgress[aktifSahne]}/4 alan
              </span>
            </div>

            {/* Sahne Başlığı */}
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Sahne Başlığı
              </label>
              <input
                type="text"
                value={sahne.baslik}
                onChange={(e) =>
                  updateSahne(aktifSahne, "baslik", e.target.value)
                }
                placeholder="Örn: Gizli Orman'a Giriş"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>

            {/* Sahne Metni */}
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Sahne Metni
              </label>
              <textarea
                value={sahne.metin}
                onChange={(e) =>
                  updateSahne(aktifSahne, "metin", e.target.value)
                }
                placeholder="Bu sahnede neler oluyor? Hikayeyi buraya yaz..."
                rows={3}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>

            {/* Görsel Prompt */}
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Görsel Promptu (YZ&apos;ye ne söyleyeceksin?)
              </label>
              <textarea
                value={sahne.gorselPrompt}
                onChange={(e) =>
                  updateSahne(aktifSahne, "gorselPrompt", e.target.value)
                }
                placeholder="Örn: Sabah güneşinin aydınlattığı yeşil bir ormanın girişi, karikatür tarzında"
                rows={2}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>

            {/* Ses/Müzik Notu */}
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Ses / Müzik Notu
              </label>
              <input
                type="text"
                value={sahne.sesNotu}
                onChange={(e) =>
                  updateSahne(aktifSahne, "sesNotu", e.target.value)
                }
                placeholder="Örn: Kuş sesleri, huzurlu müzik"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>

            {/* YZ Araçları */}
            <div>
              <label className="mb-2 block text-sm font-bold text-[var(--color-text)]">
                Bu sahne için kullanacağım YZ araçları:
              </label>
              <div className="flex flex-wrap gap-2">
                {yzAraclari.map((arac) => (
                  <button
                    key={arac.id}
                    onClick={() => toggleArac(aktifSahne, arac.id)}
                    className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition ${
                      sahne.araclar.includes(arac.id)
                        ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-rose-300"
                    }`}
                  >
                    {arac.icon} {arac.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sahne Navigasyonu */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setAktifSahne(Math.max(0, aktifSahne - 1))}
                disabled={aktifSahne === 0}
                className="rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-sm font-bold text-[var(--color-text)] disabled:opacity-30"
              >
                ← Önceki Sahne
              </button>
              <button
                onClick={() => setAktifSahne(Math.min(4, aktifSahne + 1))}
                disabled={aktifSahne === 4}
                className="rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-sm font-bold text-[var(--color-text)] disabled:opacity-30"
              >
                Sonraki Sahne →
              </button>
            </div>
          </div>

          {/* Önizleme butonu */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOnizleme(true)}
              disabled={toplamProgress < 5}
              className="flex-1 rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-600 disabled:opacity-30"
            >
              Storyboard Önizleme
            </button>
            <button
              onClick={sifirla}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:opacity-80"
            >
              Sıfırla
            </button>
          </div>
        </>
      ) : (
        /* Storyboard Önizleme */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[var(--color-text)]">
              Storyboard Önizleme
              {tema && (
                <span className="ml-2 text-sm font-normal text-[var(--color-text-secondary)]">
                  Tema: {temalar.find((t) => t.id === tema)?.baslik}
                </span>
              )}
            </h4>
            <button
              onClick={() => setOnizleme(false)}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-sm font-bold text-[var(--color-text)]"
            >
              ← Düzenlemeye Dön
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sahneler.map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                    Sahne {i + 1}
                  </span>
                  {sahneProgress[i] === 4 && (
                    <span className="text-xs text-emerald-500">✓ Tam</span>
                  )}
                </div>

                <h5 className="mb-1 font-bold text-[var(--color-text)]">
                  {s.baslik || "(Başlık yok)"}
                </h5>

                {/* Görsel alanı */}
                <div className="mb-2 flex h-20 items-center justify-center rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)]">
                  <p className="px-2 text-center text-xs text-[var(--color-text-secondary)]">
                    {s.gorselPrompt
                      ? s.gorselPrompt.slice(0, 50) +
                        (s.gorselPrompt.length > 50 ? "..." : "")
                      : "🖼️ Görsel"}
                  </p>
                </div>

                <p className="mb-2 text-xs text-[var(--color-text-secondary)]">
                  {s.metin
                    ? s.metin.slice(0, 80) +
                      (s.metin.length > 80 ? "..." : "")
                    : "(Metin girilmemiş)"}
                </p>

                {s.sesNotu && (
                  <p className="mb-1 text-xs text-[var(--color-text-secondary)]">
                    🎵 {s.sesNotu}
                  </p>
                )}

                {s.araclar.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {s.araclar.map((aracId) => {
                      const arac = yzAraclari.find((a) => a.id === aracId);
                      return arac ? (
                        <span
                          key={aracId}
                          className="rounded-md bg-rose-100 px-1.5 py-0.5 text-xs text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                        >
                          {arac.icon}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Yazdır butonu */}
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 rounded-lg bg-rose-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-600"
            >
              Yazdır / PDF Olarak Kaydet
            </button>
            <button
              onClick={sifirla}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:opacity-80"
            >
              Baştan Başla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
