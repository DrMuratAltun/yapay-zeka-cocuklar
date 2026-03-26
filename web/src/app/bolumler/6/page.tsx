import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 6: Blok Tabanlı YZ Kodlama | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import AlgoritmaBulmacasi from "@/components/oyunlar/AlgoritmaBulmacasi";
import AlgoritmaSirala from "@/components/etkinlikler/AlgoritmaSirala";

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

/* ---- Slayt 1: Kazanımlar ---- */
const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
      <h3 className="mb-3 text-lg font-bold text-blue-700 dark:text-blue-300">Neler Öğreneceğiz?</h3>
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
  </>
);

/* ---- Slayt 2: PictoBlox Nedir? ---- */
const SlaytPictoBlox = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">1. PictoBlox Nedir?</h3>
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

      <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-900/20 dark:to-orange-900/20">
        <p className="font-medium">🤔 <strong>Biliyor Muydunuz?</strong> Scratch&apos;i dünya genelinde 100 milyondan fazla çocuk kullanıyor!</p>
      </div>
    </section>
  </>
);

/* ---- Slayt 3: Görüntü Sınıflandırma ---- */
const SlaytGoruntuSiniflandirma = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">2. PictoBlox ile Görüntü Sınıflandırma</h3>
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

      <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
        <p className="font-medium">💡 <strong>İpucu:</strong> Model eğitirken farklı açılardan, farklı ışık koşullarında fotoğraf çekin. Ne kadar çeşitli veri, o kadar başarılı model!</p>
      </div>
    </section>
  </>
);

/* ---- Slayt 4: ML for Kids + Scratch ---- */
const SlaytMLForKids = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">3. ML for Kids + Scratch</h3>
      <p>
        ML for Kids, makine öğrenimi modellerini eğitip Scratch&apos;te
        kullanmanızı sağlayan ücretsiz bir platformdur.
      </p>
      <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <Image src="/images/bolumler/scratch.png" alt="Scratch 3.0 blok tabanli kodlama arayuzu" width={550} height={400} className="rounded-lg object-cover shadow-md" />
        <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">Scratch 3.0: Blok tabanli kodlama ortami</p>
        <p className="text-xs text-[var(--color-text-secondary)] italic">Gorsel: Blink456, CC BY-SA 4.0</p>
      </div>

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

      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
        <p className="font-medium">⚠️ <strong>Dikkat:</strong> ML for Kids&apos;te model eğitmeden önce her sınıfa en az 10 örnek eklemeyi unutmayın. Yetersiz veri = düşük doğruluk!</p>
      </div>
    </section>
  </>
);

/* ---- Slayt 5: Proje Fikirleri ---- */
const SlaytProjeFikirleri = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">4. Proje Fikirleri</h3>
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
  </>
);

/* ---- Etkinlik 1: Algoritma Şefi ---- */
const SlaytEtkinlik1 = (
  <>
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

    <AlgoritmaSirala />
  </>
);

/* ---- Etkinlik 2: PictoBlox TKM ---- */
const SlaytEtkinlik2 = (
  <>
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
  </>
);

/* ---- Etkinlik 3: ML for Kids Duygu Analizi ---- */
const SlaytEtkinlik3 = (
  <>
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
  </>
);

/* ---- Slayt 5: Oyun ---- */
const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Algoritma Bulmacası</h2>
    <p className="text-[var(--color-text-secondary)]">
      Algoritma adımlarını doğru sıraya koy!
    </p>
    <AlgoritmaBulmacasi />
  </section>
);

/* ---- Slayt 6: Değerlendirme ---- */
const SlaytDegerlendirme = (
  <>
    <InteraktifQuiz sorular={quizSorulari} />
  </>
);

/* ---- Slayt 7: İndirilebilir Materyaller ---- */
const SlaytMateryaller = (
  <>
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <h3 className="mb-4 text-xl font-bold">İndirilebilir Materyaller</h3>
      <div className="space-y-3">
        {[
          { ad: "Algoritma Şefi Akış Şablonu", url: "/indirilebilir/bolum-06-algoritma-sefi-sablonu.html" },
          { ad: "PictoBlox Başlangıç Rehberi", url: "/indirilebilir/bolum-06-pictoblox-rehberi.html" },
          { ad: "ML for Kids Adım Adım Rehber", url: "/indirilebilir/bolum-06-ml-for-kids-rehberi.html" },
        ].map((dosya) => (
          <a
            key={dosya.ad}
            href={dosya.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-4 py-3 transition hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/10"
          >
            <span className="text-sm font-medium">{dosya.ad}</span>
            <span className="rounded bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              Yazdır / İndir
            </span>
          </a>
        ))}
      </div>
    </section>
  </>
);

export default function Bolum6() {
  return (
    <BolumSlider
      bolumNo={6}
      bolumBaslik="Blok Tabanlı YZ Kodlama"
      bolumAltBaslik="PictoBlox Projeleri"
      seviye="7. Sınıf"
      ders={8}
      renk="from-blue-600 to-indigo-700"
      oncekiBolum={5}
      sonrakiBolum={7}
      slaytlar={[
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "PictoBlox Nedir?", icon: "🧩", icerik: SlaytPictoBlox },
        { baslik: "Görüntü Sınıflandırma", icon: "📷", icerik: SlaytGoruntuSiniflandirma },
        { baslik: "ML for Kids + Scratch", icon: "🤖", icerik: SlaytMLForKids },
        { baslik: "Proje Fikirleri", icon: "💡", icerik: SlaytProjeFikirleri },
        { baslik: "Etkinlik: Algoritma Şefi", icon: "🎮", icerik: SlaytEtkinlik1 },
        { baslik: "Etkinlik: Taş Kağıt Makas", icon: "🎮", icerik: SlaytEtkinlik2 },
        { baslik: "Etkinlik: Duygu Analizi", icon: "🎮", icerik: SlaytEtkinlik3 },
        { baslik: "Algoritma Bulmacası", icon: "🧩", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
