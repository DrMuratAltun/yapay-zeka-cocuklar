"use client";

import { useState } from "react";

interface Senaryo {
  id: number;
  baslik: string;
  aciklama: string;
  dogruCevap: "uygun" | "uygun-degil" | "tartismali";
  yasal: string;
  etik: string;
}

const senaryolar: Senaryo[] = [
  {
    id: 1,
    baslik: "Ödev için YZ ile resim oluşturma",
    aciklama: "Bir öğrenci, biyoloji ödevinde hücre yapısını gösteren bir görsel oluşturmak için YZ görüntü aracı kullandı ve kaynağını belirtti.",
    dogruCevap: "uygun",
    yasal: "Eğitim amaçlı YZ kullanımı ve kaynak belirtmek genellikle kabul edilir.",
    etik: "Kaynağı belirtmek şeffaflık ilkesine uygundur. YZ burada öğrenme aracı olarak kullanılmıştır.",
  },
  {
    id: 2,
    baslik: "YZ müziğini satışa çıkarma",
    aciklama: "Bir kişi YZ ile ürettiği müzik parçalarını kendi bestesi gibi dijital platformlarda satışa çıkardı.",
    dogruCevap: "tartismali",
    yasal: "YZ ile üretilen eserlerin telif hakkı sahipliği hâlâ tartışmalıdır. Ülkeden ülkeye farklı kurallar var.",
    etik: "YZ ile üretildiğini gizlemek etik bir sorun oluşturur. Alıcıların bilgilendirilmesi gerekir.",
  },
  {
    id: 3,
    baslik: "Ünlü sanatçının tarzını kopyalama",
    aciklama: "Bir tasarımcı, yaşayan bir ressamın eserlerini YZ'ye öğretip aynı tarzda ticari ürünler üretti.",
    dogruCevap: "uygun-degil",
    yasal: "Yaşayan bir sanatçının tarzını izinsiz kopyalamak telif hakkı ihlali sayılabilir.",
    etik: "Sanatçının emeğine ve özgün tarzına saygı gösterilmemiştir. Bu etik açıdan kabul edilemez.",
  },
  {
    id: 4,
    baslik: "Okul sunumu için YZ metin özeti",
    aciklama: "Bir öğrenci, tarih ödevinde uzun bir makaleyi YZ ile özetletti ve kendi yorumlarını ekledi. YZ kullandığını belirtti.",
    dogruCevap: "uygun",
    yasal: "YZ'yi araştırma ve özetleme aracı olarak kullanmak kabul edilir.",
    etik: "Kendi yorumlarını eklemesi ve YZ kullanımını belirtmesi doğru bir yaklaşımdır.",
  },
  {
    id: 5,
    baslik: "Sahte haber görseli oluşturma",
    aciklama: "Bir kişi, gerçekleşmemiş bir doğal afet görseli oluşturup sosyal medyada gerçekmiş gibi paylaştı.",
    dogruCevap: "uygun-degil",
    yasal: "Yanıltıcı içerik oluşturmak birçok ülkede yasadışıdır ve cezai suç olabilir.",
    etik: "Dezenformasyon yaymak topluma zarar verir ve kesinlikle etik dışıdır.",
  },
  {
    id: 6,
    baslik: "YZ ile logo tasarımı",
    aciklama: "Küçük bir işletme sahibi, YZ ile ürettiği logoyu ticari amaçla kullanıyor. YZ aracının ticari kullanıma izin veren lisansı var.",
    dogruCevap: "uygun",
    yasal: "Lisans koşulları ticari kullanıma izin veriyorsa yasaldır.",
    etik: "Lisansa uygun kullanım etik açıdan sorunsuzdur.",
  },
  {
    id: 7,
    baslik: "Başkasının fotoğrafıyla deepfake",
    aciklama: "Bir kişi, arkadaşının fotoğrafını YZ ile değiştirip komik bir video yapıp paylaştı. Arkadaşından izin almadı.",
    dogruCevap: "uygun-degil",
    yasal: "İzinsiz deepfake üretimi kişilik hakları ihlalidir ve yasal yaptırım gerektirebilir.",
    etik: "Kişinin rızası olmadan görüntüsünü manipüle etmek ciddi bir etik ihlaldir.",
  },
  {
    id: 8,
    baslik: "YZ ile çeviri yapma",
    aciklama: "Bir öğrenci, yabancı dildeki bir bilimsel makaleyi YZ çeviri aracıyla Türkçeye çevirdi ve kaynak gösterdi.",
    dogruCevap: "uygun",
    yasal: "Kişisel kullanım ve eğitim amaçlı çeviri genellikle kabul edilir.",
    etik: "Kaynak gösterme ve YZ kullanımını belirtme doğru yaklaşımdır.",
  },
  {
    id: 9,
    baslik: "YZ ile ödev yazma (tamamen)",
    aciklama: "Bir öğrenci, kompozisyon ödevinin tamamını YZ'ye yazdırıp kendi yazdığını iddia etti.",
    dogruCevap: "uygun-degil",
    yasal: "Akademik sahtekârlık okul kurallarının ihlalidir.",
    etik: "Kendi emeği gibi göstermek aldatmacadır ve eğitim sürecine zarar verir.",
  },
  {
    id: 10,
    baslik: "YZ sanat yarışmasına katılma",
    aciklama: "Bir sanatçı, YZ destekli eserini bir dijital sanat yarışmasına gönderdi. Yarışma kuralları YZ kullanımına izin veriyor.",
    dogruCevap: "tartismali",
    yasal: "Yarışma kuralları izin veriyorsa yasaldır, ancak genel kabul henüz netleşmemiştir.",
    etik: "Kurallar izin verse de, YZ ile insan emeği arasındaki adalet tartışması devam etmektedir.",
  },
];

const cevapSecenekleri = [
  { key: "uygun" as const, label: "Uygun", renk: "bg-emerald-500", icon: "✓" },
  { key: "uygun-degil" as const, label: "Uygun Değil", renk: "bg-rose-500", icon: "✗" },
  { key: "tartismali" as const, label: "Tartışmalı", renk: "bg-amber-500", icon: "?" },
];

export default function TelifKontrol() {
  const [mevcutIdx, setMevcutIdx] = useState(0);
  const [cevaplar, setCevaplar] = useState<Record<number, string>>({});
  const [gosterAciklama, setGosterAciklama] = useState(false);
  const [bitti, setBitti] = useState(false);

  const senaryo = senaryolar[mevcutIdx];
  const cevapVerildi = cevaplar[senaryo.id] !== undefined;

  const handleCevap = (cevap: string) => {
    if (cevapVerildi) return;
    setCevaplar((prev) => ({ ...prev, [senaryo.id]: cevap }));
    setGosterAciklama(true);
  };

  const handleSonraki = () => {
    if (mevcutIdx < senaryolar.length - 1) {
      setMevcutIdx(mevcutIdx + 1);
      setGosterAciklama(false);
    } else {
      setBitti(true);
    }
  };

  const dogruSayisi = senaryolar.filter((s) => cevaplar[s.id] === s.dogruCevap).length;

  if (bitti) {
    const puan = Math.round((dogruSayisi / senaryolar.length) * 100);
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-8 text-center text-white">
          <span className="text-5xl">{puan >= 80 ? "🏆" : puan >= 60 ? "📜" : "📝"}</span>
          <h3 className="mt-3 text-2xl font-extrabold">Telif Hakkı Kontrolü Tamamlandı!</h3>
          <p className="mt-2 text-lg">{dogruSayisi} / {senaryolar.length} doğru cevap</p>
          <p className="mt-1 text-rose-100">
            {puan >= 80
              ? "Telif hakkı ve dijital etik konusunda çok bilgilisin!"
              : puan >= 60
                ? "İyi bir başlangıç! Bazı konuları tekrar gözden geçirebilirsin."
                : "Dijital etik ve telif hakkı konusunu daha fazla araştırmaya devam et!"}
          </p>
        </div>

        <div className="space-y-2">
          {senaryolar.map((s) => (
            <div key={s.id} className={`flex items-center gap-3 rounded-lg p-3 text-sm ${
              cevaplar[s.id] === s.dogruCevap
                ? "bg-emerald-50 dark:bg-emerald-900/10"
                : "bg-rose-50 dark:bg-rose-900/10"
            }`}>
              <span>{cevaplar[s.id] === s.dogruCevap ? "✅" : "❌"}</span>
              <span className="flex-1">{s.baslik}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">
                Doğru: {cevapSecenekleri.find((c) => c.key === s.dogruCevap)!.label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setMevcutIdx(0); setCevaplar({}); setGosterAciklama(false); setBitti(false); }}
          className="mx-auto block rounded-xl bg-rose-600 px-6 py-2.5 font-bold text-white transition hover:bg-rose-700"
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-extrabold">Telif Hakkı Kontrolü</h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          YZ ile üretilen içeriklerin kullanımını değerlendir!
        </p>
      </div>

      {/* İlerleme çubuğu */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>Senaryo {mevcutIdx + 1} / {senaryolar.length}</span>
          <span>{dogruSayisi} doğru</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--color-bg-secondary)]">
          <div
            className="h-2 rounded-full bg-rose-500 transition-all"
            style={{ width: `${((mevcutIdx + (cevapVerildi ? 1 : 0)) / senaryolar.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Senaryo Kartı */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
            {mevcutIdx + 1}
          </span>
          <h4 className="text-lg font-bold">{senaryo.baslik}</h4>
        </div>
        <p className="text-[var(--color-text-secondary)]">{senaryo.aciklama}</p>
      </div>

      {/* Cevap Butonları */}
      <div className="grid grid-cols-3 gap-3">
        {cevapSecenekleri.map((c) => {
          const secildi = cevaplar[senaryo.id] === c.key;
          const dogruMu = cevapVerildi && c.key === senaryo.dogruCevap;
          return (
            <button
              key={c.key}
              onClick={() => handleCevap(c.key)}
              disabled={cevapVerildi}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 font-bold transition ${
                dogruMu
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                  : secildi && !dogruMu
                    ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-rose-300 disabled:opacity-50"
              }`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-lg text-white ${c.renk}`}>
                {c.icon}
              </span>
              <span className="text-sm">{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Açıklama */}
      {gosterAciklama && (
        <div className={`rounded-2xl p-5 ${
          cevaplar[senaryo.id] === senaryo.dogruCevap
            ? "bg-emerald-50 dark:bg-emerald-900/20"
            : "bg-rose-50 dark:bg-rose-900/20"
        }`}>
          <p className="mb-2 font-bold">
            {cevaplar[senaryo.id] === senaryo.dogruCevap ? "✅ Doğru!" : "❌ Yanlış!"}
            {" "}Doğru cevap: {cevapSecenekleri.find((c) => c.key === senaryo.dogruCevap)!.label}
          </p>
          <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <p><strong>⚖️ Yasal Boyut:</strong> {senaryo.yasal}</p>
            <p><strong>🤔 Etik Boyut:</strong> {senaryo.etik}</p>
          </div>
          <button
            onClick={handleSonraki}
            className="mt-3 rounded-lg bg-rose-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            {mevcutIdx < senaryolar.length - 1 ? "Sonraki Senaryo →" : "Sonuçları Gör"}
          </button>
        </div>
      )}
    </div>
  );
}
