"use client";

import { useState } from "react";

const adimlar = [
  { no: 1, baslik: "Hesap Oluştur", icon: "🔑" },
  { no: 2, baslik: "Proje Oluştur", icon: "📁" },
  { no: 3, baslik: "Eğitim Verisi Gir", icon: "📝" },
  { no: 4, baslik: "Eğit ve Test Et", icon: "🧪" },
  { no: 5, baslik: "PictoBlox Entegrasyonu", icon: "🧩" },
];

const scratchKontrolListesi = [
  "machinelearningforkids.co.uk adresinden PictoBlox uzantısını ekledim",
  "PictoBlox projesinde 'recognize text' bloğunu buldum",
  "Kullanıcıdan metin girişi alıyorum",
  "Modelin tahminini ekranda gösteriyorum",
  "Farklı sınıflar için farklı tepkiler programladım",
];

export default function MLForKidsRehber() {
  const [adim, setAdim] = useState(1);
  const [projeTuru, setProjeTuru] = useState("");
  const [kategori1, setKategori1] = useState("");
  const [kategori2, setKategori2] = useState("");
  const [ornekler1, setOrnekler1] = useState(["", "", "", "", ""]);
  const [ornekler2, setOrnekler2] = useState(["", "", "", "", ""]);
  const [testSonuclari, setTestSonuclari] = useState<(boolean | null)[]>(
    new Array(5).fill(null)
  );
  const [scratchChecklist, setScratchChecklist] = useState<boolean[]>(
    new Array(scratchKontrolListesi.length).fill(false)
  );
  const [notlar, setNotlar] = useState("");
  const [tamamlandi, setTamamlandi] = useState(false);

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
    if (adim === 1) return true;
    if (adim === 2)
      return (
        projeTuru !== "" &&
        kategori1.trim().length > 0 &&
        kategori2.trim().length > 0
      );
    if (adim === 3)
      return (
        ornekler1.every((o) => o.trim().length > 0) &&
        ornekler2.every((o) => o.trim().length > 0)
      );
    if (adim === 4) return testSonuclari.every((s) => s !== null);
    if (adim === 5) return scratchChecklist.filter(Boolean).length >= 3;
    return true;
  };

  const updateOrnek = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    set((prev) => {
      const yeni = [...prev];
      yeni[index] = value;
      return yeni;
    });
  };

  const toggleScratchItem = (index: number) => {
    setScratchChecklist((prev) => {
      const yeni = [...prev];
      yeni[index] = !yeni[index];
      return yeni;
    });
  };

  const setTestSonuc = (index: number, dogru: boolean) => {
    setTestSonuclari((prev) => {
      const yeni = [...prev];
      yeni[index] = dogru;
      return yeni;
    });
  };

  const dogruSayisi = testSonuclari.filter((s) => s === true).length;

  const sifirla = () => {
    setAdim(1);
    setProjeTuru("");
    setKategori1("");
    setKategori2("");
    setOrnekler1(["", "", "", "", ""]);
    setOrnekler2(["", "", "", "", ""]);
    setTestSonuclari(new Array(5).fill(null));
    setScratchChecklist(new Array(scratchKontrolListesi.length).fill(false));
    setNotlar("");
    setTamamlandi(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> PictoBlox Platformu Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          PictoBlox, çocukların ve gençlerin makine öğrenimi projelerini kolayca oluşturmasını sağlayan bir platformdur. Blok tabanlı kodlama ile kendi yapay zeka modelini eğitip oyunlara ve projelere ekleyebilirsin. Kod yazmayı ve YZ&apos;yi aynı anda öğrenmenin harika bir yoludur!
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-purple-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          PictoBlox Rehberi
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        PictoBlox - Adım Adım Rehber
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
                    ? "font-bold text-purple-500"
                    : a.no < adim
                      ? "text-emerald-500"
                      : "text-[var(--color-text-secondary)]"
                }`}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="hidden sm:block">{a.baslik}</span>
              </div>
            ))}
          </div>
          <div className="h-2 rounded-full bg-[var(--color-bg-secondary)]">
            <div
              className="h-2 rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${((adim - 1) / 4) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-[var(--color-text-secondary)]">
            Adım {adim} / 5
          </p>
        </div>
      )}

      {/* Adım 1: Hesap Oluştur */}
      {!tamamlandi && adim === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
            <h4 className="mb-2 font-bold text-purple-700 dark:text-purple-300">
              🔑 PictoBlox&apos;a Kayıt
            </h4>
            <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
              PictoBlox, çocuklar için makine öğrenimi deneyimi sunan
              bir platformdur. Metin, görüntü veya sayı sınıflandırma projeleri
              oluşturabilir ve bunları blok kodlama ile birleştirebilirsiniz.
            </p>
            <a
              href="https://machinelearningforkids.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-purple-600"
            >
              PictoBlox&apos;u Aç ↗
            </a>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="mb-2 text-sm font-bold text-[var(--color-text)]">
              Kayıt Adımları:
            </p>
            <ol className="space-y-1 text-sm text-[var(--color-text-secondary)]">
              <li>1. &quot;Try it now&quot; butonuna tıklayın</li>
              <li>
                2. Öğretmeninizin sağladığı sınıf anahtarını girin veya misafir
                olarak devam edin
              </li>
              <li>3. &quot;Projects&quot; sayfasına gidin</li>
            </ol>
          </div>
        </div>
      )}

      {/* Adım 2: Proje Oluştur */}
      {!tamamlandi && adim === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Ne tür bir sınıflandırma projesi yapmak istiyorsun?
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                id: "metin",
                baslik: "Metin",
                icon: "📝",
                aciklama: "Cümleleri sınıflandır",
              },
              {
                id: "goruntu",
                baslik: "Görüntü",
                icon: "🖼️",
                aciklama: "Resimleri sınıflandır",
              },
              {
                id: "sayi",
                baslik: "Sayı",
                icon: "🔢",
                aciklama: "Sayısal verileri sınıflandır",
              },
            ].map((tur) => (
              <button
                key={tur.id}
                onClick={() => setProjeTuru(tur.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  projeTuru === tur.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-[var(--color-border)] hover:border-purple-300"
                }`}
              >
                <span className="text-2xl">{tur.icon}</span>
                <h4 className="mt-2 font-bold text-[var(--color-text)]">
                  {tur.baslik}
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {tur.aciklama}
                </p>
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Kategori 1
              </label>
              <input
                type="text"
                value={kategori1}
                onChange={(e) => setKategori1(e.target.value)}
                placeholder="Örn: Mutlu"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Kategori 2
              </label>
              <input
                type="text"
                value={kategori2}
                onChange={(e) => setKategori2(e.target.value)}
                placeholder="Örn: Üzgün"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Adım 3: Eğitim Verisi Gir */}
      {!tamamlandi && adim === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Her kategori için 5 örnek{" "}
            {projeTuru === "metin"
              ? "cümle"
              : projeTuru === "goruntu"
                ? "açıklama"
                : "veri"}{" "}
            gir:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Kategori 1 */}
            <div className="rounded-xl border border-[var(--color-border)] p-4">
              <h4 className="mb-3 font-bold text-purple-600">
                {kategori1 || "Kategori 1"}
              </h4>
              <div className="space-y-2">
                {ornekler1.map((ornek, i) => (
                  <input
                    key={i}
                    type="text"
                    value={ornek}
                    onChange={(e) =>
                      updateOrnek(setOrnekler1, i, e.target.value)
                    }
                    placeholder={`Örnek ${i + 1}`}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
                  />
                ))}
              </div>
            </div>
            {/* Kategori 2 */}
            <div className="rounded-xl border border-[var(--color-border)] p-4">
              <h4 className="mb-3 font-bold text-purple-600">
                {kategori2 || "Kategori 2"}
              </h4>
              <div className="space-y-2">
                {ornekler2.map((ornek, i) => (
                  <input
                    key={i}
                    type="text"
                    value={ornek}
                    onChange={(e) =>
                      updateOrnek(setOrnekler2, i, e.target.value)
                    }
                    placeholder={`Örnek ${i + 1}`}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Doldurulan:{" "}
            {[...ornekler1, ...ornekler2].filter((o) => o.trim().length > 0)
              .length}{" "}
            / 10
          </p>
        </div>
      )}

      {/* Adım 4: Eğit ve Test Et */}
      {!tamamlandi && adim === 4 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
            <p className="text-sm text-[var(--color-text-secondary)]">
              PictoBlox&apos;ta &quot;Train Model&quot; butonuna tıkla.
              Model eğitildikten sonra &quot;Test&quot; bölümünde 5 farklı
              girdiyi dene ve sonuçları kaydet:
            </p>
          </div>
          <div className="space-y-2">
            {testSonuclari.map((sonuc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-3"
              >
                <span className="w-20 text-sm font-bold text-[var(--color-text)]">
                  Deneme {i + 1}
                </span>
                <button
                  onClick={() => setTestSonuc(i, true)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-bold transition ${
                    sonuc === true
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-emerald-100"
                  }`}
                >
                  ✓ Doğru Tahmin
                </button>
                <button
                  onClick={() => setTestSonuc(i, false)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-bold transition ${
                    sonuc === false
                      ? "bg-red-500 text-white"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-red-100"
                  }`}
                >
                  ✗ Yanlış Tahmin
                </button>
              </div>
            ))}
          </div>
          {testSonuclari.every((s) => s !== null) && (
            <div className="rounded-xl bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
              <p className="text-lg font-bold">
                Sonuç: {dogruSayisi}/5 doğru (%
                {Math.round((dogruSayisi / 5) * 100)})
              </p>
            </div>
          )}
        </div>
      )}

      {/* Adım 5: PictoBlox Entegrasyonu */}
      {!tamamlandi && adim === 5 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Modelini PictoBlox&apos;ta kullanmak için aşağıdaki adımları takip et:
          </p>
          <div className="space-y-2">
            {scratchKontrolListesi.map((madde, i) => (
              <button
                key={i}
                onClick={() => toggleScratchItem(i)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${
                  scratchChecklist[i]
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-[var(--color-border)] hover:border-purple-300"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-xs font-bold ${
                    scratchChecklist[i]
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {scratchChecklist[i] ? "✓" : ""}
                </span>
                <span className="text-[var(--color-text)]">{madde}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
              Notlarım
            </label>
            <textarea
              value={notlar}
              onChange={(e) => setNotlar(e.target.value)}
              placeholder="Bu proje hakkında notlarını buraya yazabilirsin..."
              rows={3}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
            />
          </div>
        </div>
      )}

      {/* Tamamlandı */}
      {tamamlandi && (
        <div className="space-y-4 text-center">
          <div className="text-5xl">🏆</div>
          <h4 className="text-xl font-bold text-[var(--color-text)]">
            PictoBlox Rehberini Tamamladın!
          </h4>
          <div className="mx-auto max-w-md space-y-2 text-left text-sm">
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Proje Türü:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {projeTuru === "metin"
                  ? "Metin"
                  : projeTuru === "goruntu"
                    ? "Görüntü"
                    : "Sayı"}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Kategoriler:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {kategori1} / {kategori2}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Test Sonucu:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {dogruSayisi}/5 doğru
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                PictoBlox Adımları:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {scratchChecklist.filter(Boolean).length}/
                {scratchKontrolListesi.length}
              </span>
            </div>
          </div>
          {notlar && (
            <div className="mx-auto max-w-md rounded-lg bg-[var(--color-bg-secondary)] p-3 text-left text-sm">
              <p className="mb-1 font-bold text-[var(--color-text)]">
                Notların:
              </p>
              <p className="text-[var(--color-text-secondary)]">{notlar}</p>
            </div>
          )}
          <button
            onClick={sifirla}
            className="rounded-lg bg-purple-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-purple-600"
          >
            Baştan Başla
          </button>
        </div>
      )}

      {/* Navigasyon */}
      {!tamamlandi && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={geri}
            disabled={adim === 1}
            className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:opacity-80 disabled:opacity-30"
          >
            ← Geri
          </button>
          <button
            onClick={ileri}
            disabled={!adimGecerli()}
            className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-purple-600 disabled:opacity-30"
          >
            {adim === 5 ? "Tamamla ✓" : "İleri →"}
          </button>
        </div>
      )}
    </div>
  );
}
