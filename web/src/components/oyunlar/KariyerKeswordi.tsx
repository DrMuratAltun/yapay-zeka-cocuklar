"use client";

import { useState } from "react";

const sorular = [
  {
    soru: "En çok hangisini yapmaktan hoşlanırsın?",
    secenekler: [
      { metin: "Resim çizmek", emoji: "🎨", kategori: "A" },
      { metin: "Bilgisayar kullanmak", emoji: "💻", kategori: "B" },
      { metin: "İnsanlarla konuşmak", emoji: "🗣️", kategori: "C" },
      { metin: "Deney yapmak", emoji: "🔬", kategori: "D" },
    ],
  },
  {
    soru: "Hangi ders en sevdiğin?",
    secenekler: [
      { metin: "Görsel Sanatlar", emoji: "🖌️", kategori: "A" },
      { metin: "Matematik", emoji: "📐", kategori: "B" },
      { metin: "Türkçe", emoji: "📖", kategori: "C" },
      { metin: "Fen Bilimleri", emoji: "🧪", kategori: "D" },
    ],
  },
  {
    soru: "Bir robot yapsan ne yapsın?",
    secenekler: [
      { metin: "Resim çizsin", emoji: "🤖🎨", kategori: "A" },
      { metin: "Oyun oynasın", emoji: "🎮", kategori: "B" },
      { metin: "İnsanlara yardım etsin", emoji: "❤️", kategori: "C" },
      { metin: "Keşif yapsın", emoji: "🚀", kategori: "D" },
    ],
  },
  {
    soru: "Hangi süper güç?",
    secenekler: [
      { metin: "Her şeyi dönüştürme", emoji: "✨", kategori: "A" },
      { metin: "Süper zeka", emoji: "🧠", kategori: "B" },
      { metin: "Telepati", emoji: "🔮", kategori: "C" },
      { metin: "Zaman yolculuğu", emoji: "⏰", kategori: "D" },
    ],
  },
  {
    soru: "Tatilde ne yaparsın?",
    secenekler: [
      { metin: "Fotoğraf çekerim", emoji: "📷", kategori: "A" },
      { metin: "Kod yazarım", emoji: "💻", kategori: "B" },
      { metin: "Arkadaşlarla takılırım", emoji: "🏃", kategori: "C" },
      { metin: "Doğayı keşfederim", emoji: "🌿", kategori: "D" },
    ],
  },
  {
    soru: "Hangi film türü?",
    secenekler: [
      { metin: "Animasyon", emoji: "🎬", kategori: "A" },
      { metin: "Bilim kurgu", emoji: "🚀", kategori: "B" },
      { metin: "Komedi", emoji: "😂", kategori: "C" },
      { metin: "Belgesel", emoji: "📹", kategori: "D" },
    ],
  },
  {
    soru: "Bir sorun görsen ne yaparsın?",
    secenekler: [
      { metin: "Yaratıcı çözüm bulurum", emoji: "💡", kategori: "A" },
      { metin: "Analiz ederim", emoji: "📊", kategori: "B" },
      { metin: "İnsanlardan yardım isterim", emoji: "🤝", kategori: "C" },
      { metin: "Araştırırım", emoji: "🔍", kategori: "D" },
    ],
  },
  {
    soru: "Gelecekte ne olmak istersin?",
    secenekler: [
      { metin: "Tasarımcı", emoji: "🎨", kategori: "A" },
      { metin: "Mühendis", emoji: "⚙️", kategori: "B" },
      { metin: "Öğretmen", emoji: "👩‍🏫", kategori: "C" },
      { metin: "Bilim insanı", emoji: "👨‍🔬", kategori: "D" },
    ],
  },
];

const sonuclar: Record<string, { baslik: string; emoji: string; aciklama: string; gorevler: string[]; beceriler: string[]; renk: string }> = {
  A: {
    baslik: "YZ Sanatçısı / Tasarımcısı",
    emoji: "🎨",
    aciklama: "Yapay zeka araçlarıyla görsel içerik üreten, kullanıcı deneyimi tasarlayan yaratıcı profesyonel.",
    gorevler: ["YZ ile görsel üretim", "UX/UI tasarım", "Dijital sanat", "Marka tasarımı"],
    beceriler: ["Yaratıcılık", "Estetik", "Görsel iletişim", "Prompt mühendisliği"],
    renk: "from-pink-500 to-rose-500",
  },
  B: {
    baslik: "YZ Mühendisi / Geliştiricisi",
    emoji: "💻",
    aciklama: "YZ modelleri geliştiren, kod yazan ve sistemleri tasarlayan teknik uzman.",
    gorevler: ["Model geliştirme", "Kod yazma", "Sistem tasarımı", "Veri işleme"],
    beceriler: ["Programlama", "Matematik", "Problem çözme", "Analitik düşünme"],
    renk: "from-blue-500 to-indigo-500",
  },
  C: {
    baslik: "YZ Eğitmeni / Danışmanı",
    emoji: "👩‍🏫",
    aciklama: "İnsanlara YZ'yi öğreten, etik kullanımı destekleyen ve toplumu bilgilendiren uzman.",
    gorevler: ["YZ eğitimi verme", "Etik danışmanlık", "İçerik üretimi", "Topluluk yönetimi"],
    beceriler: ["İletişim", "Empati", "Liderlik", "Eğitim tasarımı"],
    renk: "from-emerald-500 to-teal-500",
  },
  D: {
    baslik: "YZ Araştırmacısı / Bilim İnsanı",
    emoji: "🔬",
    aciklama: "YZ'nin sınırlarını zorlayan, yeni algoritmalar ve yöntemler geliştiren akademik araştırmacı.",
    gorevler: ["Akademik araştırma", "Yeni algoritma geliştirme", "Makale yazma", "Deney tasarlama"],
    beceriler: ["Merak", "Araştırma", "İstatistik", "Bilimsel düşünme"],
    renk: "from-violet-500 to-purple-500",
  },
};

export default function KariyerKeswordi() {
  const [index, setIndex] = useState(0);
  const [puanlar, setPuanlar] = useState<Record<string, number>>({ A: 0, B: 0, C: 0, D: 0 });
  const [bitti, setBitti] = useState(false);

  function sec(kategori: string) {
    const yeni = { ...puanlar, [kategori]: puanlar[kategori] + 1 };
    setPuanlar(yeni);

    if (index + 1 >= sorular.length) {
      setBitti(true);
    } else {
      setIndex(index + 1);
    }
  }

  function sifirla() {
    setIndex(0);
    setPuanlar({ A: 0, B: 0, C: 0, D: 0 });
    setBitti(false);
  }

  if (bitti) {
    const enYuksek = Object.entries(puanlar).sort((a, b) => b[1] - a[1])[0][0];
    const sonuc = sonuclar[enYuksek];

    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
        <div className="text-6xl mb-4">{sonuc.emoji}</div>
        <h3 className="text-2xl font-bold mb-2">{sonuc.baslik}</h3>
        <div className={`inline-block rounded-full bg-gradient-to-r ${sonuc.renk} px-4 py-1.5 text-sm font-bold text-white mb-4`}>
          Senin YZ Kariyer Yolun!
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4">{sonuc.aciklama}</p>

        <div className="grid gap-3 sm:grid-cols-2 text-left mb-6">
          <div className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] p-3">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-2">Günlük Görevler</p>
            {sonuc.gorevler.map((g) => (
              <p key={g} className="text-sm">→ {g}</p>
            ))}
          </div>
          <div className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] p-3">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-2">Gereken Beceriler</p>
            {sonuc.beceriler.map((b) => (
              <p key={b} className="text-sm">⭐ {b}</p>
            ))}
          </div>
        </div>

        <button onClick={sifirla} className="cursor-pointer rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white hover:bg-indigo-700 transition">
          Tekrar Dene
        </button>
      </div>
    );
  }

  const s = sorular[index];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">🚀 YZ Kariyer Keşfi</h3>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          {index + 1} / {sorular.length}
        </span>
      </div>

      <div className="mb-6 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2 rounded-full bg-indigo-500 transition-all" style={{ width: `${(index / sorular.length) * 100}%` }} />
      </div>

      <p className="text-center text-lg font-bold mb-6">{s.soru}</p>

      <div className="grid grid-cols-2 gap-3">
        {s.secenekler.map((opt) => (
          <button
            key={opt.metin}
            type="button"
            onClick={() => sec(opt.kategori)}
            className="cursor-pointer rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-center transition hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 hover:scale-105"
          >
            <span className="text-3xl block mb-2">{opt.emoji}</span>
            <span className="text-sm font-medium">{opt.metin}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
