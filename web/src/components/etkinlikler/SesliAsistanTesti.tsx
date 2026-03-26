"use client";

import { useState, useCallback } from "react";

interface Gorev {
  id: number;
  komut: string;
  aciklama: string;
  emoji: string;
  sonuc: "basarili" | "kismen" | "basarisiz" | null;
  not: string;
}

const varsayilanGorevler: Gorev[] = [
  { id: 1, komut: "Bugün hava nasıl?", aciklama: "Hava durumu sorgusu", emoji: "🌤️", sonuc: null, not: "" },
  { id: 2, komut: "5 dakika sonraya alarm kur", aciklama: "Alarm kurma komutu", emoji: "⏰", sonuc: null, not: "" },
  { id: 3, komut: "Bir şarkı çal", aciklama: "Müzik çalma isteği", emoji: "🎵", sonuc: null, not: "" },
  { id: 4, komut: "247 çarpı 18 kaç eder?", aciklama: "Matematik hesaplama", emoji: "🔢", sonuc: null, not: "" },
  { id: 5, komut: "'Merhaba' İngilizce'ye çevir", aciklama: "Dil çevirisi", emoji: "🌍", sonuc: null, not: "" },
  { id: 6, komut: "Bana bir fıkra anlat", aciklama: "Eğlence / yaratıcılık", emoji: "😄", sonuc: null, not: "" },
  { id: 7, komut: "Bugün çok mutsuzum, ne yapmalıyım?", aciklama: "Duygusal destek sorusu", emoji: "😢", sonuc: null, not: "" },
  { id: 8, komut: "O şeyi aç", aciklama: "Belirsiz / muğlak komut", emoji: "❓", sonuc: null, not: "" },
];

const sonucRenkleri = {
  basarili: "bg-emerald-100 border-emerald-400 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-600 dark:text-emerald-300",
  kismen: "bg-amber-100 border-amber-400 text-amber-700 dark:bg-amber-900/30 dark:border-amber-600 dark:text-amber-300",
  basarisiz: "bg-rose-100 border-rose-400 text-rose-700 dark:bg-rose-900/30 dark:border-rose-600 dark:text-rose-300",
};

const sonucEtiketleri = {
  basarili: "Başarılı ✅",
  kismen: "Kısmen ⚠️",
  basarisiz: "Başarısız ❌",
};

export default function SesliAsistanTesti() {
  const [gorevler, setGorevler] = useState<Gorev[]>(varsayilanGorevler);
  const [aktifGorev, setAktifGorev] = useState(0);
  const [tamamlandi, setTamamlandi] = useState(false);

  const sonucSec = useCallback((sonuc: "basarili" | "kismen" | "basarisiz") => {
    setGorevler((prev) =>
      prev.map((g, i) => (i === aktifGorev ? { ...g, sonuc } : g))
    );
  }, [aktifGorev]);

  const notGuncelle = useCallback((not: string) => {
    setGorevler((prev) =>
      prev.map((g, i) => (i === aktifGorev ? { ...g, not } : g))
    );
  }, [aktifGorev]);

  const sonraki = useCallback(() => {
    if (aktifGorev < gorevler.length - 1) {
      setAktifGorev((a) => a + 1);
    } else {
      setTamamlandi(true);
    }
  }, [aktifGorev, gorevler.length]);

  const onceki = useCallback(() => {
    if (aktifGorev > 0) setAktifGorev((a) => a - 1);
  }, [aktifGorev]);

  const sifirla = useCallback(() => {
    setGorevler(varsayilanGorevler);
    setAktifGorev(0);
    setTamamlandi(false);
  }, []);

  const basariliSayisi = gorevler.filter((g) => g.sonuc === "basarili").length;
  const kismenSayisi = gorevler.filter((g) => g.sonuc === "kismen").length;
  const basarisizSayisi = gorevler.filter((g) => g.sonuc === "basarisiz").length;
  const degerlendirilenSayisi = gorevler.filter((g) => g.sonuc !== null).length;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">🎙️ Sesli Asistan Test Takipçisi</h3>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
          {degerlendirilenSayisi}/{gorevler.length} değerlendirildi
        </span>
      </div>

      {!tamamlandi ? (
        <>
          {/* İlerleme çubuğu */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{ width: `${((aktifGorev + 1) / gorevler.length) * 100}%` }}
            />
          </div>

          {/* Aktif görev */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{gorevler[aktifGorev].emoji}</span>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Görev {aktifGorev + 1}/{gorevler.length} &mdash; {gorevler[aktifGorev].aciklama}
                </p>
                <p className="text-lg font-bold">&ldquo;{gorevler[aktifGorev].komut}&rdquo;</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              Bu komutu sesli asistanına söyle ve sonucu değerlendir:
            </p>

            {/* Sonuç butonları */}
            <div className="mb-4 flex flex-wrap gap-2">
              {(["basarili", "kismen", "basarisiz"] as const).map((sonuc) => (
                <button
                  key={sonuc}
                  onClick={() => sonucSec(sonuc)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition ${
                    gorevler[aktifGorev].sonuc === sonuc
                      ? sonucRenkleri[sonuc]
                      : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-sky-300"
                  }`}
                >
                  {sonucEtiketleri[sonuc]}
                </button>
              ))}
            </div>

            {/* Not alanı */}
            <textarea
              value={gorevler[aktifGorev].not}
              onChange={(e) => notGuncelle(e.target.value)}
              placeholder="Asistan ne cevap verdi? Notlarını yaz..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
              rows={2}
            />
          </div>

          {/* Navigasyon */}
          <div className="flex justify-between">
            <button
              onClick={onceki}
              disabled={aktifGorev === 0}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-300 disabled:opacity-40 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              ← Önceki
            </button>
            <button
              onClick={sonraki}
              disabled={gorevler[aktifGorev].sonuc === null}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-40"
            >
              {aktifGorev === gorevler.length - 1 ? "Sonuçları Gör" : "Sonraki →"}
            </button>
          </div>

          {/* Mini görev listesi */}
          <div className="flex flex-wrap gap-1">
            {gorevler.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setAktifGorev(i)}
                className={`h-8 w-8 rounded-full text-xs font-bold transition ${
                  i === aktifGorev
                    ? "bg-sky-600 text-white"
                    : g.sonuc === "basarili"
                    ? "bg-emerald-200 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : g.sonuc === "kismen"
                    ? "bg-amber-200 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    : g.sonuc === "basarisiz"
                    ? "bg-rose-200 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Sonuç özeti */}
          <div className="rounded-xl bg-sky-50 p-6 dark:bg-sky-900/20">
            <h4 className="mb-4 text-center text-xl font-bold">📊 Test Sonuçları</h4>

            {/* Özet çubuklar */}
            <div className="mb-6 space-y-3">
              {[
                { etiket: "Başarılı", sayi: basariliSayisi, renk: "bg-emerald-500", toplam: gorevler.length },
                { etiket: "Kısmen Başarılı", sayi: kismenSayisi, renk: "bg-amber-500", toplam: gorevler.length },
                { etiket: "Başarısız", sayi: basarisizSayisi, renk: "bg-rose-500", toplam: gorevler.length },
              ].map((bar) => (
                <div key={bar.etiket}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{bar.etiket}</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {bar.sayi}/{bar.toplam} ({Math.round((bar.sayi / bar.toplam) * 100)}%)
                    </span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full ${bar.renk} transition-all duration-500`}
                      style={{ width: `${(bar.sayi / bar.toplam) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Detaylı sonuç listesi */}
            <div className="space-y-2">
              <h5 className="font-semibold text-sm">Detaylı Sonuçlar:</h5>
              {gorevler.map((g) => (
                <div
                  key={g.id}
                  className={`rounded-lg border p-3 text-sm ${g.sonuc ? sonucRenkleri[g.sonuc] : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {g.emoji} &ldquo;{g.komut}&rdquo;
                    </span>
                    <span className="text-xs font-bold">{g.sonuc ? sonucEtiketleri[g.sonuc] : ""}</span>
                  </div>
                  {g.not && (
                    <p className="mt-1 text-xs opacity-80">Not: {g.not}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Yorum */}
            <div className="mt-4 rounded-lg bg-white/60 p-3 text-sm dark:bg-black/20">
              <p className="font-medium">
                {basariliSayisi >= 6
                  ? "🌟 Sesli asistan birçok görevde başarılı! Ama dikkat et: duygusal sorular ve belirsiz komutlarda zorlanabilir."
                  : basariliSayisi >= 4
                  ? "🤔 Sesli asistan bazı görevlerde iyi, bazılarında zorlanıyor. YZ'nin güçlü ve zayıf yönlerini keşfettin!"
                  : "💡 Sesli asistan birçok görevde zorlandı. Bu, YZ'nin henüz her konuda başarılı olmadığını gösteriyor."}
              </p>
            </div>
          </div>

          <button
            onClick={sifirla}
            className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Tekrar Dene
          </button>
        </>
      )}
    </div>
  );
}
