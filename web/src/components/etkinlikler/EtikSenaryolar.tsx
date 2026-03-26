"use client";

import { useState } from "react";

interface Senaryo {
  baslik: string;
  ikon: string;
  metin: string;
  etikYuzdesi: number;
  etikDegilYuzdesi: number;
  tartismaYuzdesi: number;
  tartismaSorulari: string[];
}

const senaryolar: Senaryo[] = [
  {
    baslik: "Ödev ve Yapay Zeka",
    ikon: "📝",
    metin: "Ayşe, Türkçe dersinde bir kompozisyon ödevi aldı. ChatGPT'ye 'Benim için çevre kirliliği hakkında bir kompozisyon yaz' dedi ve YZ'nin yazdığı metni hiç değiştirmeden öğretmenine teslim etti. Öğretmen çok beğendi ve yüksek not verdi.",
    etikYuzdesi: 8,
    etikDegilYuzdesi: 72,
    tartismaYuzdesi: 20,
    tartismaSorulari: [
      "Ayşe'nin yaptığı neden sorunlu olabilir?",
      "YZ'yi ödev yaparken nasıl kullanmak daha doğru olurdu?",
      "Öğretmen nasıl anlar? Anlamaması durumu değiştirir mi?",
    ],
  },
  {
    baslik: "Resim Yarışması ve YZ",
    ikon: "🎨",
    metin: "Murat, okul resim yarışmasına katılmak istiyor ama resim çizme konusunda kendine güvenmiyor. Bir yapay zeka görüntü oluşturma aracıyla güzel bir resim üretiyor ve yarışmaya kendi çizimi gibi sunuyor. Birinci oluyor!",
    etikYuzdesi: 5,
    etikDegilYuzdesi: 68,
    tartismaYuzdesi: 27,
    tartismaSorulari: [
      "YZ ile üretilen sanat gerçekten 'sanat' mıdır?",
      "Yarışmada haksız avantaj sağlamış mıdır?",
      "YZ destekli bir kategori olsa durum değişir miydi?",
    ],
  },
  {
    baslik: "Gizlilik ve Akıllı Hoparlör",
    ikon: "🎙️",
    metin: "Bir aile evlerine akıllı hoparlör aldı. Cihaz 'Hey Siri' veya 'Ok Google' deyince aktifleşiyor ama aslında sürekli dinliyor. Bir gün aile üyeleri, konuştukları ürünlerin reklamlarını telefonlarında görmeye başlıyor.",
    etikYuzdesi: 6,
    etikDegilYuzdesi: 65,
    tartismaYuzdesi: 29,
    tartismaSorulari: [
      "Akıllı cihazların bizi dinlemesi etik midir?",
      "Kolaylık ile gizlilik arasında nasıl bir denge kurulmalı?",
      "Bu konuda ne gibi yasalar olmalı?",
    ],
  },
  {
    baslik: "Deepfake Video",
    ikon: "🎭",
    metin: "Bir grup öğrenci, yapay zeka kullanarak okul müdürünün yüzünü komik bir videoya yerleştirdi ve sosyal medyada paylaştı. Video çok paylaşıldı. Müdür çok üzüldü ve olay okul disiplin kuruluna taşındı.",
    etikYuzdesi: 3,
    etikDegilYuzdesi: 85,
    tartismaYuzdesi: 12,
    tartismaSorulari: [
      "Birinin yüzünü izinsiz kullanmak neden tehlikelidir?",
      "Deepfake teknolojisi sadece kötü mü kullanılır?",
      "Bu tür olaylara karşı ne gibi önlemler alınmalı?",
    ],
  },
  {
    baslik: "İş Dünyası ve Otomasyon",
    ikon: "🏭",
    metin: "Büyük bir fabrika, üretim hattındaki 200 işçinin yerine yapay zeka destekli robotlar kullanmaya karar verdi. Üretim %40 arttı, hatalar %90 azaldı ama 200 kişi işsiz kaldı. Şirket, işçilere 3 ay maaş ve yeni beceri eğitimi teklif etti.",
    etikYuzdesi: 25,
    etikDegilYuzdesi: 30,
    tartismaYuzdesi: 45,
    tartismaSorulari: [
      "Verimlilik mi yoksa istihdam mı daha önemli?",
      "Şirketin eğitim teklifi yeterli mi?",
      "Devletin bu konuda rolü ne olmalı?",
    ],
  },
  {
    baslik: "YZ ile Gözetim Sistemi",
    ikon: "📹",
    metin: "Bir şehir, suç oranını düşürmek için sokaklara yüz tanıma özellikli kameralar yerleştirdi. Suç oranı %30 düştü ama vatandaşlar her an izlendiklerini hissediyor. Bazı insanlar maske takmaya veya güneş gözlüğü kullanmaya başladı.",
    etikYuzdesi: 18,
    etikDegilYuzdesi: 35,
    tartismaYuzdesi: 47,
    tartismaSorulari: [
      "Güvenlik için özgürlükten ne kadar vazgeçilebilir?",
      "Yüz tanıma verileri kötüye kullanılabilir mi?",
      "Bu sisteme alternatifler neler olabilir?",
    ],
  },
];

type Secim = "etik" | "etik_degil" | "tartisma";

export default function EtikSenaryolar() {
  const [secimler, setSecimler] = useState<Record<number, Secim>>({});
  const [acikTartisma, setAcikTartisma] = useState<number | null>(null);

  const secimYap = (index: number, secim: Secim) => {
    setSecimler((prev) => ({ ...prev, [index]: secim }));
    setAcikTartisma(index);
  };

  const tamamlanan = Object.keys(secimler).length;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <h3 className="mb-1 text-xl font-bold">⚖️ Etik Senaryo Kartları</h3>
      <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
        Her senaryoyu oku ve ne düşündüğüne karar ver. Doğru veya yanlış cevap yok,
        amaç eleştirel düşünmek!
      </p>
      <p className="mb-5 text-xs font-medium text-violet-600 dark:text-violet-400">
        {tamamlanan}/{senaryolar.length} senaryo değerlendirildi
      </p>

      <div className="space-y-4">
        {senaryolar.map((senaryo, index) => {
          const secim = secimler[index];
          const acik = acikTartisma === index;

          return (
            <div
              key={index}
              className={`rounded-xl border transition-all ${
                secim
                  ? "border-violet-300 dark:border-violet-700"
                  : "border-[var(--color-border)]"
              } bg-[var(--color-bg)] p-4 sm:p-5`}
            >
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{senaryo.ikon}</span>
                <h4 className="text-base font-bold">{senaryo.baslik}</h4>
                {secim && <span className="ml-auto text-xs font-medium text-violet-600 dark:text-violet-400">Değerlendirildi ✓</span>}
              </div>

              {/* Scenario text */}
              <p className="mb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {senaryo.metin}
              </p>

              {/* Choice buttons */}
              {!secim ? (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => secimYap(index, "etik")}
                    className="rounded-lg border-2 border-emerald-300 bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40"
                  >
                    ✅ Etik
                  </button>
                  <button
                    onClick={() => secimYap(index, "etik_degil")}
                    className="rounded-lg border-2 border-rose-300 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40"
                  >
                    ❌ Etik Değil
                  </button>
                  <button
                    onClick={() => secimYap(index, "tartisma")}
                    className="rounded-lg border-2 border-amber-300 bg-amber-50 px-3 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40"
                  >
                    💭 Tartışılır
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Your choice */}
                  <p className="text-sm font-medium">
                    Senin seçimin:{" "}
                    {secim === "etik" && <span className="text-emerald-600 dark:text-emerald-400">✅ Etik</span>}
                    {secim === "etik_degil" && <span className="text-rose-600 dark:text-rose-400">❌ Etik Değil</span>}
                    {secim === "tartisma" && <span className="text-amber-600 dark:text-amber-400">💭 Tartışılır</span>}
                  </p>

                  {/* Others think */}
                  <div className="rounded-lg bg-[var(--color-bg-secondary)] p-3">
                    <p className="mb-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                      Diğer öğrenciler ne düşünüyor?
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-16 text-xs">✅ Etik</span>
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-4">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-700 flex items-center justify-end pr-1.5"
                            style={{ width: `${senaryo.etikYuzdesi}%`, minWidth: senaryo.etikYuzdesi > 0 ? "2rem" : "0" }}
                          >
                            <span className="text-[10px] font-bold text-white">{senaryo.etikYuzdesi}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-16 text-xs">❌ Değil</span>
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-4">
                          <div
                            className="h-full rounded-full bg-rose-500 transition-all duration-700 flex items-center justify-end pr-1.5"
                            style={{ width: `${senaryo.etikDegilYuzdesi}%`, minWidth: senaryo.etikDegilYuzdesi > 0 ? "2rem" : "0" }}
                          >
                            <span className="text-[10px] font-bold text-white">{senaryo.etikDegilYuzdesi}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-16 text-xs">💭 Tartış.</span>
                        <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-4">
                          <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-700 flex items-center justify-end pr-1.5"
                            style={{ width: `${senaryo.tartismaYuzdesi}%`, minWidth: senaryo.tartismaYuzdesi > 0 ? "2rem" : "0" }}
                          >
                            <span className="text-[10px] font-bold text-white">{senaryo.tartismaYuzdesi}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discussion toggle */}
                  <button
                    onClick={() => setAcikTartisma(acik ? null : index)}
                    className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
                  >
                    {acik ? "Tartışma Sorularını Gizle ▲" : "Tartışma Sorularını Göster ▼"}
                  </button>

                  {acik && (
                    <div className="rounded-lg border-2 border-violet-200 bg-violet-50 p-3 dark:border-violet-700 dark:bg-violet-900/20">
                      <p className="mb-2 text-xs font-bold text-violet-700 dark:text-violet-400">🗣️ Sınıfça Tartışın:</p>
                      <ul className="space-y-1">
                        {senaryo.tartismaSorulari.map((soru, i) => (
                          <li key={i} className="text-sm text-violet-800 dark:text-violet-300">
                            {i + 1}. {soru}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {tamamlanan === senaryolar.length && (
        <div className="mt-5 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-700 dark:bg-emerald-900/20">
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            🎉 Tüm senaryoları değerlendirdin!
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Unutma: Etik konularda her zaman tek bir doğru cevap yoktur.
            Önemli olan düşünmek, tartışmak ve farklı bakış açılarını anlamaktır.
          </p>
        </div>
      )}
    </div>
  );
}
