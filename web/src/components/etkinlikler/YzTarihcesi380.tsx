"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./YzTarihcesi380.module.css";

type EraKey = "foundations" | "birth" | "winter" | "breakthrough" | "modern";

interface Era {
  key: EraKey;
  label: string;
  range: string;
  color: string;
  bg: string;
  description: string;
}

interface YzEvent {
  id: string;
  year: number;
  era: EraKey;
  title: string;
  who: string;
  whoFlag: string;
  short: string;
  long: string;
  didYouKnow?: string;
  icon: string;
  turkish?: boolean;
}

interface Quiz {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

const ERAS: Record<EraKey, Era> = {
  foundations: {
    key: "foundations", label: "Temeller", range: "1600 – 1940",
    color: "#8b5cf6", bg: "#f3efff",
    description: "Düşünen makine fikrinin ilk tohumları. Matematik ve mantık insanlığa düşünmenin dilini öğretiyor.",
  },
  birth: {
    key: "birth", label: "Doğuş", range: "1943 – 1970",
    color: "#ec4899", bg: "#fdf0f8",
    description: "Bilgisayarlar gerçek oluyor, sinir ağları ilk kez önerildi, 'Yapay Zeka' terimi konuşulmaya başladı.",
  },
  winter: {
    key: "winter", label: "Kış", range: "1974 – 1993",
    color: "#64748b", bg: "#eef2f7",
    description: "Beklentiler hayal kırıklığına uğradı. Devletler parayı kesti. Ama araştırma hiç durmadı.",
  },
  breakthrough: {
    key: "breakthrough", label: "Atılım", range: "1997 – 2011",
    color: "#f59e0b", bg: "#fff6e5",
    description: "Makineler dünyada en iyi insanları yenmeye başlıyor. Satranç, Jeopardy, sonra Go.",
  },
  modern: {
    key: "modern", label: "Modern Çağ", range: "2012 – bugün",
    color: "#10b981", bg: "#e7f8ef",
    description: "Derin öğrenme devrimi. ChatGPT herkesin cebinde. YZ artık günlük hayatımızın bir parçası.",
  },
};

const EVENTS: YzEvent[] = [
  { id: "pascaline", year: 1642, era: "foundations", title: "Pascaline – Hesap Makinesi", who: "Blaise Pascal", whoFlag: "🇫🇷", short: "Dünyanın ilk mekanik hesap makinesi.", long: "19 yaşındaki Pascal, babasının vergi hesaplarıyla uğraşmasına dayanamadı ve dişlilerle çalışan bir makine yaptı. Bu, insanların 'makine düşünebilir mi?' sorusunu sormasına yol açan ilk adımdır.", didYouKnow: "Pascal, bu icadı yaptığında sadece 19 yaşındaydı.", icon: "🧮" },
  { id: "babbage", year: 1843, era: "foundations", title: "İlk Bilgisayar Programı", who: "Ada Lovelace", whoFlag: "🇬🇧", short: "Tarihin ilk programcısı bir kadındı.", long: "Ada Lovelace, Charles Babbage'ın tasarladığı 'Analitik Motor' için notlar yazdı. Bu notlar, tarihte yazılmış ilk bilgisayar programı sayılır. Üstelik Ada, makinelerin bir gün müzik bile besteleyebileceğini söylemişti.", didYouKnow: "Ada, şair Lord Byron'ın kızıydı ve matematikçi bir annesi vardı.", icon: "👩‍💻" },
  { id: "turing_test", year: 1950, era: "birth", title: "Turing Testi", who: "Alan Turing", whoFlag: "🇬🇧", short: "'Makineler düşünebilir mi?' sorusunun ünlü cevabı.", long: "Turing, bir makinenin insan kadar akıllı olup olmadığını anlamak için bir test önerdi: Eğer bir insanla yazışırken karşıdakinin makine mi insan mı olduğunu ayırt edemezsen, o makine 'düşünüyor' sayılır. Bu fikir YZ'nin temel sorusuna dönüştü.", didYouKnow: "Turing ayrıca 2. Dünya Savaşı'nda Alman Enigma şifrelerini kırarak milyonlarca hayat kurtardı.", icon: "🧠" },
  { id: "dartmouth", year: 1956, era: "birth", title: "'Yapay Zeka' Terimi Doğuyor", who: "Dartmouth Konferansı", whoFlag: "🇺🇸", short: "YZ isminin ilk kez kullanıldığı yaz kampı.", long: "John McCarthy'nin öncülüğünde düzenlenen bu konferansta 'Artificial Intelligence' terimi ilk defa resmi olarak kullanıldı. 10 bilim insanı, bir yaz boyu 'makinelere nasıl zeka kazandırılır?' sorusuna cevap arayacaktı. 70 yıl sonra hâlâ arıyoruz.", didYouKnow: "Organizatörler 'iki ay yeter' demişti. Hâlâ çözemedik!", icon: "✨" },
  { id: "cahit_arf", year: 1959, era: "birth", title: "Cahit Arf'ın Öncü Konferansı", who: "Cahit Arf", whoFlag: "🇹🇷", turkish: true, short: "'Makine düşünebilir mi ve nasıl düşünebilir?'", long: "Türk matematikçi Cahit Arf, Erzurum Atatürk Üniversitesi'nde verdiği bu konferansta makinelerin düşünme kapasitesi üzerine çarpıcı bir sunum yaptı. Dünyada YZ yeni yeni tartışılırken, Türkiye'den bu konuya bakış inanılmaz erken ve derindi.", didYouKnow: "Cahit Arf'ın adı şu anda 10 TL banknotunun üzerinde.", icon: "🎓" },
  { id: "eliza", year: 1966, era: "birth", title: "ELIZA – İlk Sohbet Botu", who: "Joseph Weizenbaum", whoFlag: "🇺🇸", short: "Terapist taklidi yapan basit ama etkili program.", long: "ELIZA, psikoterapist gibi cevaplar veren bir programdı. Aslında sadece karşısındakinin cümlelerini soruya çeviriyordu ('Üzgünüm' → 'Neden üzgünsün?'), ama insanlar ona gerçek bir insan gibi içini döküyordu. Bunu yaratan bilim insanı bile şaşırmıştı.", didYouKnow: "ELIZA'nın gizli adı 'DOCTOR' idi. Bugünkü ChatGPT'nin büyük büyük babası sayılabilir.", icon: "💬" },
  { id: "winter_1", year: 1974, era: "winter", title: "Birinci YZ Kışı", who: "Lighthill Raporu", whoFlag: "🇬🇧", short: "Büyük hayal kırıklığı: para kesildi.", long: "Araştırmacılar 'bir kaç yıla insan zekasına ulaşırız' demişti. Olmadı. İngiliz hükümeti bir rapor yazdırdı ve YZ fonlarını kesti. Diğer ülkeler de arkasından geldi. YZ 'soğuğa' girdi. Ama sessizce araştırma devam etti.", didYouKnow: "Buna 'YZ Kışı' denmesinin sebebi, nükleer kış benzetmesiydi.", icon: "❄️" },
  { id: "deep_blue", year: 1997, era: "breakthrough", title: "Deep Blue, Kasparov'u Yendi", who: "IBM", whoFlag: "🇺🇸", short: "Satrançta bir makine dünya şampiyonunu yendi.", long: "IBM'in Deep Blue bilgisayarı, satrançta dünya şampiyonu Garry Kasparov'u 6 maçlık serinin sonunda yendi. Bu, makinelerin artık bazı alanlarda insanlardan daha iyi olabileceğinin ilk büyük kanıtıydı. Kasparov şok olmuştu.", didYouKnow: "Deep Blue saniyede 200 milyon satranç hamlesi hesaplayabiliyordu.", icon: "♟️" },
  { id: "roomba", year: 2002, era: "breakthrough", title: "Roomba – Evlere YZ Girdi", who: "iRobot", whoFlag: "🇺🇸", short: "Robot süpürge milyonlarca evde.", long: "Roomba, sıradan bir eve giren ilk akıllı robot oldu. Duvarlara çarpıyor, toz topluyordu ama kendi başına karar veriyordu. Artık YZ laboratuvardan çıkıp günlük hayata adım atmıştı.", didYouKnow: "Kediler Roomba'yı çok sever, üzerine oturup evi turlarlar.", icon: "🤖" },
  { id: "watson", year: 2011, era: "breakthrough", title: "Watson, Jeopardy'yi Kazandı", who: "IBM", whoFlag: "🇺🇸", short: "Bir bilgisayar kelime oyununda şampiyon oldu.", long: "Amerika'nın ünlü bilgi yarışması Jeopardy'de IBM'in Watson'ı iki efsane oyuncuyu yendi. Önemli olan sadece bilgi değildi; makine espiri, kelime oyunu ve ipucu çözme konusunda da başarılıydı. Dil artık makinelerin dünyasıydı.", didYouKnow: "Watson, soruları duymuyordu — yazı olarak alıyordu. Yine de insanlardan hızlı cevaplıyordu.", icon: "📺" },
  { id: "deep_learning", year: 2012, era: "modern", title: "Derin Öğrenme Devrimi", who: "Geoffrey Hinton & AlexNet", whoFlag: "🇨🇦", short: "Bilgisayarlar artık 'görebiliyor'.", long: "AlexNet adlı sinir ağı, görüntü tanıma yarışmasında rekibi paramparça etti. Bu, modern YZ'nin gerçek başlangıcıdır. Artık makineler kedi ile köpeği, trafik işaretlerini, yüzleri ayırt edebiliyordu. Bütün büyük teknoloji şirketleri bu alana yatırım yağdırmaya başladı.", didYouKnow: "Hinton'a 'derin öğrenmenin babası' denir ve 2024'te Nobel Fizik Ödülü'nü kazandı.", icon: "👁️" },
  { id: "alphago", year: 2016, era: "modern", title: "AlphaGo, Go Şampiyonunu Yendi", who: "DeepMind", whoFlag: "🇬🇧", short: "Satrançtan çok daha zor bir oyunda zafer.", long: "Go, satrançtan milyarlarca kat karmaşık bir Asya oyunudur. Uzmanlar 'daha 10 yıl sürer' demişti. DeepMind'ın AlphaGo'su dünya şampiyonu Lee Sedol'u 4-1 yendi. 37. hamle öyle garipti ki dünyada kimse anlamadı — ama kazanan hamleydi.", didYouKnow: "O tuhaf 37. hamleden sonra Go profesyonelleri kendi oyunlarını baştan öğrenmeye başladı.", icon: "⚫" },
  { id: "transformer", year: 2017, era: "modern", title: "Transformer Mimarisi", who: "Google", whoFlag: "🇺🇸", short: "'Attention Is All You Need' – her şeyi değiştiren makale.", long: "Google'daki araştırmacılar, dili anlamak için yeni bir yapı önerdi: Transformer. Bu tek makale bugünkü ChatGPT, Claude ve diğer bütün büyük dil modellerinin temelidir. Adındaki 'GPT' zaten 'Generative Pre-trained Transformer' demek.", didYouKnow: "Makalenin başlığı bir şarkı referansıdır: 'All You Need Is Love'.", icon: "🔤" },
  { id: "chatgpt", year: 2022, era: "modern", title: "ChatGPT Herkese Açıldı", who: "OpenAI", whoFlag: "🇺🇸", short: "5 günde 1 milyon kullanıcı.", long: "30 Kasım 2022'de OpenAI, ChatGPT'yi ücretsiz kullanıma açtı. 5 günde 1 milyon, 2 ayda 100 milyon kullanıcıya ulaştı — tarihin en hızlı büyüyen ürünü. Ödev yapan öğrenci, rapor yazan iş insanı, kod yazan programcı… herkes aniden bir YZ asistanıyla konuşuyordu.", didYouKnow: "Instagram'ın 100 milyon kullanıcıya ulaşması 2.5 yıl almıştı. ChatGPT 2 ayda başardı.", icon: "💫" },
  { id: "bugun", year: 2025, era: "modern", title: "Ve Şimdi... Senin Sıran", who: "Sen & Yeni Nesil", whoFlag: "🌍", short: "YZ artık cebimizde, sınıfta, her yerde.", long: "YZ bugün video üretiyor, hastalık teşhis ediyor, roman yazıyor, müzik besteleyor. Ama asıl soru şu: Sen bu teknolojiyle ne yapacaksın? Sıradaki devrim, belki de senin elinle olacak. Bu listeye adını yazacak mısın?", didYouKnow: "Bu yazı bile bir YZ'nin yardımıyla yazıldı. Tanıdık geldi mi?", icon: "🚀" },
];

const QUIZZES: Record<string, Quiz> = {
  pascaline: { q: "Pascal bu makineyi kaç yaşındayken yaptı?", options: ["15", "19", "28", "42"], correct: 1, explain: "19! Babasının vergi işlerine yardım etmek için yaptı." },
  babbage: { q: "Tarihin ilk bilgisayar programcısı kimdi?", options: ["Alan Turing", "Ada Lovelace", "Charles Babbage", "John McCarthy"], correct: 1, explain: "Ada Lovelace — 1843'te Analitik Motor için program yazdı." },
  turing_test: { q: "Turing Testi ne ölçer?", options: ["Makinenin hızını", "Makinenin hafızasını", "Makinenin insan gibi davranıp davranamadığını", "Makinenin satranç becerisini"], correct: 2, explain: "Eğer insan, karşıdakinin makine olduğunu anlayamıyorsa test geçilmiş sayılır." },
  dartmouth: { q: "'Artificial Intelligence' terimi ilk ne zaman kullanıldı?", options: ["1943", "1956", "1974", "1997"], correct: 1, explain: "1956 Dartmouth Konferansı'nda John McCarthy tarafından." },
  cahit_arf: { q: "Cahit Arf'ın ünlü konferansı hangi şehirde yapıldı?", options: ["İstanbul", "Ankara", "Erzurum", "İzmir"], correct: 2, explain: "Erzurum Atatürk Üniversitesi'nde — 1959'da." },
  eliza: { q: "ELIZA hangi mesleği taklit ediyordu?", options: ["Öğretmen", "Psikoterapist", "Doktor", "Avukat"], correct: 1, explain: "Psikoterapist. İçinizi döktüğünüzde sizi sorularla yönlendiriyordu." },
  winter_1: { q: "'YZ Kışı' ne anlama gelir?", options: ["Soğukta çalışan robotlar", "Araştırma fonlarının kesildiği dönem", "Bilgisayarların donduğu bir hata", "Kış aylarında YZ kullanımı"], correct: 1, explain: "Beklentiler karşılanamayınca paralar kesildi, araştırma yavaşladı." },
  deep_blue: { q: "Deep Blue saniyede kaç satranç hamlesi hesaplayabiliyordu?", options: ["200", "20 bin", "2 milyon", "200 milyon"], correct: 3, explain: "200 milyon! İnsan beyninin yapamayacağı bir hız." },
  roomba: { q: "Roomba ilk çıktığında hangi iş için tasarlanmıştı?", options: ["Bulaşık yıkamak", "Yerleri süpürmek", "Çimleri biçmek", "Kedileri gezdirmek"], correct: 1, explain: "Süpürme! Ama kediler üzerine oturmayı daha çok sevdi." },
  watson: { q: "Watson hangi yarışmada şampiyon oldu?", options: ["Satranç", "Go", "Jeopardy", "Mastermind"], correct: 2, explain: "Jeopardy — bilgi ve kelime oyunu yarışması." },
  deep_learning: { q: "2012'deki AlexNet atılımı ne hakkındaydı?", options: ["Metin üretimi", "Görüntü tanıma", "Ses tanıma", "Satranç"], correct: 1, explain: "Görüntü tanıma — ve sonuçlar yarışmayı altüst etti." },
  alphago: { q: "AlphaGo hangi oyunda şampiyon oldu?", options: ["Satranç", "Go", "Dama", "Briç"], correct: 1, explain: "Go — satrançtan kat kat karmaşık bir Asya oyunu." },
  transformer: { q: "'GPT'nin 'T'si ne demek?", options: ["Text", "Transformer", "Translator", "Turing"], correct: 1, explain: "Transformer — 2017'de Google'ın önerdiği mimari." },
  chatgpt: { q: "ChatGPT 1 milyon kullanıcıya kaç günde ulaştı?", options: ["5 gün", "5 hafta", "5 ay", "5 yıl"], correct: 0, explain: "5 gün! Tarihin en hızlı büyüyen ürünü." },
  bugun: { q: "Şimdi YZ ile ne yapmak istersin?", options: ["Öğrenmek", "Yaratmak", "Keşfetmek", "Hepsi"], correct: 3, explain: "Hepsi doğru cevap! Yolculuk yeni başlıyor." },
};

const STORAGE_KEY = "yz_tarihcesi_380_v1";

interface PersistedState {
  idx: number;
  completed: string[];
  quizzesDone: string[];
  score: number;
}

type EraVars = CSSProperties & { "--era-color"?: string; "--era-bg"?: string };

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export default function YzTarihcesi380() {
  const [idx, setIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [quizzesDone, setQuizzesDone] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Partial<PersistedState>;
        if (typeof data.idx === "number") setIdx(Math.max(0, Math.min(data.idx, EVENTS.length - 1)));
        if (Array.isArray(data.completed)) setCompleted(new Set(data.completed));
        if (Array.isArray(data.quizzesDone)) setQuizzesDone(new Set(data.quizzesDone));
        if (typeof data.score === "number") setScore(data.score);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const data: PersistedState = {
      idx,
      completed: Array.from(completed),
      quizzesDone: Array.from(quizzesDone),
      score,
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [hydrated, idx, completed, quizzesDone, score]);

  useEffect(() => {
    setCompleted((prev) => {
      const id = EVENTS[idx].id;
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, [idx]);

  const currentEvent = EVENTS[idx];
  const currentEra = ERAS[currentEvent.era];
  const currentQuiz = QUIZZES[currentEvent.id];
  const hasDoneQuiz = quizzesDone.has(currentEvent.id);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= EVENTS.length) return;
    setIdx(i);
    setShowQuiz(false);
  }, []);
  const goNext = useCallback(() => goTo(idx + 1), [goTo, idx]);
  const goPrev = useCallback(() => goTo(idx - 1), [goTo, idx]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (idx < EVENTS.length - 1) goNext();
      else setPlaying(false);
    }, 5000);
    return () => clearTimeout(t);
  }, [playing, idx, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const handleQuizAnswer = (correct: boolean) => {
    setQuizzesDone((prev) => {
      const next = new Set(prev);
      next.add(currentEvent.id);
      return next;
    });
    if (correct) setScore((s) => s + 1);
    setShowQuiz(false);
    goNext();
  };

  const handleReset = () => {
    if (!confirm("İlerlemeni sıfırlamak istediğine emin misin?")) return;
    setIdx(0);
    setCompleted(new Set());
    setQuizzesDone(new Set());
    setScore(0);
    setShowQuiz(false);
    setPlaying(false);
  };

  const totalCompleted = completed.size;
  const totalQuizzes = quizzesDone.size;
  const totalEvents = EVENTS.length;

  return (
    <div className={styles.root}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.brandMark}><span>YZ</span></div>
            <div className={styles.brandText}>
              <div className={styles.brandTitle}>Yapay Zekânın 380 Yıllık Hikayesi</div>
              <div className={styles.brandSub}>Zaman makinesine hoş geldin</div>
            </div>
          </div>
          <div className={styles.topbarStats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                {totalCompleted}<span className={styles.statSub}>/{totalEvents}</span>
              </div>
              <div className={styles.statLabel}>Keşfedildi</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                {score}<span className={styles.statSub}>/{totalQuizzes || 0}</span>
              </div>
              <div className={styles.statLabel}>Quiz</div>
            </div>
            <button className={styles.iconBtn} title="Sıfırla" onClick={handleReset} aria-label="Sıfırla">↺</button>
          </div>
        </div>
        <div className={styles.topbarProgress}>
          <div className={styles.topbarProgressFill} style={{ width: `${(totalCompleted / totalEvents) * 100}%` }} />
        </div>
      </header>

      <div className={styles.controls}>
        <button className={cx(styles.btn, styles.btnPlay, playing && styles.playing)} onClick={() => setPlaying((p) => !p)}>
          {playing ? <><span className={styles.playIcon}>❚❚</span> Duraklat</> : <><span className={styles.playIcon}>▶</span> Oynat</>}
        </button>
        <button className={cx(styles.btn, styles.btnGhost)} onClick={() => goTo(0)}>⏮ Baştan</button>
        <div className={styles.navHint}>
          <kbd>←</kbd> <kbd>→</kbd> ile gez
        </div>
        <div className={styles.spacer} />
        <div className={styles.stepCount}>
          Olay <strong>{idx + 1}</strong> / {totalEvents}
        </div>
      </div>

      <Timeline events={EVENTS} eras={ERAS} currentIdx={idx} onSelect={goTo} completed={completed} />

      <div className={styles.stage}>
        {showQuiz && currentQuiz ? (
          <QuizCard
            quiz={currentQuiz}
            era={currentEra}
            onAnswer={handleQuizAnswer}
            onSkip={() => { setShowQuiz(false); goNext(); }}
          />
        ) : (
          <EventDetail
            event={currentEvent}
            era={currentEra}
            index={idx}
            total={totalEvents}
            onPrev={goPrev}
            onNext={goNext}
            onQuiz={() => setShowQuiz(true)}
            hasQuiz={!!currentQuiz && !hasDoneQuiz}
          />
        )}

        {idx === totalEvents - 1 && totalCompleted === totalEvents && (
          <div className={styles.finale}>
            <div className={styles.finaleEmoji}>🏆</div>
            <div className={styles.finaleTitle}>Yolculuğu tamamladın!</div>
            <div className={styles.finaleSub}>
              YZ&apos;nin 380 yıllık hikayesini öğrendin. Quiz sonucun:
              <strong> {score}/{totalQuizzes}</strong>
            </div>
            <button className={cx(styles.btn, styles.btnPrimary)} onClick={() => goTo(0)}>Baştan başla</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Timeline({
  events, eras, currentIdx, onSelect, completed,
}: {
  events: YzEvent[]; eras: Record<EraKey, Era>; currentIdx: number;
  onSelect: (i: number) => void; completed: Set<string>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = itemsRef.current[currentIdx];
    const container = scrollRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    const offset = (elRect.left + elRect.width / 2) - (cRect.left + cRect.width / 2);
    container.scrollBy({ left: offset, behavior: "smooth" });
  }, [currentIdx]);

  return (
    <div className={styles.timelineWrap}>
      <div className={styles.eraLegend}>
        {Object.values(eras).map((era) => (
          <div key={era.key} className={styles.eraChip}>
            <span className={styles.eraDot} style={{ background: era.color }} />
            <span>{era.label}</span>
            <span className={styles.eraRange}>{era.range}</span>
          </div>
        ))}
      </div>
      <div className={styles.timelineScroll} ref={scrollRef}>
        <div className={styles.timelineTrack}>
          <div className={styles.timelineLine} />
          {events.map((ev, i) => {
            const era = eras[ev.era];
            const isActive = i === currentIdx;
            const isDone = completed.has(ev.id);
            const isPast = i < currentIdx;
            const eraVars: EraVars = { "--era-color": era.color, "--era-bg": era.bg };
            return (
              <button
                key={ev.id}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={cx(styles.tlNode, isActive && styles.active, isPast && styles.past, isDone && styles.done)}
                onClick={() => onSelect(i)}
                style={eraVars}
                type="button"
              >
                <div className={styles.tlNodeLabel}>
                  <span className={styles.tlYear}>{ev.year}</span>
                  {ev.turkish && <span className={styles.tlFlag}>🇹🇷</span>}
                </div>
                <div className={styles.tlNodeDot}>
                  <span className={styles.tlIcon}>{ev.icon}</span>
                  {isDone && <span className={styles.tlCheck}>✓</span>}
                </div>
                <div className={styles.tlNodeTitle}>{ev.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventDetail({
  event, era, index, total, onPrev, onNext, onQuiz, hasQuiz,
}: {
  event: YzEvent; era: Era; index: number; total: number;
  onPrev: () => void; onNext: () => void; onQuiz: () => void; hasQuiz: boolean;
}) {
  const eraVars: EraVars = { "--era-color": era.color, "--era-bg": era.bg };
  return (
    <div className={styles.detailCard} style={eraVars}>
      <div className={styles.detailTop}>
        <div className={styles.detailTopLeft}>
          <div className={styles.detailYearBadge}>{event.year}</div>
          <div className={styles.detailMeta}>
            <div className={styles.detailTitleRow}>
              {event.turkish && <span className={styles.detailFlag} title="Türkiye'den">🇹🇷</span>}
              <span className={styles.detailIconBig}>{event.icon}</span>
              <h2 className={styles.detailTitle}>{event.title}</h2>
            </div>
            <div className={styles.detailWho}>
              <span>{event.whoFlag}</span>
              <span>{event.who}</span>
              <span className={styles.detailSep}>·</span>
              <span className={styles.detailEra}>{era.label}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailShort}>{event.short}</div>
      <div className={styles.detailLong}>{event.long}</div>

      {event.didYouKnow && (
        <div className={styles.dyk}>
          <div className={styles.dykTitle}>
            <span className={styles.dykEmoji}>💡</span> Bunu biliyor muydun?
          </div>
          <div className={styles.dykText}>{event.didYouKnow}</div>
        </div>
      )}

      <div className={styles.detailActions}>
        <button className={cx(styles.btn, styles.btnGhost)} onClick={onPrev} disabled={index === 0}>← Önceki</button>
        <div className={styles.detailProgress}>
          <div className={styles.detailProgressTrack}>
            <div className={styles.detailProgressFill} style={{ width: `${((index + 1) / total) * 100}%`, background: era.color }} />
          </div>
          <div className={styles.detailProgressLabel}>{index + 1} / {total}</div>
        </div>
        {hasQuiz ? (
          <button className={cx(styles.btn, styles.btnPrimary)} onClick={onQuiz}>Mini quiz →</button>
        ) : (
          <button className={cx(styles.btn, styles.btnPrimary)} onClick={onNext} disabled={index === total - 1}>Sonraki →</button>
        )}
      </div>
    </div>
  );
}

function QuizCard({
  quiz, era, onAnswer, onSkip,
}: {
  quiz: Quiz; era: Era; onAnswer: (correct: boolean) => void; onSkip: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const eraVars: EraVars = { "--era-color": era.color, "--era-bg": era.bg };
  const isCorrect = selected === quiz.correct;

  const handlePick = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  const handleNext = () => {
    onAnswer(isCorrect);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className={styles.quizCard} style={eraVars}>
      <div className={styles.quizHeader}>
        <div className={styles.quizTag}>Mini Quiz</div>
        <button className={styles.quizSkip} onClick={onSkip}>Atla →</button>
      </div>
      <h3 className={styles.quizQ}>{quiz.q}</h3>
      <div className={styles.quizOptions}>
        {quiz.options.map((opt, i) => {
          const state = revealed
            ? i === quiz.correct ? styles.correct
              : i === selected ? styles.wrong
              : styles.dim
            : "";
          return (
            <button
              key={i}
              className={cx(styles.quizOpt, state)}
              onClick={() => handlePick(i)}
              disabled={revealed}
              type="button"
            >
              <span className={styles.quizOptLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={styles.quizOptText}>{opt}</span>
              {revealed && i === quiz.correct && <span className={styles.quizOptIcon}>✓</span>}
              {revealed && i === selected && i !== quiz.correct && <span className={styles.quizOptIcon}>✕</span>}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className={cx(styles.quizFeedback, isCorrect ? styles.ok : styles.nope)}>
          <div className={styles.quizFeedbackTitle}>
            {isCorrect ? "🎉 Harika! Doğru cevap." : "Olsun, denemek öğrenmenin yarısı."}
          </div>
          <div className={styles.quizFeedbackExplain}>{quiz.explain}</div>
          <button className={cx(styles.btn, styles.btnPrimary, styles.quizNext)} onClick={handleNext}>Devam →</button>
        </div>
      )}
    </div>
  );
}
