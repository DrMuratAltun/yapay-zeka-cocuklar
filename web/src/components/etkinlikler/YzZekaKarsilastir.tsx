"use client";

import { useState, useCallback } from "react";

interface Gorev {
  gorev: string;
  emoji: string;
  dogruCevap: "insan" | "yz" | "esit";
  aciklama: string;
}

const gorevler: Gorev[] = [
  {
    gorev: "Satranç oynamak",
    emoji: "♟️",
    dogruCevap: "yz",
    aciklama:
      "Yapay zeka satranç motorları (Deep Blue, Stockfish, AlphaZero) en iyi dünya şampiyonlarını bile yenebilir. Milyonlarca hamleyi saniyeler içinde hesaplayabilirler.",
  },
  {
    gorev: "Yaratıcı bir hikaye yazmak",
    emoji: "📖",
    dogruCevap: "insan",
    aciklama:
      "İnsanlar kişisel deneyimler, duygular ve hayal gücünden beslenerek özgün hikayeler yaratır. YZ metin üretebilir ama gerçek yaratıcılık ve özgünlük insana aittir.",
  },
  {
    gorev: "Empati kurmak ve teselli etmek",
    emoji: "🤗",
    dogruCevap: "insan",
    aciklama:
      "Empati, başkasının duygularını hissedebilme yeteneğidir. İnsanlar gerçek duygusal bağ kurabilir. YZ empati taklit edebilir ama gerçekten hissetmez.",
  },
  {
    gorev: "Büyük veriyi analiz etmek",
    emoji: "📊",
    dogruCevap: "yz",
    aciklama:
      "YZ milyonlarca veriyi saniyeler içinde analiz edip kalıplar bulabilir. İnsan beyni bu kadar büyük veri setleriyle bu hızda çalışamaz.",
  },
  {
    gorev: "Görüntüde kalıp tanımak",
    emoji: "🔍",
    dogruCevap: "esit",
    aciklama:
      "YZ binlerce röntgen filmini saniyede tarayabilir ama insanlar bağlamı anlama ve beklenmedik durumları fark etmede daha iyidir. Tıbbi görüntülemede en iyi sonuç ikisinin birlikte çalışmasıyla elde edilir.",
  },
  {
    gorev: "Karmaşık matematik hesabı yapmak",
    emoji: "🔢",
    dogruCevap: "yz",
    aciklama:
      "Bilgisayarlar saniyenin çok küçük bir bölümünde milyonlarca hesaplama yapabilir. İnsan beyni bu hıza ulaşamaz.",
  },
  {
    gorev: "Yeni bir icat fikrini ortaya çıkarmak",
    emoji: "💡",
    dogruCevap: "insan",
    aciklama:
      "İnovasyon, mevcut bilgileri yeni şekillerde birleştirmeyi ve tamamen yeni konseptler hayal etmeyi gerektirir. YZ mevcut kalıplardan üretim yapabilir ama devrimci fikirler insandan gelir.",
  },
  {
    gorev: "Dil çevirisi yapmak",
    emoji: "🌍",
    dogruCevap: "esit",
    aciklama:
      "YZ (Google Translate, DeepL) hızlı ve yeterli çeviriler yapabilir. Ama edebi metinler, atasözleri ve kültürel nüanslar için insan çevirmenler hâlâ daha başarılıdır. Teknik metinlerde ise YZ çok iyi!",
  },
  {
    gorev: "Yüz ifadelerinden duygu okumak",
    emoji: "😊",
    dogruCevap: "insan",
    aciklama:
      "İnsanlar bağlamı, ses tonunu ve yüz ifadelerini bir arada değerlendirerek duyguları anlar. YZ yüz ifadelerini analiz edebilir ama ironiyi, utancı veya karışık duyguları anlamada insanlar çok daha iyidir.",
  },
  {
    gorev: "Spam e-postaları tespit etmek",
    emoji: "📧",
    dogruCevap: "yz",
    aciklama:
      "YZ milyonlarca e-postayı analiz ederek spam kalıplarını öğrenir ve %99+ doğrulukla spam e-postaları ayıklayabilir. Bu görevi insan gözüyle yapmak pratik olarak imkansızdır.",
  },
];

export default function YzZekaKarsilastir() {
  const [cevaplar, setCevaplar] = useState<(string | null)[]>(
    Array(gorevler.length).fill(null)
  );
  const [geribildiriIndex, setGeribildiriIndex] = useState<number | null>(null);
  const [tamamlanan, setTamamlanan] = useState(0);
  const [oyunBitti, setOyunBitti] = useState(false);

  const cevapVer = useCallback(
    (gorevIndex: number, secim: "insan" | "yz" | "esit") => {
      if (cevaplar[gorevIndex] !== null) return;
      const yeni = [...cevaplar];
      yeni[gorevIndex] = secim;
      setCevaplar(yeni);
      setGeribildiriIndex(gorevIndex);
      setTamamlanan((t) => t + 1);
    },
    [cevaplar]
  );

  const tumunuKontrolEt = useCallback(() => {
    setOyunBitti(true);
    setGeribildiriIndex(null);
  }, []);

  const tekrarOyna = useCallback(() => {
    setCevaplar(Array(gorevler.length).fill(null));
    setGeribildiriIndex(null);
    setTamamlanan(0);
    setOyunBitti(false);
  }, []);

  const skor = cevaplar.filter(
    (c, i) => c === gorevler[i].dogruCevap
  ).length;

  const butonStil = (secim: string, gorevIndex: number) => {
    const secili = cevaplar[gorevIndex] === secim;
    const dogruMu = gorevler[gorevIndex].dogruCevap === secim;
    const cevaplandiMi = cevaplar[gorevIndex] !== null;

    if (!cevaplandiMi) {
      const renkler: Record<string, string> = {
        insan: "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
        yz: "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
        esit: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
      };
      return `border-2 ${renkler[secim]} cursor-pointer transition-all hover:scale-105`;
    }

    if (secili && dogruMu) return "border-2 border-emerald-400 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-600";
    if (secili && !dogruMu) return "border-2 border-rose-400 bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-600";
    if (!secili && dogruMu) return "border-2 border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700";
    return "border-2 border-gray-200 bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700";
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">🧠 vs 🤖 Zeka Karşılaştırması</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Her görevi değerlendir: İnsan mı, YZ mi yoksa ikisi de eşit mi daha başarılı?
        </p>
      </div>

      {/* İlerleme */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>{tamamlanan} / {gorevler.length} değerlendirildi</span>
          {oyunBitti && <span>Skor: {skor} / {gorevler.length} ⭐</span>}
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${(tamamlanan / gorevler.length) * 100}%` }}
          />
        </div>
      </div>

      {!oyunBitti ? (
        <>
          {/* Görev Kartları */}
          <div className="space-y-4">
            {gorevler.map((g, i) => (
              <div
                key={g.gorev}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-3xl">{g.emoji}</span>
                  <h3 className="font-bold">{g.gorev}</h3>
                  {cevaplar[i] !== null && (
                    <span className="ml-auto text-lg">
                      {cevaplar[i] === g.dogruCevap ? "✅" : "❌"}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => cevapVer(i, "insan")}
                    disabled={cevaplar[i] !== null}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold ${butonStil("insan", i)}`}
                  >
                    🧑 İnsan Daha İyi
                  </button>
                  <button
                    type="button"
                    onClick={() => cevapVer(i, "yz")}
                    disabled={cevaplar[i] !== null}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold ${butonStil("yz", i)}`}
                  >
                    🤖 YZ Daha İyi
                  </button>
                  <button
                    type="button"
                    onClick={() => cevapVer(i, "esit")}
                    disabled={cevaplar[i] !== null}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold ${butonStil("esit", i)}`}
                  >
                    🤝 Eşit
                  </button>
                </div>

                {/* Açıklama */}
                {cevaplar[i] !== null && geribildiriIndex === i && (
                  <div className="mt-3 rounded-lg bg-sky-50 p-3 text-sm text-[var(--color-text-secondary)] dark:bg-sky-900/20">
                    <p className="mb-1 font-semibold text-sky-700 dark:text-sky-300">
                      Doğru cevap:{" "}
                      {g.dogruCevap === "insan"
                        ? "🧑 İnsan Daha İyi"
                        : g.dogruCevap === "yz"
                        ? "🤖 YZ Daha İyi"
                        : "🤝 Eşit"}
                    </p>
                    <p>{g.aciklama}</p>
                  </div>
                )}

                {cevaplar[i] !== null && geribildiriIndex !== i && (
                  <button
                    type="button"
                    onClick={() => setGeribildiriIndex(i)}
                    className="mt-2 text-xs text-sky-600 underline dark:text-sky-400"
                  >
                    Açıklamayı göster
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Kontrol Et Butonu */}
          {tamamlanan === gorevler.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={tumunuKontrolEt}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Sonucu Gör 🏆
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sonuç Ekranı */
        <div className="text-center">
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-purple-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-2 text-5xl">
              {skor === gorevler.length ? "🏆" : skor >= 8 ? "🎉" : skor >= 6 ? "👍" : "💪"}
            </p>
            <h3 className="mb-2 text-2xl font-bold">
              {skor === gorevler.length
                ? "Mükemmel!"
                : skor >= 8
                ? "Harika!"
                : skor >= 6
                ? "İyi gidiyorsun!"
                : "Tekrar dene!"}
            </h3>
            <p className="mb-4 text-4xl font-bold text-purple-600">
              {skor} / {gorevler.length}
            </p>

            <div className="space-y-2 text-left">
              {gorevler.map((g, i) => (
                <div
                  key={g.gorev}
                  className={`flex items-center gap-2 rounded-lg p-2 text-xs ${
                    cevaplar[i] === g.dogruCevap
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-rose-100 dark:bg-rose-900/30"
                  }`}
                >
                  <span>{cevaplar[i] === g.dogruCevap ? "✅" : "❌"}</span>
                  <span className="text-lg">{g.emoji}</span>
                  <span className="font-medium">{g.gorev}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mb-6 max-w-md rounded-xl border border-purple-200 bg-purple-50 p-4 text-left text-sm dark:border-purple-800 dark:bg-purple-900/20">
            <h4 className="mb-2 font-bold text-purple-700 dark:text-purple-300">
              💡 Ne Öğrendik?
            </h4>
            <p className="text-[var(--color-text-secondary)]">
              İnsan zekası ve yapay zeka birbirinin rakibi değil, tamamlayıcısıdır!
              İnsanlar yaratıcılık, empati ve sezgide üstünken, YZ hız, hassasiyet
              ve büyük veri analizinde öne çıkar. En güçlü sonuçlar ikisinin
              birlikte çalışmasıyla elde edilir.
            </p>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
