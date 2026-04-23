"use client";

import { useEffect, useState } from "react";

/**
 * Tarihçe Zaman Makinesi
 * Yatay, interaktif zaman çizelgesi.
 * - Olayları tıkla → ayrıntı paneli açılır
 * - Oynat → olaylar sırayla vurgulanır
 * - Klavye ok tuşları ile gezinme
 */

type Olay = {
  yil: number;
  baslik: string;
  emoji: string;
  kisa: string;
  detay: string;
  kategori: "teori" | "gerilim" | "atilim" | "modern";
  onemi: "orta" | "yuksek" | "devrim";
};

const OLAYLAR: Olay[] = [
  {
    yil: 1642,
    baslik: "İlk mekanik hesap makinesi",
    emoji: "⚙️",
    kisa: "Pascal, vergi hesaplaması için 'Pascaline'i yaptı.",
    detay: "19 yaşındaki Blaise Pascal, babasının vergi hesaplama işini kolaylaştırmak için tekerleklerden oluşan mekanik hesap makinesi icat etti. Bu makine 'düşünen makine' fikrinin ilk somut örneğiydi.",
    kategori: "teori",
    onemi: "orta",
  },
  {
    yil: 1843,
    baslik: "İlk bilgisayar algoritması",
    emoji: "📜",
    kisa: "Ada Lovelace, Babbage'ın motoru için ilk programı yazdı.",
    detay: "Ada Lovelace, Charles Babbage'ın Analitik Motor'u için Bernoulli sayılarını hesaplayan bir algoritma tasarladı. Bu tarihteki ilk bilgisayar programı olarak kabul edilir. Ayrıca makinelerin bir gün müzik ve sanat üretebileceğini öngördü.",
    kategori: "teori",
    onemi: "yuksek",
  },
  {
    yil: 1950,
    baslik: "Turing Testi önerildi",
    emoji: "🧪",
    kisa: "Alan Turing: 'Makineler düşünebilir mi?'",
    detay: "Alan Turing, 'Computing Machinery and Intelligence' makalesinde bir makinenin zeki olup olmadığını ölçmek için ünlü Turing Testi'ni önerdi: Bir insan sohbet ettiği tarafın insan mı makine mi olduğunu ayırt edemiyorsa, o makine 'düşünüyor' sayılır.",
    kategori: "teori",
    onemi: "devrim",
  },
  {
    yil: 1956,
    baslik: "'Yapay Zeka' terimi doğdu",
    emoji: "🎓",
    kisa: "Dartmouth Konferansı'nda McCarthy terimi icat etti.",
    detay: "John McCarthy, Marvin Minsky, Claude Shannon ve Nathaniel Rochester'ın düzenlediği 2 aylık Dartmouth Yaz Çalıştayı'nda 'Artificial Intelligence' terimi ilk kez kullanıldı. Bu, YZ'nin resmi doğum günü kabul edilir.",
    kategori: "teori",
    onemi: "devrim",
  },
  {
    yil: 1959,
    baslik: "Cahit Arf'ın çalışması",
    emoji: "🇹🇷",
    kisa: "'Makineler düşünebilir mi ve nasıl?' makalesi.",
    detay: "Türk matematikçi Cahit Arf, Erzurum Atatürk Üniversitesi'nde verdiği konferansta makinelerin düşünme kapasitesi üzerine erken ve derin bir makale yayımladı. Türkiye'nin YZ tarihindeki en önemli ismidir.",
    kategori: "teori",
    onemi: "yuksek",
  },
  {
    yil: 1965,
    baslik: "ELIZA — ilk sohbet robotu",
    emoji: "💬",
    kisa: "Weizenbaum, basit kurallarla 'psikolog' yaptı.",
    detay: "Joseph Weizenbaum'un ELIZA'sı basit metin eşleştirme ile psikoterapist taklidi yapıyordu. İnsanların ona duygusal bağlanması, 'ELIZA etkisi' adını verdiği önemli bir gözleme yol açtı.",
    kategori: "atilim",
    onemi: "yuksek",
  },
  {
    yil: 1974,
    baslik: "İlk YZ Kışı başladı",
    emoji: "❄️",
    kisa: "Beklentiler karşılanmadı, finansman kesildi.",
    detay: "Abartılı sözler ve hayal kırıklığı üreten sonuçlar nedeniyle YZ araştırmalarına fonlar ciddi biçimde azaltıldı. 'AI Winter' (YZ Kışı) tabiri literatüre girdi. 1980-1987 arası kısa bir bahar, sonra yeniden kış yaşandı.",
    kategori: "gerilim",
    onemi: "orta",
  },
  {
    yil: 1997,
    baslik: "Deep Blue, Kasparov'u yendi",
    emoji: "♟️",
    kisa: "IBM'in satranç bilgisayarı dünya şampiyonunu devirdi.",
    detay: "IBM'in Deep Blue sistemi, 2 maçlık rövanşta dünya satranç şampiyonu Garry Kasparov'u 3½-2½ yendi. Bu, bir makinenin entelektüel bir oyunda insan şampiyonunu ilk yenişiydi. Tabii, Deep Blue 'düşünmüyor' — sadece dakikada 200 milyon pozisyon değerlendiriyordu.",
    kategori: "atilim",
    onemi: "devrim",
  },
  {
    yil: 2011,
    baslik: "Siri ve sesli asistanlar",
    emoji: "🎙️",
    kisa: "YZ cebinize girdi.",
    detay: "Apple, Siri'yi iPhone 4S ile tanıttı. Daha sonra Google Assistant, Amazon Alexa ve Microsoft Cortana geldi. Doğal dil işleme ilk kez yüz milyonlarca kişinin günlük hayatına doğrudan girdi.",
    kategori: "modern",
    onemi: "yuksek",
  },
  {
    yil: 2012,
    baslik: "Derin Öğrenme devrimi",
    emoji: "🧠",
    kisa: "AlexNet, görüntü tanımada devrim yarattı.",
    detay: "Toronto Üniversitesi'nden Geoffrey Hinton ve ekibinin geliştirdiği AlexNet, ImageNet yarışmasında rakiplerini ezip geçti. Bu an, derin öğrenmenin modern YZ'nin motoru haline geldiği noktadır.",
    kategori: "modern",
    onemi: "devrim",
  },
  {
    yil: 2016,
    baslik: "AlphaGo, Go şampiyonunu yendi",
    emoji: "⚫",
    kisa: "DeepMind'ın YZ'si imkansız denen zaferi kazandı.",
    detay: "Go oyunu, satrançtan 10^100 kat daha karmaşık. Uzmanlar makinelerin Go'yu yenmesinin 10 yıl daha alacağını söylüyordu. AlphaGo, dünya şampiyonu Lee Sedol'u 4-1 yendi. '37. hamle' (Move 37) YZ tarihine geçti — hiçbir insan oynamazdı, ama dahiceydi.",
    kategori: "modern",
    onemi: "devrim",
  },
  {
    yil: 2022,
    baslik: "ChatGPT — Üretken YZ çağı",
    emoji: "✨",
    kisa: "5 günde 1 milyon, 2 ayda 100 milyon kullanıcı.",
    detay: "OpenAI, ChatGPT'yi 30 Kasım 2022'de kamuya açtı. Tarihte hiçbir tüketici ürünü bu hızla büyümedi. Bugün milyarlarca insan YZ ile doğrudan konuşuyor, yazıyor, öğreniyor. YZ artık bir laboratuvar konusu değil — günlük hayatın parçası.",
    kategori: "modern",
    onemi: "devrim",
  },
];

const KATEGORI_RENK: Record<Olay["kategori"], string> = {
  teori: "#8b5cf6",
  gerilim: "#64748b",
  atilim: "#f59e0b",
  modern: "#10b981",
};

const KATEGORI_AD: Record<Olay["kategori"], string> = {
  teori: "Teori",
  gerilim: "Gerileme",
  atilim: "Atılım",
  modern: "Modern Çağ",
};

export default function TarihceZamanMakinesi() {
  const [seciliIdx, setSeciliIdx] = useState(0);
  const [oynat, setOynat] = useState(false);

  useEffect(() => {
    if (!oynat) return;
    const t = setInterval(() => {
      setSeciliIdx((i) => {
        if (i >= OLAYLAR.length - 1) {
          setOynat(false);
          return i;
        }
        return i + 1;
      });
    }, 2200);
    return () => clearInterval(t);
  }, [oynat]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight" && seciliIdx < OLAYLAR.length - 1) {
        setSeciliIdx((i) => i + 1);
      } else if (e.key === "ArrowLeft" && seciliIdx > 0) {
        setSeciliIdx((i) => i - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [seciliIdx]);

  const secili = OLAYLAR[seciliIdx];
  const ilerleme = ((seciliIdx + 1) / OLAYLAR.length) * 100;

  const yilMin = OLAYLAR[0].yil;
  const yilMax = OLAYLAR[OLAYLAR.length - 1].yil;

  return (
    <div className="space-y-4">
      {/* Üst kontrol barı */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3">
        <button
          type="button"
          onClick={() => setOynat((v) => !v)}
          className="cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700"
          aria-label={oynat ? "Durdur" : "Oynat"}
        >
          {oynat ? "⏸ Durdur" : "▶ Oynat"}
        </button>
        <button
          type="button"
          onClick={() => setSeciliIdx(0)}
          className="cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm font-medium transition hover:bg-[var(--color-bg-secondary)]"
        >
          ⏮ Baştan
        </button>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
          <kbd className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 border border-[var(--color-border)]">←</kbd>
          <kbd className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 border border-[var(--color-border)]">→</kbd>
          <span>ile gezin</span>
        </div>
        <span className="ml-auto text-xs font-bold text-[var(--color-text-secondary)]">
          {seciliIdx + 1} / {OLAYLAR.length}
        </span>
      </div>

      {/* Yatay zaman çizelgesi — SVG */}
      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-slate-50 to-sky-50 p-4 dark:from-slate-950 dark:to-sky-950/40">
        <svg viewBox="0 0 900 170" className="mx-auto h-auto w-full min-w-[700px]">
          {/* Ana çizgi */}
          <line x1="30" y1="105" x2="870" y2="105" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          {/* İlerleme çizgisi */}
          <line
            x1="30"
            y1="105"
            x2={30 + (840 * ilerleme) / 100}
            y2="105"
            stroke="url(#tm-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ transition: "all 0.4s ease" }}
          />
          <defs>
            <linearGradient id="tm-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Olay noktaları */}
          {OLAYLAR.map((o, i) => {
            const yilOran = (o.yil - yilMin) / (yilMax - yilMin);
            const x = 30 + yilOran * 840;
            const aktif = i === seciliIdx;
            const r = aktif ? 18 : o.onemi === "devrim" ? 12 : o.onemi === "yuksek" ? 9 : 7;
            const renk = KATEGORI_RENK[o.kategori];
            return (
              <g key={o.yil} style={{ cursor: "pointer" }} onClick={() => setSeciliIdx(i)}>
                {/* Halka (aktif) */}
                {aktif && (
                  <circle cx={x} cy={105} r={r + 6} fill="none" stroke={renk} strokeWidth="2" strokeOpacity="0.4">
                    <animate attributeName="r" values={`${r + 3};${r + 10};${r + 3}`} dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={x} cy={105} r={r} fill={renk} stroke="white" strokeWidth="2" />
                <text x={x} y={108} textAnchor="middle" fontSize={aktif ? 14 : 9} fontWeight="700" fill="white">
                  {o.emoji}
                </text>
                {/* Yıl etiketi */}
                <text
                  x={x}
                  y={i % 2 === 0 ? 80 : 140}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={aktif ? "800" : "600"}
                  fill={aktif ? renk : "#64748b"}
                >
                  {o.yil}
                </text>
                {/* Başlık kısa (sadece aktifte ya da önemli) */}
                {(aktif || o.onemi === "devrim") && (
                  <text
                    x={x}
                    y={i % 2 === 0 ? 65 : 155}
                    textAnchor="middle"
                    fontSize="9"
                    fill={aktif ? "#0f172a" : "#475569"}
                    fontWeight="600"
                  >
                    {o.baslik.length > 22 ? o.baslik.slice(0, 20) + "…" : o.baslik}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Lejand */}
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
          {(Object.keys(KATEGORI_RENK) as Olay["kategori"][]).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: KATEGORI_RENK[k] }}
              />
              {KATEGORI_AD[k]}
            </span>
          ))}
        </div>
      </div>

      {/* Seçili olay detay paneli */}
      <div
        className="overflow-hidden rounded-2xl border-2 p-5 transition-colors"
        style={{
          borderColor: KATEGORI_RENK[secili.kategori],
          backgroundColor: `${KATEGORI_RENK[secili.kategori]}0f`,
        }}
      >
        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <span
            className="rounded-full px-3 py-1 text-sm font-extrabold text-white shadow-lg"
            style={{ backgroundColor: KATEGORI_RENK[secili.kategori] }}
          >
            {secili.yil}
          </span>
          <h4 className="text-lg font-extrabold md:text-xl">
            <span className="mr-2" aria-hidden="true">{secili.emoji}</span>
            {secili.baslik}
          </h4>
          <span className="ml-auto rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
            {KATEGORI_AD[secili.kategori]}
          </span>
        </div>
        <p className="mb-2 text-sm font-semibold text-[var(--color-text)]">{secili.kisa}</p>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{secili.detay}</p>

        {/* Prev/Next butonları */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSeciliIdx((i) => Math.max(0, i - 1))}
            disabled={seciliIdx === 0}
            className="cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-medium transition hover:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Önceki
          </button>
          <div className="h-1 flex-1 mx-4 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${ilerleme}%`, backgroundColor: KATEGORI_RENK[secili.kategori] }}
            />
          </div>
          <button
            type="button"
            onClick={() => setSeciliIdx((i) => Math.min(OLAYLAR.length - 1, i + 1))}
            disabled={seciliIdx === OLAYLAR.length - 1}
            className="cursor-pointer rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </div>
  );
}
