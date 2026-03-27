"use client";

import { useState, useCallback } from "react";

interface Mesaj {
  gonderen: "kullanici" | "cevap";
  metin: string;
}

interface Konusma {
  id: number;
  baslik: string;
  mesajlar: Mesaj[];
  cevap: "insan" | "yapay_zeka";
  aciklama: string;
}

const konusmalar: Konusma[] = [
  {
    id: 1,
    baslik: "Sohbet 1: Hava Durumu",
    mesajlar: [
      { gonderen: "kullanici", metin: "Bugün hava nasıl olacak?" },
      { gonderen: "cevap", metin: "Bugün güneşli ve 22 derece olması bekleniyor. Hafif bir rüzgar da var." },
      { gonderen: "kullanici", metin: "Pikniğe gitsek mi sence?" },
      { gonderen: "cevap", metin: "Hava güzel olacak, piknik için ideal bir gün! Güneş kremi almayı unutmayın." },
      { gonderen: "kullanici", metin: "Daha önce pikniğe gittin mi?" },
      { gonderen: "cevap", metin: "Ben bir yapay zeka asistanıyım, fiziksel olarak bir yere gidemem. Ama size piknik için öneriler sunabilirim!" },
    ],
    cevap: "yapay_zeka",
    aciklama:
      "Son yanıtta kendisinin yapay zeka olduğunu söyledi. Ayrıca yanıtları çok düzgün ve bilgilendirici ama kişisel deneyim içermiyor.",
  },
  {
    id: 2,
    baslik: "Sohbet 2: Favori Film",
    mesajlar: [
      { gonderen: "kullanici", metin: "En sevdiğin film hangisi?" },
      { gonderen: "cevap", metin: "Hmm zor soru... Ben Yüzüklerin Efendisi'ni çok severim. İlk izlediğimde çok küçüktüm ama her seferinde yeniden hayran kalıyorum." },
      { gonderen: "kullanici", metin: "Neden o kadar seviyorsun?" },
      { gonderen: "cevap", metin: "Arkadaşlık ve cesaret teması çok etkiliyor beni. Frodo'nun yüzüğü taşırken verdiği mücadele... Bazen hayatta ben de öyle hissediyorum." },
      { gonderen: "kullanici", metin: "Son izlediğin film ne?" },
      { gonderen: "cevap", metin: "Geçen hafta sonu ailecek sinemaya gittik, yeni çıkan animasyon filmi izledik. Çok eğlenceliydi ama adını şu an hatırlayamıyorum, yaşlanıyorum herhalde :)" },
    ],
    cevap: "insan",
    aciklama:
      "Kişisel deneyimler paylaşıyor (küçükken izlemek, ailecek sinemaya gitmek). Duyguları ifade ediyor. Unutkanlık gibi insani özellikler gösteriyor.",
  },
  {
    id: 3,
    baslik: "Sohbet 3: Matematik Sorusu",
    mesajlar: [
      { gonderen: "kullanici", metin: "347 x 891 kaç eder?" },
      { gonderen: "cevap", metin: "347 x 891 = 308.877 eder." },
      { gonderen: "kullanici", metin: "Bunu nasıl bu kadar hızlı hesapladın?" },
      { gonderen: "cevap", metin: "Matematiksel işlemleri hızlıca gerçekleştirebiliyorum. Size adım adım da gösterebilirim: 347 x 900 = 312.300, sonra 347 x 9 = 3.123 çıkarırız... Aslında düzeltme: 347 x 891 = 308.877." },
      { gonderen: "kullanici", metin: "Peki hiç hata yapar mısın?" },
      { gonderen: "cevap", metin: "Evet, matematiksel hesaplamalarda nadiren hata yapabilirim. Ancak karmaşık muhakeme gerektiren konularda yanılma olasılığım daha yüksektir." },
    ],
    cevap: "yapay_zeka",
    aciklama:
      "Çok hızlı ve hassas hesaplama yaptı. Kendi sınırlarını teknik bir dille açıkladı. İnsanlar genellikle bu kadar büyük çarpmaları anında yapamaz.",
  },
  {
    id: 4,
    baslik: "Sohbet 4: Okul Sohbeti",
    mesajlar: [
      { gonderen: "kullanici", metin: "Bugün okulda çok sıkıldım." },
      { gonderen: "cevap", metin: "Anlıyorum ya, bazı günler gerçekten çok uzun geçiyor. Hangi dersti sıkılan?" },
      { gonderen: "kullanici", metin: "Matematik. Hiç anlamıyorum kesirler konusunu." },
      { gonderen: "cevap", metin: "Aa ben de kesirlerle çok uğraşmıştım! Ama sonra pizza dilimi gibi düşününce kafamda oturmuştu. Mesela 1/4 = pizzanın bir dilimi gibi." },
      { gonderen: "kullanici", metin: "Öğretmenimiz çok hızlı anlatıyor." },
      { gonderen: "cevap", metin: "Keşke biraz yavaşlasa di mi? Bence teneffüste gidip 'hocam biraz tekrar eder misiniz' desen utanılacak bir şey değil. Ben de öyle yapardım." },
    ],
    cevap: "insan",
    aciklama:
      "Kendi okul deneyimlerinden bahsediyor. Empati kuruyor ve samimi bir dil kullanıyor. Günlük konuşma dili, kısaltmalar ve duygusal tepkiler veriyor.",
  },
  {
    id: 5,
    baslik: "Sohbet 5: Hayvanlar",
    mesajlar: [
      { gonderen: "kullanici", metin: "Kediler mi köpekler mi daha iyi evcil hayvan?" },
      { gonderen: "cevap", metin: "Her iki hayvanın da kendine özgü avantajları vardır. Kediler daha bağımsızdır ve bakımı kolaydır. Köpekler ise daha sosyal ve sadıktır. Tercih kişisel yaşam tarzınıza bağlıdır." },
      { gonderen: "kullanici", metin: "Senin bir evcil hayvanın var mı?" },
      { gonderen: "cevap", metin: "Hayır, ben bir evcil hayvana sahip olma kapasitesine sahip değilim. Ancak evcil hayvanlar hakkında bilgi sağlayabilirim." },
      { gonderen: "kullanici", metin: "Bir kedi fotoğrafı görsem sence güzel mi?" },
      { gonderen: "cevap", metin: "Görsel içerikleri değerlendirme yeteneğim var ancak 'güzellik' subjektif bir kavramdır. Kedilerin fiziksel özelliklerini analiz edebilirim." },
    ],
    cevap: "yapay_zeka",
    aciklama:
      "Dengeli ve tarafsız yanıtlar veriyor. Kişisel tercihi yok. Teknik ve resmi bir dil kullanıyor. Sahip olma 'kapasitesinden' bahsetmesi tipik bir YZ ifadesi.",
  },
];

export default function TuringTesti() {
  const [mevcutKonusma, setMevcutKonusma] = useState(0);
  const [tahminler, setTahminler] = useState<(string | null)[]>(
    Array(konusmalar.length).fill(null)
  );
  const [geribildiriGoster, setGeribildiriGoster] = useState(false);
  const [oyunBitti, setOyunBitti] = useState(false);
  const [mesajIndex, setMesajIndex] = useState(2);

  const konusma = konusmalar[mevcutKonusma];
  const skor = tahminler.filter(
    (t, i) => t === konusmalar[i].cevap
  ).length;

  const mesajGoster = useCallback(() => {
    if (mesajIndex < konusma.mesajlar.length) {
      setMesajIndex((m) => Math.min(m + 2, konusma.mesajlar.length));
    }
  }, [mesajIndex, konusma.mesajlar.length]);

  const tahminYap = useCallback(
    (secim: "insan" | "yapay_zeka") => {
      if (geribildiriGoster) return;
      const yeniTahminler = [...tahminler];
      yeniTahminler[mevcutKonusma] = secim;
      setTahminler(yeniTahminler);
      setGeribildiriGoster(true);
    },
    [geribildiriGoster, tahminler, mevcutKonusma]
  );

  const sonraki = useCallback(() => {
    if (mevcutKonusma + 1 >= konusmalar.length) {
      setOyunBitti(true);
    } else {
      setMevcutKonusma((i) => i + 1);
      setMesajIndex(2);
    }
    setGeribildiriGoster(false);
  }, [mevcutKonusma]);

  const tekrarOyna = useCallback(() => {
    setMevcutKonusma(0);
    setTahminler(Array(konusmalar.length).fill(null));
    setGeribildiriGoster(false);
    setOyunBitti(false);
    setMesajIndex(2);
  }, []);

  const dogruMu = tahminler[mevcutKonusma] === konusma.cevap;
  const ilerleme =
    ((mevcutKonusma + (oyunBitti ? 1 : 0)) / konusmalar.length) * 100;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-800 dark:bg-sky-900/20">
        <h4 className="mb-2 flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
          <span>📖</span> Turing Testi Nedir?
        </h4>
        <p className="text-sm leading-relaxed text-sky-800 dark:text-sky-200">
          Turing Testi, 1950 yılında İngiliz matematikçi Alan Turing tarafından önerilmiştir. Bu testte bir insan, yazışma yoluyla karşısındakinin insan mı yoksa makine mi olduğunu anlamaya çalışır. Eğer makine insanı kandırabiliyorsa, &quot;zeki&quot; sayılabilir. Bu test, yapay zekanın ne kadar geliştiğini ölçmek için hâlâ kullanılan önemli bir kavramdır.
        </p>
      </div>

      <div className="mb-6 text-center">
        <h2 className="mb-1 text-2xl font-bold">
          🤖 Turing Testi Simülasyonu
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Konuşmaları oku ve karşındakinin insan mı yoksa yapay zeka mı olduğunu tahmin et!
        </p>
      </div>

      {/* İlerleme */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>
            Konuşma {Math.min(mevcutKonusma + 1, konusmalar.length)} / {konusmalar.length}
          </span>
          <span>Skor: {skor} / {konusmalar.filter((_, i) => tahminler[i] !== null).length || "-"}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${ilerleme}%` }}
          />
        </div>
      </div>

      {!oyunBitti ? (
        <>
          {/* Konuşma Başlığı */}
          <div className="mb-4 text-center">
            <span className="rounded-full bg-sky-100 px-4 py-1 text-sm font-bold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              {konusma.baslik}
            </span>
          </div>

          {/* Mesajlar */}
          <div className="mx-auto mb-6 max-w-lg space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
            {konusma.mesajlar.slice(0, mesajIndex).map((m, i) => (
              <div
                key={`${konusma.id}-${i}`}
                className={`flex ${m.gonderen === "kullanici" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.gonderen === "kullanici"
                      ? "rounded-br-md bg-sky-600 text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <p>{m.metin}</p>
                </div>
              </div>
            ))}

            {mesajIndex < konusma.mesajlar.length && !geribildiriGoster && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={mesajGoster}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  Devamını Göster ({Math.ceil((konusma.mesajlar.length - mesajIndex) / 2)} mesaj kaldı)
                </button>
              </div>
            )}
          </div>

          {/* Geri Bildirim */}
          {geribildiriGoster && (
            <div
              className={`mx-auto mb-6 max-w-lg rounded-xl border-2 p-4 text-center ${
                dogruMu
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-900/30"
                  : "border-rose-300 bg-rose-50 dark:border-rose-600 dark:bg-rose-900/30"
              }`}
            >
              <p className="mb-1 text-2xl">{dogruMu ? "✅ Doğru!" : "❌ Yanlış!"}</p>
              <p className="mb-2 text-sm font-semibold">
                Bu bir{" "}
                {konusma.cevap === "insan" ? "🧑 İnsan" : "🤖 Yapay Zeka"}{" "}
                idi!
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {konusma.aciklama}
              </p>
            </div>
          )}

          {/* Butonlar */}
          {!geribildiriGoster ? (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => tahminYap("insan")}
                disabled={mesajIndex < 4}
                className="flex items-center gap-2 rounded-xl border-2 border-blue-400 bg-blue-50 px-6 py-3 font-bold text-blue-700 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:hover:scale-100 dark:bg-blue-900/40 dark:text-blue-300"
              >
                <span className="text-xl">🧑</span> İnsan
              </button>
              <button
                type="button"
                onClick={() => tahminYap("yapay_zeka")}
                disabled={mesajIndex < 4}
                className="flex items-center gap-2 rounded-xl border-2 border-purple-400 bg-purple-50 px-6 py-3 font-bold text-purple-700 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:hover:scale-100 dark:bg-purple-900/40 dark:text-purple-300"
              >
                <span className="text-xl">🤖</span> Yapay Zeka
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={sonraki}
                className="rounded-xl bg-sky-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-sky-700 hover:shadow-lg active:scale-95"
              >
                {mevcutKonusma + 1 >= konusmalar.length ? "Sonucu Gör 🏆" : "Sonraki Konuşma ➡️"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Sonuç Ekranı */
        <div className="text-center">
          <div className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-[var(--color-border)] bg-gradient-to-br from-white to-sky-50 p-8 shadow-lg dark:from-slate-800 dark:to-slate-700">
            <p className="mb-2 text-5xl">
              {skor === konusmalar.length ? "🏆" : skor >= 4 ? "🎉" : skor >= 3 ? "👍" : "💪"}
            </p>
            <h3 className="mb-2 text-2xl font-bold">
              {skor === konusmalar.length
                ? "Mükemmel Dedektif!"
                : skor >= 4
                ? "Harika!"
                : skor >= 3
                ? "İyi gidiyorsun!"
                : "Tekrar dene!"}
            </h3>
            <p className="mb-4 text-4xl font-bold text-sky-600">
              {skor} / {konusmalar.length}
            </p>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">doğru tahmin</p>

            <div className="space-y-2 text-left">
              {konusmalar.map((k, i) => (
                <div
                  key={k.id}
                  className={`flex items-center gap-3 rounded-lg p-2 text-sm ${
                    tahminler[i] === k.cevap
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-rose-100 dark:bg-rose-900/30"
                  }`}
                >
                  <span>{tahminler[i] === k.cevap ? "✅" : "❌"}</span>
                  <span className="font-medium">{k.baslik}</span>
                  <span className="ml-auto text-xs">
                    {k.cevap === "insan" ? "🧑 İnsan" : "🤖 YZ"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mb-6 max-w-md rounded-xl border border-sky-200 bg-sky-50 p-4 text-left text-sm dark:border-sky-800 dark:bg-sky-900/20">
            <h4 className="mb-2 font-bold text-sky-700 dark:text-sky-300">
              💡 Turing Testi Hakkında
            </h4>
            <p className="text-[var(--color-text-secondary)]">
              Alan Turing 1950 yılında bu testi önermiştir. Eğer bir makine,
              insanlardan ayırt edilemeyecek şekilde sohbet edebiliyorsa,
              &quot;düşünüyor&quot; sayılabilir mi? Bu soru hâlâ tartışılmaktadır!
            </p>
          </div>

          <button
            type="button"
            onClick={tekrarOyna}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            🔄 Tekrar Oyna
          </button>
        </div>
      )}
    </section>
  );
}
