"use client";

import { useState } from "react";

interface YeniSinifModalProps {
  acik: boolean;
  kapat: () => void;
  olusturuldu: () => void;
}

type CredType = "pin" | "emoji" | "word";

function kodOlustur() {
  const harfler = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // karıştırılabilir I, O'dan kaçın
  const rakamlar = "23456789";
  let kod = "";
  for (let i = 0; i < 2; i++) kod += harfler.charAt(Math.floor(Math.random() * harfler.length));
  kod += "-";
  for (let i = 0; i < 3; i++) kod += rakamlar.charAt(Math.floor(Math.random() * rakamlar.length));
  return kod;
}

export default function YeniSinifModal({ acik, kapat, olusturuldu }: YeniSinifModalProps) {
  const [ad, setAd] = useState("");
  const [kod, setKod] = useState(kodOlustur());
  const [tip, setTip] = useState<CredType>("pin");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  if (!acik) return null;

  async function kaydet(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    setYukleniyor(true);
    try {
      const res = await fetch("/api/schools/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ad,
          access_code: kod,
          credential_type: tip,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.error ?? "Sınıf oluşturulamadı");
        setYukleniyor(false);
        return;
      }
      // Başarı → reset + callback
      setAd("");
      setKod(kodOlustur());
      setTip("pin");
      olusturuldu();
    } catch (err) {
      setHata("Ağ hatası. Tekrar dene.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={kapat}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={kaydet}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/80">Yeni</p>
              <h3 className="text-xl font-extrabold">Sınıf Oluştur</h3>
            </div>
            <button
              type="button"
              onClick={kapat}
              className="cursor-pointer rounded-full p-1.5 text-white/80 transition hover:bg-white/20"
              aria-label="Kapat"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Sınıf Adı
            </label>
            <input
              type="text"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder="Örn: 6A, 7/B, Yapay Zeka Kulübü..."
              required
              maxLength={60}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              Sınıf Kodu
              <button
                type="button"
                onClick={() => setKod(kodOlustur())}
                className="cursor-pointer rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300"
              >
                🔄 Yeniden Üret
              </button>
            </label>
            <input
              type="text"
              value={kod}
              onChange={(e) => setKod(e.target.value.toUpperCase())}
              placeholder="Örn: 6A-GYZ"
              required
              maxLength={15}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-center font-mono text-lg font-bold tracking-widest outline-none transition focus:border-violet-400 dark:border-slate-700 dark:bg-slate-950"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Öğrenciler bu kodla `/kolay-giris` sayfasından girer
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Giriş Türü
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { t: "pin" as CredType, emoji: "🔢", ad: "PIN", aciklama: "4 rakamlı" },
                  { t: "emoji" as CredType, emoji: "😊", ad: "Emoji", aciklama: "3 sembol" },
                  { t: "word" as CredType, emoji: "💬", ad: "Kelime", aciklama: "Kısa kelime" },
                ]
              ).map((o) => (
                <button
                  key={o.t}
                  type="button"
                  onClick={() => setTip(o.t)}
                  className={`cursor-pointer rounded-xl border-2 p-2 text-left transition ${
                    tip === o.t
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/30"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="text-center text-xl">{o.emoji}</div>
                  <p className="text-center text-xs font-bold">{o.ad}</p>
                  <p className="text-center text-[9px] text-slate-500">{o.aciklama}</p>
                </button>
              ))}
            </div>
          </div>

          {hata && (
            <div className="rounded-lg border-l-4 border-rose-400 bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
              ⚠️ {hata}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 border-t border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
          <button
            type="button"
            onClick={kapat}
            className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
            disabled={yukleniyor}
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={yukleniyor || !ad || !kod}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold text-white transition ${
              yukleniyor || !ad || !kod
                ? "cursor-not-allowed bg-slate-300"
                : "cursor-pointer bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {yukleniyor ? "Oluşturuluyor..." : "Sınıfı Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
}
