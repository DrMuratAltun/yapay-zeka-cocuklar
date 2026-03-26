"use client";

import { useState } from "react";

const temalar = [
  { id: "doga", baslik: "Doga", icon: "🌿", aciklama: "Ormanlar, hayvanlar, cevre koruma" },
  { id: "uzay", baslik: "Uzay", icon: "🚀", aciklama: "Gezegenler, astronotlar, kesif" },
  { id: "tarih", baslik: "Tarih", icon: "🏛️", aciklama: "Eski medeniyetler, kahramanlar, icatlar" },
];

const adimlar = [
  { no: 1, baslik: "Tema Sec", icon: "🎨" },
  { no: 2, baslik: "Hikayeni Yaz", icon: "✍️" },
  { no: 3, baslik: "Gorsel Promptlari", icon: "🖼️" },
  { no: 4, baslik: "Ses ve Muzik", icon: "🎵" },
  { no: 5, baslik: "Storyboard", icon: "📋" },
];

export default function HikayeOlusturucu() {
  const [adim, setAdim] = useState(1);
  const [tema, setTema] = useState("");
  const [hikaye, setHikaye] = useState("");
  const [sahneler, setSahneler] = useState(["", "", ""]);
  const [sesAciklama, setSesAciklama] = useState("");
  const [tamamlandi, setTamamlandi] = useState(false);

  const secilenTema = temalar.find((t) => t.id === tema);

  const ileri = () => {
    if (adim < 5) setAdim(adim + 1);
    else setTamamlandi(true);
  };
  const geri = () => {
    if (tamamlandi) {
      setTamamlandi(false);
      return;
    }
    if (adim > 1) setAdim(adim - 1);
  };

  const adimGecerli = () => {
    if (adim === 1) return tema !== "";
    if (adim === 2) return hikaye.trim().length >= 20;
    if (adim === 3) return sahneler.every((s) => s.trim().length > 0);
    if (adim === 4) return sesAciklama.trim().length > 0;
    return true;
  };

  const sifirla = () => {
    setAdim(1);
    setTema("");
    setHikaye("");
    setSahneler(["", "", ""]);
    setSesAciklama("");
    setTamamlandi(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Dijital Hikaye Oluşturucu
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        Dijital Hikaye Storyboard Oluşturucu
      </h3>

      {/* Progress bar */}
      {!tamamlandi && (
        <div className="mb-6">
          <div className="mb-2 flex justify-between">
            {adimlar.map((a) => (
              <div
                key={a.no}
                className={`flex flex-col items-center gap-1 text-xs ${
                  a.no === adim
                    ? "font-bold text-rose-600 dark:text-rose-400"
                    : a.no < adim
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-[var(--color-text-secondary)]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    a.no === adim
                      ? "bg-rose-500 text-white"
                      : a.no < adim
                        ? "bg-emerald-500 text-white"
                        : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {a.no < adim ? "✓" : a.icon}
                </span>
                <span className="hidden sm:block">{a.baslik}</span>
              </div>
            ))}
          </div>
          <div className="h-2 rounded-full bg-[var(--color-bg-secondary)]">
            <div
              className="h-2 rounded-full bg-rose-500 transition-all duration-300"
              style={{ width: `${((adim - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Adim 1: Tema secimi */}
      {!tamamlandi && adim === 1 && (
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            Dijital hikayeni hangi temada oluşturmak istersin?
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {temalar.map((t) => (
              <button
                key={t.id}
                onClick={() => setTema(t.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  tema === t.id
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20"
                    : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-rose-300"
                }`}
              >
                <span className="text-3xl">{t.icon}</span>
                <h4 className="mt-2 font-bold text-[var(--color-text)]">{t.baslik}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{t.aciklama}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Adim 2: Hikaye yazimi */}
      {!tamamlandi && adim === 2 && (
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            <strong>{secilenTema?.icon} {secilenTema?.baslik}</strong> temasında 3-5 cümlelik kısa bir hikaye yaz.
            Bu hikaye dijital içeriğinin temeli olacak.
          </p>
          <textarea
            value={hikaye}
            onChange={(e) => setHikaye(e.target.value)}
            placeholder="Hikayeni buraya yaz... (en az 3 cümle)"
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            rows={5}
          />
          <p className="text-xs text-[var(--color-text-secondary)]">
            {hikaye.trim().length < 20
              ? `En az 20 karakter yazmalısın (${hikaye.trim().length}/20)`
              : `Harika! ${hikaye.trim().length} karakter yazdın.`}
          </p>
        </div>
      )}

      {/* Adim 3: Gorsel promptlari */}
      {!tamamlandi && adim === 3 && (
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            Her sahne için bir YZ görüntü prompt&apos;u yaz. Bir YZ aracına (ör. Bing Image Creator)
            ne yazardın?
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-800 dark:bg-amber-900/20">
            <p className="font-medium text-amber-700 dark:text-amber-400">
              İpucu: Detaylı yaz! Ör: &quot;Yıldızlı bir gecede ormanda yürüyen küçük bir tilki, sulu boya tarzında&quot;
            </p>
          </div>
          {sahneler.map((sahne, i) => (
            <div key={i} className="space-y-1">
              <label className="text-sm font-medium text-[var(--color-text)]">
                Sahne {i + 1} Görseli:
              </label>
              <input
                type="text"
                value={sahne}
                onChange={(e) => {
                  const yeni = [...sahneler];
                  yeni[i] = e.target.value;
                  setSahneler(yeni);
                }}
                placeholder={`Sahne ${i + 1} için görüntü prompt'u yaz...`}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-rose-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}

      {/* Adim 4: Ses ve muzik */}
      {!tamamlandi && adim === 4 && (
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            Hikayene nasıl bir müzik veya ses efekti uygun olur? Hangi duyguyu yaratmak istersin?
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { tip: "Sakin ve huzurlu", icon: "🎶" },
              { tip: "Heyecanlı ve maceracı", icon: "🥁" },
              { tip: "Gizemli ve merak uyandıran", icon: "🎻" },
              { tip: "Neşeli ve eğlenceli", icon: "🎺" },
            ].map((m) => (
              <button
                key={m.tip}
                onClick={() =>
                  setSesAciklama((prev) =>
                    prev ? `${prev}, ${m.tip.toLowerCase()}` : m.tip
                  )
                }
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3 text-left text-sm transition hover:border-rose-300"
              >
                <span className="text-xl">{m.icon}</span>{" "}
                <span className="text-[var(--color-text)]">{m.tip}</span>
              </button>
            ))}
          </div>
          <textarea
            value={sesAciklama}
            onChange={(e) => setSesAciklama(e.target.value)}
            placeholder="Müzik ve ses efektlerini tanımla..."
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-rose-400 focus:outline-none"
            rows={3}
          />
        </div>
      )}

      {/* Adim 5 veya Tamamlandi: Storyboard onizleme */}
      {((!tamamlandi && adim === 5) || tamamlandi) && (
        <div className="space-y-4">
          {tamamlandi && (
            <div className="rounded-xl bg-emerald-50 p-4 text-center dark:bg-emerald-900/20">
              <span className="text-3xl">🎉</span>
              <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">
                Tebrikler! Dijital hikaye storyboard&apos;un hazır!
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-300">
                Artık bu planı gerçek YZ araçlarıyla hayata geçirebilirsin.
              </p>
            </div>
          )}

          <div className="rounded-xl border-2 border-rose-200 bg-[var(--color-bg-secondary)] p-5 dark:border-rose-800">
            <h4 className="mb-3 text-lg font-bold text-[var(--color-text)]">
              {secilenTema?.icon} Dijital Hikaye Planı
            </h4>

            <div className="mb-4 rounded-lg bg-[var(--color-bg)] p-3">
              <p className="text-xs font-medium uppercase text-[var(--color-text-secondary)]">Tema</p>
              <p className="font-medium text-[var(--color-text)]">{secilenTema?.baslik}</p>
            </div>

            <div className="mb-4 rounded-lg bg-[var(--color-bg)] p-3">
              <p className="text-xs font-medium uppercase text-[var(--color-text-secondary)]">Hikaye</p>
              <p className="text-sm text-[var(--color-text)]">{hikaye}</p>
            </div>

            <div className="mb-4 space-y-2">
              <p className="text-xs font-medium uppercase text-[var(--color-text-secondary)]">
                Sahne Görselleri (Promptlar)
              </p>
              {sahneler.map((s, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-[var(--color-bg)] p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--color-text)]">{s}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-[var(--color-bg)] p-3">
              <p className="text-xs font-medium uppercase text-[var(--color-text-secondary)]">
                Müzik / Ses
              </p>
              <p className="text-sm text-[var(--color-text)]">{sesAciklama}</p>
            </div>
          </div>

          {tamamlandi && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h4 className="mb-2 font-bold text-blue-700 dark:text-blue-400">
                Sonraki Adımlar
              </h4>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-300">
                <li>1. Hikayeni ChatGPT veya Gemini ile geliştirebilirsin</li>
                <li>2. Görsel promptlarını Bing Image Creator&apos;da dene</li>
                <li>3. Canva ile bir sunum oluştur</li>
                <li>4. Seslendirmeyi kendi sesinle kaydet</li>
                <li>5. Her şeyi birleştirip dijital hikayeni tamamla!</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Navigasyon butonlari */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={tamamlandi ? sifirla : geri}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            adim === 1 && !tamamlandi
              ? "invisible"
              : tamamlandi
                ? "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
          }`}
        >
          {tamamlandi ? "Baştan Başla" : "Geri"}
        </button>

        {!tamamlandi && (
          <button
            onClick={ileri}
            disabled={!adimGecerli()}
            className={`rounded-lg px-6 py-2 text-sm font-bold text-white transition ${
              adimGecerli()
                ? "bg-rose-500 hover:bg-rose-600"
                : "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {adim === 5 ? "Tamamla" : "İleri"}
          </button>
        )}
      </div>
    </div>
  );
}
