"use client";

import { useState, useCallback } from "react";

interface Senaryo {
  id: number;
  baslik: string;
  aciklama: string;
  emoji: string;
  dogruCevap: "gozetimli" | "goztimsiz" | "pekistirmeli";
  neden: string;
}

const senaryolar: Senaryo[] = [
  {
    id: 1,
    baslik: "E-posta Spam Filtresi",
    aciklama: "Binlerce e-posta 'spam' veya 'spam değil' olarak etiketlenmiş. Model bu etiketli verilerden öğrenerek yeni gelen e-postaları sınıflandırıyor.",
    emoji: "📧",
    dogruCevap: "gozetimli",
    neden: "Her e-posta için 'spam' veya 'spam değil' etiketi (doğru cevap) verilmiş. Model etiketli veriden öğreniyor.",
  },
  {
    id: 2,
    baslik: "Müşteri Grupları",
    aciklama: "Bir mağaza, müşterilerinin alışveriş verilerini analiz ediyor. Önceden tanımlanmış grup yok ama benzer alışveriş yapanları otomatik gruplara ayırıyor.",
    emoji: "🛒",
    dogruCevap: "goztimsiz",
    neden: "Önceden tanımlanmış etiket yok. Model verideki gizli grupları (kümeleri) kendisi keşfediyor.",
  },
  {
    id: 3,
    baslik: "Satranç Oynayan YZ",
    aciklama: "Bir yapay zeka, milyonlarca satranç oyunu oynayarak öğreniyor. Kazandığında ödül, kaybettiğinde ceza alıyor ve stratejisini geliştiriyor.",
    emoji: "♟️",
    dogruCevap: "pekistirmeli",
    neden: "YZ deneme-yanılma ile öğreniyor. Kazanma = ödül, kaybetme = ceza. Ödülü en yükseğe çıkarmaya çalışıyor.",
  },
  {
    id: 4,
    baslik: "Kedi-Köpek Tanıma",
    aciklama: "10.000 fotoğraf var. Her birinde 'kedi' veya 'köpek' yazıyor. Model bu fotoğrafları inceleyerek yeni fotoğraflardaki hayvanı tanıyabiliyor.",
    emoji: "🐾",
    dogruCevap: "gozetimli",
    neden: "Her fotoğrafta hayvanın ne olduğu (etiket) belirtilmiş. Model bu etiketlerle fotoğraf-hayvan ilişkisini öğreniyor.",
  },
  {
    id: 5,
    baslik: "Haber Konuları Gruplama",
    aciklama: "Bir haber sitesi binlerce haberi topluyor. Haberlerin konuları belirsiz ama sistem benzer haberleri otomatik olarak grupluyor: spor, teknoloji, sağlık gibi.",
    emoji: "📰",
    dogruCevap: "goztimsiz",
    neden: "Haberlere önceden etiket verilmemiş. Model benzer haberleri kendi başına grupluyor (kümeleme).",
  },
  {
    id: 6,
    baslik: "Robot Yürümesi",
    aciklama: "Bir robot yürümeyi öğreniyor. Düşmeden adım attığında puan kazanıyor, düştüğünde puan kaybediyor. Zamanla daha düzgün yürüyor.",
    emoji: "🤖",
    dogruCevap: "pekistirmeli",
    neden: "Robot deneme-yanılma ile öğreniyor. Başarılı adım = ödül, düşme = ceza. Deneyimleyerek gelişiyor.",
  },
  {
    id: 7,
    baslik: "Ev Fiyat Tahmini",
    aciklama: "Daha önce satılmış evlerin metrekare, oda sayısı, konum bilgisi ve satış fiyatları var. Model bu verilerden yeni evlerin fiyatını tahmin ediyor.",
    emoji: "🏠",
    dogruCevap: "gozetimli",
    neden: "Her ev için gerçek satış fiyatı (etiket) verilmiş. Model girdi-çıktı ilişkisini öğrenip tahmin yapıyor.",
  },
  {
    id: 8,
    baslik: "Otonom Araç Sürüşü",
    aciklama: "Bir otonom araç simülasyonda sürüş yapıyor. Şerit takip ettiğinde ve güvenli sürdüğünde ödül alıyor, kaza yaptığında ceza alıyor.",
    emoji: "🚗",
    dogruCevap: "pekistirmeli",
    neden: "Araç deneme-yanılma ile öğreniyor. Güvenli sürüş = ödül, kaza = ceza. Ödülü maksimize etmeye çalışıyor.",
  },
];

const ogrenimTurleri = {
  gozetimli: {
    ad: "Gözetimli Öğrenme",
    kisa: "Gözetimli",
    renk: "bg-emerald-500",
    renkHalka: "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20",
    emoji: "🏷️",
  },
  goztimsiz: {
    ad: "Gözetimsiz Öğrenme",
    kisa: "Gözetimsiz",
    renk: "bg-blue-500",
    renkHalka: "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20",
    emoji: "🔍",
  },
  pekistirmeli: {
    ad: "Pekiştirmeli Öğrenme",
    kisa: "Pekiştirmeli",
    renk: "bg-violet-500",
    renkHalka: "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-900/20",
    emoji: "🎮",
  },
};

export default function OgrenimTurleriQuiz() {
  const [aktifSoru, setAktifSoru] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, string>>({});
  const [gosterCevap, setGosterCevap] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);

  const senaryo = senaryolar[aktifSoru];
  const kullaniciCevap = cevaplar[senaryo.id];
  const dogruMu = kullaniciCevap === senaryo.dogruCevap;

  const cevapVer = useCallback(
    (cevap: string) => {
      if (gosterCevap) return;
      setCevaplar((prev) => ({ ...prev, [senaryo.id]: cevap }));
      setGosterCevap(true);
    },
    [gosterCevap, senaryo.id]
  );

  const sonrakiSoru = useCallback(() => {
    if (aktifSoru < senaryolar.length - 1) {
      setAktifSoru((prev) => prev + 1);
      setGosterCevap(false);
    } else {
      setTamamlandi(true);
    }
  }, [aktifSoru]);

  const tekrarBasla = useCallback(() => {
    setAktifSoru(0);
    setCevaplar({});
    setGosterCevap(false);
    setTamamlandi(false);
  }, []);

  const toplamDogru = senaryolar.filter((s) => cevaplar[s.id] === s.dogruCevap).length;
  const basariYuzdesi = Math.round((toplamDogru / senaryolar.length) * 100);

  if (tamamlandi) {
    return (
      <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold">🏆 Quiz Tamamlandı!</h3>
          <div className="mt-4 text-5xl font-extrabold text-orange-600 dark:text-orange-400">
            {toplamDogru} / {senaryolar.length}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">doğru cevap</p>
          <div className="mx-auto mt-3 h-4 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                basariYuzdesi >= 80 ? "bg-emerald-500" : basariYuzdesi >= 50 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${basariYuzdesi}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-medium">
            {basariYuzdesi >= 80
              ? "🎉 Mükemmel! Öğrenme türlerini çok iyi anlamışsın!"
              : basariYuzdesi >= 50
                ? "👍 İyi gidiyorsun! Birkaç konu üzerinde daha çalışabilirsin."
                : "📚 Tekrar gözden geçirmeni öneriyoruz. Konuyu oku ve tekrar dene!"}
          </p>
        </div>

        {/* Sonuç Özeti */}
        <div className="grid gap-2 sm:grid-cols-2">
          {senaryolar.map((s) => {
            const cevap = cevaplar[s.id];
            const dogruMuOzet = cevap === s.dogruCevap;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-3 rounded-lg border p-3 text-sm ${
                  dogruMuOzet
                    ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
                    : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                }`}
              >
                <span className="text-xl">{s.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium">{s.baslik}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {ogrenimTurleri[s.dogruCevap].ad}
                  </p>
                </div>
                <span>{dogruMuOzet ? "✅" : "❌"}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={tekrarBasla}
          className="mx-auto flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2 font-bold text-white transition-all hover:bg-orange-600"
        >
          🔄 Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">🧠 Öğrenme Türleri Quiz</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Her senaryoyu oku ve hangi öğrenme türü olduğunu tahmin et!
        </p>
      </div>

      {/* İlerleme */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {aktifSoru + 1} / {senaryolar.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${((aktifSoru + 1) / senaryolar.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Senaryo Kartı */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 text-center text-4xl">{senaryo.emoji}</div>
        <h4 className="mb-2 text-center text-xl font-bold">{senaryo.baslik}</h4>
        <p className="text-center text-sm text-[var(--color-text-secondary)]">{senaryo.aciklama}</p>
      </div>

      {/* Seçenekler */}
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(ogrenimTurleri) as Array<keyof typeof ogrenimTurleri>).map((tur) => {
          const bilgi = ogrenimTurleri[tur];
          const secildi = kullaniciCevap === tur;
          const dogruSecenek = senaryo.dogruCevap === tur;
          let stil = "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:shadow-md cursor-pointer";

          if (gosterCevap) {
            if (dogruSecenek) {
              stil = "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30 ring-2 ring-emerald-400";
            } else if (secildi && !dogruMu) {
              stil = "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/30 ring-2 ring-red-400";
            } else {
              stil = "border-[var(--color-border)] bg-[var(--color-bg-secondary)] opacity-50";
            }
          }

          return (
            <button
              key={tur}
              onClick={() => cevapVer(tur)}
              disabled={gosterCevap}
              className={`rounded-xl border p-4 text-center transition-all ${stil}`}
            >
              <span className="text-2xl">{bilgi.emoji}</span>
              <p className="mt-2 text-sm font-bold">{bilgi.kisa}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{bilgi.ad}</p>
            </button>
          );
        })}
      </div>

      {/* Geri Bildirim */}
      {gosterCevap && (
        <div
          className={`rounded-xl border-l-4 p-4 ${
            dogruMu
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
              : "border-red-500 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          <p className="font-bold">
            {dogruMu ? "✅ Doğru!" : `❌ Yanlış! Doğru cevap: ${ogrenimTurleri[senaryo.dogruCevap].ad}`}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{senaryo.neden}</p>
        </div>
      )}

      {gosterCevap && (
        <button
          onClick={sonrakiSoru}
          className="mx-auto flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2 font-bold text-white transition-all hover:bg-orange-600"
        >
          {aktifSoru < senaryolar.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör 🏆"}
        </button>
      )}
    </div>
  );
}
