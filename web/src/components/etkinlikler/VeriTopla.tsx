"use client";

import { useState } from "react";

interface OgrenciVerisi {
  boy: number;
  ayakNo: number;
  favoriRenk: string;
  favoriDers: string;
}

const renkSecenekleri = ["Kırmızı", "Mavi", "Yeşil", "Sarı", "Mor", "Turuncu", "Pembe", "Siyah", "Beyaz"];
const dersSecenekleri = ["Matematik", "Türkçe", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce", "Müzik", "Beden Eğitimi", "Görsel Sanatlar", "Bilişim"];

export default function VeriTopla() {
  const [veriler, setVeriler] = useState<OgrenciVerisi[]>([]);
  const [boy, setBoy] = useState("");
  const [ayakNo, setAyakNo] = useState("");
  const [favoriRenk, setFavoriRenk] = useState("");
  const [favoriDers, setFavoriDers] = useState("");
  const [hata, setHata] = useState("");
  const [gorunum, setGorunum] = useState<"form" | "grafik" | "bilgi">("form");

  const veriEkle = () => {
    const boyNum = parseFloat(boy);
    const ayakNum = parseFloat(ayakNo);

    if (!boy || !ayakNo || !favoriRenk || !favoriDers) {
      setHata("Lütfen tüm alanları doldurun!");
      return;
    }
    if (isNaN(boyNum) || boyNum < 100 || boyNum > 210) {
      setHata("Boy 100-210 cm arasında olmalı!");
      return;
    }
    if (isNaN(ayakNum) || ayakNum < 28 || ayakNum > 46) {
      setHata("Ayak numarası 28-46 arasında olmalı!");
      return;
    }

    setVeriler((prev) => [...prev, { boy: boyNum, ayakNo: ayakNum, favoriRenk, favoriDers }]);
    setBoy("");
    setAyakNo("");
    setFavoriRenk("");
    setFavoriDers("");
    setHata("");
  };

  const sifirla = () => {
    setVeriler([]);
    setBoy("");
    setAyakNo("");
    setFavoriRenk("");
    setFavoriDers("");
    setHata("");
    setGorunum("form");
  };

  // Renk dağılımı hesapla
  const renkDagilimi = renkSecenekleri
    .map((r) => ({ renk: r, sayi: veriler.filter((v) => v.favoriRenk === r).length }))
    .filter((r) => r.sayi > 0)
    .sort((a, b) => b.sayi - a.sayi);

  // Ders dağılımı hesapla
  const dersDagilimi = dersSecenekleri
    .map((d) => ({ ders: d, sayi: veriler.filter((v) => v.favoriDers === d).length }))
    .filter((d) => d.sayi > 0)
    .sort((a, b) => b.sayi - a.sayi);

  const maxRenk = renkDagilimi.length > 0 ? Math.max(...renkDagilimi.map((r) => r.sayi)) : 1;
  const maxDers = dersDagilimi.length > 0 ? Math.max(...dersDagilimi.map((d) => d.sayi)) : 1;

  const ortBoy = veriler.length > 0 ? (veriler.reduce((t, v) => t + v.boy, 0) / veriler.length).toFixed(1) : "–";
  const ortAyak = veriler.length > 0 ? (veriler.reduce((t, v) => t + v.ayakNo, 0) / veriler.length).toFixed(1) : "–";

  const renkKodlari: Record<string, string> = {
    Kırmızı: "bg-red-500",
    Mavi: "bg-blue-500",
    Yeşil: "bg-emerald-500",
    Sarı: "bg-yellow-400",
    Mor: "bg-purple-500",
    Turuncu: "bg-orange-500",
    Pembe: "bg-pink-400",
    Siyah: "bg-gray-800",
    Beyaz: "bg-gray-200",
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-violet-500 px-3 py-1 text-sm font-bold text-white">İNTERAKTİF</span>
        <span className="text-sm text-[var(--color-text-secondary)]">Veri Toplama ve Görselleştirme</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--color-text)]">Sınıf Veri Merkezi</h3>
      <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Kendin hakkında veri gir ve sınıf arkadaşlarının verileriyle birlikte grafikleri incele!
        Hangi veriler yapısal, hangisi yapısal olmayan?
      </p>

      {/* Sekmeler */}
      <div className="mb-5 flex gap-2">
        {([["form", "Veri Gir"], ["grafik", "Grafikleri Gör"], ["bilgi", "Veri Türleri"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setGorunum(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              gorunum === key
                ? "bg-violet-600 text-white"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-violet-100 dark:hover:bg-violet-900/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Form */}
      {gorunum === "form" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Boy (cm)</label>
              <input
                type="number"
                value={boy}
                onChange={(e) => setBoy(e.target.value)}
                placeholder="Örn: 155"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Ayak Numarası</label>
              <input
                type="number"
                value={ayakNo}
                onChange={(e) => setAyakNo(e.target.value)}
                placeholder="Örn: 38"
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Favori Renk</label>
              <select
                value={favoriRenk}
                onChange={(e) => setFavoriRenk(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Seçiniz...</option>
                {renkSecenekleri.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">Favori Ders</label>
              <select
                value={favoriDers}
                onChange={(e) => setFavoriDers(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Seçiniz...</option>
                {dersSecenekleri.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {hata && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{hata}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={veriEkle}
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              Veri Ekle
            </button>
            <button
              onClick={sifirla}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bg)]"
            >
              Tekrar Dene
            </button>
          </div>

          {/* Girilen veri sayısı */}
          <div className="rounded-lg bg-violet-50 p-3 dark:bg-violet-900/20">
            <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
              Toplam girilen veri: <span className="text-lg font-bold">{veriler.length}</span> kayıt
              {veriler.length > 0 && ` | Ortalama boy: ${ortBoy} cm | Ortalama ayak no: ${ortAyak}`}
            </p>
          </div>

          {/* Son girilen veriler tablosu */}
          {veriler.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-xs text-[var(--color-text-secondary)]">
                    <th className="px-2 py-2">#</th>
                    <th className="px-2 py-2">Boy</th>
                    <th className="px-2 py-2">Ayak No</th>
                    <th className="px-2 py-2">Renk</th>
                    <th className="px-2 py-2">Ders</th>
                  </tr>
                </thead>
                <tbody>
                  {veriler.slice(-5).map((v, i) => (
                    <tr key={i} className="border-b border-[var(--color-border)]">
                      <td className="px-2 py-1.5 text-[var(--color-text-secondary)]">{veriler.length - 4 + i > 0 ? veriler.length - 4 + i : i + 1}</td>
                      <td className="px-2 py-1.5 text-[var(--color-text)]">{v.boy} cm</td>
                      <td className="px-2 py-1.5 text-[var(--color-text)]">{v.ayakNo}</td>
                      <td className="px-2 py-1.5 text-[var(--color-text)]">{v.favoriRenk}</td>
                      <td className="px-2 py-1.5 text-[var(--color-text)]">{v.favoriDers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {veriler.length > 5 && (
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Son 5 kayıt gösteriliyor</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Grafikler */}
      {gorunum === "grafik" && (
        <div className="space-y-6">
          {veriler.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-[var(--color-border)] p-8 text-center">
              <p className="text-lg font-medium text-[var(--color-text-secondary)]">Henüz veri girilmedi!</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Önce &quot;Veri Gir&quot; sekmesinden veri ekleyin.</p>
            </div>
          ) : (
            <>
              {/* Favori Renk Grafiği */}
              <div>
                <h4 className="mb-3 font-bold text-[var(--color-text)]">Favori Renk Dağılımı</h4>
                <div className="space-y-2">
                  {renkDagilimi.map((r) => (
                    <div key={r.renk} className="flex items-center gap-3">
                      <span className="w-24 text-right text-sm text-[var(--color-text)]">{r.renk}</span>
                      <div className="flex-1">
                        <div
                          className={`${renkKodlari[r.renk] || "bg-gray-400"} h-7 rounded-md transition-all duration-500`}
                          style={{ width: `${(r.sayi / maxRenk) * 100}%`, minWidth: "2rem" }}
                        >
                          <span className="flex h-full items-center justify-end pr-2 text-xs font-bold text-white drop-shadow">
                            {r.sayi}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favori Ders Grafiği */}
              <div>
                <h4 className="mb-3 font-bold text-[var(--color-text)]">Favori Ders Dağılımı</h4>
                <div className="space-y-2">
                  {dersDagilimi.map((d) => (
                    <div key={d.ders} className="flex items-center gap-3">
                      <span className="w-28 text-right text-sm text-[var(--color-text)]">{d.ders}</span>
                      <div className="flex-1">
                        <div
                          className="h-7 rounded-md bg-indigo-500 transition-all duration-500"
                          style={{ width: `${(d.sayi / maxDers) * 100}%`, minWidth: "2rem" }}
                        >
                          <span className="flex h-full items-center justify-end pr-2 text-xs font-bold text-white drop-shadow">
                            {d.sayi}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Özet İstatistikler */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center dark:border-violet-800 dark:bg-violet-900/20">
                  <p className="text-sm text-[var(--color-text-secondary)]">Ortalama Boy</p>
                  <p className="text-2xl font-extrabold text-violet-700 dark:text-violet-300">{ortBoy} cm</p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center dark:border-violet-800 dark:bg-violet-900/20">
                  <p className="text-sm text-[var(--color-text-secondary)]">Ortalama Ayak No</p>
                  <p className="text-2xl font-extrabold text-violet-700 dark:text-violet-300">{ortAyak}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bilgi: Yapısal vs Yapısız */}
      {gorunum === "bilgi" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h4 className="mb-3 font-bold text-emerald-700 dark:text-emerald-400">Yapısal Veri (Structured)</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">&#10004;</span>
                  <span><strong>Boy (cm):</strong> Sayısal veri, ölçülebilir, karşılaştırılabilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">&#10004;</span>
                  <span><strong>Ayak Numarası:</strong> Sayısal veri, sıralanabilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">&#10004;</span>
                  <span><strong>Favori Renk:</strong> Kategorik veri, sınıflandırılabilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-500">&#10004;</span>
                  <span><strong>Favori Ders:</strong> Kategorik veri, sayılabilir</span>
                </li>
              </ul>
              <p className="mt-3 rounded-lg bg-emerald-100 p-2 text-xs dark:bg-emerald-900/30">
                Tablo halinde düzenlenebilir, grafiğe dönüştürülebilir, kolayca analiz edilebilir.
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
              <h4 className="mb-3 font-bold text-amber-700 dark:text-amber-400">Yapısal Olmayan Veri (Unstructured)</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-500">&#9679;</span>
                  <span><strong>&quot;En sevdiğim renk neden mavi?&quot;</strong> gibi açık uçlu cevaplar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-500">&#9679;</span>
                  <span><strong>Çizimler, fotoğraflar</strong> - görsel veriler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-500">&#9679;</span>
                  <span><strong>Ses kayıtları</strong> - sesli görüşler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-amber-500">&#9679;</span>
                  <span><strong>Serbest yazılar</strong> - kompozisyonlar</span>
                </li>
              </ul>
              <p className="mt-3 rounded-lg bg-amber-100 p-2 text-xs dark:bg-amber-900/30">
                Tabloya sığmaz, analiz için önce işlenmesi gerekir. Dünyadaki verilerin %80&apos;i bu türdedir!
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
            <p className="text-sm font-medium text-violet-700 dark:text-violet-300">
              Bu etkinlikte topladığın tüm veriler <strong>yapısal veridir</strong> çünkü hepsi belirli kategorilere
              ve sayılara ayrılabilir. YZ modelleri yapısal veriyi doğrudan kullanabilir!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
