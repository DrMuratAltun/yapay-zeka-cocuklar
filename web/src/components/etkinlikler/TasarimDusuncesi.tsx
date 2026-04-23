"use client";

import { useState } from "react";

interface Adim {
  baslik: string;
  emoji: string;
  aciklama: string;
  yardimciSoru: string;
  ornekCevap: string;
  renk: string;
}

const adimlar: Adim[] = [
  {
    baslik: "Empati",
    emoji: "\uD83D\uDC9C",
    aciklama: "Kullanıcıların sorunlarını anla. Onların yerine koy kendini!",
    yardimciSoru: "Bu sorunu yaşamış birisiyle konuşsaydın, sana ne anlatırdı? Neler hisseder, nelerden şikâyet eder?",
    ornekCevap: "Öğrenciler yemekhane kuyruklarında çok bekliyor. Teneffüs kısa olduğu için yemek yemeye yeterli zaman kalmıyor. Açken ders dinlemek çok zor oluyor.",
    renk: "purple",
  },
  {
    baslik: "Tanımlama",
    emoji: "\uD83C\uDFAF",
    aciklama: "Sorunu net bir şekilde tanımla. Asıl problem ne?",
    yardimciSoru: "Empatide öğrendiklerine göre, çözmen gereken asıl problem ne? Tek cümleyle yaz.",
    ornekCevap: "Yemekhane kuyruğu çok uzun olduğu için öğrenciler teneffüslerde yeterince yemek yiyemiyor ve derslere aç giriyor.",
    renk: "blue",
  },
  {
    baslik: "Fikir Üretme",
    emoji: "\uD83D\uDCA1",
    aciklama: "Olabildiğince çok fikir üret! Çılgın fikirler de olabilir!",
    yardimciSoru: "Bu problemi çözmek için aklına gelen tüm fikirleri yaz. En az 3 farklı çözüm önerisi bul!",
    ornekCevap: "1) Mobil uygulama ile önceden sipariş sistemi\n2) Farklı sınıflar için farklı yemek saatleri\n3) Yemek otomatları koymak\n4) QR kodlu hızlı ödeme sistemi\n5) Sınıf bazlı sıralama yerine rastgele kuyruk sistemi",
    renk: "yellow",
  },
  {
    baslik: "Prototip",
    emoji: "\uD83D\uDD28",
    aciklama: "En iyi fikrini seçip basit bir model/taslak oluştur!",
    yardimciSoru: "En beğendiğin fikri seç ve nasıl çalışacağını anlat. Kâğıt üzerinde bir taslak çizsen nasıl görünürdü?",
    ornekCevap: "Mobil uygulama seçiyorum: Öğrenci uygulamaya giriş yapar → Günün menüsünü görür → Yemeğini seçer → QR kod oluşur → Yemekhaneye gidince QR kodu okutup sırasız alır. Ekranda menü, seçim butonu ve QR kod alanı olacak.",
    renk: "green",
  },
  {
    baslik: "Test",
    emoji: "\uD83E\uDDEA",
    aciklama: "Prototipini test et! Geri bildirim al ve geliştir!",
    yardimciSoru: "Prototipini 3 arkadaşına göstersen, ne derlerdi? Neleri beğenir, neleri eleştirirlerdi? Nasıl geliştirebilirsin?",
    ornekCevap: "Arkadaşlarım 'İnternet olmazsa ne olacak?' dedi → Çözüm: Offline mod eklenebilir. 'Herkesin telefonu yok' dedi → Çözüm: Okul tabletleri veya kiosk ekranlar konulabilir. Menüde alerjen uyarısı da olmalı.",
    renk: "red",
  },
];

const renkSiniflari: Record<string, { bg: string; border: string; text: string; bgLight: string; gradient: string }> = {
  purple: { bg: "bg-purple-500", border: "border-purple-400", text: "text-purple-600 dark:text-purple-400", bgLight: "bg-purple-50 dark:bg-purple-900/20", gradient: "from-purple-500 to-purple-600" },
  blue: { bg: "bg-blue-500", border: "border-blue-400", text: "text-blue-600 dark:text-blue-400", bgLight: "bg-blue-50 dark:bg-blue-900/20", gradient: "from-blue-500 to-blue-600" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-400", text: "text-yellow-600 dark:text-yellow-400", bgLight: "bg-yellow-50 dark:bg-yellow-900/20", gradient: "from-yellow-500 to-yellow-600" },
  green: { bg: "bg-green-500", border: "border-green-400", text: "text-green-600 dark:text-green-400", bgLight: "bg-green-50 dark:bg-green-900/20", gradient: "from-green-500 to-green-600" },
  red: { bg: "bg-red-500", border: "border-red-400", text: "text-red-600 dark:text-red-400", bgLight: "bg-red-50 dark:bg-red-900/20", gradient: "from-red-500 to-red-600" },
};

export default function TasarimDusuncesi() {
  const [aktifAdim, setAktifAdim] = useState(0);
  const [yanitlar, setYanitlar] = useState<string[]>(Array(adimlar.length).fill(""));
  const [ornekGoster, setOrnekGoster] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);

  const adim = adimlar[aktifAdim];
  const renk = renkSiniflari[adim.renk];

  function yanitGuncelle(deger: string) {
    const yeni = [...yanitlar];
    yeni[aktifAdim] = deger;
    setYanitlar(yeni);
  }

  function ileri() {
    if (aktifAdim < adimlar.length - 1) {
      setAktifAdim(aktifAdim + 1);
      setOrnekGoster(false);
    } else {
      setTamamlandi(true);
    }
  }

  function geri() {
    if (aktifAdim > 0) {
      setAktifAdim(aktifAdim - 1);
      setOrnekGoster(false);
    }
  }

  function sifirla() {
    setAktifAdim(0);
    setYanitlar(Array(adimlar.length).fill(""));
    setOrnekGoster(false);
    setTamamlandi(false);
  }

  if (tamamlandi) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{"\uD83C\uDF1F"}</div>
          <h3 className="text-2xl font-bold mb-2">Tasarım Düşüncesi Projen Hazır!</h3>
          <p className="text-[var(--color-text-secondary)]">
            Tebrikler! 5 adımı da tamamladın. İşte projenin özeti:
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {adimlar.map((a, i) => {
            const r = renkSiniflari[a.renk];
            return (
              <div key={i} className={`rounded-xl ${r.bgLight} border ${r.border} p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{a.emoji}</span>
                  <h4 className={`font-bold ${r.text}`}>
                    {i + 1}. {a.baslik}
                  </h4>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                  {yanitlar[i] || <span className="italic text-[var(--color-text-secondary)]">(Boş bırakıldı)</span>}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-900/30 dark:to-green-900/30 p-4 mb-6">
          <p className="text-sm font-medium text-center">
            {"\uD83C\uDF93"} Tasarım Düşüncesi, dünyanın en büyük şirketlerinin (Google, Apple, IDEO) kullandığı bir yöntemdir.
            Sen de şimdi bu yöntemi öğrendin!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={sifirla}
            className="cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-green-500 px-8 py-3 font-bold text-white hover:opacity-90 transition"
          >
            {"\uD83D\uDD04"} Yeni Proje Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      {/* Başlık */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{"\uD83C\uDFA8"} Tasarım Düşüncesi Atölyesi</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Örnek problem: &quot;Okuldaki yemekhane kuyruğu çok uzun&quot;
        </p>
      </div>

      {/* Ilerleme Cubugu */}
      <div className="flex items-center justify-between mb-6 gap-1">
        {adimlar.map((a, i) => {
          const r = renkSiniflari[a.renk];
          const aktif = i === aktifAdim;
          const gecti = i < aktifAdim || (i <= aktifAdim && yanitlar[i].trim().length > 0);
          return (
            <button
              key={i}
              onClick={() => { setAktifAdim(i); setOrnekGoster(false); }}
              className={`
                cursor-pointer flex-1 flex flex-col items-center gap-1 rounded-xl p-2 transition-all border-2
                ${aktif ? `${r.bgLight} ${r.border} scale-105` : gecti ? `${r.bgLight} border-transparent opacity-80` : "bg-gray-100 dark:bg-gray-800 border-transparent opacity-50"}
              `}
            >
              <span className="text-lg">{a.emoji}</span>
              <span className={`text-[10px] sm:text-xs font-bold ${aktif ? r.text : ""}`}>{a.baslik}</span>
            </button>
          );
        })}
      </div>

      {/* Ilerleme Yuzde */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${renk.gradient} transition-all duration-500`}
          style={{ width: `${((aktifAdim + 1) / adimlar.length) * 100}%` }}
        />
      </div>

      {/* Aktif Adim */}
      <div className={`rounded-xl ${renk.bgLight} border ${renk.border} p-5 mb-4`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{adim.emoji}</span>
          <div>
            <h4 className={`text-lg font-bold ${renk.text}`}>
              Adım {aktifAdim + 1}: {adim.baslik}
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{adim.aciklama}</p>
          </div>
        </div>

        <div className="rounded-lg bg-white/60 dark:bg-gray-800/60 p-3 mb-3">
          <p className="text-sm font-medium">{"\uD83D\uDCAC"} {adim.yardimciSoru}</p>
        </div>

        <textarea
          value={yanitlar[aktifAdim]}
          onChange={(e) => yanitGuncelle(e.target.value)}
          placeholder="Fikirlerini buraya yaz..."
          rows={5}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-900 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Ornek Cevap */}
        <button
          onClick={() => setOrnekGoster(!ornekGoster)}
          className="cursor-pointer mt-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
        >
          {ornekGoster ? "\u25B2 Örneği gizle" : "\u25BC Örnek cevabı gör"}
        </button>
        {ornekGoster && (
          <div className="mt-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-dashed border-[var(--color-border)] p-3 text-xs text-[var(--color-text-secondary)] whitespace-pre-wrap">
            {"\uD83D\uDCDD"} <strong>Örnek:</strong> {adim.ornekCevap}
          </div>
        )}
      </div>

      {/* Navigasyon Butonlari */}
      <div className="flex justify-between items-center">
        <button
          onClick={geri}
          disabled={aktifAdim === 0}
          className={`cursor-pointer rounded-xl px-6 py-2.5 font-bold transition ${
            aktifAdim === 0
              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 dark:bg-gray-700 text-[var(--color-text-primary)] hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {"\u2B05\uFE0F"} Geri
        </button>

        <span className="text-sm text-[var(--color-text-secondary)]">
          {aktifAdim + 1} / {adimlar.length}
        </span>

        <button
          onClick={ileri}
          className={`cursor-pointer rounded-xl bg-gradient-to-r ${renk.gradient} px-6 py-2.5 font-bold text-white hover:opacity-90 transition`}
        >
          {aktifAdim === adimlar.length - 1 ? "Tamamla \u2705" : "İleri \u27A1\uFE0F"}
        </button>
      </div>

      {/* Sıfırlama */}
      <div className="text-center mt-4">
        <button
          onClick={sifirla}
          className="cursor-pointer text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition"
        >
          {"\uD83D\uDD04"} Tekrar Başla
        </button>
      </div>
    </div>
  );
}
