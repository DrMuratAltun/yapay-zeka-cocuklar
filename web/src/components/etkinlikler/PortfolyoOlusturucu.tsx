"use client";

import { useState } from "react";

const bolumleri = [
  { id: "ad", baslik: "Adın Soyadın", placeholder: "Adını ve soyadını yaz", icon: "👤", tip: "input" },
  { id: "proje", baslik: "En Sevdiğim YZ Projesi", placeholder: "Bu kitapta en çok hangi projeyi sevdin? Neden?", icon: "🌟", tip: "textarea" },
  { id: "ogrendiklerim", baslik: "Öğrendiğim 3 Şey", placeholder: "YZ hakkında öğrendiğin en önemli 3 şeyi yaz", icon: "💡", tip: "triple" },
  { id: "hedef", baslik: "Gelecekteki Hedefim", placeholder: "YZ ile gelecekte ne yapmak istiyorsun?", icon: "🎯", tip: "textarea" },
  { id: "mesaj", baslik: "YZ Hakkında Mesajım", placeholder: "Dünyaya YZ hakkında bir mesajın olsa ne derdin?", icon: "💬", tip: "textarea" },
];

export default function PortfolyoOlusturucu() {
  const [ad, setAd] = useState("");
  const [proje, setProje] = useState("");
  const [sey1, setSey1] = useState("");
  const [sey2, setSey2] = useState("");
  const [sey3, setSey3] = useState("");
  const [hedef, setHedef] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [goster, setGoster] = useState(false);

  const tamam =
    ad.trim().length > 0 &&
    proje.trim().length > 0 &&
    sey1.trim().length > 0 &&
    sey2.trim().length > 0 &&
    sey3.trim().length > 0 &&
    hedef.trim().length > 0 &&
    mesaj.trim().length > 0;

  const sifirla = () => {
    setAd("");
    setProje("");
    setSey1("");
    setSey2("");
    setSey3("");
    setHedef("");
    setMesaj("");
    setGoster(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-indigo-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Portfolyo Oluşturucu
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        YZ Yolculuğu Portfolyo Kartı
      </h3>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sol: Form */}
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Aşağıdaki alanları doldur ve sağ tarafta portfolyo kartının canlı önizlemesini gör!
          </p>

          {/* Ad */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span>👤</span> Adın Soyadın
            </label>
            <input
              type="text"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder="Adını ve soyadını yaz"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-indigo-400 focus:outline-none"
            />
          </div>

          {/* Proje */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span>🌟</span> En Sevdiğim YZ Projesi
            </label>
            <textarea
              value={proje}
              onChange={(e) => setProje(e.target.value)}
              placeholder="Bu kitapta en çok hangi projeyi sevdin? Neden?"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-indigo-400 focus:outline-none"
              rows={2}
            />
          </div>

          {/* 3 sey */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span>💡</span> Öğrendiğim 3 Şey
            </label>
            <div className="space-y-2">
              {[
                { val: sey1, set: setSey1, no: 1 },
                { val: sey2, set: setSey2, no: 2 },
                { val: sey3, set: setSey3, no: 3 },
              ].map((item) => (
                <div key={item.no} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                    {item.no}
                  </span>
                  <input
                    type="text"
                    value={item.val}
                    onChange={(e) => item.set(e.target.value)}
                    placeholder={`${item.no}. öğrendiğin şey`}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-1.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-indigo-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hedef */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span>🎯</span> Gelecekteki Hedefim
            </label>
            <textarea
              value={hedef}
              onChange={(e) => setHedef(e.target.value)}
              placeholder="YZ ile gelecekte ne yapmak istiyorsun?"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-indigo-400 focus:outline-none"
              rows={2}
            />
          </div>

          {/* Mesaj */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
              <span>💬</span> YZ Hakkında Mesajım
            </label>
            <textarea
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              placeholder="Dünyaya YZ hakkında bir mesajın olsa ne derdin?"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-indigo-400 focus:outline-none"
              rows={2}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setGoster(true)}
              disabled={!tamam}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold text-white transition ${
                tamam
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Portfolyo Kartını Oluştur
            </button>
            <button
              onClick={sifirla}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-border)]"
            >
              Temizle
            </button>
          </div>
        </div>

        {/* Sag: Canli onizleme */}
        <div>
          <p className="mb-2 text-center text-xs font-medium uppercase text-[var(--color-text-secondary)]">
            Canlı Önizleme
          </p>
          <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-5 dark:border-indigo-800 dark:from-indigo-950/40 dark:to-violet-950/40">
            {/* Kart header */}
            <div className="mb-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl text-white">
                {ad ? ad.charAt(0).toUpperCase() : "?"}
              </div>
              <h4 className="mt-2 text-lg font-bold text-[var(--color-text)]">
                {ad || "Adın Soyadın"}
              </h4>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                YZ Maceracısı
              </p>
            </div>

            {/* Proje */}
            <div className="mb-3 rounded-lg bg-white/60 p-3 dark:bg-white/5">
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                🌟 Favori Proje
              </p>
              <p className="text-sm text-[var(--color-text)]">
                {proje || <span className="italic text-[var(--color-text-secondary)]">Henüz yazılmadı...</span>}
              </p>
            </div>

            {/* Ogrendiklerim */}
            <div className="mb-3 rounded-lg bg-white/60 p-3 dark:bg-white/5">
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                💡 Öğrendiklerim
              </p>
              <ul className="mt-1 space-y-1 text-sm text-[var(--color-text)]">
                <li>{sey1 ? `1. ${sey1}` : <span className="italic text-[var(--color-text-secondary)]">1. ...</span>}</li>
                <li>{sey2 ? `2. ${sey2}` : <span className="italic text-[var(--color-text-secondary)]">2. ...</span>}</li>
                <li>{sey3 ? `3. ${sey3}` : <span className="italic text-[var(--color-text-secondary)]">3. ...</span>}</li>
              </ul>
            </div>

            {/* Hedef */}
            <div className="mb-3 rounded-lg bg-white/60 p-3 dark:bg-white/5">
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                🎯 Gelecek Hedefim
              </p>
              <p className="text-sm text-[var(--color-text)]">
                {hedef || <span className="italic text-[var(--color-text-secondary)]">Henüz yazılmadı...</span>}
              </p>
            </div>

            {/* Mesaj */}
            <div className="rounded-lg bg-white/60 p-3 dark:bg-white/5">
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                💬 Mesajım
              </p>
              <p className="text-sm italic text-[var(--color-text)]">
                &quot;{mesaj || "..."}&quot;
              </p>
            </div>

            <div className="mt-4 text-center text-xs text-[var(--color-text-secondary)]">
              Yapay Zeka Macerası - 2025
            </div>
          </div>
        </div>
      </div>

      {/* Tebrikler mesaji */}
      {goster && tamam && (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-center text-white">
            <span className="text-4xl">🎉</span>
            <h4 className="mt-2 text-xl font-extrabold">Tebrikler, {ad}!</h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-indigo-100">
              Yapay Zeka Macerası yolculuğunu başarıyla tamamladın! Portfolyo kartın hazır.
              Ekran görüntüsünü alarak saklayabilir veya arkadaşlarınla paylaşabilirsin.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
            <h4 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">
              Unutma!
            </h4>
            <ul className="space-y-1 text-sm text-emerald-600 dark:text-emerald-300">
              <li>&#8226; YZ güçlü bir araçtır ve onu sorumlulukla kullanmalıyız.</li>
              <li>&#8226; Öğrenme asla bitmez - merak etmeye devam et!</li>
              <li>&#8226; Geleceğin teknolojilerini şekillendirecek olan sensin.</li>
              <li>&#8226; Bu portfolyo kartı, YZ yolculuğunun ilk adımının belgesi.</li>
            </ul>
          </div>

          <p className="text-center text-xs text-[var(--color-text-secondary)]">
            İpucu: Portfolyo kartını kaydetmek için ekran görüntüsü al!
          </p>
        </div>
      )}
    </div>
  );
}
