"use client";

import { useState } from "react";

const senaryolar = [
  { senaryo: "Öğrenci ödevini tamamen ChatGPT'ye yazdırıp kendi yazdığını söylüyor", emoji: "📝", dogru: "degil", aciklama: "Bu bir dürüstlük ihlalidir. YZ'yi öğrenme aracı olarak kullanmak farklıdır; ama ödevi tamamen yazdırıp sahiplenmek akademik sahtekarlıktır." },
  { senaryo: "Doktor, YZ'nin önerdiği teşhisi kontrol edip hastaya açıklıyor", emoji: "🏥", dogru: "etik", aciklama: "Harika bir kullanım! Doktor YZ'yi yardımcı araç olarak kullanıyor ama son kararı kendisi veriyor ve şeffaf davranıyor." },
  { senaryo: "Birinin fotoğrafını izinsiz alıp YZ ile değiştirip paylaşmak", emoji: "📸", dogru: "degil", aciklama: "Kişisel verilerin izinsiz kullanımı ve manipülasyonu hem etik dışıdır hem de yasal sorunlara yol açabilir." },
  { senaryo: "Sanatçı, YZ'den ilham alıp kendi özgün eserini oluşturuyor", emoji: "🎨", dogru: "etik", aciklama: "YZ'yi yaratıcı süreçte ilham kaynağı olarak kullanmak sorun değil. Sanatçı kendi yorumunu katıyor." },
  { senaryo: "Haber sitesi, YZ'nin yazdığı haberi kontrol etmeden yayınlıyor", emoji: "📰", dogru: "degil", aciklama: "YZ halüsinasyon yapabilir — yanlış bilgi üretebilir. İnsan editör kontrolü olmadan yayınlamak tehlikelidir." },
  { senaryo: "Araştırmacı, YZ ile veri analizi yapıp sonuçları doğruluyor", emoji: "🔍", dogru: "etik", aciklama: "Bilimsel süreçte YZ'yi araç olarak kullanmak ve sonuçları doğrulamak sorumlu bir yaklaşımdır." },
  { senaryo: "Ünlü birinin sesini taklit eden YZ ile sahte mesaj oluşturmak", emoji: "🎭", dogru: "degil", aciklama: "Deepfake ses ile sahte içerik oluşturmak, kişinin itibarını zedeleyebilir ve yanlış bilgi yayabilir." },
  { senaryo: "Çiftçi, YZ ile hava durumu analizi yapıp ekim planı oluşturuyor", emoji: "🌾", dogru: "etik", aciklama: "YZ'nin tarımda kullanımı — verimlilik artırır, israfı azaltır, çevreye fayda sağlar." },
];

export default function EtikPusula() {
  const [index, setIndex] = useState(0);
  const [skor, setSkor] = useState(0);
  const [cevaplandi, setCevaplandi] = useState(false);
  const [sonCevap, setSonCevap] = useState<boolean | null>(null);
  const [bitti, setBitti] = useState(false);

  function cevapVer(secim: string) {
    if (cevaplandi) return;
    const dogru = secim === senaryolar[index].dogru;
    if (dogru) setSkor(skor + 1);
    setSonCevap(dogru);
    setCevaplandi(true);
  }

  function sonraki() {
    if (index + 1 >= senaryolar.length) {
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
    const rozet = skor >= 7;
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{rozet ? "⚖️" : "💪"}</div>
        <h3 className="text-2xl font-bold mb-2">
          {rozet ? "Etik Farkındalık Yüksek!" : "İyi Bir Başlangıç!"}
        </h3>
        <p className="text-lg mb-4">
          <span className="font-bold text-amber-600">{skor}</span> / {senaryolar.length} doğru
        </p>
        {rozet && (
          <div className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-bold text-white mb-4">
            ⚖️ Etik Lider Rozeti!
          </div>
        )}
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 text-left text-sm mb-6">
          <p className="font-bold mb-2">5 Temel YZ Etik İlkesi:</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {["🔍 Şeffaflık", "⚖️ Adalet", "🔒 Gizlilik", "🛡️ Güvenlik", "📋 Sorumluluk"].map((i) => (
              <span key={i} className="rounded-lg bg-white dark:bg-gray-800 px-2 py-1 text-center text-xs font-medium">{i}</span>
            ))}
          </div>
        </div>
        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-amber-500 px-8 py-3 font-bold text-white hover:bg-amber-600 transition">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  const s = senaryolar[index];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">⚖️ Etik Pusula</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          {index + 1} / {senaryolar.length}
        </span>
      </div>

      <div className="mb-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-amber-500 transition-all" style={{ width: `${(index / senaryolar.length) * 100}%` }} />
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 text-center mb-4">
        <div className="text-5xl mb-3">{s.emoji}</div>
        <p className="text-lg font-bold">&ldquo;{s.senaryo}&rdquo;</p>
      </div>

      <p className="text-sm text-center text-[var(--color-text-secondary)] mb-3">Bu durum etik mi?</p>

      {!cevaplandi ? (
        <div className="flex gap-3 justify-center">
          <button onClick={() => cevapVer("etik")} className="cursor-pointer flex-1 rounded-xl border-2 border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 p-4 text-center font-bold hover:bg-emerald-100 transition">
            <span className="text-2xl block mb-1">✅</span>
            Etik
          </button>
          <button onClick={() => cevapVer("degil")} className="cursor-pointer flex-1 rounded-xl border-2 border-rose-300 bg-rose-50 dark:bg-rose-900/20 p-4 text-center font-bold hover:bg-rose-100 transition">
            <span className="text-2xl block mb-1">❌</span>
            Etik Değil
          </button>
        </div>
      ) : (
        <div>
          <div className={`rounded-xl p-4 mb-3 ${sonCevap ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-amber-50 dark:bg-amber-900/20"}`}>
            <p className="font-bold mb-1">{sonCevap ? "✅ Harika düşünce!" : "🤔 Bir daha düşün..."}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{s.aciklama}</p>
          </div>
          <button onClick={sonraki} className="cursor-pointer rounded-xl bg-amber-500 px-8 py-2.5 font-bold text-white hover:bg-amber-600 transition">
            {index + 1 < senaryolar.length ? "Sonraki →" : "Sonuçları Gör"}
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
        Skor: <span className="font-bold text-amber-600">{skor}</span>
      </div>
    </div>
  );
}
