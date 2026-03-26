"use client";

import { useState } from "react";

interface IzinTalebi {
  id: number;
  uygulama: string;
  uygulamaIcon: string;
  izin: string;
  izinIcon: string;
  aciklama: string;
  dogruCevap: "gerekli" | "gereksiz" | "tehlikeli";
  neden: string;
}

const izinTalepleri: IzinTalebi[] = [
  {
    id: 1,
    uygulama: "Harita Uygulaması",
    uygulamaIcon: "🗺️",
    izin: "Konum (her zaman açık)",
    izinIcon: "📍",
    aciklama: "Bu harita uygulaması konumunuza her zaman (uygulama kapalıyken bile) erişmek istiyor.",
    dogruCevap: "gereksiz",
    neden: "Harita uygulaması konumu sadece kullanılırken ihtiyaç duyar. 'Her zaman açık' konum izni gereksiz veri toplanmasına yol açar. 'Yalnızca kullanırken' seçeneği yeterlidir.",
  },
  {
    id: 2,
    uygulama: "Sesli Asistan",
    uygulamaIcon: "🎙️",
    izin: "Mikrofon erişimi",
    izinIcon: "🎤",
    aciklama: "Sesli asistan uygulaması sesli komutları algılamak için mikrofon erişimi istiyor.",
    dogruCevap: "gerekli",
    neden: "Sesli asistanın temel işlevi ses komutlarını algılamaktır. Mikrofon erişimi bu işlev için gereklidir.",
  },
  {
    id: 3,
    uygulama: "El Feneri Uygulaması",
    uygulamaIcon: "🔦",
    izin: "Rehber (kişi listesi) erişimi",
    izinIcon: "📋",
    aciklama: "Basit bir el feneri uygulaması telefon rehberinize erişmek istiyor.",
    dogruCevap: "tehlikeli",
    neden: "El feneri uygulamasının kişi listesine erişmesi için hiçbir geçerli neden yoktur. Bu, kişisel verilerinizi toplamak için bir girişim olabilir!",
  },
  {
    id: 4,
    uygulama: "Fotoğraf Düzenleme",
    uygulamaIcon: "📸",
    izin: "Galeri erişimi",
    izinIcon: "🖼️",
    aciklama: "Fotoğraf düzenleme uygulaması galerinize erişmek istiyor.",
    dogruCevap: "gerekli",
    neden: "Fotoğraf düzenleme uygulamasının fotoğraflarınıza erişmesi temel işlevi için gereklidir.",
  },
  {
    id: 5,
    uygulama: "Hava Durumu",
    uygulamaIcon: "🌤️",
    izin: "Tarama geçmişi erişimi",
    izinIcon: "🌐",
    aciklama: "Hava durumu uygulaması internet tarama geçmişinize erişmek istiyor.",
    dogruCevap: "tehlikeli",
    neden: "Hava durumu uygulamasının tarama geçmişinize erişmesi için hiçbir geçerli neden yoktur. Bu ciddi bir gizlilik ihlali girişimidir.",
  },
  {
    id: 6,
    uygulama: "Oyun Uygulaması",
    uygulamaIcon: "🎮",
    izin: "SMS mesajları okuma",
    izinIcon: "💬",
    aciklama: "Bir oyun uygulaması SMS mesajlarınızı okuma izni istiyor.",
    dogruCevap: "tehlikeli",
    neden: "Oyun uygulamasının SMS okuma ihtiyacı yoktur. Bu izinle doğrulama kodlarınız ve kişisel mesajlarınız okunabilir!",
  },
  {
    id: 7,
    uygulama: "Navigasyon",
    uygulamaIcon: "🧭",
    izin: "Konum (kullanılırken)",
    izinIcon: "📍",
    aciklama: "Navigasyon uygulaması sadece uygulama açıkken konumunuza erişmek istiyor.",
    dogruCevap: "gerekli",
    neden: "Navigasyon uygulamasının yol tarifi verebilmesi için konum bilgisi gereklidir. 'Kullanılırken' seçeneği uygun bir izin seviyesidir.",
  },
  {
    id: 8,
    uygulama: "Not Defteri",
    uygulamaIcon: "📝",
    izin: "Kamera ve mikrofon erişimi",
    izinIcon: "📷",
    aciklama: "Basit bir not defteri uygulaması kameranıza ve mikrofonunuza erişmek istiyor.",
    dogruCevap: "gereksiz",
    neden: "Basit not defteri uygulaması metin yazmak içindir. Kamera ve mikrofon erişimi bu işlev için gereksizdir. Sesli not veya fotoğraf ekleme özelliği yoksa bu izinler verilmemelidir.",
  },
];

const cevapSecenekleri = [
  { key: "gerekli" as const, label: "Gerekli", renk: "bg-emerald-500", icon: "✓", aciklama: "Bu izin uygulamanın çalışması için gerekli" },
  { key: "gereksiz" as const, label: "Gereksiz", renk: "bg-amber-500", icon: "~", aciklama: "Bu izin gerekli değil, reddetmek daha iyi" },
  { key: "tehlikeli" as const, label: "Tehlikeli", renk: "bg-rose-500", icon: "!", aciklama: "Bu izin şüpheli ve tehlikeli olabilir" },
];

export default function GizlilikDenetcisi() {
  const [mevcutIdx, setMevcutIdx] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, string>>({});
  const [gosterAciklama, setGosterAciklama] = useState(false);
  const [bitti, setBitti] = useState(false);

  const talep = izinTalepleri[mevcutIdx];
  const cevapVerildi = cevaplar[talep.id] !== undefined;

  const handleCevap = (cevap: string) => {
    if (cevapVerildi) return;
    setCevaplar((prev) => ({ ...prev, [talep.id]: cevap }));
    setGosterAciklama(true);
  };

  const handleSonraki = () => {
    if (mevcutIdx < izinTalepleri.length - 1) {
      setMevcutIdx(mevcutIdx + 1);
      setGosterAciklama(false);
    } else {
      setBitti(true);
    }
  };

  const dogruSayisi = izinTalepleri.filter((t) => cevaplar[t.id] === t.dogruCevap).length;

  if (bitti) {
    const puan = Math.round((dogruSayisi / izinTalepleri.length) * 100);
    let seviye: string;
    let seviyeEmoji: string;
    if (puan >= 90) { seviye = "Gizlilik Uzmanı"; seviyeEmoji = "🛡️"; }
    else if (puan >= 75) { seviye = "Dijital Güvenlik Savaşçısı"; seviyeEmoji = "⚔️"; }
    else if (puan >= 50) { seviye = "Farkındalık Öğrencisi"; seviyeEmoji = "📖"; }
    else { seviye = "Gizlilik Çırağı"; seviyeEmoji = "🌱"; }

    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-center text-white">
          <span className="text-5xl">{seviyeEmoji}</span>
          <h3 className="mt-3 text-2xl font-extrabold">{seviye}</h3>
          <p className="mt-2 text-lg">{dogruSayisi} / {izinTalepleri.length} doğru değerlendirme</p>
          <p className="mt-1 text-amber-100">
            {puan >= 75
              ? "Dijital gizlilik konusunda çok dikkatlisin!"
              : "Uygulama izinlerine daha dikkatli bakmalısın!"}
          </p>
        </div>

        <div className="space-y-2">
          {izinTalepleri.map((t) => (
            <div key={t.id} className={`flex items-center gap-3 rounded-lg p-3 text-sm ${
              cevaplar[t.id] === t.dogruCevap
                ? "bg-emerald-50 dark:bg-emerald-900/10"
                : "bg-rose-50 dark:bg-rose-900/10"
            }`}>
              <span>{cevaplar[t.id] === t.dogruCevap ? "✅" : "❌"}</span>
              <span className="text-lg">{t.uygulamaIcon}</span>
              <span className="flex-1">{t.uygulama}: {t.izin}</span>
              <span className={`rounded px-2 py-0.5 text-xs font-bold text-white ${
                cevapSecenekleri.find((c) => c.key === t.dogruCevap)!.renk
              }`}>
                {cevapSecenekleri.find((c) => c.key === t.dogruCevap)!.label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
          <h4 className="mb-2 font-bold">Gizlilik İpuçları:</h4>
          <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>&#8226; Her izin talebini &quot;Bu uygulama buna neden ihtiyaç duyar?&quot; sorusuyla değerlendir.</li>
            <li>&#8226; Gereksiz izinleri reddet, uygulamanın çoğu özelliği yine çalışır.</li>
            <li>&#8226; Konum iznini &quot;her zaman&quot; yerine &quot;kullanılırken&quot; olarak ver.</li>
            <li>&#8226; Düzenli olarak uygulama izinlerini gözden geçir.</li>
          </ul>
        </div>

        <button
          onClick={() => { setMevcutIdx(0); setCevaplar({}); setGosterAciklama(false); setBitti(false); }}
          className="mx-auto block rounded-xl bg-amber-600 px-6 py-2.5 font-bold text-white transition hover:bg-amber-700"
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Gizlilik Denetçisi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Uygulama izin taleplerini değerlendir!
        </p>
      </div>

      {/* İlerleme */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>İzin Talebi {mevcutIdx + 1} / {izinTalepleri.length}</span>
          <span>{dogruSayisi} doğru</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-bg-secondary)]">
          <div
            className="h-2 rounded-full bg-amber-500 transition-all"
            style={{ width: `${((mevcutIdx + (cevapVerildi ? 1 : 0)) / izinTalepleri.length) * 100}%` }}
          />
        </div>
      </div>

      {/* İzin Talebi Kartı */}
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-6 dark:border-amber-800 dark:bg-amber-900/10">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-3xl">{talep.uygulamaIcon}</span>
          <div>
            <h4 className="font-bold">{talep.uygulama}</h4>
            <p className="text-sm text-[var(--color-text-secondary)]">izin istiyor:</p>
          </div>
        </div>
        <div className="rounded-xl bg-white/70 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{talep.izinIcon}</span>
            <span className="font-bold">{talep.izin}</span>
          </div>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{talep.aciklama}</p>
        </div>
      </div>

      {/* Cevap Butonları */}
      <div className="grid grid-cols-3 gap-3">
        {cevapSecenekleri.map((c) => {
          const secildi = cevaplar[talep.id] === c.key;
          const dogruMu = cevapVerildi && c.key === talep.dogruCevap;
          return (
            <button
              key={c.key}
              onClick={() => handleCevap(c.key)}
              disabled={cevapVerildi}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 font-bold transition ${
                dogruMu
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  : secildi && !dogruMu
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-amber-300 disabled:opacity-50"
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white ${c.renk}`}>
                {c.icon}
              </span>
              <span className="text-sm">{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Açıklama */}
      {gosterAciklama && (
        <div className={`rounded-2xl p-5 ${
          cevaplar[talep.id] === talep.dogruCevap
            ? "bg-emerald-50 dark:bg-emerald-900/20"
            : "bg-rose-50 dark:bg-rose-900/20"
        }`}>
          <p className="mb-2 font-bold">
            {cevaplar[talep.id] === talep.dogruCevap ? "✅ Doğru!" : "❌ Yanlış!"}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{talep.neden}</p>
          <button
            onClick={handleSonraki}
            className="mt-3 rounded-lg bg-amber-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
          >
            {mevcutIdx < izinTalepleri.length - 1 ? "Sonraki İzin Talebi →" : "Sonuçları Gör"}
          </button>
        </div>
      )}
    </div>
  );
}
