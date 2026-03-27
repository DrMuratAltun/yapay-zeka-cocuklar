"use client";

import { useState } from "react";

interface OrnekGorsel {
  id: number;
  emoji: string;
  aciklama: string;
  prompt: string;
  stil: string;
}

interface Gorev {
  id: number;
  baslik: string;
  aciklama: string;
  ipucu: string;
}

const ornekler: OrnekGorsel[] = [
  {
    id: 1,
    emoji: "🏔️🌅🦅",
    aciklama: "Günbatımında karlı dağların üzerinde süzülen bir kartal",
    prompt: "Karlı dağ zirvelerinin üzerinde günbatımında süzülen bir kartal, altın ve turuncu tonlarında gökyüzü, dramatik bulutlar, sinematik kompozisyon, 4K kalitede fotogerçekçi",
    stil: "Fotogerçekçi",
  },
  {
    id: 2,
    emoji: "🤖🎨🖌️",
    aciklama: "Atölyesinde resim yapan sevimli bir robot",
    prompt: "Renkli bir sanat atölyesinde tuval üzerine resim yapan sevimli küçük bir robot, sıcak aydınlatma, boya sıçramış zemin, Pixar animasyon tarzında, detaylı 3D render",
    stil: "3D Animasyon",
  },
  {
    id: 3,
    emoji: "🏙️🌃✨",
    aciklama: "Neon ışıklarıyla parlayan fütüristik bir şehir",
    prompt: "Geceleri neon ışıklarıyla parlayan fütüristik bir şehir manzarası, uçan arabalar, holografik reklam panoları, yağmurlu hava, cyberpunk tarzında, geniş açı çekim",
    stil: "Cyberpunk",
  },
  {
    id: 4,
    emoji: "🐱📖☕",
    aciklama: "Kütüphanede kitap okuyan gözlüklü bir kedi",
    prompt: "Rahat bir kütüphanede gözlükleriyle kitap okuyan turuncu bir kedi, yanında buğulu bir çay fincanı, mum ışığı, sulu boya tarzında, sıcak renkler, detaylı illüstrasyon",
    stil: "Sulu Boya",
  },
  {
    id: 5,
    emoji: "🌊🐢🐠",
    aciklama: "Mercan resifinde yüzen bir deniz kaplumbağası",
    prompt: "Canlı renkli mercan resifinde yüzen büyük bir deniz kaplumbağası, etrafında tropik balıklar, su altı ışık huzmesi, National Geographic fotoğraf tarzında, ultra detaylı",
    stil: "Doğa Fotoğrafçılığı",
  },
  {
    id: 6,
    emoji: "🏰🐉🌙",
    aciklama: "Ay ışığında kaleyi koruyan ejderha",
    prompt: "Ay ışığında ortaçağ kalesinin üzerinde nöbet tutan görkemli bir ejderha, kanatları açık, ağzından hafif duman çıkıyor, fantastik dijital sanat, epik atmosfer, detaylı",
    stil: "Fantastik Sanat",
  },
];

const gorevler: Gorev[] = [
  {
    id: 1,
    baslik: "Uzay Maceracısı",
    aciklama: "Mars yüzeyinde keşif yapan bir astronotu hayal et. Çevreyi, giysileri, atmosferi detaylı anlat.",
    ipucu: "Konu, ortam, ışık, stil ve kalite anahtar kelimelerini kullan.",
  },
  {
    id: 2,
    baslik: "Doğa ile Teknoloji",
    aciklama: "Doğanın içinde büyüyen bir teknolojik yapıyı hayal et. Ağaçlarla iç içe geçmiş bir bina olabilir.",
    ipucu: "Zıtlıkları birleştir: organik + mekanik, yeşil + metalik.",
  },
  {
    id: 3,
    baslik: "Rüya Dünyası",
    aciklama: "Fizik kurallarının geçerli olmadığı bir dünya hayal et. Uçan adalar, ters akan şelaleler...",
    ipucu: "Sürrealist tarz belirt. Salvador Dali veya René Magritte referansı verebilirsin.",
  },
];

interface Degerlendirme {
  detay: number;
  stil: number;
  kompozisyon: number;
}

export default function PromptGalerisi() {
  const [aktifTab, setAktifTab] = useState<"galeri" | "gorev">("galeri");
  const [seciliOrnek, setSeciliOrnek] = useState(0);
  const [promptGoster, setPromptGoster] = useState<Record<number, boolean>>({});
  const [gorevPromptlari, setGorevPromptlari] = useState<Record<number, string>>({});
  const [degerlendirmeler, setDegerlendirmeler] = useState<Record<number, Degerlendirme>>({});
  const [gonderilen, setGonderilen] = useState<number[]>([]);

  const handleDegerlendir = (gorevId: number) => {
    const prompt = gorevPromptlari[gorevId] || "";
    if (prompt.trim().length < 10) return;

    const kelimeSayisi = prompt.trim().split(/\s+/).length;
    const stilVar = /tarz|stil|render|kalite|anime|sulu boya|dijital|pixel|3d|fotoğraf|illüstrasyon|sinematik/i.test(prompt);
    const kompozisyonVar = /açı|perspektif|ön plan|arka plan|yakın çekim|geniş|detaylı|dramatik|sıcak|soğuk|ışık|aydınlatma|renk/i.test(prompt);

    const detay = Math.min(5, Math.max(1, Math.floor(kelimeSayisi / 5)));
    const stil = stilVar ? Math.min(5, detay + 1) : Math.max(1, detay - 1);
    const kompozisyon = kompozisyonVar ? Math.min(5, detay + 1) : Math.max(1, detay - 1);

    setDegerlendirmeler((prev) => ({
      ...prev,
      [gorevId]: { detay, stil, kompozisyon },
    }));
    setGonderilen((prev) => [...new Set([...prev, gorevId])]);
  };

  const yildizlar = (puan: number) => "★".repeat(puan) + "☆".repeat(5 - puan);

  return (
    <div className="space-y-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> YZ ile Görüntü Üretimi Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          DALL-E, Midjourney ve Stable Diffusion gibi yapay zeka modelleri, metin açıklamalarından (prompt) görüntüler üretebilir. Ne kadar detaylı ve açık bir prompt yazarsan, üretilen görsel o kadar istediğin gibi olur. Bu teknoloji, sanat, tasarım ve eğitimde devrim yaratıyor.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-extrabold">Görüntü Prompt Galerisi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Etkili prompt yazma tekniklerini öğren ve kendi promptlarını yaz!
        </p>
      </div>

      {/* Tab Seçimi */}
      <div className="flex rounded-xl bg-[var(--color-bg-secondary)] p-1">
        <button
          onClick={() => setAktifTab("galeri")}
          className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
            aktifTab === "galeri" ? "bg-rose-500 text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
          }`}
        >
          Galeri ve Promptlar
        </button>
        <button
          onClick={() => setAktifTab("gorev")}
          className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
            aktifTab === "gorev" ? "bg-rose-500 text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
          }`}
        >
          Prompt Yazma Görevleri
        </button>
      </div>

      {aktifTab === "galeri" && (
        <div className="space-y-4">
          {/* Görsel Grid */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ornekler.map((o, i) => (
              <button
                key={o.id}
                onClick={() => setSeciliOrnek(i)}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-center transition ${
                  seciliOrnek === i
                    ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200 dark:bg-rose-900/20 dark:ring-rose-800"
                    : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-rose-300"
                }`}
              >
                <span className="text-3xl">{o.emoji}</span>
                <span className="mt-1 text-[10px] text-[var(--color-text-secondary)]">{o.stil}</span>
              </button>
            ))}
          </div>

          {/* Seçili Görsel Detay */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-800 dark:bg-rose-900/10">
            <div className="flex items-start gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white text-5xl shadow-sm dark:bg-white/10">
                {ornekler[seciliOrnek].emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold">{ornekler[seciliOrnek].aciklama}</h4>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                    {ornekler[seciliOrnek].stil}
                  </span>
                </div>

                <button
                  onClick={() => setPromptGoster((p) => ({ ...p, [seciliOrnek]: !p[seciliOrnek] }))}
                  className="mt-2 text-sm font-medium text-rose-600 underline dark:text-rose-400"
                >
                  {promptGoster[seciliOrnek] ? "Promptu Gizle" : "Promptu Göster"}
                </button>

                {promptGoster[seciliOrnek] && (
                  <div className="mt-2 rounded-lg bg-white/70 p-3 text-sm dark:bg-white/5">
                    <p className="font-mono text-xs text-[var(--color-text-secondary)]">
                      &quot;{ornekler[seciliOrnek].prompt}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prompt Yapısı İpuçları */}
          <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
            <h4 className="mb-2 font-bold text-sky-700 dark:text-sky-300">Etkili Prompt Formülü:</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong>Konu</strong> + <strong>Detaylar</strong> + <strong>Ortam</strong> + <strong>Stil</strong> + <strong>Kalite</strong>
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Örnek: &quot;Karlı dağ&quot; + &quot;günbatımı, kartal&quot; + &quot;açık hava&quot; + &quot;sinematik&quot; + &quot;4K&quot;
            </p>
          </div>
        </div>
      )}

      {aktifTab === "gorev" && (
        <div className="space-y-4">
          {gorevler.map((g) => (
            <div key={g.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">{g.id}</span>
                <h4 className="font-bold">{g.baslik}</h4>
              </div>
              <p className="mb-2 text-sm text-[var(--color-text-secondary)]">{g.aciklama}</p>
              <div className="mb-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                💡 İpucu: {g.ipucu}
              </div>

              <textarea
                value={gorevPromptlari[g.id] || ""}
                onChange={(e) => setGorevPromptlari((p) => ({ ...p, [g.id]: e.target.value }))}
                placeholder="Promptunu buraya yaz..."
                rows={3}
                disabled={gonderilen.includes(g.id)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-sm transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:opacity-60 dark:focus:ring-rose-800"
              />

              {!gonderilen.includes(g.id) ? (
                <button
                  onClick={() => handleDegerlendir(g.id)}
                  disabled={(gorevPromptlari[g.id] || "").trim().length < 10}
                  className="mt-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Değerlendir
                </button>
              ) : (
                <div className="mt-3 rounded-xl bg-white/70 p-4 dark:bg-white/5">
                  <h5 className="mb-2 text-sm font-bold">Prompt Değerlendirmesi:</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Detay Seviyesi:</span>
                      <span className="font-mono text-amber-500">{yildizlar(degerlendirmeler[g.id].detay)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Stil Belirtimi:</span>
                      <span className="font-mono text-amber-500">{yildizlar(degerlendirmeler[g.id].stil)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kompozisyon:</span>
                      <span className="font-mono text-amber-500">{yildizlar(degerlendirmeler[g.id].kompozisyon)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    {degerlendirmeler[g.id].detay >= 4
                      ? "Harika! Çok detaylı ve etkili bir prompt yazdın!"
                      : degerlendirmeler[g.id].detay >= 2
                        ? "İyi başlangıç! Daha fazla detay, stil ve kompozisyon bilgisi ekleyerek promptunu güçlendirebilirsin."
                        : "Promptunu daha detaylı yaz. Ortam, stil, renk ve kalite anahtar kelimeleri ekle."}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
