import Link from "next/link";
import InteraktifQuiz from "@/components/InteraktifQuiz";

const quizSorulari = [
  {
    soru: "PictoBlox hangi programlama yaklaşımını kullanır?",
    secenekler: [
      "Metin tabanlı kodlama",
      "Blok tabanlı (sürükle-bırak) kodlama",
      "Komut satırı programlama",
      "Sadece Python",
    ],
    dogru: 1,
    aciklama: "PictoBlox, Scratch benzeri blok tabanlı bir arayüz sunar. Blokları sürükleyerek YZ projeleri oluşturabilirsiniz.",
  },
  {
    soru: "PictoBlox'ta bir görüntü sınıflandırma projesi için ilk yapılması gereken nedir?",
    secenekler: [
      "Kodu yazmak",
      "Modeli eğitmek (sınıflar oluşturup örnek toplamak)",
      "Sahneyi tasarlamak",
      "Ses kaydı yapmak",
    ],
    dogru: 1,
    aciklama: "Önce sınıflar oluşturulur ve her sınıf için örnekler toplanır. Model eğitildikten sonra kodlama yapılır.",
  },
  {
    soru: "Aşağıdakilerden hangisi PictoBlox'un YZ uzantısı DEĞİLDİR?",
    secenekler: [
      "Machine Learning",
      "Yüz Tanıma (Face Detection)",
      "Metin Sınıflandırma",
      "3D Modelleme",
    ],
    dogru: 3,
    aciklama: "PictoBlox'ta ML, yüz tanıma, metin sınıflandırma, ses tanıma gibi YZ uzantıları vardır ama 3D modelleme YZ uzantısı değildir.",
  },
  {
    soru: "Scratch'te bir YZ projesinde 'eğer ... ise' bloğu ne işe yarar?",
    secenekler: [
      "Programı durdurur",
      "Modelin tahmin sonucuna göre farklı işlemler yapar",
      "Sadece ses çalar",
      "İnternete bağlanır",
    ],
    dogru: 1,
    aciklama: "Koşul blokları, modelin tahmin sonucuna göre programın farklı davranışlar göstermesini sağlar.",
  },
  {
    soru: "ML for Kids platformunda Scratch ile YZ projesi yapmak için hangi adımlar izlenir?",
    secenekler: [
      "Proje oluştur > Eğitim verisi ekle > Model eğit > Scratch'te kullan",
      "Sadece Scratch'i aç ve kod yaz",
      "Sadece veri topla",
      "Sadece model eğit",
    ],
    dogru: 0,
    aciklama: "ML for Kids'te 4 adımlı bir süreç izlenir: proje oluşturma, veri ekleme, model eğitme ve Scratch'te kullanma.",
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
              <p className="text-sm font-medium text-blue-200">BÖLÜM 6 &middot; 7. Sınıf &middot; 8 ders saati</p>
              <h1 className="text-3xl font-extrabold">Blok Tabanlı YZ Kodlama</h1>
              <p className="text-blue-200">PictoBlox Projeleri</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <section className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
          <h2 className="mb-3 text-lg font-bold text-blue-700 dark:text-blue-300">Neler Öğreneceğiz?</h2>
          <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
            <li>PictoBlox ortamını tanıyacak ve YZ uzantılarını kullanacağız.</li>
            <li>Blok tabanlı kodlama ile görüntü sınıflandırma projesi yapacağız.</li>
            <li>ML for Kids ile Scratch&apos;te YZ projesi geliştireceğiz.</li>
            <li>Ses tanıma ve metin sınıflandırma projeleri deneyimleyeceğiz.</li>
            <li>Kendi YZ destekli oyunumuzu/uygulamamızı tasarlayacağız.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-2">
          {["PictoBlox", "Scratch", "ML for Kids", "blok kodlama", "görüntü sınıflandırma", "ses tanıma", "uzantı"].map((k) => (
            <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">1. PictoBlox Nedir?</h2>
          <p>
            PictoBlox, Scratch tabanlı bir kodlama ortamıdır ve özel YZ uzantıları
            içerir. Sürükle-bırak bloklarla yapay zeka projeleri geliştirmenizi sağlar.
            Ücretsiz indirilebilir ve web tarayıcısında da çalışır.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { ozellik: "Blok Kodlama", icon: "🧩", aciklama: "Scratch benzeri sürükle-bırak arayüz" },
              { ozellik: "YZ Uzantıları", icon: "🤖", aciklama: "ML, yüz tanıma, ses tanıma, NLP" },
              { ozellik: "Donanım Desteği", icon: "🔌", aciklama: "Arduino, Raspberry Pi bağlantısı" },
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
          <h2 className="text-2xl font-extrabold">2. PictoBlox ile Görüntü Sınıflandırma</h2>
          <p>Adım adım bir görüntü sınıflandırma projesi yapalım:</p>
          <div className="space-y-3">
            {[
              { adim: 1, baslik: "PictoBlox'u Aç", aciklama: "ai.thestempedia.com adresinden web sürümünü açın veya masaüstü uygulamayı indirin." },
              { adim: 2, baslik: "ML Uzantısını Ekle", aciklama: "Uzantılar bölümünden 'Machine Learning' uzantısını projeye ekleyin." },
              { adim: 3, baslik: "Sınıflar Oluştur", aciklama: "En az 2 sınıf oluşturun. Örnek: 'Taş', 'Kağıt', 'Makas'" },
              { adim: 4, baslik: "Örnekler Topla", aciklama: "Her sınıf için kamerayla en az 30 örnek görüntü kaydedin. Farklı açılardan çekin!" },
              { adim: 5, baslik: "Modeli Eğit", aciklama: "'Train Model' butonuna basın. Eğitim birkaç dakika sürebilir." },
              { adim: 6, baslik: "Kodlama Yap", aciklama: "'Eğer sınıf = Taş ise ... söyle' şeklinde koşullu bloklar ekleyin." },
              { adim: 7, baslik: "Test Et ve Geliştir", aciklama: "Projeyi çalıştırın, test edin. Hatalı sonuçlarda daha fazla örnek ekleyin." },
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
            ML for Kids, makine öğrenimi modellerini eğitip Scratch&apos;te
            kullanmanızı sağlayan ücretsiz bir platformdur.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Adım</th>
                  <th className="px-4 py-3 text-left">Yapılacak</th>
                  <th className="px-4 py-3 text-left">Detay</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1. Proje Oluştur", "Yeni proje > Tanımlama seçeneği", "Metin, görüntü veya sayı seçin"],
                  ["2. Eğitim Verisi", "Her sınıf için en az 10 örnek ekle", "Ne kadar çok örnek, o kadar iyi"],
                  ["3. Model Eğit", "Öğren ve test et butonuna bas", "Model örneklerden öğrenir"],
                  ["4. Scratch'te Kullan", "Scratch 3 ile aç", "ML blokları otomatik eklenir"],
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
              { proje: "Taş-Kağıt-Makas Oyunu", zorluk: "Başlangıç", aciklama: "Kamera ile el hareketlerini tanıyarak bilgisayara karşı oyna", icon: "✊" },
              { proje: "Duygu Tanıma Aynası", zorluk: "Orta", aciklama: "Yüz ifadelerini tanıyarak mutlu, üzgün, şaşkın tepkiler veren program", icon: "😊" },
              { proje: "Geri Dönüşüm Asistanı", zorluk: "Orta", aciklama: "Atıkları kamera ile tanıyarak doğru geri dönüşüm kutusunu gösteren sistem", icon: "♻️" },
              { proje: "Sesle Kontrol", zorluk: "İleri", aciklama: "Ses komutlarıyla (sağa git, sola git, dur) karakteri yönlendiren oyun", icon: "🎙️" },
            ].map((p) => (
              <div key={p.proje} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-bold">{p.proje}</h4>
                    <span className={`text-xs font-medium ${p.zorluk === "Başlangıç" ? "text-emerald-600" : p.zorluk === "Orta" ? "text-amber-600" : "text-rose-600"}`}>
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
              <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup çalışması</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Algoritma Şefi</h3>
            <p className="text-[var(--color-text-secondary)]">
              Bir yemek tarifini akış diyagramı olarak çizip, &quot;eğer ... ise&quot;
              koşullarını belirleyin. Örneğin: &quot;Eğer yumurta varsa omlet yap, yoksa
              tost yap.&quot; Bu akış diyagramını Scratch/PictoBlox bloklarına çevirmeyi deneyin.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">45 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 2: PictoBlox - Taş Kağıt Makas</h3>
            <p className="text-[var(--color-text-secondary)]">
              PictoBlox&apos;ta ML uzantısını kullanarak Taş-Kağıt-Makas oyunu yapın.
              3 sınıf oluşturun, her sınıf için 30+ örnek toplayın, modeli eğitin
              ve oyunu kodlayın.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
              <span className="text-sm text-[var(--color-text-secondary)]">40 dakika &middot; Bireysel</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Etkinlik 3: ML for Kids - Duygu Analizi</h3>
            <p className="text-[var(--color-text-secondary)]">
              ML for Kids&apos;te metin sınıflandırma projesi oluşturun. &quot;Mutlu&quot; ve
              &quot;Üzgün&quot; cümleleri ayıran bir model eğitin. Scratch&apos;te kullanıcının
              yazdığı cümleye göre karakterin yüz ifadesini değiştiren bir program yapın.
            </p>
          </div>
        </section>

        <InteraktifQuiz sorular={quizSorulari} />

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-2xl font-bold">İndirilebilir Materyaller</h2>
          <div className="space-y-3">
            {["Algoritma Şefi Akış Şablonu (PDF)", "PictoBlox Başlangıç Rehberi (PDF)", "ML for Kids Adım Adım Rehber (PDF)", "Değerlendirme Testi (PDF)", "Öz Değerlendirme Formu (PDF)"].map((d) => (
              <div key={d} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3">
                <span className="text-sm font-medium">{d}</span>
                <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Yakın zamanda</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between pt-6">
          <Link href="/bolumler/5" className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition hover:bg-[var(--color-bg-secondary)]">&larr; Bölüm 5</Link>
          <Link href="/bolumler/7" className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">Bölüm 7 &rarr;</Link>
        </div>
      </main>
    </div>
  );
}
