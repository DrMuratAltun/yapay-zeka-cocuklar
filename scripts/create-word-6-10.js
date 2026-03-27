/**
 * Yapay Zeka Macerasi - Bolum 6-10 Word (.docx) Olusturucu
 * Dr. Murat ALTUN - GencYZ
 *
 * Kullanim: node scripts/create-word-6-10.js
 */

const docx = require("docx");
const fs = require("fs");
const path = require("path");

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle,
  PageNumber, NumberFormat, Footer, Header,
  ShadingType, TableLayoutType, VerticalAlign,
  PageBreak,
} = docx;

// ===== RENKLER =====
const BLUE = "2563EB";
const AMBER = "F59E0B";
const AMBER_BG = "FFF7ED";
const SKY_BG = "F0F9FF";
const LIGHT_BLUE_BG = "EFF6FF";
const WHITE = "FFFFFF";
const BLACK = "000000";
const GRAY = "6B7280";
const ROSE = "E11D48";
const ROSE_BG = "FFF1F2";
const EMERALD = "059669";
const EMERALD_BG = "ECFDF5";

// ===== YARDIMCI FONKSIYONLAR =====
const cm = (n) => Math.round(n * 567); // cm -> twip

function createTitlePage(bolumNo, baslik, altBaslik) {
  return [
    new Paragraph({ spacing: { before: 4000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `BOLUM ${bolumNo}`,
          bold: true, size: 56, color: BLUE, font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: baslik,
          bold: true, size: 44, color: BLACK, font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: altBaslik,
          italics: true, size: 28, color: GRAY, font: "Arial",
        }),
      ],
    }),
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "Yapay Zeka Macerasi",
          bold: true, size: 28, color: BLUE, font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "GencYZ - Dr. Murat ALTUN",
          size: 24, color: GRAY, font: "Arial",
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true, size: 28, color: BLUE, font: "Arial",
      }),
    ],
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        bold: true, size: 24, color: BLUE, font: "Arial",
      }),
    ],
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { after: 150 },
    children: [
      new TextRun({ text, size: 24, font: "Arial" }),
    ],
  });
}

function bulletItem(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [
      new TextRun({ text, size: 24, font: "Arial" }),
    ],
  });
}

function numberedItem(num, title, desc) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 24, font: "Arial", color: BLUE }),
      new TextRun({ text: `${title} `, bold: true, size: 24, font: "Arial" }),
      new TextRun({ text: `\u2014 ${desc}`, size: 24, font: "Arial", color: GRAY }),
    ],
  });
}

function calloutBox(title, text, bgColor = AMBER_BG) {
  const borderColor = bgColor === AMBER_BG ? AMBER : (bgColor === SKY_BG ? "38BDF8" : "10B981");
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: bgColor },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
              left: { style: BorderStyle.SINGLE, size: 12, color: borderColor },
              right: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            },
            children: [
              new Paragraph({
                spacing: { before: 100, after: 50 },
                children: [
                  new TextRun({ text: title, bold: true, size: 22, font: "Arial", color: bgColor === AMBER_BG ? "92400E" : (bgColor === SKY_BG ? "0369A1" : "065F46") }),
                ],
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({ text, size: 22, font: "Arial" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function spacer(before = 200) {
  return new Paragraph({ spacing: { before, after: 0 }, children: [] });
}

function activityBlock(type, duration, title, description) {
  const typeColor = type === "UNPLUGGED" ? EMERALD : (type === "PROJE" ? "6366F1" : BLUE);
  const typeBg = type === "UNPLUGGED" ? EMERALD_BG : (type === "PROJE" ? "EEF2FF" : LIGHT_BLUE_BG);
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: typeBg },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: typeColor },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: typeColor },
              left: { style: BorderStyle.SINGLE, size: 2, color: typeColor },
              right: { style: BorderStyle.SINGLE, size: 2, color: typeColor },
            },
            children: [
              new Paragraph({
                spacing: { before: 100, after: 50 },
                children: [
                  new TextRun({ text: `[${type}] `, bold: true, size: 20, font: "Arial", color: typeColor }),
                  new TextRun({ text: duration, size: 20, font: "Arial", color: GRAY }),
                ],
              }),
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({ text: title, bold: true, size: 24, font: "Arial" }),
                ],
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({ text: description, size: 22, font: "Arial" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function quizBlock(questions) {
  const items = [];
  items.push(heading2("Degerlendirme Testi"));
  questions.forEach((q, i) => {
    items.push(new Paragraph({
      spacing: { before: 250, after: 100 },
      children: [
        new TextRun({ text: `${i + 1}. ${q.soru}`, bold: true, size: 24, font: "Arial" }),
      ],
    }));
    q.secenekler.forEach((s, j) => {
      const letter = String.fromCharCode(65 + j);
      const isCorrect = j === q.dogru;
      items.push(new Paragraph({
        spacing: { after: 40 },
        indent: { left: 400 },
        children: [
          new TextRun({
            text: `${letter}) ${s}`,
            size: 22, font: "Arial",
            bold: isCorrect,
            color: isCorrect ? EMERALD : BLACK,
          }),
        ],
      }));
    });
    items.push(new Paragraph({
      spacing: { before: 80, after: 150 },
      indent: { left: 400 },
      children: [
        new TextRun({ text: "Cevap: ", bold: true, size: 20, font: "Arial", color: BLUE }),
        new TextRun({ text: `${String.fromCharCode(65 + q.dogru)} \u2014 ${q.aciklama}`, size: 20, font: "Arial", color: GRAY }),
      ],
    }));
  });
  return items;
}

function qrPlaceholder(bolumNo) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: LIGHT_BLUE_BG },
            borders: {
              top: { style: BorderStyle.DASHED, size: 1, color: BLUE },
              bottom: { style: BorderStyle.DASHED, size: 1, color: BLUE },
              left: { style: BorderStyle.DASHED, size: 1, color: BLUE },
              right: { style: BorderStyle.DASHED, size: 1, color: BLUE },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 150, after: 50 },
                children: [
                  new TextRun({ text: "[QR KOD]", bold: true, size: 22, font: "Arial", color: BLUE }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 150 },
                children: [
                  new TextRun({ text: `Bu etkinligin interaktif versiyonu: gencyz.com/bolumler/${bolumNo}`, size: 20, font: "Arial", color: GRAY }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function simpleTable(headers, rows, headerColor = BLUE) {
  const hRow = new TableRow({
    tableHeader: true,
    children: headers.map((h) =>
      new TableCell({
        shading: { type: ShadingType.CLEAR, fill: headerColor },
        children: [
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [new TextRun({ text: h, bold: true, size: 20, font: "Arial", color: WHITE })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell) =>
        new TableCell({
          shading: ri % 2 === 0 ? { type: ShadingType.CLEAR, fill: "F9FAFB" } : undefined,
          children: [
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [new TextRun({ text: cell, size: 20, font: "Arial" })],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [hRow, ...dataRows],
  });
}

function createFooter(bolumNo) {
  return {
    default: new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: `\u00A9 2025 Dr. Murat ALTUN - GencYZ | Sayfa `, size: 18, font: "Arial", color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: GRAY }),
          ],
        }),
      ],
    }),
  };
}

// ===== BOLUM 6 =====
function createBolum6() {
  const children = [
    ...createTitlePage(6, "Blok Tabanli YZ Kodlama", "PictoBlox Projeleri"),

    // Kazanimlar
    heading2("Neler Ogrenecegiz?"),
    bulletItem("PictoBlox ortamini taniyacak ve YZ uzantilarini kullanacagiz."),
    bulletItem("Blok tabanli kodlama ile goruntu siniflandirma projesi yapacagiz."),
    bulletItem("ML for Kids ile Scratch'te YZ projesi gelistirecegiz."),
    bulletItem("Ses tanima ve metin siniflandirma projeleri deneyimleyecegiz."),
    bulletItem("Kendi YZ destekli oyunumuzu/uygulamamizi tasarlayacagiz."),
    spacer(),

    // Anahtar Kavramlar
    heading3("Anahtar Kavramlar"),
    bodyText("PictoBlox \u2022 ML for Kids \u2022 blok kodlama \u2022 goruntu siniflandirma \u2022 ses tanima \u2022 uzanti"),
    spacer(),

    // 1. PictoBlox Nedir?
    heading2("1. PictoBlox Nedir?"),
    bodyText("PictoBlox, Scratch tabanli bir kodlama ortamidir ve ozel YZ uzantilari icerir. Surukle-birak bloklarla yapay zeka projeleri gelistirmenizi saglar. Ucretsiz indirilebilir ve web tarayicisinda da calisir."),
    spacer(100),
    simpleTable(
      ["\u00D6zellik", "Aciklama"],
      [
        ["Blok Kodlama", "Scratch benzeri surukle-birak arayuz"],
        ["YZ Uzantilari", "ML, yuz tanima, ses tanima, NLP"],
        ["Donanim Destegi", "Arduino, Raspberry Pi baglantisi"],
      ]
    ),
    spacer(),
    calloutBox("Biliyor Muydunuz?", "Scratch'i dunya genelinde 100 milyondan fazla cocuk kullaniyor!"),
    spacer(),

    // 2. Goruntu Siniflandirma
    heading2("2. PictoBlox ile Goruntu Siniflandirma"),
    bodyText("Adim adim bir goruntu siniflandirma projesi yapalim:"),
    numberedItem(1, "PictoBlox'u Ac", "ai.thestempedia.com adresinden web surumunu acin veya masaustu uygulamayi indirin."),
    numberedItem(2, "ML Uzantisini Ekle", "Uzantilar bolumunden 'Machine Learning' uzantisini projeye ekleyin."),
    numberedItem(3, "Siniflar Olustur", "En az 2 sinif olusturun. Ornek: 'Tas', 'Kagit', 'Makas'"),
    numberedItem(4, "Ornekler Topla", "Her sinif icin kamerayla en az 30 ornek goruntu kaydedin. Farkli acilardan cekin!"),
    numberedItem(5, "Modeli Egit", "'Train Model' butonuna basin. Egitim birkac dakika surebilir."),
    numberedItem(6, "Kodlama Yap", "'Eger sinif = Tas ise ... soyle' seklinde kosullu bloklar ekleyin."),
    numberedItem(7, "Test Et ve Gelistir", "Projeyi calistirin, test edin. Hatali sonuclarda daha fazla ornek ekleyin."),
    spacer(),
    calloutBox("Ipucu", "Model egitirken farkli acilardan, farkli isik kosullarinda fotograf cekin. Ne kadar cesitli veri, o kadar basarili model!", SKY_BG),
    spacer(),

    // 3. ML for Kids + Scratch
    heading2("3. ML for Kids + Scratch"),
    bodyText("ML for Kids, makine ogrenimi modellerini egitip Scratch'te kullanmanizi saglayan ucretsiz bir platformdur."),
    spacer(100),
    simpleTable(
      ["Adim", "Yapilacak", "Detay"],
      [
        ["1. Proje Olustur", "Yeni proje > Tanimlama secenegi", "Metin, goruntu veya sayi secin"],
        ["2. Egitim Verisi", "Her sinif icin en az 10 ornek ekle", "Ne kadar cok ornek, o kadar iyi"],
        ["3. Model Egit", "Ogren ve test et butonuna bas", "Model orneklerden ogrenir"],
        ["4. Scratch'te Kullan", "Scratch 3 ile ac", "ML bloklari otomatik eklenir"],
      ]
    ),
    spacer(),
    calloutBox("Dikkat", "ML for Kids'te model egitmeden once her sinifa en az 10 ornek eklemeyi unutmayin. Yetersiz veri = dusuk dogruluk!"),
    spacer(),

    // 4. Proje Fikirleri
    heading2("4. Proje Fikirleri"),
    heading3("Tas-Kagit-Makas Oyunu (Baslangic)"),
    bodyText("Kamera ile el hareketlerini taniyarak bilgisayara karsi oyna."),
    heading3("Duygu Tanima Aynasi (Orta)"),
    bodyText("Yuz ifadelerini taniyarak mutlu, uzgun, saskin tepkiler veren program."),
    heading3("Geri Donusum Asistani (Orta)"),
    bodyText("Atiklari kamera ile taniyarak dogru geri donusum kutusunu gosteren sistem."),
    heading3("Sesle Kontrol (Ileri)"),
    bodyText("Ses komutlariyla (saga git, sola git, dur) karakteri yonlendiren oyun."),
    spacer(),

    // Etkinlikler
    heading2("Etkinlikler"),
    activityBlock("UNPLUGGED", "20 dakika \u2022 Grup calismasi", "Etkinlik 1: Algoritma Sefi", "Bir yemek tarifini akis diyagrami olarak cizip, 'eger ... ise' kosullarini belirleyin. Ornegin: 'Eger yumurta varsa omlet yap, yoksa tost yap.' Bu akis diyagramini Scratch/PictoBlox bloklarina cevirmeyi deneyin."),
    spacer(),
    activityBlock("BILGISAYARLI", "45 dakika \u2022 Bireysel", "Etkinlik 2: PictoBlox - Tas Kagit Makas", "PictoBlox'ta ML uzantisini kullanarak Tas-Kagit-Makas oyunu yapin. 3 sinif olusturun, her sinif icin 30+ ornek toplayin, modeli egitin ve oyunu kodlayin."),
    spacer(),
    activityBlock("BILGISAYARLI", "40 dakika \u2022 Bireysel", "Etkinlik 3: ML for Kids - Duygu Analizi", "ML for Kids'te metin siniflandirma projesi olusturun. 'Mutlu' ve 'Uzgun' cumleleri ayiran bir model egitin. Scratch'te kullanicinin yazdigi cumleye gore karakterin yuz ifadesini degistiren bir program yapin."),
    spacer(),

    // QR
    qrPlaceholder(6),
    spacer(),

    // Quiz
    ...quizBlock([
      { soru: "PictoBlox hangi programlama yaklasimini kullanir?", secenekler: ["Metin tabanli kodlama", "Blok tabanli (surukle-birak) kodlama", "Komut satiri programlama", "Sadece Python"], dogru: 1, aciklama: "PictoBlox, Scratch benzeri blok tabanli bir arayuz sunar. Bloklari surukleyerek YZ projeleri olusturabilirsiniz." },
      { soru: "PictoBlox'ta bir goruntu siniflandirma projesi icin ilk yapilmasi gereken nedir?", secenekler: ["Kodu yazmak", "Modeli egitmek (siniflar olusturup ornek toplamak)", "Sahneyi tasarlamak", "Ses kaydi yapmak"], dogru: 1, aciklama: "Once siniflar olusturulur ve her sinif icin ornekler toplanir. Model egitildikten sonra kodlama yapilir." },
      { soru: "Asagidakilerden hangisi PictoBlox'un YZ uzantisi DEGILDIR?", secenekler: ["Machine Learning", "Yuz Tanima (Face Detection)", "Metin Siniflandirma", "3D Modelleme"], dogru: 3, aciklama: "PictoBlox'ta ML, yuz tanima, metin siniflandirma, ses tanima gibi YZ uzantilari vardir ama 3D modelleme YZ uzantisi degildir." },
      { soru: "Scratch'te bir YZ projesinde 'eger ... ise' blogu ne ise yarar?", secenekler: ["Programi durdurur", "Modelin tahmin sonucuna gore farkli islemler yapar", "Sadece ses calar", "Internete baglanir"], dogru: 1, aciklama: "Kosul bloklari, modelin tahmin sonucuna gore programin farkli davranislar gostermesini saglar." },
      { soru: "ML for Kids platformunda Scratch ile YZ projesi yapmak icin hangi adimlar izlenir?", secenekler: ["Proje olustur > Egitim verisi ekle > Model egit > Scratch'te kullan", "Sadece Scratch'i ac ve kod yaz", "Sadece veri topla", "Sadece model egit"], dogru: 0, aciklama: "ML for Kids'te 4 adimli bir surec izlenir: proje olusturma, veri ekleme, model egitme ve Scratch'te kullanma." },
    ]),
  ];

  return children;
}

// ===== BOLUM 7 =====
function createBolum7() {
  const children = [
    ...createTitlePage(7, "Gercek Hayat Problemleri", "STEM Tabanli YZ Cozumleri"),

    heading2("Neler Ogrenecegiz?"),
    bulletItem("Gercek dunya problemlerini YZ ile cozme yaklasimini ogrenecegiz."),
    bulletItem("Tasarim Dusuncesi (Design Thinking) metodolojisini uygulayacagiz."),
    bulletItem("STEM (Bilim, Teknoloji, Muhendislik, Matematik) tabanli proje gelistirecegiz."),
    bulletItem("Problem tanimlama, veri toplama, model secimi ve test sureclerini deneyimleyecegiz."),
    bulletItem("Ekip calismasi ve proje yonetimi becerilerini gelistirecegiz."),
    spacer(),

    heading3("Anahtar Kavramlar"),
    bodyText("tasarim dusuncesi \u2022 STEM \u2022 problem cozme \u2022 prototip \u2022 MVP \u2022 ekip calismasi \u2022 proje yonetimi"),
    spacer(),

    heading2("1. Tasarim Dusuncesi (Design Thinking)"),
    bodyText("YZ ile problem cozmek icin sistematik bir yaklasim gerekir. Tasarim Dusuncesi bize bu yaklasimi saglar:"),
    numberedItem(1, "Empati Kur", "Problemden etkilenen insanlari anla. Onlarla konus, gozlemle, yasadiklari zorlugu hisset."),
    numberedItem(2, "Problemi Tanimla", "Sorunu net bir cumleyle ifade et: 'Kim, ne, neden?' Kotu tanimlanmis problem cozulemez."),
    numberedItem(3, "Fikir Uret", "Mumkun oldugunca cok fikir uret. Beyin firtinasi yap. Hicbir fikri elestirme, once cok uret."),
    numberedItem(4, "Prototip Yap", "En umut verici fikri hizlica basit bir prototipe donustur (kagit uzerinde, Scratch'te, Teachable Machine'de)."),
    numberedItem(5, "Test Et", "Prototipini gercek kullanicilarla test et. Geri bildirim al, gelistir, tekrar test et."),
    spacer(),
    calloutBox("Biliyor Muydunuz?", "Yapay zeka, doktorlardan %20 daha dogru kanser teshisi koyabiliyor!"),
    spacer(),

    heading2("2. Ornek Problemler ve YZ Cozumleri"),
    simpleTable(
      ["Problem", "Cozum", "Araclar"],
      [
        ["Okul kantininde israf", "Kameralarla yemek israfini tespit eden YZ sistemi", "Teachable Machine + PictoBlox"],
        ["Siniflarda gurultu", "Ses seviyesini olcup uyari veren akilli sistem", "PictoBlox ses tanima"],
        ["Bitki bakimi unutma", "Toprak nemini izleyip sulama hatirlatmasi yapan uygulama", "ML for Kids + Scratch"],
        ["Cop siniflandirma", "Atiklari otomatik siniflandiran geri donusum asistani", "Teachable Machine goruntu"],
        ["Otopark sorunu", "Bos park yerlerini tespit eden kamera sistemi", "Bilgisayar gorusu"],
        ["Hasta bitki tespiti", "Yaprak fotograflarindan hastalik teshisi yapan model", "Teachable Machine"],
      ]
    ),
    spacer(),
    calloutBox("Ipucu", "Problemi secerken 'Bu problem beni veya cevremdeki insanlari etkiliyor mu?' diye sorun. Kisisel baglanti motivasyonu artirir!", SKY_BG),
    spacer(),

    heading2("3. Proje Planlama Sablonu"),
    simpleTable(
      ["Asama", "Sorular", "Sure"],
      [
        ["Problem", "Hangi problemi cozecegiz? Kimi etkiliyor? Neden onemli?", "1 ders"],
        ["Arastirma", "Benzer cozumler var mi? Hangi veriler lazim? Hangi araclar uygun?", "1 ders"],
        ["Tasarim", "Cozum nasil calisacak? Kullanici deneyimi nasil olacak?", "1 ders"],
        ["Gelistirme", "Model egitimi, kodlama, entegrasyon", "3 ders"],
        ["Test ve Sunum", "Calisiyor mu? Geri bildirimler? Sunum hazirligi", "2 ders"],
      ]
    ),
    spacer(),
    calloutBox("Dikkat", "MVP'yi mukemmel yapmaya calismayin! Once 'calisiyor mu?' sorusuna cevap verin, sonra guzellestirin."),
    spacer(),

    heading2("Etkinlikler"),
    activityBlock("UNPLUGGED", "30 dakika \u2022 Grup calismasi (4-5 kisi)", "Etkinlik 1: Problem Avcilari", "Grubunuzla okulunuzdaki veya mahallenezdeki problemleri listeleyin. Her problemi 'YZ ile cozulebilir mi?' sorusuyla degerlendirin. En uygun 1 problemi secin ve Tasarim Dusuncesi sablonuyla calismaya baslayin."),
    spacer(),
    activityBlock("PROJE", "4 ders saati \u2022 Grup calismasi", "Etkinlik 2: Mini YZ Projesi", "Sectiginiz problemi cozen bir YZ prototipi gelistirin. Teachable Machine, PictoBlox veya ML for Kids kullanarak calisan bir model egitin. Projenizi sinifa sunun: problem, cozum, kullanilan teknoloji ve sonuclar."),
    spacer(),
    activityBlock("UNPLUGGED", "25 dakika \u2022 Sinif tartismasi", "Etkinlik 3: Proje Fuari", "Her grup projesini poster ve canli demo ile sunar. Diger gruplar geri bildirim formu doldurur. En yenilikci, en faydali ve en iyi sunulan proje sinifca oylanir."),
    spacer(),

    qrPlaceholder(7),
    spacer(),

    ...quizBlock([
      { soru: "STEM tabanli YZ projesi gelistirirken ilk adim ne olmalidir?", secenekler: ["Hemen kodlamaya baslamak", "Problemi tanimlamak ve anlamak", "En pahali teknolojiyi secmek", "Projeyi bitirmek icin acele etmek"], dogru: 1, aciklama: "Her iyi proje dogru tanimlanmis bir problemle baslar. Problemi anlamadan cozum uretilemez." },
      { soru: "Asagidakilerden hangisi YZ ile cozulebilecek gercek bir problem ornegi DEGILDIR?", secenekler: ["Trafik sikisikligini azaltma", "Bitki hastaligini erken teshis etme", "Insanlarin duygularini tamamen kontrol etme", "Enerji tuketimini optimize etme"], dogru: 2, aciklama: "YZ duygulari analiz edebilir ama insanlarin duygularini kontrol edemez. Bu hem teknik olarak imkansiz hem de etik degildir." },
      { soru: "'Tasarim Dusuncesi' (Design Thinking) surecinde dogru sira hangisidir?", secenekler: ["Empati > Tanimlama > Fikir Uretme > Prototip > Test", "Kodlama > Test > Sunum", "Fikir > Urun > Satis", "Test > Tasarim > Uretim"], dogru: 0, aciklama: "Tasarim Dusuncesi 5 asamadan olusur: once kullaniciyi anla, problemi tanimla, fikirler uret, prototip yap ve test et." },
      { soru: "Bir YZ projesinde 'MVP' (Minimum Viable Product) ne demektir?", secenekler: ["En pahali versiyon", "Temel ozellikleri calisan en basit versiyon", "Sadece guzel gorunen versiyon", "Sadece sunumu olan versiyon"], dogru: 1, aciklama: "MVP, projenin temel islevini yerine getiren en basit versiyonudur. Once MVP'yi calistir, sonra gelistir." },
      { soru: "YZ projesinde veri toplama asamasinda en onemli kural nedir?", secenekler: ["Mumkun oldugunca az veri toplamak", "Kaliteli, cesitli ve etik yollarla toplanmis veri kullanmak", "Sadece internetten veri indirmek", "Verileri kontrol etmeden kullanmak"], dogru: 1, aciklama: "Kaliteli ve cesitli veri, modelin basarisini dogrudan etkiler. Etik kurallara uyarak veri toplamak sarttir." },
    ]),
  ];
  return children;
}

// ===== BOLUM 8 =====
function createBolum8() {
  const children = [
    ...createTitlePage(8, "Dijital Icerik Uretimi", "YZ ile Yaraticilik"),

    heading2("Neler Ogrenecegiz?"),
    bulletItem("YZ ile goruntu, metin ve ses icerikleri uretecegiz."),
    bulletItem("Canva AI ile profesyonel tasarimlar yapacagiz."),
    bulletItem("Dijital hikaye anlatimi (digital storytelling) projesi gelistirecegiz."),
    bulletItem("YZ ile uretilen iceriklerde telif hakki ve etik konularini tartisacagiz."),
    bulletItem("Yaratici surecte YZ'yi yardimci arac olarak kullanmayi ogrenecegiz."),
    spacer(),

    heading3("Anahtar Kavramlar"),
    bodyText("goruntu uretme \u2022 Canva AI \u2022 dijital hikaye \u2022 telif hakki \u2022 yaraticilik \u2022 icerik uretimi"),
    spacer(),

    heading2("1. YZ ile Goruntu Uretme"),
    bodyText("YZ goruntu uretme araclari, metin aciklamanizi (prompt) alip fotografik kalitede goruntuler olusturabilir. Sanat, tasarim, egitim ve eglence alanlarinda kullanilir."),
    spacer(100),
    simpleTable(
      ["Arac", "Ozellik", "Uygunluk"],
      [
        ["Bing Image Creator", "Ucretsiz, DALL-E tabanli", "Ogrenciler icin uygun"],
        ["Canva AI (Magic Media)", "Tasarim icinde goruntu uretme", "Egitim hesabi ile ucretsiz"],
        ["Leonardo AI", "Detayli goruntu kontrolleri", "Ucretsiz sinirli kullanim"],
        ["Stable Diffusion", "Acik kaynak, yerel calisabilir", "Ileri seviye"],
      ]
    ),
    spacer(),
    calloutBox("Biliyor Muydunuz?", "YZ ile uretilen ilk sanat eseri, 2018'de 432.500 dolara satildi!"),
    spacer(),

    heading2("2. Goruntu Prompt Teknikleri"),
    simpleTable(
      ["Teknik", "Ornek", "Sonuc"],
      [
        ["Konu + Stil", "Uzayda yuzen bir astronot kedi, sulu boya tarzinda", "Temeli belirler"],
        ["Detay Ekleme", "... yildizli bir arka plana, parlak renklerle, 4K kalitede", "Kaliteyi artirir"],
        ["Negatif Prompt", "Bulanik degil, karikatur degil, metin icermeyen", "Istenmeyen sonuclari onler"],
        ["Referans Verme", "... Studio Ghibli tarzinda, Monet'in boya darbeleriyle", "Belirli tarza yonlendirir"],
      ]
    ),
    spacer(),
    calloutBox("Ipucu", "Prompt'a 'stil' eklemek sonucu tamamen degistirir. 'Sulu boya', 'pixel art', '3D render' gibi anahtar kelimeler deneyin!", SKY_BG),
    spacer(),

    heading2("3. Canva AI ile Tasarim"),
    bodyText("Canva, YZ destekli tasarim araclariyla profesyonel gorunum elde etmenizi saglar:"),
    spacer(100),
    simpleTable(
      ["Ozellik", "Aciklama"],
      [
        ["Magic Design", "Iceriginize gore otomatik sablon onerisi"],
        ["Magic Media", "Metin aciklamasiyla goruntu uretme"],
        ["Magic Write", "Metin icerigi olusturma ve duzenleme"],
        ["Magic Eraser", "Fotograflardan istenmeyen nesneleri silme"],
        ["Magic Animate", "Tasarimlara tek tikla animasyon ekleme"],
        ["Translate", "Tasarimlari otomatik farkli dillere cevirme"],
      ]
    ),
    spacer(),
    calloutBox("Dikkat", "Canva AI'nin ucretsiz surumunde gunluk kullanim limiti vardir. Egitim hesabi ile daha fazla erisim saglayabilirsiniz!"),
    spacer(),

    heading2("4. Dijital Hikaye Anlatimi"),
    bodyText("YZ araclariyla multimedya bir dijital hikaye olusturma adimlari:"),
    numberedItem(1, "Hikaye Yazimi", "ChatGPT/Gemini ile hikaye taslagi olustur, kendin duzenle ve kisilesstir. Arac: LLM"),
    numberedItem(2, "Gorsel Tasarim", "Her sahne icin goruntu uret veya Canva'da illustrasyonlar tasarla. Arac: Goruntu uretme + Canva"),
    numberedItem(3, "Seslendirme", "Hikayeyi kendi sesinle kaydet veya TTS araci kullan. Arac: Ses kayit / TTS"),
    numberedItem(4, "Birlestirme", "Tum ogeleri Canva sunumunda veya video duzenleyicide birlestir. Arac: Canva / CapCut"),
    numberedItem(5, "Paylasim", "Dijital hikayeni sinifla paylas, geri bildirim al. Arac: Sunum"),
    spacer(),

    heading3("Telif Hakki ve Etik"),
    bulletItem("YZ ile uretilen iceriklerin telif hakki konusu hala tartismalidir."),
    bulletItem("Her aracin kendi kullanim kosullari vardir, mutlaka okuyun."),
    bulletItem("YZ ile uretilen icerigi paylasirken 'YZ destekli' belirtmeniz iyi bir uygulamadir."),
    bulletItem("Gercek sanatcilarin eserlerini taklit etmek icin YZ kullanmaktan kacinin."),
    spacer(),

    heading2("Etkinlikler"),
    activityBlock("UNPLUGGED", "20 dakika \u2022 Grup tartismasi", "Etkinlik 1: Yapay mi Gercek mi?", "10 tane goruntu inceleyin: 5'i YZ ile uretilmis, 5'i gercek fotograf. Hangileri yapay, hangileri gercek? Nasil anladiniz? YZ goruntulerini ayirt etmenin ipuclarini tartisin."),
    spacer(),
    activityBlock("BILGISAYARLI", "30 dakika \u2022 Bireysel", "Etkinlik 2: YZ Poster Tasarimi", "Canva AI kullanarak okul etkinliginiz icin bir poster tasarlayin. Magic Media ile ozel gorseller, Magic Write ile etkileyici basliklar uretin. Sonucu sinifla paylasin."),
    spacer(),
    activityBlock("PROJE", "2 ders saati \u2022 Bireysel veya ikili", "Etkinlik 3: Dijital Hikaye Projesi", "5 sahnelik bir dijital hikaye olusturun. Hikayeyi YZ ile yazin (kendiniz duzenleyin), her sahne icin gorsel uretin, seslendirin ve Canva sunumunda birlestirin. Sinifta canli sunun."),
    spacer(),

    qrPlaceholder(8),
    spacer(),

    ...quizBlock([
      { soru: "YZ ile goruntu uretirken en onemli faktor nedir?", secenekler: ["En pahali araci kullanmak", "Acik ve detayli prompt yazmak", "Sadece Ingilizce yazmak", "Mumkun oldugunca kisa yazmak"], dogru: 1, aciklama: "Goruntu uretme araclarinda detayli ve acik prompt yazmak en iyi sonuclari almanizi saglar." },
      { soru: "YZ ile uretilen bir goruntunun sosyal medyada paylasilirken ne yapilmalidir?", secenekler: ["Hicbir sey belirtmeye gerek yok", "YZ ile uretildigini belirtmek", "Kendi cizdiginizi iddia etmek", "Baskasinin cizdigini soylemek"], dogru: 1, aciklama: "Seffaflik onemlidir. YZ ile uretilen iceriklerin kaynagini belirtmek etik bir sorumluluktur." },
      { soru: "Canva AI hangi tur icerik uretiminde kullanilabilir?", secenekler: ["Sadece fotograf duzenleme", "Sunum, poster, sosyal medya gorseli ve daha fazlasi", "Sadece video duzenleme", "Sadece metin yazma"], dogru: 1, aciklama: "Canva AI ile sunum, poster, sosyal medya gorseli, infografik ve bircok farkli tasarim yapabilirsiniz." },
      { soru: "YZ ile muzik uretirken telif hakki konusunda hangisi dogrudur?", secenekler: ["YZ ile uretilen her muzik serbestce kullanilabilir", "Her aracin kendi lisans kurallari vardir, kontrol edilmelidir", "YZ muzigi hic kullanilmamalidir", "Telif hakki sadece insanlar icin gecerlidir"], dogru: 1, aciklama: "Her YZ aracinin farkli lisans kurallari vardir. Kullanmadan once kosullari okumak onemlidir." },
      { soru: "Bir dijital hikaye projesi icin en uygun YZ araclari kombinasyonu hangisidir?", secenekler: ["Sadece ChatGPT", "Metin icin LLM + goruntu icin goruntu uretici + ses icin TTS", "Sadece goruntu uretme araci", "Sadece ses kayit programi"], dogru: 1, aciklama: "Dijital hikaye projesi birden fazla icerik turu gerektirir: metin, goruntu ve ses. Farkli YZ araclari bir arada kullanilir." },
    ]),
  ];
  return children;
}

// ===== BOLUM 9 =====
function createBolum9() {
  const children = [
    ...createTitlePage(9, "YZ ve Etik", "Dogru Kullanimin Pusulasi"),

    heading2("Neler Ogrenecegiz?"),
    bulletItem("YZ etigi kavramini ve temel ilkelerini ogrenecegiz."),
    bulletItem("YZ'deki onyargi (bias) problemini ve etkilerini anlayacagiz."),
    bulletItem("Deepfake ve dezenformasyon tehlikelerini tartisacagiz."),
    bulletItem("YZ'nin is gucune, gizlilige ve cevreye etkisini degerlendirecegiz."),
    bulletItem("Sorumlu YZ kullanimi icin kendi ilkelerimizi olusturacagiz."),
    spacer(),

    heading3("Anahtar Kavramlar"),
    bodyText("etik \u2022 onyargi (bias) \u2022 adalet \u2022 seffaflik \u2022 deepfake \u2022 gizlilik \u2022 sorumlu YZ"),
    spacer(),

    heading2("1. YZ Etigi Nedir?"),
    bodyText("YZ etigi, yapay zeka sistemlerinin tasariminda, gelistirilmesinde ve kullaniminda dogru, adil ve sorumlu davranma ilkelerinin butunudur. YZ cok guclu bir arac oldugu icin bu gucu nasil kullandigimiz buyuk onem tasir."),
    spacer(100),
    simpleTable(
      ["Ilke", "Aciklama"],
      [
        ["Seffaflik", "YZ sistemlerinin nasil karar verdigi anlasilabilir olmali"],
        ["Adalet", "Tum insanlara ve gruplara esit ve adil davranmali"],
        ["Gizlilik", "Kisisel verileri korumali ve izinsiz kullanmamali"],
        ["Hesap Verebilirlik", "YZ'nin yaptigi hatalardan biri sorumlu olmali"],
        ["Guvenlik", "YZ sistemleri guvenli calismali ve zarar vermemeli"],
        ["Insan Denetimi", "Kritik kararlarda her zaman insan kontrolu olmali"],
      ]
    ),
    spacer(),
    calloutBox("Biliyor Muydunuz?", "Deepfake videolarin %96'si kadinlari hedef aliyor \u2014 bu ciddi bir etik sorun!"),
    spacer(),

    heading2("2. Onyargi (Bias) Problemi"),
    bodyText("YZ sistemleri egitildikleri verilerdeki onyargilari ogrenir ve bu onyargilari kararlarinda yansitir. Bu durum adaletsiz sonuclara yol acabilir."),
    spacer(100),

    heading3("Ise Alim YZ'si"),
    bodyText("Sorun: Gecmis veriler erkek adaylari tercih ediyorsa, YZ de erkekleri tercih eder. Etki: Cinsiyet ayrimciligi."),
    heading3("Yuz Tanima"),
    bodyText("Sorun: Egitim verisinde belirli etnik gruplar az temsil edilmisse, bu gruplar icin hata orani yuksek olur. Etki: Irk ayrimciligi."),
    heading3("Kredi Skoru"),
    bodyText("Sorun: Belirli semtlerde yasayanlara otomatik dusuk skor verilmesi. Etki: Sosyoekonomik ayrimcilik."),
    spacer(),
    calloutBox("Ipucu", "Bir YZ sistemi adaletsiz sonuc veriyorsa, genellikle sorun YZ'nin kendisinde degil, egitim verisindeki dengesizliktedir!", SKY_BG),
    spacer(),

    heading2("3. Deepfake ve Dezenformasyon"),
    bodyText("Deepfake, YZ kullanilarak olusturulan gercekci gorunen sahte video ve ses icerikleridir. Eglence icin kullanilabilecegi gibi yaniltma amacli da kullanilabilir."),
    spacer(100),

    heading3("Tehlikeler"),
    bulletItem("Sahte haberler ve propaganda"),
    bulletItem("Kisilik haklari ihlali"),
    bulletItem("Dolandiricilik (sahte ses ile banka islemi)"),
    bulletItem("Secim manipulasyonu"),

    heading3("Nasil Korunuruz?"),
    bulletItem("Kaynagin guvenilirligini kontrol et"),
    bulletItem("Goruntudeki anormallikleri ara (dudak senkronu, goz kirpma)"),
    bulletItem("Birden fazla kaynaktan dogrula"),
    bulletItem("Deepfake tespit araclarini kullan"),
    spacer(),
    calloutBox("Dikkat", "Sosyal medyada gordugunuz her videoya inanmayin! 'Bu gercek mi?' diye sormayi aliskanlik haline getirin."),
    spacer(),

    heading2("4. YZ'nin Toplumsal Etkileri"),
    simpleTable(
      ["Alan", "Olumlu Etki", "Olumsuz Etki"],
      [
        ["Is Gucu", "Yeni meslekler (YZ muhendisi, veri bilimci)", "Bazi rutin islerin otomasyonu"],
        ["Cevre", "Enerji optimizasyonu, iklim modellemesi", "Buyuk modellerin yuksek enerji tuketimi"],
        ["Gizlilik", "Guvenlik ve dolandiricilik onleme", "Kitlesel gozetim ve veri toplama"],
      ]
    ),
    spacer(),

    heading2("Etkinlikler"),
    activityBlock("UNPLUGGED", "30 dakika \u2022 Sinif tartismasi", "Etkinlik 1: YZ Mahkemesi", "Senaryo kartlarindan bir etik ikilemi cekin. Sinif savci, savunma ve juri olarak uce ayrilir. Senaryo tartisildiktan sonra juri karar verir. Ornek: 'Bir hastanede YZ yanlis teshis koydu ve hasta zarar gordu. Kim sorumlu?'"),
    spacer(),
    activityBlock("UNPLUGGED", "25 dakika \u2022 Grup calismasi", "Etkinlik 2: Etik Pusula Olusturma", "Grubunuzla birlikte 'Sorumlu YZ Kullanim Ilkeleri' bildirisi hazirlayin. En az 5 ilke belirleyin, her birini aciklayin ve poster olarak sinifa asin. Sinifca en iyi ilkeleri secerek ortak bir sinif bildirisi olusturun."),
    spacer(),
    activityBlock("BILGISAYARLI", "20 dakika \u2022 Bireysel", "Etkinlik 3: Deepfake Dedektifi", "Internette 'deepfake ornekleri' arayin. YZ ile uretilmis gorselleri ve videolari tespit etmeye calisin. Ipuclarini listeleyin. Sinifla 'deepfake ile karsilasorsak ne yapmaliyiz?' tartismasi yapin."),
    spacer(),

    qrPlaceholder(9),
    spacer(),

    ...quizBlock([
      { soru: "YZ sistemlerinde 'onyargi' (bias) ne demektir?", secenekler: ["YZ'nin cok hizli calismasi", "Egitim verisindeki dengesizlikten kaynaklanan adaletsiz sonuclar", "YZ'nin her zaman dogru karar vermesi", "YZ'nin fazla enerji tuketmesi"], dogru: 1, aciklama: "Onyargi, egitim verisindeki dengesizlik veya eksiklikten kaynaklanan sistematik hatalardir. Belirli gruplara karsi adaletsiz sonuclar uretebilir." },
      { soru: "Asagidakilerden hangisi YZ etigi ile ilgili onemli bir ilke DEGILDIR?", secenekler: ["Seffaflik (kararlarin aciklanabilir olmasi)", "Adalet (tum gruplara esit davranma)", "Kar maksimizasyonu (en cok para kazanma)", "Gizlilik (kisisel verilerin korunmasi)"], dogru: 2, aciklama: "YZ etigi seffaflik, adalet, gizlilik ve hesap verebilirlik gibi ilkeleri kapsar. Kar maksimizasyonu etik bir ilke degildir." },
      { soru: "Deepfake teknolojisi icin hangisi dogrudur?", secenekler: ["Her zaman zararsizdir", "Gercek olmayan video/ses icerikleri ureterek yaniltici olabilir", "Sadece eglence amacli kullanilir", "Kolayca tespit edilebilir"], dogru: 1, aciklama: "Deepfake, gercekci gorunen sahte video ve ses icerikleri uretebilir. Dezenformasyon ve dolandiricilik icin kullanilabilir." },
      { soru: "YZ'nin cevresel etkisi konusunda hangisi dogrudur?", secenekler: ["YZ'nin hic cevresel etkisi yoktur", "Buyuk YZ modellerinin egitimi cok enerji tuketir ve karbon salimi yapar", "YZ sadece enerji tasarrufu saglar", "YZ sunuculari elektrik tuketmez"], dogru: 1, aciklama: "Buyuk dil modellerinin egitimi tonlarca CO2 salimi yapar. YZ'nin cevresel etkisini azaltmak icin verimli modeller gelistirilmektedir." },
      { soru: "Sorumlu YZ kullanimi icin en onemli prensip hangisidir?", secenekler: ["YZ'yi mumkun oldugunca cok kullanmak", "YZ'yi hic kullanmamak", "YZ'nin sinirlarini bilmek ve insani denetimle kullanmak", "YZ'ye tum kararlari birakmak"], dogru: 2, aciklama: "Sorumlu YZ kullanimi, YZ'nin gucunu ve sinirlarini bilmek, her zaman insan denetimini korumak ve etik ilkelere uymak demektir." },
    ]),
  ];
  return children;
}

// ===== BOLUM 10 =====
function createBolum10() {
  const children = [
    ...createTitlePage(10, "Gelecek Seninle Baslar", "Proje ve Portfolyo"),

    heading2("Neler Ogrenecegiz?"),
    bulletItem("Kapsamli bir YZ projesi planlayip hayata gecirecegiz."),
    bulletItem("Proje portfolyosu hazirlama becerisi kazanacagiz."),
    bulletItem("YZ alanindaki kariyer firsatlarini ve yeni meslekleri kesfedecegiz."),
    bulletItem("Hayat boyu ogrenme yol haritasi olusturacagiz."),
    bulletItem("Kitap boyunca ogrendigimiz her seyi bir final projesiyle birlestirecegiz."),
    spacer(),

    heading3("Anahtar Kavramlar"),
    bodyText("final projesi \u2022 portfolyo \u2022 kariyer \u2022 hayat boyu ogrenme \u2022 sunum \u2022 proje yonetimi"),
    spacer(),

    heading2("1. Final Projesi: Buyuk Resim"),
    bodyText("Bu bolumdeki final projesi, kitap boyunca ogrendiginiz tum bilgi ve becerileri bir araya getirmenizi saglar. Gercek bir problemi YZ ile cozen kapsamli bir proje gelistireceksiniz."),
    spacer(100),

    heading3("Final Projesi Gereksinimleri"),
    bulletItem("Gercek bir problem cozmeli"),
    bulletItem("YZ/ML modeli icermeli"),
    bulletItem("Veri toplama ve hazirlama yapmali"),
    bulletItem("Etik degerlendirme icermeli"),
    bulletItem("Calisan bir prototip olmali"),
    bulletItem("Sunum ve belgelendirme yapmali"),
    spacer(),
    calloutBox("Biliyor Muydunuz?", "2030'da is dunyasindaki gorevlerin %30'u YZ ile degisecek!"),
    spacer(),

    heading2("2. Proje Adimlari"),
    numberedItem(1, "Konu Secimi", "Ilginizi ceken bir gercek dunya problemi secin. Cevre, saglik, egitim, ulasim... (1 ders)"),
    numberedItem(2, "Arastirma", "Problemi arastirin, benzer cozumleri inceleyin, hangi YZ yaklasimini kullanacaginiza karar verin. (1 ders)"),
    numberedItem(3, "Veri Toplama", "Projeniz icin gerekli verileri toplayin, temizleyin ve etiketleyin. (1 ders)"),
    numberedItem(4, "Model Gelistirme", "Teachable Machine, PictoBlox veya ML for Kids ile modelinizi egitin ve test edin. (2 ders)"),
    numberedItem(5, "Entegrasyon", "Modeli bir uygulama/oyun/sunum ile birlestirin. Kullanici arayuzu tasarlayin. (1 ders)"),
    numberedItem(6, "Sunum Hazirligi", "Poster, sunum ve canli demo hazirlayin. Portfolyo belgesini tamamlayin. (1 ders)"),
    numberedItem(7, "Proje Fuari", "Projenizi sinifa/okula sunun. Geri bildirim alin ve degerlendirin. (1 ders)"),
    spacer(),
    calloutBox("Ipucu", "Projenizi kucuk parcalara bolun ve her adimi tamamladiginizda kutlayin. Buyuk projeler kucuk basarilarla tamamlanir!", SKY_BG),
    spacer(),

    heading2("3. Portfolyo Nasil Hazirlanir?"),
    bodyText("Portfolyonuz, YZ yolculugunuzun tum hikayesini anlatan bir belge/sunumdur:"),
    spacer(100),
    simpleTable(
      ["Bolum", "Icerik"],
      [
        ["Kapak", "Proje adi, isminiz, tarih, okul"],
        ["Problem", "Hangi sorunu cozuyorsunuz? Neden onemli?"],
        ["Arastirma", "Benzer cozumler, kullanilan teknolojiler"],
        ["Surec", "Veri toplama, model egitimi, kodlama adimlari"],
        ["Sonuclar", "Model basarisi, ekran goruntuleri, demo"],
        ["Dersler", "Ne ogrendiniz? Zorluklar? Farkli ne yapardiniz?"],
        ["Kaynaklar", "Kullanilan araclar, veri kaynaklari, referanslar"],
      ]
    ),
    spacer(),
    calloutBox("Dikkat", "Portfolyonuza sadece sonucu degil, sureci de ekleyin. Hatalar ve ogrendiginiz dersler en degerli kisimlardir!"),
    spacer(),

    heading2("4. YZ Caginda Kariyer Firsatlari"),
    simpleTable(
      ["Meslek", "Aciklama"],
      [
        ["YZ Muhendisi", "YZ modelleri tasarlar ve gelistirir"],
        ["Veri Bilimci", "Buyuk verileri analiz eder, icgoruler cikarir"],
        ["Prompt Muhendisi", "YZ araclarindan en iyi sonucu alacak talimatlar tasarlar"],
        ["YZ Etik Danismani", "YZ sistemlerinin etik ve adil olmasini saglar"],
        ["Robotik Muhendisi", "YZ destekli robotlar tasarlar"],
        ["YZ Urun Yoneticisi", "YZ urunlerinin gelistirme surecini yonetir"],
      ]
    ),
    spacer(),

    heading2("5. Ogrenmeye Devam Et!"),
    bodyText("Bu kitap sadece baslangic! YZ ogrenme yolculugunuza devam etmek icin:"),
    spacer(100),
    simpleTable(
      ["Seviye", "Kaynak", "Aciklama"],
      [
        ["Simdi", "Scratch + ML for Kids", "Blok kodlama ile daha karmasik YZ projeleri"],
        ["Sonraki Adim", "Python Temelleri", "Gercek programlama dili ogrenmeye basla"],
        ["Sonraki Adim", "Khan Academy / Code.org", "Ucretsiz online kodlama kurslari"],
        ["Ileri", "TensorFlow / PyTorch", "Profesyonel ML frameworkleri"],
        ["Ileri", "Kaggle Yarismalari", "Gercek veri bilimi yarismalari ve egitimler"],
        ["Gelecek", "Universite (Bilgisayar Muhendisligi)", "YZ alaninda akademik kariyer"],
      ]
    ),
    spacer(),

    // Tebrikler
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
      children: [
        new TextRun({ text: "Tebrikler!", bold: true, size: 40, color: "6366F1", font: "Arial" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({ text: "Bu kitabi tamamlayarak yapay zeka dunyasina saglam bir adim attin. Ogrendigin bilgiler ve kazandigin becerilerle gelecegin teknolojilerine hazirsin. Unutma: Gelecek seninle baslar!", size: 24, font: "Arial", color: "6366F1" }),
      ],
    }),
    spacer(),

    heading2("Etkinlikler"),
    activityBlock("PROJE", "6 ders saati \u2022 Bireysel veya grup", "Etkinlik 1: Final Projesi", "Gercek bir problemi YZ ile cozen kapsamli bir proje gelistirin. Proje planlama formunu doldurun, modeli egitin, prototipi olusturun ve portfolyo belgesini hazirlayin. Sinifta canli demo ile sunun."),
    spacer(),
    activityBlock("UNPLUGGED", "1 ders saati \u2022 Sinif etkinligi", "Etkinlik 2: Gelecek Fuari", "Her ogrenci/grup projesini poster ve canli demo ile sunar. Diger siniflar, ogretmenler ve aileler davet edilir. En iyi projeler oylanir ve odullendirilir. Kategoriler: En Yenilikci, En Faydali, En Iyi Sunum, En Iyi Tasarim."),
    spacer(),
    activityBlock("UNPLUGGED", "20 dakika \u2022 Bireysel", "Etkinlik 3: Gelecek Mektubu", "Gelecekteki kendinize bir mektup yazin: YZ hakkinda ne ogrendiniz? Gelecekte ne yapmak istiyorsunuz? YZ'yi nasil kullanacaksiniz? Mektubu kapatip '1 yil sonra ac' yazin."),
    spacer(),

    qrPlaceholder(10),
    spacer(),

    ...quizBlock([
      { soru: "Bir YZ projesi portfolyosu icin en onemli ogeler hangileridir?", secenekler: ["Sadece kodun kendisi", "Problem tanimi, surec, sonuclar ve ogrenilen dersler", "Sadece ekran goruntuleri", "Sadece proje basligi"], dogru: 1, aciklama: "Iyi bir portfolyo sadece sonucu degil, tum sureci gosterir: problemi nasil tanimladiginizi, nasil cozdugunuzu ve neler ogrendiginizi." },
      { soru: "YZ alaninda calisabilmek icin hangi beceriler en onemlidir?", secenekler: ["Sadece matematik", "Programlama + matematik + problem cozme + iletisim", "Sadece programlama", "Sadece Ingilizce bilmek"], dogru: 1, aciklama: "YZ alaninda disiplinlerarasi beceriler gerekir: programlama, matematik, analitik dusunme, iletisim ve surekli ogrenme." },
      { soru: "Asagidakilerden hangisi YZ ile ilgili yeni ortaya cikan bir meslek DEGILDIR?", secenekler: ["Prompt Muhendisi", "YZ Etik Danismani", "Veri Bilimci", "Atli Postaci"], dogru: 3, aciklama: "Prompt muhendisligi, YZ etik danismanligi ve veri bilimi YZ caginin yeni meslekleridir. Atli postacilik tarihe karismis bir meslektir." },
      { soru: "'Hayat boyu ogrenme' (lifelong learning) YZ caginda neden onemlidir?", secenekler: ["Cunku sinav icin gereklidir", "Teknoloji cok hizli degistigi icin surekli yeni beceriler ogrenilmelidir", "Sadece universite icin gereklidir", "Onemli degildir, okul yeterlidir"], dogru: 1, aciklama: "YZ ve teknoloji cok hizli gelisiyor. Bugun ogrendiginiz bilgi yarin eskiyebilir. Surekli ogrenme bir zorunluluk haline gelmistir." },
      { soru: "Bu kitapta ogrendiginiz en onemli ders nedir?", secenekler: ["YZ insanlarin yerini alacak", "YZ sadece buyukler icindir", "YZ guclu bir aractir ve sorumlulukla kullanilmalidir", "YZ tehlikelidir ve uzak durmak gerekir"], dogru: 2, aciklama: "YZ guclu bir aractir. Onu anlayan, dogru ve sorumlulukla kullanan bireyler gelecegin mimarlari olacaktir. Sen de onlardan biri olabilirsin!" },
    ]),
  ];
  return children;
}

// ===== ANA FONKSIYON =====
async function main() {
  const outputDir = path.join(__dirname, "..", "kitap", "word");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const chapters = [
    { num: 6, slug: "blok-tabanli-yz-kodlama", fn: createBolum6 },
    { num: 7, slug: "gercek-hayat-problemleri", fn: createBolum7 },
    { num: 8, slug: "dijital-icerik-uretimi", fn: createBolum8 },
    { num: 9, slug: "yz-ve-etik", fn: createBolum9 },
    { num: 10, slug: "gelecek-seninle-baslar", fn: createBolum10 },
  ];

  for (const ch of chapters) {
    const numStr = String(ch.num).padStart(2, "0");
    const fileName = `bolum-${numStr}-${ch.slug}.docx`;
    const filePath = path.join(outputDir, fileName);

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: { width: cm(21), height: cm(29.7) },
              margin: { top: cm(2.5), bottom: cm(2.5), left: cm(2.5), right: cm(2.5) },
            },
            pageNumberStart: 1,
            pageNumberFormatType: NumberFormat.DECIMAL,
          },
          footers: createFooter(ch.num),
          children: ch.fn(),
        },
      ],
      styles: {
        default: {
          document: {
            run: { font: "Arial", size: 24 },
          },
        },
      },
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);
    console.log(`Olusturuldu: ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\nTum bolumler basariyla olusturuldu!");
}

main().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
