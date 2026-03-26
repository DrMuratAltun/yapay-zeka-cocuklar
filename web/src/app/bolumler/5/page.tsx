import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bölüm 5: Üretken Yapay Zeka | Yapay Zeka Macerası",
};

import Image from "next/image";
import InteraktifQuiz from "@/components/InteraktifQuiz";
import BolumSlider from "@/components/BolumSlider";
import PromptUstasi from "@/components/oyunlar/PromptUstasi";
import PromptDeneme from "@/components/etkinlikler/PromptDeneme";
import EtikSenaryolar from "@/components/etkinlikler/EtikSenaryolar";

const quizSorulari = [
  {
    soru: "Üretken yapay zeka (Generative AI) ne yapar?",
    secenekler: [
      "Sadece var olan verileri analiz eder",
      "Yeni ve orijinal içerikler (metin, görüntü, ses) üretir",
      "Sadece arama motoru gibi çalışır",
      "Sadece matematik problemleri çözer",
    ],
    dogru: 1,
    aciklama: "Üretken YZ, eğitildiği verilerden öğrendiklerini kullanarak daha önce var olmayan yeni içerikler üretebilir.",
  },
  {
    soru: "ChatGPT, Gemini gibi araçlar hangi YZ teknolojisini kullanır?",
    secenekler: [
      "Gözetimli sınıflandırma",
      "Büyük dil modelleri (LLM)",
      "Bilgisayar görüsü",
      "Pekiştirmeli öğrenme",
    ],
    dogru: 1,
    aciklama: "Bu araçlar milyarlarca parametreye sahip büyük dil modelleri (Large Language Models) kullanır.",
  },
  {
    soru: "İyi bir prompt (istem) yazmak için aşağıdakilerden hangisi en önemlidir?",
    secenekler: [
      "Çok uzun ve karmaşık yazmak",
      "Açık, net ve bağlam içeren talimatlar vermek",
      "Sadece tek kelime yazmak",
      "Her zaman İngilizce yazmak",
    ],
    dogru: 1,
    aciklama: "İyi bir prompt; açık, net ve yeterli bağlam içerir. Ne istediğinizi ne kadar iyi anlatırsan, o kadar iyi sonuç alırsın.",
  },
  {
    soru: "YZ ile üretilen bir içeriği kendi ödeviniz gibi sunmak doğru mudur?",
    secenekler: [
      "Evet, çünkü YZ çok akıllı",
      "Hayır, bu etik değildir ve akademik dürüstlüğe aykırıdır",
      "Sadece küçük ödevlerde doğru",
      "Öğretmen fark etmezse sorun yok",
    ],
    dogru: 1,
    aciklama: "YZ'nin ürettiği içeriği kendinize ait gibi göstermek etik değildir. YZ bir yardımcı araçtır, işini senin yerine yapan değil.",
  },
  {
    soru: "Aşağıdakilerden hangisi üretken YZ ile YAPILAMAZ?",
    secenekler: [
      "Bir şiir yazmak",
      "Bir resim oluşturmak",
      "Gerçek dünya deneyimi yaşamak",
      "Kod yazmak",
    ],
    dogru: 2,
    aciklama: "YZ metin, görüntü, ses, kod üretebilir ama gerçek dünya deneyimi yaşamak (tatmak, koklamak, hissetmek) yapamaz!",
  },
];

/* ---- Slayt 1: Kazanımlar ---- */
const SlaytKazanimlar = (
  <>
    <section className="rounded-2xl border-l-4 border-pink-500 bg-pink-50 p-6 dark:bg-pink-900/20">
      <h3 className="mb-3 text-lg font-bold text-pink-700 dark:text-pink-300">Neler Öğreneceğiz?</h3>
      <ul className="ml-4 list-disc space-y-1 text-[var(--color-text-secondary)]">
        <li>Üretken yapay zeka kavramını ve temel çalışma prensibini anlayacağız.</li>
        <li>ChatGPT, Gemini gibi büyük dil modellerini (LLM) tanıyacağız.</li>
        <li>Etkili prompt (istem) yazma tekniklerini öğreneceğiz.</li>
        <li>YZ ile metin, görüntü ve ses üretme deneyimi kazanacağız.</li>
        <li>YZ kullanımında etik kuralları ve akademik dürüstlüğü tartışacağız.</li>
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      {["üretken YZ", "LLM", "prompt", "chatbot", "görüntü üretme", "halüsinasyon", "etik kullanım"].map((k) => (
        <span key={k} className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{k}</span>
      ))}
    </div>
  </>
);

/* ---- Slayt 2: Üretken YZ Nedir? ---- */
const SlaytUretkenYZ = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">1. Üretken YZ Nedir?</h3>
    <p>
      Üretken yapay zeka, daha önce var olmayan yeni içerikler üreten YZ sistemleridir.
      Metin yazabilir, resim çizebilir, müzik besteleyebilir, kod yazabilir ve
      daha fazlasını yapabilir!
    </p>
    <div className="mt-4 flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <Image src="/images/bolumler/robot.svg" alt="Dost canlisi yapay zeka robotu" width={280} height={280} className="rounded-lg object-cover shadow-md" />
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">Uretken yapay zeka: Yeni icerikler ureten akilli sistemler</p>
      <p className="text-xs text-[var(--color-text-secondary)] italic">Gorsel: CC BY-SA 4.0</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { tur: "Metin", icon: "📝", ornek: "ChatGPT, Gemini, Claude", aciklama: "Makale, şiir, kod, hikaye yazma" },
        { tur: "Görüntü", icon: "🎨", ornek: "DALL-E, Midjourney, Stable Diffusion", aciklama: "Fotoğrafik görüntü ve sanat üretme" },
        { tur: "Ses/Müzik", icon: "🎵", ornek: "Suno, Udio, ElevenLabs", aciklama: "Şarkı, seslendirme, ses klonlama" },
        { tur: "Video", icon: "🎬", ornek: "Sora, Runway", aciklama: "Kısa videolar ve animasyonlar" },
      ].map((t) => (
        <div key={t.tur} className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-center dark:border-pink-800 dark:bg-pink-900/20">
          <span className="text-3xl">{t.icon}</span>
          <h4 className="mt-2 font-bold">{t.tur}</h4>
          <p className="text-xs font-medium text-pink-600 dark:text-pink-400">{t.ornek}</p>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{t.aciklama}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-900/20 dark:to-orange-900/20">
      <p className="font-medium">🤔 <strong>Biliyor Muydunuz?</strong> ChatGPT, eğitimi sırasında internetteki milyarlarca kelimeyi okudu!</p>
    </div>
  </section>
);

/* ---- Slayt 3: Büyük Dil Modelleri (LLM) ---- */
const SlaytLLM = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">2. Büyük Dil Modelleri (LLM)</h3>
    <p>
      ChatGPT, Gemini, Claude gibi araçlar &quot;büyük dil modeli&quot; (Large Language Model)
      teknolojisini kullanır. Bu modeller milyarlarca metin örneğinden dil
      örüntüleri öğrenmiştir.
    </p>
    <div className="space-y-3">
      {[
        { baslik: "Nasıl Çalışır?", aciklama: "LLM, bir cümledeki her kelimeden sonra en muhtemel kelimeyi tahmin eder. Çok gelişmiş bir 'kelime tahmini' sistemidir.", icon: "⚙️" },
        { baslik: "Ne Bilir?", aciklama: "Eğitim verilerindeki bilgileri 'öğrenmiştir' ama gerçek anlamda anlamaz. Kalıpları ve örüntüleri kullanır.", icon: "📚" },
        { baslik: "Sınırı Ne?", aciklama: "Bazen yanlış bilgi üretebilir (halüsinasyon). Her zaman doğrulayın! Eğitim tarihinden sonraki olayları bilmez.", icon: "⚠️" },
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

    <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 p-4 dark:bg-sky-900/20">
      <p className="font-medium">💡 <strong>İpucu:</strong> LLM&apos;ler &quot;anlama&quot; değil &quot;örüntü eşleştirme&quot; yapar. Bu yüzden bazen çok ikna edici ama yanlış cevaplar verebilirler!</p>
    </div>
  </section>
);

/* ---- Slayt 4: Prompt Mühendisliği ---- */
const SlaytPrompt = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">3. Prompt Mühendisliği: YZ&apos;ye Nasıl Soru Sorulur?</h3>
    <p>
      Prompt (istem), YZ&apos;ye verdiğiniz talimattır. İyi bir prompt = iyi bir sonuç!
    </p>
    <div className="overflow-x-auto">
      <table className="w-full rounded-xl border border-[var(--color-border)] text-sm">
        <thead className="bg-pink-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Kötü Prompt ❌</th>
            <th className="px-4 py-3 text-left">İyi Prompt ✅</th>
            <th className="px-4 py-3 text-left">Neden?</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Bana bir şey yaz", "6. sınıf öğrencisi için yapay zeka hakkında 100 kelimelik bir paragraf yaz", "Konu, hedef kitle ve uzunluk belirtilmiş"],
            ["Çiz", "Uzayda yüzen bir astronot kedinin dijital resmi, karikatür tarzında", "Konu, stil ve detay verilmiş"],
            ["Matematik yap", "Bu denklemi adım adım çöz: 3x + 7 = 22", "Spesifik problem ve yöntem belirtilmiş"],
            ["Kod yaz", "Python ile 1'den 100'e kadar asal sayıları bulan bir program yaz, her adımı açıklayarak", "Dil, görev ve format belirtilmiş"],
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

    <div className="rounded-xl border-2 border-pink-300 bg-pink-50 p-5 dark:border-pink-700 dark:bg-pink-900/20">
      <h4 className="mb-3 font-bold text-pink-700 dark:text-pink-400">🔑 İyi Prompt Formülü</h4>
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        {[
          { eleman: "Rol", ornek: "Sen bir tarih öğretmenisin...", icon: "🎭" },
          { eleman: "Görev", ornek: "...6. sınıflar için bir ders notu yaz...", icon: "📋" },
          { eleman: "Bağlam", ornek: "...konu: Osmanlı Devleti'nin kuruluşu...", icon: "🌍" },
          { eleman: "Format", ornek: "...madde işareti ile, en fazla 200 kelime.", icon: "📐" },
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

    <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20">
      <p className="font-medium">⚠️ <strong>Dikkat:</strong> &quot;Harika bir prompt yaz&quot; demek yerine, ne istediğinizi adım adım tarif edin. YZ zihin okuyamaz!</p>
    </div>
  </section>
);

/* ---- Slayt 5: YZ Halüsinasyonu ---- */
const SlaytHalusinasyon = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">4. YZ Halüsinasyonu: Dikkat!</h3>
    <p>
      YZ bazen çok inandırıcı görünen ama tamamen yanlış bilgiler üretebilir.
      Buna &quot;halüsinasyon&quot; denir.
    </p>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-5 dark:border-rose-700 dark:bg-rose-900/20">
        <h4 className="mb-2 font-bold text-rose-700 dark:text-rose-400">⚠️ Halüsinasyon Örnekleri</h4>
        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li>&#8226; Var olmayan kitaplar/makaleler uydurma</li>
          <li>&#8226; Yanlış tarihler ve istatistikler verme</li>
          <li>&#8226; Olmayan kişiler hakkında bilgi üretme</li>
          <li>&#8226; Yanlış matematik sonuçları gösterme</li>
        </ul>
      </div>
      <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-900/20">
        <h4 className="mb-2 font-bold text-emerald-700 dark:text-emerald-400">✅ Nasıl Korunuruz?</h4>
        <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <li>&#8226; Her bilgiyi başka kaynaklardan doğrulayın</li>
          <li>&#8226; Kritik konularda tek kaynak olarak kullanmayın</li>
          <li>&#8226; &quot;Emin misin?&quot; diye sorun ve kaynak isteyin</li>
          <li>&#8226; Sağlık, hukuk gibi konularda uzmana danışın</li>
        </ul>
      </div>
    </div>
  </section>
);

/* ---- Slayt 6: Etik Kullanım ve Akademik Dürüstlük ---- */
const SlaytEtik = (
  <section className="space-y-4">
    <h3 className="text-2xl font-extrabold">5. Etik Kullanım ve Akademik Dürüstlük</h3>
    <p>
      YZ güçlü bir araçtır ama sorumlulukla kullanılmalıdır:
    </p>
    <div className="space-y-3">
      {[
        { kural: "YZ bir yardımcıdır, yerine geçen değil", aciklama: "Ödevi YZ'ye yaptırıp kendi ödevin gibi sunma. YZ'yi fikir üretme, düzeltme ve öğrenme aracı olarak kullan.", icon: "🤝" },
        { kural: "Kaynak belirt", aciklama: "YZ ile ürettiğin içeriği paylaşırken 'YZ desteği ile hazırlanmıştır' diye belirt.", icon: "📎" },
        { kural: "Doğrula", aciklama: "YZ'nin verdiği bilgileri mutlaka başka kaynaklardan kontrol et.", icon: "🔍" },
        { kural: "Kişisel bilgi paylaşma", aciklama: "YZ araçlarına kişisel bilgilerini (adres, telefon, TC kimlik no vb.) verme.", icon: "🔒" },
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
);

/* ---- Etkinlik 1: Prompt Düellosu ---- */
const SlaytEtkinlik1 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; İkili çalışma</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 1: Prompt Düellosu</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Prompt kartlarını çekin. Her kartta bir görev yazılıdır. İkili takımlar
        halinde aynı görev için farklı promptlar yazın. Hangi prompt daha iyi
        sonuç verir? Sınıfça oylayarak en iyi promptları seçin.
      </p>
      <div className="rounded-lg bg-pink-50 p-3 text-sm dark:bg-pink-900/20">
        <p className="font-medium text-pink-700 dark:text-pink-300">
          📋 Malzemeler: Prompt kartları, puanlama tablosu, kalem
        </p>
      </div>
    </div>

    <PromptDeneme />
  </>
);

/* ---- Etkinlik 2: ChatGPT / Gemini ile Tanışma ---- */
const SlaytEtkinlik2 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
        <span className="text-sm text-[var(--color-text-secondary)]">30 dakika &middot; Bireysel</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 2: ChatGPT / Gemini ile Tanışma</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Bir üretken YZ aracını açın. Aşağıdaki görevleri prompt formülünü kullanarak
        deneyin: (1) Kendinizi tanıtan bir paragraf yazdırın, (2) Bir şiir yazdırın,
        (3) Bir matematik problemi çözdürün, (4) Yanlış bilgi üretmesini sağlayıp
        halüsinasyonu tespit edin.
      </p>
    </div>
  </>
);

/* ---- Etkinlik 3: YZ ile Görüntü Üretme ---- */
const SlaytEtkinlik3 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white">BİLGİSAYARLI</span>
        <span className="text-sm text-[var(--color-text-secondary)]">25 dakika &middot; Bireysel</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 3: YZ ile Görüntü Üretme</h4>
      <p className="mb-4 text-[var(--color-text-secondary)]">
        Bir görüntü üretme aracını kullanın (Bing Image Creator, Canva AI vb.).
        Farklı prompt teknikleriyle aynı konuda 3 farklı görüntü üretin.
        Hangi prompt en iyi sonucu verdi? Neden?
      </p>
    </div>
  </>
);

/* ---- Etkinlik 4: YZ Etik Mahkemesi ---- */
const SlaytEtkinlik4 = (
  <>
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-bold text-white">UNPLUGGED</span>
        <span className="text-sm text-[var(--color-text-secondary)]">20 dakika &middot; Sınıf tartışması</span>
      </div>
      <h4 className="mb-2 text-xl font-bold">Etkinlik 4: YZ Etik Mahkemesi</h4>
      <p className="text-[var(--color-text-secondary)]">
        Senaryo kartlarındaki durumları okuyun. Her senaryo için &quot;Etik mi?&quot;
        sorusunu tartışarak sınıfça karar verin. Örnek: &quot;Bir öğrenci tüm ödevini
        ChatGPT&apos;ye yaptırdı ve kendi yazdım dedi. Doğru mu?&quot;
      </p>
    </div>

    <EtikSenaryolar />
  </>
);

/* ---- Slayt 5: İnteraktif Oyun ---- */
const SlaytOyun = (
  <section className="space-y-6">
    <h2 className="text-2xl font-bold">🎮 Prompt Ustası</h2>
    <p className="text-[var(--color-text-secondary)]">
      Kötü promptları iyileştirerek prompt mühendisliği becerini geliştir!
    </p>
    <PromptUstasi />
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
          { ad: "Prompt Düellosu Kart Seti", url: "/indirilebilir/bolum-05-prompt-duellosu-kartlari.html" },
          { ad: "Prompt Formülü Çalışma Yaprağı", url: "/indirilebilir/bolum-05-prompt-formulu-calisma-yapragi.html" },
          { ad: "Etik Senaryo Kartları", url: "/indirilebilir/bolum-05-etik-senaryo-kartlari.html" },
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

export default function Bolum5() {
  return (
    <BolumSlider
      bolumNo={5}
      bolumBaslik="Üretken Yapay Zeka"
      bolumAltBaslik="YZ Araçlarıyla Tanışın"
      seviye="6-7. Sınıf"
      ders={6}
      renk="from-pink-500 to-rose-600"
      oncekiBolum={4}
      sonrakiBolum={6}
      slaytlar={[
        { baslik: "Kazanımlar", icon: "🎯", icerik: SlaytKazanimlar },
        { baslik: "Üretken YZ Nedir?", icon: "📖", icerik: SlaytUretkenYZ },
        { baslik: "Büyük Dil Modelleri", icon: "🧠", icerik: SlaytLLM },
        { baslik: "Prompt Mühendisliği", icon: "📝", icerik: SlaytPrompt },
        { baslik: "YZ Halüsinasyonu", icon: "⚠️", icerik: SlaytHalusinasyon },
        { baslik: "Etik Kullanım", icon: "⚖️", icerik: SlaytEtik },
        { baslik: "Etkinlik: Prompt Düellosu", icon: "🎮", icerik: SlaytEtkinlik1 },
        { baslik: "Etkinlik: ChatGPT/Gemini", icon: "🎮", icerik: SlaytEtkinlik2 },
        { baslik: "Etkinlik: Görüntü Üretme", icon: "🎮", icerik: SlaytEtkinlik3 },
        { baslik: "Etkinlik: YZ Etik Mahkemesi", icon: "🎮", icerik: SlaytEtkinlik4 },
        { baslik: "İnteraktif Oyun", icon: "🕹️", icerik: SlaytOyun },
        { baslik: "Değerlendirme", icon: "📝", icerik: SlaytDegerlendirme },
        { baslik: "Materyaller", icon: "📥", icerik: SlaytMateryaller },
      ]}
    />
  );
}
