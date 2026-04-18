"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Öncüler İnteraktif
 * 4 YZ öncüsü, tıklanabilir kartlar: tıkla → detaylı bilgi paneli açılır.
 * Alt tarafta mini eşleştirme: "Hangi öncü ne yaptı?"
 */

type Oncu = {
  id: string;
  ad: string;
  yillar: string;
  baslik: string;
  gorsel: string;
  renkGradient: string;
  katki: string;
  ayrinti: string[];
  alinti: string;
};

const ONCULER: Oncu[] = [
  {
    id: "lovelace",
    ad: "Ada Lovelace",
    yillar: "1815-1852",
    baslik: "İlk Programcı",
    gorsel: "/images/illustrasyonlar/lovelace-portre.svg",
    renkGradient: "from-pink-500 to-rose-600",
    katki: "İlk bilgisayar algoritmasını yazdı",
    ayrinti: [
      "Charles Babbage'ın Analitik Motor'u için ilk algoritmayı tasarladı.",
      "Makinelerin sadece hesaplama değil, müzik ve görüntü de üretebileceğini ilk öngören kişi.",
      "Adı bilgisayar biliminde yaşayan bir programlama dili (Ada) ile anılıyor.",
    ],
    alinti:
      '"Analitik Motor, kendisine verilen formülleri çalıştırmaktan fazlasını yapabilir."',
  },
  {
    id: "turing",
    ad: "Alan Turing",
    yillar: "1912-1954",
    baslik: "Bilgisayar Biliminin Babası",
    gorsel: "/images/illustrasyonlar/turing-portre.svg",
    renkGradient: "from-sky-500 to-blue-600",
    katki: "Turing Testi'ni (1950) öne sürdü",
    ayrinti: [
      "II. Dünya Savaşı'nda Enigma şifresini kırarak savaşın seyrini değiştirdi.",
      "\"Makineler düşünebilir mi?\" sorusuyla YZ alanının temelini attı.",
      "Turing Makinesi'ni tanımlayarak modern bilgisayarın teorik temelini kurdu.",
    ],
    alinti:
      '"Soru şu olmalı: Makineler düşünebilir mi? — değil, makineler insanla ayırt edilemez davranabilir mi?"',
  },
  {
    id: "arf",
    ad: "Cahit Arf",
    yillar: "1910-1997",
    baslik: "Türk Matematiğin Dehası",
    gorsel: "/images/illustrasyonlar/arf-portre.svg",
    renkGradient: "from-orange-500 to-amber-600",
    katki: '"Makineler düşünebilir mi?" makalesi (1959)',
    ayrinti: [
      "10 TL banknotun arkasında resmi bulunan, Türkiye'nin en büyük matematikçilerinden.",
      "Arf Değişmezi (Arf Invariant) dünya matematik literatüründe yaşıyor.",
      "1958'de Atatürk Üniversitesi'nde YZ'nin öncü sorularını tartıştı.",
    ],
    alinti:
      '"Makineler düşünebilir mi ve nasıl düşünebilir?"',
  },
  {
    id: "mccarthy",
    ad: "John McCarthy",
    yillar: "1927-2011",
    baslik: "\"Yapay Zeka\" Teriminin Babası",
    gorsel: "/images/illustrasyonlar/mccarthy-portre.svg",
    renkGradient: "from-indigo-500 to-violet-600",
    katki: "1956'da \"yapay zeka\" terimini icat etti",
    ayrinti: [
      "Dartmouth Konferansı'nı (1956) düzenleyerek YZ'yi resmi bir alan olarak başlattı.",
      "LISP programlama dilini yarattı — hâlâ YZ araştırmalarında kullanılıyor.",
      "\"Zaman paylaşımlı bilgisayar\" kavramını da ilk o öne sürdü.",
    ],
    alinti: '"Her öğrenme özelliği, bir makinenin taklit edebileceği kadar kesin tanımlanabilir."',
  },
];

type QuizSoru = {
  soru: string;
  dogruOncu: string;
};

const QUIZ: QuizSoru[] = [
  { soru: "1950'de Turing Testi'ni öne sürdü", dogruOncu: "turing" },
  { soru: "\"Yapay zeka\" terimini ilk kez 1956'da kullandı", dogruOncu: "mccarthy" },
  { soru: "İlk bilgisayar algoritmasını yazdı (1843)", dogruOncu: "lovelace" },
  { soru: "Türk matematikçi, \"Arf Değişmezi\" onun adını taşıyor", dogruOncu: "arf" },
];

export default function OnculerInteraktif() {
  const [seciliOncu, setSeciliOncu] = useState<string | null>(null);
  const [quizCevaplar, setQuizCevaplar] = useState<Record<number, string>>({});
  const [kontrol, setKontrol] = useState(false);

  const secili = seciliOncu ? ONCULER.find((o) => o.id === seciliOncu) ?? null : null;

  function cevapla(soruIdx: number, oncuId: string) {
    if (kontrol) return;
    setQuizCevaplar((p) => ({ ...p, [soruIdx]: oncuId }));
  }

  const tumCevaplandi = Object.keys(quizCevaplar).length === QUIZ.length;
  const dogruSayisi = QUIZ.filter((q, i) => quizCevaplar[i] === q.dogruOncu).length;

  return (
    <div className="space-y-4">
      {/* Üst panel: 4 öncü kartı */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {ONCULER.map((o) => {
          const aktif = seciliOncu === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setSeciliOncu((prev) => (prev === o.id ? null : o.id))}
              className={`group cursor-pointer overflow-hidden rounded-xl border-2 bg-[var(--color-bg)] transition-all ${
                aktif
                  ? "scale-[1.02] border-transparent shadow-xl"
                  : "border-[var(--color-border)] hover:border-sky-300 hover:-translate-y-1 hover:shadow-lg"
              }`}
              style={{
                borderImage: aktif
                  ? `linear-gradient(to bottom right, var(--tw-gradient-stops)) 1`
                  : undefined,
              }}
              aria-pressed={aktif}
            >
              <div className={`h-1 bg-gradient-to-r ${o.renkGradient}`} />
              <div className="relative aspect-[5/6] overflow-hidden">
                <Image
                  src={o.gorsel}
                  alt={o.ad + " portresi"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {aktif && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900">
                      ✓ Seçili
                    </span>
                  </div>
                )}
              </div>
              <div className="p-2.5 text-left">
                <p className="text-xs text-[var(--color-text-secondary)]">{o.yillar}</p>
                <p className="text-sm font-bold leading-tight">{o.ad}</p>
                <p className="mt-0.5 text-[10px] font-medium text-[var(--color-text-secondary)] line-clamp-1">
                  {o.baslik}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detay paneli */}
      {secili ? (
        <div
          className={`overflow-hidden rounded-2xl bg-gradient-to-br ${secili.renkGradient} p-[2px] shadow-lg`}
        >
          <div className="rounded-[14px] bg-[var(--color-bg)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="shrink-0 sm:w-40">
                <div className="aspect-[5/6] overflow-hidden rounded-xl">
                  <Image
                    src={secili.gorsel}
                    alt={secili.ad + " portresi"}
                    width={200}
                    height={240}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {secili.yillar} · {secili.baslik}
                </p>
                <h4 className="mt-1 text-xl font-extrabold md:text-2xl">{secili.ad}</h4>
                <p className="mt-2 rounded-lg bg-[var(--color-bg-secondary)] p-2 text-sm italic text-[var(--color-text)]">
                  💬 {secili.alinti}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {secili.ayrinti.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 text-center text-sm text-[var(--color-text-secondary)]">
          👆 Bir öncünün kartına tıkla, detaylarını oku
        </div>
      )}

      {/* Mini eşleştirme quiz */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold">🎯 Hangi öncü?</h4>
          {kontrol && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                dogruSayisi === QUIZ.length
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              }`}
            >
              {dogruSayisi}/{QUIZ.length}
            </span>
          )}
        </div>
        <div className="space-y-2">
          {QUIZ.map((q, i) => (
            <div key={i} className="rounded-lg bg-[var(--color-bg)] p-3">
              <p className="mb-2 text-xs text-[var(--color-text)]">{q.soru}</p>
              <div className="flex flex-wrap gap-1.5">
                {ONCULER.map((o) => {
                  const seciliYanit = quizCevaplar[i] === o.id;
                  const dogru = kontrol && q.dogruOncu === o.id;
                  const yanlis = kontrol && seciliYanit && q.dogruOncu !== o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => cevapla(i, o.id)}
                      className={`cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                        dogru
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : yanlis
                          ? "border-rose-500 bg-rose-500 text-white"
                          : seciliYanit
                          ? "border-sky-500 bg-sky-500 text-white"
                          : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:border-sky-300"
                      }`}
                      disabled={kontrol}
                    >
                      {o.ad.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          {!kontrol ? (
            <button
              type="button"
              onClick={() => setKontrol(true)}
              disabled={!tumCevaplandi}
              className={`rounded-lg px-4 py-1.5 text-sm font-bold text-white transition ${
                tumCevaplandi
                  ? "cursor-pointer bg-sky-600 hover:bg-sky-700"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Kontrol Et
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setKontrol(false);
                setQuizCevaplar({});
              }}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Tekrar Dene
            </button>
          )}
          {!kontrol && !tumCevaplandi && (
            <span className="self-center text-xs text-[var(--color-text-secondary)]">
              {Object.keys(quizCevaplar).length}/{QUIZ.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
