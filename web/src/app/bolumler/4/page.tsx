import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "Makine ogrenimi icin en dogru tanim hangisidir?",
    secenekler: [
      "Bilgisayarlarin insan gibi dusunmesi",
      "Makinelerin veriden oruntu ogrenerek tahmin yapmasi",
      "Robotlarin fiziksel olarak ogrenmesi",
      "Programcilarin her kurali tek tek yazmasi",
    ],
    dogru: 1,
    aciklama: "Makine ogrenimi, makinelerin acikca programlanmadan verilerden oruntu kesfetmesi ve bu oruntulerle tahmin yapmasidir.",
  },
  {
    soru: "Google Teachable Machine ile hangi tur model egitilebilir?",
    secenekler: [
      "Sadece ses tanima",
      "Goruntu, ses ve vucudu poz tanima",
      "Sadece metin siniflandirma",
      "Sadece yuz tanima",
    ],
    dogru: 1,
    aciklama: "Teachable Machine uc farkli model turunu destekler: goruntu siniflandirma, ses tanima ve vucut pozu tanima.",
  },
  {
    soru: "Bir makine ogrenimi modelini egitirken 'egitim verisi' ne ise yarar?",
    secenekler: [
      "Modelin performansini test etmek",
      "Modelin oruntuleri ogrenmesini saglamak",
      "Modeli internete baglamak",
      "Modelin hizini artirmak",
    ],
    dogru: 1,
    aciklama: "Egitim verisi, modelin oruntuleri ve iliskileri ogrendigi veri setidir. Model bu verilerle 'ders calisir'.",
  },
  {
    soru: "Asagidakilerden hangisi 'gozetimli ogrenme' ornegi DEGILDIR?",
    secenekler: [
      "Etiketli fotograflarla kedi/kopek ayirma",
      "Spam/spam degil e-posta siniflandirma",
      "Musterileri otomatik gruplara ayirma (etiket olmadan)",
      "Ev fiyati tahmini",
    ],
    dogru: 2,
    aciklama: "Etiket olmadan gruplama 'gozetimsiz ogrenme' ornegdir. Gozetimli ogrenmede her veri icin dogru cevap (etiket) verilir.",
  },
  {
    soru: "Bir modelin egitim verisinde cok iyi, yeni verilerde kotu performans gostermesine ne denir?",
    secenekler: [
      "Overfitting (asiri uyum)",
      "Underfitting (yetersiz uyum)",
      "Transfer ogrenimi",
      "Pekistirmeli ogrenme",
    ],
    dogru: 0,
    aciklama: "Overfitting, modelin egitim verisini 'ezberlemesi' anlamina gelir. Bu model yeni, gormedigi verilerde basarisiz olur.",
  },
];

export default function Bolum4() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-orange-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🧠</div>
            <div>
              <p className="text-sm font-medium text-orange-200">BOLUM 4 &middot; 6-7. Sinif &middot; 6 ders saati</p>
              <h1 className="text-3xl font-extrabold">Makineler Nasil Ogrenir?</h1>
              <p className="text-orange-200">Makine Ogrenimi Temelleri</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Kazanimlar */}
        <section className="rounded-2xl border-l-4 border-orange-500 bg-orange-50 p-6 dark:bg-orange-900/20">
          <h2 className="mb-3 text-lg font-bold text-orange-700 dark:text-orange-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>Makine ogrenimi kavramini ve geleneksel programlamadan farkini anlayacagiz.</li>
            <li>Gozetimli, gozetimsiz ve pekistirmeli ogrenme turlerini ayirt edebilecegiz.</li>
            <li>Siniflandirma ve tahmin kavramlarini ogrenecegiz.</li>
            <li>Google Teachable Machine ile kendi modelimizi egitecegiz.</li>
            <li>Bir modelin basarisini degerlendirmenin temellerini ogrenecegiz.</li>
          </ul>
        </section>

        {/* Anahtar Kavramlar */}
        <div className="flex flex-wrap gap-2">
          {["makine ogrenimi", "model", "egitim", "siniflandirma", "tahmin", "gozetimli ogrenme", "ozellik (feature)"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        {/* Geleneksel vs ML */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. Geleneksel Programlama vs Makine Ogrenimi</h2>
          <p>
            Geleneksel programlamada bilgisayara her adimi tek tek soyleriz.
            Makine ogreniminde ise bilgisayara ornekler veririz ve o kendisi ogrenir.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 dark:border-blue-700 dark:bg-blue-900/20">
              <h3 className="mb-3 font-bold text-blue-700 dark:text-blue-400">Geleneksel Programlama</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/60 p-2 dark:bg-white/5">
                  <span className="font-mono text-blue-600">Veri</span>
                  <span>+</span>
                  <span className="font-mono text-blue-600">Kurallar</span>
                  <span>=</span>
                  <span className="font-bold">Sonuc</span>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  Programci kurallari yazar:<br/>
                  &quot;Sicaklik &gt; 30 ise &apos;sicak&apos; yaz&quot;
                </p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-5 dark:border-orange-700 dark:bg-orange-900/20">
              <h3 className="mb-3 font-bold text-orange-700 dark:text-orange-400">Makine Ogrenimi</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-white/60 p-2 dark:bg-white/5">
                  <span className="font-mono text-orange-600">Veri</span>
                  <span>+</span>
                  <span className="font-mono text-orange-600">Sonuclar</span>
                  <span>=</span>
                  <span className="font-bold">Kurallar</span>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  Bilgisayar kurallari kendisi bulur:<br/>
                  1000 ornek &rarr; &quot;sicak/soguk&quot; kalibini ogrenir
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
            <p className="font-medium text-orange-800 dark:text-orange-300">
              🤔 Dusun: Bir cocuga &quot;kedi&quot;yi tanimlamayi nasil ogretirsin?
              Kurallari mi anlatirsin (&quot;4 bacakli, tuylu, miyavlar&quot;)
              yoksa cok sayida kedi fotografi mi gosterirsin?
            </p>
          </div>
        </section>

        {/* Ogrenme Turleri */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Makine Ogrenimi Turleri</h2>
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
              <h3 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">🏷️ Gozetimli Ogrenme (Supervised Learning)</h3>
              <p className="mb-2 text-sm">Her veri icin dogru cevap (etiket) verilir. Model, girdi-cikti iliskisini ogrenir.</p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Ornekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>E-posta: &quot;spam&quot; veya &quot;spam degil&quot; siniflandirmasi</li>
                  <li>Goruntu: &quot;kedi&quot; veya &quot;kopek&quot; tanima</li>
                  <li>Ev fiyati tahmini (m2, oda sayisi &rarr; fiyat)</li>
                </ul>
              </div>
              <p className="mt-2 rounded bg-emerald-200 px-2 py-1 text-center text-xs font-bold dark:bg-emerald-800">EN YAYGIN TUR</p>
            </div>

            <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 dark:border-blue-700 dark:bg-blue-900/20">
              <h3 className="mb-2 font-bold text-blue-700 dark:text-blue-400">🔍 Gozetimsiz Ogrenme (Unsupervised Learning)</h3>
              <p className="mb-2 text-sm">Etiket yoktur. Model verideki gizli oruntuleri ve gruplari kendisi kesfeder.</p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Ornekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>Musteri segmentasyonu (benzer musterileri gruplama)</li>
                  <li>Haber konularini otomatik gruplama</li>
                  <li>Anormal davranis tespiti</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border-2 border-violet-300 bg-violet-50 p-5 dark:border-violet-700 dark:bg-violet-900/20">
              <h3 className="mb-2 font-bold text-violet-700 dark:text-violet-400">🎮 Pekistirmeli Ogrenme (Reinforcement Learning)</h3>
              <p className="mb-2 text-sm">Model deneme-yanilma ile ogrenir. Dogru davranistar odul, yanlis davranislar ceza alir.</p>
              <div className="rounded-lg bg-white/60 p-3 text-sm dark:bg-white/5">
                <p className="font-medium">Ornekler:</p>
                <ul className="ml-4 list-disc text-[var(--color-text-secondary)]">
                  <li>AlphaGo - Go oyununu ogrenen YZ</li>
                  <li>Robotlarin yurumesini ogrenmesi</li>
                  <li>Otonom araclarin surusu ogrenmesi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Siniflandirma vs Tahmin */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Siniflandirma ve Tahmin</h2>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Ozellik</th>
                  <th className="px-4 py-3 text-left">Siniflandirma</th>
                  <th className="px-4 py-3 text-left">Tahmin (Regresyon)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cikti", "Kategori (sinif)", "Sayi (deger)"],
                  ["Ornek", "Kedi mi kopek mi?", "Evin fiyati kac TL?"],
                  ["Ornek 2", "Spam mi degil mi?", "Yarin sicaklik kac derece?"],
                  ["Sonuc turu", "Ayrik (2+ sinif)", "Surekli (sayisal)"],
                ].map(([ozellik, sinif, tahmin], i) => (
                  <tr key={ozellik} className={i % 2 === 0 ? "bg-[var(--color-bg-secondary)]" : ""}>
                    <td className="px-4 py-2.5 font-medium">{ozellik}</td>
                    <td className="px-4 py-2.5">{sinif}</td>
                    <td className="px-4 py-2.5">{tahmin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Karar Agaci */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. Karar Agaci ile Siniflandirma</h2>
          <p>
            Karar agaci, en anlasilir makine ogrenimi algoritmalarindan biridir.
            Her dugumde bir soru sorulur ve cevaba gore dallanilir:
          </p>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <div className="inline-block text-left text-sm">
              <div className="mb-4 rounded-lg bg-orange-500 px-4 py-2 text-center font-bold text-white">Meyve hangisi?</div>
              <div className="ml-4 space-y-3">
                <div>
                  <span className="font-medium">Rengi kirmizi mi?</span>
                  <div className="ml-6 mt-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                      <span>Yuvarlak mi?</span>
                    </div>
                    <div className="ml-10 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                        <span className="rounded bg-red-100 px-2 py-0.5 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍎 Elma</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 font-bold">Hayir &rarr;</span>
                        <span className="rounded bg-red-100 px-2 py-0.5 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">🍓 Cilek</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-rose-600 font-bold">Hayir &rarr;</span>
                      <span>Sari mi?</span>
                    </div>
                    <div className="ml-10 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">Evet &rarr;</span>
                        <span className="rounded bg-yellow-100 px-2 py-0.5 font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">🍌 Muz</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 font-bold">Hayir &rarr;</span>
                        <span className="rounded bg-orange-100 px-2 py-0.5 font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">🍊 Portakal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teachable Machine */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">5. Teachable Machine ile Model Egitimi</h2>
          <p>
            Google Teachable Machine, kodlama bilmeden kendi YZ modelinizi egitmenizi
            saglar. Uc turde model egitebilirsiniz:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { tur: "Goruntu", icon: "📸", aciklama: "Kamera veya resim yukleme ile goruntu siniflandirma modeli" },
              { tur: "Ses", icon: "🎙️", aciklama: "Mikrofon ile farkli sesleri taniyabilen model" },
              { tur: "Poz", icon: "🤸", aciklama: "Vucut pozlarini tanima ve siniflandirma modeli" },
            ].map((m) => (
              <div key={m.tur} className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-center dark:border-orange-800 dark:bg-orange-900/20">
                <span className="text-4xl">{m.icon}</span>
                <h4 className="mt-2 font-bold">{m.tur} Modeli</h4>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{m.aciklama}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="font-bold">Adim Adim: Goruntu Siniflandirma Modeli</h3>
            {[
              { adim: 1, baslik: "Sinif Olustur", aciklama: "En az 2 sinif olusturun (ornek: 'Kedi' ve 'Kopek')" },
              { adim: 2, baslik: "Ornek Topla", aciklama: "Her sinif icin en az 50 fotograf cekin veya yukleyin" },
              { adim: 3, baslik: "Modeli Egit", aciklama: "'Train Model' butonuna basin. Model orneklerden ogrenir" },
              { adim: 4, baslik: "Test Et", aciklama: "Kameranizi acin veya yeni fotograf yukleyin. Model dogrumu tahmin ediyor?" },
              { adim: 5, baslik: "Gelistir", aciklama: "Basari dusukse daha fazla ornek ekleyin, farkli acilardan fotograflar cekin" },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 font-bold text-white">{a.adim}</span>
                <div>
                  <h4 className="font-bold">{a.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-sky-50 p-3 text-sm dark:bg-sky-900/20">
            <p className="font-medium text-sky-700 dark:text-sky-300">
              🔗 teachablemachine.withgoogle.com adresinden hemen baslayabilirsiniz!
            </p>
          </div>
        </section>

        {/* Biliyor Muydunuz */}
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
          <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">💡 Biliyor Muydunuz?</h3>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            GPT-4 modeli yaklasik 1 trilyon parametreye sahiptir ve internetin buyuk bir
            bolumundeki metin verileriyle egitilmistir. Egitim sureci aylarca surmus ve
            milyonlarca dolar maliyeti olmustur. Ama siz Teachable Machine ile dakikalar
            icinde kendi modelinizi egitebilirsiniz!
          </p>
        </div>

        {/* Etkinlikler */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Grup calismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Meyve Siniflandirici</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Meyve resimlerini kesin. Ozellik kartlarini (renk, sekil, boyut) kullanarak
              kendi karar agacinizi olusturun. Arkadaslarinizin karar agaciyla sizinkini
              karsilastirin. Farkli agaclar ayni sonucu verebilir mi?
            </p>
            <div className="rounded-lg bg-emerald-50 p-3 text-sm dark:bg-emerald-900/20">
              <p className="font-medium text-emerald-700 dark:text-emerald-300">
                📋 Malzemeler: Meyve resimleri, ozellik kartlari, siniflandirma panosu, makas
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">40 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: Teachable Machine - Goruntu Modeli</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              teachablemachine.withgoogle.com adresine gidin. Iki sinifli bir goruntu
              siniflandirma modeli egitin (ornek: kalem/silgi, el/yumruk, gulme/ciddi yuz).
              En az 50 ornek toplayin. Modelinizi test edin ve basari oranini kaydedin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: ML for Kids - Siniflandirma</h3>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              machinelearningforkids.co.uk adresinde bir proje olusturun. Metin siniflandirma
              projesi yapin: &quot;mutlu&quot; ve &quot;uzgun&quot; cumleleri ayiran bir model egitin.
              Modelinizi Scratch&apos;te kullanan kucuk bir program yapin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup tartismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 4: Model Basari Raporu</h3>
            <p className="text-[var(--color-text-secondary)]">
              Egittiginiz modelin basari oranini sinifla paylasin. Hangi modeller daha
              basarili? Neden? Daha fazla ornek mi, daha iyi oruntuler mi? Tartisarak
              &quot;iyi bir model&quot; icin nelerin gerektigini listeleyin.
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
              "Meyve Siniflandirici Kartlari (PDF)",
              "Teachable Machine Rehberi (PDF)",
              "Model Basari Raporu Formu (PDF)",
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
          <Link href="/bolumler/3" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 3</Link>
          <Link href="/bolumler/5" className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700">Bolum 5 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
