import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import YapayMiGercekMi from "@/components/oyunlar/YapayMiGercekMi";

const quizSorulari = [
  {
    soru: "YZ ile görüntü üretirken en önemli faktör nedir?",
    secenekler: [
      "En pahalı aracı kullanmak",
      "Açık ve detaylı prompt yazmak",
      "Sadece İngilizce yazmak",
      "Mümkün olduğunca kısa yazmak",
    ],
    dogru: 1,
    aciklama: "Görüntü üretme araçlarında detaylı ve açık prompt yazmak en iyi sonuçları almanızı sağlar.",
  },
  {
    soru: "YZ ile üretilen bir görüntüyü sosyal medyada paylaşırken ne yapmalısınız?",
    secenekler: [
      "Hiçbir şey belirtmeye gerek yok",
      "YZ ile üretildiğini belirtmek",
      "Kendi çizdiğinizi iddia etmek",
      "Başkasının çizdiğini söylemek",
    ],
    dogru: 1,
    aciklama: "Şeffaflık önemlidir. YZ ile üretilen içeriklerin kaynağını belirtmek etik bir sorumluluktur.",
  },
  {
    soru: "Canva AI hangi tür içerik üretiminde kullanılabilir?",
    secenekler: [
      "Sadece fotoğraf düzenleme",
      "Sunum, poster, sosyal medya görseli ve daha fazlası",
      "Sadece video düzenleme",
      "Sadece metin yazma",
    ],
    dogru: 1,
    aciklama: "Canva AI ile sunum, poster, sosyal medya görseli, infografik ve birçok farklı tasarım yapabilirsiniz.",
  },
  {
    soru: "YZ ile müzik üretirken telif hakkı konusunda hangisi doğrudur?",
    secenekler: [
      "YZ ile üretilen her müzik serbestçe kullanılabilir",
      "Her aracın kendi lisans kuralları vardır, kontrol edilmelidir",
      "YZ müziği hiç kullanılmamalıdır",
      "Telif hakkı sadece insanlar için geçerlidir",
    ],
    dogru: 1,
    aciklama: "Her YZ aracının farklı lisans kuralları vardır. Kullanmadan önce koşulları okumak önemlidir.",
  },
  {
    soru: "Bir dijital hikaye projesi için en uygun YZ araçları kombinasyonu hangisidir?",
    secenekler: [
      "Sadece ChatGPT",
      "Metin için LLM + görüntü için görüntü üretici + ses için TTS",
      "Sadece görüntü üretme aracı",
      "Sadece ses kayıt programı",
    ],
    dogru: 1,
    aciklama: "Dijital hikaye projesi birden fazla içerik türü gerektirir: metin, görüntü ve ses. Farklı YZ araçları bir arada kullanılır.",
  },
];

/* ---- Slayt 1: Kazanımlar ---- */
const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-rose-500 bg-rose-50 p-6 dark:bg-rose-900/20">
      <h3 className="mb-3 text-lg font-bold text-rose-700 dark:text-rose-300">Neler Öğreneceğiz?</h3>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>YZ ile görüntü, metin ve ses içerikleri üreteceğiz.</li>
        <li>Canva AI ile profesyonel tasarımlar yapacağız.</li>
        <li>Dijital hikaye anlatımı (digital storytelling) projesi geliştireceğiz.</li>
        <li>YZ ile üretilen içeriklerde telif hakkı ve etik konularını tartışacağız.</li>
        <li>Yaratıcı süreçte YZ&apos;yi yardımcı araç olarak kullanmayı öğreneceğiz.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["görüntü üretme", "Canva AI", "dijital hikaye", "telif hakkı", "yaratıcılık", "içerik üretimi"].map((k) => (
        <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
      ))}
    </div>
  </>
);

/* ---- Slayt 2: YZ ile Görüntü Üretme ---- */
const SlaytGoruntuUretme = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">1. YZ ile Görüntü Üretme</h3>
      <p>
        YZ görüntü üretme araçları, metin açıklamanızı (prompt) alıp fotoğrafik
        kalitede görüntüler oluşturabilir. Sanat, tasarım, eğitim ve eğlence
        alanlarında kullanılır.
      </p>
      <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <Image src="/images/bolumler/robot.svg" alt="Sevimli robot - YZ ile yaratıcı içerik üretimi" width={200} height={200} className="rounded-lg object-cover shadow-md" />
        <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">YZ, yaratıcılığınızı destekleyen güçlü bir araçtır</p>
        <p className="text-xs text-[var(--color-text-secondary)] italic">Giacomo Alessandroni, CC BY-SA 4.0</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { arac: "Bing Image Creator", ozellik: "Ücretsiz, DALL-E tabanlı", uygunluk: "Öğrenciler için uygun", icon: "🖼️" },
          { arac: "Canva AI (Magic Media)", ozellik: "Tasarım içinde görüntü üretme", uygunluk: "Eğitim hesabı ile ücretsiz", icon: "🎨" },
          { arac: "Leonardo AI", ozellik: "Detaylı görüntü kontrolleri", uygunluk: "Ücretsiz sınırlı kullanım", icon: "🎭" },
          { arac: "Stable Diffusion", ozellik: "Açık kaynak, yerel çalışabilir", uygunluk: "İleri seviye", icon: "⚡" },
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
  </>
);

/* ---- Slayt 3: Prompt Teknikleri ---- */
const SlaytPromptTeknikleri = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">2. Görüntü Prompt Teknikleri</h3>
      <div className="space-y-3">
        {[
          { teknik: "Konu + Stil", ornek: "Uzayda yüzen bir astronot kedi, sulu boya tarzında", sonuc: "Temeli belirler" },
          { teknik: "Detay Ekleme", ornek: "... yıldızlı bir arka plana, parlak renklerle, 4K kalitede", sonuc: "Kaliteyi artırır" },
          { teknik: "Negatif Prompt", ornek: "Bulanık değil, karikatür değil, metin içermeyen", sonuc: "İstenmeyen sonuçları önler" },
          { teknik: "Referans Verme", ornek: "... Studio Ghibli tarzında, Monet'in boya darbeleriyle", sonuc: "Belirli tarza yönlendirir" },
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
  </>
);

/* ---- Slayt 4: Canva AI ile Tasarım ---- */
const SlaytCanvaAI = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">3. Canva AI ile Tasarım</h3>
      <p>Canva, YZ destekli tasarım araçlarıyla profesyonel görünüm elde etmenizi sağlar:</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { ozellik: "Magic Design", aciklama: "İçeriğinize göre otomatik şablon önerisi", icon: "✨" },
          { ozellik: "Magic Media", aciklama: "Metin açıklamasıyla görüntü üretme", icon: "🖼️" },
          { ozellik: "Magic Write", aciklama: "Metin içeriği oluşturma ve düzenleme", icon: "📝" },
          { ozellik: "Magic Eraser", aciklama: "Fotoğraflardan istenmeyen nesneleri silme", icon: "🧹" },
          { ozellik: "Magic Animate", aciklama: "Tasarımlara tek tıkla animasyon ekleme", icon: "🎬" },
          { ozellik: "Translate", aciklama: "Tasarımları otomatik farklı dillere çevirme", icon: "🌐" },
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
  </>
);

/* ---- Slayt 5: Dijital Hikaye Anlatımı ---- */
const SlaytDijitalHikaye = (
  <>
    <section className="space-y-4">
      <h3 className="text-2xl font-extrabold">4. Dijital Hikaye Anlatımı</h3>
      <p>YZ araçlarıyla multimedya bir dijital hikaye oluşturma adımları:</p>
      <div className="space-y-3">
        {[
          { adim: 1, baslik: "Hikaye Yazımı", aciklama: "ChatGPT/Gemini ile hikaye taslağı oluştur, kendin düzenle ve kişiselleştir", arac: "LLM" },
          { adim: 2, baslik: "Görsel Tasarım", aciklama: "Her sahne için görüntü üret veya Canva'da illüstrasyonlar tasarla", arac: "Görüntü üretme + Canva" },
          { adim: 3, baslik: "Seslendirme", aciklama: "Hikayeyi kendi sesinle kaydet veya TTS aracı kullan", arac: "Ses kayıt / TTS" },
          { adim: 4, baslik: "Birleştirme", aciklama: "Tüm öğeleri Canva sunumunda veya video düzenleyicide birleştir", arac: "Canva / CapCut" },
          { adim: 5, baslik: "Paylaşım", aciklama: "Dijital hikayeni sınıfla paylaş, geri bildirim al", arac: "Sunum" },
        ].map((a) => (
          <div key={a.adim} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 font-bold text-white">{a.adim}</span>
            <div>
              <h4 className="font-bold">{a.baslik}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{a.aciklama}</p>
              <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Araç: {a.arac}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-900/20">
      <h3 className="mb-2 font-bold text-amber-700 dark:text-amber-400">Telif Hakkı ve Etik</h3>
      <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
        <li>&#8226; YZ ile üretilen içeriklerin telif hakkı konusu hâlâ tartışmalıdır.</li>
        <li>&#8226; Her aracın kendi kullanım koşulları vardır, mutlaka okuyun.</li>
        <li>&#8226; YZ ile üretilen içeriği paylaşırken &quot;YZ destekli&quot; belirtmeniz iyi bir uygulamadır.</li>
        <li>&#8226; Gerçek sanatçıların eserlerini taklit etmek için YZ kullanmaktan kaçının.</li>
      </ul>
    </div>
  </>
);

/* ---- Slayt 4: Etkinlikler ---- */
const SlaytEtkinlikler = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Grup tartışması</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 1: Yapay mı Gerçek mi?</h3>
      <p className="text-[var(--color-text-secondary)]">
        10 tane görüntü inceleyin: 5&apos;i YZ ile üretilmiş, 5&apos;i gerçek fotoğraf.
        Hangileri yapay, hangileri gerçek? Nasıl anladınız? YZ görüntülerini ayırt
        etmenin ipuçlarını tartışın.
      </p>
    </div>

    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
        <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 2: YZ Poster Tasarımı</h3>
      <p className="text-[var(--color-text-secondary)]">
        Canva AI kullanarak okul etkinliğiniz için bir poster tasarlayın. Magic Media
        ile özel görseller, Magic Write ile etkileyici başlıklar üretin. Sonucu sınıfla
        paylaşın.
      </p>
    </div>

    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">PROJE</span>
        <span className="text-sm text-[var(--color-text-secondary)]">2 ders saati &middot; Bireysel veya ikili</span>
      </div>
      <h3 className="mb-2 text-xl font-bold">Etkinlik 3: Dijital Hikaye Projesi</h3>
      <p className="text-[var(--color-text-secondary)]">
        5 sahnelik bir dijital hikaye oluşturun. Hikayeyi YZ ile yazın (kendiniz
        düzenleyin), her sahne için görsel üretin, seslendirin ve Canva sunumunda
        birleştirin. Sınıfta canlı sunun.
      </p>
    </div>
  </>
);

/* ---- Slayt 5: Oyun ---- */
const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Yapay mı Gerçek mi?</h2>
    <p className="text-[var(--color-text-secondary)]">
      İçeriklerin yapay zeka tarafından mı yoksa insan tarafından mı üretildiğini tahmin et!
    </p>
    <YapayMiGercekMi />
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
          { ad: "Yapay mı Gerçek mi? Kart Seti", url: "/indirilebilir/bolum-08-yapay-mi-gercek-mi-kartlari.html" },
          { ad: "Dijital Hikaye Planlama Şablonu", url: "/indirilebilir/bolum-08-dijital-hikaye-planlama.html" },
          { ad: "Canva AI Hızlı Rehber", url: "/indirilebilir/bolum-08-canva-ai-rehberi.html" },
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

export default function Bolum8() {
  return (
    <BolumSlider
      bolumNo={8}
      bolumBaslik="Dijital İçerik Üretimi"
      bolumAltBaslik="YZ ile Yaratıcılık"
      seviye="7-8. Sınıf"
      ders={6}
      renk="from-rose-500 to-pink-600"
      oncekiBolum={7}
      sonrakiBolum={9}
      slaytlar={[
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "YZ ile Görüntü Üretme", icon: "🖼️", icerik: SlaytGoruntuUretme },
        { baslik: "Prompt Teknikleri", icon: "✍️", icerik: SlaytPromptTeknikleri },
        { baslik: "Canva AI ile Tasarım", icon: "🎨", icerik: SlaytCanvaAI },
        { baslik: "Dijital Hikaye Anlatımı", icon: "📖", icerik: SlaytDijitalHikaye },
        { baslik: "Etkinlikler", icon: "🎮", icerik: SlaytEtkinlikler },
        { baslik: "Yapay mı Gerçek mi?", icon: "🧩", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
