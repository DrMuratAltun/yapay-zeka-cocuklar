"use client";

import { useState, useEffect, useCallback } from "react";

interface Ifade {
  metin: string;
  dogruKategori: "dogru" | "yanlis" | "oznel";
  aciklama: string;
}

const ifadeler: Ifade[] = [
  { metin: "Türkiye'nin başkenti Ankara'dır.", dogruKategori: "dogru", aciklama: "Bu doğrulanabilir bir gerçektir. Türkiye Cumhuriyeti'nin başkenti resmi olarak Ankara'dır." },
  { metin: "Güneş batıdan doğar.", dogruKategori: "yanlis", aciklama: "Güneş doğudan doğar ve batıdan batar. Bu bilimsel bir gerçektir." },
  { metin: "Çikolatalı dondurma en lezzetli dondurmadır.", dogruKategori: "oznel", aciklama: "Bu bir görüştür. Herkesin lezzet tercihi farklıdır, ölçülebilir bir gerçek değildir." },
  { metin: "Su 100°C'de kaynar (deniz seviyesinde).", dogruKategori: "dogru", aciklama: "Bilimsel olarak kanıtlanmış bir gerçektir. Standart atmosfer basıncında suyun kaynama noktası 100°C'dir." },
  { metin: "Kediler köpeklerden daha zekidir.", dogruKategori: "oznel", aciklama: "Bu bir görüştür. Zeka farklı şekillerde ölçülebilir ve her iki hayvan türünün de farklı güçlü yanları vardır." },
  { metin: "Dünya düzdür.", dogruKategori: "yanlis", aciklama: "Bilimsel olarak yanlıştır. Dünya yaklaşık küre şeklindedir (geoid). Uydu görüntüleri ve bilimsel kanıtlar bunu gösterir." },
  { metin: "Mavi en güzel renktir.", dogruKategori: "oznel", aciklama: "Bu kişisel bir tercihtir. Güzellik sübjektif bir kavramdır ve kişiden kişiye değişir." },
  { metin: "İnsan vücudunda 206 kemik bulunur (yetişkinlerde).", dogruKategori: "dogru", aciklama: "Anatomik bir gerçektir. Yetişkin insan iskeletinde 206 kemik vardır." },
  { metin: "Yapay zeka insanlardan her konuda daha akıllıdır.", dogruKategori: "yanlis", aciklama: "Yanlıştır. YZ belirli görevlerde çok başarılı olsa da, genel zeka, duygusal anlayış ve yaratıcılıkta insanın gerisindedir." },
  { metin: "Matematik en zor derstir.", dogruKategori: "oznel", aciklama: "Bu bir görüştür. Zorluk kişiye göre değişir. Bazıları için matematik kolay, bazıları için zor olabilir." },
  { metin: "Ay, Dünya'nın tek doğal uydusudur.", dogruKategori: "dogru", aciklama: "Bilimsel bir gerçektir. Dünya'nın bilinen tek doğal uydusu Ay'dır." },
  { metin: "İstanbul Avrupa ve Asya kıtalarında yer alır.", dogruKategori: "dogru", aciklama: "Coğrafi bir gerçektir. İstanbul Boğazı şehri iki kıtaya ayırır." },
  { metin: "Penguenler uçabilir.", dogruKategori: "yanlis", aciklama: "Yanlıştır. Penguenler kuş olmasına rağmen uçamaz, ama mükemmel yüzücülerdir." },
  { metin: "Robotlar insanlardan daha iyidir.", dogruKategori: "oznel", aciklama: "Bu bir görüştür ve çok geneldir. Robotlar bazı işlerde daha iyi, bazılarında ise insanların çok gerisindedir." },
  { metin: "Python bir programlama dilidir.", dogruKategori: "dogru", aciklama: "Doğrudur. Python, 1991'de Guido van Rossum tarafından oluşturulan popüler bir programlama dilidir." },
];

const kategoriler = {
  dogru: { ad: "Doğru", emoji: "✅", renk: "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20", butonRenk: "bg-emerald-500 hover:bg-emerald-600 text-white" },
  yanlis: { ad: "Yanlış", emoji: "❌", renk: "border-rose-400 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20", butonRenk: "bg-rose-500 hover:bg-rose-600 text-white" },
  oznel: { ad: "Öznel (Görüş)", emoji: "💭", renk: "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/20", butonRenk: "bg-amber-500 hover:bg-amber-600 text-white" },
};

export default function GirdiAvcilari() {
  const [mevcutIndex, setMevcutIndex] = useState(0);
  const [puan, setPuan] = useState(0);
  const [cevapVerildi, setCevapVerildi] = useState(false);
  const [sonSecim, setSonSecim] = useState<string | null>(null);
  const [bitti, setBitti] = useState(false);
  const [zamanlayici, setZamanlayici] = useState(false);
  const [sure, setSure] = useState(120);
  const [sureAktif, setSureAktif] = useState(false);
  const [sureBitti, setSureBitti] = useState(false);

  useEffect(() => {
    if (!zamanlayici || !sureAktif || bitti || sureBitti) return;
    if (sure <= 0) {
      setSureBitti(true);
      return;
    }
    const interval = setInterval(() => {
      setSure((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [zamanlayici, sureAktif, sure, bitti, sureBitti]);

  const ifade = ifadeler[mevcutIndex];

  const cevapVer = useCallback((secim: "dogru" | "yanlis" | "oznel") => {
    if (cevapVerildi || sureBitti) return;
    setSonSecim(secim);
    if (secim === ifade.dogruKategori) setPuan((p) => p + 1);
    setCevapVerildi(true);
  }, [cevapVerildi, sureBitti, ifade.dogruKategori]);

  const sonraki = () => {
    if (mevcutIndex + 1 >= ifadeler.length) {
      setBitti(true);
    } else {
      setMevcutIndex((i) => i + 1);
      setCevapVerildi(false);
      setSonSecim(null);
    }
  };

  const yenidenBasla = () => {
    setMevcutIndex(0);
    setPuan(0);
    setCevapVerildi(false);
    setSonSecim(null);
    setBitti(false);
    setSure(120);
    setSureBitti(false);
    if (zamanlayici) setSureAktif(true);
  };

  const basla = () => {
    if (zamanlayici) setSureAktif(true);
  };

  const dakika = Math.floor(sure / 60);
  const saniye = sure % 60;

  if (sureBitti && !bitti) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <h3 className="mb-2 text-2xl font-bold">⏰ Süre Doldu!</h3>
        <p className="mb-2 text-lg">
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{puan}</span>
          /{mevcutIndex + (cevapVerildi ? 1 : 0)} doğru ({mevcutIndex + (cevapVerildi ? 1 : 0)}/{ifadeler.length} soru tamamlandı)
        </p>
        <button onClick={yenidenBasla} className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white hover:bg-violet-700">
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (bitti) {
    const yuzde = Math.round((puan / ifadeler.length) * 100);
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <h3 className="mb-2 text-2xl font-bold">🏁 Oyun Bitti!</h3>
        <div className="my-4">
          <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{yuzde}%</p>
          <p className="mt-1 text-lg">
            <span className="font-bold">{puan}</span>/{ifadeler.length} doğru
          </p>
        </div>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          {yuzde === 100 ? "Mükemmel! Tüm bilgileri doğru sınıflandırdın! 🎉" :
           yuzde >= 80 ? "Harika! Veri sınıflandırma konusunda çok iyisin!" :
           yuzde >= 60 ? "İyi gidiyorsun! Biraz daha pratik faydalı olacaktır." :
           "Doğru-yanlış-öznel ayrımı zor olabilir. Tekrar dene!"}
        </p>
        <button onClick={yenidenBasla} className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white hover:bg-violet-700">
          Tekrar Oyna
        </button>
      </div>
    );
  }

  if (!sureAktif && !cevapVerildi && mevcutIndex === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <h3 className="mb-2 text-xl font-bold">🎯 Girdi Avcıları</h3>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          Her ifadeyi oku ve doğru kategoriye yerleştir: Doğru mu? Yanlış mı? Yoksa kişisel bir görüş mü?
        </p>
        <div className="mb-4 flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={zamanlayici}
              onChange={(e) => setZamanlayici(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            Zamanlayıcı ile oyna (2 dakika)
          </label>
        </div>
        <button
          onClick={basla}
          className="w-full rounded-xl bg-violet-600 px-6 py-3 font-bold text-white hover:bg-violet-700"
        >
          Başla!
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Veri Türleri Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zeka, doğru çalışabilmek için doğru verilere ihtiyaç duyar. Veriler &quot;olgusal&quot; (kanıtlanabilir gerçekler) ve &quot;yorum&quot; (kişisel görüşler) olarak ikiye ayrılır. Bu farkı bilmek, YZ sistemlerinin güvenilir sonuçlar üretmesi için çok önemlidir.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">🎯 Girdi Avcıları</h3>
        <div className="flex items-center gap-3">
          {zamanlayici && (
            <span className={`rounded-full px-3 py-1 text-sm font-mono font-bold ${sure <= 30 ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : "bg-[var(--color-bg)] text-[var(--color-text)]"}`}>
              {dakika}:{saniye.toString().padStart(2, "0")}
            </span>
          )}
          <span className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-sm font-medium">
            {mevcutIndex + 1}/{ifadeler.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-pink-500 transition-all duration-300"
          style={{ width: `${((mevcutIndex + (cevapVerildi ? 1 : 0)) / ifadeler.length) * 100}%` }}
        />
      </div>

      {/* Statement */}
      <div className="mb-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 text-center">
        <p className="text-base font-semibold">&ldquo;{ifade.metin}&rdquo;</p>
      </div>

      {/* Buttons */}
      {!cevapVerildi ? (
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(kategoriler) as [keyof typeof kategoriler, typeof kategoriler[keyof typeof kategoriler]][]).map(([key, kat]) => (
            <button
              key={key}
              onClick={() => cevapVer(key)}
              className={`rounded-xl px-3 py-3 text-sm font-bold transition ${kat.butonRenk}`}
            >
              {kat.emoji} {kat.ad}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`rounded-xl border-2 p-4 ${sonSecim === ifade.dogruKategori
            ? "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/20"
            : "border-rose-400 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/20"
          }`}>
            <p className="font-bold">
              {sonSecim === ifade.dogruKategori ? "✅ Doğru!" : "❌ Yanlış!"}
              {" "}
              <span className="font-normal text-[var(--color-text-secondary)]">
                Bu ifade: {kategoriler[ifade.dogruKategori].emoji} {kategoriler[ifade.dogruKategori].ad}
              </span>
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{ifade.aciklama}</p>
          </div>
          <button
            onClick={sonraki}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-bold text-white transition hover:bg-violet-700"
          >
            {mevcutIndex + 1 < ifadeler.length ? "Sonraki →" : "Sonuçları Gör"}
          </button>
        </div>
      )}

      <div className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
        Puan: <span className="font-bold text-emerald-600 dark:text-emerald-400">{puan}</span>
      </div>
    </div>
  );
}
