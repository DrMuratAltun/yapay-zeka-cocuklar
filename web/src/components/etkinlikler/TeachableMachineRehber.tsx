"use client";

import { useState } from "react";

const adimlar = [
  { no: 1, baslik: "Siteye Git", icon: "🌐" },
  { no: 2, baslik: "Proje Türü Seç", icon: "📂" },
  { no: 3, baslik: "Sınıf Oluştur", icon: "🏷️" },
  { no: 4, baslik: "Veri Topla", icon: "📸" },
  { no: 5, baslik: "Modeli Eğit", icon: "⚙️" },
  { no: 6, baslik: "Test Et", icon: "🧪" },
];

const veriKontrolListesi = [
  "Her sınıf için en az 50 örnek topladım",
  "Farklı açılardan fotoğraf çektim",
  "Farklı ışık koşullarında denedim",
  "Arka planı değiştirerek örnekler ekledim",
  "Yakın ve uzak mesafeden çektim",
];

export default function TeachableMachineRehber() {
  const [adim, setAdim] = useState(1);
  const [projeTuru, setProjeTuru] = useState("");
  const [sinif1, setSinif1] = useState("");
  const [sinif2, setSinif2] = useState("");
  const [veriChecklist, setVeriChecklist] = useState<boolean[]>(
    new Array(veriKontrolListesi.length).fill(false)
  );
  const [testSonuclari, setTestSonuclari] = useState<(boolean | null)[]>(
    new Array(10).fill(null)
  );
  const [tamamlandi, setTamamlandi] = useState(false);

  const ileri = () => {
    if (adim < 6) setAdim(adim + 1);
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
    if (adim === 2) return projeTuru !== "";
    if (adim === 3) return sinif1.trim().length > 0 && sinif2.trim().length > 0;
    if (adim === 4) return veriChecklist.filter(Boolean).length >= 3;
    if (adim === 5) return true;
    if (adim === 6) return testSonuclari.every((s) => s !== null);
    return true;
  };

  const toggleVeriItem = (index: number) => {
    setVeriChecklist((prev) => {
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
  const yanlisSayisi = testSonuclari.filter((s) => s === false).length;
  const basariOrani =
    testSonuclari.every((s) => s !== null)
      ? Math.round((dogruSayisi / 10) * 100)
      : null;

  const sifirla = () => {
    setAdim(1);
    setProjeTuru("");
    setSinif1("");
    setSinif2("");
    setVeriChecklist(new Array(veriKontrolListesi.length).fill(false));
    setTestSonuclari(new Array(10).fill(null));
    setTamamlandi(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Teachable Machine Rehberi
        </span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        Teachable Machine - Adım Adım Rehber
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
                    ? "font-bold text-blue-500"
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
              className="h-2 rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${((adim - 1) / 5) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-[var(--color-text-secondary)]">
            Adım {adim} / 6
          </p>
        </div>
      )}

      {/* Adım 1: Siteye Git */}
      {!tamamlandi && adim === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <h4 className="mb-2 font-bold text-blue-700 dark:text-blue-300">
              🌐 Teachable Machine Nedir?
            </h4>
            <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
              Google&apos;ın geliştirdiği, tarayıcıda makine öğrenimi modeli
              eğitmenize olanak tanıyan ücretsiz bir araçtır. Kod yazmadan
              görüntü, ses veya poz tanıma modeli oluşturabilirsiniz.
            </p>
            <a
              href="https://teachablemachine.withgoogle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Teachable Machine&apos;i Aç ↗
            </a>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Siteyi açtıktan sonra <strong>&quot;Get Started&quot;</strong>{" "}
              butonuna tıklayın. Bir sonraki adımda proje türünü seçeceksiniz.
            </p>
          </div>
        </div>
      )}

      {/* Adım 2: Proje Türü Seç */}
      {!tamamlandi && adim === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Hangi tür bir proje oluşturmak istiyorsun?
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                id: "goruntu",
                baslik: "Görüntü Projesi",
                icon: "📷",
                aciklama: "Kameradan nesneleri tanır",
              },
              {
                id: "ses",
                baslik: "Ses Projesi",
                icon: "🎤",
                aciklama: "Mikrofondan sesleri tanır",
              },
              {
                id: "poz",
                baslik: "Poz Projesi",
                icon: "🤸",
                aciklama: "Vücut hareketlerini tanır",
              },
            ].map((tur) => (
              <button
                key={tur.id}
                onClick={() => setProjeTuru(tur.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  projeTuru === tur.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-[var(--color-border)] hover:border-blue-300"
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
        </div>
      )}

      {/* Adım 3: Sınıf Oluştur */}
      {!tamamlandi && adim === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Modelinin ayırt edeceği iki sınıfın adını gir. Örneğin:
            &quot;Kalem&quot; ve &quot;Silgi&quot; veya &quot;El
            Açık&quot; ve &quot;Yumruk&quot;
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Sınıf 1
              </label>
              <input
                type="text"
                value={sinif1}
                onChange={(e) => setSinif1(e.target.value)}
                placeholder="Örn: Kalem"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-[var(--color-text)]">
                Sınıf 2
              </label>
              <input
                type="text"
                value={sinif2}
                onChange={(e) => setSinif2(e.target.value)}
                placeholder="Örn: Silgi"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]"
              />
            </div>
          </div>
          {sinif1 && sinif2 && (
            <div className="rounded-xl bg-emerald-50 p-3 text-sm dark:bg-emerald-900/20">
              Modelin <strong>&quot;{sinif1}&quot;</strong> ile{" "}
              <strong>&quot;{sinif2}&quot;</strong> arasındaki farkı öğrenecek!
            </div>
          )}
        </div>
      )}

      {/* Adım 4: Veri Topla */}
      {!tamamlandi && adim === 4 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            İyi bir model için kaliteli veri toplamak çok önemli! Aşağıdaki
            kontrol listesini takip et:
          </p>
          <div className="space-y-2">
            {veriKontrolListesi.map((madde, i) => (
              <button
                key={i}
                onClick={() => toggleVeriItem(i)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition ${
                  veriChecklist[i]
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-[var(--color-border)] hover:border-emerald-300"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-xs font-bold ${
                    veriChecklist[i]
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {veriChecklist[i] ? "✓" : ""}
                </span>
                <span className="text-[var(--color-text)]">{madde}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            En az 3 maddeyi tamamlaman gerekiyor.
            Tamamlanan: {veriChecklist.filter(Boolean).length} /{" "}
            {veriKontrolListesi.length}
          </p>
        </div>
      )}

      {/* Adım 5: Modeli Eğit */}
      {!tamamlandi && adim === 5 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
            <h4 className="mb-2 font-bold text-amber-700 dark:text-amber-300">
              ⚙️ Eğitim Süreci
            </h4>
            <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
              &quot;Train Model&quot; butonuna tıkladığında model eğitilmeye
              başlar. Bu süreçte:
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">▸</span>
                Model, topladığın örneklerdeki örüntüleri öğrenir
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">▸</span>
                Eğitim birkaç saniye ile birkaç dakika sürebilir
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">▸</span>
                Eğitim sırasında sayfayı kapatma!
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">▸</span>
                Eğitim bitince &quot;Preview&quot; panelinde test edebilirsin
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="text-sm font-bold text-[var(--color-text)]">
              💡 İpucu
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Eğer model iyi sonuç vermezse, daha fazla ve çeşitli veri
              ekleyerek yeniden eğitmeyi dene!
            </p>
          </div>
        </div>
      )}

      {/* Adım 6: Test Et */}
      {!tamamlandi && adim === 6 && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Modelini 10 kez test et. Her denemede modelin doğru mu yanlış mı
            tahmin ettiğini kaydet:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {testSonuclari.map((sonuc, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] p-2"
              >
                <span className="w-16 text-sm font-bold text-[var(--color-text)]">
                  Test {i + 1}
                </span>
                <button
                  onClick={() => setTestSonuc(i, true)}
                  className={`flex-1 rounded-md px-2 py-1 text-xs font-bold transition ${
                    sonuc === true
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-emerald-100"
                  }`}
                >
                  ✓ Doğru
                </button>
                <button
                  onClick={() => setTestSonuc(i, false)}
                  className={`flex-1 rounded-md px-2 py-1 text-xs font-bold transition ${
                    sonuc === false
                      ? "bg-red-500 text-white"
                      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-red-100"
                  }`}
                >
                  ✗ Yanlış
                </button>
              </div>
            ))}
          </div>
          {basariOrani !== null && (
            <div
              className={`rounded-xl p-4 text-center ${
                basariOrani >= 80
                  ? "bg-emerald-50 dark:bg-emerald-900/20"
                  : basariOrani >= 50
                    ? "bg-amber-50 dark:bg-amber-900/20"
                    : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <p className="text-3xl font-black">%{basariOrani}</p>
              <p className="text-sm font-bold">
                Başarı Oranı ({dogruSayisi} doğru, {yanlisSayisi} yanlış)
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {basariOrani >= 80
                  ? "Harika! Modelin çok başarılı!"
                  : basariOrani >= 50
                    ? "Fena değil! Daha fazla veri ile geliştirilebilir."
                    : "Modelin daha çok veriye ihtiyacı var. Tekrar dene!"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tamamlandı */}
      {tamamlandi && (
        <div className="space-y-4 text-center">
          <div className="text-5xl">🎉</div>
          <h4 className="text-xl font-bold text-[var(--color-text)]">
            Tebrikler! Rehberi Tamamladın!
          </h4>
          <div className="mx-auto max-w-md space-y-2 text-left text-sm">
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Proje Türü:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {projeTuru === "goruntu"
                  ? "Görüntü"
                  : projeTuru === "ses"
                    ? "Ses"
                    : "Poz"}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Sınıflar:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {sinif1} / {sinif2}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
              <span className="text-[var(--color-text-secondary)]">
                Veri Kalitesi:
              </span>
              <span className="font-bold text-[var(--color-text)]">
                {veriChecklist.filter(Boolean).length}/{veriKontrolListesi.length} kriter
              </span>
            </div>
            {basariOrani !== null && (
              <div className="flex justify-between rounded-lg bg-[var(--color-bg-secondary)] p-3">
                <span className="text-[var(--color-text-secondary)]">
                  Başarı Oranı:
                </span>
                <span
                  className={`font-bold ${
                    basariOrani >= 80
                      ? "text-emerald-500"
                      : basariOrani >= 50
                        ? "text-amber-500"
                        : "text-red-500"
                  }`}
                >
                  %{basariOrani}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={sifirla}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
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
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600 disabled:opacity-30"
          >
            {adim === 6 ? "Tamamla ✓" : "İleri →"}
          </button>
        </div>
      )}
    </div>
  );
}
