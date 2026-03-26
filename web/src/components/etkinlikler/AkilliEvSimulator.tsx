"use client";

import { useState, useCallback } from "react";

interface Nesne {
  id: string;
  isim: string;
  emoji: string;
  aciklama: string;
  yzOzelligi: string;
}

interface Oda {
  id: string;
  isim: string;
  emoji: string;
  renk: string;
  renkAcik: string;
  nesneler: Nesne[];
}

const odalar: Oda[] = [
  {
    id: "mutfak",
    isim: "Mutfak",
    emoji: "🍳",
    renk: "bg-orange-500",
    renkAcik: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    nesneler: [
      {
        id: "buzdolabi",
        isim: "Akıllı Buzdolabı",
        emoji: "🧊",
        aciklama: "İçindeki malzemeleri kamerayla takip eder.",
        yzOzelligi: "Azalan malzemeleri fark edip alışveriş listesi oluşturur ve mevcut malzemelerle yemek tarifi önerir.",
      },
      {
        id: "firin",
        isim: "Akıllı Fırın",
        emoji: "🍕",
        aciklama: "Yemek türünü otomatik algılar.",
        yzOzelligi: "Kamera ile yemeğin pişme durumunu izler, kızarma derecesine göre sıcaklığı ayarlar ve pişince seni uyarır.",
      },
      {
        id: "kahve",
        isim: "Akıllı Kahve Makinesi",
        emoji: "☕",
        aciklama: "Sabah rutinini öğrenir.",
        yzOzelligi: "Her sabah kalktığın saati öğrenerek kahveni tam zamanında hazırlar. Hava durumuna göre sıcak veya soğuk kahve önerir.",
      },
      {
        id: "cop",
        isim: "Akıllı Çöp Kutusu",
        emoji: "🗑️",
        aciklama: "Atıkları otomatik sınıflandırır.",
        yzOzelligi: "Görüntü tanıma ile çöpün plastik, cam, kağıt veya organik olduğunu algılayarak doğru geri dönüşüm bölmesine yönlendirir.",
      },
    ],
  },
  {
    id: "salon",
    isim: "Salon",
    emoji: "🛋️",
    renk: "bg-blue-500",
    renkAcik: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    nesneler: [
      {
        id: "tv",
        isim: "Akıllı TV",
        emoji: "📺",
        aciklama: "İzleme alışkanlıklarını analiz eder.",
        yzOzelligi: "İzlediğin programlara göre yeni içerikler önerir. Ses komutlarıyla kontrol edilebilir. Kimin izlediğini yüz tanıma ile bilir.",
      },
      {
        id: "hoparlor",
        isim: "Akıllı Hoparlör",
        emoji: "🔊",
        aciklama: "Sesli asistan ile çalışır.",
        yzOzelligi: "Doğal dil işleme ile komutlarını anlar. Müzik çalar, soruları yanıtlar, haberleri okur, diğer akıllı cihazları kontrol eder.",
      },
      {
        id: "termostat",
        isim: "Akıllı Termostat",
        emoji: "🌡️",
        aciklama: "Sıcaklık tercihlerini öğrenir.",
        yzOzelligi: "Günün saatine, hava durumuna ve alışkanlıklarına göre evi otomatik ısıtır/soğutur. Enerji tasarrufu sağlar.",
      },
      {
        id: "isik",
        isim: "Akıllı Aydınlatma",
        emoji: "💡",
        aciklama: "Ortam ışığını otomatik ayarlar.",
        yzOzelligi: "Gün ışığına, saate ve aktivitene göre ışık rengini ve parlaklığını ayarlar. Film izlerken kısar, okurken artırır.",
      },
    ],
  },
  {
    id: "yatak",
    isim: "Yatak Odası",
    emoji: "🛏️",
    renk: "bg-violet-500",
    renkAcik: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
    nesneler: [
      {
        id: "alarm",
        isim: "Akıllı Alarm",
        emoji: "⏰",
        aciklama: "Uyku döngünü izler.",
        yzOzelligi: "Uyku sensörleriyle en hafif uyku aşamasında seni uyandırır. Böylece daha dinlenmiş uyanırsın. Uyku kaliteni raporlar.",
      },
      {
        id: "perde",
        isim: "Akıllı Perde",
        emoji: "🪟",
        aciklama: "Güneş ışığına göre açılır/kapanır.",
        yzOzelligi: "Alarm saatine göre yavaşça açılarak doğal ışıkla uyanmanı sağlar. Sıcak günlerde güneş ışığını engelleyerek odayı serin tutar.",
      },
      {
        id: "robot",
        isim: "Robot Süpürge",
        emoji: "🤖",
        aciklama: "Evi haritalayarak temizler.",
        yzOzelligi: "LIDAR sensörleriyle evin haritasını çıkarır. Mobilyaların yerini öğrenir. En verimli temizlik rotasını hesaplar ve engelleri aşar.",
      },
    ],
  },
  {
    id: "banyo",
    isim: "Banyo",
    emoji: "🚿",
    renk: "bg-teal-500",
    renkAcik: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
    nesneler: [
      {
        id: "ayna",
        isim: "Akıllı Ayna",
        emoji: "🪞",
        aciklama: "Sağlık bilgilerini gösterir.",
        yzOzelligi: "Yüzünü tarayarak cilt sağlığını analiz eder. Hava durumunu, takvimini ve haberleri gösterir. Kıyafet önerileri sunar.",
      },
      {
        id: "dis",
        isim: "Akıllı Diş Fırçası",
        emoji: "🪥",
        aciklama: "Fırçalama kalitesini ölçer.",
        yzOzelligi: "Sensörlerle hangi bölgeleri ne kadar fırçaladığını izler. Eksik kalan bölgeleri uygulamadan gösterir. Diş hekimine rapor gönderebilir.",
      },
      {
        id: "tartı",
        isim: "Akıllı Tartı",
        emoji: "⚖️",
        aciklama: "Sağlık metriklerini takip eder.",
        yzOzelligi: "Kilo, kas oranı, yağ oranı ve su oranını ölçer. Zaman içindeki değişimleri grafikle gösterir. Beslenme önerileri sunar.",
      },
      {
        id: "su",
        isim: "Akıllı Su Sistemi",
        emoji: "💧",
        aciklama: "Su tüketimini optimize eder.",
        yzOzelligi: "Duş süresini ve su sıcaklığı tercihini öğrenir. Su kaçağını algılar ve uyarır. Aylık su tasarrufu raporları oluşturur.",
      },
    ],
  },
];

const toplamNesne = odalar.reduce((t, o) => t + o.nesneler.length, 0);

export default function AkilliEvSimulator() {
  const [seciliOda, setSeciliOda] = useState<string>("mutfak");
  const [kesfedilenler, setKesfedilenler] = useState<Set<string>>(new Set());
  const [seciliNesne, setSeciliNesne] = useState<string | null>(null);

  const nesneKesfet = useCallback(
    (nesneId: string) => {
      setSeciliNesne(nesneId);
      setKesfedilenler((prev) => {
        const yeni = new Set(prev);
        yeni.add(nesneId);
        return yeni;
      });
    },
    []
  );

  const mevcutOda = odalar.find((o) => o.id === seciliOda)!;
  const mevcutNesne = seciliNesne
    ? mevcutOda.nesneler.find((n) => n.id === seciliNesne)
    : null;

  const tumKesfedildiMi = kesfedilenler.size === toplamNesne;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">🏠 Akıllı Ev Simülatörü</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Odalardaki nesnelere tıklayarak yapay zeka özelliklerini keşfet!
        </p>
      </div>

      {/* Keşif Sayacı */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>Keşfedilen: {kesfedilenler.size} / {toplamNesne}</span>
          {tumKesfedildiMi && <span className="font-bold text-emerald-600">Tamamlandı! 🎉</span>}
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${(kesfedilenler.size / toplamNesne) * 100}%` }}
          />
        </div>
      </div>

      {/* Oda Seçimi */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {odalar.map((oda) => {
          const odaKesfSayisi = oda.nesneler.filter((n) =>
            kesfedilenler.has(n.id)
          ).length;
          return (
            <button
              key={oda.id}
              type="button"
              onClick={() => {
                setSeciliOda(oda.id);
                setSeciliNesne(null);
              }}
              className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 font-bold transition-all hover:scale-105 ${
                seciliOda === oda.id
                  ? `${oda.renk} border-transparent text-white shadow-lg`
                  : "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
              }`}
            >
              <span className="text-xl">{oda.emoji}</span>
              <span className="text-sm">{oda.isim}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  seciliOda === oda.id
                    ? "bg-white/30 text-white"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {odaKesfSayisi}/{oda.nesneler.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Oda İçeriği */}
      <div className={`rounded-2xl border p-5 ${mevcutOda.renkAcik}`}>
        <h3 className="mb-4 text-center text-lg font-bold">
          {mevcutOda.emoji} {mevcutOda.isim}
        </h3>

        {/* Nesneler Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {mevcutOda.nesneler.map((nesne) => {
            const kesfedildi = kesfedilenler.has(nesne.id);
            const secili = seciliNesne === nesne.id;
            return (
              <button
                key={nesne.id}
                type="button"
                onClick={() => nesneKesfet(nesne.id)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:scale-105 ${
                  secili
                    ? "border-sky-400 bg-sky-50 shadow-lg dark:bg-sky-900/30"
                    : kesfedildi
                    ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700"
                    : "border-gray-200 bg-white hover:border-sky-300 hover:bg-sky-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-sky-900/20"
                }`}
              >
                <span className="text-3xl">{nesne.emoji}</span>
                <span className="text-center text-xs font-bold">
                  {nesne.isim}
                </span>
                {kesfedildi && !secili && (
                  <span className="text-xs text-emerald-600">✅</span>
                )}
                {!kesfedildi && (
                  <span className="text-[10px] text-gray-400">Tıkla!</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Nesne Detayı */}
        {mevcutNesne && (
          <div className="mt-4 rounded-xl border border-sky-200 bg-white p-4 shadow-md dark:border-sky-800 dark:bg-slate-800">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">{mevcutNesne.emoji}</span>
              <h4 className="text-lg font-bold">{mevcutNesne.isim}</h4>
            </div>
            <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
              {mevcutNesne.aciklama}
            </p>
            <div className="rounded-lg bg-sky-50 p-3 dark:bg-sky-900/20">
              <p className="mb-1 text-xs font-bold text-sky-700 dark:text-sky-300">
                🤖 YZ Özelliği:
              </p>
              <p className="text-sm text-sky-800 dark:text-sky-200">
                {mevcutNesne.yzOzelligi}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tamamlandı Mesajı */}
      {tumKesfedildiMi && (
        <div className="mt-6 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-700 dark:bg-emerald-900/20">
          <p className="mb-2 text-3xl">🎉🏆</p>
          <h3 className="mb-2 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            Tüm akıllı ev özelliklerini keşfettin!
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Gördüğün gibi yapay zeka, evlerimizdeki pek çok cihazı daha akıllı
            ve verimli hale getirebilir. Enerji tasarrufu, konfor ve güvenlik
            için YZ teknolojileri her geçen gün daha fazla kullanılıyor.
          </p>
        </div>
      )}
    </section>
  );
}
