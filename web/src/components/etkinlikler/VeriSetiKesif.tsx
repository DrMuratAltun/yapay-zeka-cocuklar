"use client";

import { useState, useCallback, useMemo } from "react";

interface Ogrenci {
  isim: string;
  yas: number;
  boy: number;
  kilo: number;
  favoriDers: string;
  notOrtalamasi: number;
}

const veriSeti: Ogrenci[] = [
  { isim: "Elif", yas: 12, boy: 152, kilo: 42, favoriDers: "Matematik", notOrtalamasi: 88 },
  { isim: "Ahmet", yas: 11, boy: 148, kilo: 39, favoriDers: "Fen Bilimleri", notOrtalamasi: 75 },
  { isim: "Zeynep", yas: 13, boy: 160, kilo: 48, favoriDers: "Türkçe", notOrtalamasi: 92 },
  { isim: "Mehmet", yas: 12, boy: 155, kilo: 45, favoriDers: "Matematik", notOrtalamasi: 81 },
  { isim: "Ayşe", yas: 11, boy: 145, kilo: 37, favoriDers: "Müzik", notOrtalamasi: 70 },
  { isim: "Can", yas: 13, boy: 163, kilo: 52, favoriDers: "Beden Eğitimi", notOrtalamasi: 65 },
  { isim: "Deniz", yas: 12, boy: 150, kilo: 41, favoriDers: "Matematik", notOrtalamasi: 95 },
  { isim: "Fatma", yas: 11, boy: 143, kilo: 36, favoriDers: "Resim", notOrtalamasi: 78 },
  { isim: "Burak", yas: 13, boy: 165, kilo: 55, favoriDers: "Beden Eğitimi", notOrtalamasi: 60 },
  { isim: "Selin", yas: 12, boy: 154, kilo: 43, favoriDers: "Fen Bilimleri", notOrtalamasi: 87 },
  { isim: "Emre", yas: 11, boy: 147, kilo: 38, favoriDers: "Matematik", notOrtalamasi: 72 },
  { isim: "Nur", yas: 13, boy: 158, kilo: 47, favoriDers: "Türkçe", notOrtalamasi: 90 },
  { isim: "Kaan", yas: 12, boy: 156, kilo: 46, favoriDers: "Fen Bilimleri", notOrtalamasi: 83 },
  { isim: "Merve", yas: 11, boy: 144, kilo: 35, favoriDers: "Müzik", notOrtalamasi: 68 },
  { isim: "Yusuf", yas: 13, boy: 167, kilo: 54, favoriDers: "Matematik", notOrtalamasi: 91 },
  { isim: "İrem", yas: 12, boy: 151, kilo: 40, favoriDers: "Resim", notOrtalamasi: 85 },
  { isim: "Ali", yas: 11, boy: 146, kilo: 37, favoriDers: "Beden Eğitimi", notOrtalamasi: 62 },
  { isim: "Ece", yas: 13, boy: 159, kilo: 46, favoriDers: "Fen Bilimleri", notOrtalamasi: 89 },
  { isim: "Oğuz", yas: 12, boy: 153, kilo: 44, favoriDers: "Türkçe", notOrtalamasi: 76 },
  { isim: "Defne", yas: 11, boy: 142, kilo: 34, favoriDers: "Matematik", notOrtalamasi: 94 },
];

const dersler = ["Tümü", "Matematik", "Fen Bilimleri", "Türkçe", "Müzik", "Beden Eğitimi", "Resim"];

type SutunAdi = keyof Ogrenci;

interface Soru {
  id: number;
  soru: string;
  cevap: string;
  ipucu: string;
}

const sorular: Soru[] = [
  { id: 1, soru: "En yüksek not ortalamasına sahip öğrenci kim?", cevap: "Deniz", ipucu: "Not Ort. sütununa göre sırala." },
  { id: 2, soru: "Matematik'i favori ders olarak seçen kaç öğrenci var?", cevap: "6", ipucu: "Favori Ders filtresini kullan." },
  { id: 3, soru: "En uzun boylu öğrenci kaç cm?", cevap: "167", ipucu: "Boy sütununa göre sırala." },
  { id: 4, soru: "11 yaşındaki öğrencilerin ortalama not ortalaması kaç?", cevap: "74", ipucu: "İstatistik bölümünü kontrol et." },
  { id: 5, soru: "En hafif öğrenci kim?", cevap: "Defne", ipucu: "Kilo sütununa göre sırala." },
];

export default function VeriSetiKesif() {
  const [siralamaAlan, setSiralamaAlan] = useState<SutunAdi>("isim");
  const [siralamaYon, setSiralamaYon] = useState<"asc" | "desc">("asc");
  const [filtreDers, setFiltreDers] = useState("Tümü");
  const [soruCevaplari, setSoruCevaplari] = useState<Record<number, string>>({});
  const [soruKontrolu, setSoruKontrolu] = useState<Record<number, boolean | null>>({});
  const [gosterIstatistik, setGosterIstatistik] = useState(false);

  const filtrelenmisVeri = useMemo(() => {
    let sonuc = [...veriSeti];
    if (filtreDers !== "Tümü") {
      sonuc = sonuc.filter((o) => o.favoriDers === filtreDers);
    }
    sonuc.sort((a, b) => {
      const degerA = a[siralamaAlan];
      const degerB = b[siralamaAlan];
      if (typeof degerA === "string" && typeof degerB === "string") {
        return siralamaYon === "asc"
          ? degerA.localeCompare(degerB, "tr")
          : degerB.localeCompare(degerA, "tr");
      }
      if (typeof degerA === "number" && typeof degerB === "number") {
        return siralamaYon === "asc" ? degerA - degerB : degerB - degerA;
      }
      return 0;
    });
    return sonuc;
  }, [filtreDers, siralamaAlan, siralamaYon]);

  const istatistikler = useMemo(() => {
    const veri = filtrelenmisVeri;
    if (veri.length === 0) return null;
    const sayiAlanlari: (keyof Ogrenci)[] = ["yas", "boy", "kilo", "notOrtalamasi"];
    return sayiAlanlari.map((alan) => {
      const degerler = veri.map((o) => o[alan] as number);
      const ort = Math.round(degerler.reduce((a, b) => a + b, 0) / degerler.length);
      const min = Math.min(...degerler);
      const max = Math.max(...degerler);
      const etiketler: Record<string, string> = {
        yas: "Yaş",
        boy: "Boy (cm)",
        kilo: "Kilo (kg)",
        notOrtalamasi: "Not Ort.",
      };
      return { alan: etiketler[alan] || alan, ortalama: ort, min, max };
    });
  }, [filtrelenmisVeri]);

  const sirala = useCallback((alan: SutunAdi) => {
    if (siralamaAlan === alan) {
      setSiralamaYon((y) => (y === "asc" ? "desc" : "asc"));
    } else {
      setSiralamaAlan(alan);
      setSiralamaYon("asc");
    }
  }, [siralamaAlan]);

  const soruKontrolEt = useCallback((soruId: number) => {
    const soru = sorular.find((s) => s.id === soruId);
    if (!soru) return;
    const kullaniciCevap = (soruCevaplari[soruId] || "").trim().toLowerCase();
    const dogruCevap = soru.cevap.toLowerCase();
    setSoruKontrolu((prev) => ({ ...prev, [soruId]: kullaniciCevap === dogruCevap }));
  }, [soruCevaplari]);

  const dogruSoruSayisi = Object.values(soruKontrolu).filter((v) => v === true).length;

  const sutunBasliklari: { alan: SutunAdi; etiket: string }[] = [
    { alan: "isim", etiket: "İsim" },
    { alan: "yas", etiket: "Yaş" },
    { alan: "boy", etiket: "Boy (cm)" },
    { alan: "kilo", etiket: "Kilo (kg)" },
    { alan: "favoriDers", etiket: "Favori Ders" },
    { alan: "notOrtalamasi", etiket: "Not Ort." },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6">
      <h3 className="text-lg font-bold">📊 Veri Seti Keşfedici</h3>

      {/* Filtre ve kontroller */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">Favori Ders Filtresi:</label>
        <select
          value={filtreDers}
          onChange={(e) => setFiltreDers(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm"
        >
          {dersler.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button
          onClick={() => setGosterIstatistik(!gosterIstatistik)}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
            gosterIstatistik
              ? "bg-violet-600 text-white"
              : "bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300"
          }`}
        >
          {gosterIstatistik ? "İstatistikleri Gizle" : "📈 İstatistikler"}
        </button>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {filtrelenmisVeri.length} kayıt gösteriliyor
        </span>
      </div>

      {/* İstatistikler */}
      {gosterIstatistik && istatistikler && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {istatistikler.map((ist) => (
            <div key={ist.alan} className="rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-800 dark:bg-violet-900/20">
              <h5 className="text-xs font-bold text-violet-600 dark:text-violet-400">{ist.alan}</h5>
              <div className="mt-1 flex justify-between text-sm">
                <span>Ort: <strong>{ist.ortalama}</strong></span>
                <span>Min: <strong>{ist.min}</strong></span>
                <span>Max: <strong>{ist.max}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Veri tablosu */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl border border-[var(--color-border)] text-sm">
          <thead>
            <tr className="bg-violet-600 text-white">
              <th className="px-2 py-2 text-center text-xs">#</th>
              {sutunBasliklari.map((s) => (
                <th
                  key={s.alan}
                  onClick={() => sirala(s.alan)}
                  className="cursor-pointer px-3 py-2 text-left text-xs transition hover:bg-violet-700"
                >
                  {s.etiket}
                  {siralamaAlan === s.alan && (
                    <span className="ml-1">{siralamaYon === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrelenmisVeri.map((ogrenci, i) => (
              <tr
                key={ogrenci.isim}
                className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}
              >
                <td className="px-2 py-2 text-center text-xs text-[var(--color-text-secondary)]">{i + 1}</td>
                <td className="px-3 py-2 font-medium">{ogrenci.isim}</td>
                <td className="px-3 py-2">{ogrenci.yas}</td>
                <td className="px-3 py-2">{ogrenci.boy}</td>
                <td className="px-3 py-2">{ogrenci.kilo}</td>
                <td className="px-3 py-2">{ogrenci.favoriDers}</td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${
                      ogrenci.notOrtalamasi >= 85
                        ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : ogrenci.notOrtalamasi >= 70
                        ? "bg-amber-200 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        : "bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300"
                    }`}
                  >
                    {ogrenci.notOrtalamasi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sorular */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-bold">🧩 Veri Soruları ({dogruSoruSayisi}/{sorular.length} doğru)</h4>
        </div>
        <div className="space-y-3">
          {sorular.map((soru) => (
            <div key={soru.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
              <p className="mb-2 text-sm font-medium">
                {soru.id}. {soru.soru}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={soruCevaplari[soru.id] || ""}
                  onChange={(e) => setSoruCevaplari((prev) => ({ ...prev, [soru.id]: e.target.value }))}
                  placeholder="Cevabını yaz..."
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm"
                />
                <button
                  onClick={() => soruKontrolEt(soru.id)}
                  disabled={!(soruCevaplari[soru.id] || "").trim()}
                  className="rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-40"
                >
                  Kontrol Et
                </button>
              </div>
              {soruKontrolu[soru.id] === true && (
                <p className="mt-2 text-sm font-semibold text-emerald-600">✅ Doğru!</p>
              )}
              {soruKontrolu[soru.id] === false && (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-rose-600">❌ Yanlış, tekrar dene!</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">💡 İpucu: {soru.ipucu}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
