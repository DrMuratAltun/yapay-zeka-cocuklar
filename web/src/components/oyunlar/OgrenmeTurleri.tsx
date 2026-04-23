"use client";

import { useMemo, useState } from "react";

/**
 * Öğrenme Türleri Sıralayıcı
 * Öğrenciler 12 gerçek problemi 3 kategoriden birine sürükler:
 * - Denetimli (Supervised): Etiketli veriyle öğrenme
 * - Denetimsiz (Unsupervised): Etiketsiz veride örüntü bulma
 * - Pekiştirmeli (Reinforcement): Ödül-ceza ile öğrenme
 */

type Tur = "denetimli" | "denetimsiz" | "pekistirmeli";

type Problem = {
  id: string;
  metin: string;
  emoji: string;
  dogruTur: Tur;
  aciklama: string;
};

const PROBLEMLER: Problem[] = [
  {
    id: "p1",
    metin: "E-postaları 'spam' veya 'normal' olarak sınıflandırmak",
    emoji: "📧",
    dogruTur: "denetimli",
    aciklama: "Önceden 'spam' ve 'normal' olarak etiketli e-postalarla model eğitilir. Bu tam olarak etiketli veriyle öğrenmedir.",
  },
  {
    id: "p2",
    metin: "Satranç öğrenen bir YZ: her galibiyette +1 puan",
    emoji: "♟️",
    dogruTur: "pekistirmeli",
    aciklama: "YZ oyun oynar, kazanınca ödül (+1), kaybedince ceza alır. Deneme-yanılma yoluyla öğrenir.",
  },
  {
    id: "p3",
    metin: "Müşterileri alışveriş alışkanlıklarına göre gruplara ayırmak",
    emoji: "🛒",
    dogruTur: "denetimsiz",
    aciklama: "Hangi grubun kim olduğunu önceden söylemiyoruz. YZ kendi başına benzer müşterileri gruplar (kümeleme).",
  },
  {
    id: "p4",
    metin: "Kedi ve köpek fotoğraflarını ayırt etmek",
    emoji: "🐱",
    dogruTur: "denetimli",
    aciklama: "Her fotoğraf önceden 'kedi' veya 'köpek' olarak etiketlenmiştir. Etiketli veri = denetimli öğrenme.",
  },
  {
    id: "p5",
    metin: "Robot süpürgenin evde dolaşmayı öğrenmesi",
    emoji: "🤖",
    dogruTur: "pekistirmeli",
    aciklama: "Duvara çarpınca ceza, tozu çekince ödül. Robot zamanla nereye gideceğini öğrenir.",
  },
  {
    id: "p6",
    metin: "Sosyal medyada benzer içerikleri keşfetmek",
    emoji: "🔍",
    dogruTur: "denetimsiz",
    aciklama: "İçeriklere kategori etiketi verilmemiştir. YZ benzer olanları bulup önerir (kümeleme).",
  },
  {
    id: "p7",
    metin: "Bir evin fiyatını özelliklerine göre tahmin etmek",
    emoji: "🏠",
    dogruTur: "denetimli",
    aciklama: "Geçmiş ev satışlarında özellikler + fiyat bilgisi var. Model bu eşleştirmelerden öğrenir.",
  },
  {
    id: "p8",
    metin: "YZ aracı kendi başına park etmeyi öğrenir — çarparsa ceza",
    emoji: "🚗",
    dogruTur: "pekistirmeli",
    aciklama: "Deneme-yanılma. Başarılı park = ödül, çarpma = ceza. Zamanla optimal davranışı öğrenir.",
  },
  {
    id: "p9",
    metin: "Bir gen veri tabanında beklenmedik benzerlikler keşfetmek",
    emoji: "🧬",
    dogruTur: "denetimsiz",
    aciklama: "Veri etiketsiz. YZ örüntüleri ve aykırı değerleri kendi keşfeder.",
  },
  {
    id: "p10",
    metin: "Hastanın röntgeninde tümör var mı yok mu tespiti",
    emoji: "🏥",
    dogruTur: "denetimli",
    aciklama: "Doktorlar röntgenleri önceden 'tümör var/yok' diye etiketlemiştir. Model bu etiketlerden öğrenir.",
  },
  {
    id: "p11",
    metin: "AlphaGo'nun Go oyununu dünya şampiyonu seviyesinde oynaması",
    emoji: "⚫",
    dogruTur: "pekistirmeli",
    aciklama: "AlphaGo kendi kendine milyonlarca oyun oynadı. Galibiyet=ödül, yenilgi=ceza. Efsanevi bir pekiştirmeli öğrenme örneği.",
  },
  {
    id: "p12",
    metin: "Haber makalelerini konularına göre otomatik gruplamak",
    emoji: "📰",
    dogruTur: "denetimsiz",
    aciklama: "Kategoriler önceden tanımlı değil. YZ benzer haberleri kendi bulup kümeler.",
  },
];

const TURLER: Record<
  Tur,
  { ad: string; emoji: string; aciklama: string; renk: string; bgRenk: string; borderRenk: string }
> = {
  denetimli: {
    ad: "Denetimli Öğrenme",
    emoji: "🏷️",
    aciklama: "Etiketli veri ile eğitilir (girdi + doğru cevap)",
    renk: "text-sky-700 dark:text-sky-300",
    bgRenk: "bg-sky-50 dark:bg-sky-900/20",
    borderRenk: "border-sky-400",
  },
  denetimsiz: {
    ad: "Denetimsiz Öğrenme",
    emoji: "🔍",
    aciklama: "Etiketsiz veride örüntü/grup bulur",
    renk: "text-violet-700 dark:text-violet-300",
    bgRenk: "bg-violet-50 dark:bg-violet-900/20",
    borderRenk: "border-violet-400",
  },
  pekistirmeli: {
    ad: "Pekiştirmeli Öğrenme",
    emoji: "🎯",
    aciklama: "Ödül-ceza ile deneme-yanılma yoluyla öğrenir",
    renk: "text-amber-700 dark:text-amber-300",
    bgRenk: "bg-amber-50 dark:bg-amber-900/20",
    borderRenk: "border-amber-400",
  },
};

export default function OgrenmeTurleri() {
  // Her problem hangi türe yerleştirildi? null = henüz yerleştirilmemiş
  const [yerlesimler, setYerlesimler] = useState<Record<string, Tur | null>>(
    () => Object.fromEntries(PROBLEMLER.map((p) => [p.id, null])) as Record<string, Tur | null>
  );
  const [kontrolEdildi, setKontrolEdildi] = useState(false);
  const [suruklenen, setSuruklenen] = useState<string | null>(null);

  const yerlesenler = useMemo(() => {
    const sonuc: Record<Tur, Problem[]> = {
      denetimli: [],
      denetimsiz: [],
      pekistirmeli: [],
    };
    for (const p of PROBLEMLER) {
      const t = yerlesimler[p.id];
      if (t) sonuc[t].push(p);
    }
    return sonuc;
  }, [yerlesimler]);

  const bekleyenler = useMemo(
    () => PROBLEMLER.filter((p) => yerlesimler[p.id] === null),
    [yerlesimler]
  );

  function yerlestir(problemId: string, tur: Tur) {
    setYerlesimler((prev) => ({ ...prev, [problemId]: tur }));
    setKontrolEdildi(false);
  }

  function geriGonder(problemId: string) {
    setYerlesimler((prev) => ({ ...prev, [problemId]: null }));
    setKontrolEdildi(false);
  }

  function kontrolEt() {
    setKontrolEdildi(true);
  }

  function sifirla() {
    setYerlesimler(
      Object.fromEntries(PROBLEMLER.map((p) => [p.id, null])) as Record<string, Tur | null>
    );
    setKontrolEdildi(false);
  }

  const dogruSayisi = PROBLEMLER.filter(
    (p) => yerlesimler[p.id] === p.dogruTur
  ).length;
  const yerlesenSayisi = PROBLEMLER.length - bekleyenler.length;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-xl font-extrabold">🎓 Öğrenme Türleri Sıralayıcı</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Her problemi doğru öğrenme türüne sürükle (veya tıkla-seç)!
        </p>
      </div>

      {/* İlerleme */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-amber-400 transition-all"
            style={{ width: `${(yerlesenSayisi / PROBLEMLER.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-[var(--color-text-secondary)]">
          {yerlesenSayisi}/{PROBLEMLER.length}
        </span>
      </div>

      {/* Bekleyen problem kartları */}
      {bekleyenler.length > 0 && (
        <div className="mb-5 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Sıradaki Problemler
          </p>
          <div className="flex flex-wrap gap-2">
            {bekleyenler.map((p) => (
              <div
                key={p.id}
                draggable
                onDragStart={() => setSuruklenen(p.id)}
                onDragEnd={() => setSuruklenen(null)}
                className={`cursor-move select-none rounded-lg border-2 bg-white px-3 py-2 text-sm shadow-sm transition dark:bg-slate-900 ${
                  suruklenen === p.id
                    ? "border-sky-400 opacity-50"
                    : "border-[var(--color-border)] hover:border-sky-300"
                }`}
              >
                <span className="mr-2 text-base" aria-hidden="true">
                  {p.emoji}
                </span>
                <span className="text-[var(--color-text)]">{p.metin}</span>
                {/* Tıkla-seç alternatifi */}
                <div className="mt-1.5 flex gap-1">
                  {(["denetimli", "denetimsiz", "pekistirmeli"] as Tur[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => yerlestir(p.id, t)}
                      className="cursor-pointer rounded px-1.5 py-0.5 text-[10px] font-bold transition hover:opacity-80"
                      style={{
                        backgroundColor:
                          t === "denetimli"
                            ? "#0ea5e9"
                            : t === "denetimsiz"
                            ? "#8b5cf6"
                            : "#f59e0b",
                        color: "white",
                      }}
                      aria-label={`${p.metin} → ${TURLER[t].ad}`}
                    >
                      {TURLER[t].emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 kategori kutusu */}
      <div className="grid gap-3 md:grid-cols-3">
        {(["denetimli", "denetimsiz", "pekistirmeli"] as Tur[]).map((tur) => {
          const meta = TURLER[tur];
          const items = yerlesenler[tur];
          return (
            <div
              key={tur}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (suruklenen) {
                  yerlestir(suruklenen, tur);
                  setSuruklenen(null);
                }
              }}
              className={`rounded-xl border-2 ${meta.borderRenk} ${meta.bgRenk} p-3`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {meta.emoji}
                </span>
                <div>
                  <h4 className={`text-sm font-bold ${meta.renk}`}>{meta.ad}</h4>
                  <p className="text-[10px] text-[var(--color-text-secondary)]">
                    {meta.aciklama}
                  </p>
                </div>
              </div>
              <div className="min-h-[120px] space-y-1.5">
                {items.length === 0 ? (
                  <p className="text-center text-xs italic text-[var(--color-text-secondary)] py-8">
                    Buraya bırak
                  </p>
                ) : (
                  items.map((p) => {
                    const dogruMu = kontrolEdildi && p.dogruTur === tur;
                    const yanlisMi = kontrolEdildi && p.dogruTur !== tur;
                    return (
                      <div
                        key={p.id}
                        className={`group relative rounded-md border p-2 text-xs shadow-sm transition ${
                          kontrolEdildi
                            ? dogruMu
                              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                              : "border-rose-400 bg-rose-50 dark:bg-rose-900/30"
                            : "border-[var(--color-border)] bg-white dark:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span aria-hidden="true">{p.emoji}</span>
                          <span className="flex-1 text-[var(--color-text)]">{p.metin}</span>
                          {kontrolEdildi && dogruMu && (
                            <span className="text-emerald-600">✓</span>
                          )}
                          {kontrolEdildi && yanlisMi && (
                            <span className="text-rose-600">✗</span>
                          )}
                          {!kontrolEdildi && (
                            <button
                              type="button"
                              onClick={() => geriGonder(p.id)}
                              className="cursor-pointer text-[var(--color-text-secondary)] opacity-60 hover:text-rose-600 hover:opacity-100"
                              aria-label="Geri al"
                            >
                              ↩
                            </button>
                          )}
                        </div>
                        {kontrolEdildi && yanlisMi && (
                          <p className="mt-1.5 rounded bg-white/60 p-1.5 text-[10px] italic text-[var(--color-text)] dark:bg-slate-900/60">
                            Doğrusu: <strong>{TURLER[p.dogruTur].ad}</strong> — {p.aciklama}
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Eylemler */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!kontrolEdildi ? (
          <button
            type="button"
            onClick={kontrolEt}
            disabled={bekleyenler.length > 0}
            className={`rounded-lg px-6 py-2.5 text-sm font-bold text-white transition ${
              bekleyenler.length > 0
                ? "cursor-not-allowed bg-gray-300"
                : "cursor-pointer bg-sky-600 hover:bg-sky-700"
            }`}
          >
            Kontrol Et
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                dogruSayisi === PROBLEMLER.length
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : dogruSayisi >= PROBLEMLER.length * 0.7
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              }`}
            >
              {dogruSayisi} / {PROBLEMLER.length} doğru
            </div>
            <button
              type="button"
              onClick={sifirla}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Tekrar Dene
            </button>
          </div>
        )}
        {bekleyenler.length > 0 && !kontrolEdildi && (
          <span className="text-xs text-[var(--color-text-secondary)]">
            Tüm problemleri yerleştir ({yerlesenSayisi}/{PROBLEMLER.length})
          </span>
        )}
      </div>

      {/* Özet kutu */}
      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <div className="rounded-lg border-l-4 border-sky-400 bg-sky-50 p-2 dark:bg-sky-900/20">
          <strong className="text-sky-700 dark:text-sky-300">🏷️ Denetimli:</strong> Giriş + doğru
          cevap var. &quot;Bu elma&quot;, &quot;Bu portakal&quot;.
        </div>
        <div className="rounded-lg border-l-4 border-violet-400 bg-violet-50 p-2 dark:bg-violet-900/20">
          <strong className="text-violet-700 dark:text-violet-300">🔍 Denetimsiz:</strong> Sadece
          giriş. &quot;Bu meyveleri benzerlerine göre grupla&quot;.
        </div>
        <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-2 dark:bg-amber-900/20">
          <strong className="text-amber-700 dark:text-amber-300">🎯 Pekiştirmeli:</strong> Ödül-ceza.
          &quot;Bu yol iyi, bu kötü — öğren!&quot;
        </div>
      </div>
    </div>
  );
}
