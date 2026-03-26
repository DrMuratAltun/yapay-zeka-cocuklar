"use client";

import { useState } from "react";

const bugun = new Date().toLocaleDateString("tr-TR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function GelecekMektubu() {
  const [aktif, setAktif] = useState(false);
  const [kayitGoster, setKayitGoster] = useState(false);
  const [form, setForm] = useState({
    tarih: bugun,
    ogrenilenler: ["", "", ""],
    sasiran: "",
    tahmin: "",
    mesaj: "",
  });

  const guncelle = (alan: string, deger: string) => {
    setForm((prev) => ({ ...prev, [alan]: deger }));
  };

  const ogrenilenGuncelle = (idx: number, deger: string) => {
    setForm((prev) => {
      const yeni = [...prev.ogrenilenler];
      yeni[idx] = deger;
      return { ...prev, ogrenilenler: yeni };
    });
  };

  const formGecerli =
    form.ogrenilenler.every((o) => o.trim().length > 0) &&
    form.sasiran.trim().length > 0 &&
    form.tahmin.trim().length > 0 &&
    form.mesaj.trim().length > 0;

  const sifirla = () => {
    setAktif(false);
    setKayitGoster(false);
    setForm({
      tarih: bugun,
      ogrenilenler: ["", "", ""],
      sasiran: "",
      tahmin: "",
      mesaj: "",
    });
  };

  if (!aktif) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-lg bg-indigo-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
          <span className="text-sm text-[var(--color-text-secondary)]">15 dakika &middot; Bireysel</span>
        </div>
        <h3 className="mb-3 text-xl font-bold">Gelecek Mektubu</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Gelecekteki kendine bir mektup yaz! Bu yıl yapay zeka hakkında neler öğrendiğini,
          seni en çok neyin şaşırttığını ve gelecek tahminlerini paylaş.
          Bir yıl sonra bu mektubu açıp neler değiştiğini göreceksin!
        </p>
        <div className="mb-4 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            💌 Mektubun sadece sana ait olacak. İçten ve samimi yaz, bu senin yapay zeka maceranda bir zaman kapsülü!
          </p>
        </div>
        <button
          onClick={() => setAktif(true)}
          className="rounded-xl bg-indigo-500 px-6 py-3 font-bold text-white transition hover:bg-indigo-600"
        >
          Mektup Yazmaya Başla 💌
        </button>
      </div>
    );
  }

  if (kayitGoster) {
    return (
      <div className="rounded-2xl border-2 border-indigo-300 bg-[var(--color-bg-secondary)] p-4 dark:border-indigo-700">
        <div className="mx-auto max-w-lg">
          {/* Mektup */}
          <div className="rounded-xl border-4 border-double border-indigo-200 bg-[var(--color-bg)] p-6 shadow-lg dark:border-indigo-800">
            {/* Dekoratif üst */}
            <div className="mb-4 flex justify-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-lg">✨</span>
              ))}
            </div>

            <p className="mb-1 text-right text-sm text-[var(--color-text-secondary)]">{form.tarih}</p>

            <p className="mb-4 text-lg font-bold text-indigo-700 dark:text-indigo-300">
              Sevgili Gelecekteki Ben,
            </p>

            <div className="mb-4">
              <p className="mb-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">Bu yıl öğrendiğim en önemli 3 şey:</p>
              <ol className="ml-4 list-decimal space-y-1 text-sm">
                {form.ogrenilenler.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ol>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">Yapay zeka hakkında en çok beni şaşırtan şey:</p>
              <p className="text-sm italic">&ldquo;{form.sasiran}&rdquo;</p>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">5 yıl sonra YZ nasıl olacak tahmini:</p>
              <p className="text-sm">{form.tahmin}</p>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">Kendime mesajım:</p>
              <p className="text-sm">{form.mesaj}</p>
            </div>

            <div className="mt-6 border-t border-indigo-100 pt-4 dark:border-indigo-800">
              <p className="text-right text-sm italic text-[var(--color-text-secondary)]">
                Sevgilerle, bugünkü ben 💜
              </p>
            </div>

            {/* Dekoratif alt */}
            <div className="mt-4 flex justify-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-lg">✨</span>
              ))}
            </div>
          </div>

          {/* Motivasyon mesajı */}
          <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-center dark:bg-indigo-900/20">
            <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
              🎉 Mektubun hazır!
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Bu mektubu 1 yıl sonra tekrar oku ve tahminlerini kontrol et.
              Yapay zeka yolculuğunda ne kadar ilerlediğini göreceksin!
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setKayitGoster(false)}
              className="flex-1 rounded-xl border-2 border-[var(--color-border)] px-4 py-3 font-bold transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ← Düzenle
            </button>
            <button
              onClick={sifirla}
              className="flex-1 rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition hover:bg-indigo-600"
            >
              Yeni Mektup Yaz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">💌 Gelecek Mektubu</h3>
        <span className="text-sm text-[var(--color-text-secondary)]">{form.tarih}</span>
      </div>

      {/* Mektup başlangıcı */}
      <div className="mb-4 rounded-xl border-2 border-indigo-100 bg-[var(--color-bg)] p-4 dark:border-indigo-900">
        <p className="mb-4 text-lg font-bold text-indigo-700 dark:text-indigo-300">
          Sevgili Gelecekteki Ben,
        </p>

        {/* 3 öğrenilen şey */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-indigo-600 dark:text-indigo-400">
            Bu yıl öğrendiğim en önemli 3 şey:
          </label>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={form.ogrenilenler[i]}
                  onChange={(e) => ogrenilenGuncelle(i, e.target.value)}
                  placeholder={
                    i === 0
                      ? "Örn: YZ'nin veriden öğrendiğini öğrendim"
                      : i === 1
                      ? "Örn: Kendi modelimi eğitmeyi denedim"
                      : "Örn: Etik konuların ne kadar önemli olduğunu anladım"
                  }
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* En çok şaşıran */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-indigo-600 dark:text-indigo-400">
            Yapay zeka hakkında en çok beni şaşırtan şey:
          </label>
          <textarea
            value={form.sasiran}
            onChange={(e) => guncelle("sasiran", e.target.value)}
            placeholder="Örn: YZ'nin resim çizebilmesi ve müzik besteleyebilmesi beni çok şaşırttı..."
            rows={2}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-indigo-500"
          />
        </div>

        {/* 5 yıl sonra tahmini */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-bold text-indigo-600 dark:text-indigo-400">
            5 yıl sonra YZ nasıl olacak tahmini:
          </label>
          <textarea
            value={form.tahmin}
            onChange={(e) => guncelle("tahmin", e.target.value)}
            placeholder="Örn: 5 yıl sonra herkesin kişisel YZ asistanı olacağını düşünüyorum..."
            rows={2}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-indigo-500"
          />
        </div>

        {/* Kendime mesaj */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-indigo-600 dark:text-indigo-400">
            Kendime mesajım:
          </label>
          <textarea
            value={form.mesaj}
            onChange={(e) => guncelle("mesaj", e.target.value)}
            placeholder="Örn: Meraklı ol, öğrenmeyi bırakma! Teknolojiyi iyilik için kullan..."
            rows={3}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-indigo-500"
          />
        </div>

        <p className="text-right text-sm italic text-[var(--color-text-secondary)]">
          Sevgilerle, bugünkü ben 💜
        </p>
      </div>

      <button
        onClick={() => setKayitGoster(true)}
        disabled={!formGecerli}
        className="w-full rounded-xl bg-indigo-500 px-6 py-3 font-bold text-white transition hover:bg-indigo-600 disabled:opacity-40"
      >
        Mektubumu Kaydet 💌
      </button>
    </div>
  );
}
