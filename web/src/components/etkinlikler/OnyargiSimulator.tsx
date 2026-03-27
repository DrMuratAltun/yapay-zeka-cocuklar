"use client";

import { useState } from "react";

interface Aday {
  id: number;
  isim: string;
  cinsiyet: "K" | "E";
  yas: number;
  deneyim: number;
  egitim: string;
  beceriler: string[];
  gercekPuan: number;
}

const adaylar: Aday[] = [
  { id: 1, isim: "Ayşe Yılmaz", cinsiyet: "K", yas: 28, deneyim: 5, egitim: "Bilgisayar Mühendisliği", beceriler: ["Python", "Makine Öğrenmesi", "SQL"], gercekPuan: 92 },
  { id: 2, isim: "Mehmet Kaya", cinsiyet: "E", yas: 35, deneyim: 8, egitim: "Yazılım Mühendisliği", beceriler: ["Java", "Proje Yönetimi", "AWS"], gercekPuan: 88 },
  { id: 3, isim: "Zeynep Demir", cinsiyet: "K", yas: 42, deneyim: 15, egitim: "Elektrik-Elektronik", beceriler: ["Veri Analizi", "R", "TensorFlow"], gercekPuan: 95 },
  { id: 4, isim: "Ali Öztürk", cinsiyet: "E", yas: 24, deneyim: 2, egitim: "Bilgisayar Bilimleri", beceriler: ["JavaScript", "React", "Node.js"], gercekPuan: 75 },
  { id: 5, isim: "Elif Çelik", cinsiyet: "K", yas: 31, deneyim: 7, egitim: "Yapay Zeka (Yüksek Lisans)", beceriler: ["PyTorch", "NLP", "Derin Öğrenme"], gercekPuan: 94 },
  { id: 6, isim: "Burak Arslan", cinsiyet: "E", yas: 29, deneyim: 4, egitim: "Matematik", beceriler: ["Python", "İstatistik", "Veri Görselleştirme"], gercekPuan: 82 },
  { id: 7, isim: "Fatma Şahin", cinsiyet: "K", yas: 45, deneyim: 18, egitim: "Endüstri Mühendisliği", beceriler: ["Optimizasyon", "Simülasyon", "Yönetim"], gercekPuan: 90 },
  { id: 8, isim: "Can Yıldız", cinsiyet: "E", yas: 26, deneyim: 3, egitim: "Bilgisayar Mühendisliği", beceriler: ["C++", "Algoritma", "Veritabanı"], gercekPuan: 78 },
];

const onyargiBilgileri = [
  { tur: "Cinsiyet Önyargısı", aciklama: "Eğitim verisinde erkek çalışanlar fazla olduğu için YZ, kadın adaylara daha düşük puan veriyor.", icon: "👫", etki: -12 },
  { tur: "Yaş Önyargısı", aciklama: "Veri setinde 40 yaş üstü başarılı çalışan az olduğu için YZ, yaşlı adaylara düşük puan veriyor.", icon: "📅", etki: -10 },
];

export default function OnyargiSimulator() {
  const [asama, setAsama] = useState<"baslangic" | "onyargili" | "tespit" | "duzeltme" | "sonuc">("baslangic");
  const [tespit, setTespit] = useState<string[]>([]);

  const onyargiliPuan = (aday: Aday) => {
    let puan = aday.gercekPuan;
    if (aday.cinsiyet === "K") puan -= 12;
    if (aday.yas > 40) puan -= 10;
    return Math.max(0, Math.min(100, puan));
  };

  const adilPuan = (aday: Aday) => aday.gercekPuan;

  const onyargiliSiralama = [...adaylar].sort((a, b) => onyargiliPuan(b) - onyargiliPuan(a));
  const adilSiralama = [...adaylar].sort((a, b) => adilPuan(b) - adilPuan(a));

  const handleTespit = (tur: string) => {
    setTespit((prev) => prev.includes(tur) ? prev.filter((t) => t !== tur) : [...prev, tur]);
  };

  const tespitDogruMu = tespit.length === 2 && tespit.includes("cinsiyet") && tespit.includes("yas");

  const puanCubugu = (puan: number, renk: string) => (
    <div className="flex items-center gap-2">
      <div className="h-3 flex-1 rounded-full bg-[var(--color-bg)]">
        <div className={`h-3 rounded-full ${renk} transition-all`} style={{ width: `${puan}%` }} />
      </div>
      <span className="w-8 text-right text-xs font-bold">{puan}</span>
    </div>
  );

  if (asama === "baslangic") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-center text-white">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-3 text-2xl font-extrabold">Önyargı Simülatörü</h3>
          <p className="mx-auto mt-2 max-w-md text-amber-100">
            Bir şirketin YZ işe alım sistemi aday değerlendirmesi yapıyor.
            Ancak eğitim verisinde gizli önyargılar var. Bunları tespit edip düzeltebilir misin?
          </p>
          <button
            onClick={() => setAsama("onyargili")}
            className="mt-4 rounded-xl bg-white px-6 py-3 font-bold text-amber-700 transition hover:bg-amber-50"
          >
            Sistemi Çalıştır
          </button>
        </div>
      </div>
    );
  }

  if (asama === "onyargili") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-extrabold">YZ İşe Alım Sistemi - Sonuçlar</h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Sistem 8 adayı değerlendirdi. Sonuçları incele ve dikkatini çeken şeyleri düşün.
          </p>
        </div>

        <div className="space-y-2">
          {onyargiliSiralama.map((aday, idx) => (
            <div key={aday.id} className={`flex items-center gap-3 rounded-xl border p-3 ${
              idx < 3 ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/10" : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
            }`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                idx < 3 ? "bg-emerald-500 text-white" : "bg-[var(--color-bg)] text-[var(--color-text-secondary)]"
              }`}>
                {idx + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{aday.isim}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {aday.cinsiyet === "K" ? "♀" : "♂"} {aday.yas} yaş · {aday.deneyim} yıl deneyim
                  </span>
                </div>
                <div className="mt-1">{puanCubugu(onyargiliPuan(aday), idx < 3 ? "bg-emerald-500" : "bg-gray-400")}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="font-medium">🤔 <strong>Düşün:</strong> Sonuçlarda sana garip gelen bir şey var mı? Hangi adaylar düşük puan almış ve neden?</p>
        </div>

        <button
          onClick={() => setAsama("tespit")}
          className="mx-auto block rounded-xl bg-amber-600 px-6 py-2.5 font-bold text-white transition hover:bg-amber-700"
        >
          Önyargıyı Tespit Et →
        </button>
      </div>
    );
  }

  if (asama === "tespit") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-extrabold">Önyargıyı Tespit Et!</h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Eğitim verisinde hangi önyargılar olduğunu düşünüyorsun? (Birden fazla seçebilirsin)
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "cinsiyet", label: "Cinsiyet Önyargısı", aciklama: "Kadın adaylara sistematik olarak düşük puan veriliyor", icon: "👫" },
            { key: "yas", label: "Yaş Önyargısı", aciklama: "40 yaş üstü adaylara düşük puan veriliyor", icon: "📅" },
            { key: "egitim", label: "Eğitim Önyargısı", aciklama: "Belirli üniversitelere öncelik veriliyor", icon: "🎓" },
            { key: "isim", label: "İsim Önyargısı", aciklama: "Belirli isimlere/etnik kökene göre ayrım yapılıyor", icon: "📝" },
          ].map((o) => (
            <button
              key={o.key}
              onClick={() => handleTespit(o.key)}
              className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                tespit.includes(o.key)
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-amber-300"
              }`}
            >
              <span className="text-2xl">{o.icon}</span>
              <div>
                <h4 className="font-bold text-sm">{o.label}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{o.aciklama}</p>
              </div>
              {tespit.includes(o.key) && <span className="ml-auto text-amber-500">✓</span>}
            </button>
          ))}
        </div>

        <button
          onClick={() => setAsama("duzeltme")}
          disabled={tespit.length === 0}
          className="mx-auto block rounded-xl bg-amber-600 px-6 py-2.5 font-bold text-white transition hover:bg-amber-700 disabled:opacity-40"
        >
          Cevabımı Kontrol Et
        </button>
      </div>
    );
  }

  if (asama === "duzeltme") {
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-5 text-center ${tespitDogruMu ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-amber-50 dark:bg-amber-900/20"}`}>
          <span className="text-4xl">{tespitDogruMu ? "🎉" : "🔍"}</span>
          <h4 className="mt-2 text-lg font-bold">
            {tespitDogruMu ? "Harika! Her iki önyargıyı da doğru tespit ettin!" : "Kısmen doğru! İşte tüm önyargılar:"}
          </h4>
        </div>

        <div className="space-y-3">
          {onyargiBilgileri.map((o) => (
            <div key={o.tur} className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-900/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">{o.icon}</span>
                <h4 className="font-bold text-rose-700 dark:text-rose-400">{o.tur}</h4>
                <span className="rounded bg-rose-200 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-800 dark:text-rose-300">
                  {o.etki} puan
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{o.aciklama}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
          <p className="font-medium">💡 <strong>Çözüm:</strong> Eğitim verisini dengeli hale getirerek (cinsiyet ve yaş açısından eşit temsil) önyargıyı ortadan kaldırabiliriz.</p>
        </div>

        <button
          onClick={() => setAsama("sonuc")}
          className="mx-auto block rounded-xl bg-emerald-600 px-6 py-2.5 font-bold text-white transition hover:bg-emerald-700"
        >
          Düzeltilmiş Sonuçları Gör →
        </button>
      </div>
    );
  }

  // sonuc
  return (
    <div className="space-y-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Algoritmik Önyargı Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Yapay zeka modelleri, eğitildikleri verilerdeki önyargıları öğrenebilir. Eğer eğitim verisi belirli bir grubu daha fazla temsil ediyorsa, model de o gruba yönelik önyargılı sonuçlar üretir. Örneğin sadece erkek mühendis fotoğraflarıyla eğitilen bir YZ, kadınları mühendis olarak tanımayabilir. Bu sorunu fark etmek ve düzeltmek çok önemlidir.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-extrabold">Öncesi ve Sonrası Karşılaştırma</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Eğitim verisi düzeltildikten sonra sonuçlar nasıl değişti?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Önyargılı */}
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-900/10">
          <h4 className="mb-3 text-center font-bold text-rose-700 dark:text-rose-400">❌ Önyargılı Sistem</h4>
          <div className="space-y-1.5">
            {onyargiliSiralama.map((aday, idx) => (
              <div key={aday.id} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-right font-bold">{idx + 1}.</span>
                <span className="w-24 truncate">{aday.isim}</span>
                <span className="text-[10px]">{aday.cinsiyet === "K" ? "♀" : "♂"}</span>
                <div className="flex-1">{puanCubugu(onyargiliPuan(aday), "bg-rose-400")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Adil */}
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-900/10">
          <h4 className="mb-3 text-center font-bold text-emerald-700 dark:text-emerald-400">✅ Düzeltilmiş Sistem</h4>
          <div className="space-y-1.5">
            {adilSiralama.map((aday, idx) => (
              <div key={aday.id} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-right font-bold">{idx + 1}.</span>
                <span className="w-24 truncate">{aday.isim}</span>
                <span className="text-[10px]">{aday.cinsiyet === "K" ? "♀" : "♂"}</span>
                <div className="flex-1">{puanCubugu(adilPuan(aday), "bg-emerald-500")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-900/20 dark:to-orange-900/20">
        <h4 className="mb-2 font-bold">Öğrendiğimiz Dersler:</h4>
        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li>&#8226; YZ sistemleri eğitim verisindeki önyargıları öğrenir ve büyütür.</li>
          <li>&#8226; Dengeli ve çeşitli eğitim verisi kullanmak önyargıyı azaltır.</li>
          <li>&#8226; YZ kararları her zaman insan denetimiyle kontrol edilmelidir.</li>
          <li>&#8226; Adil bir YZ sistemi tasarlamak herkesin sorumluluğudur.</li>
        </ul>
      </div>

      <button
        onClick={() => { setAsama("baslangic"); setTespit([]); }}
        className="mx-auto block rounded-xl bg-amber-600 px-6 py-2.5 font-bold text-white transition hover:bg-amber-700"
      >
        Baştan Başla
      </button>
    </div>
  );
}
