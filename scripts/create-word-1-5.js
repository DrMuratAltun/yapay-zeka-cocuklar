const docx = require("docx");
const fs = require("fs");
const path = require("path");

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  PageNumber,
  NumberFormat,
  Footer,
  Header,
  Tab,
  TabStopPosition,
  TabStopType,
  convertInchesToTwip,
  ImageRun,
  PageBreak,
} = docx;

const OUTPUT_DIR = path.join(__dirname, "..", "kitap", "word");

// Colors
const BLUE = "2563EB";
const AMBER = "F59E0B";
const AMBER_BG = "FEF3C7";
const LIGHT_BLUE = "DBEAFE";
const LIGHT_GRAY = "F3F4F6";
const WHITE = "FFFFFF";
const BLACK = "000000";
const DARK_GRAY = "374151";

// Helper: create a styled heading
function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 36, color: BLUE, font: "Arial" })],
    spacing: { before: 400, after: 200 },
    heading: HeadingLevel.HEADING_1,
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })],
    spacing: { before: 300, after: 150 },
    heading: HeadingLevel.HEADING_2,
  });
}

function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: BLUE, font: "Arial" })],
    spacing: { before: 200, after: 100 },
    heading: HeadingLevel.HEADING_3,
  });
}

function bodyText(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, font: "Arial", color: DARK_GRAY })],
    spacing: { before: 100, after: 100 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bulletItem(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, font: "Arial", color: DARK_GRAY })],
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
  });
}

function numberedItem(num, text) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 24, font: "Arial", color: BLUE }),
      new TextRun({ text, size: 24, font: "Arial", color: DARK_GRAY }),
    ],
    spacing: { before: 80, after: 80 },
    indent: { left: 360 },
  });
}

function emptyLine() {
  return new Paragraph({ children: [], spacing: { before: 100, after: 100 } });
}

// Callout box using a single-cell table
function calloutBox(title, content, bgColor = AMBER_BG, titleColor = AMBER) {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: title, bold: true, size: 24, font: "Arial", color: titleColor })],
                spacing: { after: 80 },
              }),
              new Paragraph({
                children: [new TextRun({ text: content, size: 22, font: "Arial", color: DARK_GRAY })],
              }),
            ],
            shading: { type: ShadingType.CLEAR, fill: bgColor },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// Simple table with header
function simpleTable(headers, rows, headerBg = BLUE) {
  const headerRow = new TableRow({
    children: headers.map(
      (h) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: h, bold: true, size: 22, font: "Arial", color: WHITE })],
              alignment: AlignmentType.LEFT,
            }),
          ],
          shading: { type: ShadingType.CLEAR, fill: headerBg },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })
    ),
  });

  const dataRows = rows.map(
    (row, idx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 22, font: "Arial", color: DARK_GRAY })],
                }),
              ],
              shading: { type: ShadingType.CLEAR, fill: idx % 2 === 0 ? LIGHT_GRAY : WHITE },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
            })
        ),
      })
  );

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// Quiz question
function quizQuestion(num, q) {
  const items = [
    new Paragraph({
      children: [
        new TextRun({ text: `Soru ${num}: `, bold: true, size: 24, font: "Arial", color: BLUE }),
        new TextRun({ text: q.soru, size: 24, font: "Arial", color: DARK_GRAY }),
      ],
      spacing: { before: 200, after: 100 },
    }),
  ];
  q.secenekler.forEach((s, i) => {
    const letter = String.fromCharCode(65 + i);
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: `   ${letter}) `, bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: s, size: 22, font: "Arial", color: DARK_GRAY }),
        ],
        spacing: { before: 40, after: 40 },
        indent: { left: 360 },
      })
    );
  });
  if (q.aciklama) {
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Cevap: ", bold: true, size: 20, font: "Arial", color: BLUE, italics: true }),
          new TextRun({ text: String.fromCharCode(65 + q.dogru), bold: true, size: 20, font: "Arial", color: BLUE, italics: true }),
          new TextRun({ text: ` - ${q.aciklama}`, size: 20, font: "Arial", color: DARK_GRAY, italics: true }),
        ],
        spacing: { before: 60, after: 120 },
        indent: { left: 360 },
      })
    );
  } else {
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Doğru Cevap: ", bold: true, size: 20, font: "Arial", color: BLUE, italics: true }),
          new TextRun({ text: String.fromCharCode(65 + q.dogru), bold: true, size: 20, font: "Arial", color: BLUE, italics: true }),
        ],
        spacing: { before: 60, after: 120 },
        indent: { left: 360 },
      })
    );
  }
  return items;
}

// Title page
function titlePage(bolumNo, baslik, altBaslik) {
  return [
    emptyLine(),
    emptyLine(),
    emptyLine(),
    emptyLine(),
    new Paragraph({
      children: [new TextRun({ text: `BOLUM ${bolumNo}`, bold: true, size: 56, font: "Arial", color: BLUE })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: baslik, bold: true, size: 48, font: "Arial", color: DARK_GRAY })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: altBaslik, size: 36, font: "Arial", color: AMBER, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),
    emptyLine(),
    emptyLine(),
    new Paragraph({
      children: [new TextRun({ text: "Yapay Zeka Macerasi", bold: true, size: 32, font: "Arial", color: BLUE })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "GencYZ - Dr. Murat ALTUN", size: 28, font: "Arial", color: DARK_GRAY })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// QR code placeholder
function qrPlaceholder(bolumNo) {
  return calloutBox(
    "Interaktif Versiyon",
    `Bu etkinligin interaktif versiyonu: gencyz.com/bolumler/${bolumNo}\n(QR kod ile erisebilirsiniz)`,
    LIGHT_BLUE,
    BLUE
  );
}

// Activity description
function activityBlock(title, type, duration, description, materials) {
  const items = [
    new Paragraph({
      children: [
        new TextRun({ text: `[${type}] `, bold: true, size: 22, font: "Arial", color: WHITE }),
      ],
      shading: { type: ShadingType.CLEAR, fill: type === "UNPLUGGED" ? "10B981" : "3B82F6" },
      spacing: { before: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: title, bold: true, size: 28, font: "Arial", color: BLUE }),
        new TextRun({ text: `  (${duration})`, size: 22, font: "Arial", color: DARK_GRAY }),
      ],
      spacing: { before: 100, after: 100 },
    }),
    bodyText(description),
  ];
  if (materials) {
    items.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Malzemeler: ", bold: true, size: 22, font: "Arial", color: DARK_GRAY }),
          new TextRun({ text: materials, size: 22, font: "Arial", color: DARK_GRAY }),
        ],
        spacing: { before: 60, after: 100 },
      })
    );
  }
  return items;
}

// Create document for a chapter
function createDocument(bolumNo, baslik, altBaslik, sections) {
  return new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 24 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 }, // ~2.5cm
          },
          pageNumberStart: 1,
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "\u00A9 2025 Dr. Murat ALTUN - GencYZ | Sayfa ", size: 18, font: "Arial", color: DARK_GRAY }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: DARK_GRAY }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: sections,
      },
    ],
  });
}

// =============== CHAPTER 1 ===============
function chapter1() {
  const sections = [
    ...titlePage(1, "Yapay Zeka Nedir?", "Kesif Yolculugu"),

    // Kazanimlar
    h2("Neler Ogrenecegiz?"),
    bulletItem("Zeka kavramini tanimlayabilir, insan zekasi ile yapay zekayi karsilastirabiliriz."),
    bulletItem("Yapay zekanin tarihcesini ve onemli kilometre taslarini ogrenecegiz."),
    bulletItem("Yapay zeka turlerini (dar, genel, super) ayirt edebilecegiz."),
    bulletItem("Yapay zekanin gunluk hayattaki orneklerini fark edecegiz."),
    emptyLine(),

    // Anahtar Kavramlar
    h3("Anahtar Kavramlar"),
    bodyText("zeka, yapay zeka, algoritma, Turing Testi, dar yapay zeka, genel yapay zeka"),
    emptyLine(),

    // Zeka Nedir
    h2("Zeka Nedir?"),
    bodyText("Zeka, ogrenme, anlama, problem cozme ve yeni durumlara uyum saglama yeteneklerimizin tamamidir. Insanlar bu yetenekleri dogal olarak gelistirir: bir bebek yurumesini ogrenir, bir ogrenci matematik problemlerini cozer, bir sporcu yeni taktikler gelistirir."),
    calloutBox("Dusun:", "Bir hesap makinesi saniyeler icinde binlerce carpma islemi yapabilir. Bu onu zeki yapar mi? Neden?", AMBER_BG, AMBER),
    emptyLine(),

    // Yapay Zeka Nedir
    h2("Yapay Zeka Nedir?"),
    bodyText('Yapay zeka, bilgisayarlarin ve makinelerin insanlara benzer "zeki" davranislar gostermesini saglayan teknolojilerin genel adidir.'),
    emptyLine(),
    simpleTable(
      ["Ozellik", "Insan Zekasi", "Yapay Zeka"],
      [
        ["Ogrenme", "Deneyim ve gozlemle", "Veri ve algoritmalarla"],
        ["Yaraticilik", "Cok guclu", "Sinirli (taklit eder)"],
        ["Duygular", "Var", "Yok (taklit edebilir)"],
        ["Hiz", "Sinirli", "Cok hizli"],
        ["Yorgunluk", "Yorulur", "Yorulmaz"],
        ["Esneklik", "Yeni durumlara uyum saglar", "Egitildigi konuda basarili"],
      ]
    ),
    emptyLine(),

    // Onculer
    h2("YZ Onculeri"),
    h3("Alan Turing (1912-1954)"),
    bodyText('Ingiliz matematikci ve bilgisayar biliminin babasi. "Makineler dusunebilir mi?" sorusunu ilk kez o sormustur. Turing Testi\'ni one surmustur.'),
    h3("Cahit Arf (1910-1997)"),
    bodyText('Turkiye\'nin en buyuk matematikcilerinden biri. 10 liralik banknotlarin arkasinda resmi bulunan Cahit Arf, "Makineler dusunebilir mi ve nasil dusunebilir?" calismasi yayimlamistir.'),
    emptyLine(),

    // YZ Tarihcesi
    h2("YZ Tarihcesi"),
    numberedItem("1642", "Ilk mekanik hesap makinesi (Pascal)"),
    numberedItem("1950", "Turing Testi one suruldu"),
    numberedItem("1956", '"Yapay zeka" terimi ilk kez kullanildi'),
    numberedItem("1959", "Cahit Arf'in calismasi"),
    numberedItem("1965", "ELIZA - ilk sohbet robotu"),
    numberedItem("1997", "Deep Blue satranc sampiyonunu yendi"),
    numberedItem("2011", "Siri ve sesli asistanlar"),
    numberedItem("2016", "AlphaGo, Go sampiyonunu yendi"),
    numberedItem("2022", "ChatGPT - uretken YZ cagi"),
    emptyLine(),
    calloutBox("Biliyor Muydunuz?", "IBM'in Deep Blue bilgisayari, dunya satranc sampiyonu Garry Kasparov'u yenerek tarihe gecti (1997).", AMBER_BG, AMBER),
    emptyLine(),

    // YZ Turleri
    h2("Yapay Zeka Turleri"),
    h3("1. Dar YZ (Narrow AI)"),
    bodyText("Sadece belirli bir gorevi yapar. Ornekler: Siri, Google Cevirmen, oneri sistemleri. BUGÜN KULLANDIGIMIZ TUM YZ bu kategoridedir."),
    h3("2. Genel YZ (AGI)"),
    bodyText("Her turlu zihinsel gorev yapabilir. Henuz gelistirilmedi - arastirma asamasinda."),
    h3("3. Super YZ (ASI)"),
    bodyText("Insandan cok daha zeki. Tamamen teorik - bilim kurgu."),
    emptyLine(),

    // Etkinlikler
    h2("Etkinlikler"),
    ...activityBlock("Etkinlik 1: Kim Daha Zeki?", "UNPLUGGED", "20 dakika - Grup calismasi", 'Gorev kartlarini kesin ve grubunuzla her gorev icin "Insan mi yoksa Makine mi daha iyi yapar?" tartismasini yapin.', "Gorev kartlari (basili), makas"),
    emptyLine(),
    ...activityBlock("Etkinlik 2: YZ Dedektifi", "GOZLEM", "1 gun + 20 dk sinif tartismasi", "Bir gun boyunca karsilastiginiz yapay zeka uygulamalarini gozlem formuna kaydedin.", "Gozlem formu, kalem"),
    emptyLine(),
    ...activityBlock("Etkinlik 3: YZ Zaman Cizelgesi", "UNPLUGGED", "25 dakika - Grup calismasi", "A3 kagida zaman cizelgesi cizin, onemli olaylari yerlestirin ve gelecek tahminlerinizi ekleyin. Posterinizi sinifta sergileyin.", "A3 kagit, renkli kalemler"),
    emptyLine(),

    // QR
    qrPlaceholder(1),
    emptyLine(),

    // Quiz
    h2("Degerlendirme Sorulari"),
    ...quizQuestion(1, { soru: "Asagidakilerden hangisi yapay zekanin tanimi icin en uygun ifadedir?", secenekler: ["Bilgisayarlarin internete baglanmasi", "Makinelerin insanlara benzer zeki davranislar gostermesi", "Robotlarin insan seklinde uretilmesi", "Bilgisayarlarin cok hizli calismasi"], dogru: 1 }),
    ...quizQuestion(2, { soru: '"Yapay zeka" terimi ilk kez hangi yil kullanilmistir?', secenekler: ["1943", "1950", "1956", "1997"], dogru: 2 }),
    ...quizQuestion(3, { soru: "Asagidakilerden hangisi dar yapay zeka (Narrow AI) ornegi DEGILDIR?", secenekler: ["Sesli asistan (Siri)", "Satranc oynayan bilgisayar", "Insanlar gibi her konuda dusunebilen robot", "Yuz tanima sistemi"], dogru: 2 }),
    ...quizQuestion(4, { soru: "Turing Testini kim one surmustur?", secenekler: ["John McCarthy", "Alan Turing", "Cahit Arf", "Steve Jobs"], dogru: 1 }),
    ...quizQuestion(5, { soru: "Asagidaki gorevlerden hangisinde yapay zeka insanlardan daha basarilidir?", secenekler: ["Bir siir yazmak", "Duygulari anlamak", "Milyonlarca veriyi saniyeler icinde analiz etmek", "Yeni bir bulusun fikrini ortaya atmak"], dogru: 2 }),
  ];
  return createDocument(1, "Yapay Zeka Nedir?", "Kesif Yolculugu", sections);
}

// =============== CHAPTER 2 ===============
function chapter2() {
  const sections = [
    ...titlePage(2, "Gunluk Hayatta YZ", "Yapay Zeka Etrafimizda"),

    h2("Neler Ogrenecegiz?"),
    bulletItem("Yapay zekanin gunluk hayatta kullanildigi alanlari kesfedecegiz."),
    bulletItem("Telefonumuzdaki YZ uygulamalarini tanimlayabilecegiz."),
    bulletItem("Farkli sektorlerde (saglik, ulasim, egitim, tarim) YZ kullanimi ornekleri verebilecegiz."),
    bulletItem("YZ uygulamalarinin arkasindaki temel teknolojileri anlayacagiz."),
    emptyLine(),

    h3("Anahtar Kavramlar"),
    bodyText("oneri sistemi, bilgisayar gorusu, dogal dil isleme, otonom arac, akilli ev, chatbot"),
    emptyLine(),

    // YZ Her Yerde
    h2("1. YZ Her Yerde!"),
    bodyText("Sabah alarminiz caldiginda, telefonunuz pil durumuna ve aliskanliklariniza gore en uygun zamanda sizi uyandirmis olabilir. Kahvaltida telefonunuzu actiginizda size ozel haberler gosterilir. Okula giderken navigasyon en kisa yolu bulur. Farkinda olmasak da yapay zeka gunluk hayatimizin her aninda bizimle birlikte!"),
    calloutBox("Dusun:", "Bugun sabahtan beri kac farkli YZ uygulamasi kullandin? Saymaya calis!", AMBER_BG, AMBER),
    emptyLine(),

    // Cebindeki YZ
    h2("2. Cebindeki Yapay Zeka"),
    bodyText("Akilli telefonlar, iclerinde onlarca YZ teknolojisi barindirir. Farkinda olmadan her gun bu teknolojileri kullaniriz:"),
    simpleTable(
      ["Ozellik", "Teknoloji"],
      [
        ["Yuz tanima ile kilit acma", "Bilgisayar gorusu"],
        ["Sesli asistan (Siri, Google)", "Dogal dil isleme + Konusma tanima"],
        ["Otomatik fotograf iyilestirme", "Goruntu isleme"],
        ["Klavye kelime tahmini", "Dogal dil isleme"],
        ["Spam arama engelleme", "Makine ogrenimi"],
        ["Pil kullanim optimizasyonu", "Makine ogrenimi"],
      ]
    ),
    emptyLine(),
    calloutBox("Biliyor Muydunuz?", "Ortalama bir akilli telefon kullanicisi gunde 2.600'den fazla kez telefonuna dokunur. Bu etkilesimlerin buyuk bir kismi yapay zeka tarafindan desteklenir!", AMBER_BG, AMBER),
    emptyLine(),

    // YZ Kullanim Alanlari
    h2("3. YZ Kullanim Alanlari"),
    bodyText("Yapay zeka sadece telefonlarimizda degil, hayatimizin pek cok alaninda aktif olarak kullaniliyor:"),
    emptyLine(),
    h3("Ulasim"),
    bulletItem("Otonom (surucusuz) araclar"),
    bulletItem("Trafik yonetim sistemleri"),
    bulletItem("Navigasyon ve rota optimizasyonu"),
    bulletItem("Park yeri bulma uygulamalari"),
    h3("Saglik"),
    bulletItem("Tibbi goruntu analizi (rontgen, MR)"),
    bulletItem("Ilac gelistirme"),
    bulletItem("Saglik izleme (akilli saatler)"),
    bulletItem("Hastalik riski tahmini"),
    h3("Egitim"),
    bulletItem("Kisisellesmis ogrenme platformlari"),
    bulletItem("Otomatik odev degerlendirme"),
    bulletItem("Dil ogrenme uygulamalari (Duolingo)"),
    bulletItem("Akilli ogretim asistanlari"),
    h3("Eglence"),
    bulletItem("Video oyunlarindaki NPC karakterler"),
    bulletItem("Muzik ve film onerileri"),
    bulletItem("Sosyal medya akisi (feed) siralama"),
    bulletItem("Yuz filtreleri ve efektleri"),
    h3("Guvenlik"),
    bulletItem("Yuz tanima ile telefon acma"),
    bulletItem("Spam ve dolandiricilik tespiti"),
    bulletItem("Guvenlik kamerasi analizi"),
    bulletItem("Siber saldiri onleme"),
    h3("Tarim"),
    bulletItem("Bitki hastaligi tespiti"),
    bulletItem("Sulama optimizasyonu"),
    bulletItem("Hasat zamani tahmini"),
    bulletItem("Drone ile tarla izleme"),
    emptyLine(),

    // Oneri Sistemleri
    h2("4. Oneri Sistemleri Nasil Calisir?"),
    bodyText('Film, video ve muzik platformlari "Sana Ozel" icerikler sunar. Peki bu nasil calisir?'),
    numberedItem(1, "Veri Toplama: Neyi izledigini, ne kadar izledigini, neyi begendini, neyi gectigini kaydeder."),
    numberedItem(2, "Oruntu Bulma: Benzer izleme aliskanliklari olan kullanicilari bulur."),
    numberedItem(3, "Tahmin Yapma: Senin henuz izlemedigin ama sevebilecegin icerikleri tahmin eder."),
    numberedItem(4, 'Oneri Sunma: Ana sayfanda "Senin icin sectiklerimiz" olarak gosterir.'),
    emptyLine(),

    // Sesli Asistanlar
    h2("5. Sesli Asistanlar ve Chatbotlar"),
    bodyText("Siri, Google Asistan, Alexa gibi sesli asistanlar birden fazla YZ teknolojisini bir arada kullanir:"),
    simpleTable(
      ["Asama", "Teknoloji", "Ne Yapar?"],
      [
        ["1. Dinleme", "Konusma Tanima (ASR)", "Sesini metne cevirir"],
        ["2. Anlama", "Dogal Dil Isleme (NLP)", "Ne demek istedigini anlar"],
        ["3. Islem", "Akil Yurutme", "En iyi yaniti bulur"],
        ["4. Yanitlama", "Konusma Sentezi (TTS)", "Yaniti sesli olarak soyler"],
      ]
    ),
    emptyLine(),

    // Otonom Araclar & Akilli Tarim
    h3("Otonom Araclar"),
    bodyText("Tesla, Waymo gibi sirketlerin surucusuz araclari kameralar, radarlar ve LIDAR sensorleri ile cevreyi algilar. YZ, diger araclari, yayalari ve trafik isaretlerini tanimlayarak araci guvenli bir sekilde surebilir."),
    h3("Akilli Tarim"),
    bodyText("Drone'lar tarlalari havadan tarayarak hastalikli bitkileri tespit eder. YZ destekli sulama sistemleri topragin nem durumuna gore su tasarrufu saglar. Turkiye'de de akilli tarim uygulamalari yayginlasmaktadir."),
    emptyLine(),

    // Etkinlikler
    h2("Etkinlikler"),
    ...activityBlock("Etkinlik 1: YZ Haritasi", "UNPLUGGED", "25 dakika - Bireysel + sinif tartismasi", 'A3 kagida buyuk bir harita cizin. Ortaya "BEN" yazin. Etrafina gun boyunca karsilastiginiz YZ uygulamalarini yerlestirin (ev, okul, yol, alisveris). Her uygulamanin yanina hangi YZ teknolojisini kullandigini yazin.', "A3 kagit, renkli kalemler, yapisitirici notlar"),
    emptyLine(),
    ...activityBlock("Etkinlik 2: YZ veya Degil?", "UNPLUGGED", "20 dakika - Grup calismasi (4 kisi)", 'Kartlardaki cihaz ve uygulamalari "YZ Kullanan" ve "YZ Kullanmayan" olarak siniflandirin. Her kartin neden o kategoriye ait oldugunu grubunuzla tartisarak karar verin.', "Siniflandirma kartlari"),
    emptyLine(),
    ...activityBlock("Etkinlik 3: Sesli Asistanla Tanisma", "BILGISAYARLI", "30 dakika - Bireysel", "Telefonunuzdaki sesli asistani (Google Asistan veya Siri) acin. Farkli gorevleri deneyin ve asistanin hangi gorevlerde basarili, hangilerinde basarisiz oldugunu kaydedin.", "Telefon, gozlem formu"),
    emptyLine(),
    ...activityBlock("Etkinlik 4: YZ Roportaji", "BILGISAYARLI", "20 dakika - Bireysel", 'Ailenizden birine "Yapay zeka hakkinda ne dusunuyorsunuz?" diye sorun. Cevaplari kisa bir paragrafta ozetleyin. Sinifta farkli nesillerin YZ hakkindaki goruslerini karsilastirin.', null),
    emptyLine(),

    qrPlaceholder(2),
    emptyLine(),

    // Quiz
    h2("Degerlendirme Sorulari"),
    ...quizQuestion(1, { soru: "Asagidakilerden hangisi yapay zekanin gunluk hayattaki bir uygulamasi DEGILDIR?", secenekler: ["Telefonun yuz tanima ile acilmasi", "Elektrik supurgesinin dugmeyle acilmasi", "Film platformlarinin film onerisi yapmasi", "Google Haritalar'in trafik tahmini vermesi"], dogru: 1, aciklama: "Dugmeyle calisan bir elektrik supurgesi basit bir mekanik cihaztir, yapay zeka icermez." }),
    ...quizQuestion(2, { soru: "Bir sesli asistanin calismasi icin hangi YZ teknolojileri gerekir?", secenekler: ["Sadece ses tanima", "Ses tanima + dogal dil isleme + konusma sentezi", "Sadece internet baglantisi", "Sadece mikrofon"], dogru: 1, aciklama: "Sesli asistanlar birden fazla YZ teknolojisini bir arada kullanir." }),
    ...quizQuestion(3, { soru: "Muzik ve video platformlarinin 'Sana Ozel' oynatma listeleri hangi YZ yontemiyle olusturulur?", secenekler: ["Rastgele secim", "Oneri sistemi (tavsiye algoritmalari)", "Alfabetik siralama", "En yeni sarkilari gosterme"], dogru: 1, aciklama: "Oneri sistemleri, dinleme/izleme aliskanliklariniza bakarak sevebileceginiz yeni icerikleri tahmin eder." }),
    ...quizQuestion(4, { soru: "Akilli ev sistemlerinde yapay zeka ne ise yarar?", secenekler: ["Sadece isiklari acip kapatir", "Aliskanliklarinizi ogrenerek enerji tasarrufu saglar", "Sadece uzaktan kumanda gorevi gorur", "Internete baglanmayi saglar"], dogru: 1, aciklama: "Akilli ev sistemleri YZ sayesinde aliskanliklarinizi ogrenir." }),
    ...quizQuestion(5, { soru: "Asagidaki YZ uygulamalarindan hangisi saglik alaninda kullanilir?", secenekler: ["Spam mail filtreleme", "Rontgen ve MR goruntulerde hastalik tespiti", "Sosyal medya filtreleri", "Online oyunlardaki NPC karakterler"], dogru: 1, aciklama: "YZ, tibbi goruntuleri analiz ederek doktorlara teshis konusunda yardimci olur." }),
  ];
  return createDocument(2, "Gunluk Hayatta YZ", "Yapay Zeka Etrafimizda", sections);
}

// =============== CHAPTER 3 ===============
function chapter3() {
  const sections = [
    ...titlePage(3, "Verinin Gucu", "YZ'nin Yakiti"),

    h2("Neler Ogrenecegiz?"),
    bulletItem("Veri kavramini tanimlayabilir, farkli veri turlerini ayirt edebilecegiz."),
    bulletItem("Yapisal ve yapisal olmayan veri arasindaki farki anlayacagiz."),
    bulletItem("Verinin YZ icin neden onemli oldugunu aciklayabilecegiz."),
    bulletItem("Veri toplama, temizleme ve etiketleme sureclerini ogrenecegiz."),
    bulletItem("Veri gizliligi ve KVKK konusunda bilinc kazanacagiz."),
    emptyLine(),

    h3("Anahtar Kavramlar"),
    bodyText("veri, veri seti, yapisal veri, buyuk veri, veri etiketleme, KVKK, veri gizliligi"),
    emptyLine(),

    // Veri Nedir
    h2("1. Veri Nedir?"),
    bodyText("Veri, islenebilir ve kaydedilebilir her turlu bilgi parcasidir. Bir sinifin boy olculeri, hava durumu kayitlari, telefonundaki fotograflar, dinledigin sarkilar... hepsi birer veridir!"),
    calloutBox("Dusun:", "Bugun okula gelene kadar kac farkli veri urettin? Alarmin calma saati, kahvaltida yediklerin, adim sayisi, gonderdigin mesajlar...", AMBER_BG, AMBER),
    emptyLine(),

    // Veri Turleri
    h2("2. Veri Turleri"),
    bodyText("Veri pek cok farkli formatta olabilir:"),
    simpleTable(
      ["Veri Turu", "Ornekler"],
      [
        ["Metin Verisi", "Mesajlar, kitaplar, haberler, yorumlar"],
        ["Sayi Verisi", "Sicaklik, puan, fiyat, nufus"],
        ["Goruntu Verisi", "Fotograflar, rontgenler, uydu goruntuleri"],
        ["Ses Verisi", "Muzik, konusmalar, dogal sesler"],
        ["Video Verisi", "Film, guvenlik kamerasi, ders videolari"],
        ["Konum Verisi", "GPS koordinatlari, harita verileri"],
      ]
    ),
    emptyLine(),

    // Yapisal Veri
    h2("3. Yapisal ve Yapisal Olmayan Veri"),
    simpleTable(
      ["Ozellik", "Yapisal Veri", "Yapisal Olmayan Veri"],
      [
        ["Bicim", "Tablo, satir, sutun", "Serbest format"],
        ["Ornek", "Excel tablosu, veritabani", "E-posta, fotograf, video"],
        ["Aranabilirlik", "Kolay aranir", "Zor aranir"],
        ["YZ icin", "Dogrudan kullanilabilir", "Once islenmesi gerekir"],
        ["Miktar", "~%20 tum veriler", "~%80 tum veriler"],
      ]
    ),
    emptyLine(),
    calloutBox("Biliyor Muydunuz?", "Dunyadaki verilerin %80'den fazlasi yapisal olmayan veridir! Fotograflar, videolar, sesler ve metinler bu kategoriye girer. YZ'nin bu verileri anlamlandirilabilmesi icin ozel teknikler gerekir.", AMBER_BG, AMBER),
    emptyLine(),

    // Veri Neden Onemli
    h2("4. Veri Neden YZ icin Onemlidir?"),
    bodyText("Yapay zeka, veri olmadan ogrenemez. Nasil ki bir ogrenci kitap okumadan sinava hazirlanamiyorsa, YZ de veri olmadan gorevlerini yerine getiremez."),
    h3("Daha Cok Veri = Daha Iyi Sonuc"),
    bodyText("1.000 kedi fotografi ile egitilen model ile 1.000.000 fotograf ile egitilen model arasinda buyuk fark vardir."),
    h3("Kaliteli Veri = Dogru Sonuc"),
    bodyText("Bulanik, yanlis etiketlenmis veya hatali veriler yanlis sonuclara yol acar. 'Cop girer, cop cikar' (GIGO) prensibi."),
    h3("Cesitli Veri = Adil Sonuc"),
    bodyText("Sadece belirli bir grubun verisiyle egitilen model, diger gruplar icin yanlis sonuc verebilir (onyargi/bias)."),
    emptyLine(),

    // Veri Hazirlama Sureci
    h2("5. Veri Hazirlama Sureci"),
    bodyText("YZ icin veri kullanilmadan once bir hazirlama surecinden gecer:"),
    numberedItem(1, "Toplama: Veriler farkli kaynaklardan toplanir: anketler, sensorler, internet, veritabanlari."),
    numberedItem(2, "Temizleme: Hatali, eksik veya tekrarlayan veriler ayiklanir. En cok zaman alan adimdir!"),
    numberedItem(3, 'Etiketleme: Veriler kategorize edilir. Ornegin: bu fotograf "kedi", bu "kopek".'),
    numberedItem(4, "Bolme: Veri seti ikiye ayrilir: egitim seti (%80) ve test seti (%20)."),
    numberedItem(5, "Kullanma: Hazir veri YZ modeline verilir. Model bu verilerden ogrenir."),
    emptyLine(),

    // Buyuk Veri
    h2("6. Buyuk Veri (Big Data)"),
    bodyText("Her gun uretilen veri miktari inanilmaz boyutlara ulasmistir:"),
    simpleTable(
      ["Ozellik", "Deger", "Aciklama"],
      [
        ["Hacim (Volume)", "2.5 Quintilyon bayt", "Her gun uretilen veri"],
        ["Hiz (Velocity)", "500 milyon tweet/gun", "Verinin uretilme hizi"],
        ["Cesitlilik (Variety)", "Metin+ses+goruntu+...", "Farkli veri tipleri"],
      ]
    ),
    emptyLine(),

    // Veri Gizliligi
    h2("7. Veri Gizliligi ve KVKK"),
    bodyText("Veri cok guclu bir aractir ama dikkatli kullanilmalidir. Turkiye'de kisisel verilerin korunmasi icin KVKK (Kisisel Verilerin Korunmasi Kanunu) yururluktedir."),
    h3("Dogru Kullanim"),
    bulletItem("Izin alarak veri toplamak"),
    bulletItem("Verileri guvenli saklamak"),
    bulletItem("Sadece belirtilen amac icin kullanmak"),
    bulletItem("Istendigi zaman silmek"),
    h3("Yanlis Kullanim"),
    bulletItem("Izinsiz kisisel bilgi toplamak"),
    bulletItem("Verileri ucuncu kisilerle paylastirmak"),
    bulletItem("Farkli amaclar icin kullanmak"),
    bulletItem("Guvensiz ortamda saklamak"),
    emptyLine(),

    // Etkinlikler
    h2("Etkinlikler"),
    ...activityBlock("Etkinlik 1: Girdi Avcilari", "UNPLUGGED", "25 dakika - Grup calismasi", 'Bilgi kartlarindaki ifadeleri "Dogru Veri", "Yanlis Veri" ve "Oznel Veri" olarak siniflandirin.', "20 adet bilgi karti (basili), siniflandirma panosu"),
    emptyLine(),
    ...activityBlock("Etkinlik 2: Sinif Anketi", "UNPLUGGED", "30 dakika - Sinif calismasi", "Sinifca bir anket yapin (favori renk, boy, ayak numarasi, sevilen ders). Sonuclari tahtada tabloya yazin. Bu verileri grafige donusturun.", null),
    emptyLine(),
    ...activityBlock("Etkinlik 3: Veri Seti Kesfedici", "BILGISAYARLI", "25 dakika - Bireysel", "Google Dataset Search veya Kaggle'da bir veri seti bulun. Veri setini inceleyin: kac satir var? Hangi sutunlar var? Veri turleri neler?", null),
    emptyLine(),
    ...activityBlock("Etkinlik 4: Veri Etiketleme Atolyesi", "BILGISAYARLI", "20 dakika - Bireysel", '20 hayvan fotografini "kedi" ve "kopek" olarak etiketleyin. Zor olan durumlar var mi? Etiketlemenin ne kadar onemli ve zaman alici oldugunu deneyimleyin.', null),
    emptyLine(),

    qrPlaceholder(3),
    emptyLine(),

    // Quiz
    h2("Degerlendirme Sorulari"),
    ...quizQuestion(1, { soru: "Asagidakilerden hangisi 'veri' icin en dogru tanimdir?", secenekler: ["Sadece rakamlardan olusan bilgiler", "Islenebilir, kaydedilebilir her turlu bilgi parcasi", "Sadece bilgisayarda saklanan dosyalar", "Internetten indirilen icerikler"], dogru: 1, aciklama: "Veri sadece rakamlar degildir. Metin, goruntu, ses, video, konum bilgisi ve daha fazlasi veridir." }),
    ...quizQuestion(2, { soru: "Bir yapay zeka modelini egitmek icin hangi tur veri KULLANILMAZ?", secenekler: ["Etiketlenmis fotograflar", "Gecmis satis kayitlari", "Rastgele uretilmis anlamsiz sayilar", "Hasta kayitlari (anonim)"], dogru: 2, aciklama: "YZ modelleri anlamli, gercek dunya verileriyle egitilir." }),
    ...quizQuestion(3, { soru: "Asagidakilerden hangisi 'yapisal veri' ornegi DEGILDIR?", secenekler: ["Bir sinifin not cizelgesi (tablo)", "Ogrenci numarasi listesi", "Bir ogrencinin yazdigi kompozisyon", "Nufus sayim verileri"], dogru: 2, aciklama: "Kompozisyon serbest metin oldugundan yapisal olmayan (yapisiz) veridir." }),
    ...quizQuestion(4, { soru: "Veri toplama surecinde asagidakilerden hangisi etik bir sorun olusturur?", secenekler: ["Anket ile gonullu veri toplamak", "Insanlarin izni olmadan kisisel bilgilerini kaydetmek", "Acik kaynak veri setleri kullanmak", "Anonim istatistik verileri analiz etmek"], dogru: 1, aciklama: "Izinsiz kisisel veri toplamak hem etik degil hem de yasalara aykiridir." }),
    ...quizQuestion(5, { soru: "'Buyuk veri' (big data) kavrami icin hangisi YANLISDIR?", secenekler: ["Cok buyuk miktarda veri icerir", "Geleneksel yontemlerle islenemez", "Sadece buyuk sirketler uretir", "Hiz, cesitlilik ve hacim ozellikleri vardir"], dogru: 2, aciklama: "Buyuk veriyi herkes uretir! Her gun sosyal medya paylasimlariniz buyuk verinin parcasidir." }),
  ];
  return createDocument(3, "Verinin Gucu", "YZ'nin Yakiti", sections);
}

// =============== CHAPTER 4 ===============
function chapter4() {
  const sections = [
    ...titlePage(4, "Makineler Nasil Ogrenir?", "Makine Ogrenimi Temelleri"),

    h2("Neler Ogrenecegiz?"),
    bulletItem("Makine ogrenimi kavramini ve geleneksel programlamadan farkini anlayacagiz."),
    bulletItem("Gozetimli, gozetimsiz ve pekistirmeli ogrenme turlerini ayirt edebilecegiz."),
    bulletItem("Siniflandirma ve tahmin kavramlarini ogrenecegiz."),
    bulletItem("Google Teachable Machine ile kendi modelimizi egitecegiz."),
    bulletItem("Bir modelin basarisini degerlendirmenin temellerini ogrenecegiz."),
    emptyLine(),

    h3("Anahtar Kavramlar"),
    bodyText("makine ogrenimi, model, egitim, siniflandirma, tahmin, gozetimli ogrenme, ozellik (feature)"),
    emptyLine(),

    // Geleneksel vs ML
    h2("1. Geleneksel Programlama vs Makine Ogrenimi"),
    bodyText("Geleneksel programlamada bilgisayara her adimi tek tek soyleriz. Makine ogreniminde ise bilgisayara ornekler veririz ve o kendisi ogrenir."),
    simpleTable(
      ["", "Geleneksel Programlama", "Makine Ogrenimi"],
      [
        ["Formul", "Veri + Kurallar = Sonuc", "Veri + Sonuclar = Kurallar"],
        ["Yontem", "Programci kurallari yazar", "Bilgisayar kurallari kendisi bulur"],
      ]
    ),
    emptyLine(),
    calloutBox("Dusun:", 'Bir cocuga "kedi"yi tanimlamayi nasil ogretirsin? Kurallari mi anlatirsin ("4 bacakli, tuylu, miyavlar") yoksa cok sayida kedi fotografi mi gosterirsin?', AMBER_BG, AMBER),
    calloutBox("Biliyor Muydunuz?", "Google'in YZ'si bir gunde 10 milyon kedili fotografi analiz edebilir!", AMBER_BG, AMBER),
    emptyLine(),

    // Ogrenme Turleri
    h2("2. Makine Ogrenimi Turleri"),
    h3("Gozetimli Ogrenme (Supervised Learning)"),
    bodyText("Her veri icin dogru cevap (etiket) verilir. Model, girdi-cikti iliskisini ogrenir. EN YAYGIN TUR."),
    bulletItem('E-posta: "spam" veya "spam degil" siniflandirmasi'),
    bulletItem('"kedi" veya "kopek" goruntu tanima'),
    bulletItem("Ev fiyati tahmini (m2, oda sayisi -> fiyat)"),
    emptyLine(),
    h3("Gozetimsiz Ogrenme (Unsupervised Learning)"),
    bodyText("Etiket yoktur. Model verideki gizli oruntuleri ve gruplari kendisi kesfeder."),
    bulletItem("Musteri segmentasyonu (benzer musterileri gruplama)"),
    bulletItem("Haber konularini otomatik gruplama"),
    bulletItem("Anormal davranis tespiti"),
    emptyLine(),
    h3("Pekistirmeli Ogrenme (Reinforcement Learning)"),
    bodyText("Model deneme-yanilma ile ogrenir. Dogru davranislar odul, yanlis davranislar ceza alir."),
    bulletItem("AlphaGo - Go oyununu ogrenen YZ"),
    bulletItem("Robotlarin yurumesini ogrenmesi"),
    bulletItem("Otonom araclarin surusu ogrenmesi"),
    emptyLine(),

    // Siniflandirma ve Tahmin
    h2("3. Siniflandirma ve Tahmin"),
    simpleTable(
      ["Ozellik", "Siniflandirma", "Tahmin (Regresyon)"],
      [
        ["Cikti", "Kategori (sinif)", "Sayi (deger)"],
        ["Ornek", "Kedi mi kopek mi?", "Evin fiyati kac TL?"],
        ["Ornek 2", "Spam mi degil mi?", "Yarin sicaklik kac derece?"],
        ["Sonuc turu", "Ayrik (2+ sinif)", "Surekli (sayisal)"],
      ]
    ),
    emptyLine(),

    // Karar Agaci
    h2("4. Karar Agaci ile Siniflandirma"),
    bodyText("Karar agaci, en anlasilir makine ogrenimi algoritmalarindan biridir. Her dugumde bir soru sorulur ve cevaba gore dallanilir."),
    bodyText("Ornek: Meyve tanima karar agaci"),
    numberedItem(1, "Rengi kirmizi mi? -> Evet -> Yuvarlak mi? -> Evet -> Elma / Hayir -> Cilek"),
    numberedItem(2, "Rengi kirmizi mi? -> Hayir -> Sari mi? -> Evet -> Muz / Hayir -> Portakal"),
    emptyLine(),
    calloutBox("Dikkat:", 'Karar agaci cok derinlesirse "asiri uyum" (overfitting) problemi olusabilir. Agacin basit ama etkili olmasi onemlidir!', AMBER_BG, AMBER),
    emptyLine(),

    // Teachable Machine
    h2("5. Teachable Machine ile Model Egitimi"),
    bodyText("Google Teachable Machine, kodlama bilmeden kendi YZ modelinizi egitmenizi saglar. Uc turde model egitebilirsiniz: Goruntu, Ses ve Poz."),
    h3("Adim Adim: Goruntu Siniflandirma Modeli"),
    numberedItem(1, "Sinif Olustur: En az 2 sinif olusturun (ornek: 'Kedi' ve 'Kopek')"),
    numberedItem(2, "Ornek Topla: Her sinif icin en az 50 fotograf cekin veya yukleyin"),
    numberedItem(3, "Modeli Egit: 'Train Model' butonuna basin. Model orneklerden ogrenir"),
    numberedItem(4, "Test Et: Kameranizi acin veya yeni fotograf yukleyin. Model dogru mu tahmin ediyor?"),
    numberedItem(5, "Gelistir: Basari dusukse daha fazla ornek ekleyin, farkli acilardan fotograflar cekin"),
    emptyLine(),
    calloutBox("Biliyor Muydunuz?", "GPT-4 modeli yaklasik 1 trilyon parametreye sahiptir ve internetin buyuk bir bolumundeki metin verileriyle egitilmistir. Egitim sureci aylarca surmus ve milyonlarca dolar maliyeti olmustur. Ama siz Teachable Machine ile dakikalar icinde kendi modelinizi egitebilirsiniz!", AMBER_BG, AMBER),
    emptyLine(),

    // Etkinlikler
    h2("Etkinlikler"),
    ...activityBlock("Etkinlik 1: Meyve Siniflandirici", "UNPLUGGED", "25 dakika - Grup calismasi", "Meyve resimlerini kesin. Ozellik kartlarini (renk, sekil, boyut) kullanarak kendi karar agacinizi olusturun. Arkadaslarinizin karar agaciyla sizinkini karsilastirin.", "Meyve resimleri, ozellik kartlari, siniflandirma panosu, makas"),
    emptyLine(),
    ...activityBlock("Etkinlik 2: Teachable Machine - Goruntu Modeli", "BILGISAYARLI", "40 dakika - Bireysel", "teachablemachine.withgoogle.com adresine gidin. Iki sinifli bir goruntu siniflandirma modeli egitin (ornek: kalem/silgi, el/yumruk). En az 50 ornek toplayin. Modelinizi test edin.", null),
    emptyLine(),
    ...activityBlock("Etkinlik 3: ML for Kids - Siniflandirma", "BILGISAYARLI", "30 dakika - Bireysel", 'machinelearningforkids.co.uk adresinde bir proje olusturun. Metin siniflandirma projesi yapin: "mutlu" ve "uzgun" cumleleri ayiran bir model egitin.', null),
    emptyLine(),
    ...activityBlock("Etkinlik 4: Model Basari Raporu", "UNPLUGGED", "20 dakika - Grup tartismasi", 'Egittiginiz modelin basari oranini sinifla paylasin. Hangi modeller daha basarili? Neden? Tartisarak "iyi bir model" icin nelerin gerektigini listeleyin.', null),
    emptyLine(),

    qrPlaceholder(4),
    emptyLine(),

    // Quiz
    h2("Degerlendirme Sorulari"),
    ...quizQuestion(1, { soru: "Makine ogrenimi icin en dogru tanim hangisidir?", secenekler: ["Bilgisayarlarin insan gibi dusunmesi", "Makinelerin veriden oruntu ogrenerek tahmin yapmasi", "Robotlarin fiziksel olarak ogrenmesi", "Programcilarin her kurali tek tek yazmasi"], dogru: 1, aciklama: "Makine ogrenimi, makinelerin acikca programlanmadan verilerden oruntu kesfetmesi ve bu oruntulerle tahmin yapmasidir." }),
    ...quizQuestion(2, { soru: "Google Teachable Machine ile hangi tur model egitilebilir?", secenekler: ["Sadece ses tanima", "Goruntu, ses ve vucut pozu tanima", "Sadece metin siniflandirma", "Sadece yuz tanima"], dogru: 1, aciklama: "Teachable Machine uc farkli model turunu destekler: goruntu siniflandirma, ses tanima ve vucut pozu tanima." }),
    ...quizQuestion(3, { soru: "Bir makine ogrenimi modelini egitirken 'egitim verisi' ne ise yarar?", secenekler: ["Modelin performansini test etmek", "Modelin oruntuleri ogrenmesini saglamak", "Modeli internete baglamak", "Modelin hizini artirmak"], dogru: 1, aciklama: "Egitim verisi, modelin oruntuleri ve iliskileri ogrendigi veri setidir." }),
    ...quizQuestion(4, { soru: "Asagidakilerden hangisi 'gozetimli ogrenme' ornegi DEGILDIR?", secenekler: ["Etiketli fotograflarla kedi/kopek ayirma", "Spam/spam degil e-posta siniflandirma", "Musterileri otomatik gruplara ayirma (etiket olmadan)", "Ev fiyati tahmini"], dogru: 2, aciklama: "Etiket olmadan gruplama 'gozetimsiz ogrenme' ornegidir." }),
    ...quizQuestion(5, { soru: "Bir modelin egitim verisinde cok iyi, yeni verilerde kotu performans gostermesine ne denir?", secenekler: ["Overfitting (asiri uyum)", "Underfitting (yetersiz uyum)", "Transfer ogrenimi", "Pekistirmeli ogrenme"], dogru: 0, aciklama: "Overfitting, modelin egitim verisini 'ezberlemesi' anlamina gelir." }),
  ];
  return createDocument(4, "Makineler Nasil Ogrenir?", "Makine Ogrenimi Temelleri", sections);
}

// =============== CHAPTER 5 ===============
function chapter5() {
  const sections = [
    ...titlePage(5, "Uretken Yapay Zeka", "YZ Araclariyla Tanisin"),

    h2("Neler Ogrenecegiz?"),
    bulletItem("Uretken yapay zeka kavramini ve temel calisma prensibini anlayacagiz."),
    bulletItem("ChatGPT, Gemini gibi buyuk dil modellerini (LLM) taniyacagiz."),
    bulletItem("Etkili prompt (istem) yazma tekniklerini ogrenecegiz."),
    bulletItem("YZ ile metin, goruntu ve ses uretme deneyimi kazanacagiz."),
    bulletItem("YZ kullaniminda etik kurallari ve akademik durustuluyu tartisacagiz."),
    emptyLine(),

    h3("Anahtar Kavramlar"),
    bodyText("uretken YZ, LLM, prompt, chatbot, goruntu uretme, halusinasyon, etik kullanim"),
    emptyLine(),

    // Uretken YZ Nedir
    h2("1. Uretken YZ Nedir?"),
    bodyText("Uretken yapay zeka, daha once var olmayan yeni icerikler ureten YZ sistemleridir. Metin yazabilir, resim cizebilir, muzik besteleyebilir, kod yazabilir ve daha fazlasini yapabilir!"),
    simpleTable(
      ["Tur", "Araclar", "Ne Yapar?"],
      [
        ["Metin", "ChatGPT, Gemini, Claude", "Makale, siir, kod, hikaye yazma"],
        ["Goruntu", "DALL-E, Midjourney, Stable Diffusion", "Fotografik goruntu ve sanat uretme"],
        ["Ses/Muzik", "Suno, Udio, ElevenLabs", "Sarki, seslendirme, ses klonlama"],
        ["Video", "Sora, Runway", "Kisa videolar ve animasyonlar"],
      ]
    ),
    emptyLine(),
    calloutBox("Biliyor Muydunuz?", "ChatGPT, egitimi sirasinda internetteki milyarlarca kelimeyi okudu!", AMBER_BG, AMBER),
    emptyLine(),

    // LLM
    h2("2. Buyuk Dil Modelleri (LLM)"),
    bodyText('ChatGPT, Gemini, Claude gibi araclar "buyuk dil modeli" (Large Language Model) teknolojisini kullanir. Bu modeller milyarlarca metin orneginden dil oruntuleri ogrenmistir.'),
    h3("Nasil Calisir?"),
    bodyText("LLM, bir cumledeki her kelimeden sonra en muhtemel kelimeyi tahmin eder. Cok gelismis bir 'kelime tahmini' sistemidir."),
    h3("Ne Bilir?"),
    bodyText("Egitim verilerindeki bilgileri 'ogrenmistir' ama gercek anlamda anlamaz. Kaliplari ve oruntuleri kullanir."),
    h3("Siniri Ne?"),
    bodyText("Bazen yanlis bilgi uretebilir (halusinasyon). Her zaman dogrulayin! Egitim tarihinden sonraki olaylari bilmez."),
    emptyLine(),
    calloutBox("Ipucu:", 'LLM\'ler "anlama" degil "oruntu eslestirme" yapar. Bu yuzden bazen cok ikna edici ama yanlis cevaplar verebilirler!', LIGHT_BLUE, BLUE),
    emptyLine(),

    // Prompt Muhendisligi
    h2("3. Prompt Muhendisligi: YZ'ye Nasil Soru Sorulur?"),
    bodyText("Prompt (istem), YZ'ye verdiginiz talimattir. Iyi bir prompt = iyi bir sonuc!"),
    simpleTable(
      ["Kotu Prompt", "Iyi Prompt", "Neden?"],
      [
        ["Bana bir sey yaz", "6. sinif ogrencisi icin yapay zeka hakkinda 100 kelimelik bir paragraf yaz", "Konu, hedef kitle ve uzunluk belirtilmis"],
        ["Ciz", "Uzayda yuzen bir astronot kedinin dijital resmi, karikatur tarzinda", "Konu, stil ve detay verilmis"],
        ["Matematik yap", "Bu denklemi adim adim coz: 3x + 7 = 22", "Spesifik problem ve yontem belirtilmis"],
        ["Kod yaz", "Python ile 1'den 100'e kadar asal sayilari bulan bir program yaz", "Dil, gorev ve format belirtilmis"],
      ]
    ),
    emptyLine(),
    h3("Iyi Prompt Formulu"),
    bulletItem("Rol: Sen bir tarih ogretmenisin..."),
    bulletItem("Gorev: ...6. siniflar icin bir ders notu yaz..."),
    bulletItem("Baglam: ...konu: Osmanli Devleti'nin kurulusu..."),
    bulletItem("Format: ...madde isareti ile, en fazla 200 kelime."),
    emptyLine(),

    // Halusinasyon
    h2("4. YZ Halusinasyonu: Dikkat!"),
    bodyText('YZ bazen cok inandirici gorunen ama tamamen yanlis bilgiler uretebilir. Buna "halusinasyon" denir.'),
    h3("Halusinasyon Ornekleri"),
    bulletItem("Var olmayan kitaplar/makaleler uydurma"),
    bulletItem("Yanlis tarihler ve istatistikler verme"),
    bulletItem("Olmayan kisiler hakkinda bilgi uretme"),
    bulletItem("Yanlis matematik sonuclari gosterme"),
    h3("Nasil Korunuruz?"),
    bulletItem("Her bilgiyi baska kaynaklardan dogrulayin"),
    bulletItem("Kritik konularda tek kaynak olarak kullanmayin"),
    bulletItem('"Emin misin?" diye sorun ve kaynak isteyin'),
    bulletItem("Saglik, hukuk gibi konularda uzmana danisin"),
    emptyLine(),

    // Etik Kullanim
    h2("5. Etik Kullanim ve Akademik Durustluk"),
    bodyText("YZ guclu bir aractir ama sorumlulukla kullanilmalidir:"),
    h3("YZ bir yardimcidir, yerine gecen degil"),
    bodyText("Odevi YZ'ye yaptirip kendi odevin gibi sunma. YZ'yi fikir uretme, duzeltme ve ogrenme araci olarak kullan."),
    h3("Kaynak belirt"),
    bodyText("YZ ile urettigin icerigi paylasirken 'YZ destegi ile hazirlanmistir' diye belirt."),
    h3("Dogrula"),
    bodyText("YZ'nin verdigi bilgileri mutlaka baska kaynaklardan kontrol et."),
    h3("Kisisel bilgi paylasma"),
    bodyText("YZ araclarina kisisel bilgilerini (adres, telefon, TC kimlik no vb.) verme."),
    emptyLine(),

    // Etkinlikler
    h2("Etkinlikler"),
    ...activityBlock("Etkinlik 1: Prompt Duellosu", "UNPLUGGED", "25 dakika - Ikili calisma", "Prompt kartlarini cekin. Her kartta bir gorev yazilidir. Ikili takimlar halinde ayni gorev icin farkli promptlar yazin. Hangi prompt daha iyi sonuc verir? Sinifca oylayarak en iyi promptlari secin.", "Prompt kartlari, puanlama tablosu, kalem"),
    emptyLine(),
    ...activityBlock("Etkinlik 2: ChatGPT / Gemini ile Tanisma", "BILGISAYARLI", "30 dakika - Bireysel", "Bir uretken YZ aracini acin. Kendinizi tanitan bir paragraf yazdirin, bir siir yazdirin, bir matematik problemi cozdurmeyi deneyin, yanlis bilgi uretmesini saglayip halusinasyonu tespit edin.", null),
    emptyLine(),
    ...activityBlock("Etkinlik 3: YZ ile Goruntu Uretme", "BILGISAYARLI", "25 dakika - Bireysel", "Bir goruntu uretme aracini kullanin (Bing Image Creator, Canva AI vb.). Farkli prompt teknikleriyle ayni konuda 3 farkli goruntu uretin. Hangi prompt en iyi sonucu verdi? Neden?", null),
    emptyLine(),
    ...activityBlock("Etkinlik 4: YZ Etik Mahkemesi", "UNPLUGGED", "20 dakika - Sinif tartismasi", 'Senaryo kartlarindaki durumlari okuyun. Her senaryo icin "Etik mi?" sorusunu tartisarak sinifca karar verin.', "Senaryo kartlari"),
    emptyLine(),

    qrPlaceholder(5),
    emptyLine(),

    // Quiz
    h2("Degerlendirme Sorulari"),
    ...quizQuestion(1, { soru: "Uretken yapay zeka (Generative AI) ne yapar?", secenekler: ["Sadece var olan verileri analiz eder", "Yeni ve orijinal icerikler (metin, goruntu, ses) uretir", "Sadece arama motoru gibi calisir", "Sadece matematik problemleri cozer"], dogru: 1, aciklama: "Uretken YZ, egitildigi verilerden ogrendiklerini kullanarak daha once var olmayan yeni icerikler uretebilir." }),
    ...quizQuestion(2, { soru: "ChatGPT, Gemini gibi araclar hangi YZ teknolojisini kullanir?", secenekler: ["Gozetimli siniflandirma", "Buyuk dil modelleri (LLM)", "Bilgisayar gorusu", "Pekistirmeli ogrenme"], dogru: 1, aciklama: "Bu araclar milyarlarca parametreye sahip buyuk dil modelleri (Large Language Models) kullanir." }),
    ...quizQuestion(3, { soru: "Iyi bir prompt (istem) yazmak icin asagidakilerden hangisi en onemlidir?", secenekler: ["Cok uzun ve karmasik yazmak", "Acik, net ve baglam iceren talimatlar vermek", "Sadece tek kelime yazmak", "Her zaman Ingilizce yazmak"], dogru: 1, aciklama: "Iyi bir prompt; acik, net ve yeterli baglam icerir." }),
    ...quizQuestion(4, { soru: "YZ ile uretilen bir icerigi kendi odeviniz gibi sunmak dogru mudur?", secenekler: ["Evet, cunku YZ cok akilli", "Hayir, bu etik degildir ve akademik durustuluye aykiridir", "Sadece kucuk odevlerde dogru", "Ogretmen fark etmezse sorun yok"], dogru: 1, aciklama: "YZ'nin urettigi icerigi kendinize ait gibi gostermek etik degildir." }),
    ...quizQuestion(5, { soru: "Asagidakilerden hangisi uretken YZ ile YAPILAMAZ?", secenekler: ["Bir siir yazmak", "Bir resim olusturmak", "Gercek dunya deneyimi yasamak", "Kod yazmak"], dogru: 2, aciklama: "YZ metin, goruntu, ses, kod uretebilir ama gercek dunya deneyimi yasamak (tatmak, koklamak, hissetmek) yapamaz!" }),
  ];
  return createDocument(5, "Uretken Yapay Zeka", "YZ Araclariyla Tanisin", sections);
}

// =============== MAIN ===============
async function main() {
  const chapters = [
    { fn: chapter1, file: "bolum-01-yapay-zeka-nedir.docx" },
    { fn: chapter2, file: "bolum-02-gunluk-hayatta-yz.docx" },
    { fn: chapter3, file: "bolum-03-verinin-gucu.docx" },
    { fn: chapter4, file: "bolum-04-makineler-nasil-ogrenir.docx" },
    { fn: chapter5, file: "bolum-05-uretken-yapay-zeka.docx" },
  ];

  for (const ch of chapters) {
    const doc = ch.fn();
    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(OUTPUT_DIR, ch.file);
    fs.writeFileSync(outPath, buffer);
    console.log(`Created: ${outPath}`);
  }

  console.log("\nAll 5 chapter Word documents created successfully!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
