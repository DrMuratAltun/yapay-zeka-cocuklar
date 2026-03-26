"use client";

import { useState } from "react";

const senaryolar = [
  {
    id: 1,
    baslik: "Sınavda Kopya Tespiti",
    durum:
      "Bir okuldaki YZ sistemi, bir öğrencinin sınavda kopya çektiğini tespit etti. Ancak YZ'nin hata yapma ihtimali var. Öğrenci kopya çekmediğini söylüyor. Okul müdürü YZ'nin raporuna göre öğrenciye sıfır vermek istiyor.",
    savciSorulari: [
      "YZ sistemi hangi kanıtlara dayanıyor?",
      "Eğer YZ'ye güvenmezsek, kopya çekenleri nasıl tespit ederiz?",
      "Teknolojiyi neden kullanıyoruz, güvenmeyeceksek?",
    ],
    savunmaSorulari: [
      "YZ'nin hata oranı nedir? Masum biri cezalandırılabilir mi?",
      "Öğrencinin itiraz hakkı nasıl korunmalı?",
      "YZ kararı tek başına yeterli bir kanıt mıdır?",
    ],
    juriSorulari: [
      "Her iki tarafın argümanları ne kadar güçlü?",
      "Adil bir karar için başka hangi bilgiler gerekli?",
      "Benzer durumlar için nasıl bir kural koyardınız?",
    ],
  },
  {
    id: 2,
    baslik: "YZ Sanat Yarışması",
    durum:
      "Bir öğrenci resim yarışmasına YZ ile ürettiği bir tabloyu gönderdi ve birincilik kazandı. Diğer öğrenciler kendi elleriyle çizmişlerdi. Jüri, eserin YZ ile yapıldığını sonradan öğrendi. Ödülü geri almalı mı?",
    savciSorulari: [
      "Yarışmanın amacı bireysel yaratıcılığı ölçmek değil mi?",
      "YZ kullanan kişi ile elle çizen kişi eşit şartlarda mı yarışıyor?",
      "Bu durum diğer yarışmacılara karşı adil mi?",
    ],
    savunmaSorulari: [
      "YZ aracını kullanmak da bir beceri değil mi?",
      "Kurallar YZ kullanımını yasaklıyor muydu?",
      "Prompt yazmak da bir yaratıcılık biçimi olabilir mi?",
    ],
    juriSorulari: [
      "Yaratıcılık sadece elle üretimle mi ölçülür?",
      "Gelecekte yarışma kuralları nasıl olmalı?",
      "Bu karar bir emsal oluşturur mu?",
    ],
  },
  {
    id: 3,
    baslik: "Otomatik İşe Alım",
    durum:
      "Bir şirketin YZ sistemi, iş başvurularını otomatik değerlendiriyor. Ancak sistemin kadın adayları erkek adaylara göre daha düşük puanladığı ortaya çıktı. Şirket, geçmiş verilerdeki dengesizlikten kaynaklandığını söylüyor.",
    savciSorulari: [
      "Bu durum ayrımcılık yasalarını ihlal eder mi?",
      "Şirket bu önyargıyı bilmesine rağmen sistemi kullanmaya devam edebilir mi?",
      "Etkilenen adayların hakları nasıl korunmalı?",
    ],
    savunmaSorulari: [
      "Şirket sorunu keşfetti ve düzeltmeye çalışıyor. Bu yeterli mi?",
      "İnsanlar da işe alımda önyargılı davranmıyor mu?",
      "YZ sistemi tamamen kaldırılmalı mı yoksa düzeltilmeli mi?",
    ],
    juriSorulari: [
      "YZ kaynaklı ayrımcılıktan kim sorumludur?",
      "Şirketler YZ sistemlerini kullanmadan önce hangi testleri yapmalı?",
      "Bu tür durumlar için yasalar yeterli mi?",
    ],
  },
];

const roller = [
  { id: "savci", baslik: "Savcı", icon: "⚖️", renk: "rose", aciklama: "Sorunun ciddiyetini savun" },
  { id: "savunma", baslik: "Savunma", icon: "🛡️", renk: "blue", aciklama: "Karşı tarafı savun" },
  { id: "juri", baslik: "Jüri", icon: "👥", renk: "amber", aciklama: "Tarafsız değerlendir" },
];

export default function EtikMahkeme() {
  const [asamaIdx, setAsamaIdx] = useState(0); // 0: senaryo sec, 1: rol sec, 2: arguman yaz, 3: sonuc
  const [senaryoIdx, setSenaryoIdx] = useState(0);
  const [rol, setRol] = useState("");
  const [arguman, setArguman] = useState("");
  const [gonderildi, setGonderildi] = useState(false);

  const senaryo = senaryolar[senaryoIdx];

  const sorular = () => {
    if (rol === "savci") return senaryo.savciSorulari;
    if (rol === "savunma") return senaryo.savunmaSorulari;
    return senaryo.juriSorulari;
  };

  const rolBilgi = roller.find((r) => r.id === rol);

  const sifirla = () => {
    setAsamaIdx(0);
    setRol("");
    setArguman("");
    setGonderildi(false);
  };

  const sonrakiSenaryo = () => {
    setSenaryoIdx((prev) => (prev + 1) % senaryolar.length);
    setAsamaIdx(0);
    setRol("");
    setArguman("");
    setGonderildi(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-amber-500 px-3 py-1 text-sm font-bold text-white">
          ETKİLEŞİMLİ
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">YZ Etik Mahkemesi</span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-[var(--color-text)]">
        YZ Etik Mahkemesi Simülasyonu
      </h3>

      {/* Senaryo secimi */}
      {asamaIdx === 0 && (
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            Aşağıdaki etik ikilemlerden birini seç ve mahkeme simülasyonuna katıl:
          </p>
          <div className="space-y-3">
            {senaryolar.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setSenaryoIdx(i);
                  setAsamaIdx(1);
                }}
                className={`w-full rounded-xl border-2 p-4 text-left transition ${
                  senaryoIdx === i
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-amber-300"
                }`}
              >
                <h4 className="mb-1 font-bold text-[var(--color-text)]">
                  Senaryo {s.id}: {s.baslik}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{s.durum}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rol secimi */}
      {asamaIdx === 1 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <h4 className="mb-1 font-bold text-amber-700 dark:text-amber-400">
              Senaryo: {senaryo.baslik}
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">{senaryo.durum}</p>
          </div>

          <p className="font-medium text-[var(--color-text)]">Hangi rolü üstlenmek istersin?</p>

          <div className="grid gap-3 sm:grid-cols-3">
            {roller.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRol(r.id);
                  setAsamaIdx(2);
                }}
                className={`rounded-xl border-2 p-4 text-center transition ${
                  r.renk === "rose"
                    ? "border-rose-200 hover:border-rose-500 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-900/20"
                    : r.renk === "blue"
                      ? "border-blue-200 hover:border-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                      : "border-amber-200 hover:border-amber-500 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-900/20"
                }`}
              >
                <span className="text-3xl">{r.icon}</span>
                <h4 className="mt-2 font-bold text-[var(--color-text)]">{r.baslik}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{r.aciklama}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Arguman yazma */}
      {asamaIdx === 2 && !gonderildi && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <p className="text-sm text-[var(--color-text-secondary)]">{senaryo.durum}</p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <h4 className="mb-2 font-bold text-[var(--color-text)]">
              {rolBilgi?.icon} Senin Rolün: {rolBilgi?.baslik}
            </h4>
            <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
              Aşağıdaki sorular üzerine düşün ve argümanını yaz:
            </p>
            <ul className="space-y-2">
              {sorular().map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg bg-[var(--color-bg)] p-2 text-sm text-[var(--color-text)]"
                >
                  <span className="shrink-0 font-bold text-amber-600 dark:text-amber-400">
                    {i + 1}.
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <textarea
            value={arguman}
            onChange={(e) => setArguman(e.target.value)}
            placeholder="Argümanını buraya yaz... Yukarıdaki soruları dikkate al."
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            rows={5}
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setAsamaIdx(1)}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-border)]"
            >
              Geri
            </button>
            <button
              onClick={() => setGonderildi(true)}
              disabled={arguman.trim().length < 10}
              className={`rounded-lg px-6 py-2 text-sm font-bold text-white transition ${
                arguman.trim().length >= 10
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
              }`}
            >
              Argümanı Gönder
            </button>
          </div>
        </div>
      )}

      {/* Sonuc: Tum perspektifler */}
      {asamaIdx === 2 && gonderildi && (
        <div className="space-y-4">
          <div className="rounded-xl bg-emerald-50 p-4 text-center dark:bg-emerald-900/20">
            <span className="text-3xl">🏛️</span>
            <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">
              Argümanın kaydedildi!
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-300">
              Şimdi tüm perspektifleri incele.
            </p>
          </div>

          {/* Ogrencinin argumani */}
          <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
            <h4 className="mb-2 font-bold text-amber-700 dark:text-amber-400">
              {rolBilgi?.icon} Senin Argümanın ({rolBilgi?.baslik})
            </h4>
            <p className="text-sm text-[var(--color-text)]">{arguman}</p>
          </div>

          {/* Tum perspektifler */}
          <h4 className="font-bold text-[var(--color-text)]">Tüm Perspektifler:</h4>

          <div className="space-y-3">
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-900/20">
              <h5 className="mb-2 font-bold text-rose-700 dark:text-rose-400">
                ⚖️ Savcı Perspektifi
              </h5>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                {senaryo.savciSorulari.map((s, i) => (
                  <li key={i}>&#8226; {s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h5 className="mb-2 font-bold text-blue-700 dark:text-blue-400">
                🛡️ Savunma Perspektifi
              </h5>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                {senaryo.savunmaSorulari.map((s, i) => (
                  <li key={i}>&#8226; {s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
              <h5 className="mb-2 font-bold text-amber-700 dark:text-amber-400">
                👥 Jüri Perspektifi
              </h5>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                {senaryo.juriSorulari.map((s, i) => (
                  <li key={i}>&#8226; {s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800 dark:bg-indigo-900/20">
            <h4 className="mb-2 font-bold text-indigo-700 dark:text-indigo-400">
              Düşünelim
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Etik sorunlarda genellikle tek bir doğru cevap yoktur. Farklı bakış açılarını
              anlamak ve empati kurmak önemlidir. Kendi görüşünü oluştururken tüm tarafları
              düşünmeyi unutma!
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={sifirla}
              className="rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-border)]"
            >
              Baştan Başla
            </button>
            <button
              onClick={sonrakiSenaryo}
              className="rounded-lg bg-amber-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              Sonraki Senaryo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
