"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface TarihOlayi {
  yil: number;
  baslik: string;
  aciklama: string;
  detay: string;
  emoji: string;
  resim?: { src: string; alt: string; width: number; height: number; credit: string };
  renk: string;
}

const olaylar: TarihOlayi[] = [
  {
    yil: 1642, baslik: "İlk Mekanik Hesap Makinesi",
    aciklama: "Blaise Pascal mekanik hesap makinesini icat etti.",
    detay: "Pascaline adlı bu cihaz toplama ve çıkarma yapabiliyordu. Vergi memuru olan babasına yardım etmek için tasarladı. Günümüz bilgisayarlarının en eski atasıdır!",
    emoji: "🔢", renk: "border-sky-400 bg-sky-50 dark:bg-sky-900/20",
    resim: { src: "/images/bolumler/pascaline.jpg", alt: "Pascaline hesap makinesi", width: 200, height: 150, credit: "Rama, CC BY-SA 3.0 FR, Wikimedia" },
  },
  {
    yil: 1950, baslik: "Turing Testi",
    aciklama: "Alan Turing 'Makineler düşünebilir mi?' sorusunu sordu.",
    detay: "Eğer bir insan, konuştuğu tarafın makine mi insan mı olduğunu anlayamazsa, makine testi geçmiş sayılır. Bu soru hâlâ tartışılıyor!",
    emoji: "🧠", renk: "border-violet-400 bg-violet-50 dark:bg-violet-900/20",
    resim: { src: "/images/bolumler/turing.jpg", alt: "Alan Turing", width: 120, height: 150, credit: "Public Domain, Wikimedia Commons" },
  },
  {
    yil: 1956, baslik: "\"Yapay Zeka\" Terimi Doğdu",
    aciklama: "John McCarthy bu terimi ilk kez kullandı.",
    detay: "Dartmouth Konferansı'nda bilim insanları bir araya geldi ve makinelerin zeki davranışlar sergileyebileceği fikrini tartıştı. Bu toplantı YZ'nin resmi doğum günü kabul edilir.",
    emoji: "💡", renk: "border-amber-400 bg-amber-50 dark:bg-amber-900/20",
  },
  {
    yil: 1959, baslik: "Cahit Arf'ın Çalışması",
    aciklama: "Türk matematikçi makinelerin düşünmesi üzerine çalıştı.",
    detay: "'Makine düşünebilir mi ve nasıl düşünebilir?' başlıklı ünlü konuşmasını yaptı. 10 liralık banknotların arkasında resmi bulunan Cahit Arf, Türkiye'de YZ düşüncesinin öncüsüdür.",
    emoji: "🇹🇷", renk: "border-red-400 bg-red-50 dark:bg-red-900/20",
    resim: { src: "/images/bolumler/cahit-arf.jpg", alt: "Cahit Arf - 10 TL banknot", width: 200, height: 100, credit: "Public Domain (TR currency), Wikimedia" },
  },
  {
    yil: 1965, baslik: "ELIZA - İlk Sohbet Robotu",
    aciklama: "MIT'de bir psikolog gibi konuşabilen program geliştirildi.",
    detay: "Joseph Weizenbaum tarafından geliştirilen ELIZA, basit kalıp eşleştirme kullanıyordu. İnsanlar onunla gerçekten duygusal bağ kuruyordu — bu çok şaşırtıcıydı!",
    emoji: "💬", renk: "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    yil: 1997, baslik: "Deep Blue Zaferi",
    aciklama: "Bilgisayar ilk kez dünya satranç şampiyonunu yendi.",
    detay: "IBM'in Deep Blue'su saniyede 200 milyon hamle hesaplayabiliyordu. Garry Kasparov'u yenerek tarihe geçti. Ama yaratıcılık değil, ham hesaplama gücüyle kazandı.",
    emoji: "♟️", renk: "border-blue-400 bg-blue-50 dark:bg-blue-900/20",
    resim: { src: "/images/bolumler/deep-blue.jpg", alt: "IBM Deep Blue", width: 200, height: 150, credit: "James the photographer, CC BY 2.0" },
  },
  {
    yil: 2011, baslik: "Siri ve Sesli Asistanlar",
    aciklama: "Apple Siri ile sesli asistan çağı başladı.",
    detay: "Telefonunuzla konuşarak bilgi almanızı sağlayan ilk yaygın sesli asistan. Doğal dil işleme teknolojisinin günlük hayata girmesinin başlangıcıdır.",
    emoji: "🎙️", renk: "border-pink-400 bg-pink-50 dark:bg-pink-900/20",
  },
  {
    yil: 2016, baslik: "AlphaGo Zaferi",
    aciklama: "Google AlphaGo, Go oyununda dünya şampiyonunu yendi.",
    detay: "Go oyunundaki olası hamle sayısı evrendeki atom sayısından fazladır! AlphaGo'nun bu zaferi, YZ'nin sezgisel düşünme yeteneğinin geliştiğini gösterdi.",
    emoji: "🎯", renk: "border-teal-400 bg-teal-50 dark:bg-teal-900/20",
    resim: { src: "/images/bolumler/alphago.jpg", alt: "Go oyun tahtası", width: 200, height: 200, credit: "Donarreiskoffer, CC BY-SA 3.0, Wikimedia" },
  },
  {
    yil: 2022, baslik: "ChatGPT - Üretken YZ Çağı",
    aciklama: "Metin üreten YZ herkes tarafından kullanılabilir oldu.",
    detay: "İki ayda 100 milyon kullanıcıya ulaşarak tarihin en hızlı büyüyen uygulaması oldu. Artık YZ sadece uzmanların değil, herkesin aracı haline geldi.",
    emoji: "🤖", renk: "border-orange-400 bg-orange-50 dark:bg-orange-900/20",
  },
];

type Mod = "kesif" | "quiz";

export default function InteraktifTarihce() {
  const [mod, setMod] = useState<Mod>("kesif");
  const [acikOlay, setAcikOlay] = useState<number | null>(null);
  const [kesfedilenler, setKesfedilenler] = useState<Set<number>>(new Set());

  // Quiz state
  const [quizSorular] = useState(() => {
    const shuffled = [...olaylar].sort(() => Math.random() - 0.5).slice(0, 5);
    return shuffled.map((o) => ({
      olay: o,
      secenekler: generateYilSecenekleri(o.yil),
    }));
  });
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizCevaplar, setQuizCevaplar] = useState<(number | null)[]>(new Array(5).fill(null));
  const [quizGosterCevap, setQuizGosterCevap] = useState(false);
  const [quizBitti, setQuizBitti] = useState(false);

  const toggleOlay = useCallback((yil: number) => {
    setAcikOlay((prev) => (prev === yil ? null : yil));
    setKesfedilenler((prev) => {
      const next = new Set(prev);
      next.add(yil);
      return next;
    });
  }, []);

  // Quiz fonksiyonlari
  const quizCevapSec = (yil: number) => {
    if (quizGosterCevap) return;
    const yeni = [...quizCevaplar];
    yeni[quizIndex] = yil;
    setQuizCevaplar(yeni);
    setQuizGosterCevap(true);
  };

  const quizSonraki = () => {
    if (quizIndex < quizSorular.length - 1) {
      setQuizIndex(quizIndex + 1);
      setQuizGosterCevap(false);
    } else {
      setQuizBitti(true);
    }
  };

  const quizSifirla = () => {
    setQuizIndex(0);
    setQuizCevaplar(new Array(5).fill(null));
    setQuizGosterCevap(false);
    setQuizBitti(false);
  };

  const dogruSayisi = quizCevaplar.filter((c, i) => c === quizSorular[i]?.olay.yil).length;

  return (
    <div className="space-y-4">
      {/* Mod secici */}
      <div className="flex items-center gap-2 p-1 bg-[var(--color-bg-secondary)] rounded-xl w-fit">
        <button
          onClick={() => setMod("kesif")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            mod === "kesif"
              ? "bg-sky-600 text-white shadow"
              : "text-[var(--color-text-secondary)] hover:text-foreground"
          }`}
        >
          🔍 Keşfet
        </button>
        <button
          onClick={() => setMod("quiz")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            mod === "quiz"
              ? "bg-amber-600 text-white shadow"
              : "text-[var(--color-text-secondary)] hover:text-foreground"
          }`}
        >
          🧩 Yılı Tahmin Et
        </button>
      </div>

      {/* ====== KEŞFET MODU ====== */}
      {mod === "kesif" && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Kartlara tıklayarak detayları keşfet!
            </p>
            <span className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 px-2.5 py-1 rounded-full font-semibold">
              {kesfedilenler.size}/{olaylar.length} keşfedildi
            </span>
          </div>

          {/* Ilerleme cubugu */}
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-500"
              style={{ width: `${(kesfedilenler.size / olaylar.length) * 100}%` }}
            />
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full" />

            <div className="space-y-3">
              {olaylar.map((olay) => {
                const acik = acikOlay === olay.yil;
                const kesfedildi = kesfedilenler.has(olay.yil);
                return (
                  <div key={olay.yil} className="relative pl-14">
                    {/* Dot */}
                    <div className={`absolute left-[1.125rem] top-4 w-4 h-4 rounded-full border-[3px] border-white dark:border-gray-900 z-10 transition-all ${
                      kesfedildi ? "bg-sky-500 scale-110" : "bg-gray-300 dark:bg-gray-600"
                    }`} />

                    {/* Yil badge */}
                    <div className="absolute left-0 top-3.5 w-9 text-right">
                      <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                        {olay.yil}
                      </span>
                    </div>

                    {/* Kart */}
                    <button
                      onClick={() => toggleOlay(olay.yil)}
                      className={`w-full text-left rounded-xl border-l-4 border ${olay.renk} p-4 transition-all duration-200 ${
                        acik ? "shadow-md" : "hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl shrink-0 mt-0.5">{olay.emoji}</span>
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground">{olay.baslik}</h4>
                            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{olay.aciklama}</p>
                          </div>
                        </div>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`shrink-0 mt-1 text-gray-400 transition-transform ${acik ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      {/* Detay alani */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: acik ? "400px" : "0", opacity: acik ? 1 : 0 }}
                      >
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex flex-col sm:flex-row gap-3">
                            {olay.resim && (
                              <div className="shrink-0">
                                <Image
                                  src={olay.resim.src}
                                  alt={olay.resim.alt}
                                  width={olay.resim.width}
                                  height={olay.resim.height}
                                  className="rounded-lg object-cover shadow"
                                />
                                <p className="text-[10px] text-gray-400 mt-1 italic">{olay.resim.credit}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-foreground leading-relaxed">{olay.detay}</p>
                              <div className="mt-2 inline-flex items-center gap-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M9 12l2 2 4-4" />
                                </svg>
                                Keşfedildi!
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tum kesfedildiginde tebrik */}
          {kesfedilenler.size === olaylar.length && (
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 text-center">
              <p className="text-3xl mb-2">🎉</p>
              <p className="font-bold text-emerald-700 dark:text-emerald-300">
                Harika! Tüm olayları keşfettin!
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Şimdi &quot;Yılı Tahmin Et&quot; moduna geçerek bilgini test edebilirsin!
              </p>
              <button
                onClick={() => { setMod("quiz"); quizSifirla(); }}
                className="mt-3 bg-amber-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition"
              >
                🧩 Yılı Tahmin Et
              </button>
            </div>
          )}
        </>
      )}

      {/* ====== QUIZ MODU ====== */}
      {mod === "quiz" && (
        <>
          {!quizBitti ? (
            <div className="space-y-4">
              {/* Ilerleme */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${((quizIndex + 1) / quizSorular.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  {quizIndex + 1}/{quizSorular.length}
                </span>
              </div>

              {/* Soru */}
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                <div className="text-center mb-5">
                  <span className="text-4xl mb-3 block">{quizSorular[quizIndex].olay.emoji}</span>
                  <h4 className="text-lg font-bold text-foreground">
                    {quizSorular[quizIndex].olay.baslik}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {quizSorular[quizIndex].olay.aciklama}
                  </p>
                  <p className="mt-3 font-semibold text-amber-700 dark:text-amber-400">
                    Bu olay hangi yıl gerçekleşti?
                  </p>
                </div>

                {/* Secenekler */}
                <div className="grid grid-cols-2 gap-3">
                  {quizSorular[quizIndex].secenekler.map((yil) => {
                    const dogruYil = quizSorular[quizIndex].olay.yil;
                    const secildi = quizCevaplar[quizIndex] === yil;
                    const cevapGosterildi = quizGosterCevap;
                    const dogruMu = yil === dogruYil;

                    let btnClass = "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-amber-400";
                    if (cevapGosterildi) {
                      if (dogruMu) btnClass = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-400";
                      else if (secildi && !dogruMu) btnClass = "border-red-400 bg-red-50 dark:bg-red-900/30";
                      else btnClass = "border-gray-200 dark:border-gray-700 opacity-50";
                    } else if (secildi) {
                      btnClass = "border-amber-400 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-400";
                    }

                    return (
                      <button
                        key={yil}
                        onClick={() => quizCevapSec(yil)}
                        disabled={cevapGosterildi}
                        className={`rounded-xl border-2 px-4 py-3 text-center font-bold text-lg transition ${btnClass}`}
                      >
                        {yil}
                        {cevapGosterildi && dogruMu && <span className="ml-2">✓</span>}
                        {cevapGosterildi && secildi && !dogruMu && <span className="ml-2">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Cevap aciklamasi */}
                {quizGosterCevap && (
                  <div className={`mt-4 rounded-lg p-4 text-sm ${
                    quizCevaplar[quizIndex] === quizSorular[quizIndex].olay.yil
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200"
                      : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                  }`}>
                    <p className="font-semibold mb-1">
                      {quizCevaplar[quizIndex] === quizSorular[quizIndex].olay.yil
                        ? "🎉 Doğru!"
                        : `❌ Yanlış! Doğru cevap: ${quizSorular[quizIndex].olay.yil}`
                      }
                    </p>
                    <p>{quizSorular[quizIndex].olay.detay}</p>
                  </div>
                )}

                {/* Sonraki butonu */}
                {quizGosterCevap && (
                  <button
                    onClick={quizSonraki}
                    className="mt-4 w-full bg-amber-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition"
                  >
                    {quizIndex < quizSorular.length - 1 ? "Sonraki Soru →" : "Sonuçları Gör"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Sonuc ekrani */
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
              <p className="text-5xl mb-3">
                {dogruSayisi >= 4 ? "🏆" : dogruSayisi >= 2 ? "👍" : "💪"}
              </p>
              <h4 className="text-xl font-bold text-foreground">
                {dogruSayisi >= 4 ? "Muhteşem!" : dogruSayisi >= 2 ? "İyi iş!" : "Daha fazla keşfet!"}
              </h4>
              <p className="text-[var(--color-text-secondary)] mt-1">
                {dogruSayisi} / {quizSorular.length} doğru cevap
              </p>

              <div className="flex justify-center gap-2 mt-4">
                {quizSorular.map((q, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      quizCevaplar[i] === q.olay.yil
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {quizCevaplar[i] === q.olay.yil ? "✓" : "✗"}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center mt-5">
                <button
                  onClick={quizSifirla}
                  className="bg-amber-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Tekrar Dene
                </button>
                <button
                  onClick={() => setMod("kesif")}
                  className="bg-sky-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition"
                >
                  Keşfet Moduna Dön
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function generateYilSecenekleri(dogruYil: number): number[] {
  const secenekler = new Set<number>([dogruYil]);
  const aralik = dogruYil < 1900 ? 50 : dogruYil < 2000 ? 15 : 5;
  while (secenekler.size < 4) {
    const offset = Math.floor(Math.random() * aralik * 2) - aralik;
    const yil = dogruYil + offset;
    if (yil !== dogruYil && yil > 1600 && yil <= 2025) secenekler.add(yil);
  }
  return [...secenekler].sort((a, b) => a - b);
}
