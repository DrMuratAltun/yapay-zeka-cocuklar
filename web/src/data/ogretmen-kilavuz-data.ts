export interface BolumKilavuz {
  bolumNo: number
  baslik: string
  sinifSeviyesi: string
  dersSaati: number
  renk: string
  icon: string
  kazanimlar: string[]
  dersPlani: {
    isinma: string
    zamanDagilimi: { sure: string; icerik: string }[]
    kapanis: string
  }
  quizCevapAnahtari: {
    soruNo: number
    soru: string
    dogruCevap: string
    dogruSecenek: string
    aciklama: string
    ogretmenNotu: string
  }[]
  etkinlikRehberi: {
    ad: string
    tip: 'unplugged' | 'bilgisayar' | 'simulasyon' | 'yaratici' | 'proje'
    sure: string
    gruplama: string
    hazirlik: string[]
    adimlar: string[]
    olasiSorunlar: string[]
    ileriSeviye: string
  }[]
  tartismaSorulari: {
    soru: string
    ipuclari: string[]
  }[]
  yanilgilar: {
    yanilgi: string
    gercek: string
    nasilDuzeltilir: string
  }[]
  farklilastirma: {
    ileriDuzey: string[]
    destekGerekli: string[]
  }
  ekKaynaklar: {
    baslik: string
    url: string
    aciklama: string
  }[]
}

export const kilavuzVerileri: BolumKilavuz[] = [
  // ========== BÖLÜM 1 ==========
  {
    bolumNo: 1,
    baslik: 'Yapay Zeka Nedir?',
    sinifSeviyesi: '6. Sınıf',
    dersSaati: 4,
    renk: 'from-sky-400 to-blue-500',
    icon: '🔍',
    kazanimlar: [
      'Zeka kavramını tanımla, insan zekası ile yapay zekayı karşılaştır',
      'Yapay zekanın tarihçesini ve önemli kilometre taşlarını öğren',
      'Yapay zeka türlerini (dar, genel, süper) ayırt et',
      'Yapay zekanın günlük hayattaki örneklerini fark et',
    ],
    dersPlani: {
      isinma: '"Sizce bir bilgisayar düşünebilir mi?" sorusuyla tartışma başlatılır. Öğrencilerden 1 dakika düşünüp yanıt vermeleri istenir.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma tartışması + kazanımların paylaşımı' },
        { sure: '15 dk', icerik: 'YZ nedir? Tanımı, tarihçesi, türleri (slaytlar)' },
        { sure: '20 dk', icerik: 'Kim Daha Zeki etkinliği (unplugged)' },
        { sure: '10 dk', icerik: 'Quiz (5 soru)' },
        { sure: '5 dk', icerik: 'Kapanış + öğrenci soruları' },
      ],
      kapanis: 'Her öğrenci "Bugün öğrendiğim en ilginç şey..." cümlesini tamamlar.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Aşağıdakılerden hangisi yapay zekanın tanımı için en uygun ifadedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Makinelerin insanlara benzer zeki davranislar göstermesi',
        aciklama: 'YZ, makinelerin insan zekasını taklit ederek öğrenme, problem çözme ve karar verme yeteneklerini kapsar.',
        ogretmenNotu: 'Öğrenciler "bilgisayarlarin hızlı çalışması" seçeneğini seçebilir. Hiz ile zeka arasindaki farki vurgulayın — hiz tek başına zeka değildir.',
      },
      {
        soruNo: 2,
        soru: '"Yapay zeka" terimi ilk kez hangi yıl kullanılmıstır?',
        dogruCevap: 'C',
        dogruSecenek: '1956',
        aciklama: '1956 Dartmouth Konferansinda John McCarthy "yapay zeka" terimini ilk kez kullanmıştır.',
        ogretmenNotu: 'Öğrenciler 1950 ile karıştırabılır — 1950 Turing Testinin önerilme yılı, terim 1956da resmi oldu. Tarih sıralama etkinliğiyle pekiştirin.',
      },
      {
        soruNo: 3,
        soru: 'Aşağıdakılerden hangisi dar yapay zeka (Narrow AI) ornegi DeğilDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Insanlar gibi her konuda düşünebilen robot',
        aciklama: 'Her konuda düşünebilen bir robot Genel YZ (AGI) kavramı olup henuz gerçekleşmemiştir. Dar YZ sadece tek bir göreve odaklanır.',
        ogretmenNotu: 'Dar/Genel/Süper YZ ayrımı kavrattırmak için tahtaya uc sutun çizin ve öğrencilerden örnekleri yazmalarını isteyin.',
      },
      {
        soruNo: 4,
        soru: 'Turing Testini kim one surmustur?',
        dogruCevap: 'B',
        dogruSecenek: 'Alan Turing',
        aciklama: 'Alan Turing, 1950 yılında bir makinenin insani kandirip kandiramadigini test eden bu yöntemi one surmustur.',
        ogretmenNotu: 'Cahit Arf seçeneği dikkat cekici — Turk matematikci ama YZ ile ilgisi yok. John McCarthy YZ terimini icat etti ama Turing Testi Alan Turing\'e aittir.',
      },
      {
        soruNo: 5,
        soru: 'Aşağıdakı görevlerden hangisinde yapay zeka insanlardan daha başarılıdır?',
        dogruCevap: 'C',
        dogruSecenek: 'Milyonlarca veriyi saniyeler içinde analiz etmek',
        aciklama: 'YZ büyük veri islemede insanlardan cok daha hızlı ve doğrudr. Yaraticilik ve empati hala insan uzmanligi.',
        ogretmenNotu: 'Bu soru ile "Kim Daha Zeki" etkinliğini baglantilayabilirsiniz. YZ\'nin ustun oldugu ve insanlarin ustun oldugu alanlari karşılaştırma firsati.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Kim Daha Zeki?',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: '4-5 kişilik gruplar',
        hazirlik: [
          'Görev kartlarini önceden yazdirin veya sayfadan indirin',
          'Her grup için bir makas ve yapiskan hazırlayın',
          'Tahtaya "Insan" ve "Makine" sutunlari çizin',
        ],
        adimlar: [
          'Kartlari gruplara dağıtın (her grupta 10-12 kart)',
          'Her kart için "Bu görevi insan mi yoksa makine mi daha iyi yapar?" tartışması',
          'Gruplarin kararlari tahtadaki sutunlara yazılın',
          'Sınıfca sonuçları karşılaştırın ve tartışmayı yönetin',
        ],
        olasiSorunlar: [
          'Bazi görevler her ikisi için de uygun olabilir — bu durumda "neden?" sorusuyla derinlestirilir',
          'Gruplar hızlı bitirirse ek görev kartlari hazırlayabılırsınız',
        ],
        ileriSeviye: '"Gelecekte bu görev için YZ daha başarılı olabilir mi?" sorusuyla uzantiya gidin. 2050 yılı için tahminler yaptirin.',
      },
      {
        ad: 'YZ Dedektifi',
        tip: 'unplugged',
        sure: '1 gun gözlem + 20 dk sınıf tartışması',
        gruplama: 'Bireysel gözlem, sınıf tartışması',
        hazirlik: [
          'Gözlem formunu önceden her öğrenciye dağıtın',
          'Öğrencilere bir gun öncesinden görevi verin',
        ],
        adimlar: [
          'Öğrenciler 1 gun boyunca karsilastiklari YZ örneklerini gözlem formuna yazerlar',
          'Ertesi gun sınıfta herkes en az 1 gözlemini paylesir',
          'Tahtada YZ örnekleri kategorilere ayrilir (ev, okul, ulasim, sağlık vb.)',
          'En şaşırtıcı ve en yaygin örnekler secelir',
        ],
        olasiSorunlar: [
          'Bazi öğrenciler hic örnek bulamamis olabilir — yonlendirici sorular sorun: "Telefonunda hangi uygulamalari kullaniyorsun?"',
          'YZ olmayan teknolojiler (örneğin hesap makinesi) ile karıştırabılırler — farki açıklayın',
        ],
        ileriSeviye: 'Gözlemleri sınıf için bir "YZ Haritasi" posterine dönüşturun.',
      },
      {
        ad: 'YZ Zaman Çizelgesi',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Grup çalışması (4-5 kişi)',
        hazirlik: [
          'Her grup için büyük bir karton veya A3 kagit',
          'Renkli kalemler, yapiskan notlar',
          'Tarih kartlarini önceden hazırlayın (1642, 1950, 1956, 1997, 2011, 2022 vb.)',
        ],
        adimlar: [
          'Gruplara tarih kartlarini dağıtın',
          'Kartlari kronolojik sıraya dizmeleri isteyin',
          'Her tarih için ne oldugunu yazmalari isteyin',
          'Posterleri duvara asin ve galeri yuruyusu yapın',
        ],
        olasiSorunlar: [
          'Tarihleri ezberlemek zor olabilir — kartlarin arkasina ipucu yazabilirsiniz',
          'Bazi tarihler tartışmalı olabilir — "yaklasik tarih" kavramını açıklayın',
        ],
        ileriSeviye: '2030, 2040 ve 2050 için tahminler ekletin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Yapay zeka bir gun insanlar kadar zeki olabilir mi?',
        ipuclari: [
          'Dar YZ vs Genel YZ kavramlarini hatırlatın',
          'Bilim insanlarinin farkleri goresleri oldugunu vurgulayın',
          'Hem "evet" hem "hayir" tarafindaki argumanlari çıkarın',
        ],
      },
      {
        soru: 'Evinizdeki hangi cihazlar YZ kullaniyor? Bunlar olmasa hayatiniz nasil degisirdi?',
        ipuclari: [
          'Telefon, TV, akilli hoparlor, oyun konsolundan başlatın',
          'YZ olmadan da çalışabılecek ve çalışamayacak cihazlari ayirin',
          'Bagimsizlik ve teknoloji konusunu acin',
        ],
      },
      {
        soru: 'YZ ile bir insanin arasindaki en büyük fark nedir?',
        ipuclari: [
          'Duygular, yaraticilik, empati kavramlarini irdeleyin',
          'YZ\'nin "anlama" vs "taklit" farki',
          'Öğrencilerin kendi deneyimlerinden örnekler vermesini isteyin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Yapay zeka = Robot',
        gercek: 'YZ bir yazılımdır, robot ise fiziksel bir makinedir. Çoğu YZ robota ihtiyac duymaz (örneğin sesli asistan, spam filtresi).',
        nasilDuzeltilir: 'Tahtaya YZ örnekleri yazip hangilerinin robot oldugunu, hangilerinin yazılım oldugunu sorun. Öğrenciler çoğunun "gorunmez" YZ oldugunu fark edecek.',
      },
      {
        yanilgi: 'YZ her seyi bilir ve hic hata yapmaz',
        gercek: 'YZ sadece eğitildiği veriler kadar iyidir. Hatali veri = hatali sonuç. Ayrica YZ "bilmez", istatistiksel tahmin yapar.',
        nasilDuzeltilir: '"YZ\'ye saçma bir soru sorun ve cevabi görüntüleyin" etkinliği yapın. ChatGPT veya Gemini\'ye kasitli yanlış soru sorup hata yaptigini gösterin.',
      },
      {
        yanilgi: 'YZ yakin zamanda insanlarin yerini alacak',
        gercek: 'YZ bazi görevleri otomatiklestiriyor ama yeni meslekler de yaratiyor. Insanlarin yaraticilik, empati ve karmasik karar verme becerileri hala essiz.',
        nasilDuzeltilir: 'Tarihteki teknoloji devrimlerini hatırlatın (buhar makinesi, internet) — her seferinde yeni meslekler ortaya çıktı.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'YZ tarihindeki önemli kişileri arastirip mini biyografi hazırlama',
        '"2050 yılında YZ" başlıklı kısa bir gelecek tahmini yazisi yazma',
        'Turing Testini sınıf arkadaslariyla canlandirma (biri "YZ" rolunde)',
      ],
      destekGerekli: [
        'Kim Daha Zeki kartlarini azaltin (5-6 kart yeterli)',
        'YZ örneklerini görsel kartlarla destekleyin (resim + yazi)',
        'Quiz öncesinde kavramlari tekrar edin ve anahtar kelimeleri tahtaya yazin',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI4K12 - YZ Eğitim Kaynagi',
        url: 'https://ai4k12.org',
        aciklama: 'K-12 seviyesi için YZ eğitim standartlari ve etkinlik fikirleri.',
      },
      {
        baslik: 'MIT Day of AI',
        url: 'https://www.dayofai.org',
        aciklama: 'MIT\'nin ortaokul seviyesi için YZ etkinlikleri ve ders planlari.',
      },
      {
        baslik: 'Elements of AI',
        url: 'https://www.elementsofai.com',
        aciklama: 'YZ temellerini ogreten ucretsiz online kurs (öğretmen için arka plan bilgisi).',
      },
    ],
  },

  // ========== BÖLÜM 2 ==========
  {
    bolumNo: 2,
    baslik: 'Günlük Hayatta YZ',
    sinifSeviyesi: '6. Sınıf',
    dersSaati: 4,
    renk: 'from-emerald-400 to-teal-500',
    icon: '🏠',
    kazanimlar: [
      'YZ\'nin günlük hayatta kullanıldığı alanlari kesfet',
      'Telefonumuzdaki YZ uygulamalarini tanımla',
      'Farklı sektorlerde (sağlık, ulasim, eğitim, tarim) YZ kullanım örnekleri ver',
      'YZ uygulamalarinin arkasindaki temel teknolojileri anla',
    ],
    dersPlani: {
      isinma: '"Bu sabah uyandığından beri kac kez YZ ile etkilesime girdiniz?" sorusu. Öğrenciler parmak kaldirarak tahmin eder.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + önceki bolumun kısa tekrari' },
        { sure: '15 dk', icerik: 'Günlük hayatta YZ alanlari (slaytlar + tartışma)' },
        { sure: '20 dk', icerik: 'YZ Haritasi etkinliği' },
        { sure: '10 dk', icerik: 'Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"Yarin bir gun boyunca hic YZ kullanmadan yaşamayı deneyin" meydan okumasi.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Aşağıdakılerden hangisi YZ\'nin günlük hayattaki bir uygulamasi DeğilDIR?',
        dogruCevap: 'B',
        dogruSecenek: 'Elektrik supurgesinin dugmeyle acilmasi',
        aciklama: 'Dugmeyle çalışan bir elektrik supurgesi basit bir mekanik cihadir, YZ icermez.',
        ogretmenNotu: 'Öğrenciler "teknoloji = YZ" zannedebilir. Teknoloji ile YZ arasindaki farki vurgulayın — her elektronik cihaz YZ kullanmaz.',
      },
      {
        soruNo: 2,
        soru: 'Bir sesli asistanin çalışmasında hangi YZ teknolojileri gerekir?',
        dogruCevap: 'B',
        dogruSecenek: 'Ses tanıma + doğal dil isleme + konusma sentezi',
        aciklama: 'Sesli asistan 3 katmanli bir YZ sistemidir: sesi metne cevirir, anlam çıkarır, yanıt üretir.',
        ogretmenNotu: 'Tahtaya 3 aşamalı bir diyagram çizin: Mikrofon → Ses Tanıma → NLP → Yanıt Üretimi → Hoparlor. Her aşamayı sınıfıa açıklayın.',
      },
      {
        soruNo: 3,
        soru: 'Muzik ve video platformlarinin "Sana Ozel" listeleri hangi YZ yöntemiyle oluşturulur?',
        dogruCevap: 'B',
        dogruSecenek: 'Öneri sistemi (tavsiye algoritmalari)',
        aciklama: 'Öneri sistemleri kullanicinin geçmiş davranislarini analiz ederek benzer içerikleri önerirler.',
        ogretmenNotu: 'YouTube/Spotify ornegi ile somutlastirin. "Neden hep benzer sarkilan goruyorsunuz?" sorusuyla baglantilerin.',
      },
      {
        soruNo: 4,
        soru: 'Akilli ev sistemlerinde yapay zeka ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Aliskanliklarinizi öğrenerek enerji tasarrufu sağlar',
        aciklama: 'Akilli ev YZ\'si zaman iceride kullanici aliskanliklarini öğrenir ve otomasyon yapar.',
        ogretmenNotu: '"Sadece ışıkları acar" seçeneği dikkat cekici — öğrencilere "peki bunu zamanlayici da yapabilir, YZ farklı ne yapar?" diye sorun.',
      },
      {
        soruNo: 5,
        soru: 'Aşağıdakı YZ uygulamalarindan hangisi sağlık alaninda kullanılır?',
        dogruCevap: 'B',
        dogruSecenek: 'Rontgen ve MR goruntelerinde hastalik tespiti',
        aciklama: 'Tibbi görüntü analizi YZ\'nin en başarılı sağlık uygulamalarindan biridir.',
        ogretmenNotu: 'Gerçek örnekler gösterin: Google\'in diyabetik retinopati tespiti, YZ ile rontgen analizi. Öğrenciler sağlık+teknoloji bagini gorunce cok heyecanlanir.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'YZ Haritasi',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Bireysel + sınıf tartışması',
        hazirlik: [
          'Her öğrenciye bos bir kagit veya form',
          'Tahtada ya da projeksiyon için kategori basiklari: Ev, Okul, Ulasim, Sağlık, Eglence',
        ],
        adimlar: [
          'Öğrenciler 5 dakika boyunca bildikleri YZ örneklerini yazarlar',
          'Kategorilere gore sınıflandırılır',
          'Her kategoriden en ilginç örnek seçilir',
          'Sınıf ortaklasa bir "YZ Haritasi" posteri oluşturur',
        ],
        olasiSorunlar: [
          'Bazi öğrenciler cok az örnek bulabilir — yan sınıftakı arkadasiyla eslestirin',
          'YZ olmayan teknolojiler yazılabılır — bunlari ayiklamayi ogretici bir firsat olarak kullanın',
        ],
        ileriSeviye: 'Her ornegi "Gorunur YZ" ve "Gorunmez YZ" olarak ikiyi ayirin.',
      },
      {
        ad: 'Sesli Asistanla Tanisma',
        tip: 'bilgisayar',
        sure: '30 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Telefon veya tablet (Siri/Google Asistan erisimi)',
          'Test sorusu listesi hazırlayın',
        ],
        adimlar: [
          'Basit sorularla baslayın: "Hava nasil?", "Saat kac?"',
          'Karisik sorular sorun: "Hayatin anlami ne?", sacma bir soru',
          'Asistanin yapamadigi seyleri not edin',
          'YZ\'nin sinirlarini tartışın',
        ],
        olasiSorunlar: [
          'Tum öğrencilerin telefonu olmayabilir — eslesme yaparak çalışın',
          'Internet baglantisi gerekli',
        ],
        ileriSeviye: 'Farklı dillerde soru sorarak dil anlama kapasitesini test edin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Bir gun boyunca hic YZ kullanmadan yasayabilir misiniz? Neleri yapamadiniz?',
        ipuclari: [
          'Telefon, harita, arama motoru, sosyal medya örneklerini hatırlatın',
          'YZ bagimliligi konusunu hassasca acin',
          'Pozitif ve negatif yonleri dengeli tartıştın',
        ],
      },
      {
        soru: 'YZ sizin hakkinieda ne biliyor? Bu sizi rahatsiz ediyor mu?',
        ipuclari: [
          'Öneri sistemlerinin veri topladaigni hatırlatın',
          'Gizlilik kavramını yaslarina uygun şekilde acin',
          '"Kolaylik vs Gizlilik" dengesini tartıştın',
        ],
      },
      {
        soru: 'Gelecekte hangi yeni alanlarda YZ kullanılabilir?',
        ipuclari: [
          'Hayal gücü siniri koymayin',
          'Gerçekci ve fantastik fikirleri ayirin ama fantastik olanlari da değerlendirin',
          'En yaratici fikirleri sınıfla paylaşın',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ beni 7/24 izliyor ve dinliyor',
        gercek: 'Sesli asistanlar sadece uyandirma kelimesi ("Hey Siri") duyuldiginda aktif olur. Sürekli kayit yapmaz. Ancak veri gizliligi gerçekten önemli bir konudur.',
        nasilDuzeltilir: 'Sesli asistanin nasil çalıştığını teknik olarak açıklayın. Yerel isleme vs bulut isleme farkini gösterin.',
      },
      {
        yanilgi: 'YZ uygulamalari bedava ve zararsizdir',
        gercek: 'Çoğu "ucretsiz" uygulama verinizle para kazanir. Reklam hedefleme, veri satisi gibi imodeller vardir.',
        nasilDuzeltilir: '"Ürün siz değilseniz, ürün verinizdir" sözunu tartışın. Uygulama izinlerini inceleyin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Bir YZ uygulamasinin arka planinda hangi teknolojiler çalıştığını arastirma raporu',
        'Akilli şehir konsepti hakkinda poster hazırlama',
      ],
      destekGerekli: [
        'YZ örneklerini görsel kartlarla sunun (resim + basit açıklama)',
        'Sadece 3 kategori ile çalışın (Ev, Okul, Eglence)',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'How AI Powers Everyday Apps',
        url: 'https://www.youtube.com/results?search_query=how+AI+powers+everyday+apps',
        aciklama: 'YZ\'nin günlük uygulamalardaki rolu hakkinda videolar.',
      },
      {
        baslik: 'AI Experiments by Google',
        url: 'https://experiments.withgoogle.com/collection/ai',
        aciklama: 'Google\'in interaktif YZ deneyleri — sınıfta canli gösterim için mukemmel.',
      },
    ],
  },

  // ========== BÖLÜM 3 ==========
  {
    bolumNo: 3,
    baslik: 'Verinin Gücü',
    sinifSeviyesi: '6. Sınıf',
    dersSaati: 4,
    renk: 'from-violet-400 to-purple-500',
    icon: '📊',
    kazanimlar: [
      'Veri kavramını tanımla, farklı veri türlerini ayırt et',
      'Yapisal ve yapisal olmayan veri arasindaki farki anla',
      'Verinin YZ için neden önemli oldugunu açıkla',
      'Veri toplama, temizleme ve etiketleme süreçlerini öğren',
      'Veri gizliligi ve KVKK konusunda bilinc kazan',
    ],
    dersPlani: {
      isinma: '"Sınıfımız hakkinda hangi verileri toplayabiliriz?" sorusu. Tahtaya öğrencilerin fikirlerini yazin (boy, yas, goz rengi, sevdigi renk vb.).',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + sınıf anketi veri toplama' },
        { sure: '15 dk', icerik: 'Veri türleri, yapisal/yapisal olmayan veri (slaytlar)' },
        { sure: '20 dk', icerik: 'Veri Etiketleme Atolyesi / Sınıf Anketi etkinliği' },
        { sure: '10 dk', icerik: 'KVKK ve gizlilik tartışması + Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her öğrenci "Verilerin korunmasi için dikkat ettigim bir şey..." paylaşır.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Aşağıdakılerden hangisi "veri" için en doğru tanımdır?',
        dogruCevap: 'B',
        dogruSecenek: 'Islenebilir, kaydedilebilir her türlü bilgi parcasi',
        aciklama: 'Veri; rakam, metin, görüntü, ses gibi her türlü islenebilir bilgidir.',
        ogretmenNotu: '"Sadece rakamlar" seçeneği yaygin hata. Foto, ses, video da veridir. Sınıftan farklı veri türleri örnekleri isteyin.',
      },
      {
        soruNo: 2,
        soru: 'Bir YZ modelini eğitmek için hangi tur veri KullanılMAZ?',
        dogruCevap: 'C',
        dogruSecenek: 'Rastgele üretilmis anlamsiz sayılar',
        aciklama: 'YZ modelleri anlamli oruntulere ihtiyac duyar. Rastgele veriden öğrenilemez.',
        ogretmenNotu: '"Hasta kayitlari" seçeneğini isaretleyenler olabilir — anonim veri ile kişisel veri farkini açıklayın.',
      },
      {
        soruNo: 3,
        soru: 'Aşağıdakılerden hangisi "yapisal veri" ornegi DeğilDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Bir öğrencinin yazdigi kompozisyon',
        aciklama: 'Kompozisyon serbest metin oldugu için yapisal olmayan (yapısız) veridir.',
        ogretmenNotu: 'Not çizelgesi ile kompozisyon örneğini yanyana koyun. "Hangisini tabloya koyabilirsiniz?" sorusuyla kavratin.',
      },
      {
        soruNo: 4,
        soru: 'Veri toplama süreçinde aşağıdakılerden hangisi etik bir sorun oluşturur?',
        dogruCevap: 'B',
        dogruSecenek: 'Insanlarin izni olmadan kişisel bilgilerini kaydetmek',
        aciklama: 'Izinsiz veri toplama hem etik değildir hem de KVKK\'ya aykiridir.',
        ogretmenNotu: 'KVKK kavramını somut örneklerle açıklayın: "Sınıf arkadasinizin fotosunu izinsiz paylaşabılır misiniz?"',
      },
      {
        soruNo: 5,
        soru: '"Büyük veri" (big data) kavramı için hangisi YanlışDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Sadece büyük sirketler üretir',
        aciklama: 'Herkes veri üretir — sosyal medya paylaşımı, sensor verileri, arama geçmişi vb.',
        ogretmenNotu: '"Siz de her gun veri üretiyorsunuz!" vurgulayarak kişisellestirin. Günlük veri üretim örnekleri isteyin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Sınıf Anketi',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: 'Sınıf çalışması',
        hazirlik: [
          'Anket sorularını hazırlayın (5-6 soru: boy, goz rengi, sevdigi ders, ulasim araçı vb.)',
          'Tablo kagitlari veya tahta',
          'Grafik çizdirme için renkli kalemler',
        ],
        adimlar: [
          'Sınıftan veri toplayın (anket)',
          'Verileri tabloya gecirin',
          'Basit grafik çizdirin (cubuk grafik)',
          'Verilerdeki oruntuleri bulun',
          '"Bu veriyi bir YZ kullanabilir mi?" tartışması yapın',
        ],
        olasiSorunlar: [
          'Öğrenciler kişisel soru sormak istemeyebilir — hassas sorulardan kacinin',
          'Grafik çizimi zaman alabilir — önceden sablonlar hazırlayın',
        ],
        ileriSeviye: 'Toplanan veriyi Excel\'e girin ve otomatik grafik oluşturun. Yapisal veri kavramını pekiştirin.',
      },
      {
        ad: 'Veri Etiketleme Atolyesi',
        tip: 'bilgisayar',
        sure: '20 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Etiketleme aracına (web sayfasindaki interaktif etkinlik) erisim',
          'Her öğrenci için bilgisayar veya tablet',
        ],
        adimlar: [
          'Karisik görüntüleri (kedi, kopek, kus) sınıflandırın',
          'Her gorunteye doğru etiketi atayin',
          'Hatali etiketlemenin sonuçlarını tartışın',
          '"Neden etiketleme önemli?" ozet yapılır',
        ],
        olasiSorunlar: [
          'Bazi goruntler belirsiz olabilir — bu durumu "YZ\'nin de zorlugu" olarak vurgulayın',
        ],
        ileriSeviye: 'Kasitli hatali etiketlerle modelin nasil yanlıs sonuç verecegini simule edin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Sosyal medyada paylaştığınız her şey bir veri. Bunu bilerek paylaşım yapar misiniz?',
        ipuclari: [
          'Dijital ayak izi kavramını acin',
          'Paylaşımdan önce düşünme alıştırması yapın',
          'Gizlilik ayarlari hakkinda bilgi verin',
        ],
      },
      {
        soru: 'Bir YZ\'yi eğitmek için hangi verileri toplardiniz? Bunun için izin almak gerekir mi?',
        ipuclari: [
          'Etik veri toplama ilkelerini hatırlatın',
          'KVKK/GDPR kavramlarini basitce açıklayın',
          'Riza, anonimlik kavramlarini tartışın',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Veri sadece sayılardır',
        gercek: 'Veri; metin, görüntü, ses, video, konum bilgisi gibi her türlü bilgiyi icerir.',
        nasilDuzeltilir: 'Sınıftan farklı türlerde veri örnekleri toplayın ve tahtaya kategori kategori yazin.',
      },
      {
        yanilgi: 'Ne kadar cok veri o kadar iyi',
        gercek: 'Kalitesiz veya önyargilair veri, kotu sonuçlar dogurur. Kalite > Miktar.',
        nasilDuzeltilir: '"Cop girer cop çıkar" (Garbage In, Garbage Out) prensibini açıklayın.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Kaggle gibi platformlardan gerçek veri seti incelemesi',
        'Sınıfın verisiyle basit bir istatistik analiz raporu',
      ],
      destekGerekli: [
        'Veri türlerini görsel kartlarla ogretme (resim örnekleri)',
        'Sadece yapisal/yapisal olmayan ayrımı odaklı çalışma',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'KVKK Resmi Sitesi',
        url: 'https://kvkk.gov.tr',
        aciklama: 'Turkiye Kişisel Verilerin Korunmasi Kurumu — öğretmen arka plan bilgisi.',
      },
      {
        baslik: 'Google Dataset Search',
        url: 'https://datasetsearch.research.google.com',
        aciklama: 'Gerçek veri setlerini arastirmak için — sınıfta gösterim yapılabılır.',
      },
    ],
  },

  // ========== BÖLÜM 4 ==========
  {
    bolumNo: 4,
    baslik: 'Makineler Nasil Öğrenir?',
    sinifSeviyesi: '6-7. Sınıf',
    dersSaati: 6,
    renk: 'from-orange-400 to-amber-500',
    icon: '🤖',
    kazanimlar: [
      'Makine öğrenimi kavramını ve geleneksel programlamadan farkini anla',
      'Gözetimli, gozerimsiz ve pekiştirmeli öğrenme türlerini ayırt et',
      'Sınıflandırma ve tahmin kavramlarini öğren',
      'Google Teachable Machine ile kendi modelini eğit',
      'Bir modelin başarısını değerlendirmenin temellerini öğren',
    ],
    dersPlani: {
      isinma: '"Siz bir seyi nasil öğreniyorsunuz? Bir makineyi nasil ogretrdiniz?" sorusu. Insan öğrenimi ile makine öğrenimi paralelligini kurdurun.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + makine öğrenimi tanımı' },
        { sure: '15 dk', icerik: 'Öğrenme türleri: gözetimli, goretimsiz, pekiştirmeli (slaytlar)' },
        { sure: '25 dk', icerik: 'Meyve Sınıflandırıcı etkinliği (unplugged)' },
        { sure: '35 dk', icerik: 'Teachable Machine uygulamasi (bilgisayar)' },
        { sure: '10 dk', icerik: 'Quiz + Model Başarı Raporu tartışması' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"Bir makineye \_\_\_\_ ogretmek isterdim" cümlesini tamamlatin.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Makine öğrenimi için en doğru tanım hangisidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Makinelerin veriden oruntu öğrenerek tahmin yapmasi',
        aciklama: 'ML, açık kural yazmak yerine verilerden oruntuleri otomatik öğrenme yöntemidir.',
        ogretmenNotu: '"Programcilarin her kurali tek tek yazmasi" seçeneği geleneksel programlamanin tanımıdır. Ikisi arasindaki farki açıkca çizelgeyle gösterin.',
      },
      {
        soruNo: 2,
        soru: 'Google Teachable Machine ile hangi tur model eğitilebilir?',
        dogruCevap: 'B',
        dogruSecenek: 'Görüntü, ses ve vucut pozu tanıma',
        aciklama: 'Teachable Machine 3 farklı veri türünü destekler: görüntü, ses ve vücut pozu.',
        ogretmenNotu: 'Canli demo yapın! Sınıfta kamera ile 2-3 sınıflı bir görüntü modeli eğitin. Öğrenciler canli sonuçları gorunce kavramı cok daha iyi anlar.',
      },
      {
        soruNo: 3,
        soru: 'Eğitim verisi ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Modelin oruntuleri öğrenmesini sağlamak',
        aciklama: 'Eğitim verisi modelin "ders çalıştığı" materyaldir.',
        ogretmenNotu: 'Sinav metaforu: "Eğitim verisi = ders çalışmak, Test verisi = sinav. Sinavi gormeden çalışırsınız!"',
      },
      {
        soruNo: 4,
        soru: 'Aşağıdakılerden hangisi "gözetimli öğrenme" ornegi DeğilDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Musterileri otomatik gruplara ayirma (etiket olmadan)',
        aciklama: 'Etiketsiz gruplama goretimsiz öğrenmenin (clustering) ornegidir.',
        ogretmenNotu: 'Goretimsiz öğrenmeyi "kutuphane raf ayirma" benzetmesiyle açıklayın — kitaplari okunadan konularina gore gruplayabilirsiniz.',
      },
      {
        soruNo: 5,
        soru: 'Modelin eğitim verisinde cok iyi, yeni verilerde kotu performans göstermesine ne denir?',
        dogruCevap: 'A',
        dogruSecenek: 'Overfitting (asiri uyum)',
        aciklama: 'Overfitting, modelin eğitim verisini "ezberledigi" ama genelleme yapmadigi anlamina gelir.',
        ogretmenNotu: '"Sinav sorularını ezberlemek ama konuyu anlamamak" benzetmesi cok etkili. Öğrenciler kendi deneyimleriyle baglanti kurabilir.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Meyve Sınıflandırıcı',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: '4-5 kişilik gruplar',
        hazirlik: [
          'Meyve resimleri veya gerçek meyveler (5-6 tur)',
          'Sınıflandırma kriterleri kartlari (renk, boyut, şekil)',
          'Her grup için bir sınıflandırma tablosu',
        ],
        adimlar: [
          'Meyveleri önceden belirlenenmis kriterlere gore sınıflandırın',
          'Sonra yeni bir meyve gösterip "bunu hangi sınıfa koyardiniz?" sorun',
          'Farklı gruplarin farklı kriterlere gore farklı sonuçlar buldugunu gösterin',
          'Bu süreçi makine öğrenmeyle karşılaştırın',
        ],
        olasiSorunlar: [
          'Bazi meyveler birden fazla sınıfa girebilir — bu "belirsizlik" kavramını ogretmek için firsat',
        ],
        ileriSeviye: '3\'ten fazla ozellik kullanarak cok boyutlu sınıflandırma yapmayi deneyin.',
      },
      {
        ad: 'Teachable Machine - Görüntü Modeli',
        tip: 'bilgisayar',
        sure: '40 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Bilgisayar + kamera (webcam) erisimi',
          'teachablemachine.withgoogle.com adresine erisim',
          'En az 2 sınıf için örnek nesneler (kalem vs silgi, el vs yumruk vb.)',
        ],
        adimlar: [
          'Teachable Machine sitesini acin ve "Image Project" seçin',
          'En az 2 sınıf oluşturun (orn: "Kalem" ve "Silgi")',
          'Her sınıf için 30-50 örnek fotograf cekin',
          '"Train Model" diyerek modeli eğitin',
          'Yeni nesnelerle test edin ve dogrlugunu kontrol edin',
          'Sonuçları sınıfla paylaşın',
        ],
        olasiSorunlar: [
          'Işık koşulları sonuçları etkiler — sınıfın aydinlik oldugundan emin olun',
          'Az örnek = düşük başarı. En az 30 örnek önerilir.',
          'Internet yavas ise eğitim süresi uzayabilir',
        ],
        ileriSeviye: '3+ sınıflı model eğitin. "Model ne zaman hata yapti?" analizi yapın.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Bir makine gerçekten "öğreniyor" mu yoksa sadece istatistik mi yapiyor?',
        ipuclari: [
          'Felsefik bir soru — doğru/yanlış yok',
          'Insan öğrenme süreçi ile karşılaştırma yaptirilir',
          '"Anlama" vs "oruntu eslesstirme" farkini tartışın',
        ],
      },
      {
        soru: 'Hatali eğitim verisi ile eğitilen bir model ne tur sorunlar yaratabilir?',
        ipuclari: [
          'Sağlık, adalet sistemi örnekleri verin',
          'Onyargili veri → onyargili karar bagini kurun',
          'Garbage In, Garbage Out prensibini hatırlatın',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Makine öğrenimi = Robot yapma',
        gercek: 'ML bir yazılım teknolojisidir. Robot olmadan da çalışır (orn: spam filtresi, öneri sistemi).',
        nasilDuzeltilir: 'ML kullanan ama robot olmayan 5 örnek listeleyin.',
      },
      {
        yanilgi: 'Bir kez eğitilen model sonsuza kadar çalışır',
        gercek: 'Veriler ve koşullar degistikce modeller guncellenmeli. Eski model yanlış sonuçlar verebilir.',
        nasilDuzeltilir: '"Covid öncesi ve sonrasi alisveris aliskanliklari" örneğini verin — eski modelin yeni durumu bilmesi imkansiz.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Teachable Machine ile 5+ sınıflı bir proje geliştirme',
        'Model başarı metrikleri (doğruluk, precision, recall) arastirmasi',
      ],
      destekGerekli: [
        'Sadece 2 sınıflı basit sınıflandırma ile başlama',
        'Meyve sınıflandırmayı görselle pekiştirme (foto kartlar)',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Google Teachable Machine',
        url: 'https://teachablemachine.withgoogle.com',
        aciklama: 'Tarayicida ML modeli eğitme araçı — sınıfta canli demo için ideal.',
      },
      {
        baslik: 'ML for Kids',
        url: 'https://machinelearningforkids.co.uk',
        aciklama: 'Çocuklar için makine öğrenimi projeleri.',
      },
    ],
  },

  // ========== BÖLÜM 5 ==========
  {
    bolumNo: 5,
    baslik: 'Üretken Yapay Zeka',
    sinifSeviyesi: '6-7. Sınıf',
    dersSaati: 6,
    renk: 'from-pink-400 to-rose-500',
    icon: '✨',
    kazanimlar: [
      'Üretken yapay zeka kavramını ve temel çalışma prensibini anla',
      'ChatGPT, Gemini gibi büyük dil modellerini (LLM) tani',
      'Etkili prompt (istem) yazma tekniklerini öğren',
      'YZ ile metin, görüntü ve ses üretme deneyimi kazan',
      'YZ kullanımında etik kurallari ve akademik durustelusu tartış',
    ],
    dersPlani: {
      isinma: '"ChatGPT\'ye en ilginç hangi soruyu sordunuz? Ne cevap verdi?" anket. Birlik sınıf paylesimi.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + Üretken YZ tanımı' },
        { sure: '15 dk', icerik: 'LLM, prompt engineering, halucinasyon kavramlari' },
        { sure: '25 dk', icerik: 'Prompt Duellosu etkinliği' },
        { sure: '25 dk', icerik: 'ChatGPT/Gemini deneyimi (bilgisayar)' },
        { sure: '15 dk', icerik: 'Etik tartışma + Quiz' },
        { sure: '10 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"YZ\'yi sorumlu kullanmak için 3 kurali" yazarak sınıfta paylaşılır.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Üretken yapay zeka (Generative AI) ne yapar?',
        dogruCevap: 'B',
        dogruSecenek: 'Yeni ve orijinal içerikler (metin, görüntü, ses) üretir',
        aciklama: 'Üretken YZ, eğitildiği verilerden öğrenerek yeni içerikler üretir.',
        ogretmenNotu: '"Sadece arama motoru gibi çalışır" seçeneği yaygin yanlışa. Arama motoru var olan içeriği bulur, üretken YZ yeni içerik yaratir.',
      },
      {
        soruNo: 2,
        soru: 'ChatGPT, Gemini gibi araçlar hangi YZ teknolojisini kullanir?',
        dogruCevap: 'B',
        dogruSecenek: 'Büyük dil modelleri (LLM)',
        aciklama: 'Bu araçlar milyarlarca parametrelik büyük dil modelleriyle çalışır.',
        ogretmenNotu: 'LLM kavramı soyut olabilir. "Cok cok büyük bir otomatik tamamlama" benzetmesini kullanın.',
      },
      {
        soruNo: 3,
        soru: 'Iyi bir prompt yazmak için en önemlisi nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Açık, net ve baglam iceren talimatlar vermek',
        aciklama: 'Iyi prompt = net talimat + baglam + beklenen format.',
        ogretmenNotu: 'Canli demo yapın: aynı soruyu önce kotu prompt, sonra iyi prompt ile sorun. Fark dramatik olacak.',
      },
      {
        soruNo: 4,
        soru: 'YZ ile üretilen bir içeriği kendi odeviniz gibi sunmak doğru mudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Hayir, bu etik değildir ve akademik durusteluge aykiridir',
        aciklama: 'YZ araç olarak kullanılabilir ama sonuçu kendi isiniz gibi sunmak intihal sayılır.',
        ogretmenNotu: 'Bu soru hassas — yargıılayici olmadan tartışın. "YZ yardımcı araç vs YZ kopya makinesi" ayrımını yapın. Okul politikalarinizi hatırlatın.',
      },
      {
        soruNo: 5,
        soru: 'Aşağıdakılerden hangisi üretken YZ ile YapılAMAZ?',
        dogruCevap: 'C',
        dogruSecenek: 'Gerçek dünya deneyimi yaşamak',
        aciklama: 'YZ dijital içerik üretebilir ama fiziksel deneyim yaratamaz.',
        ogretmenNotu: 'YZ\'nin sinirlari konusunda farkindali artirmak için önemli soru. "YZ sizin yerinize mutlu olabilir mi?" diye genisletin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Prompt Duellosu',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Cift çalışma (2 kişi)',
        hazirlik: [
          'Her cifte bir görev karti (orn: "Bir kahvalti tarifi oluştur", "Bir masal yaz")',
          'Değerlendirme rubrik (netlik, yaraticilik, detay)',
        ],
        adimlar: [
          'Her cift aynı görev için farklı promptlar yazar',
          'Promptlari YZ aracına (ChatGPT/Gemini) girerler',
          'Sonuçları karşılaştırırlar',
          'En iyi promptu ve nedenini sınıfa sunarlar',
        ],
        olasiSorunlar: [
          'YZ erisimi olmayabilir — bu durumda sadece prompt yazma ve tartışma olarak yapın',
          'Uygunsuz içerikler üretilirse — YZ güvenlik filtrelerini açıklayın',
        ],
        ileriSeviye: 'Aynı prompt\'u farklı YZ araçlarında (ChatGPT vs Gemini) deneyerek karşılaştırın.',
      },
      {
        ad: 'ChatGPT / Gemini ile Tanisma',
        tip: 'bilgisayar',
        sure: '30 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'ChatGPT veya Gemini erisimi (okul hesabi veya öğretmen hesabiyla)',
          'Görev listesi: "Soru sor, hikaye yazdır, tercume yap, kod yaz, matematik çöz"',
        ],
        adimlar: [
          'Basit sorularla baslayın',
          'Giderek karmasik promptlar deneyin',
          'YZ\'nin yanlış cevap verdigi bir durumu bulun (halucinasyon)',
          'Sonuçları not edin ve sınıfla paylaşın',
        ],
        olasiSorunlar: [
          'Yas siniri olan platformlar için öğretmen hesabindan kullanın',
          'Öğrenciler cok eglenceli bulup diger görevleri unutabilir — zaman siniri koyun',
        ],
        ileriSeviye: 'YZ\'nin yaptigi bir hatayi bulun ve neden yanlış oldugunu açıklayın.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ ile odev yapmak kopya cekmek midir?',
        ipuclari: [
          'Araç vs kopya ayrımı yapın',
          'Hesap makinesi, sözlük, internet örnekleriyle karşılaştırın',
          'Seffaflik ve kaynak gösterme önemini vurgulayın',
        ],
      },
      {
        soru: 'YZ\'nin yazdigi bir siiir gerçek bir siir midir?',
        ipuclari: [
          'Yaraticilik tanımını tartışın',
          'Insanin duygusu vs YZ\'nin oruntu eslestirmesi',
          'Sanatçıların tepkilerini arastirtin',
        ],
      },
      {
        soru: 'YZ halucinasyon yaptiginda (yanlış bilgi ürettiğinde) ne yapmaliyiz?',
        ipuclari: [
          'Her zaman doğrulama yapma alıştırması',
          'Güvenilir kaynakla kontrol etme aliskanligi',
          'Elestirel düşünme becerisi vurgusu',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'ChatGPT her zaman doğru cevap verir',
        gercek: 'LLM\'ler olasi devam sözcuklerini tahmin eder. Bazen ikna edici gorunen ama yanlış bilgi ("halucinasyon") üretir.',
        nasilDuzeltilir: 'Canli demo: ChatGPT\'ye "Turkiye\'nin 5. cumhurbaskani kimdir?" gibi zor sorular sorun. Hatalarini birlikte bulun.',
      },
      {
        yanilgi: 'YZ yaratici düşüniyor',
        gercek: 'YZ var olan verilerden oruntuleri birlestirir. Gerçek anlamda "düşünmez" veya "hayal kurmaz".',
        nasilDuzeltilir: '"Origami katlama" analojisi — YZ kağıdı katlar ama yeni bir malzeme icat etmez.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Farklı LLM\'leri karşılaştırma raporu (ChatGPT vs Gemini vs Claude)',
        'Prompt muhendisligi rehberi oluşturma',
      ],
      destekGerekli: [
        'Önceden hazırlanmıs prompt sablonlari kullanma',
        'Öğretmen esliginde canli demo izleme (bireysel kullanım yerine)',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Learn Prompting',
        url: 'https://learnprompting.org',
        aciklama: 'Prompt muhendisligi ogretme kaynaklari.',
      },
      {
        baslik: 'AI Literacy for Educators',
        url: 'https://www.iste.org/areas-of-focus/AI-in-education',
        aciklama: 'ISTE\'nin eğitimciler için YZ okuryazarligi kaynakları.',
      },
    ],
  },

  // ========== BÖLÜM 6 ==========
  {
    bolumNo: 6,
    baslik: 'Blok Tabanli YZ Kodlama',
    sinifSeviyesi: '7. Sınıf',
    dersSaati: 8,
    renk: 'from-blue-400 to-indigo-500',
    icon: '🧩',
    kazanimlar: [
      'PictoBlox ortamini tani ve YZ uzantilarini kullan',
      'Blok tabanli kodlama ile görüntü sınıflandırma projesi yap',
      'Ses tanıma ve metin sınıflandırma projeleri deneyimle',
      'Kendi YZ destekli oyununu/uygulamani tasarla',
    ],
    dersPlani: {
      isinma: '"Kodlama nedir? Günlük hayatta neleri kodlarsiniz?" sorusu. Tarif yazma, yol tarifi verme gibi algoritma örnekleriyle baslayın.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isınma + PictoBlox tanitimi' },
        { sure: '20 dk', icerik: 'Algoritma Sefi etkinliği (unplugged)' },
        { sure: '45 dk', icerik: 'PictoBlox - Tas Kagit Makas projesi' },
        { sure: '40 dk', icerik: 'PictoBlox - Duygu Analizi projesi' },
        { sure: '10 dk', icerik: 'Quiz + proje paylaşımı' },
        { sure: '10 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her öğrenci projesini 1 cümlede ozetler: "Modelim \_\_\_\_ yapabiliyor."',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'PictoBlox hangi programlama yaklasimini kullanir?',
        dogruCevap: 'B',
        dogruSecenek: 'Blok tabanli (surukle-bırak) kodlama',
        aciklama: 'PictoBlox, Scratch benzeri blok tabanli programlama ortamidir.',
        ogretmenNotu: '"Metin tabanli" seçeneği ileri seviye; "Python" da blok değildir. Farklılık açık şekilde gösterilmeli.',
      },
      {
        soruNo: 2,
        soru: 'PictoBlox\'ta görüntü sınıflandırma projesi için ilk yapılması gereken nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Modeli eğitmek (sınıflar oluşturup örnek toplamak)',
        aciklama: 'Önce veri toplanir ve model eğitilir, sonra kod yazılır.',
        ogretmenNotu: '"Hemen koda başla" düşüncesi yaygindir. Veri → Eğitim → Kod sırasını vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Aşağıdakılerden hangisi PictoBlox\'un YZ uzantisi DeğilDIR?',
        dogruCevap: 'D',
        dogruSecenek: '3D Modelleme',
        aciklama: 'PictoBlox ML, Yuz Tanıma, Metin Sınıflandırma uzantilari var ama 3D Modelleme yoktur.',
        ogretmenNotu: 'PictoBlox\'un uzanti menusunu acip gösterim yaparak doğrulayın.',
      },
      {
        soruNo: 4,
        soru: '"Eger ... ise" blogu ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Modelin tahmin sonuçuna gore farklı islemler yapar',
        aciklama: 'Koşul bloklari modelin çıktısına gore farklı aksiyonlar alinmasini sağlar.',
        ogretmenNotu: 'Günlük hayat ornegi: "Hava yagmurluysa semsiye al, değilse alma" — kosusllu karar verme.',
      },
      {
        soruNo: 5,
        soru: 'PictoBlox\'ta YZ projesi için hangi adımlar izlenir?',
        dogruCevap: 'A',
        dogruSecenek: 'Uzanti ekle > Sınıflar oluştur > Örnekler topla > Model eğit > Kodla',
        aciklama: 'Bu, PictoBlox\'ta standart YZ proje akisidir.',
        ogretmenNotu: 'Bu sırayı tahtaya yazin ve proje boyunca referans olarak kullanın. Her adımda nerede oldugunuzu gösterin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Algoritma Sefi',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: '4-5 kişilik gruplar',
        hazirlik: [
          'Her grup için basit bir görev karti (orn: "sandvic yap", "dis fircala")',
          'Kagit ve kalem',
        ],
        adimlar: [
          'Her grup görevini adım adım algoritma olarak yazar',
          'Baska bir grup bu adıimlari harfi harfine takip etmeye çalışır',
          'Eksik veya belirsiz adımlar tespit edilir',
          '"Bilgisayar tam boyle çalışır" baglantisi kurulur',
        ],
        olasiSorunlar: [
          'Gruplarin "cok fazla adım" yazmasi — basitlesrirme rehberligi yapın',
        ],
        ileriSeviye: 'Algoritmaya koşul ekletme: "Eger malzeme yoksa..."',
      },
      {
        ad: 'PictoBlox - Tas Kagit Makas',
        tip: 'bilgisayar',
        sure: '45 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'PictoBlox yuklu bilgisayarlar',
          'Webcam erisimi',
          'Proje adım adım rehberi (sayfadan veya yazılı)',
        ],
        adimlar: [
          'PictoBlox\'u acin ve ML uzantisini ekleyin',
          '3 sınıf oluşturun: Tas, Kagit, Makas',
          'Her sınıf için 30+ webcam görüntüsu toplayın',
          'Modeli eğitin',
          'Bloklarla oyun kodunu yazin (eger tas ise → bilgisayar kagit göstersin)',
          'Test edin ve iyilestirin',
        ],
        olasiSorunlar: [
          'Webcam çalışmıyor: PictoBlox izinlerini kontrol edin',
          'Model düşük başarılı: Daha fazla örnek toplayın, arka plani sabit tutun',
          'Blok kodlama yeni: Scratch deneyimi olanlari yardımcı yapın',
        ],
        ileriSeviye: 'Skor tablosu ekleyin, ses efektleri koyun, 5\'e kadar sayan tur sistemi yapın.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Blok kodlama ile metin kodlama arasindaki farklar nelerdir? Hangisi daha "gerçek" programlama?',
        ipuclari: [
          'Her ikisi de gerçek programlama — sadece arayuz farklı',
          'Profesyonel yazılımcıların da görsel araçlar kullandigindan bahsedin',
          'Önemli olan mantik, araç değil',
        ],
      },
      {
        soru: 'YZ modeliniz hata yaptiginda ne yapabilirsiniz?',
        ipuclari: [
          'Daha fazla veri toplama, veri kalitesini artirma',
          'Farklı ozellikler deneme',
          'Model sinirlarinii anlama',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Kodlama cok zor, ben yapamam',
        gercek: 'Blok kodlama, Lego birlestirir gibi kodlama yapmaktir. Hata yapmak öğrenme süreçinin bir parcasidir.',
        nasilDuzeltilir: 'Cok basit bir projeden başlayıp 5 dakikada sonuç alin. Başarı deneyimi oezguven verir.',
      },
      {
        yanilgi: 'Model bir kez eğitildikten sonra hep doğru çalışır',
        gercek: 'Işık, aci, arka plan degisirse model başarısızl olabilir. Sürekli test ve iyilestirme gerekir.',
        nasilDuzeltilir: 'Kasitli olarak zor koşullarda test yapın (karanlik oda, farklı aci) ve hatalarib gösterin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'PictoBlox ile kendi özgun YZ oyununu tasarlama',
        'Ses tanıma uzantisiyla sesli komutlu proje',
      ],
      destekGerekli: [
        'Öğretmen esliginde adım adım takip',
        'Sadece 2 sınıflı basit proje ile başlama',
        'Ekran görüntülu adım adım kilavuz',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'PictoBlox',
        url: 'https://pictoblox.ai',
        aciklama: 'PictoBlox resmi sitesi — indirme ve eğitim kaynaklari.',
      },
      {
        baslik: 'Scratch',
        url: 'https://scratch.mit.edu',
        aciklama: 'Blok kodlama temeli için Scratch platformu.',
      },
    ],
  },

  // ========== BÖLÜM 7 ==========
  {
    bolumNo: 7,
    baslik: 'Gerçek Hayat Problemleri',
    sinifSeviyesi: '7-8. Sınıf',
    dersSaati: 8,
    renk: 'from-teal-400 to-cyan-500',
    icon: '🌍',
    kazanimlar: [
      'Gerçek dünya problemlerini YZ ile çözme yaklasimini öğren',
      'Tasarim Düşüncesi (Design Thinking) metodolojisini uygula',
      'STEM tabanli proje geliştir',
      'Problem tanımlama, veri toplama, model seçimi ve test süreçlerini deneyimle',
      'Ekip çalışması ve proje yönetimi becerilerini geliştir',
    ],
    dersPlani: {
      isinma: '"Okulunuzda veya mahallenizde YZ ile çözülebilecek bir problem var mi?" Beyin firtinasi.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isınma + Design Thinking tanitimi' },
        { sure: '30 dk', icerik: 'Problem Avcilari etkinliği' },
        { sure: '20 dk', icerik: 'Problem analizi ve çözüm önerileri' },
        { sure: '4 ders', icerik: 'Mini YZ Projesi (gruplar halinde)' },
        { sure: '25 dk', icerik: 'Proje Fuari + Quiz' },
        { sure: '10 dk', icerik: 'Kapanış ve odul' },
      ],
      kapanis: 'Her grubun projesini 30 saniyede tanittigi "asansor konusmasi" (elevator pitch).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'STEM tabanli YZ projesinde ilk adım ne olmalidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Problemi tanımlamak ve anlamak',
        aciklama: 'Her projenin temeli iyi tanımlanmıs bir problemdir.',
        ogretmenNotu: '"Hemen kodlamaya başlamak" en yaygin yanlışlardan. Planlama olmadan kod = kaos.',
      },
      {
        soruNo: 2,
        soru: 'Aşağıdakılerden hangisi YZ ile çözülebilecek gerçek problem DeğilDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Insanlarin duygularini tamamen kontrol etme',
        aciklama: 'YZ duygulari analiz edebilir ama "kontrol etme" hem teknik olarak imkansiz hem de etik değildir.',
        ogretmenNotu: '"Tamamen kontrol etme" ifadesini vurgulatin. Duygu tanıma var ama kontrol etme yok.',
      },
      {
        soruNo: 3,
        soru: 'Tasarim Düşüncesi süreçinde doğru sıra hangisidir?',
        dogruCevap: 'A',
        dogruSecenek: 'Empati > Tanımlama > Fikir Üretme > Prototip > Test',
        aciklama: 'Design Thinking\'in 5 aşaması bu sıradadır.',
        ogretmenNotu: 'Her aşamayı bir poster olarak sınıfa asin. Proje boyunca "şimdi hangi aşamadayız?" sorusu ile takip edin.',
      },
      {
        soruNo: 4,
        soru: 'MVP (Minimum Viable Product) ne demektir?',
        dogruCevap: 'B',
        dogruSecenek: 'Temel ozellikleri çalışan en basit versiyon',
        aciklama: 'MVP, fikirlerinizi test etmek için yapılabılecek en basit ürün/prototiptir.',
        ogretmenNotu: '"Mukemmel yapmaya çalışmak yerine çalışan bir şey yapın" mesajini vurgulayın.',
      },
      {
        soruNo: 5,
        soru: 'YZ projesinde veri toplama aşamasında en önemli kural nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Kaliteli, çeşitli ve etik yollarla toplanmis veri kullanmak',
        aciklama: 'Kalitesiz veya onyargili veri yanlış sonuçlara yol acar.',
        ogretmenNotu: 'Bolum 3\'teki veri konusunu hatırlatma firsati. "Cop girer cop çıkar" prensibini tekrar vurgulayın.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Problem Avcilari',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: '4-5 kişilik gruplar',
        hazirlik: [
          'Büyük kagitlar veya poster kartonlari',
          'Yapiskan notlar ve kalemler',
          'Problem kategorileri: Çevre, Sağlık, Eğitim, Ulasim, Tarim',
        ],
        adimlar: [
          'Her grup bir kategori secer',
          '5 dakika beyin firtinasi — mumkun oldugunca cok problem yazin',
          'En önemli 3 problemi seçin',
          '"Bu problemi YZ nasil çözebilir?" sorusuyla çözüm önerin',
          'Posterleri sınıfa sunun',
        ],
        olasiSorunlar: [
          'Cok büyük/soyut problemler seçilebilir — "yerel ve somut" olmasini yonlendirin',
          'YZ ile çözülemeyecek problemler önerilirse — bu da tartışmaya değer',
        ],
        ileriSeviye: 'En iyi problemi sınıfca secerek gercel bir mini proje baslatın.',
      },
      {
        ad: 'Mini YZ Projesi',
        tip: 'proje',
        sure: '4 ders saati',
        gruplama: '3-4 kişilik gruplar',
        hazirlik: [
          'Design Thinking sablonu (her grup için)',
          'Bilgisayar erisimi',
          'Sunum materyalleri (poster veya dijital sunum)',
        ],
        adimlar: [
          'Problem tanımlama ve kullanici arastirmasi (1 ders)',
          'Fikir üretme ve prototip tasarlama (1 ders)',
          'Prototip geliştirme (1 ders)',
          'Test, iyilestirme ve sunum hazırlama (1 ders)',
        ],
        olasiSorunlar: [
          'Gruplarda liderlik sorunu — roller atayin (lider, tasarimci, arastirmaci, sunucu)',
          'Zaman yetmezligi — MVP düşüncesini hatırlatın',
          'Teknik zorluklar — mockup/wireframe yeterli, çalışan kod sart değil',
        ],
        ileriSeviye: 'Prototrpi gerçekten çalışan bir Teachable Machine modeli ile destekleyin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Her problem YZ ile çözülebilir mi? YZ\'nin çözemeyeceği problemler nelerdir?',
        ipuclari: [
          'Teknik sinirlar: veri olmayan sorunlar',
          'Etik sinirlar: insan karari gereken durumlar',
          'Pratik sinirlar: maliyet, enerji, zaman',
        ],
      },
      {
        soru: 'Bir YZ projesi başarısız olursa ne yapılır? Başarısızlık kotu bir şey midir?',
        ipuclari: [
          'Bilimsel yöntem: başarısızlık = veri',
          'Edison ampul hikayesi',
          'Pivot (yon değiştirme) kavramı',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ her problemi çözebilir',
        gercek: 'YZ belirli tur problemlerde (oruntu tanıma, tahmin) iyidir ama her sorunu çözemez.',
        nasilDuzeltilir: 'YZ\'nin güçlü ve zayif oldugu alanlarin listesini birlikte oluşturun.',
      },
      {
        yanilgi: 'Proje yapmak için uzman olmak gerekir',
        gercek: 'Basit araçlarla (Teachable Machine, PictoBlox) coculklar bile YZ projesi yapabilir.',
        nasilDuzeltilir: 'Küçük ve basit bir projeyle başlayarak ozguven kazandirin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Çalışan bir prototip geliştirme ve kullanici testi yapma',
        'Proje finansman plani (hayali) oluşturma',
      ],
      destekGerekli: [
        'Problem tanımlama odaklı çalışma (çözüm kısmını basitlestirin)',
        'Görsel prototip (poster/çizim) yeterli',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Design Thinking for Educators',
        url: 'https://designthinkingforeducators.com',
        aciklama: 'IDEO\'nun eğitimciler için Design Thinking kaynagi.',
      },
      {
        baslik: 'UN Sustainable Development Goals',
        url: 'https://sdgs.un.org/goals',
        aciklama: 'BM Sürdürülebilir Kalkinma Hedefleri — proje ilhami için.',
      },
    ],
  },

  // ========== BÖLÜM 8 ==========
  {
    bolumNo: 8,
    baslik: 'Dijital İçerik Üretimi',
    sinifSeviyesi: '7-8. Sınıf',
    dersSaati: 6,
    renk: 'from-rose-400 to-pink-500',
    icon: '🎨',
    kazanimlar: [
      'YZ ile görüntü, metin ve ses içerikleri üret',
      'Canva AI ile profesyonel tasarimlar yap',
      'Dijital hikaye anlatimi projesi geliştir',
      'YZ ile üretilen içeriklerde telif hakki ve etik konularini tartış',
      'Yaratici süreçte YZ\'yi yardımcı araç olarak kullan',
    ],
    dersPlani: {
      isinma: 'Bir YZ görüntü üretme aracına basit bir prompt girin ve sınıfa sonuçu gösterin. "Bu resim gerçek mi?" sorusu.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + YZ içerik üretim türleri' },
        { sure: '20 dk', icerik: 'Yapay mi Gerçek mi etkinliği' },
        { sure: '30 dk', icerik: 'YZ Poster Tasarimi (Canva AI)' },
        { sure: '2 ders', icerik: 'Dijital Hikaye Projesi' },
        { sure: '15 dk', icerik: 'Telif hakki tartışması + Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her öğrenci en iyi dijital eserini sınıfa gösterir (1 dakika gösterim).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'YZ ile görüntü üretirken en önemli faktor nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Açık ve detayli prompt yazmak',
        aciklama: 'Görüntü kalitesi büyük ölçude prompt kalitesine baglidir.',
        ogretmenNotu: 'Canli demo: aynı konuyu önce kısa ("kedi çiz") sonra detayli ("turuncu tekir kedi, gunes isiginda, suluboya") prompt ile deneyin.',
      },
      {
        soruNo: 2,
        soru: 'YZ ile üretilen görüntüyu paylaşırken ne yapmalisiniz?',
        dogruCevap: 'B',
        dogruSecenek: 'YZ ile üretildiğini belirtmek',
        aciklama: 'Seffaflik ve duurestluk dijital içerik paylesiminin temelidir.',
        ogretmenNotu: 'Deepfake tehlikesini hatırlatın. "Kimse YZ içeriğini gerçek gibi sunmamali" mesajini vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Canva AI hangi tur içerik üretiminde kullanılabilir?',
        dogruCevap: 'B',
        dogruSecenek: 'Sunum, poster, sosyal medya görseli ve daha fazlasi',
        aciklama: 'Canva AI cok yonlu bir tasarim araçı olup bircok içerik türünu destekler.',
        ogretmenNotu: 'Canva\'nin ucretsiz eğitim hesabini kullanın. Sınıfca bir proje ile canli demo yapın.',
      },
      {
        soruNo: 4,
        soru: 'YZ ile muzik üretirken telif hakkinda hangisi doğrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Her aracın kendi lisans kurallari vardir, kontrol edilmelidir',
        aciklama: 'Her YZ aracının farklı lisans politikaları var — kullanmadan önce okumak gerekir.',
        ogretmenNotu: '"Creative Commons" ve "ticari kullanım" kavramlarini basitce açıklayın.',
      },
      {
        soruNo: 5,
        soru: 'Dijital hikaye projesi için en uygun YZ araçları kombinasyonu hangisidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Metin için LLM + görüntü için görüntü üretici + ses için TTS',
        aciklama: 'Dijital hikaye; metin, görsel ve ses katmanlarindan olusur.',
        ogretmenNotu: 'Her katman için farklı YZ araçı kullanmayi gösterin. "YZ orkestrasyon" kavramını tanitim.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Yapay mi Gerçek mi?',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: 'Sınıf tartışması',
        hazirlik: [
          'YZ ile üretilmis ve gerçek fotooglarin karisimi (10-15 görüntü)',
          'Projeksiyon veya büyük ekran',
        ],
        adimlar: [
          'Her görüntüyu sırayla gösterin',
          'Öğrenciler "yapay" veya "gerçek" oylama yapar',
          'Doğru cevabi açıkladıktan sonra "nereden anladiniz?" tartışın',
          'YZ görüntülerinin ortak ozelliklerini (parmak hatasi, arka plan tutarsizligi vb.) gösterin',
        ],
        olasiSorunlar: [
          'YZ görüntüleri cok gerçekci olabilir — bu aslinda asil ogretici nokta',
          'Öğrenciler hayal kiriklígina ugrayabilir — "yanlış bilmek tamamen normal" vurgulayın',
        ],
        ileriSeviye: 'Deepfake video örnekleri de ekleyin ve hareketli içerikteki ipuclarini tartışın.',
      },
      {
        ad: 'YZ Poster Tasarimi',
        tip: 'bilgisayar',
        sure: '30 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Canva hesabi (eğitim versiyonu önerilir)',
          'Poster konusu (orn: "YZ\'nin Günlük Hayattaki Yeri")',
        ],
        adimlar: [
          'Canva\'yi acin ve sablonlardan poster seçin',
          'AI görüntü üretme ozelligini kullanın',
          'Metin, renk ve duzeni ayarlayin',
          'Sınıfa sunun',
        ],
        olasiSorunlar: [
          'Canva erisim sorunu — alternatif: PowerPoint veya Google Slides',
        ],
        ileriSeviye: 'Poster yerine animasyonlu sunum veya kısa video oluşturun.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ ile üretilen bir sanat eseri "gerçek sanat" midir?',
        ipuclari: [
          'Sanat tanımını tartışın',
          'Araç vs sanatci ayrımı',
          'Fotografin icadindaki benzer tartışmayı hatırlatın',
        ],
      },
      {
        soru: 'Bir YZ\'nin oluşturdugu içeriğin telif hakki kime aittir?',
        ipuclari: [
          'Henuz hukuki belirsizlik var',
          'Farklı ulkelerin yaklasimlarini arastirtin',
          'Prompt yazan vs YZ yaratan vs platform ayrımı',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ ile içerik üretmek yaraticiligi olddurur',
        gercek: 'YZ bir araçtır — yaraticilik hala insandan gelir. Fotograf makinesi ressamligi oldurmedigi gibi.',
        nasilDuzeltilir: 'YZ\'yi "dijital asistan" olarak konumlandirilir — fikir insanin, uygulama isbirligi.',
      },
      {
        yanilgi: 'YZ ile üretilen her şey ucretsiz kullanılabilir',
        gercek: 'Her aracın farklı lisans koşulları var. Bazi içerikler ticari kullanım için sinirlídir.',
        nasilDuzeltilir: 'En populer araçların lisans sayfalarini birlikte inceleyin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Kısa film / video projesi (YZ + gerçek görüntü birlesimi)',
        'YZ sanat sergisi duzenleme',
      ],
      destekGerekli: [
        'Sablonlarla çalışma (bos sayfa yerine)',
        'Öğretmen esliginde adım adım tasarim',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Canva for Education',
        url: 'https://www.canva.com/education/',
        aciklama: 'Canva\'nin ucretsiz eğitim hesabi — sınıflar için ideal.',
      },
      {
        baslik: 'This Person Does Not Exist',
        url: 'https://thispersondoesnotexist.com',
        aciklama: 'YZ ile üretilen yuz örnekleri — deepfake farkindailigi için gösterim.',
      },
    ],
  },

  // ========== BÖLÜM 9 ==========
  {
    bolumNo: 9,
    baslik: 'YZ ve Etik',
    sinifSeviyesi: '7-8. Sınıf',
    dersSaati: 4,
    renk: 'from-amber-400 to-orange-500',
    icon: '⚖️',
    kazanimlar: [
      'YZ etigi kavramını ve temel ilkelerini öğren',
      'YZ\'deki onyargı (bias) problemini ve etkilerini anla',
      'Deepfake ve dezenformasyon tehlikelerini tartış',
      'YZ\'nin is gücüne, gizlilige ve çevreye etkisini değerlendir',
      'Sorumlu YZ kullanımı için kendi ilkelerini oluştur',
    ],
    dersPlani: {
      isinma: '"YZ kararlar alsa — kimi ise alacagina YZ karar verse, adaletli olur mu?" sorusu. Sınıfın ilk tepkilerini dinleyin.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isınma + YZ etik ilkeleri tanitimi' },
        { sure: '25 dk', icerik: 'YZ Mahkemesi etkinliği (sınıf tartışması)' },
        { sure: '15 dk', icerik: 'Etik Pusula oluşturma' },
        { sure: '10 dk', icerik: 'Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her öğrenci kendi "YZ Kullanım Ilkem" yazarak sınıfa okur (1 cümle).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'YZ sistemlerinde "onyargı" (bias) ne demektir?',
        dogruCevap: 'B',
        dogruSecenek: 'Eğitim verisindeki dengesizlikten kaynaklanan adaletsiz sonuçlar',
        aciklama: 'YZ\'deki onyargı genellikle eğitim verisindeki dengesizlikten kaynaklanir.',
        ogretmenNotu: 'Somut örnek: Amazon\'un CV tarama YZ\'si kadinlari eledigi olay. Veri yanliligi → karar yanliligi zincirini kurun.',
      },
      {
        soruNo: 2,
        soru: 'Aşağıdakılerden hangisi YZ etigi ile ilgili önemli bir ilke DeğilDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Kar maksimizasyonu (en cok para kazanma)',
        aciklama: 'YZ etik ilkeleri: seffaflik, adalet, gizlilik, hesap verebilirlik. Kar amaçı etik ilke değildir.',
        ogretmenNotu: '"Bir sirket para kazanmak için adaletsiz YZ kullanirsa ne olur?" tartışması acilin.',
      },
      {
        soruNo: 3,
        soru: 'Deepfake teknolojisi için hangisi doğrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Gerçek olmayan video/ses içerikleri üreterek yaniltici olabilir',
        aciklama: 'Deepfake, gerçekci sahte içerikler üreterek dezenformasyon riskini artirabilir.',
        ogretmenNotu: 'Örnek deepfake videolari gösterin (orn: Obama deepfake). Hem tehlikeleri hem de olumlu kullanım alanlarini (sinema, eğitim) tartışın.',
      },
      {
        soruNo: 4,
        soru: 'YZ\'nin çevresel etkisi konusunda hangisi doğrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Büyük YZ modellerinin eğitimi cok enerji tuketir ve karbon salimi yapar',
        aciklama: 'GPT-4 gibi büyük modellerin eğitimi binlerce MW/saat enerji tuketir.',
        ogretmenNotu: 'Karbon ayak izi hesaplayicilarla somutlastirin. "Bir LLM eğitimi = \_\_\_ ucak yolculugu" benzeri karssilastirma.',
      },
      {
        soruNo: 5,
        soru: 'Sorumlu YZ kullanımı için en önemli prensip hangisidir?',
        dogruCevap: 'C',
        dogruSecenek: 'YZ\'nin sinirlarini bilmek ve insani denetimle kullanmak',
        aciklama: 'YZ güçlü bir araçtır ama her zaman insan gözetimi ve karar verme gerektrir.',
        ogretmenNotu: '"YZ araba kullanabilir ama direksiyondaki her zaman insan olmali" benzitmesi.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'YZ Mahkemesi',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: 'Sınıf tartışması (roller atanir)',
        hazirlik: [
          'Etik senaryo kartlari (3-4 senaryo)',
          'Roller: Savci, Savunma, Juri, Hakim',
          'Karar formu',
        ],
        adimlar: [
          'Bir etik senaryoyu okuyun (orn: "YZ ise alim karari verdi ve bir grubu eledi")',
          'Roller atanir: savci YZ\'yi suclar, savunma YZ\'yi savunur',
          'Her taraf 2 dakika konusur',
          'Juri oylama yapar',
          'Hakim (öğretmen) karar ozetini yapar',
        ],
        olasiSorunlar: [
          'Bazi öğrenciler rol yapmaktan cekinebilir — gonulluluk usulu seçin',
          'Tartışma isisinabilir — saygili dil kurallari belirlayın önceden',
        ],
        ileriSeviye: 'Öğrencilerin kendi etik senaryolarini yazmasini isteyin.',
      },
      {
        ad: 'Etik Pusula Oluşturma',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: '4-5 kişilik gruplar',
        hazirlik: [
          'Bos pusula sablonu (4 yon: Adalet, Seffaflik, Gizlilik, Sorumluluk)',
          'Kalemler ve renkli yapiskanlar',
        ],
        adimlar: [
          'Her grup 4 etik ilke için somut kurallar yazar',
          'Kurallar pusulaya yazılır',
          'Gruplar pusulalarini sınıfa sunar',
          'Sınıfca ortak bir "YZ Etik Antlasmasi" oluşturulur',
        ],
        olasiSorunlar: [
          'Soyut kalabilir — somut örneklerle destekleyin ("Bu kural mesela ne zaman uygulanir?")',
        ],
        ileriSeviye: 'Etik Antlasmayi poster olarak sınıfa asin ve yıl boyunca referans olarak kullanın.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ bize kararlar vermeye başlarsa ozgurluklerimiz kişitlanır mi?',
        ipuclari: [
          'Otonom araçlar, kredi değerlendirme, ceza sistemi örnekleri',
          'Insan denetimi kavramını vurgulayın',
          '"YZ danisir, insan karar verir" prensibini tartışın',
        ],
      },
      {
        soru: 'Onyargili bir YZ sistemini nasil duzeltebiliriz?',
        ipuclari: [
          'Veri çeşitliliğini artirmak',
          'Duzenli denetim ve test',
          'Farklı bakis acilariyla değerlendirme',
          'Seffaf algoritmalar',
        ],
      },
      {
        soru: 'YZ is dünyasını nasil değiştirecek? Bazi meslekler yok olacak mi?',
        ipuclari: [
          'Tarihteki benzer dönüşumler (sanayi devrimi)',
          'Yok olan meslekler vs yeni ortaya cikan meslekler',
          'Hayat boyu öğrenme vurgusu',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ tarafsiz ve objektiftir',
        gercek: 'YZ, insanlarin oluşturdugu verilerle eğitilir. Verideki onyargilar YZ\'ye yansir.',
        nasilDuzeltilir: 'Gerçek onyargı örnekleri gösterin: yuz tanıma hatalar, kredi değerlendirme adaletsizlikleri.',
      },
      {
        yanilgi: 'Deepfake sadece ünlüler için tehlikeli',
        gercek: 'Herkes deepfake kurbani olabilir. Siber zorbalik ve dolandiricilik amaçıyla kullanılabilir.',
        nasilDuzeltilir: 'Kişisel guvenlık onlemleri ve dijital okuryazarlik eğitimi.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Ulusal/uluslararasi YZ etik duzenlemeleri arastirmasi (AB YZ Yasasi)',
        'Etik senaryo bankasi oluşturma',
      ],
      destekGerekli: [
        'Somut örnekler ve görsellerle etik kavramlarini ogretme',
        'Basit senaryolarla "doğru/yanlış" oylaması',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI Ethics Guidelines (UNESCO)',
        url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
        aciklama: 'UNESCO\'nun YZ etik rehberi — öğretmen arka plan bilgisi.',
      },
      {
        baslik: 'Moral Machine',
        url: 'https://www.moralmachine.net',
        aciklama: 'MIT\'nin etik karar verme deneyi — sınıfta interaktif demo için.',
      },
    ],
  },

  // ========== BÖLÜM 10 ==========
  {
    bolumNo: 10,
    baslik: 'Gelecek Seninle Başlar',
    sinifSeviyesi: '8. Sınıf',
    dersSaati: 8,
    renk: 'from-indigo-400 to-violet-500',
    icon: '🚀',
    kazanimlar: [
      'Kapsamli bir YZ projesi planla ve hayata gecir',
      'Proje portfolyosu hazırlama becerisi kazan',
      'YZ alanindaki kariyer firsatlarini ve yeni meslekleri kesfet',
      'Hayat boyu öğrenme yol haritasi oluştur',
      'Kitap boyunca öğrendiğin her seyi bir final projesiyle birlestir',
    ],
    dersPlani: {
      isinma: '"9 bolum boyunca en cok neyi öğrendiniz? Bir cümleyle ozetleyin." Sınıf türü.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isınma + final projesi tanitimi' },
        { sure: '6 ders', icerik: 'Final Projesi (planlama, geliştirme, test, sunum)' },
        { sure: '25 dk', icerik: 'Kariyer Yol Haritasi etkinliği' },
        { sure: '20 dk', icerik: 'Gelecek Mektubu etkinliği' },
        { sure: '1 ders', icerik: 'Gelecek Fuari + Quiz' },
        { sure: '10 dk', icerik: 'Kapanış ve sertifika' },
      ],
      kapanis: 'Sertifika dagitimi + "Gelecekte YZ ile \_\_\_\_ yapacagim" paylaşımı.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Bir YZ projesi portfolyosu için en önemli ogeler hangileridir?',
        dogruCevap: 'B',
        dogruSecenek: 'Problem tanımı, süreç, sonuçlar ve öğrenilen dersler',
        aciklama: 'Iyi bir portfolyo sadece sonuçu değil, tum süreçi ve çıkarılan dersleri icerir.',
        ogretmenNotu: 'Öğrencilere örnek portfolyo gösterin. "Kod yeterli" düşüncesi yaygin — süreç dokumantasyonunun değerini vurgulayın.',
      },
      {
        soruNo: 2,
        soru: 'YZ alaninda çalışmak için hangi beceriler en önemlidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Programlama + matematik + problem çözme + iletisim',
        aciklama: 'YZ multidisipliner bir alandir — sadece teknik beceriler yetmez.',
        ogretmenNotu: '"Sadece programlama" seçeneği yaygin yanlış. Iletisim ve isbirligi becerilerinin önemini vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Aşağıdakılerden hangisi YZ ile ilgili yeni ortaya cikan bir meslek DeğilDIR?',
        dogruCevap: 'D',
        dogruSecenek: 'Atli Postaci',
        aciklama: 'Atli postacilik teknoloji öncesi donemden kalan bir meslek olup YZ ile ilgisi yoktur.',
        ogretmenNotu: 'Eglenceli bir soru — öğrenciler gulecek. Bu firsati yeni YZ mesleklerini (Prompt Muhendisi, YZ Etik Danismani, Veri Bilimci) tanitmayi kullanın.',
      },
      {
        soruNo: 4,
        soru: '"Hayat boyu öğrenme" YZ caginda neden önemlidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Teknoloji cok hızlı degistigi için sürekli yeni beceriler öğrenilmelidir',
        aciklama: 'YZ alani cok hızlı gelisiyor — 5 yıl önce olmayan araçlar şimdi standart.',
        ogretmenNotu: '5 yıl önce ChatGPT\'nin olmadigini hatırlatın. "Siz mezun oldugunuzda hangi yeni araçlar olacak?" sorusuyla gelecegi düşündurrun.',
      },
      {
        soruNo: 5,
        soru: 'Bu kitapta öğrenendiğiniz en önemli ders nedir?',
        dogruCevap: 'C',
        dogruSecenek: 'YZ güçlü bir araçtır ve sorumlulukla kullanılmalıdır',
        aciklama: 'YZ ne sihir ne de tehlikedir — sorumlu ve bilinclirelik kullanılması gereken güçlü bir araçtır.',
        ogretmenNotu: 'Kitabin ana mesaji! Tum 10 bolumun ozeti bu ciimlede. "Güç, sorumluluk getirir" prensibini vurgulayın.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Final Projesi',
        tip: 'proje',
        sure: '6 ders saati',
        gruplama: 'Bireysel veya 2-3 kişilik grup',
        hazirlik: [
          'Proje önerisi sablonu',
          'Değerlendirme rubriigi (problem, çözüm, uygulama, sunum)',
          'Bilgisayar erisimi',
          'Sunum materyalleri',
        ],
        adimlar: [
          '1. ders: Problem seçimi + proje önerisi yazma',
          '2. ders: Arastirma + tasarim',
          '3-4. ders: Prototip geliştirme',
          '5. ders: Test + iyilestirme + sunum hazırlık',
          '6. ders: Sunumlar + değerlendirme',
        ],
        olasiSorunlar: [
          'Cok büyük projeler seçilebilir — MVP kavramını hatırlatın',
          'Teknik zorluklar — mockup + açıklama yeterli, çalışan uru sart değil',
          'Zaman yönetimi — her ders için mini hedef belirleyin',
        ],
        ileriSeviye: 'Gerçekten çalışan bir prototip + kullanici testi raporu.',
      },
      {
        ad: 'Gelecek Mektubu',
        tip: 'yaratici',
        sure: '20 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Mektup kagidi veya dijital form',
          'Zarflar (fiziksel mektup için)',
        ],
        adimlar: [
          'Her öğrenci 5 yıl sonraki kendisine mektup yazar',
          '"Bugur öğrendiğim \_\_\_, gelecekte \_\_\_ yapmak istiyorum" sablonu',
          'Mektuplar zarflanir ve öğretmende saklanir (veya dijital olarak kaydedilir)',
          'Gonullu öğrenciler mektuplarini okur',
        ],
        olasiSorunlar: [
          'Bazi öğrenciler ne yazacagini bilemeyebilir — sablonlu form verin',
          'Duygusal olabilir — olumlu ve destekleyici ortam yaratim',
        ],
        ileriSeviye: 'Video mektup kaydetin (1 dk).',
      },
      {
        ad: 'Gelecek Fuari',
        tip: 'unplugged',
        sure: '1 ders saati',
        gruplama: 'Sınıf etkinliği',
        hazirlik: [
          'Her grubun projesini sergileyecegi masa/alan',
          'Değerlendirme formlari (diger öğrenciler için)',
          'Oduller (en yaratici, en faydali, en iyi sunum vb.)',
        ],
        adimlar: [
          'Sıralarılmaslarını kurup projelerini sergiler',
          'Galeri yuruyusu: her öğrenci en az 3 projeyi ziyaret eder',
          'Değerlendirme formu doldurulur',
          'Oylar sayılır ve oduller verilir',
        ],
        olasiSorunlar: [
          'Bazi projeler hazır olmayabilir — "çalışma süreçi" de sunulabilir',
          'Oylama adaletsiz olabilir — öğretmen jurisi de ekleyin',
        ],
        ileriSeviye: 'Okul genelinde veya velilere açık fuar.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ dünyanın en büyük problemlerinden hangisini çözebilir? (iklim, sağlık, eğitim, aclik)',
        ipuclari: [
          'Her alan için somut YZ uygulamalarini tartışın',
          'YZ\'nin tek başına degiilj insan + YZ isbirligiyle çözüm üreteceğini vurgulayın',
          'BM Sürdürülebilir Kalkinma Hedeflerini refearans gösterin',
        ],
      },
      {
        soru: '10 yıl sonra YZ nasil olacak? Hangi yeni meslekler ortaya cikacak?',
        ipuclari: [
          'Hayal gücü siniri koymayin',
          'Gerçekci ve fantastik tahminleri ayirin',
          'Hazırlık: "öğrenmeye devam etme" vurgulayın',
        ],
      },
      {
        soru: 'Bu derste öğrendiğimiz en önemli 3 şey neydi?',
        ipuclari: [
          'Yıl sonu değerlendirmesi',
          'Her öğrenciden farklı 3 şey isteyin',
          'Ortak temalari çıkarıın',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ sadece programcilar içindir',
        gercek: 'YZ her alani etkiliyor — doktorlar, öğretmenler, sanatcilar, ciftciler de YZ kullaniyor ve kullanacak.',
        nasilDuzeltilir: 'Farklı mesleklerde YZ kullanım örnekleri listeleyin.',
      },
      {
        yanilgi: 'Okuldaki dersler YZ caginda isime yaramayacak',
        gercek: 'Matematik, dil, bilim, etik, iletisim — tümü YZ caginda da kritik beceriler. YZ bu becerilerin ustune insa ediliyor.',
        nasilDuzeltilir: 'Her ders ile YZ baglantisini kurun: "Matematik YZ\'nin temelidir, Turkce prompt yazmak içindir..."',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Portfolyo web sitesi oluşturma (basit HTML veya Canva)',
        'YZ alaninda staj / gonullu firsatlari arastirma',
        'Okul YZ kulubu kurma planı',
      ],
      destekGerekli: [
        'Proje yerine poster sunumu yeterli',
        'Sablonlu portfolyo formu',
        'Öğretmen rehberliginde adım adım proje',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI Career Pathways',
        url: 'https://ai4k12.org/resources/ai-career-pathways/',
        aciklama: 'YZ kariyer yollari — öğrencilere ilham için.',
      },
      {
        baslik: 'Code.org - AI Kurslari',
        url: 'https://code.org/ai',
        aciklama: 'Ucretsiz YZ kodlama kurslari — devam etmek isteyenler için.',
      },
      {
        baslik: 'Coursera - AI for Everyone',
        url: 'https://www.coursera.org/learn/ai-for-everyone',
        aciklama: 'Andrew Ng\'in herkes için YZ kursu — öğretmen gelisimi için.',
      },
    ],
  },
]
