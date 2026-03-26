"use client";

import { useState } from "react";

interface Soru {
  id: number;
  soru: string;
  secenekler: { key: string; metin: string; icon: string }[];
}

interface Kariyer {
  baslik: string;
  icon: string;
  aciklama: string;
  beceriler: string[];
  ornekProjeler: string[];
  gelecekGorunum: string;
  renk: string;
}

const sorular: Soru[] = [
  {
    id: 1,
    soru: "Hangi tür aktiviteler seni daha çok heyecanlandırır?",
    secenekler: [
      { key: "problem", metin: "Bulmaca ve problem çözmek", icon: "🧩" },
      { key: "yaratici", metin: "Resim yapmak, hikaye yazmak", icon: "🎨" },
      { key: "yardim", metin: "İnsanlara yardım etmek", icon: "🤝" },
      { key: "teknoloji", metin: "Bilgisayar ve teknoloji ile uğraşmak", icon: "💻" },
      { key: "bilim", metin: "Deney yapmak ve araştırmak", icon: "🔬" },
    ],
  },
  {
    id: 2,
    soru: "Bir YZ projesi yapsan, hangi konuyu seçerdin?",
    secenekler: [
      { key: "problem", metin: "Trafik veya enerji optimizasyonu", icon: "🚗" },
      { key: "yaratici", metin: "Müzik veya görüntü üretimi", icon: "🎵" },
      { key: "yardim", metin: "Sağlık veya eğitim uygulaması", icon: "🏥" },
      { key: "teknoloji", metin: "Robot veya otomasyon sistemi", icon: "🤖" },
      { key: "bilim", metin: "İklim veya uzay araştırması", icon: "🌍" },
    ],
  },
  {
    id: 3,
    soru: "Okuldaki en sevdiğin ders hangisi?",
    secenekler: [
      { key: "problem", metin: "Matematik", icon: "📐" },
      { key: "yaratici", metin: "Görsel Sanatlar / Müzik", icon: "🎭" },
      { key: "yardim", metin: "Sosyal Bilgiler / Psikoloji", icon: "📚" },
      { key: "teknoloji", metin: "Bilişim Teknolojileri", icon: "🖥️" },
      { key: "bilim", metin: "Fen Bilimleri", icon: "⚗️" },
    ],
  },
  {
    id: 4,
    soru: "Bir takımda çalışırken hangi rolü tercih edersin?",
    secenekler: [
      { key: "problem", metin: "Strateji belirlemek ve plan yapmak", icon: "📋" },
      { key: "yaratici", metin: "Tasarım ve sunum hazırlamak", icon: "✨" },
      { key: "yardim", metin: "Ekip arkadaşlarına destek olmak", icon: "💪" },
      { key: "teknoloji", metin: "Teknik işleri üstlenmek", icon: "⚙️" },
      { key: "bilim", metin: "Araştırma ve veri toplamak", icon: "📊" },
    ],
  },
  {
    id: 5,
    soru: "Gelecekte nasıl bir etki yaratmak istersin?",
    secenekler: [
      { key: "problem", metin: "Karmaşık problemlere çözüm bulmak", icon: "💡" },
      { key: "yaratici", metin: "İnsanları eğlendiren ve ilham veren şeyler yaratmak", icon: "🌟" },
      { key: "yardim", metin: "Topluma faydalı projeler geliştirmek", icon: "🌱" },
      { key: "teknoloji", metin: "Geleceğin teknolojilerini inşa etmek", icon: "🚀" },
      { key: "bilim", metin: "Bilimsel keşifler yapmak", icon: "🔭" },
    ],
  },
];

const kariyerler: Record<string, Kariyer[]> = {
  problem: [
    {
      baslik: "Veri Bilimci",
      icon: "📊",
      aciklama: "Büyük veri setlerini analiz ederek iş kararlarına yön veren uzman.",
      beceriler: ["Python/R", "İstatistik", "Makine Öğrenmesi", "Veri Görselleştirme"],
      ornekProjeler: ["Müşteri davranış analizi", "Satış tahminleme", "Dolandırıcılık tespiti"],
      gelecekGorunum: "Talep çok yüksek, 2030'a kadar %35 büyüme bekleniyor.",
      renk: "bg-blue-500",
    },
    {
      baslik: "Makine Öğrenmesi Mühendisi",
      icon: "🧠",
      aciklama: "YZ modellerini tasarlayan, eğiten ve optimize eden mühendis.",
      beceriler: ["Derin Öğrenme", "TensorFlow/PyTorch", "Matematik", "Algoritma"],
      ornekProjeler: ["Konuşma tanıma sistemi", "Öneri motoru", "Otonom sürüş"],
      gelecekGorunum: "En çok aranan meslek. Tüm sektörlerde ihtiyaç var.",
      renk: "bg-violet-500",
    },
    {
      baslik: "YZ Araştırmacısı",
      icon: "🔬",
      aciklama: "YZ alanında yeni algoritmalar ve teoriler geliştiren bilim insanı.",
      beceriler: ["İleri Matematik", "Araştırma Metodolojisi", "Akademik Yazım", "Programlama"],
      ornekProjeler: ["Yeni sinir ağı mimarisi", "Transfer öğrenme araştırması", "Açıklanabilir YZ"],
      gelecekGorunum: "Akademi ve endüstride çok değerli. Çığır açan çalışmalar yapılıyor.",
      renk: "bg-indigo-500",
    },
  ],
  yaratici: [
    {
      baslik: "Prompt Mühendisi",
      icon: "✍️",
      aciklama: "YZ araçlarından en iyi sonucu alacak talimatları tasarlayan uzman.",
      beceriler: ["Yaratıcı Yazım", "YZ Araçları Bilgisi", "Görsel Tasarım", "İletişim"],
      ornekProjeler: ["Marka için YZ içerik stratejisi", "Görsel üretim promptları", "Chatbot diyalog tasarımı"],
      gelecekGorunum: "Yepyeni bir meslek alanı. Talep hızla artıyor.",
      renk: "bg-pink-500",
    },
    {
      baslik: "YZ Destekli İçerik Üreticisi",
      icon: "🎬",
      aciklama: "YZ araçlarını kullanarak yaratıcı içerikler üreten sanatçı/tasarımcı.",
      beceriler: ["Grafik Tasarım", "Video Düzenleme", "Canva/Adobe", "Hikaye Anlatımı"],
      ornekProjeler: ["YZ destekli kısa film", "Dijital sanat koleksiyonu", "Animasyon projesi"],
      gelecekGorunum: "YZ yaratıcılığı artırıyor, yeni sanat formları ortaya çıkıyor.",
      renk: "bg-rose-500",
    },
    {
      baslik: "UX/UI Tasarımcısı (YZ Odaklı)",
      icon: "🎨",
      aciklama: "YZ ürünlerinin kullanıcı deneyimini tasarlayan uzman.",
      beceriler: ["Figma/Sketch", "Kullanıcı Araştırması", "Prototipleme", "Etkileşim Tasarımı"],
      ornekProjeler: ["Chatbot arayüzü tasarımı", "YZ dashboard", "Sesli asistan deneyimi"],
      gelecekGorunum: "Her YZ ürününe iyi bir arayüz gerekli. Sürekli artan talep.",
      renk: "bg-fuchsia-500",
    },
  ],
  yardim: [
    {
      baslik: "YZ Etik Danışmanı",
      icon: "⚖️",
      aciklama: "YZ sistemlerinin etik, adil ve sorumlu olmasını sağlayan uzman.",
      beceriler: ["Etik Felsefe", "YZ Bilgisi", "Politika Analizi", "İletişim"],
      ornekProjeler: ["Önyargı denetim raporu", "Etik YZ politikası", "Adalet değerlendirmesi"],
      gelecekGorunum: "Yasal düzenlemelerle birlikte talep hızla artıyor.",
      renk: "bg-amber-500",
    },
    {
      baslik: "Sağlık Bilişimi Uzmanı",
      icon: "🏥",
      aciklama: "YZ teknolojilerini sağlık hizmetlerinde uygulayan uzman.",
      beceriler: ["Tıp Bilgisi", "Veri Analizi", "Sağlık Yazılımları", "Hasta Güvenliği"],
      ornekProjeler: ["Erken teşhis sistemi", "Hastane kaynak optimizasyonu", "Teletıp platformu"],
      gelecekGorunum: "Sağlıkta YZ devrimi yaşanıyor. Çok yüksek etki potansiyeli.",
      renk: "bg-emerald-500",
    },
    {
      baslik: "Eğitim Teknolojisi Uzmanı",
      icon: "📚",
      aciklama: "YZ ile eğitimi kişiselleştiren ve geliştiren uzman.",
      beceriler: ["Pedagoji", "Eğitim Psikolojisi", "E-Öğrenme Platformları", "İçerik Tasarımı"],
      ornekProjeler: ["Adaptif öğrenme sistemi", "YZ destekli ders planlama", "Otomatik değerlendirme"],
      gelecekGorunum: "Eğitimde kişiselleştirme trendi güçleniyor.",
      renk: "bg-teal-500",
    },
  ],
  teknoloji: [
    {
      baslik: "Robotik Mühendisi",
      icon: "🤖",
      aciklama: "YZ destekli robotlar tasarlayan ve programlayan mühendis.",
      beceriler: ["Robotik", "C++/Python", "Sensör Sistemleri", "Kontrol Mühendisliği"],
      ornekProjeler: ["Otonom drone", "Endüstriyel robot kolu", "Hizmet robotu"],
      gelecekGorunum: "Robotik sektörü hızla büyüyor. Çok çeşitli uygulama alanları.",
      renk: "bg-cyan-500",
    },
    {
      baslik: "MLOps Mühendisi",
      icon: "⚙️",
      aciklama: "YZ modellerini üretim ortamında çalıştıran ve yöneten mühendis.",
      beceriler: ["DevOps", "Docker/Kubernetes", "Bulut Platformları", "CI/CD"],
      ornekProjeler: ["Model dağıtım altyapısı", "Otomatik model eğitim boru hattı", "İzleme sistemi"],
      gelecekGorunum: "Her YZ projesi MLOps gerektirir. Kritik ve aranan bir rol.",
      renk: "bg-sky-500",
    },
    {
      baslik: "Otonom Sistemler Mühendisi",
      icon: "🚗",
      aciklama: "Kendi kendine karar veren sistemler geliştiren mühendis.",
      beceriler: ["Bilgisayar Görüsü", "Sensör Füzyonu", "Gerçek Zamanlı Sistemler", "Simülasyon"],
      ornekProjeler: ["Otonom araç yazılımı", "Drone navigasyonu", "Akıllı trafik sistemi"],
      gelecekGorunum: "Otonom araçlar ve drone'lar yaygınlaşıyor. Devrim niteliğinde.",
      renk: "bg-blue-600",
    },
  ],
  bilim: [
    {
      baslik: "Biyoinformatik Uzmanı",
      icon: "🧬",
      aciklama: "YZ ile biyolojik verileri analiz eden ve ilaç geliştirmeye katkı sağlayan bilim insanı.",
      beceriler: ["Biyoloji", "Programlama", "İstatistik", "Genom Analizi"],
      ornekProjeler: ["Protein yapı tahmini", "İlaç keşfi", "Genetik hastalık analizi"],
      gelecekGorunum: "AlphaFold gibi çığır açıcı projeler. İlaç keşfinde devrim.",
      renk: "bg-green-600",
    },
    {
      baslik: "İklim Veri Bilimci",
      icon: "🌍",
      aciklama: "İklim değişikliği verileriyle YZ modelleri geliştiren uzman.",
      beceriler: ["Çevre Bilimleri", "Uzaktan Algılama", "Veri Analizi", "Modelleme"],
      ornekProjeler: ["Karbon emisyon tahmini", "Hava durumu modelleme", "Orman kaybı izleme"],
      gelecekGorunum: "İklim krizi ile mücadele en önemli gündem. YZ çözümleri kritik.",
      renk: "bg-lime-600",
    },
    {
      baslik: "YZ Destekli Fizik Araştırmacısı",
      icon: "🔭",
      aciklama: "YZ kullanarak fizik ve uzay araştırmaları yapan bilim insanı.",
      beceriler: ["Fizik", "İleri Matematik", "Simülasyon", "Veri Madenciliği"],
      ornekProjeler: ["Parçacık fiziği analizi", "Galaksi sınıflandırma", "Yerçekimi dalgası tespiti"],
      gelecekGorunum: "CERN ve NASA gibi kuruluşlar YZ kullanıyor. Çığır açıcı keşifler.",
      renk: "bg-purple-600",
    },
  ],
};

export default function KariyerYolHaritasi() {
  const [mevcutSoru, setMevcutSoru] = useState(0);
  const [cevaplar, setCevaplar] = useState<string[]>([]);
  const [bitti, setBitti] = useState(false);

  const handleCevap = (key: string) => {
    const yeniCevaplar = [...cevaplar, key];
    setCevaplar(yeniCevaplar);
    if (mevcutSoru < sorular.length - 1) {
      setMevcutSoru(mevcutSoru + 1);
    } else {
      setBitti(true);
    }
  };

  const enCokSecilen = () => {
    const sayac: Record<string, number> = {};
    cevaplar.forEach((c) => { sayac[c] = (sayac[c] || 0) + 1; });
    return Object.entries(sayac).sort((a, b) => b[1] - a[1])[0][0];
  };

  if (bitti) {
    const kategori = enCokSecilen();
    const oneriler = kariyerler[kategori];

    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center text-white">
          <span className="text-5xl">🗺️</span>
          <h3 className="mt-3 text-2xl font-extrabold">Kariyer Yol Haritanız Hazır!</h3>
          <p className="mt-2 text-indigo-100">
            İlgi alanlarınıza göre size önerilen YZ kariyer yolları:
          </p>
        </div>

        <div className="space-y-4">
          {oneriler.map((k, idx) => (
            <div key={k.baslik} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${k.renk}`}>
                  {k.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold">{k.baslik}</h4>
                    {idx === 0 && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">En Uygun</span>}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{k.aciklama}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[var(--color-bg)] p-3">
                  <h5 className="mb-1 text-xs font-bold text-[var(--color-text-secondary)]">Gerekli Beceriler</h5>
                  <div className="flex flex-wrap gap-1">
                    {k.beceriler.map((b) => (
                      <span key={b} className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-[var(--color-bg)] p-3">
                  <h5 className="mb-1 text-xs font-bold text-[var(--color-text-secondary)]">Örnek Projeler</h5>
                  <ul className="space-y-0.5 text-xs text-[var(--color-text-secondary)]">
                    {k.ornekProjeler.map((p) => (
                      <li key={p}>&#8226; {p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                🔮 <strong>Gelecek Görünümü:</strong> {k.gelecekGorunum}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setMevcutSoru(0); setCevaplar([]); setBitti(false); }}
          className="mx-auto block rounded-xl bg-indigo-600 px-6 py-2.5 font-bold text-white transition hover:bg-indigo-700"
        >
          Tekrar Keşfet
        </button>
      </div>
    );
  }

  const soru = sorular[mevcutSoru];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Kariyer Yol Haritası</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          5 soruya cevap ver, sana uygun YZ kariyer yollarını keşfet!
        </p>
      </div>

      {/* İlerleme */}
      <div className="flex items-center gap-2">
        {sorular.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full ${i <= mevcutSoru ? "bg-indigo-500" : "bg-[var(--color-bg-secondary)]"}`} />
        ))}
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-800 dark:bg-indigo-900/10">
        <p className="mb-1 text-xs text-[var(--color-text-secondary)]">Soru {mevcutSoru + 1} / {sorular.length}</p>
        <h4 className="mb-4 text-lg font-bold">{soru.soru}</h4>
        <div className="space-y-2">
          {soru.secenekler.map((s) => (
            <button
              key={s.key}
              onClick={() => handleCevap(s.key)}
              className="flex w-full items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-left transition hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="font-medium text-sm">{s.metin}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
