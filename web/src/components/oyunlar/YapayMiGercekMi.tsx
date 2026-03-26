"use client";

import { useState } from "react";

const kartlar = [
  { aciklama: "Bir kedinin uzayda pizza yemesi", emoji: "🐱🍕🚀", cevap: "yapay", ipucu: "Gerçek hayatta kediler uzayda pizza yiyemez! Bu tür fantastik görseller genellikle YZ tarafından üretilir." },
  { aciklama: "Doğal bir manzara fotoğrafı", emoji: "🏞️📷", cevap: "gercek", ipucu: "Doğal manzaralar genellikle gerçek fotoğraflardır. YZ üretimi manzaralarda detaylarda tutarsızlıklar olabilir." },
  { aciklama: "6 parmaklı bir el çizimi", emoji: "✋❓", cevap: "yapay", ipucu: "YZ'nin en bilinen hatalarından biri! Parmak sayısı, el yapısı ve eklem detaylarında sık hata yapar." },
  { aciklama: "Gazetedeki haber fotoğrafı", emoji: "📰📸", cevap: "gercek", ipucu: "Gazete fotoğrafları profesyonel fotoğrafçılar tarafından çekilir ve editörler tarafından kontrol edilir." },
  { aciklama: "Konuşan köpek videosu (insan sesi ile)", emoji: "🐕🗣️", cevap: "yapay", ipucu: "Deepfake teknolojisi! Hayvanların ağız hareketleri değiştirilerek insan sesi eklenmiş." },
  { aciklama: "Müzedeki yağlı boya tablo", emoji: "🖼️🎨", cevap: "gercek", ipucu: "Müzelerdeki tablolar gerçek sanatçıların eserleridir. Fırça darbeleri ve doku YZ'de taklit edilmesi zor detaylardır." },
  { aciklama: "Ünlü birinin hiç söylemediği sözleri söylediği video", emoji: "🎭🎬", cevap: "yapay", ipucu: "Deepfake! Yüz ifadeleri ve dudak hareketleri YZ ile manipüle edilmiş. Kaynağı her zaman kontrol et!" },
  { aciklama: "Cep telefonuyla çekilmiş selfie", emoji: "🤳📱", cevap: "gercek", ipucu: "Normal selfie'ler gerçek fotoğraflardır. YZ selfie'leri genellikle çok 'mükemmel' görünür." },
  { aciklama: "Var olmayan bir şehrin kuşbakışı fotoğrafı", emoji: "🏙️🦅", cevap: "yapay", ipucu: "YZ, hiç var olmayan mekanları gerçekçi şekilde üretebilir. Binalar, yollar gerçekçi ama haritada bulamazsın!" },
  { aciklama: "El yazısıyla yazılmış mektup", emoji: "✉️✍️", cevap: "gercek", ipucu: "El yazısı, kişiye özgü düzensizlikler içerir. YZ el yazısı genellikle çok düzgün veya tutarsız olur." },
];

export default function YapayMiGercekMi() {
  const [index, setIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [cevaplandi, setCevaplandi] = useState(false);
  const [sonCevap, setSonCevap] = useState<boolean | null>(null);
  const [bitti, setBitti] = useState(false);

  function cevapVer(secim: "yapay" | "gercek") {
    if (cevaplandi) return;
    const dogru = secim === kartlar[index].cevap;
    if (dogru) setSkor(skor + 1);
    setSonCevap(dogru);
    setCevaplandi(true);
  }

  function sonraki() {
    if (index + 1 >= kartlar.length) {
      setBitti(true);
    } else {
      setIndex(index + 1);
      setCevaplandi(false);
      setSonCevap(null);
    }
  }

  function sifirla() {
    setIndex(0);
    setSkor(0);
    setCevaplandi(false);
    setSonCevap(null);
    setBitti(false);
  }

  if (bitti) {
    const rozet = skor >= 8;
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{rozet ? "🕵️" : "👏"}</div>
        <h3 className="text-2xl font-bold mb-2">
          {rozet ? "Dijital Dedektif!" : "İyi Deneme!"}
        </h3>
        <p className="text-lg mb-2">
          <span className="font-bold text-rose-600">{skor}</span> / {kartlar.length} doğru
        </p>
        {rozet && (
          <div className="inline-block rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1.5 text-sm font-bold text-white mb-4">
            🕵️ Dijital Dedektif Rozeti!
          </div>
        )}
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 text-left text-sm mb-6">
          <p className="font-bold mb-2">🔍 YZ İçeriğini Tespit Etme İpuçları:</p>
          <ul className="space-y-1 text-[var(--color-text-secondary)]">
            <li>- Parmak sayısı ve el yapısını kontrol et</li>
            <li>- Arka plandaki yazılar genellikle anlamsızdır</li>
            <li>- Yüz simetrisi aşırı mükemmel olabilir</li>
            <li>- Kaynağı ve orijinal yayıncıyı araştır</li>
            <li>- &ldquo;Çok iyi, gerçek olamaz&rdquo; hissi önemli bir ipucu!</li>
          </ul>
        </div>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-rose-500 px-8 py-3 font-bold text-white hover:bg-rose-600 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  const kart = kartlar[index];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🎨 Yapay mı Gerçek mi?</h3>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
          {index + 1} / {kartlar.length}
        </span>
      </div>

      <div className="mb-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-rose-500 transition-all" style={{ width: `${(index / kartlar.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 text-center mb-4">
        <div className="text-5xl mb-4">{kart.emoji}</div>
        <p className="text-lg font-bold">&ldquo;{kart.aciklama}&rdquo;</p>
      </div>

      {/* Buttons */}
      {!cevaplandi ? (
        <div className="flex gap-3 justify-center">
          <button onClick={() => cevapVer("yapay")} className="cursor-pointer flex-1 rounded-xl border-2 border-violet-300 bg-violet-50 dark:bg-violet-900/20 p-4 text-center font-bold hover:bg-violet-100 dark:hover:bg-violet-900/30 transition">
            <span className="text-2xl block mb-1">🤖</span>
            Yapay Zeka
          </button>
          <button onClick={() => cevapVer("gercek")} className="cursor-pointer flex-1 rounded-xl border-2 border-sky-300 bg-sky-50 dark:bg-sky-900/20 p-4 text-center font-bold hover:bg-sky-100 dark:hover:bg-sky-900/30 transition">
            <span className="text-2xl block mb-1">👤</span>
            İnsan
          </button>
        </div>
      ) : (
        <div>
          <div className={`rounded-xl p-4 mb-3 ${sonCevap ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-rose-50 dark:bg-rose-900/20"}`}>
            <p className="font-bold mb-1">
              {sonCevap ? "✅ Doğru!" : "❌ Yanlış!"}
              {" "}Bu içerik {kart.cevap === "yapay" ? "🤖 Yapay Zeka üretimi" : "👤 İnsan yapımı"}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">{kart.ipucu}</p>
          </div>
          <button onClick={sonraki} className="cursor-pointer rounded-xl bg-rose-500 px-8 py-2.5 font-bold text-white hover:bg-rose-600 transition">
            {index + 1 < kartlar.length ? "Sonraki →" : "Sonuçları Gör"}
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
        Skor: <span className="font-bold text-rose-600">{skor}</span>
      </div>
    </div>
  );
}
