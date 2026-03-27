"use client";

import { useState } from "react";

interface Problem {
  id: number;
  baslik: string;
  icon: string;
  alan: string;
  ipucu: string;
}

interface Analiz {
  problemTanimi: string;
  etkilenenKisiler: string;
  mevcutCozum: string;
  yzCozumOnerisi: string;
  gerekliVeri: string;
}

const problemler: Problem[] = [
  {
    id: 1,
    baslik: "Trafik Sıkışıklığı",
    icon: "🚗",
    alan: "Ulaşım",
    ipucu: "Şehirlerde artan araç sayısı ve yetersiz yol planlaması nedeniyle oluşan trafik sorunu.",
  },
  {
    id: 2,
    baslik: "Erken Hastalık Teşhisi",
    icon: "🏥",
    alan: "Sağlık",
    ipucu: "Bazı hastalıkların belirtileri geç fark edildiğinde tedavi zorlaşır.",
  },
  {
    id: 3,
    baslik: "Tarımda Verim Kaybı",
    icon: "🌾",
    alan: "Tarım",
    ipucu: "Hasat kaybı, zararlı böcekler, su israfı ve iklim değişikliği tarımı etkiler.",
  },
  {
    id: 4,
    baslik: "Kişiselleştirilmiş Eğitim",
    icon: "📚",
    alan: "Eğitim",
    ipucu: "Her öğrencinin farklı hızda ve farklı yöntemlerle öğrenmesi gerçeği.",
  },
  {
    id: 5,
    baslik: "Çevre Kirliliği Takibi",
    icon: "🌍",
    alan: "Çevre",
    ipucu: "Hava, su ve toprak kirliliğinin izlenmesi ve kaynağının tespit edilmesi.",
  },
];

const bosAnaliz: Analiz = {
  problemTanimi: "",
  etkilenenKisiler: "",
  mevcutCozum: "",
  yzCozumOnerisi: "",
  gerekliVeri: "",
};

export default function ProblemAnalizi() {
  const [seciliProblem, setSeciliProblem] = useState<number | null>(null);
  const [analizler, setAnalizler] = useState<Record<number, Analiz>>({});
  const [tamamlananlar, setTamamlananlar] = useState<number[]>([]);
  const [gosterSonuc, setGosterSonuc] = useState(false);

  const mevcutAnaliz = seciliProblem !== null ? (analizler[seciliProblem] || bosAnaliz) : bosAnaliz;

  const handleChange = (alan: keyof Analiz, deger: string) => {
    if (seciliProblem === null) return;
    setAnalizler((prev) => ({
      ...prev,
      [seciliProblem]: {
        ...(prev[seciliProblem] || bosAnaliz),
        [alan]: deger,
      },
    }));
  };

  const analizTamamMi = (analiz: Analiz) => {
    return Object.values(analiz).every((v) => v.trim().length > 5);
  };

  const handleTamamla = () => {
    if (seciliProblem === null) return;
    const analiz = analizler[seciliProblem];
    if (analiz && analizTamamMi(analiz)) {
      setTamamlananlar((prev) => [...new Set([...prev, seciliProblem])]);
    }
  };

  const alanlar: { key: keyof Analiz; label: string; placeholder: string; icon: string }[] = [
    { key: "problemTanimi", label: "Problem Tanımı", placeholder: "Bu problemi kendi cümlelerinle tanımla...", icon: "🎯" },
    { key: "etkilenenKisiler", label: "Etkilenen Kişiler", placeholder: "Bu problemden kimler etkileniyor?", icon: "👥" },
    { key: "mevcutCozum", label: "Mevcut Çözüm", placeholder: "Şu anda bu problem nasıl çözülmeye çalışılıyor?", icon: "🔧" },
    { key: "yzCozumOnerisi", label: "YZ Çözüm Önerisi", placeholder: "Yapay zeka bu problemi nasıl çözebilir?", icon: "🤖" },
    { key: "gerekliVeri", label: "Gerekli Veri", placeholder: "YZ çözümü için hangi veriler toplanmalı?", icon: "📊" },
  ];

  if (gosterSonuc) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-5xl">🏆</span>
          <h3 className="mt-3 text-2xl font-extrabold">Problem Analizi Tamamlandı!</h3>
          <p className="mt-1 text-[var(--color-text-secondary)]">
            {tamamlananlar.length} / {problemler.length} problem analiz edildi
          </p>
        </div>

        <div className="space-y-4">
          {tamamlananlar.map((pid) => {
            const p = problemler.find((pr) => pr.id === pid)!;
            const a = analizler[pid]!;
            return (
              <div key={pid} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="text-lg font-bold">{p.baslik}</h4>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{p.alan}</span>
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  {alanlar.map((al) => (
                    <div key={al.key} className="rounded-lg bg-[var(--color-bg)] p-3">
                      <p className="mb-1 text-xs font-bold text-[var(--color-text-secondary)]">{al.icon} {al.label}</p>
                      <p>{a[al.key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setGosterSonuc(false)}
          className="mx-auto block rounded-xl bg-teal-600 px-6 py-2.5 font-bold text-white transition hover:bg-teal-700"
        >
          Analize Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Tasarım Odaklı Düşünme Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Tasarım odaklı düşünme (Design Thinking), problemleri çözmek için kullanılan yaratıcı bir yöntemdir. Empati kur, problemi tanımla, fikir üret, prototip yap ve test et adımlarından oluşur. Yapay zeka projeleri geliştirirken de bu yöntemi kullanarak kullanıcıların gerçek ihtiyaçlarına çözümler üretebilirsin.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-extrabold">Problem Analizi Atölyesi</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Her problemi analiz et, YZ çözüm önerisi yaz!
        </p>
      </div>

      {/* İlerleme */}
      <div className="flex items-center justify-between rounded-xl bg-[var(--color-bg-secondary)] p-3">
        <span className="text-sm font-medium">İlerleme:</span>
        <div className="flex gap-1">
          {problemler.map((p) => (
            <span
              key={p.id}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                tamamlananlar.includes(p.id)
                  ? "bg-emerald-500 text-white"
                  : seciliProblem === p.id
                    ? "bg-teal-500 text-white"
                    : "bg-[var(--color-bg)] text-[var(--color-text-secondary)]"
              }`}
            >
              {tamamlananlar.includes(p.id) ? "✓" : p.id}
            </span>
          ))}
        </div>
        <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
          {tamamlananlar.length}/{problemler.length}
        </span>
      </div>

      {/* Problem Seçimi */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problemler.map((p) => (
          <button
            key={p.id}
            onClick={() => setSeciliProblem(p.id)}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
              seciliProblem === p.id
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                : tamamlananlar.includes(p.id)
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/10"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-teal-300"
            }`}
          >
            <span className="text-2xl">{p.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">{p.baslik}</h4>
                {tamamlananlar.includes(p.id) && <span className="text-emerald-500">✓</span>}
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">{p.alan}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Analiz Formu */}
      {seciliProblem !== null && (
        <div className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50/50 p-5 dark:border-teal-800 dark:bg-teal-900/10">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 font-bold">
              <span className="text-xl">{problemler.find((p) => p.id === seciliProblem)!.icon}</span>
              {problemler.find((p) => p.id === seciliProblem)!.baslik}
            </h4>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              İpucu: {problemler.find((p) => p.id === seciliProblem)!.ipucu}
            </span>
          </div>

          <div className="space-y-3">
            {alanlar.map((al) => (
              <div key={al.key}>
                <label className="mb-1 flex items-center gap-1 text-sm font-medium">
                  <span>{al.icon}</span> {al.label}
                </label>
                <textarea
                  value={mevcutAnaliz[al.key]}
                  onChange={(e) => handleChange(al.key, e.target.value)}
                  placeholder={al.placeholder}
                  rows={2}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleTamamla}
              disabled={!analizTamamMi(mevcutAnaliz)}
              className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analizi Tamamla ✓
            </button>
            {!analizTamamMi(mevcutAnaliz) && (
              <p className="flex items-center text-xs text-[var(--color-text-secondary)]">
                Tüm alanları doldurun (en az 6 karakter)
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sonuçları Gör */}
      {tamamlananlar.length > 0 && (
        <button
          onClick={() => setGosterSonuc(true)}
          className="mx-auto flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-bold text-white transition hover:bg-emerald-700"
        >
          Analiz Kartlarını Gör ({tamamlananlar.length})
        </button>
      )}
    </div>
  );
}
