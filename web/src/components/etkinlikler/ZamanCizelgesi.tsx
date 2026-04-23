"use client";

import { useState, useCallback } from "react";

interface Olay {
  id: string;
  yil: number;
  baslik: string;
  aciklama: string;
  detay: string;
  emoji: string;
  kategori: "temel" | "oyun" | "asistan" | "uretken";
  kullanicininMi: boolean;
}

const kategoriler = [
  { id: "all", label: "Tümü" },
  { id: "temel", label: "Temel Taşlar" },
  { id: "oyun", label: "Oyun & Yarışma" },
  { id: "asistan", label: "Asistanlar" },
  { id: "uretken", label: "Üretken YZ" },
] as const;

const varsayilanOlaylar: Olay[] = [
  {
    id: "1", yil: 1642, baslik: "İlk Mekanik Hesap Makinesi",
    aciklama: "Blaise Pascal mekanik hesap makinesini icat etti.",
    detay: "Pascaline adlı bu cihaz, toplama ve çıkarma yapabiliyordu. Günümüz bilgisayarlarının en eski atasıdır. Pascal bu makineyi vergi memuru olan babasına yardım etmek için tasarladı.",
    emoji: "🔢", kategori: "temel", kullanicininMi: false,
  },
  {
    id: "2", yil: 1950, baslik: "Turing Testi",
    aciklama: "Alan Turing 'Makineler düşünebilir mi?' sorusunu sordu.",
    detay: "Turing, bir makinenin insan gibi düşünüp düşünemeyeceğini test etmek için bir yöntem önerdi. Eğer bir insan, konuştuğu tarafın makine mi insan mı olduğunu anlayamazsa, makine testi geçmiş sayılır.",
    emoji: "🧠", kategori: "temel", kullanicininMi: false,
  },
  {
    id: "3", yil: 1956, baslik: "Yapay Zeka Terimi",
    aciklama: "John McCarthy 'yapay zeka' terimini ilk kez kullandı.",
    detay: "Dartmouth Konferansı'nda bir araya gelen bilim insanları, makinelerin zeki davranışlar sergileyebileceği fikrini tartıştı. Bu toplantı, YZ'nin resmi doğum günü kabul edilir.",
    emoji: "💡", kategori: "temel", kullanicininMi: false,
  },
  {
    id: "4", yil: 1959, baslik: "Cahit Arf'ın Çalışması",
    aciklama: "Türk matematikçi Cahit Arf, makinelerin düşünmesi üzerine çalıştı.",
    detay: "Cahit Arf, 'Makine düşünebilir mi ve nasıl düşünebilir?' başlıklı ünlü konuşmasını yaptı. Türkiye'de yapay zeka düşüncesinin öncüsü olarak kabul edilir.",
    emoji: "🇹🇷", kategori: "temel", kullanicininMi: false,
  },
  {
    id: "5", yil: 1965, baslik: "ELIZA Sohbet Robotu",
    aciklama: "İlk sohbet robotu ELIZA geliştirildi.",
    detay: "MIT'de Joseph Weizenbaum tarafından geliştirilen ELIZA, basit kalıp eşleştirme kullanarak bir psikolog gibi konuşabiliyordu. İnsanlar onunla gerçekten duygusal bağ kuruyordu!",
    emoji: "💬", kategori: "asistan", kullanicininMi: false,
  },
  {
    id: "6", yil: 1997, baslik: "Deep Blue Zaferi",
    aciklama: "IBM Deep Blue, satranç şampiyonu Kasparov'u yendi.",
    detay: "Bu tarihî maç, bir bilgisayarın ilk kez dünya satranç şampiyonunu yenmesidir. Deep Blue saniyede 200 milyon hamle hesaplayabiliyordu. Ancak yaratıcılık değil, ham hesaplama gücüyle kazandı.",
    emoji: "♟️", kategori: "oyun", kullanicininMi: false,
  },
  {
    id: "7", yil: 2011, baslik: "Siri ve Sesli Asistanlar",
    aciklama: "Apple Siri ile sesli asistan çağı başladı.",
    detay: "Siri, telefonunuzla konuşarak bilgi almanızı sağlayan ilk yaygın sesli asistan oldu. Doğal dil işleme teknolojisinin günlük hayata girmesinin başlangıcıdır.",
    emoji: "🎙️", kategori: "asistan", kullanicininMi: false,
  },
  {
    id: "8", yil: 2014, baslik: "Akıllı Ev Sistemleri",
    aciklama: "Sesli asistanlar ile akıllı ev sistemleri yaygınlaştı.",
    detay: "Amazon Alexa ve Google Home gibi cihazlar evlere girdi. Işıkları açıp kapatmak, müzik çalmak, hatta alışveriş listesi oluşturmak sesle mümkün hale geldi.",
    emoji: "🏠", kategori: "asistan", kullanicininMi: false,
  },
  {
    id: "9", yil: 2016, baslik: "AlphaGo Zaferi",
    aciklama: "Google AlphaGo, Go oyununda dünya şampiyonunu yendi.",
    detay: "Go oyunu satrançtan çok daha karmaşıktır — olası hamle sayısı evrendeki atom sayısından fazladır! AlphaGo'nun bu zaferi, YZ'nin sezgisel düşünme yeteneğinin geliştiğini gösterdi.",
    emoji: "🎯", kategori: "oyun", kullanicininMi: false,
  },
  {
    id: "10", yil: 2022, baslik: "ChatGPT Çağı",
    aciklama: "OpenAI ChatGPT ile üretken YZ çağı başladı.",
    detay: "ChatGPT, metin üreten yapay zekanın herkes tarafından kullanılabilir hale gelmesini sağladı. İki ayda 100 milyon kullanıcıya ulaşarak tarihin en hızlı büyüyen uygulaması oldu.",
    emoji: "🤖", kategori: "uretken", kullanicininMi: false,
  },
  {
    id: "11", yil: 2024, baslik: "Çok Modlu YZ",
    aciklama: "Metin, görüntü, ses ve video birlikte işleyen YZ modelleri.",
    detay: "YZ artık sadece metin değil, aynı anda resim, ses ve video anlayıp üretebiliyor. Bir fotoğrafı tarif edebilir, sesli komutla resim çizebilir, videodan özetler çıkarabilir.",
    emoji: "🌐", kategori: "uretken", kullanicininMi: false,
  },
];

export default function ZamanCizelgesi() {
  const [karisikOlaylar, setKarisikOlaylar] = useState<Olay[]>(() => {
    const kopya = [...varsayilanOlaylar];
    for (let i = kopya.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
    }
    return kopya;
  });
  const [yerlestirilmis, setYerlestirilmis] = useState<Olay[]>([]);
  const [seciliOlay, setSeciliOlay] = useState<string | null>(null);
  const [puan, setPuan] = useState(0);
  const [yanlisSayisi, setYanlisSayisi] = useState(0);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [yeniYil, setYeniYil] = useState("");
  const [yeniBaslik, setYeniBaslik] = useState("");
  const [tahminler, setTahminler] = useState<Olay[]>([]);
  const [gosterTahminFormu, setGosterTahminFormu] = useState(false);
  const [acikDetay, setAcikDetay] = useState<string | null>(null);
  const [aktifFiltre, setAktifFiltre] = useState("all");

  const olayiYerlestir = useCallback((olay: Olay) => {
    setSeciliOlay(olay.id);
  }, []);

  const pozisyonaYerlestir = useCallback((index: number) => {
    if (!seciliOlay) return;
    const olay = karisikOlaylar.find((o) => o.id === seciliOlay);
    if (!olay) return;

    const yeniYerlestirilmis = [...yerlestirilmis];
    yeniYerlestirilmis.splice(index, 0, olay);

    const siraDogruMu = yeniYerlestirilmis.every((o, i) => {
      if (i === 0) return true;
      return o.yil >= yeniYerlestirilmis[i - 1].yil;
    });

    if (siraDogruMu) {
      setYerlestirilmis(yeniYerlestirilmis);
      setKarisikOlaylar((prev) => prev.filter((o) => o.id !== seciliOlay));
      setPuan((p) => p + 10);
    } else {
      setYanlisSayisi((y) => y + 1);
    }
    setSeciliOlay(null);

    if (siraDogruMu && karisikOlaylar.length === 1) {
      setTamamlandi(true);
    }
  }, [seciliOlay, karisikOlaylar, yerlestirilmis]);

  const tahminEkle = useCallback(() => {
    const yil = parseInt(yeniYil);
    if (isNaN(yil) || yil < 2025 || yil > 2100 || !yeniBaslik.trim()) return;
    const yeniTahmin: Olay = {
      id: `tahmin-${Date.now()}`,
      yil,
      baslik: yeniBaslik.trim(),
      aciklama: "Senin tahminin!",
      detay: "",
      emoji: "🔮",
      kategori: "uretken",
      kullanicininMi: true,
    };
    setTahminler((prev) => [...prev, yeniTahmin].sort((a, b) => a.yil - b.yil));
    setYeniYil("");
    setYeniBaslik("");
  }, [yeniYil, yeniBaslik]);

  const sifirla = useCallback(() => {
    const kopya = [...varsayilanOlaylar];
    for (let i = kopya.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
    }
    setKarisikOlaylar(kopya);
    setYerlestirilmis([]);
    setSeciliOlay(null);
    setPuan(0);
    setYanlisSayisi(0);
    setTamamlandi(false);
    setAcikDetay(null);
    setAktifFiltre("all");
  }, []);

  // Filtrelenmiş olaylar (tamamlanma sonrası)
  const filtrelenmisOlaylar = yerlestirilmis.filter(
    (o) => aktifFiltre === "all" || o.kategori === aktifFiltre
  );

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(180deg, #1b140f 0%, #241a13 42%, #120d0a 100%)",
        fontFamily: "var(--font-nunito), sans-serif",
        color: "#f4ead7",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(230, 198, 118, 0.15), transparent 28%), radial-gradient(circle at bottom right, rgba(171, 107, 55, 0.15), transparent 30%)",
        }}
      />

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div
          className="rounded-2xl p-5 sm:p-6 mb-6"
          style={{
            background: "rgba(43, 31, 22, 0.78)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(214, 177, 96, 0.28)",
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{
                  border: "1px solid rgba(214, 177, 96, 0.4)",
                  background: "rgba(214, 177, 96, 0.1)",
                  color: "#f0d38e",
                }}
              >
                🕰️ İnteraktif etkinlik
              </span>
              <h3
                className="mt-3 text-2xl sm:text-3xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-cinzel), 'Georgia', serif", color: "#f6ead1" }}
              >
                YZ Zaman Çizelgesi
              </h3>
              <p className="mt-2 max-w-xl text-sm sm:text-base leading-relaxed" style={{ color: "#e6d8bd" }}>
                {!tamamlandi
                  ? "Yapay zekanın tarihindeki dönüm noktalarını kronolojik sıraya diz! Bir olaya tıkla, sonra çizelgede doğru yerine yerleştir."
                  : "Tebrikler! Zaman çizelgesini tamamladın. Kartlara tıklayarak detayları keşfet ve geleceğe dair tahminlerini ekle!"}
              </p>
            </div>
            <div
              className="shrink-0 rounded-xl px-4 py-3 text-center sm:text-right"
              style={{
                background: "rgba(43, 31, 22, 0.9)",
                border: "1px solid rgba(214, 177, 96, 0.2)",
              }}
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "#c8a85c" }}>Puan</p>
                  <p className="text-2xl font-bold" style={{ color: "#f0d38e" }}>{puan}</p>
                </div>
                <div
                  className="h-8 w-px sm:h-px sm:w-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(214, 177, 96, 0.5), transparent)" }}
                />
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "#c8a85c" }}>Yanlış</p>
                  <p className="text-2xl font-bold" style={{ color: yanlisSayisi > 0 ? "#e88a7a" : "#f0d38e" }}>
                    {yanlisSayisi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oyun Alanı */}
        {!tamamlandi ? (
          <>
            {/* Karışık olaylar */}
            {karisikOlaylar.length > 0 && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#c8a85c" }}>
                  Yerleştirilecek olaylar ({karisikOlaylar.length} kaldı)
                </p>
                <div className="flex flex-wrap gap-2">
                  {karisikOlaylar.map((olay) => (
                    <button
                      key={olay.id}
                      onClick={() => olayiYerlestir(olay)}
                      className="rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200"
                      style={{
                        background: seciliOlay === olay.id
                          ? "rgba(214, 177, 96, 0.25)"
                          : "rgba(43, 31, 22, 0.7)",
                        border: seciliOlay === olay.id
                          ? "2px solid #d6b160"
                          : "1px solid rgba(214, 177, 96, 0.2)",
                        color: "#f4ead7",
                        boxShadow: seciliOlay === olay.id
                          ? "0 0 18px rgba(214, 177, 96, 0.2)"
                          : "none",
                        transform: seciliOlay === olay.id ? "translateY(-2px)" : "none",
                      }}
                    >
                      <span className="mr-1.5 text-base">{olay.emoji}</span>
                      <span className="font-semibold">{olay.baslik}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Zaman çizelgesi — oyun modu */}
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5 rounded-full"
                style={{
                  background: "linear-gradient(180deg, rgba(214, 177, 96, 0.1), #d6b160, rgba(214, 177, 96, 0.1))",
                }}
              />

              {/* Başa ekleme butonu */}
              {seciliOlay && (
                <button
                  onClick={() => pozisyonaYerlestir(0)}
                  className="relative z-10 mb-2 ml-10 w-[calc(100%-2.5rem)] rounded-xl py-2.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    border: "2px dashed rgba(214, 177, 96, 0.5)",
                    background: "rgba(214, 177, 96, 0.08)",
                    color: "#f0d38e",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(214, 177, 96, 0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(214, 177, 96, 0.08)";
                  }}
                >
                  ↓ Buraya yerleştir (en başa)
                </button>
              )}

              {yerlestirilmis.map((olay, i) => (
                <div key={olay.id} className="relative">
                  {/* Dot */}
                  <div
                    className="absolute left-5 top-4 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
                    style={{
                      background: "#d6b160",
                      border: "3px solid #1b140f",
                      boxShadow: "0 0 0 4px rgba(214, 177, 96, 0.13), 0 0 12px rgba(214, 177, 96, 0.25)",
                    }}
                  />

                  {/* Card */}
                  <div
                    className="ml-10 mb-2 rounded-xl px-4 py-3 transition-all duration-200"
                    style={{
                      background: "rgba(43, 31, 22, 0.7)",
                      border: "1px solid rgba(214, 177, 96, 0.2)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold"
                        style={{ background: "rgba(214, 177, 96, 0.2)", color: "#f0d38e" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-base">{olay.emoji}</span>
                      <span className="text-sm font-semibold" style={{ color: "#f6ead1" }}>{olay.baslik}</span>
                    </div>
                  </div>

                  {/* Sonraya ekleme butonu */}
                  {seciliOlay && (
                    <button
                      onClick={() => pozisyonaYerlestir(i + 1)}
                      className="relative z-10 mb-2 ml-10 w-[calc(100%-2.5rem)] rounded-xl py-2.5 text-xs font-semibold transition-all duration-200"
                      style={{
                        border: "2px dashed rgba(214, 177, 96, 0.5)",
                        background: "rgba(214, 177, 96, 0.08)",
                        color: "#f0d38e",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(214, 177, 96, 0.18)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(214, 177, 96, 0.08)";
                      }}
                    >
                      ↓ Buraya yerleştir
                    </button>
                  )}
                </div>
              ))}

              {/* Boş durum */}
              {yerlestirilmis.length === 0 && !seciliOlay && (
                <div
                  className="ml-10 rounded-xl p-6 text-center text-sm"
                  style={{
                    border: "2px dashed rgba(214, 177, 96, 0.2)",
                    color: "#c8a85c",
                  }}
                >
                  Bir olay seçerek zaman çizelgesini oluşturmaya başla!
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Tamamlanma Ekranı */}
            <div
              className="rounded-2xl p-6 text-center mb-6"
              style={{
                background: "rgba(43, 31, 22, 0.78)",
                border: "1px solid rgba(214, 177, 96, 0.35)",
                boxShadow: "0 0 40px rgba(214, 177, 96, 0.08)",
              }}
            >
              <p className="text-5xl mb-3">🎉</p>
              <h4
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-cinzel), 'Georgia', serif", color: "#f0d38e" }}
              >
                Tebrikler!
              </h4>
              <p className="mt-2 text-sm" style={{ color: "#dbc9a7" }}>
                Zaman çizelgesini başarıyla tamamladın! Kartlara tıklayarak her olayın detayını keşfet.
              </p>
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ background: "rgba(214, 177, 96, 0.2)", color: "#f0d38e" }}
                >
                  Puan: {puan}
                </span>
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ background: "rgba(232, 138, 122, 0.15)", color: "#e88a7a" }}
                >
                  Yanlış: {yanlisSayisi}
                </span>
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ background: "rgba(130, 200, 160, 0.15)", color: "#82c8a0" }}
                >
                  Doğruluk: {Math.round((puan / (puan + yanlisSayisi * 10 || 1)) * 100)}%
                </span>
              </div>
            </div>

            {/* Filtreler */}
            <div
              className="rounded-xl px-4 py-3 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: "rgba(43, 31, 22, 0.6)",
                border: "1px solid rgba(214, 177, 96, 0.15)",
              }}
            >
              <p className="text-xs uppercase tracking-widest" style={{ color: "#c8a85c" }}>
                Kategori filtresi
              </p>
              <div className="flex flex-wrap gap-2" role="group">
                {kategoriler.map((kat) => (
                  <button
                    key={kat.id}
                    onClick={() => setAktifFiltre(kat.id)}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                    style={{
                      background: aktifFiltre === kat.id ? "#d6b160" : "transparent",
                      color: aktifFiltre === kat.id ? "#1b140f" : "#f5e7c6",
                      border: aktifFiltre === kat.id
                        ? "1px solid #d6b160"
                        : "1px solid rgba(214, 177, 96, 0.3)",
                      boxShadow: aktifFiltre === kat.id
                        ? "0 4px 12px rgba(214, 177, 96, 0.2)"
                        : "none",
                    }}
                  >
                    {kat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tamamlanmış zaman çizelgesi */}
            <div className="relative mb-6">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5 rounded-full hidden sm:block"
                style={{
                  background: "linear-gradient(180deg, rgba(214, 177, 96, 0.1), #d6b160, rgba(214, 177, 96, 0.1))",
                }}
              />
              <div
                className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full sm:hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(214, 177, 96, 0.1), #d6b160, rgba(214, 177, 96, 0.1))",
                }}
              />

              <div className="space-y-4 sm:space-y-5">
                {filtrelenmisOlaylar.map((olay, i) => {
                  const isOpen = acikDetay === olay.id;
                  const isLeft = i % 2 === 0;

                  return (
                    <div key={olay.id} className="relative">
                      {/* Dot — mobil */}
                      <div
                        className="absolute left-4 top-5 -translate-x-1/2 w-3 h-3 rounded-full z-10 sm:hidden"
                        style={{
                          background: "#d6b160",
                          border: "3px solid #1b140f",
                          boxShadow: "0 0 0 4px rgba(214, 177, 96, 0.13), 0 0 12px rgba(214, 177, 96, 0.25)",
                        }}
                      />

                      {/* Dot — masaüstü (ortada) */}
                      <div
                        className="absolute left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full z-10 hidden sm:block"
                        style={{
                          background: "#d6b160",
                          border: "4px solid #1b140f",
                          boxShadow: "0 0 0 5px rgba(214, 177, 96, 0.13), 0 0 18px rgba(214, 177, 96, 0.28)",
                        }}
                      />

                      {/* Kart wrapper */}
                      <div className={`
                        grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6
                      `}>
                        {/* Sol / sağ yerleşim */}
                        <div className={isLeft ? "sm:text-right" : "sm:col-start-2"}>
                          <div className={`${isLeft ? "ml-8 sm:ml-0 sm:mr-8" : "ml-8 sm:ml-8"}`}>
                            <button
                              onClick={() => setAcikDetay(isOpen ? null : olay.id)}
                              className="w-full text-left rounded-2xl px-4 py-4 sm:px-5 sm:py-5 transition-all duration-200"
                              style={{
                                background: "rgba(43, 31, 22, 0.78)",
                                backdropFilter: "blur(8px)",
                                border: isOpen
                                  ? "1px solid rgba(240, 202, 119, 0.5)"
                                  : "1px solid rgba(214, 177, 96, 0.2)",
                                boxShadow: isOpen
                                  ? "0 18px 34px rgba(0, 0, 0, 0.34)"
                                  : "0 8px 20px rgba(0, 0, 0, 0.2)",
                                transform: isOpen ? "translateY(-2px)" : "none",
                              }}
                              aria-expanded={isOpen}
                            >
                              <div className={`flex items-start justify-between gap-3 ${isLeft ? "sm:flex-row-reverse sm:text-right" : ""}`}>
                                <div className="flex-1">
                                  <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
                                    style={{
                                      border: "1px solid rgba(214, 177, 96, 0.3)",
                                      background: "rgba(214, 177, 96, 0.1)",
                                      color: "#f0d38e",
                                    }}
                                  >
                                    {olay.yil}
                                  </span>
                                  <h4
                                    className="mt-2 text-lg sm:text-xl font-bold"
                                    style={{ fontFamily: "var(--font-cinzel), 'Georgia', serif", color: "#f7ecd4" }}
                                  >
                                    {olay.baslik}
                                  </h4>
                                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#e1d2b3" }}>
                                    {olay.aciklama}
                                  </p>
                                </div>
                                <div
                                  className="shrink-0 rounded-xl p-2.5"
                                  style={{
                                    border: "1px solid rgba(214, 177, 96, 0.2)",
                                    background: "rgba(214, 177, 96, 0.1)",
                                  }}
                                >
                                  <span className="text-xl">{olay.emoji}</span>
                                </div>
                              </div>

                              {/* Alt kısım: detayı aç/kapat */}
                              <div className="mt-3 flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold" style={{ color: "#f0d38e" }}>
                                  {isOpen ? "Detayı kapat" : "Detayı aç"}
                                </span>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#f0d38e"
                                  strokeWidth="2"
                                  className="transition-transform duration-200"
                                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                                >
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>

                              {/* Genişleyen detay */}
                              <div
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                  maxHeight: isOpen ? "200px" : "0",
                                  opacity: isOpen ? 1 : 0,
                                }}
                              >
                                <div
                                  className="mt-3 rounded-xl px-4 py-3"
                                  style={{
                                    background: "rgba(20, 15, 11, 0.7)",
                                    border: "1px solid rgba(214, 177, 96, 0.15)",
                                  }}
                                >
                                  <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: "#c8a85c" }}>
                                    Neden önemli?
                                  </p>
                                  <p className="text-sm leading-relaxed" style={{ color: "#e8dcc3" }}>
                                    {olay.detay}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                        {/* Boş taraf (masaüstü grid) */}
                        {isLeft && <div className="hidden sm:block" />}
                      </div>
                    </div>
                  );
                })}

                {/* Tahminler */}
                {tahminler
                  .filter((t) => aktifFiltre === "all" || t.kategori === aktifFiltre)
                  .map((tahmin, i) => (
                  <div key={tahmin.id} className="relative">
                    <div
                      className="absolute left-4 top-4 -translate-x-1/2 w-3 h-3 rounded-full z-10 sm:hidden"
                      style={{
                        background: "#a78bfa",
                        border: "3px solid #1b140f",
                        boxShadow: "0 0 0 4px rgba(167, 139, 250, 0.15), 0 0 12px rgba(167, 139, 250, 0.25)",
                      }}
                    />
                    <div
                      className="absolute left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full z-10 hidden sm:block"
                      style={{
                        background: "#a78bfa",
                        border: "4px solid #1b140f",
                        boxShadow: "0 0 0 5px rgba(167, 139, 250, 0.15), 0 0 18px rgba(167, 139, 250, 0.25)",
                      }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                      <div className={i % 2 === 0 ? "sm:text-right" : "sm:col-start-2"}>
                        <div className={`${i % 2 === 0 ? "ml-8 sm:ml-0 sm:mr-8" : "ml-8 sm:ml-8"}`}>
                          <div
                            className="rounded-2xl px-4 py-3"
                            style={{
                              background: "rgba(167, 139, 250, 0.08)",
                              border: "1px solid rgba(167, 139, 250, 0.25)",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="rounded-lg px-2 py-0.5 text-xs font-bold"
                                style={{ background: "rgba(167, 139, 250, 0.2)", color: "#c4b5fd" }}
                              >
                                {tahmin.yil}
                              </span>
                              <span>🔮</span>
                              <span className="text-sm font-semibold" style={{ color: "#c4b5fd" }}>{tahmin.baslik}</span>
                            </div>
                            <p className="mt-1 text-xs" style={{ color: "rgba(167, 139, 250, 0.7)" }}>
                              Senin tahminin!
                            </p>
                          </div>
                        </div>
                      </div>
                      {i % 2 === 0 && <div className="hidden sm:block" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gelecek Tahmini */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{
                background: "rgba(43, 31, 22, 0.6)",
                border: "1px solid rgba(167, 139, 250, 0.2)",
              }}
            >
              <button
                onClick={() => setGosterTahminFormu(!gosterTahminFormu)}
                className="w-full flex items-center justify-between"
              >
                <span className="text-sm font-bold" style={{ color: "#c4b5fd" }}>
                  🔮 Gelecek Tahmini Ekle
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2"
                  className="transition-transform duration-200"
                  style={{ transform: gosterTahminFormu ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {gosterTahminFormu && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="number"
                    min={2025}
                    max={2100}
                    value={yeniYil}
                    onChange={(e) => setYeniYil(e.target.value)}
                    placeholder="Yıl (2025-2100)"
                    className="rounded-xl px-3 py-2.5 text-sm w-full sm:w-36"
                    style={{
                      background: "rgba(20, 15, 11, 0.8)",
                      border: "1px solid rgba(214, 177, 96, 0.2)",
                      color: "#f4ead7",
                    }}
                  />
                  <input
                    type="text"
                    value={yeniBaslik}
                    onChange={(e) => setYeniBaslik(e.target.value)}
                    placeholder="Ne olacağını tahmin ediyorsun?"
                    className="flex-1 rounded-xl px-3 py-2.5 text-sm"
                    style={{
                      background: "rgba(20, 15, 11, 0.8)",
                      border: "1px solid rgba(214, 177, 96, 0.2)",
                      color: "#f4ead7",
                    }}
                  />
                  <button
                    onClick={tahminEkle}
                    disabled={!yeniYil || !yeniBaslik.trim()}
                    className="rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: "#a78bfa",
                      color: "#1b140f",
                    }}
                  >
                    Ekle
                  </button>
                </div>
              )}
            </div>

            {/* Tekrar Dene */}
            <button
              onClick={sifirla}
              className="rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200"
              style={{
                background: "#d6b160",
                color: "#1b140f",
                boxShadow: "0 4px 12px rgba(214, 177, 96, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(214, 177, 96, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(214, 177, 96, 0.2)";
              }}
            >
              Tekrar Dene
            </button>
          </>
        )}
      </div>
    </div>
  );
}
