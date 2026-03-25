import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "YZ ile goruntu uretirken en onemli faktor nedir?",
    secenekler: [
      "En pahali araci kullanmak",
      "Acik ve detayli prompt yazmak",
      "Sadece Ingilizce yazmak",
      "Mumkun oldugunca kisa yazmak",
    ],
    dogru: 1,
    aciklama: "Goruntu uretme araclarinda detayli ve acik prompt yazmak en iyi sonuclari almanizi saglar.",
  },
  {
    soru: "YZ ile uretilen bir goruntuyu sosyal medyada paylasirken ne yapmalisiniz?",
    secenekler: [
      "Hic bir sey belirtmeye gerek yok",
      "YZ ile uretildigini belirtmek",
      "Kendi cizdignizi iddia etmek",
      "Baskasinin cizdignizi soyledemek",
    ],
    dogru: 1,
    aciklama: "Seffaflik onemlidir. YZ ile uretilen iceriklerin kaynaigini belirtmek etik bir sorumluluktur.",
  },
  {
    soru: "Canva AI hangi tur icerik uretiminde kullanilabilir?",
    secenekler: [
      "Sadece fotograf duzenleme",
      "Sunum, poster, sosyal medya gorseli ve daha fazlasi",
      "Sadece video duzenleme",
      "Sadece metin yazma",
    ],
    dogru: 1,
    aciklama: "Canva AI ile sunum, poster, sosyal medya gorseli, infografik ve bircok farkli tasarim yapabilirsiniz.",
  },
  {
    soru: "YZ ile muzik uretirken telif hakki konusunda hangisi dogrudur?",
    secenekler: [
      "YZ ile uretilen her muzik serbestce kullanilabilir",
      "Her aracin kendi lisans kurallari vardir, kontrol edilmelidir",
      "YZ muzigi hic kullanilmamalidir",
      "Telif hakki sadece insanlar icin gecerlidir",
    ],
    dogru: 1,
    aciklama: "Her YZ aracinin farkli lisans kurallari vardir. Kullanmadan once kosullari okumak onemlidir.",
  },
  {
    soru: "Bir dijital hikaye projesi icin en uygun YZ araclari kombinasyonu hangisidir?",
    secenekler: [
      "Sadece ChatGPT",
      "Metin icin LLM + goruntu icin goruntu uretici + ses icin TTS",
      "Sadece goruntu uretme araci",
      "Sadece ses kayit programi",
    ],
    dogru: 1,
    aciklama: "Dijital hikaye projesi birden fazla icerik turu gerektirir: metin, goruntu ve ses. Farkli YZ araclari bir arada kullanilir.",
  },
];

export default function Bolum8() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="mb-4 inline-block text-sm text-rose-200 hover:text-white">&larr; Ana Sayfa</Link>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">🎨</div>
            <div>
              <p className="text-sm font-medium text-rose-200">BOLUM 8 &middot; 7-8. Sinif &middot; 6 ders saati</p>
              <h1 className="text-3xl font-extrabold">Dijital Icerik Uretimi</h1>
              <p className="text-rose-200">YZ ile Yaraticilik</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-rose-500 bg-rose-50 p-6 dark:bg-rose-900/20">
          <h2 className="mb-3 text-lg font-bold text-rose-700 dark:text-rose-300">Neler Ogrenecegiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>YZ ile goruntu, metin ve ses icerikleri uretecegiz.</li>
            <li>Canva AI ile profesyonel tasarimlar yapacagiz.</li>
            <li>Dijital hikaye anlatimi (digital storytelling) projesi gelistirecegiz.</li>
            <li>YZ ile uretilen iceriklerde telif hakki ve etik konularini tartisacagiz.</li>
            <li>Yaratici surecte YZ&apos;yi yardimci arac olarak kullanmayi ogrenecegiz.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["goruntu uretme", "Canva AI", "dijital hikaye", "telif hakki", "yaraticilik", "icerik uretimi"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. YZ ile Goruntu Uretme</h2>
          <p>
            YZ goruntu uretme araclari, metin aciklamanizi (prompt) alip fotografik
            kalitede goruntuler olusturabilir. Sanat, tasarim, egitim ve eglence
            alanlarinda kullanilir.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { arac: "Bing Image Creator", ozellik: "Ucretsiz, DALL-E tabanli", uygunluk: "Ogrenciler icin uygun", icon: "🖼️" },
              { arac: "Canva AI (Magic Media)", ozellik: "Tasarim icinde goruntu uretme", uygunluk: "Egitim hesabi ile ucretsiz", icon: "🎨" },
              { arac: "Leonardo AI", ozellik: "Detayli goruntu kontrolleri", uygunluk: "Ucretsiz sinirli kullanim", icon: "🎭" },
              { arac: "Stable Diffusion", ozellik: "Acik kaynak, yerel calisabilir", uygunluk: "Ileri seviye", icon: "⚡" },
            ].map((a) => (
              <div key={a.arac} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{a.icon}</span>
                  <h4 className="font-bold">{a.arac}</h4>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{a.ozellik}</p>
                <p className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{a.uygunluk}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">2. Goruntu Prompt Teknikleri</h2>
          <div className="space-y-3">
            {[
              { teknik: "Konu + Stil", ornek: "Uzayda yuzen bir astronot kedi, sulu boya tarzinda", sonuc: "Temeli belirler" },
              { teknik: "Detay Ekleme", ornek: "... yildizli bir arka plana, parlak renklerle, 4K kalitede", sonuc: "Kaliteyi arttirir" },
              { teknik: "Negaatif Prompt", ornek: "Bulanik degil, karikatur degil, metin icermeyen", sonuc: "Istenmeyen sonuclari onler" },
              { teknik: "Referans Verme", ornek: "... Studio Ghibli tarzinda, Monet'in boya darbeleriyle", sonuc: "Belirli tarza yonlendirir" },
            ].map((t) => (
              <div key={t.teknik} className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="shrink-0 rounded-lg bg-rose-500 px-3 py-1 text-xs font-bold text-white">{t.teknik}</span>
                <div>
                  <p className="text-sm font-medium">&quot;{t.ornek}&quot;</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{t.sonuc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">3. Canva AI ile Tasarim</h2>
          <p>Canva, YZ destekli tasarim araclariyla profesyonel gorunum elde etmenizi saglar:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { ozellik: "Magic Design", aciklama: "Iceriginize gore otomatik sablon onerisi", icon: "✨" },
              { ozellik: "Magic Media", aciklama: "Metin aciklamasiyla goruntu uretme", icon: "🖼️" },
              { ozellik: "Magic Write", aciklama: "Metin icerigi olusturma ve duzenleme", icon: "📝" },
              { ozellik: "Magic Eraser", aciklama: "Fotograflardan istenmeyen nesneleri silme", icon: "🧹" },
              { ozellik: "Magic Animate", aciklama: "Tasarimlara tek tikla animasyon ekleme", icon: "🎬" },
              { ozellik: "Translate", aciklama: "Tasarimlari otomatik farkli dillere cevirme", icon: "🌐" },
            ].map((o) => (
              <div key={o.ozellik} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <span className="text-2xl">{o.icon}</span>
                <div>
                  <h4 className="font-bold text-sm">{o.ozellik}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">{o.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">4. Dijital Hikaye Anlatimi</h2>
          <p>YZ araclariyla multimedya bir dijital hikaye olusturma adimlari:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "Hikaye Yazimi", aciklama: "ChatGPT/Gemini ile hikaye taslagi olustur, kendin duzenle ve kisiselleştir", arac: "LLM" },
              { adim: 2, baslik: "Gorsel Tasarim", aciklama: "Her sahne icin goruntu uret veya Canva'da illüstrasyonlar tasarla", arac: "Goruntu uretme + Canva" },
              { adim: 3, baslik: "Seslendirme", aciklama: "Hikayeyi kendi sesinle kaydet veya TTS araci kullan", arac: "Ses kayit / TTS" },
              { adim: 4, baslik: "Birlestirme", aciklama: "Tum ogerleri Canva sunumunda veya video duzenleyicide birleştir", arac: "Canva / CapCut" },
              { adim: 5, baslik: "Paylasim", aciklama: "Dijital hikayeni sinifla paylas, geri bildirim al", arac: "Sunum" },
            ].map((a) => (
              <div key={a.adim} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 font-bold text-white">{a.adim}</span>
                <div>
                  <h4 className="font-bold">{a.baslik}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
                  <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Arac: {a.arac}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
          <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">⚠️ Telif Hakki ve Etik</h3>
          <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
            <li>&#8226; YZ ile uretilen iceriklerin telif hakki konusu hala tartismalidir.</li>
            <li>&#8226; Her aracin kendi kullanim kosullari vardir, mutlaka okuyun.</li>
            <li>&#8226; YZ ile uretilen icerigi paylasirken &quot;YZ destekli&quot; belirtmeniz iyi bir uygulamadir.</li>
            <li>&#8226; Gercek sanatcilarin eserlerini taklit etmek icin YZ kullanmaktan kacinin.</li>
          </ul>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold">Etkinlikler</h2>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup tartismasi</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Yapay mi Gercek mi?</h3>
            <p className="text-[var(--color-text-secondary)]">
              10 tane goruntu inceleyin: 5&apos;i YZ ile uretilmis, 5&apos;i gercek fotograf.
              Hangileri yapay, hangileri gercek? Nasil anladiniz? YZ goruntularini ayirt
              etmenin ipucllarini tartisın.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BILGISAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: YZ Poster Tasarimi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Canva AI kullanarak okul etkinliginiz icin bir poster tasarlayin. Magic Media
              ile ozel gorseller, Magic Write ile etkileyici basliklar uretin. Sonucu sinifla
              paylasin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
              <span className="text-sm text-[var(--color-text-secondary)]">2 ders saati &middot; Bireysel veya ikili</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Dijital Hikaye Projesi</h3>
            <p className="text-[var(--color-text-secondary)]">
              5 sahnelik bir dijital hikaye olusturun. Hikayeyi YZ ile yazin (kendiniz
              duzenleyin), her sahne icin gorsel uretin, seslendirin ve Canva sunumunda
              birlestirin. Sinifta canli sunun.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">Indirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Yapay mi Gercek mi? Kart Seti (PDF)", "Dijital Hikaye Planlama Sablonu (PDF)", "Canva AI Hizli Rehber (PDF)", "Degerlendirme Testi (PDF)", "Oz Degerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakin zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/7" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bolum 7</Link>
          <Link href="/bolumler/9" className="rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition hover:bg-rose-700">Bolum 9 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
