import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Uretken yapay zeka (Generative AI) ne yapar?",
    secenekler: [
      "Sadece var olan verileri analiz eder",
      "Yeni ve orijinal icerikler (metin, goruntu, ses) uretir",
      "Sadece arama motoru gibi calisir",
      "Sadece matematik problemleri cozer",
    ],
    dogru: 1,
    aciklama: "Uretken YZ, egitildigi verilerden ogrendiklerini kullanarak daha once var olmayan yeni icerikler uretebilir.",
  },
  {
    soru: "ChatGPT, Gemini gibi araclar hangi YZ teknolojisini kullanir?",
    secenekler: [
      "Gozetimli siniflandirma",
      "Buyuk dil modelleri (LLM)",
      "Bilgisayar gorusu",
      "Pekistirmeli ogrenme",
    ],
    dogru: 1,
    aciklama: "Bu araclar milyarlarca parametreye sahip buyuk dil modelleri (Large Language Models) kullanir.",
  },
  {
    soru: "Iyi bir prompt (istem) yazmak icin asagidakilerden hangisi en onemledir?",
    secenekler: [
      "Cok uzun ve karmasik yazmak",
      "Acik, net ve baglam iceren talimatlar vermek",
      "Sadece tek kelime yazmak",
      "Her zaman Ingilizce yazmak",
    ],
    dogru: 1,
    aciklama: "Iyi bir prompt; acik, net ve yeterli baglam icerir. Ne istediginizi ne kadar iyi anlatirsan, o kadar iyi sonuc alirsin.",
  },
  {
    soru: "YZ ile uretilen bir icerigi kendi odeviniz gibi sunmak dogru mudur?",
    secenekler: [
      "Evet, cunku YZ cok akilli",
      "Hayir, bu etik degildir ve akademik dursutluge aykiridir",
      "Sadece kucuk odevlerde dogru",
      "Ogretmen fark etmezse sorun yok",
    ],
    dogru: 1,
    aciklama: "YZ'nin urettigi icerigi kendinize ait gibi gostermek etik degildir. YZ bir yardimci aractir, isini senin yerine yapan degil.",
  },
  {
    soru: "Asagidakilerden hangisi uretken YZ ile YAPILAMAZ?",
    secenekler: [
      "Bir siir yazmak",
      "Bir resim olusturmak",
      "Gercek dunya deneyimi yasamak",
      "Kod yazmak",
    ],
    dogru: 2,
    aciklama: "YZ metin, goruntu, ses, kod uretebilir ama gercek dunya deneyimi yasamak (tatmak, koklamak, hissetmek) yapamaz!",
  },
];

export default function Bolum5() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-rose-600 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-pink-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">✨</div>
            <div>
              <p className="text-sm font-medium text-pink-200">BOLUM 5 &middot; 6-7. Sinif &middot; 6 ders saati</p>
              <h1 className="text-3xl font-extrabold">Uretken Yapay Zeka</h1>
              <p className="text-pink-200">YZ Araclariyla Tanisin</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Kazanimlar */}
        <section className="rounded-2xl border-l-4 border-pink-500 bg-pink-50 p-6 dark:bg-pink-900/20">
          <h2 className="mb-3 text-lg font-bold text-pink-700 dark:text-pink-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Uretken yapay zeka kavramini ve temel calisma prensibini anlayacagiz.</li>
            <li>ChatGPT, Gemini gibi buyuk dil modellerini (LLM) taniyacagiz.</li>
            <li>Etkili prompt (istem) yazma tekniklerini ogrenecegiz.</li>
            <li>YZ ile metin, goruntu ve ses uretme deneyimi kazanacagiz.</li>
            <li>YZ kullaniminda etik kurallari ve akademik dursutlugu tartisacagiz.</li>
          </ul>
        </section>

        {/* Anahtar Kavramlar */}
        <div className="flex flex-wrap gap-2">
          {["uretken YZ", "LLM", "prompt", "chatbot", "goruntu uretme", "hallusinasyon", "etik kullanim"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        {/* Giris */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Uretken YZ Nedir?</h2>
          <p>
            Uretken yapay zeka, daha once var olmayan yeni icerikler ureten YZ sistemleridir.
            Metin yazabilir, resim cizebilir, muzik besteleyebilir, kod yazabilir ve
            daha fazlasini yapabilir!
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { tur: "Metin", icon: "📝", ornek: "ChatGPT, Gemini, Claude", aciklama: "Makale, siir, kod, hikaye yazma" },
              { tur: "Goruntu", icon: "🎨", ornek: "DALL-E, Midjourney, Stable Diffusion", aciklama: "Fotografik goruntu ve sanat uretme" },
              { tur: "Ses/Muzik", icon: "🎵", ornek: "Suno, Udio, ElevenLabs", aciklama: "Sarki, seslendirme, ses klonlama" },
              { tur: "Video", icon: "🎬", ornek: "Sora, Runway", aciklama: "Kisa videolar ve animasyonlar" },
            ].map((t) => (
              <div key={t.tur} className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-center dark:border-pink-800 dark:bg-pink-900/20">
                <span className="text-3xl">{t.icon}</span>
                <h4 className="mt-2 font-bold">{t.tur}</h4>
                <p className="text-xs font-medium text-pink-600 dark:text-pink-400">{t.ornek}</p>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LLM */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Buyuk Dil Modelleri (LLM)</h2>
          <p>
            ChatGPT, Gemini, Claude gibi araclar &quot;buyuk dil modeli&quot; (Large Language Model)
            teknolojisini kullanir. Bu modeller milyarlarca metin orneginden dil
            oruntuleri ogrenmistir.
          </p>
          <div className="space-y-3">
            {[
              { baslik: "Nasil Calisir?", aciklama: "LLM, bir cumledeki her kelimeden sonra en muhtemel kelimeyi tahmin eder. Cok gelismis bir 'kelime tahmini' sistemidir.", icon: "⚙️" },
              { baslik: "Ne Bilir?", aciklama: "Egitim verilerindeki bilgileri 'ogrenmistir' ama gercek anlamda anlamaz. Kaliplari ve oruntuleri kullanir.", icon: "📚" },
              { baslik: "Siniri Ne?", aciklama: "Bazen yanlis bilgi uretebilir (hallusinasyon). Her zaman dogrulayin! Egitim tarihinden sonraki olaylari bilmez.", icon: "⚠️" },
            ].map((m) => (
              <div key={m.baslik} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <h4 className="font-bold">{m.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{m.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prompt Muhendisligi */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Prompt Muhendisligi: YZ&apos;ye Nasil Soru Sorulur?</h2>
          <p>
            Prompt (istem), YZ&apos;ye verdiginiz talimattir. Iyi bir prompt = iyi bir sonuc!
          </p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Kotu Prompt ❌</th>
                  <th className="px-4 py-3 text-left">Iyi Prompt ✅</th>
                  <th className="px-4 py-3 text-left">Neden?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Bana bir sey yaz", "6. sinif ogrencisi icin yapay zeka hakkinda 100 kelimelik bir paragraf yaz", "Konu, hedef kitle ve uzunluk belirtilmis"],
                  ["Ciz", "Uzayda yüzen bir astronot kedinin dijital resmi, karikatur tarzinda", "Konu, stil ve detay verilmis"],
                  ["Matematik yap", "Bu denklemi adim adim coz: 3x + 7 = 22", "Spesifik problem ve yontem belirtilmis"],
                  ["Kod yaz", "Python ile 1'den 100'e kadar asal sayilari bulan bir program yaz, her adimi aciklayarak", "Dil, gorev ve format belirtilmis"],
                ].map(([kotu, iyi, neden], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 text-rose-600 dark:text-rose-400">{kotu}</td>
                    <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400">{iyi}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{neden}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Prompt Formulu */}
          <div className="rounded-xl border-2 border-pink-300 bg-pink-50 p-5 dark:border-pink-700 dark:bg-pink-900/20">
            <h3 className="mb-3 font-bold text-pink-700 dark:text-pink-400">🔑 Iyi Prompt Formulu</h3>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              {[
                { eleman: "Rol", ornek: "Sen bir tarih ogretmenisin...", icon: "🎭" },
                { eleman: "Gorev", ornek: "...6. siniflar icin bir ders notu yaz...", icon: "📋" },
                { eleman: "Baglam", ornek: "...konu: Osmanli Devleti'nin kurulusu...", icon: "🌍" },
                { eleman: "Format", ornek: "...madde isareti ile, en fazla 200 kelime.", icon: "📐" },
              ].map((p) => (
                <div key={p.eleman} className="flex items-start gap-2 rounded-lg bg-white/60 p-3 dark:bg-white/5">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <span className="font-bold">{p.eleman}:</span>
                    <p className="text-xs text-[var(--color-text-secondary)]">{p.ornek}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hallusinasyon */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. YZ Hallusinasyonu: Dikkat!</h2>
          <p>
            YZ bazen cok inandirici gorunen ama tamamen yanlis bilgiler uretebilir.
            Buna &quot;hallusinasyon&quot; denir.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
              <h3 className="mb-2 font-bold text-rose-700 dark:text-rose-400">⚠️ Hallusinasyon Ornekleri</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Var olmayan kitaplar/makaleler uydurma</li>
                <li>&#8226; Yanlis tarihler ve istatistikler verme</li>
                <li>&#8226; Olmayan kisiler hakkinda bilgi uretme</li>
                <li>&#8226; Yanlis matematik sonuclari gosterme</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">✅ Nasil Korunuruz?</h3>
              <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
                <li>&#8226; Her bilgiyi baska kaynaklardan dogrulayin</li>
                <li>&#8226; Kritik konularda tek kaynak olarak kullanmayin</li>
                <li>&#8226; &quot;Emin misin?&quot; diye sorun ve kaynak isteyin</li>
                <li>&#8226; Saglik, hukuk gibi konularda uzmana danisin</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Etik */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">5. Etik Kullanim ve Akademik Dursutluk</h2>
          <p>
            YZ guclu bir aractir ama sorumlulukla kullanilmalidir:
          </p>
          <div className="space-y-3">
            {[
              { kural: "YZ bir yardimcidir, yerine gecen degil", aciklama: "Odevi YZ'ye yaptirip kendi odevin gibi sunma. YZ'yi fikir uretme, duzeltme ve ogrenme araci olarak kullan.", icon: "🤝" },
              { kural: "Kaynak belirt", aciklama: "YZ ile urettigin icerigi paylasirken 'YZ destegi ile hazirlanmistir' diye belirt.", icon: "📎" },
              { kural: "Dogrula", aciklama: "YZ'nin verdigi bilgileri mutlaka baska kaynaklardan kontrol et.", icon: "🔍" },
              { kural: "Kisisel bilgi paylasma", aciklama: "YZ araclarina kisisel bilgilerini (adres, telefon, TC kimlik no vb.) verme.", icon: "🔒" },
            ].map((k) => (
              <div key={k.kural} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-3xl">{k.icon}</span>
                <div>
                  <h4 className="font-bold">{k.kural}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Etkinlikler */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Ikili calisma</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Prompt Duellosu</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Prompt kartlarini cekin. Her kartta bir gorev yazilidir. Ikili takimlar
              halinde ayni gorev icin farkli promptlar yazin. Hangi prompt daha iyi
              sonuc verir? Sinifca oylayarak en iyi promptlari secin.
            </p>
            <div className="rounded-lg bg-pink-50 p-3 text-sm dark:bg-pink-900/20">
              <p className="font-medium text-pink-700 dark:text-pink-300">
                📋 Malzemeler: Prompt kartlari, puanlama tablosu, kalem
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: ChatGPT / Gemini ile Tanisma</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Bir uretken YZ aracini acin. Asagidaki gorevleri prompt formulunu kullanarak
              deneyin: (1) Kendinizi tanitan bir paragraf yazdirin, (2) Bir siir yazdirin,
              (3) Bir matematik problemi cozdurun, (4) Yanlis bilgi uretmesini saglayip
              hallusinasyonu tespit edin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: YZ ile Goruntu Uretme</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Bir goruntu uretme aracini kullanin (Bing Image Creator, Canva AI vb.).
              Farkli prompt teknikleriyle ayni konuda 3 farkli goruntu uretin.
              Hangi prompt en iyi sonucu verdi? Neden?
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Sinif tartismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 4: YZ Etik Mahkemesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Senaryo kartlarindaki durumlari okuyun. Her senaryo icin &quot;Etik mi?&quot;
              sorusunu tartisarak sinifca karar verin. Ornek: &quot;Bir ogrenci tum odevini
              ChatGPT&apos;ye yaptirdi ve kendi yazdim dedi. Dogru mu?&quot;
            </p>
          </div>
        </section>

        {/* Quiz */}
        <InteraktifQuiz sorular={quizSorulari} />

        {/* Indirilebilir */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {[
              "Prompt Duellosu Kart Seti (PDF)",
              "Prompt Formulu Calisma Yapragi (PDF)",
              "Etik Senaryo Kartlari (PDF)",
              "Degerlendirme Testi (PDF)",
              "Oz Degerlendirme Formu (PDF)",
            ].map((dosya) => (
              <div key={dosya} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{dosya}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigasyon */}
        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/4" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 4</Link>
          <Link href="/bolumler/6" className="rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">Bolum 6 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
