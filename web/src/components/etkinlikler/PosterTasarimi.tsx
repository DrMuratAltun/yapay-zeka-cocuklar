"use client";

import { useState } from "react";

const renkPaletleri = [
  {
    id: "canli",
    ad: "Canlı Renkler",
    renkler: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
    aciklama: "Enerjik ve dikkat çekici",
  },
  {
    id: "pastel",
    ad: "Pastel Tonlar",
    renkler: ["#fca5a5", "#fde68a", "#a7f3d0", "#93c5fd"],
    aciklama: "Yumuşak ve zarif",
  },
  {
    id: "dogal",
    ad: "Doğa Tonları",
    renkler: ["#365314", "#854d0e", "#0c4a6e", "#6b21a8"],
    aciklama: "Toprak ve doğa renkleri",
  },
  {
    id: "modern",
    ad: "Modern Kontrast",
    renkler: ["#1e1b4b", "#f97316", "#fafafa", "#6366f1"],
    aciklama: "Şık ve profesyonel",
  },
];

export default function PosterTasarimi() {
  const [etkinlikAdi, setEtkinlikAdi] = useState("");
  const [hedefKitle, setHedefKitle] = useState("");
  const [posterBoyutu, setPosterBoyutu] = useState("");
  const [renkPaleti, setRenkPaleti] = useState("");
  const [baslikMetni, setBaslikMetni] = useState("");
  const [altMetin, setAltMetin] = useState("");
  const [gorselPrompt, setGorselPrompt] = useState("");

  const seciliPalet = renkPaletleri.find((p) => p.id === renkPaleti);

  const formDolu =
    etkinlikAdi.trim().length > 0 &&
    hedefKitle !== "" &&
    posterBoyutu !== "" &&
    renkPaleti !== "" &&
    baslikMetni.trim().length > 0;

  const sifirla = () => {
    setEtkinlikAdi("");
    setHedefKitle("");
    setPosterBoyutu("");
    setRenkPaleti("");
    setBaslikMetni("");
    setAltMetin("");
    setGorselPrompt("");
  };

  const boyutBilgi: Record<string, string> = {
    a4: "210 × 297 mm",
    a3: "297 × 420 mm",
    sosyal: "1080 × 1080 px",
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> YZ Destekli Tasarım Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zeka, tasarım sürecinde güçlü bir yardımcı olabilir. Canva, Adobe Firefly gibi araçlar YZ kullanarak renk önerileri, düzen ayarlamaları ve görsel üretimi yapar. Ancak yaratıcı fikir ve mesaj her zaman insandan gelir; YZ bu fikirleri hayata geçirmene yardımcı olur.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-pink-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Poster Tasarım Planlayıcı
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        YZ ile Poster Tasarımı Planlama
      </h3>
      <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
        Canva&apos;da poster oluşturmadan önce planını burada hazırla!
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sol: Form */}
        <div className="space-y-4">
          {/* Etkinlik Adı */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Etkinlik / Poster Adı
            </label>
            <input
              type="text"
              value={etkinlikAdi}
              onChange={(e) => setEtkinlikAdi(e.target.value)}
              placeholder="Örn: Bilim Şenliği 2025"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
            />
          </div>

          {/* Hedef Kitle */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Hedef Kitle
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "ogrenciler", label: "Öğrenciler", icon: "👩‍🎓" },
                { id: "ogretmenler", label: "Öğretmenler", icon: "👩‍🏫" },
                { id: "veliler", label: "Veliler", icon: "👨‍👩‍👧" },
              ].map((kitle) => (
                <button
                  key={kitle.id}
                  onClick={() => setHedefKitle(kitle.id)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-bold transition ${
                    hedefKitle === kitle.id
                      ? "border-pink-500 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
                      : "border-[var(--color-border)] text-[var(--color-text)] hover:border-pink-300"
                  }`}
                >
                  {kitle.icon} {kitle.label}
                </button>
              ))}
            </div>
          </div>

          {/* Poster Boyutu */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Poster Boyutu
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "a4", label: "A4" },
                { id: "a3", label: "A3" },
                { id: "sosyal", label: "Sosyal Medya" },
              ].map((boyut) => (
                <button
                  key={boyut.id}
                  onClick={() => setPosterBoyutu(boyut.id)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-bold transition ${
                    posterBoyutu === boyut.id
                      ? "border-pink-500 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
                      : "border-[var(--color-border)] text-[var(--color-text)] hover:border-pink-300"
                  }`}
                >
                  {boyut.label}
                </button>
              ))}
            </div>
            {posterBoyutu && (
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Boyut: {boyutBilgi[posterBoyutu]}
              </p>
            )}
          </div>

          {/* Renk Paleti */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Renk Paleti
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {renkPaletleri.map((palet) => (
                <button
                  key={palet.id}
                  onClick={() => setRenkPaleti(palet.id)}
                  className={`rounded-lg border-2 p-3 text-left transition ${
                    renkPaleti === palet.id
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                      : "border-[var(--color-border)] hover:border-pink-300"
                  }`}
                >
                  <div className="mb-1 flex gap-1">
                    {palet.renkler.map((renk, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-md"
                        style={{ backgroundColor: renk }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-[var(--color-text)]">
                    {palet.ad}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {palet.aciklama}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Başlık Metni */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Başlık Metni
            </label>
            <input
              type="text"
              value={baslikMetni}
              onChange={(e) => setBaslikMetni(e.target.value)}
              placeholder="Örn: BİLİM ŞENLİĞİ'NE DAVETLİSİNİZ!"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
            />
          </div>

          {/* Alt Metin */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Alt Metin / Açıklama
            </label>
            <textarea
              value={altMetin}
              onChange={(e) => setAltMetin(e.target.value)}
              placeholder="Tarih, saat, yer ve diğer detaylar..."
              rows={2}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
            />
          </div>

          {/* Görsel Prompt */}
          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              YZ Görsel Promptu
            </label>
            <p className="mb-1 text-xs text-[var(--color-text-secondary)]">
              Canva Magic Media veya başka bir YZ aracına yazmak için görsel
              açıklaması hazırla:
            </p>
            <textarea
              value={gorselPrompt}
              onChange={(e) => setGorselPrompt(e.target.value)}
              placeholder="Örn: Renkli deney tüpleri ve mikroskoplarla dolu bir laboratuvar, karikatür tarzında, parlak renkler"
              rows={3}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
            />
          </div>
        </div>

        {/* Sağ: Poster Önizleme */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[var(--color-text)]">
            Poster Plan Önizleme
          </h4>
          <div
            className="flex flex-col items-center justify-between overflow-hidden rounded-xl border-2 border-dashed border-[var(--color-border)] p-6"
            style={{
              minHeight: posterBoyutu === "sosyal" ? 320 : 400,
              backgroundColor: seciliPalet
                ? seciliPalet.renkler[0] + "15"
                : "var(--color-bg-secondary)",
            }}
          >
            {/* Üst kısım: Başlık */}
            <div className="w-full text-center">
              <h3
                className="mb-2 text-lg font-black sm:text-xl"
                style={{
                  color: seciliPalet
                    ? seciliPalet.renkler[0]
                    : "var(--color-text)",
                }}
              >
                {baslikMetni || "Başlık Metni"}
              </h3>
              {seciliPalet && (
                <div
                  className="mx-auto mb-3 h-1 w-16 rounded-full"
                  style={{ backgroundColor: seciliPalet.renkler[1] }}
                />
              )}
            </div>

            {/* Orta: Görsel alanı */}
            <div
              className="my-4 flex w-full flex-1 items-center justify-center rounded-lg border-2 border-dashed p-4"
              style={{
                borderColor: seciliPalet
                  ? seciliPalet.renkler[2]
                  : "var(--color-border)",
              }}
            >
              <div className="text-center">
                <span className="text-3xl">🖼️</span>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {gorselPrompt
                    ? gorselPrompt.slice(0, 60) +
                      (gorselPrompt.length > 60 ? "..." : "")
                    : "YZ Görseli Alanı"}
                </p>
              </div>
            </div>

            {/* Alt kısım: Alt metin */}
            <div className="w-full text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {altMetin || "Detay bilgiler burada görünecek"}
              </p>
              {etkinlikAdi && (
                <p
                  className="mt-2 text-xs font-bold"
                  style={{
                    color: seciliPalet
                      ? seciliPalet.renkler[3]
                      : "var(--color-text-secondary)",
                  }}
                >
                  {etkinlikAdi}
                </p>
              )}
            </div>
          </div>

          {/* Bilgi kutusu */}
          {seciliPalet && (
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-sm">🎨</span>
              <span className="text-xs text-[var(--color-text-secondary)]">
                Palet: {seciliPalet.ad} - {seciliPalet.aciklama}
              </span>
            </div>
          )}

          {/* Canva butonu */}
          {formDolu && (
            <a
              href="https://www.canva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-bold text-white transition hover:from-purple-600 hover:to-pink-600"
            >
              Canva&apos;da Oluştur ↗
            </a>
          )}

          {/* Sıfırla */}
          <button
            onClick={sifirla}
            className="w-full rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:opacity-80"
          >
            Formu Temizle
          </button>
        </div>
      </div>
    </div>
  );
}
