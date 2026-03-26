"use client";

import { useState } from "react";

interface Kart {
  ad: string;
  aciklama: string;
  yzMi: boolean;
  neden: string;
}

const kartlar: Kart[] = [
  { ad: "Hesap makinesi", aciklama: "Girdiğin sayılarla toplama, çıkarma, çarpma, bölme yapar.", yzMi: false, neden: "Hesap makinesi sabit formüllerle çalışır, öğrenme yeteneği yoktur. Programlandığı işlemleri yapar." },
  { ad: "Siri sesli asistan", aciklama: "Konuştuğunda seni anlayıp yanıt verir, müzik çalar, hatırlatıcı kurar.", yzMi: true, neden: "Siri, doğal dil işleme ve makine öğrenimi kullanarak konuşmayı anlar ve en uygun yanıtı üretir." },
  { ad: "Elektrik anahtarı", aciklama: "Bastığında ışık yanar, tekrar bastığında söner.", yzMi: false, neden: "Basit bir mekanik/elektrik devresidir. Karar verme veya öğrenme yeteneği yoktur." },
  { ad: "Film platformu önerisi", aciklama: "İzleme geçmişine göre sevebileceğin filmler önerir.", yzMi: true, neden: "Film platformları, makine öğrenimi algoritmaları ile izleme alışkanlıklarını analiz eder ve kişiselleştirilmiş öneriler sunar." },
  { ad: "Buzdolabı (normal)", aciklama: "İçindekileri soğuk tutar, sıcaklığı ayarlanabilir.", yzMi: false, neden: "Normal buzdolabı termostat ile çalışır. Sabit sıcaklık değerine göre soğutmayı açar/kapatır, öğrenmez." },
  { ad: "Spam filtresi (e-posta)", aciklama: "İstenmeyen e-postaları otomatik olarak algılayıp ayrı klasöre taşır.", yzMi: true, neden: "Spam filtreleri, binlerce e-postadan öğrenerek yeni spam mesajları tanımlar. Sürekli güncellenir." },
  { ad: "Çalar saat", aciklama: "Ayarladığın saatte alarm çalar.", yzMi: false, neden: "Çalar saat basit bir zamanlayıcıdır. Belirlenen zamanda ses çalar, başka bir şey yapmaz." },
  { ad: "Yüz tanıma ile telefon açma", aciklama: "Yüzünü tanıyarak telefonun kilidini açar.", yzMi: true, neden: "Yüz tanıma, derin öğrenme ile yüzündeki özellikleri analiz eder ve seni diğer kişilerden ayırt eder." },
  { ad: "Fotokopi makinesi", aciklama: "Bir kağıdın birebir kopyasını çıkarır.", yzMi: false, neden: "Fotokopi makinesi optik tarama ve yazdırma yapar. Görüntüyü anlamaz, sadece kopyalar." },
  { ad: "Google Translate (çeviri)", aciklama: "Bir dildeki metni başka bir dile çevirir.", yzMi: true, neden: "Google Translate, sinir ağları kullanarak dillerin yapısını öğrenir ve bağlama uygun çeviriler üretir." },
  { ad: "Otomatik kapı (sensörlü)", aciklama: "Yaklaştığında kapı otomatik açılır.", yzMi: false, neden: "Hareket sensörü ile çalışır. Kimin geldiğini anlamaz, sadece hareket algılar ve kapıyı açar." },
  { ad: "Otonom (sürücüsüz) araç", aciklama: "Şoför olmadan trafik kurallarına uyarak kendi kendine gider.", yzMi: true, neden: "Otonom araçlar bilgisayar görüsü, derin öğrenme ve sensör füzyonu kullanarak çevreyi algılar ve karar verir." },
];

const rozetler = [
  { min: 0, ad: "Acemi Kaşif", emoji: "🌱" },
  { min: 4, ad: "Meraklı Araştırmacı", emoji: "🔍" },
  { min: 8, ad: "YZ Uzmanı", emoji: "🧠" },
  { min: 10, ad: "Süper Dedektif", emoji: "🏆" },
  { min: 12, ad: "YZ Şampiyonu", emoji: "🥇" },
];

export default function YzVeyaDegil() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [puan, setPuan] = useState(0);
  const [cevapVerildi, setCevapVerildi] = useState(false);
  const [dogruMu, setDogruMu] = useState(false);
  const [bitti, setBitti] = useState(false);

  const kart = kartlar[mevcutIndex];

  const cevapVer = (secim: boolean) => {
    if (cevapVerildi) return;
    const dogru = secim === kart.yzMi;
    setDogruMu(dogru);
    if (dogru) setPuan((p) => p + 1);
    setCevapVerildi(true);
  };

  const sonraki = () => {
    if (mevcutIndex + 1 >= kartlar.length) {
      setBitti(true);
    } else {
      setMevcutIndex((i) => i + 1);
      setCevapVerildi(false);
      setDogruMu(false);
    }
  };

  const yenidenBasla = () => {
    setMevcutIndex(0);
    setPuan(0);
    setCevapVerildi(false);
    setDogruMu(false);
    setBitti(false);
  };

  const rozet = [...rozetler].reverse().find((r) => puan >= r.min) || rozetler[0];

  if (bitti) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <h3 className="mb-2 text-2xl font-bold">🎮 Oyun Bitti!</h3>
        <div className="my-6">
          <span className="text-6xl">{rozet.emoji}</span>
          <p className="mt-3 text-xl font-bold">{rozet.ad}</p>
          <p className="mt-1 text-lg">
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{puan}</span>
            <span className="text-[var(--color-text-secondary)]">/{kartlar.length} doğru</span>
          </p>
        </div>
        {puan === kartlar.length ? (
          <p className="mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Mükemmel! Tüm soruları doğru bildin! 🎉
          </p>
        ) : (
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            {puan >= 10 ? "Harika iş!" : puan >= 7 ? "İyi gidiyorsun, biraz daha pratik yap!" : "Tekrar deneyerek gelişebilirsin!"}
          </p>
        )}
        <button
          onClick={yenidenBasla}
          className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">🤖 YZ veya Değil?</h3>
        <span className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-sm font-medium">
          {mevcutIndex + 1}/{kartlar.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500 transition-all duration-300"
          style={{ width: `${((mevcutIndex + (cevapVerildi ? 1 : 0)) / kartlar.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-center">
        <p className="text-lg font-bold">{kart.ad}</p>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{kart.aciklama}</p>
      </div>

      {/* Buttons */}
      {!cevapVerildi ? (
        <div className="flex gap-3">
          <button
            onClick={() => cevapVer(true)}
            className="flex-1 rounded-xl border-2 border-blue-300 bg-blue-50 px-4 py-3 font-bold text-blue-700 transition hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            🤖 Yapay Zeka
          </button>
          <button
            onClick={() => cevapVer(false)}
            className="flex-1 rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700/50"
          >
            ⚙️ Yapay Zeka Değil
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className={`rounded-xl border-2 p-4 ${
              dogruMu
                ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
                : "border-rose-400 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20"
            }`}
          >
            <p className="font-bold">
              {dogruMu ? "✅ Doğru!" : "❌ Yanlış!"}
              {" "}
              <span className="font-normal text-[var(--color-text-secondary)]">
                {kart.yzMi ? "Bu bir YZ uygulamasıdır." : "Bu bir YZ uygulaması değildir."}
              </span>
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{kart.neden}</p>
          </div>
          <button
            onClick={sonraki}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-bold text-white transition hover:bg-violet-700"
          >
            {mevcutIndex + 1 < kartlar.length ? "Sonraki Soru →" : "Sonuçları Gör"}
          </button>
        </div>
      )}

      {/* Score */}
      <div className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
        Puan: <span className="font-bold text-emerald-600 dark:text-emerald-400">{puan}</span>
      </div>
    </div>
  );
}
