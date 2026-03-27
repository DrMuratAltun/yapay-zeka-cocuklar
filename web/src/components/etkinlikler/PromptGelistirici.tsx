"use client";

import { useState, useCallback } from "react";

interface PromptOrnek {
  id: number;
  zayifPrompt: string;
  idealPrompt: string;
  konu: string;
  emoji: string;
  ipucu: string;
}

interface Puanlama {
  belirlilik: number;
  baglam: number;
  netlik: number;
  format: number;
}

const promptOrnekleri: PromptOrnek[] = [
  {
    id: 1,
    zayifPrompt: "Bir şiir yaz",
    idealPrompt: "Bir ortaokul öğrencisi olarak doğa temalı, 4 kıtalık bir şiir yaz. Her kıta 4 dizeden oluşsun ve kafiyeli olsun.",
    konu: "Şiir Yazma",
    emoji: "📝",
    ipucu: "Rol, konu, uzunluk ve format belirt.",
  },
  {
    id: 2,
    zayifPrompt: "Tarih ödev",
    idealPrompt: "Bir tarih öğretmeni gibi davran. Fatih Sultan Mehmet'in İstanbul'u fethetmesini 8. sınıf seviyesinde, maddeler halinde ve 200 kelimelik bir özet olarak anlat.",
    konu: "Tarih Ödevi",
    emoji: "📚",
    ipucu: "Kim olarak yazacağını, konuyu, hedef kitleyi ve formatı belirt.",
  },
  {
    id: 3,
    zayifPrompt: "Matematik yardım et",
    idealPrompt: "Bir matematik öğretmeni rolünde ol. 7. sınıf seviyesinde denklem çözme konusunu adım adım açıkla. 3 farklı zorluk seviyesinde örnek problem ver ve çözümlerini göster.",
    konu: "Matematik",
    emoji: "🧮",
    ipucu: "Rol, konu, seviye, kaç örnek ve nasıl açıklanacağını belirt.",
  },
  {
    id: 4,
    zayifPrompt: "Hikaye anlat",
    idealPrompt: "Bir çocuk kitabı yazarı olarak uzay macerası temalı, 10-12 yaş grubuna uygun, 3 bölümlük kısa bir hikaye yaz. Her bölümde bir bilimsel gerçek paylaş. Diyaloglar içersin.",
    konu: "Hikaye Yazma",
    emoji: "🚀",
    ipucu: "Yazar rolü, tema, yaş grubu, yapı ve ek özellikler belirt.",
  },
  {
    id: 5,
    zayifPrompt: "Çevre hakkında bilgi",
    idealPrompt: "Bir çevre bilimci olarak iklim değişikliğinin okyanuslar üzerindeki etkilerini açıkla. Ortaokul öğrencileri için anlaşılır bir dilde yaz. 5 maddelik liste formatında, her maddede somut bir örnek ver.",
    konu: "Çevre Bilimi",
    emoji: "🌍",
    ipucu: "Uzman rolü, spesifik konu, hedef kitle, format ve detay seviyesi belirt.",
  },
  {
    id: 6,
    zayifPrompt: "Yemek tarifi ver",
    idealPrompt: "Bir aşçı olarak çocukların güvenle yapabileceği, 30 dakikadan kısa süren bir pizza tarifi ver. Malzeme listesi, adım adım talimatlar ve güvenlik uyarıları içersin. Ölçüleri bardak/kaşık cinsinden yaz.",
    konu: "Yemek Tarifi",
    emoji: "🍕",
    ipucu: "Rol, hedef kitle kısıtlamaları, süre, format bölümleri ve ölçü birimi belirt.",
  },
];

const kriterler = [
  { ad: "Belirlilik", anahtar: "belirlilik" as const, aciklama: "Konu ne kadar spesifik belirtilmiş?", emoji: "🎯" },
  { ad: "Bağlam", anahtar: "baglam" as const, aciklama: "Rol ve hedef kitle tanımlanmış mı?", emoji: "📋" },
  { ad: "Netlik", anahtar: "netlik" as const, aciklama: "İstek açık ve anlaşılır mı?", emoji: "💎" },
  { ad: "Format", anahtar: "format" as const, aciklama: "Çıktı formatı belirtilmiş mi?", emoji: "📐" },
];

function puanlaPrompt(kullaniciPrompt: string, ideal: PromptOrnek): Puanlama {
  const prompt = kullaniciPrompt.toLowerCase();
  const kelimeSayisi = kullaniciPrompt.trim().split(/\s+/).length;

  let belirlilik = 1;
  if (kelimeSayisi > 5) belirlilik = 2;
  if (kelimeSayisi > 10) belirlilik = 3;
  if (kelimeSayisi > 15) belirlilik = 4;
  if (kelimeSayisi > 20) belirlilik = 5;

  let baglam = 1;
  const rolKelimeleri = ["olarak", "gibi", "rolünde", "rolünü", "uzman", "öğretmen", "yazar", "bilimci", "aşçı"];
  if (rolKelimeleri.some((r) => prompt.includes(r))) baglam += 2;
  const hedefKitle = ["öğrenci", "çocuk", "sınıf", "yaş", "seviye", "ortaokul"];
  if (hedefKitle.some((h) => prompt.includes(h))) baglam += 2;

  let netlik = 1;
  if (kelimeSayisi > 8) netlik += 1;
  if (!prompt.includes("?") || prompt.includes("açıkla") || prompt.includes("anlat") || prompt.includes("yaz")) netlik += 1;
  const fiiller = ["yaz", "anlat", "açıkla", "oluştur", "hazırla", "ver", "listele"];
  if (fiiller.some((f) => prompt.includes(f))) netlik += 1;
  if (kelimeSayisi > 15) netlik += 1;

  let format = 1;
  const formatKelimeleri = ["madde", "liste", "bölüm", "paragraf", "adım", "kıta", "tablo", "özet", "dize", "kelime", "format"];
  if (formatKelimeleri.some((f) => prompt.includes(f))) format += 2;
  const sayilar = prompt.match(/\d+/);
  if (sayilar) format += 1;
  if (prompt.includes("kısa") || prompt.includes("uzun") || prompt.includes("detaylı")) format += 1;

  return {
    belirlilik: Math.min(5, belirlilik),
    baglam: Math.min(5, baglam),
    netlik: Math.min(5, netlik),
    format: Math.min(5, format),
  };
}

export default function PromptGelistirici() {
  const [aktifOrnek, setAktifOrnek] = useState(0);
  const [kullaniciPromptlari, setKullaniciPromptlari] = useState<Record<number, string>>({});
  const [puanlar, setPuanlar] = useState<Record<number, Puanlama>>({});
  const [karsilastirGoster, setKarsilastirGoster] = useState<Record<number, boolean>>({});

  const ornek = promptOrnekleri[aktifOrnek];
  const kullaniciPrompt = kullaniciPromptlari[ornek.id] || "";
  const puan = puanlar[ornek.id];
  const karsilastir = karsilastirGoster[ornek.id] || false;

  const puanla = useCallback(() => {
    if (!kullaniciPrompt.trim()) return;
    const yeniPuan = puanlaPrompt(kullaniciPrompt, ornek);
    setPuanlar((prev) => ({ ...prev, [ornek.id]: yeniPuan }));
  }, [kullaniciPrompt, ornek]);

  const toplamPuan = puan
    ? puan.belirlilik + puan.baglam + puan.netlik + puan.format
    : 0;
  const maxPuan = 20;

  const tamamlananSayisi = Object.keys(puanlar).length;

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Prompt Formülü Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Etkili bir prompt yazmak için &quot;Rol + Görev + Bağlam + Format&quot; formülü kullanılır. Rol: YZ&apos;ye kim olduğunu söylersin. Görev: Ne yapmasını istediğini belirtirsin. Bağlam: Durumu açıklarsın. Format: Cevabın nasıl olmasını istediğini tarif edersin. Bu formül, YZ&apos;den çok daha kaliteli sonuçlar almanı sağlar.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">✨ Prompt Geliştirme Atölyesi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Zayıf promptları güçlendir! Formül: Rol + Görev + Bağlam + Format
        </p>
      </div>

      {/* Formül Kartı */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 p-4 dark:from-pink-900/20 dark:to-purple-900/20">
        {[
          { etiket: "Rol", renk: "bg-pink-500", ornek: "Bir öğretmen olarak" },
          { etiket: "+", renk: "", ornek: "" },
          { etiket: "Görev", renk: "bg-purple-500", ornek: "açıkla / yaz / anlat" },
          { etiket: "+", renk: "", ornek: "" },
          { etiket: "Bağlam", renk: "bg-blue-500", ornek: "6. sınıf seviyesinde" },
          { etiket: "+", renk: "", ornek: "" },
          { etiket: "Format", renk: "bg-amber-500", ornek: "maddeler halinde" },
        ].map((f, i) =>
          f.renk ? (
            <div key={i} className="text-center">
              <span className={`inline-block rounded-lg px-3 py-1 text-sm font-bold text-white ${f.renk}`}>
                {f.etiket}
              </span>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{f.ornek}</p>
            </div>
          ) : (
            <span key={i} className="text-lg font-bold text-[var(--color-text-secondary)]">
              +
            </span>
          )
        )}
      </div>

      {/* Prompt Seçici */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {promptOrnekleri.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setAktifOrnek(i)}
            className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              aktifOrnek === i
                ? "bg-pink-500 text-white shadow-md"
                : puanlar[p.id]
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
            }`}
          >
            {p.emoji} {p.konu}
            {puanlar[p.id] && aktifOrnek !== i && <span className="ml-1">✓</span>}
          </button>
        ))}
      </div>

      {/* Aktif Prompt */}
      <div className="space-y-4">
        {/* Zayıf Prompt */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-red-500 px-2 py-0.5 text-xs font-bold text-white">ZAYIF PROMPT</span>
          </div>
          <p className="mt-2 text-lg font-medium italic text-red-700 dark:text-red-400">
            &quot;{ornek.zayifPrompt}&quot;
          </p>
        </div>

        {/* İpucu */}
        <div className="rounded-lg bg-amber-50 p-3 text-sm dark:bg-amber-900/20">
          <p className="text-amber-800 dark:text-amber-300">
            💡 <strong>İpucu:</strong> {ornek.ipucu}
          </p>
        </div>

        {/* Kullanıcı Girişi */}
        <div>
          <label className="mb-1 block text-sm font-medium">Güçlendirilmiş promptunu yaz:</label>
          <textarea
            value={kullaniciPrompt}
            onChange={(e) =>
              setKullaniciPromptlari((prev) => ({ ...prev, [ornek.id]: e.target.value }))
            }
            rows={4}
            placeholder="Daha detaylı, açık ve formülü kullanan bir prompt yaz..."
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm placeholder:text-[var(--color-text-secondary)] focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800"
          />
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            Kelime sayısı: {kullaniciPrompt.trim() ? kullaniciPrompt.trim().split(/\s+/).length : 0}
          </p>
        </div>

        <button
          onClick={puanla}
          disabled={!kullaniciPrompt.trim()}
          className="mx-auto flex items-center gap-2 rounded-xl bg-pink-500 px-6 py-2 font-bold text-white transition-all hover:bg-pink-600 disabled:opacity-40"
        >
          🎯 Puanla
        </button>
      </div>

      {/* Puanlama Sonucu */}
      {puan && (
        <div className="space-y-4">
          <div className="rounded-xl border border-pink-200 bg-pink-50 p-4 dark:border-pink-800 dark:bg-pink-900/20">
            <div className="mb-3 text-center">
              <span className="text-4xl font-extrabold text-pink-600 dark:text-pink-400">
                {toplamPuan} / {maxPuan}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {toplamPuan >= 16
                  ? "🌟 Harika bir prompt!"
                  : toplamPuan >= 10
                    ? "👍 İyi ama geliştirilebilir!"
                    : "📝 Daha fazla detay ekle!"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {kriterler.map((k) => (
                <div key={k.anahtar} className="rounded-lg bg-white/60 p-3 dark:bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {k.emoji} {k.ad}
                    </span>
                    <span className="text-sm font-bold">{puan[k.anahtar]}/5</span>
                  </div>
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i < puan[k.anahtar] ? "bg-pink-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{k.aciklama}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Karşılaştırma */}
          <button
            onClick={() =>
              setKarsilastirGoster((prev) => ({ ...prev, [ornek.id]: !prev[ornek.id] }))
            }
            className="mx-auto flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--color-bg)]"
          >
            {karsilastir ? "Karşılaştırmayı Gizle" : "📊 İdeal Prompt ile Karşılaştır"}
          </button>

          {karsilastir && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
                <span className="rounded-lg bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                  SENİN PROMPTUN
                </span>
                <p className="mt-2 text-sm">{kullaniciPrompt}</p>
              </div>
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
                <span className="rounded-lg bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                  İDEAL PROMPT
                </span>
                <p className="mt-2 text-sm">{ornek.idealPrompt}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* İlerleme */}
      {tamamlananSayisi > 0 && (
        <div className="rounded-lg bg-[var(--color-bg-secondary)] p-3 text-center text-sm">
          <span className="font-medium">
            İlerleme: {tamamlananSayisi} / {promptOrnekleri.length} prompt tamamlandı
          </span>
        </div>
      )}
    </div>
  );
}
