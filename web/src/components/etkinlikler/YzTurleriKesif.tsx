"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * YZ Türleri Keşif
 * - 3 kart (Dar / Genel / Süper) → tıkla, detay açılır
 * - Türkçe YZ-ML-DL diyagramı (özgün SVG)
 * - Senaryo sıralayıcı: 6 örnek, hangisi hangi türde?
 */

type Tur = "dar" | "genel" | "super";

type TurMeta = {
  ad: string;
  kisa: string;
  emoji: string;
  renk: string;
  bgRenk: string;
  ingilizce: string;
  tanim: string;
  ornekler: string[];
  durum: string;
};

const TURLER: Record<Tur, TurMeta> = {
  dar: {
    ad: "Dar YZ",
    kisa: "Tek görev ustası",
    emoji: "🎯",
    renk: "#10b981",
    bgRenk: "bg-emerald-50 dark:bg-emerald-900/20",
    ingilizce: "Narrow / Weak AI",
    tanim:
      "Sadece belirli bir görevi yapmak üzere tasarlanmıştır. O görevde uzman, başka bir şeyde değildir. Bugün kullandığımız TÜM YZ bu kategoridedir.",
    ornekler: ["Siri & Alexa", "Netflix önerisi", "Yüz tanıma", "Satranç motoru", "ChatGPT", "Spam filtresi"],
    durum: "BUGÜN KULLANILAN TÜM YZ",
  },
  genel: {
    ad: "Genel YZ",
    kisa: "İnsan seviyesinde",
    emoji: "🧠",
    renk: "#f59e0b",
    bgRenk: "bg-amber-50 dark:bg-amber-900/20",
    ingilizce: "AGI — Artificial General Intelligence",
    tanim:
      "Bir insanın yapabileceği her zihinsel görevi yapabilen YZ. Öğrenir, yaratır, başka alanlara uyum sağlar. Henüz mevcut değil — araştırma aşamasında.",
    ornekler: ["Filmlerdeki Jarvis", "Star Wars'tan C-3PO", "'Her' filmindeki Samantha"],
    durum: "ARAŞTIRMA AŞAMASINDA",
  },
  super: {
    ad: "Süper YZ",
    kisa: "İnsandan çok üstün",
    emoji: "🌌",
    renk: "#e11d48",
    bgRenk: "bg-rose-50 dark:bg-rose-900/20",
    ingilizce: "ASI — Artificial Super Intelligence",
    tanim:
      "Her alanda insandan çok daha zeki olacak hipotetik YZ. Bilim, sanat, sosyal becerilerde insanı aşacak. Şu an tamamen teorik; etik tartışmaların merkezinde.",
    ornekler: ["Terminator'un Skynet'i", "Ex Machina'nın Ava'sı", "Matrix'in Mimar'ı"],
    durum: "TEORİK / BİLİM KURGU",
  },
};

type Senaryo = {
  id: string;
  metin: string;
  emoji: string;
  dogruTur: Tur;
  aciklama: string;
};

const SENARYOLAR: Senaryo[] = [
  {
    id: "s1",
    metin: "Telefonunun yüz tanıma kilidi",
    emoji: "📱",
    dogruTur: "dar",
    aciklama: "Sadece yüz eşleştirme yapar, başka bir şey bilmez. Bu Dar YZ.",
  },
  {
    id: "s2",
    metin: "Hem resim yapan hem roman yazan hem doktorluk eden tek YZ",
    emoji: "🎨",
    dogruTur: "genel",
    aciklama: "Her alanda insan seviyesinde başarılı olan YZ = Genel YZ (henüz yok).",
  },
  {
    id: "s3",
    metin: "ChatGPT sohbet ederken",
    emoji: "💬",
    dogruTur: "dar",
    aciklama: "Etkileyici olsa da ChatGPT sadece metin üretmede uzman — Dar YZ.",
  },
  {
    id: "s4",
    metin: "Dünyadaki tüm bilim insanlarından daha iyi keşif yapabilen makine",
    emoji: "🌌",
    dogruTur: "super",
    aciklama: "İnsanı her alanda aşan YZ = Süper YZ (teorik).",
  },
  {
    id: "s5",
    metin: "Netflix'in film önerisi algoritması",
    emoji: "🎬",
    dogruTur: "dar",
    aciklama: "Sadece izleme verinden öneri üretir. Başka şey yapamaz — Dar YZ.",
  },
  {
    id: "s6",
    metin: "İnsan gibi duyguları olan, merak eden, hayal kuran robot",
    emoji: "🤖",
    dogruTur: "genel",
    aciklama: "Çok yönlü, adaptif, insan benzeri bir bilinç = Genel YZ.",
  },
];

export default function YzTurleriKesif() {
  const [aktifTur, setAktifTur] = useState<Tur>("dar");
  const [senaryoCevaplar, setSenaryoCevaplar] = useState<Record<string, Tur>>({});
  const [kontrol, setKontrol] = useState(false);

  const dogruSayisi = SENARYOLAR.filter((s) => senaryoCevaplar[s.id] === s.dogruTur).length;
  const tumCevaplandi = Object.keys(senaryoCevaplar).length === SENARYOLAR.length;

  function cevapla(senaryoId: string, tur: Tur) {
    if (kontrol) return;
    setSenaryoCevaplar((p) => ({ ...p, [senaryoId]: tur }));
  }

  const meta = TURLER[aktifTur];

  return (
    <div className="space-y-4">
      {/* 3 Tür Sekmeleri */}
      <div className="grid gap-3 grid-cols-3">
        {(Object.keys(TURLER) as Tur[]).map((t) => {
          const m = TURLER[t];
          const aktif = aktifTur === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setAktifTur(t)}
              className={`cursor-pointer rounded-xl border-2 p-3 text-left transition-all ${
                aktif
                  ? "shadow-xl -translate-y-1"
                  : "border-[var(--color-border)] bg-[var(--color-bg)] hover:-translate-y-0.5 hover:shadow-md"
              }`}
              style={aktif ? { borderColor: m.renk, backgroundColor: `${m.renk}14` } : {}}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {m.emoji}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: m.renk }}>
                    {m.ad}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{m.kisa}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Seçili tür detayı */}
      <div
        className="rounded-2xl border-2 p-5"
        style={{ borderColor: meta.renk, backgroundColor: `${meta.renk}0d` }}
      >
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-[var(--color-text-secondary)]">{meta.ingilizce}</p>
            <h4 className="text-lg font-extrabold md:text-xl" style={{ color: meta.renk }}>
              {meta.emoji} {meta.ad}
            </h4>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow"
            style={{ backgroundColor: meta.renk }}
          >
            {meta.durum}
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-[var(--color-text)]">{meta.tanim}</p>
        <div className="flex flex-wrap gap-1.5">
          {meta.ornekler.map((o) => (
            <span
              key={o}
              className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
              style={{ borderColor: meta.renk, color: meta.renk }}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* Türkçe Venn Diyagramı — özgün */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]">
        <Image
          src="/images/illustrasyonlar/yz-ml-dl-turkce.svg"
          alt="YZ, Makine Öğrenmesi ve Derin Öğrenme Venn diyagramı (Türkçe)"
          width={800}
          height={680}
          className="h-auto w-full"
        />
      </div>

      {/* Senaryo sıralayıcı */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold">🧩 Hangi tür YZ?</h4>
          {kontrol && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                dogruSayisi === SENARYOLAR.length
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
              }`}
            >
              {dogruSayisi}/{SENARYOLAR.length}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {SENARYOLAR.map((s) => {
            const secili = senaryoCevaplar[s.id];
            const dogruMu = kontrol && secili === s.dogruTur;
            const yanlisMi = kontrol && secili && secili !== s.dogruTur;
            return (
              <div
                key={s.id}
                className={`rounded-lg border-2 p-2.5 transition ${
                  dogruMu
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                    : yanlisMi
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                    : "border-[var(--color-border)] bg-[var(--color-bg)]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">{s.emoji}</span>
                  <p className="flex-1 text-xs sm:text-sm">{s.metin}</p>
                  <div className="flex gap-1">
                    {(["dar", "genel", "super"] as Tur[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => cevapla(s.id, t)}
                        className={`cursor-pointer rounded-md px-2 py-0.5 text-[10px] font-bold text-white transition ${
                          secili === t ? "ring-2 ring-offset-1" : ""
                        }`}
                        style={{
                          backgroundColor: TURLER[t].renk,
                          opacity: secili && secili !== t ? 0.4 : 1,
                        }}
                        disabled={kontrol}
                        aria-label={`${s.metin} = ${TURLER[t].ad}`}
                      >
                        {TURLER[t].emoji}
                      </button>
                    ))}
                  </div>
                </div>
                {kontrol && yanlisMi && (
                  <p className="mt-1.5 rounded bg-white/80 p-1.5 text-[11px] italic text-[var(--color-text)] dark:bg-slate-900/60">
                    Doğrusu: <strong>{TURLER[s.dogruTur].ad}</strong> — {s.aciklama}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex gap-2">
          {!kontrol ? (
            <button
              type="button"
              onClick={() => setKontrol(true)}
              disabled={!tumCevaplandi}
              className={`rounded-lg px-4 py-1.5 text-sm font-bold text-white transition ${
                tumCevaplandi ? "cursor-pointer bg-sky-600 hover:bg-sky-700" : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Kontrol Et
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setKontrol(false);
                setSenaryoCevaplar({});
              }}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Tekrar Dene
            </button>
          )}
          {!kontrol && !tumCevaplandi && (
            <span className="self-center text-xs text-[var(--color-text-secondary)]">
              {Object.keys(senaryoCevaplar).length}/{SENARYOLAR.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
