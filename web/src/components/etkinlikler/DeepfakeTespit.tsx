"use client";

import { useState } from "react";

interface Icerik {
  id: number;
  baslik: string;
  aciklama: string;
  ipuclari: string[];
  gercekCevap: "gercek" | "deepfake";
  neden: string;
}

const ipucuListesi = [
  { key: "gozKirpma", label: "Göz kırpma doğal değil" },
  { key: "dudakSenkron", label: "Dudak-ses senkronu bozuk" },
  { key: "sacDetay", label: "Saç detayları bulanık/yapay" },
  { key: "ciltDoku", label: "Cilt dokusu pürüzsüz/yapay" },
  { key: "aydinlatma", label: "Aydınlatma tutarsız" },
  { key: "arkaPlan", label: "Arka plan tutarsızlığı var" },
];

const icerikler: Icerik[] = [
  {
    id: 1,
    baslik: "Politikacı Konuşma Videosu",
    aciklama: "Tanınmış bir politikacının hiç yapmadığı bir konuşmayı yaptığı iddia edilen video. Dudak hareketleri biraz gecikmeli, arka planda hafif titreme var. Yüz ifadesi konuşma tonuyla tam uyumlu değil.",
    ipuclari: ["dudakSenkron", "arkaPlan"],
    gercekCevap: "deepfake",
    neden: "Dudak-ses senkronundaki gecikme ve arka plandaki tutarsızlıklar tipik deepfake belirtileridir. Ayrıca kişinin bu konuşmayı hiç yapmadığı doğrulanmıştır.",
  },
  {
    id: 2,
    baslik: "Haber Spikeri Raporu",
    aciklama: "Bir haber kanalında spikerin günlük haberleri okuduğu video. Göz kırpma doğal, dudak hareketleri mükemmel senkronize, aydınlatma profesyonel stüdyo ortamına uygun. Arka plan net ve tutarlı.",
    ipuclari: [],
    gercekCevap: "gercek",
    neden: "Tüm detaylar tutarlı: doğal göz kırpma, mükemmel dudak senkronu, profesyonel aydınlatma ve tutarlı arka plan. Bu gerçek bir haber yayınıdır.",
  },
  {
    id: 3,
    baslik: "Ünlü Şarkıcı Reklamı",
    aciklama: "Dünyaca ünlü bir şarkıcının yerel bir ürünü tanıttığı reklam videosu. Cildi aşırı pürüzsüz görünüyor, saç kenarları biraz bulanık. Aydınlatma yüzde ve arka planda farklı açılardan geliyor gibi.",
    ipuclari: ["ciltDoku", "sacDetay", "aydinlatma"],
    gercekCevap: "deepfake",
    neden: "Yapay pürüzsüz cilt, bulanık saç kenarları ve tutarsız aydınlatma deepfake işaretleridir. Ünlü kişiler sıklıkla izinsiz reklamlarda kullanılır.",
  },
  {
    id: 4,
    baslik: "Öğretmen Ders Videosu",
    aciklama: "Bir matematik öğretmeninin tahtada denklem çözdüğü ders videosu. Doğal el hareketleri, tutarlı gölgeler, normal cilt dokusu. Göz teması kamerayla doğal.",
    ipuclari: [],
    gercekCevap: "gercek",
    neden: "Doğal el hareketleri, tutarlı gölgeler ve cilt dokusu bu videonun gerçek olduğunu gösterir. Öğretmen ders videolarında deepfake kullanmak mantıklı değildir.",
  },
  {
    id: 5,
    baslik: "CEO Acil Mesajı",
    aciklama: "Bir şirketin CEO'sunun çalışanlara acil para transferi yapmaları gerektiğini söylediği video mesaj. Göz kırpma sıklığı az, ses tonu monoton. Arka planda ofis görüntüsü var ama pencereden gelen ışık yüze yansımıyor.",
    ipuclari: ["gozKirpma", "aydinlatma"],
    gercekCevap: "deepfake",
    neden: "Az göz kırpma ve aydınlatma tutarsızlığı deepfake belirtisidir. 'Acil para transferi' talepleri sıkça deepfake dolandırıcılığında kullanılır.",
  },
  {
    id: 6,
    baslik: "Doğa Belgeseli Sahnesi",
    aciklama: "Bir belgeselden alınan, sunucunun ormanda yürürken konuştuğu sahne. Rüzgârda saçlar doğal hareket ediyor, aydınlatma güneş ışığıyla tutarlı, arka plan derinliği doğal.",
    ipuclari: [],
    gercekCevap: "gercek",
    neden: "Saçların rüzgârda doğal hareketi, tutarlı güneş aydınlatması ve doğal derinlik efekti bu videonun gerçek olduğunu gösterir.",
  },
  {
    id: 7,
    baslik: "Sosyal Medya İtirafı",
    aciklama: "Tanınmış bir kişinin skandal bir itirafta bulunduğu sosyal medya videosu. Yüz hatlarında konuşma sırasında hafif titremeler var. Kulak ve boyun bölgesi bazen bulanıklaşıyor. Ses tonu kişinin bilinen konuşma tarzından farklı.",
    ipuclari: ["ciltDoku", "sacDetay", "dudakSenkron"],
    gercekCevap: "deepfake",
    neden: "Yüzdeki titremeler, kulak-boyun bölgesindeki bulanıklık ve farklı ses tonu deepfake işaretleridir. Skandal içerikler manipülasyon amacıyla üretilir.",
  },
  {
    id: 8,
    baslik: "Aile Tatil Videosu",
    aciklama: "Bir ailenin tatil sırasında çektiği ev videosu. Kamera biraz titrek, aydınlatma doğal güneş ışığı. Yüzlerde gölgeler tutarlı, herkes doğal davranıyor, ses ortam sesleriyle uyumlu.",
    ipuclari: [],
    gercekCevap: "gercek",
    neden: "Doğal kamera titremesi, tutarlı aydınlatma ve ortam sesleri gerçek bir ev videosunun karakteristik özellikleridir.",
  },
];

export default function DeepfakeTespit() {
  const [aktif, setAktif] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [secimler, setSecimler] = useState<Record<number, "gercek" | "deepfake">>({});
  const [isaretler, setIsaretler] = useState<Record<number, string[]>>({});
  const [gosterilen, setGosterilen] = useState<Record<number, boolean>>({});
  const [bitti, setBitti] = useState(false);

  const item = icerikler[currentIdx];

  const isaretToggle = (itemId: number, ipucu: string) => {
    setIsaretler((prev) => {
      const mevcut = prev[itemId] || [];
      return {
        ...prev,
        [itemId]: mevcut.includes(ipucu) ? mevcut.filter((i) => i !== ipucu) : [...mevcut, ipucu],
      };
    });
  };

  const cevapVer = (cevap: "gercek" | "deepfake") => {
    setSecimler((prev) => ({ ...prev, [item.id]: cevap }));
    setGosterilen((prev) => ({ ...prev, [item.id]: true }));
  };

  const sonraki = () => {
    if (currentIdx < icerikler.length - 1) {
      setCurrentIdx((p) => p + 1);
    } else {
      setBitti(true);
    }
  };

  const dogruSayisi = icerikler.filter((ic) => secimler[ic.id] === ic.gercekCevap).length;
  const seviye = dogruSayisi >= 7 ? "Uzman" : dogruSayisi >= 5 ? "Orta" : "Başlangıç";
  const seviyeEmoji = dogruSayisi >= 7 ? "🏆" : dogruSayisi >= 5 ? "🔍" : "🌱";
  const seviyeRenk = dogruSayisi >= 7 ? "text-green-600 dark:text-green-400" : dogruSayisi >= 5 ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400";

  const sifirla = () => {
    setAktif(false);
    setCurrentIdx(0);
    setSecimler({});
    setIsaretler({});
    setGosterilen({});
    setBitti(false);
  };

  if (!aktif) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-lg bg-amber-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
          <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Bireysel</span>
        </div>
        <h3 className="mb-3 text-xl font-bold">Deepfake Dedektifi</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Deepfake tespit becerilerini test et! 8 farklı görsel/video açıklamasını incele,
          ipuçlarını kontrol et ve hangisinin gerçek, hangisinin deepfake olduğunu bul.
          Sonunda Deepfake Dedektifi seviyeni öğren!
        </p>
        <div className="mb-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            🔎 İpucu: Göz kırpma, dudak senkronu, saç detayları, cilt dokusu, aydınlatma ve arka plan tutarsızlıklarına dikkat et!
          </p>
        </div>
        <button
          onClick={() => setAktif(true)}
          className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
        >
          Dedektifliğe Başla 🕵️
        </button>
      </div>
    );
  }

  if (bitti) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <h3 className="mb-6 text-center text-2xl font-extrabold">🕵️ Deepfake Dedektifi Sonuçları</h3>

        {/* Seviye kartı */}
        <div className="mb-6 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 text-center dark:border-amber-700 dark:from-amber-900/20 dark:to-yellow-900/20">
          <p className="text-5xl">{seviyeEmoji}</p>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Deepfake Dedektifi Seviyeniz</p>
          <p className={`text-3xl font-extrabold ${seviyeRenk}`}>{seviye}</p>
          <p className="mt-1 text-lg font-bold">{dogruSayisi} / {icerikler.length} doğru</p>
        </div>

        {/* Detaylı sonuçlar */}
        <div className="mb-6 space-y-2">
          {icerikler.map((ic) => {
            const dogruMu = secimler[ic.id] === ic.gercekCevap;
            return (
              <div
                key={ic.id}
                className={`flex items-center justify-between rounded-lg p-3 text-sm ${
                  dogruMu ? "bg-green-50 dark:bg-green-900/10" : "bg-red-50 dark:bg-red-900/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{dogruMu ? "✅" : "❌"}</span>
                  <span className="font-medium">{ic.baslik}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  ic.gercekCevap === "deepfake"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                }`}>
                  {ic.gercekCevap === "deepfake" ? "Deepfake" : "Gerçek"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mb-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {dogruSayisi >= 7
              ? "🌟 Harika! Deepfake konusunda çok bilgilisin. İnternetteki içerikleri eleştirel gözle değerlendirmeye devam et!"
              : dogruSayisi >= 5
              ? "📈 İyi gidiyorsun! Biraz daha pratikle uzman seviyesine ulaşabilirsin. Özellikle ince detaylara dikkat et."
              : "🌱 Güzel bir başlangıç! Deepfake teknolojisi hakkında daha fazla öğrenerek farkındalığını artırabilirsin."}
          </p>
        </div>

        <button
          onClick={sifirla}
          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  const cevapVerildi = secimler[item.id] !== undefined;
  const dogruMu = secimler[item.id] === item.gercekCevap;
  const progress = ((currentIdx + 1) / icerikler.length) * 100;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Deepfake Dedektifi</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          {currentIdx + 1} / {icerikler.length}
        </span>
      </div>

      {/* İlerleme */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* İçerik kartı */}
      <div className="mb-4 rounded-xl border-2 border-amber-200 bg-white p-5 dark:border-amber-800 dark:bg-gray-800">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <h4 className="text-lg font-bold">{item.baslik}</h4>
        </div>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.aciklama}</p>
      </div>

      {/* İpucu kontrol listesi */}
      <div className="mb-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <p className="mb-3 text-sm font-bold">🔍 İpucu Kontrol Listesi:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ipucuListesi.map((ip) => {
            const secili = (isaretler[item.id] || []).includes(ip.key);
            return (
              <button
                key={ip.key}
                onClick={() => isaretToggle(item.id, ip.key)}
                disabled={cevapVerildi}
                className={`flex items-center gap-2 rounded-lg border-2 p-2 text-left text-sm transition ${
                  secili
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : "border-[var(--color-border)] hover:border-amber-300"
                } disabled:opacity-60`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded text-xs ${
                  secili ? "bg-amber-500 text-white" : "bg-gray-200 dark:bg-gray-600"
                }`}>
                  {secili ? "✓" : ""}
                </span>
                {ip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cevap butonları */}
      {!cevapVerildi && (
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => cevapVer("gercek")}
            className="flex-1 rounded-xl border-2 border-green-300 px-4 py-3 font-bold text-green-700 transition hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
          >
            ✅ Gerçek
          </button>
          <button
            onClick={() => cevapVer("deepfake")}
            className="flex-1 rounded-xl border-2 border-red-300 px-4 py-3 font-bold text-red-700 transition hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
          >
            🎭 Deepfake
          </button>
        </div>
      )}

      {/* Sonuç gösterimi */}
      {cevapVerildi && (
        <>
          <div className={`mb-4 rounded-xl p-4 ${
            dogruMu
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-red-50 dark:bg-red-900/20"
          }`}>
            <p className="mb-1 font-bold">
              {dogruMu ? "✅ Doğru bildin!" : "❌ Yanlış tahmin"}
            </p>
            <p className="mb-1 text-sm">
              <span className="font-medium">Cevap: </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                item.gercekCevap === "deepfake"
                  ? "bg-red-200 text-red-800 dark:bg-red-800/40 dark:text-red-200"
                  : "bg-green-200 text-green-800 dark:bg-green-800/40 dark:text-green-200"
              }`}>
                {item.gercekCevap === "deepfake" ? "Deepfake" : "Gerçek"}
              </span>
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">{item.neden}</p>
          </div>

          <button
            onClick={sonraki}
            className="w-full rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
          >
            {currentIdx < icerikler.length - 1 ? "Sonraki İçerik →" : "Sonuçları Gör"}
          </button>
        </>
      )}
    </div>
  );
}
