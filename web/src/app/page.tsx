import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";

export default function AnaSayfa() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="relative overflow-hidden bg-[#0f172a] text-white flex-1">
        <NeuralBackground />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1.5 text-sm text-sky-300">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                MEB Uyumlu
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
                Yapay Zeka
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Okuryazarlığı
                </span>
                <br />
                Herkes İçindir
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-300">
                Ortaokul öğrencileri için uygulamalı, eğlenceli ve kapsayıcı
                yapay zeka eğitim platformu. Keşfet, öğren, uygula!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/bolumler"
                  className="rounded-xl bg-white px-8 py-3.5 font-bold text-slate-900 shadow-lg shadow-white/10 transition hover:scale-105"
                >
                  Bölümleri Keşfet
                </Link>
                <Link
                  href="/hakkinda"
                  className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-bold backdrop-blur transition hover:bg-white/10"
                >
                  Hakkında
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { sayi: "10", etiket: "Bölüm", icon: "📖", renk: "from-sky-500/20 to-blue-500/20 border-sky-500/20" },
                { sayi: "50+", etiket: "Etkinlik", icon: "🎮", renk: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
                { sayi: "30+", etiket: "Quiz Sorusu", icon: "📝", renk: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
                { sayi: "✓", etiket: "MEB Uyumlu", icon: "📋", renk: "from-amber-500/20 to-orange-500/20 border-amber-500/20" },
              ].map((s) => (
                <div
                  key={s.etiket}
                  className={`glow-hover rounded-2xl border bg-gradient-to-br p-6 transition-transform hover:scale-105 ${s.renk}`}
                >
                  <span className="text-3xl">{s.icon}</span>
                  <div className="mt-3 text-3xl font-extrabold">{s.sayi}</div>
                  <div className="text-sm text-slate-400">{s.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hedef Kitle */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-6 py-10 md:gap-10">
          {[
            { hedef: "Öğrenciler", yas: "6-8. Sınıf (11-14 yaş)", icon: "🎒", aciklama: "Keşfet, dene, proje geliştir" },
            { hedef: "Öğretmenler", yas: "BT Öğretmenleri", icon: "👩‍🏫", aciklama: "Hazır ders planları ve materyaller" },
            { hedef: "Aileler", yas: "Meraklı Ebeveynler", icon: "👨‍👩‍👧‍👦", aciklama: "Birlikte öğrenin" },
          ].map((h) => (
            <div key={h.hedef} className="flex items-center gap-4 rounded-xl px-2">
              <span className="text-4xl">{h.icon}</span>
              <div>
                <h3 className="font-bold">{h.hedef}</h3>
                <p className="text-xs text-[var(--color-text-secondary)]">{h.yas}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{h.aciklama}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            YZ Okuryazarlığı Yolculuğuna Başla
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            10 bölüm, 50+ etkinlik. Hemen keşfetmeye başla!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/bolumler"
              className="rounded-xl bg-white px-10 py-4 text-lg font-bold text-indigo-700 shadow-xl shadow-indigo-900/20 transition hover:scale-105"
            >
              Hemen Başla
            </Link>
            <Link
              href="/ozellikler"
              className="rounded-xl border-2 border-white/20 px-10 py-4 text-lg font-bold transition hover:bg-white/10"
            >
              Neden Bu Platform?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
