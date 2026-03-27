"use client";

import { useState } from "react";

interface Senaryo {
  id: number;
  baslik: string;
  kotuPrompt: string;
  ipuclari: string[];
  kriterler: { ad: string; aciklama: string }[];
  ornekIyiPrompt: string;
}

const senaryolar: Senaryo[] = [
  {
    id: 1,
    baslik: "Hikaye Yazma",
    kotuPrompt: "Bir hikaye yaz",
    ipuclari: ["Konu ne olsun?", "Kaç kelime?", "Hedef kitle kim?", "Tür ne? (macera, bilim kurgu...)"],
    kriterler: [
      { ad: "Konu belirtilmiş mi?", aciklama: "Ne hakkında bir hikaye istediğini yazdın mı?" },
      { ad: "Hedef kitle var mı?", aciklama: "Hikaye kimin için? (çocuklar, gençler...)" },
      { ad: "Format belirtilmiş mi?", aciklama: "Uzunluk, tür veya stil belirttim mi?" },
    ],
    ornekIyiPrompt: "10 yaşındaki çocuklar için uzayda geçen, 200 kelimelik bir macera hikayesi yaz. Başrol karakteri cesur bir kız astronot olsun.",
  },
  {
    id: 2,
    baslik: "Resim Oluşturma",
    kotuPrompt: "Bir resim çiz",
    ipuclari: ["Ne çizilsin?", "Hangi tarzda? (karikatür, gerçekçi...)", "Arka plan nasıl olsun?", "Renkler?"],
    kriterler: [
      { ad: "Konu belirtilmiş mi?", aciklama: "Resimde ne olsun?" },
      { ad: "Stil var mı?", aciklama: "Karikatür, sulu boya, dijital art gibi bir tarz belirttim mi?" },
      { ad: "Detay verilmiş mi?", aciklama: "Renkler, arka plan, kompozisyon gibi detaylar var mı?" },
    ],
    ornekIyiPrompt: "Yeşil bir ormanın ortasında, gökkuşağının altında oturan sevimli bir tavşan ailesi çiz. Karikatür tarzında, canlı renklerle.",
  },
  {
    id: 3,
    baslik: "Matematik Yardımı",
    kotuPrompt: "Matematik yap",
    ipuclari: ["Hangi konu?", "Hangi sınıf seviyesi?", "Adım adım mı?", "Kaç soru?"],
    kriterler: [
      { ad: "Problem belirtilmiş mi?", aciklama: "Hangi soruyu çözmem gerekiyor?" },
      { ad: "Seviye var mı?", aciklama: "Hangi sınıf/düzey için olduğunu belirttim mi?" },
      { ad: "Yöntem istendi mi?", aciklama: "Adım adım çözüm veya açıklama istedim mi?" },
    ],
    ornekIyiPrompt: "6. sınıf seviyesinde, 3x + 7 = 22 denklemini adım adım çöz. Her adımda ne yaptığını açıkla.",
  },
  {
    id: 4,
    baslik: "Araştırma Ödevi",
    kotuPrompt: "Bana bir şey anlat",
    ipuclari: ["Hangi konu?", "Ne kadar detaylı?", "Hangi format?", "Hedef kitle?"],
    kriterler: [
      { ad: "Konu belirtilmiş mi?", aciklama: "Hangi konu hakkında bilgi istediğimi yazdım mı?" },
      { ad: "Bağlam var mı?", aciklama: "Neden ihtiyacım var, hangi ders için?" },
      { ad: "Format belirtilmiş mi?", aciklama: "Madde madde mi, paragraf mı, kaç kelime?" },
    ],
    ornekIyiPrompt: "6. sınıf fen bilgisi ödevi için güneş sistemi hakkında 150 kelimelik bir özet yaz. Gezegenleri sırayla listele ve her biri için bir ilginç bilgi ekle.",
  },
  {
    id: 5,
    baslik: "Kod Yazma",
    kotuPrompt: "Kod yaz",
    ipuclari: ["Hangi dil?", "Ne yapacak?", "Başlangıç seviyesi mi?", "Açıklamalı mı?"],
    kriterler: [
      { ad: "Görev belirtilmiş mi?", aciklama: "Programın ne yapmasını istediğimi yazdım mı?" },
      { ad: "Dil seçilmiş mi?", aciklama: "Python, Scratch, JavaScript gibi bir dil belirttim mi?" },
      { ad: "Detay verilmiş mi?", aciklama: "Açıklamalı olsun, adım adım anlat gibi talepler var mı?" },
    ],
    ornekIyiPrompt: "Python ile 1'den 50'ye kadar olan çift sayıları ekrana yazdıran bir program yaz. Her satırda açıklama yorumu ekle, başlangıç seviyesi için uygun olsun.",
  },
];

export default function PromptDeneme() {
  const [aktifSenaryo, setAktifSenaryo] = useState(0);
  const [kullaniciPrompt, setKullaniciPrompt] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const [puanlar, setPuanlar] = useState<boolean[]>([]);
  const [toplamPuan, setToplamPuan] = useState(0);
  const [tamamlanan, setTamamlanan] = useState<Set<number>>(new Set());
  const [ornekGoster, setOrnekGoster] = useState(false);

  const senaryo = senaryolar[aktifSenaryo];

  const degerlendir = () => {
    if (!kullaniciPrompt.trim()) return;

    const prompt = kullaniciPrompt.toLowerCase();
    const sonuclar = senaryo.kriterler.map((kriter) => {
      // Basit keyword analizi
      switch (kriter.ad) {
        case "Konu belirtilmiş mi?":
          return prompt.length > 15 && (
            prompt.includes("hakkında") || prompt.includes("konulu") || prompt.includes("için") ||
            prompt.split(" ").length > 5
          );
        case "Hedef kitle var mı?":
          return prompt.includes("sınıf") || prompt.includes("yaş") || prompt.includes("çocuk") ||
            prompt.includes("öğrenci") || prompt.includes("genç") || prompt.includes("için");
        case "Format belirtilmiş mi?":
          return prompt.includes("kelime") || prompt.includes("madde") || prompt.includes("paragraf") ||
            prompt.includes("kısa") || prompt.includes("uzun") || prompt.includes("liste") ||
            prompt.includes("tarz") || prompt.includes("adım");
        case "Stil var mı?":
          return prompt.includes("tarz") || prompt.includes("karikatür") || prompt.includes("gerçekçi") ||
            prompt.includes("dijital") || prompt.includes("sulu boya") || prompt.includes("stil");
        case "Detay verilmiş mi?":
          return prompt.split(" ").length > 8 && (
            prompt.includes("renk") || prompt.includes("arka plan") || prompt.includes("detay") ||
            prompt.includes("açıklama") || prompt.includes("adım") || prompt.length > 60
          );
        case "Problem belirtilmiş mi?":
          return /\d/.test(prompt) || prompt.includes("denklem") || prompt.includes("problem") ||
            prompt.includes("soru") || prompt.includes("hesapla") || prompt.includes("çöz");
        case "Seviye var mı?":
          return prompt.includes("sınıf") || prompt.includes("seviye") || prompt.includes("başlangıç") ||
            prompt.includes("kolay") || prompt.includes("ileri");
        case "Yöntem istendi mi?":
          return prompt.includes("adım") || prompt.includes("açıkla") || prompt.includes("göster") ||
            prompt.includes("anlat") || prompt.includes("detaylı");
        case "Bağlam var mı?":
          return prompt.includes("ödev") || prompt.includes("ders") || prompt.includes("için") ||
            prompt.includes("proje") || prompt.includes("sunum");
        case "Görev belirtilmiş mi?":
          return prompt.includes("yap") || prompt.includes("yaz") || prompt.includes("oluştur") ||
            prompt.includes("hesapla") || prompt.includes("bul") || prompt.includes("listele") ||
            prompt.includes("yazdır");
        case "Dil seçilmiş mi?":
          return prompt.includes("python") || prompt.includes("scratch") || prompt.includes("javascript") ||
            prompt.includes("java") || prompt.includes("c#");
        default:
          return prompt.length > 20;
      }
    });

    setPuanlar(sonuclar);
    setGonderildi(true);

    const kazanilan = sonuclar.filter(Boolean).length;
    if (kazanilan === senaryo.kriterler.length) {
      setTamamlanan((prev) => new Set(prev).add(aktifSenaryo));
    }
    setToplamPuan((prev) => prev + kazanilan);
  };

  const sonrakiSenaryo = () => {
    if (aktifSenaryo < senaryolar.length - 1) {
      setAktifSenaryo(aktifSenaryo + 1);
    }
    setKullaniciPrompt("");
    setGonderildi(false);
    setPuanlar([]);
    setOrnekGoster(false);
  };

  const sifirla = () => {
    setAktifSenaryo(0);
    setKullaniciPrompt("");
    setGonderildi(false);
    setPuanlar([]);
    setToplamPuan(0);
    setTamamlanan(new Set());
    setOrnekGoster(false);
  };

  const maxPuan = senaryolar.reduce((t, s) => t + s.kriterler.length, 0);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Prompt Mühendisliği Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Prompt mühendisliği, yapay zekaya verdiğimiz komutları (promptları) en etkili şekilde yazmaktır. İyi bir prompt, YZ&apos;nin daha doğru ve işe yarar cevaplar vermesini sağlar. Tıpkı bir öğretmene soru sorarken net ve açık olmak gibi, YZ&apos;ye de ne istediğini iyi anlatmak önemlidir.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-pink-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
        <span className="text-sm text-[var(--color-text-secondary)]">Prompt Mühendisliği Atölyesi</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--color-text)]">Prompt Geliştirme Atölyesi</h3>
      <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Kötü yazılmış promptları düzelt ve daha iyi sonuçlar elde et! Her senaryo için daha spesifik,
        bağlamlı ve formatlı bir prompt yaz.
      </p>

      {/* İlerleme */}
      <div className="mb-5 flex items-center gap-2">
        {senaryolar.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-full transition-all ${
              tamamlanan.has(i)
                ? "bg-emerald-500"
                : i === aktifSenaryo
                  ? "bg-pink-500"
                  : "bg-[var(--color-bg-secondary)]"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-[var(--color-text-secondary)]">
          {tamamlanan.size}/{senaryolar.length}
        </span>
      </div>

      {/* Senaryo */}
      <div className="mb-4 rounded-xl border border-pink-200 bg-pink-50 p-5 dark:border-pink-800 dark:bg-pink-900/20">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
            Senaryo {senaryo.id}/5: {senaryo.baslik}
          </span>
        </div>
        <div className="mb-3">
          <p className="text-sm text-[var(--color-text-secondary)]">Kötü prompt:</p>
          <p className="mt-1 rounded-lg bg-red-100 px-4 py-2 font-mono text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            &quot;{senaryo.kotuPrompt}&quot;
          </p>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium text-[var(--color-text-secondary)]">Düşünülecek sorular:</p>
          <div className="flex flex-wrap gap-2">
            {senaryo.ipuclari.map((ipucu) => (
              <span
                key={ipucu}
                className="rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-700 dark:bg-pink-900/40 dark:text-pink-300"
              >
                {ipucu}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Kullanıcı girişi */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">
          Senin promptun:
        </label>
        <textarea
          value={kullaniciPrompt}
          onChange={(e) => setKullaniciPrompt(e.target.value)}
          disabled={gonderildi}
          placeholder="Daha iyi bir prompt yaz..."
          rows={3}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 disabled:opacity-60"
        />
      </div>

      {/* Butonlar */}
      <div className="mb-4 flex flex-wrap gap-3">
        {!gonderildi ? (
          <button
            onClick={degerlendir}
            disabled={!kullaniciPrompt.trim()}
            className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700 disabled:opacity-40"
          >
            Değerlendir
          </button>
        ) : (
          <>
            {aktifSenaryo < senaryolar.length - 1 && (
              <button
                onClick={sonrakiSenaryo}
                className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700"
              >
                Sonraki Senaryo
              </button>
            )}
            <button
              onClick={() => setOrnekGoster(!ornekGoster)}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg)]"
            >
              {ornekGoster ? "Örneği Gizle" : "Örnek İyi Prompt"}
            </button>
          </>
        )}
        <button
          onClick={sifirla}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg)]"
        >
          Tekrar Dene
        </button>
      </div>

      {/* Sonuçlar */}
      {gonderildi && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <h4 className="mb-3 font-bold text-[var(--color-text)]">Değerlendirme Sonucu</h4>
            <div className="space-y-2">
              {senaryo.kriterler.map((kriter, i) => (
                <div
                  key={kriter.ad}
                  className={`flex items-start gap-3 rounded-lg p-3 ${
                    puanlar[i]
                      ? "bg-emerald-50 dark:bg-emerald-900/20"
                      : "bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <span className="mt-0.5 text-lg">{puanlar[i] ? "&#10004;" : "&#10008;"}</span>
                  <div>
                    <p className={`text-sm font-medium ${puanlar[i] ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
                      {kriter.ad}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{kriter.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <span className="text-lg font-bold text-[var(--color-text)]">
                {puanlar.filter(Boolean).length}/{senaryo.kriterler.length} kriter karşılandı
              </span>
            </div>
          </div>

          {/* Örnek iyi prompt */}
          {ornekGoster && (
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h4 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">Örnek İyi Prompt</h4>
              <p className="font-mono text-sm text-emerald-800 dark:text-emerald-300">
                &quot;{senaryo.ornekIyiPrompt}&quot;
              </p>
            </div>
          )}
        </div>
      )}

      {/* Toplam puan */}
      {toplamPuan > 0 && (
        <div className="mt-4 rounded-xl bg-pink-50 p-4 text-center dark:bg-pink-900/20">
          <p className="text-sm text-[var(--color-text-secondary)]">Toplam Puanın</p>
          <p className="text-3xl font-extrabold text-pink-600 dark:text-pink-400">
            {toplamPuan}/{maxPuan}
          </p>
          {tamamlanan.size === senaryolar.length && (
            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Tebrikler! Tüm senaryoları başarıyla tamamladın!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
