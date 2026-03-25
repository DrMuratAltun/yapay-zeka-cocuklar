import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "PictoBlox hangi programlama yaklasimini kullanir?",
    secenekler: [
      "Metin tabanli kodlama",
      "Blok tabanli (surukle-birak) kodlama",
      "Komut satiri programlama",
      "Sadece Python",
    ],
    dogru: 1,
    aciklama: "PictoBlox, Scratch benzeri blok tabanli bir arayuz sunar. Bloklari surukleyerek YZ projeleri olusturabilirsiniz.",
  },
  {
    soru: "PictoBlox'ta bir goruntu siniflandirma projesi icin ilk yapilmasi gereken nedir?",
    secenekler: [
      "Kodu yazmak",
      "Modeli egitmek (siniflar olusturup ornek toplamak)",
      "Sahneyi tasarlamak",
      "Ses kaydi yapmak",
    ],
    dogru: 1,
    aciklama: "Once siniflar olusturulur ve her sinif icin ornekler toplanir. Model egitildikten sonra kodlama yapilir.",
  },
  {
    soru: "Asagidakilerden hangisi PictoBlox'un YZ uzantisi DEGILDIR?",
    secenekler: [
      "Machine Learning",
      "Yuz Tanima (Face Detection)",
      "Metin Siniflandirma",
      "3D Modelleme",
    ],
    dogru: 3,
    aciklama: "PictoBlox'ta ML, yuz tanima, metin siniflandirma, ses tanima gibi YZ uzantilari vardir ama 3D modelleme YZ uzantisi degildir.",
  },
  {
    soru: "Scratch'te bir YZ projesinde 'eger ... ise' blogu ne ise yarar?",
    secenekler: [
      "Programi durdurur",
      "Modelin tahmin sonucuna gore farkli islemler yapar",
      "Sadece ses calar",
      "Internete baglanir",
    ],
    dogru: 1,
    aciklama: "Kosul bloklari, modelin tahmin sonucuna gore programin farkli davranislar gostermesini saglar.",
  },
  {
    soru: "ML for Kids platformunda Scratch ile YZ projesi yapmak icin hangi adimlar izlenir?",
    secenekler: [
      "Proje olustur > Egitim verisi ekle > Model egit > Scratch'te kullan",
      "Sadece Scratch'i ac ve kod yaz",
      "Sadece veri topla",
      "Sadece model egit",
    ],
    dogru: 0,
    aciklama: "ML for Kids'te 4 adimli bir surec izlenir: proje olusturma, veri ekleme, model egitme ve Scratch'te kullanma.",
  },
];

export default function Bolum6() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-blue-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🧩</div>
            <div>
              <p className="text-sm font-medium text-blue-200">BOLUM 6 &middot; 7. Sinif &middot; 8 ders saati</p>
              <h1 className="text-3xl font-extrabold">Blok Tabanli YZ Kodlama</h1>
              <p className="text-blue-200">PictoBlox Projeleri</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
          <h2 className="mb-3 text-lg font-bold text-blue-700 dark:text-blue-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>PictoBlox ortamini taniyacak ve YZ uzantilarini kullanacagiz.</li>
            <li>Blok tabanli kodlama ile goruntu siniflandirma projesi yapacagiz.</li>
            <li>ML for Kids ile Scratch&apos;te YZ projesi gelistirecegiz.</li>
            <li>Ses tanima ve metin siniflandirma projeleri deneyimleyecegiz.</li>
            <li>Kendi YZ destekli oyunumuzu/uygulamamizi tasarlayacagiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["PictoBlox", "Scratch", "ML for Kids", "blok kodlama", "goruntu siniflandirma", "ses tanima", "uzanti"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. PictoBlox Nedir?</h2>
          <p>
            PictoBlox, Scratch tabanli bir kodlama ortamidir ve ozel YZ uzantilari
            icerir. Surukle-birak bloklarla yapay zeka projeleri gelistirmenizi saglar.
            Ucretsiz indirilebilir ve web tarayicisinda da calisir.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { ozellik: "Blok Kodlama", icon: "🧩", aciklama: "Scratch benzeri surukle-birak arayuz" },
              { ozellik: "YZ Uzantilari", icon: "🤖", aciklama: "ML, yuz tanima, ses tanima, NLP" },
              { ozellik: "Donanim Destegi", icon: "🔌", aciklama: "Arduino, Raspberry Pi baglantisi" },
            ].map((o) => (
              <div key={o.ozellik} className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-900/20">
                <span className="text-3xl">{o.icon}</span>
                <h4 className="mt-2 font-bold">{o.ozellik}</h4>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. PictoBlox ile Goruntu Siniflandirma</h2>
          <p>Adim adim bir goruntu siniflandirma projesi yapalim:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "PictoBlox'u Ac", aciklama: "ai.thestempedia.com adresinden web surmunu acin veya masaustu uygulamayi indirin." },
              { adim: 2, baslik: "ML Uzantisini Ekle", aciklama: "Uzantilar bolumunden 'Machine Learning' uzantisini projeye ekleyin." },
              { adim: 3, baslik: "Siniflar Olustur", aciklama: "En az 2 sinif olusturun. Ornek: 'Tas', 'Kagit', 'Makas'" },
              { adim: 4, baslik: "Ornekler Topla", aciklama: "Her sinif icin kamerayla en az 30 ornek goruntu kaydedin. Farkli acilardan cekin!" },
              { adim: 5, baslik: "Modeli Egit", aciklama: "'Train Model' butonuna basin. Egitim birkaç dakika surebilir." },
              { adim: 6, baslik: "Kodlama Yap", aciklama: "'Eger sinif = Tas ise ... soyle' seklinde kosullu bloklar ekleyin." },
              { adim: 7, baslik: "Test Et ve Gelistir", aciklama: "Projeyi calistirin, test edin. Hatali sonuclarda daha fazla ornek ekleyin." },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{a.adim}</span>
                <div>
                  <h4 className="font-bold">{a.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. ML for Kids + Scratch</h2>
          <p>
            ML for Kids, makine ogrenimi modellerini egitip Scratch&apos;te
            kullanmanizi saglayan ucretsiz bir platformdur.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Adim</th>
                  <th className="px-4 py-3 text-left">Yapilacak</th>
                  <th className="px-4 py-3 text-left">Detay</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1. Proje Olustur", "Yeni proje > Tanimlama secenegi", "Metin, goruntu veya sayi secin"],
                  ["2. Egitim Verisi", "Her sinif icin en az 10 ornek ekle", "Ne kadar cok ornek, o kadar iyi"],
                  ["3. Model Egit", "Ogren ve test et butonuna bas", "Model orneklerden ogrenir"],
                  ["4. Scratch'te Kullan", "Scratch 3 ile ac", "ML blokları otomatik eklenir"],
                ].map(([adim, yapilacak, detay], i) => (
                  <tr key={adim} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 font-medium">{adim}</td>
                    <td className="px-4 py-2.5">{yapilacak}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{detay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. Proje Fikirleri</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { proje: "Tas-Kagit-Makas Oyunu", zorluk: "Baslangic", aciklama: "Kamera ile el hareketlerini taniyarak bilgisayara karsi oyna", icon: "✊" },
              { proje: "Duygu Tanima Aynasi", zorluk: "Orta", aciklama: "Yuz ifadelerini taniyarak mutlu, uzgun, saskin tepkiler veren program", icon: "😊" },
              { proje: "Geri Donusum Asistani", zorluk: "Orta", aciklama: "Atiklari kamera ile taniyarak dogru geri donusum kutusunu gosteren sistem", icon: "♻️" },
              { proje: "Sesle Kontrol", zorluk: "Ileri", aciklama: "Ses komutlariyla (saga git, sola git, dur) karakteri yonlendiren oyun", icon: "🎙️" },
            ].map((p) => (
              <div key={p.proje} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-bold">{p.proje}</h4>
                    <span className={`text-xs font-medium ${p.zorluk === "Baslangic" ? "text-emerald-600" : p.zorluk === "Orta" ? "text-amber-600" : "text-rose-600"}`}>
                      {p.zorluk}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{p.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Algoritma Sefi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Bir yemek tarifini akis diyagrami olarak cizip, &quot;eger ... ise&quot;
              kosullarini belirleyin. Ornegin: &quot;Eger yumurta varsa omlet yap, yoksa
              tost yap.&quot; Bu akis diyagramini Scratch/PictoBlox bloklarina cevirmeyi deneyin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">45 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: PictoBlox - Tas Kagit Makas</h3>
            <p className="text-[var(--color-text-secondary)]">
              PictoBlox&apos;ta ML uzantisini kullanarak Tas-Kagit-Makas oyunu yapin.
              3 sinif olusturun, her sinif icin 30+ ornek toplayin, modeli egitin
              ve oyunu kodlayin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">40 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: ML for Kids - Duygu Analizi</h3>
            <p className="text-[var(--color-text-secondary)]">
              ML for Kids&apos;te metin siniflandirma projesi olusturun. &quot;Mutlu&quot; ve
              &quot;Uzgun&quot; cumleleri ayiran bir model egitin. Scratch&apos;te kullanicinin
              yazdigi cumleye gore karakterin yuz ifadesini degistiren bir program yapin.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Algoritma Sefi Akis Sablonu (PDF)", "PictoBlox Baslangic Rehberi (PDF)", "ML for Kids Adim Adim Rehber (PDF)", "Degerlendirme Testi (PDF)", "Oz Degerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/5" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 5</Link>
          <Link href="/bolumler/7" className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">Bolum 7 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
