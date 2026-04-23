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
    sinifSeviyesi: '6. Sinif',
    dersSaati: 4,
    renk: 'from-sky-400 to-blue-500',
    icon: '🔍',
    kazanimlar: [
      'Zeka kavramini tanimla, insan zekasi ile yapay zekayi karsilastir',
      'Yapay zekanin tarihcesini ve onemli kilometre taslarini ogren',
      'Yapay zeka turlerini (dar, genel, super) ayirt et',
      'Yapay zekanin gunluk hayattaki orneklerini fark et',
    ],
    dersPlani: {
      isinma: '"Sizce bir bilgisayar dusunebilir mi?" sorusuyla tartisma baslatilir. Ogrencilerden 1 dakika dusunup yanit vermeleri istenir.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma tartismasi + kazanimlarin paylasimi' },
        { sure: '15 dk', icerik: 'YZ nedir? Tanimi, tarihcesi, turleri (slaytlar)' },
        { sure: '20 dk', icerik: 'Kim Daha Zeki etkinligi (unplugged)' },
        { sure: '10 dk', icerik: 'Quiz (5 soru)' },
        { sure: '5 dk', icerik: 'Kapanis + ogrenci sorulari' },
      ],
      kapanis: 'Her ogrenci "Bugun ogrendigim en ilginc sey..." cumlesini tamamlar.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Asagidakilerden hangisi yapay zekanin tanimi icin en uygun ifadedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Makinelerin insanlara benzer zeki davranislar gostermesi',
        aciklama: 'YZ, makinelerin insan zekasini taklit ederek ogrenme, problem cozme ve karar verme yeteneklerini kapsar.',
        ogretmenNotu: 'Ogrenciler "bilgisayarlarin hizli calismasi" secenegini secebilir. Hiz ile zeka arasindaki farki vurgulayin — hiz tek basina zeka degildir.',
      },
      {
        soruNo: 2,
        soru: '"Yapay zeka" terimi ilk kez hangi yil kullanilmistir?',
        dogruCevap: 'C',
        dogruSecenek: '1956',
        aciklama: '1956 Dartmouth Konferansinda John McCarthy "yapay zeka" terimini ilk kez kullanmistir.',
        ogretmenNotu: 'Ogrenciler 1950 ile karistirabilir — 1950 Turing Testinin onerilme yili, terim 1956da resmi oldu. Tarih siralama etkinligiyle pekistirin.',
      },
      {
        soruNo: 3,
        soru: 'Asagidakilerden hangisi dar yapay zeka (Narrow AI) ornegi DEGILDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Insanlar gibi her konuda dusunebilen robot',
        aciklama: 'Her konuda dusunebilen bir robot Genel YZ (AGI) kavrami olup henuz gerceklesmemistir. Dar YZ sadece tek bir goreve odaklanir.',
        ogretmenNotu: 'Dar/Genel/Super YZ ayrimi kavrattirmak icin tahtaya uc sutun cizin ve ogrencilerden ornekleri yazmalarini isteyin.',
      },
      {
        soruNo: 4,
        soru: 'Turing Testini kim one surmustur?',
        dogruCevap: 'B',
        dogruSecenek: 'Alan Turing',
        aciklama: 'Alan Turing, 1950 yilinda bir makinenin insani kandirip kandiramadigini test eden bu yontemi one surmustur.',
        ogretmenNotu: 'Cahit Arf secenegi dikkat cekici — Turk matematikci ama YZ ile ilgisi yok. John McCarthy YZ terimini icat etti ama Turing Testi Alan Turing\'e aittir.',
      },
      {
        soruNo: 5,
        soru: 'Asagidaki gorevlerden hangisinde yapay zeka insanlardan daha basarilidir?',
        dogruCevap: 'C',
        dogruSecenek: 'Milyonlarca veriyi saniyeler icinde analiz etmek',
        aciklama: 'YZ buyuk veri islemede insanlardan cok daha hizli ve dogrudr. Yaraticilik ve empati hala insan uzmanligi.',
        ogretmenNotu: 'Bu soru ile "Kim Daha Zeki" etkinligini baglantilayabilirsiniz. YZ\'nin ustun oldugu ve insanlarin ustun oldugu alanlari karsilastirma firsati.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Kim Daha Zeki?',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: '4-5 kisilik gruplar',
        hazirlik: [
          'Gorev kartlarini onceden yazdirin veya sayfadan indirin',
          'Her grup icin bir makas ve yapiskan hazirlayin',
          'Tahtaya "Insan" ve "Makine" sutunlari cizin',
        ],
        adimlar: [
          'Kartlari gruplara dagitin (her grupta 10-12 kart)',
          'Her kart icin "Bu gorevi insan mi yoksa makine mi daha iyi yapar?" tartismasi',
          'Gruplarin kararlari tahtadaki sutunlara yazilin',
          'Sinifca sonuclari karsilastirin ve tartismayi yonetin',
        ],
        olasiSorunlar: [
          'Bazi gorevler her ikisi icin de uygun olabilir — bu durumda "neden?" sorusuyla derinlestirilir',
          'Gruplar hizli bitirirse ek gorev kartlari hazirlayabilirsiniz',
        ],
        ileriSeviye: '"Gelecekte bu gorev icin YZ daha basarili olabilir mi?" sorusuyla uzantiya gidin. 2050 yili icin tahminler yaptirin.',
      },
      {
        ad: 'YZ Dedektifi',
        tip: 'unplugged',
        sure: '1 gun gozlem + 20 dk sinif tartismasi',
        gruplama: 'Bireysel gozlem, sinif tartismasi',
        hazirlik: [
          'Gozlem formunu onceden her ogrenciye dagitin',
          'Ogrencilere bir gun oncesinden gorevi verin',
        ],
        adimlar: [
          'Ogrenciler 1 gun boyunca karsilastiklari YZ orneklerini gozlem formuna yazerlar',
          'Ertesi gun sinifta herkes en az 1 gozlemini paylesir',
          'Tahtada YZ ornekleri kategorilere ayrilir (ev, okul, ulasim, saglik vb.)',
          'En sasirtici ve en yaygin ornekler secelir',
        ],
        olasiSorunlar: [
          'Bazi ogrenciler hic ornek bulamamis olabilir — yonlendirici sorular sorun: "Telefonunda hangi uygulamalari kullaniyorsun?"',
          'YZ olmayan teknolojiler (ornegin hesap makinesi) ile karistirabilirler — farki aciklayin',
        ],
        ileriSeviye: 'Gozlemleri sinif icin bir "YZ Haritasi" posterine donusturun.',
      },
      {
        ad: 'YZ Zaman Cizelgesi',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Grup calismasi (4-5 kisi)',
        hazirlik: [
          'Her grup icin buyuk bir karton veya A3 kagit',
          'Renkli kalemler, yapiskan notlar',
          'Tarih kartlarini onceden hazirlayin (1642, 1950, 1956, 1997, 2011, 2022 vb.)',
        ],
        adimlar: [
          'Gruplara tarih kartlarini dagitin',
          'Kartlari kronolojik siraya dizmeleri isteyin',
          'Her tarih icin ne oldugunu yazmalari isteyin',
          'Posterleri duvara asin ve galeri yuruyusu yapin',
        ],
        olasiSorunlar: [
          'Tarihleri ezberlemek zor olabilir — kartlarin arkasina ipucu yazabilirsiniz',
          'Bazi tarihler tartismali olabilir — "yaklasik tarih" kavramini aciklayin',
        ],
        ileriSeviye: '2030, 2040 ve 2050 icin tahminler ekletin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Yapay zeka bir gun insanlar kadar zeki olabilir mi?',
        ipuclari: [
          'Dar YZ vs Genel YZ kavramlarini hatirlatin',
          'Bilim insanlarinin farkleri goresleri oldugunu vurgulayin',
          'Hem "evet" hem "hayir" tarafindaki argumanlari cikarin',
        ],
      },
      {
        soru: 'Evinizdeki hangi cihazlar YZ kullaniyor? Bunlar olmasa hayatiniz nasil degisirdi?',
        ipuclari: [
          'Telefon, TV, akilli hoparlor, oyun konsolundan baslatin',
          'YZ olmadan da calisabilecek ve calisamayacak cihazlari ayirin',
          'Bagimsizlik ve teknoloji konusunu acin',
        ],
      },
      {
        soru: 'YZ ile bir insanin arasindaki en buyuk fark nedir?',
        ipuclari: [
          'Duygular, yaraticilik, empati kavramlarini irdeleyin',
          'YZ\'nin "anlama" vs "taklit" farki',
          'Ogrencilerin kendi deneyimlerinden ornekler vermesini isteyin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Yapay zeka = Robot',
        gercek: 'YZ bir yazilimdir, robot ise fiziksel bir makinedir. Cogu YZ robota ihtiyac duymaz (ornegin sesli asistan, spam filtresi).',
        nasilDuzeltilir: 'Tahtaya YZ ornekleri yazip hangilerinin robot oldugunu, hangilerinin yazilim oldugunu sorun. Ogrenciler cogunun "gorunmez" YZ oldugunu fark edecek.',
      },
      {
        yanilgi: 'YZ her seyi bilir ve hic hata yapmaz',
        gercek: 'YZ sadece egitildigi veriler kadar iyidir. Hatali veri = hatali sonuc. Ayrica YZ "bilmez", istatistiksel tahmin yapar.',
        nasilDuzeltilir: '"YZ\'ye saçma bir soru sorun ve cevabi goruntuleyin" etkinligi yapin. ChatGPT veya Gemini\'ye kasitli yanlis soru sorup hata yaptigini gosterin.',
      },
      {
        yanilgi: 'YZ yakin zamanda insanlarin yerini alacak',
        gercek: 'YZ bazi gorevleri otomatiklestiriyor ama yeni meslekler de yaratiyor. Insanlarin yaraticilik, empati ve karmasik karar verme becerileri hala essiz.',
        nasilDuzeltilir: 'Tarihteki teknoloji devrimlerini hatirlatin (buhar makinesi, internet) — her seferinde yeni meslekler ortaya cikti.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'YZ tarihindeki onemli kisileri arastirip mini biyografi hazirlama',
        '"2050 yilinda YZ" baslikli kisa bir gelecek tahmini yazisi yazma',
        'Turing Testini sinif arkadaslariyla canlandirma (biri "YZ" rolunde)',
      ],
      destekGerekli: [
        'Kim Daha Zeki kartlarini azaltin (5-6 kart yeterli)',
        'YZ orneklerini gorsel kartlarla destekleyin (resim + yazi)',
        'Quiz oncesinde kavramlari tekrar edin ve anahtar kelimeleri tahtaya yazin',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI4K12 - YZ Egitim Kaynagi',
        url: 'https://ai4k12.org',
        aciklama: 'K-12 seviyesi icin YZ egitim standartlari ve etkinlik fikirleri.',
      },
      {
        baslik: 'MIT Day of AI',
        url: 'https://www.dayofai.org',
        aciklama: 'MIT\'nin ortaokul seviyesi icin YZ etkinlikleri ve ders planlari.',
      },
      {
        baslik: 'Elements of AI',
        url: 'https://www.elementsofai.com',
        aciklama: 'YZ temellerini ogreten ucretsiz online kurs (ogretmen icin arka plan bilgisi).',
      },
    ],
  },

  // ========== BÖLÜM 2 ==========
  {
    bolumNo: 2,
    baslik: 'Gunluk Hayatta YZ',
    sinifSeviyesi: '6. Sinif',
    dersSaati: 4,
    renk: 'from-emerald-400 to-teal-500',
    icon: '🏠',
    kazanimlar: [
      'YZ\'nin gunluk hayatta kullanildigi alanlari kesfet',
      'Telefonumuzdaki YZ uygulamalarini tanimla',
      'Farkli sektorlerde (saglik, ulasim, egitim, tarim) YZ kullanim ornekleri ver',
      'YZ uygulamalarinin arkasindaki temel teknolojileri anla',
    ],
    dersPlani: {
      isinma: '"Bu sabah uyandıgindan beri kac kez YZ ile etkilesime girdiniz?" sorusu. Ogrenciler parmak kaldirarak tahmin eder.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + onceki bolumun kisa tekrari' },
        { sure: '15 dk', icerik: 'Gunluk hayatta YZ alanlari (slaytlar + tartisma)' },
        { sure: '20 dk', icerik: 'YZ Haritasi etkinligi' },
        { sure: '10 dk', icerik: 'Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"Yarin bir gun boyunca hic YZ kullanmadan yasamayi deneyin" meydan okumasi.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Asagidakilerden hangisi YZ\'nin gunluk hayattaki bir uygulamasi DEGILDIR?',
        dogruCevap: 'B',
        dogruSecenek: 'Elektrik supurgesinin dugmeyle acilmasi',
        aciklama: 'Dugmeyle calisan bir elektrik supurgesi basit bir mekanik cihadir, YZ icermez.',
        ogretmenNotu: 'Ogrenciler "teknoloji = YZ" zannedebilir. Teknoloji ile YZ arasindaki farki vurgulayin — her elektronik cihaz YZ kullanmaz.',
      },
      {
        soruNo: 2,
        soru: 'Bir sesli asistanin calismasinda hangi YZ teknolojileri gerekir?',
        dogruCevap: 'B',
        dogruSecenek: 'Ses tanima + dogal dil isleme + konusma sentezi',
        aciklama: 'Sesli asistan 3 katmanli bir YZ sistemidir: sesi metne cevirir, anlam cikarir, yanit uretir.',
        ogretmenNotu: 'Tahtaya 3 asamali bir diyagram cizin: Mikrofon → Ses Tanima → NLP → Yanit Uretimi → Hoparlor. Her asamayi sinifia aciklayin.',
      },
      {
        soruNo: 3,
        soru: 'Muzik ve video platformlarinin "Sana Ozel" listeleri hangi YZ yontemiyle olusturulur?',
        dogruCevap: 'B',
        dogruSecenek: 'Oneri sistemi (tavsiye algoritmalari)',
        aciklama: 'Oneri sistemleri kullanicinin gecmis davranislarini analiz ederek benzer icerikleri onerirler.',
        ogretmenNotu: 'YouTube/Spotify ornegi ile somutlastirin. "Neden hep benzer sarkilan goruyorsunuz?" sorusuyla baglantilerin.',
      },
      {
        soruNo: 4,
        soru: 'Akilli ev sistemlerinde yapay zeka ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Aliskanliklarinizi ogrenerek enerji tasarrufu saglar',
        aciklama: 'Akilli ev YZ\'si zaman iceride kullanici aliskanliklarini ogrenir ve otomasyon yapar.',
        ogretmenNotu: '"Sadece isiklari acar" secenegi dikkat cekici — ogrencilere "peki bunu zamanlayici da yapabilir, YZ farkli ne yapar?" diye sorun.',
      },
      {
        soruNo: 5,
        soru: 'Asagidaki YZ uygulamalarindan hangisi saglik alaninda kullanilir?',
        dogruCevap: 'B',
        dogruSecenek: 'Rontgen ve MR goruntelerinde hastalik tespiti',
        aciklama: 'Tibbi goruntu analizi YZ\'nin en basarili saglik uygulamalarindan biridir.',
        ogretmenNotu: 'Gercek ornekler gosterin: Google\'in diyabetik retinopati tespiti, YZ ile rontgen analizi. Ogrenciler saglik+teknoloji bagini gorunce cok heyecanlanir.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'YZ Haritasi',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Bireysel + sinif tartismasi',
        hazirlik: [
          'Her ogrenciye bos bir kagit veya form',
          'Tahtada ya da projeksiyon icin kategori basiklari: Ev, Okul, Ulasim, Saglik, Eglence',
        ],
        adimlar: [
          'Ogrenciler 5 dakika boyunca bildikleri YZ orneklerini yazarlar',
          'Kategorilere gore siniflandirilir',
          'Her kategoriden en ilginc ornek secilir',
          'Sinif ortaklasa bir "YZ Haritasi" posteri olusturur',
        ],
        olasiSorunlar: [
          'Bazi ogrenciler cok az ornek bulabilir — yan siniftaki arkadasiyla eslestirin',
          'YZ olmayan teknolojiler yazilabilir — bunlari ayiklamayi ogretici bir firsat olarak kullanin',
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
          'Test sorusu listesi hazirlayin',
        ],
        adimlar: [
          'Basit sorularla baslayın: "Hava nasil?", "Saat kac?"',
          'Karisik sorular sorun: "Hayatin anlami ne?", sacma bir soru',
          'Asistanin yapamadigi seyleri not edin',
          'YZ\'nin sinirlarini tartisın',
        ],
        olasiSorunlar: [
          'Tum ogrencilerin telefonu olmayabilir — eslesme yaparak calisin',
          'Internet baglantisi gerekli',
        ],
        ileriSeviye: 'Farkli dillerde soru sorarak dil anlama kapasitesini test edin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Bir gun boyunca hic YZ kullanmadan yasayabilir misiniz? Neleri yapamadiniz?',
        ipuclari: [
          'Telefon, harita, arama motoru, sosyal medya orneklerini hatirlatin',
          'YZ bagimliligi konusunu hassasca acin',
          'Pozitif ve negatif yonleri dengeli tartistin',
        ],
      },
      {
        soru: 'YZ sizin hakkinieda ne biliyor? Bu sizi rahatsiz ediyor mu?',
        ipuclari: [
          'Oneri sistemlerinin veri topladaigni hatirlatin',
          'Gizlilik kavramini yaslarina uygun sekilde acin',
          '"Kolaylik vs Gizlilik" dengesini tartistin',
        ],
      },
      {
        soru: 'Gelecekte hangi yeni alanlarda YZ kullanilabilir?',
        ipuclari: [
          'Hayal gucu siniri koymayin',
          'Gercekci ve fantastik fikirleri ayirin ama fantastik olanlari da degerlendirin',
          'En yaratici fikirleri sinifla paylasin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ beni 7/24 izliyor ve dinliyor',
        gercek: 'Sesli asistanlar sadece uyandirma kelimesi ("Hey Siri") duyuldiginda aktif olur. Surekli kayit yapmaz. Ancak veri gizliligi gercekten onemli bir konudur.',
        nasilDuzeltilir: 'Sesli asistanin nasil calistigini teknik olarak aciklayin. Yerel isleme vs bulut isleme farkini gosterin.',
      },
      {
        yanilgi: 'YZ uygulamalari bedava ve zararsizdir',
        gercek: 'Cogu "ucretsiz" uygulama verinizle para kazanir. Reklam hedefleme, veri satisi gibi imodeller vardir.',
        nasilDuzeltilir: '"Urun siz degilseniz, urun verinizdir" sozunu tartisin. Uygulama izinlerini inceleyin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Bir YZ uygulamasinin arka planinda hangi teknolojiler calistigini arastirma raporu',
        'Akilli sehir konsepti hakkinda poster hazirlama',
      ],
      destekGerekli: [
        'YZ orneklerini gorsel kartlarla sunun (resim + basit aciklama)',
        'Sadece 3 kategori ile calisin (Ev, Okul, Eglence)',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'How AI Powers Everyday Apps',
        url: 'https://www.youtube.com/results?search_query=how+AI+powers+everyday+apps',
        aciklama: 'YZ\'nin gunluk uygulamalardaki rolu hakkinda videolar.',
      },
      {
        baslik: 'AI Experiments by Google',
        url: 'https://experiments.withgoogle.com/collection/ai',
        aciklama: 'Google\'in interaktif YZ deneyleri — sinifta canli gosterim icin mukemmel.',
      },
    ],
  },

  // ========== BÖLÜM 3 ==========
  {
    bolumNo: 3,
    baslik: 'Verinin Gucu',
    sinifSeviyesi: '6. Sinif',
    dersSaati: 4,
    renk: 'from-violet-400 to-purple-500',
    icon: '📊',
    kazanimlar: [
      'Veri kavramini tanimla, farkli veri turlerini ayirt et',
      'Yapisal ve yapisal olmayan veri arasindaki farki anla',
      'Verinin YZ icin neden onemli oldugunu acikla',
      'Veri toplama, temizleme ve etiketleme sureclerini ogren',
      'Veri gizliligi ve KVKK konusunda bilinc kazan',
    ],
    dersPlani: {
      isinma: '"Sinifimiz hakkinda hangi verileri toplayabiliriz?" sorusu. Tahtaya ogrencilerin fikirlerini yazin (boy, yas, goz rengi, sevdigi renk vb.).',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + sinif anketi veri toplama' },
        { sure: '15 dk', icerik: 'Veri turleri, yapisal/yapisal olmayan veri (slaytlar)' },
        { sure: '20 dk', icerik: 'Veri Etiketleme Atolyesi / Sinif Anketi etkinligi' },
        { sure: '10 dk', icerik: 'KVKK ve gizlilik tartismasi + Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her ogrenci "Verilerin korunmasi icin dikkat ettigim bir sey..." paylaşir.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Asagidakilerden hangisi "veri" icin en dogru tanimdir?',
        dogruCevap: 'B',
        dogruSecenek: 'Islenebilir, kaydedilebilir her turlu bilgi parcasi',
        aciklama: 'Veri; rakam, metin, goruntu, ses gibi her turlu islenebilir bilgidir.',
        ogretmenNotu: '"Sadece rakamlar" secenegi yaygin hata. Foto, ses, video da veridir. Siniftan farkli veri turleri ornekleri isteyin.',
      },
      {
        soruNo: 2,
        soru: 'Bir YZ modelini egitmek icin hangi tur veri KULLANILMAZ?',
        dogruCevap: 'C',
        dogruSecenek: 'Rastgele uretilmis anlamsiz sayilar',
        aciklama: 'YZ modelleri anlamli oruntulere ihtiyac duyar. Rastgele veriden ogrenilemez.',
        ogretmenNotu: '"Hasta kayitlari" secenegini isaretleyenler olabilir — anonim veri ile kisisel veri farkini aciklayin.',
      },
      {
        soruNo: 3,
        soru: 'Asagidakilerden hangisi "yapisal veri" ornegi DEGILDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Bir ogrencinin yazdigi kompozisyon',
        aciklama: 'Kompozisyon serbest metin oldugu icin yapisal olmayan (yapisiz) veridir.',
        ogretmenNotu: 'Not cizelgesi ile kompozisyon ornegini yanyana koyun. "Hangisini tabloya koyabilirsiniz?" sorusuyla kavratin.',
      },
      {
        soruNo: 4,
        soru: 'Veri toplama surecinde asagidakilerden hangisi etik bir sorun olusturur?',
        dogruCevap: 'B',
        dogruSecenek: 'Insanlarin izni olmadan kisisel bilgilerini kaydetmek',
        aciklama: 'Izinsiz veri toplama hem etik degildir hem de KVKK\'ya aykiridir.',
        ogretmenNotu: 'KVKK kavramini somut orneklerle aciklayin: "Sinif arkadasinizin fotosunu izinsiz paylasabilir misiniz?"',
      },
      {
        soruNo: 5,
        soru: '"Buyuk veri" (big data) kavrami icin hangisi YANLISDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Sadece buyuk sirketler uretir',
        aciklama: 'Herkes veri uretir — sosyal medya paylasimi, sensor verileri, arama gecmisi vb.',
        ogretmenNotu: '"Siz de her gun veri uretiyorsunuz!" vurgulayarak kisisellestirin. Gunluk veri uretim ornekleri isteyin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Sinif Anketi',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: 'Sinif calismasi',
        hazirlik: [
          'Anket sorularini hazirlayin (5-6 soru: boy, goz rengi, sevdigi ders, ulasim araci vb.)',
          'Tablo kagitlari veya tahta',
          'Grafik cizdirme icin renkli kalemler',
        ],
        adimlar: [
          'Siniftan veri toplayin (anket)',
          'Verileri tabloya gecirin',
          'Basit grafik cizdirin (cubuk grafik)',
          'Verilerdeki oruntuleri bulun',
          '"Bu veriyi bir YZ kullanabilir mi?" tartismasi yapın',
        ],
        olasiSorunlar: [
          'Ogrenciler kisisel soru sormak istemeyebilir — hassas sorulardan kacinin',
          'Grafik cizimi zaman alabilir — onceden sablonlar hazirlayın',
        ],
        ileriSeviye: 'Toplanan veriyi Excel\'e girin ve otomatik grafik olusturun. Yapisal veri kavramini pekistirin.',
      },
      {
        ad: 'Veri Etiketleme Atolyesi',
        tip: 'bilgisayar',
        sure: '20 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Etiketleme aracina (web sayfasindaki interaktif etkinlik) erisim',
          'Her ogrenci icin bilgisayar veya tablet',
        ],
        adimlar: [
          'Karisik goruntuleri (kedi, kopek, kus) siniflandirin',
          'Her gorunteye dogru etiketi atayin',
          'Hatali etiketlemenin sonuclarini tartisin',
          '"Neden etiketleme onemli?" ozet yapılır',
        ],
        olasiSorunlar: [
          'Bazi goruntler belirsiz olabilir — bu durumu "YZ\'nin de zorlugu" olarak vurgulayın',
        ],
        ileriSeviye: 'Kasitli hatali etiketlerle modelin nasil yanlıs sonuc verecegini simule edin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Sosyal medyada paylastiginiz her sey bir veri. Bunu bilerek paylasim yapar misiniz?',
        ipuclari: [
          'Dijital ayak izi kavramini acin',
          'Paylasimdan once dusunme alistirmasi yapin',
          'Gizlilik ayarlari hakkinda bilgi verin',
        ],
      },
      {
        soru: 'Bir YZ\'yi egitmek icin hangi verileri toplardiniz? Bunun icin izin almak gerekir mi?',
        ipuclari: [
          'Etik veri toplama ilkelerini hatirlatin',
          'KVKK/GDPR kavramlarini basitce aciklayin',
          'Riza, anonimlik kavramlarini tartisin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Veri sadece sayilardir',
        gercek: 'Veri; metin, goruntu, ses, video, konum bilgisi gibi her turlu bilgiyi icerir.',
        nasilDuzeltilir: 'Siniftan farkli turlerde veri ornekleri toplayin ve tahtaya kategori kategori yazin.',
      },
      {
        yanilgi: 'Ne kadar cok veri o kadar iyi',
        gercek: 'Kalitesiz veya önyargilair veri, kotu sonuclar dogurur. Kalite > Miktar.',
        nasilDuzeltilir: '"Cop girer cop cikar" (Garbage In, Garbage Out) prensibini aciklayin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Kaggle gibi platformlardan gercek veri seti incelemesi',
        'Sinifin verisiyle basit bir istatistik analiz raporu',
      ],
      destekGerekli: [
        'Veri turlerini gorsel kartlarla ogretme (resim ornekleri)',
        'Sadece yapisal/yapisal olmayan ayrimi odakli calisma',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'KVKK Resmi Sitesi',
        url: 'https://kvkk.gov.tr',
        aciklama: 'Turkiye Kisisel Verilerin Korunmasi Kurumu — ogretmen arka plan bilgisi.',
      },
      {
        baslik: 'Google Dataset Search',
        url: 'https://datasetsearch.research.google.com',
        aciklama: 'Gercek veri setlerini arastirmak icin — sinifta gosterim yapilabilir.',
      },
    ],
  },

  // ========== BÖLÜM 4 ==========
  {
    bolumNo: 4,
    baslik: 'Makineler Nasil Ogrenir?',
    sinifSeviyesi: '6-7. Sinif',
    dersSaati: 6,
    renk: 'from-orange-400 to-amber-500',
    icon: '🤖',
    kazanimlar: [
      'Makine ogrenimi kavramini ve geleneksel programlamadan farkini anla',
      'Gozetimli, gozerimsiz ve pekistirmeli ogrenme turlerini ayirt et',
      'Siniflandirma ve tahmin kavramlarini ogren',
      'Google Teachable Machine ile kendi modelini egit',
      'Bir modelin basarisini degerlendirmenin temellerini ogren',
    ],
    dersPlani: {
      isinma: '"Siz bir seyi nasil ogreniyorsunuz? Bir makineyi nasil ogretrdiniz?" sorusu. Insan ogrenimi ile makine ogrenimi paralelligini kurdurun.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + makine ogrenimi tanimi' },
        { sure: '15 dk', icerik: 'Ogrenme turleri: gozetimli, goretimsiz, pekistirmeli (slaytlar)' },
        { sure: '25 dk', icerik: 'Meyve Siniflandirici etkinligi (unplugged)' },
        { sure: '35 dk', icerik: 'Teachable Machine uygulamasi (bilgisayar)' },
        { sure: '10 dk', icerik: 'Quiz + Model Basari Raporu tartismasi' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"Bir makineye \_\_\_\_ ogretmek isterdim" cumlesini tamamlatin.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Makine ogrenimi icin en dogru tanim hangisidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Makinelerin veriden oruntu ogrenerek tahmin yapmasi',
        aciklama: 'ML, acik kural yazmak yerine verilerden oruntuleri otomatik ogrenme yontemidir.',
        ogretmenNotu: '"Programcilarin her kurali tek tek yazmasi" secenegi geleneksel programlamanin tanimidir. Ikisi arasindaki farki acikca cizelgeyle gosterin.',
      },
      {
        soruNo: 2,
        soru: 'Google Teachable Machine ile hangi tur model egitilebilir?',
        dogruCevap: 'B',
        dogruSecenek: 'Goruntu, ses ve vucut pozu tanima',
        aciklama: 'Teachable Machine 3 farklı veri türünü destekler: görüntü, ses ve vücut pozu.',
        ogretmenNotu: 'Canli demo yapin! Sinifta kamera ile 2-3 sinifli bir goruntu modeli egitin. Ogrenciler canli sonuclari gorunce kavrami cok daha iyi anlar.',
      },
      {
        soruNo: 3,
        soru: 'Egitim verisi ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Modelin oruntuleri ogrenmesini saglamak',
        aciklama: 'Egitim verisi modelin "ders calistigi" materyaldir.',
        ogretmenNotu: 'Sinav metaforu: "Egitim verisi = ders calismak, Test verisi = sinav. Sinavi gormeden calisirsiniz!"',
      },
      {
        soruNo: 4,
        soru: 'Asagidakilerden hangisi "gozetimli ogrenme" ornegi DEGILDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Musterileri otomatik gruplara ayirma (etiket olmadan)',
        aciklama: 'Etiketsiz gruplama goretimsiz ogrenmenin (clustering) ornegidir.',
        ogretmenNotu: 'Goretimsiz ogrenmeyi "kutuphane raf ayirma" benzetmesiyle aciklayin — kitaplari okunadan konularina gore gruplayabilirsiniz.',
      },
      {
        soruNo: 5,
        soru: 'Modelin egitim verisinde cok iyi, yeni verilerde kotu performans gostermesine ne denir?',
        dogruCevap: 'A',
        dogruSecenek: 'Overfitting (asiri uyum)',
        aciklama: 'Overfitting, modelin egitim verisini "ezberledigi" ama genelleme yapmadigi anlamina gelir.',
        ogretmenNotu: '"Sinav sorularini ezberlemek ama konuyu anlamamak" benzetmesi cok etkili. Ogrenciler kendi deneyimleriyle baglanti kurabilir.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Meyve Siniflandirici',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: '4-5 kisilik gruplar',
        hazirlik: [
          'Meyve resimleri veya gercek meyveler (5-6 tur)',
          'Siniflandirma kriterleri kartlari (renk, boyut, sekil)',
          'Her grup icin bir siniflandirma tablosu',
        ],
        adimlar: [
          'Meyveleri onceden belirlenenmis kriterlere gore siniflandirin',
          'Sonra yeni bir meyve gosterip "bunu hangi sinifa koyardiniz?" sorun',
          'Farkli gruplarin farkli kriterlere gore farkli sonuclar buldugunu gosterin',
          'Bu sureci makine ogrenmeyle karsilastirin',
        ],
        olasiSorunlar: [
          'Bazi meyveler birden fazla sinifa girebilir — bu "belirsizlik" kavramini ogretmek icin firsat',
        ],
        ileriSeviye: '3\'ten fazla ozellik kullanarak cok boyutlu siniflandirma yapmayi deneyin.',
      },
      {
        ad: 'Teachable Machine - Goruntu Modeli',
        tip: 'bilgisayar',
        sure: '40 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Bilgisayar + kamera (webcam) erisimi',
          'teachablemachine.withgoogle.com adresine erisim',
          'En az 2 sinif icin ornek nesneler (kalem vs silgi, el vs yumruk vb.)',
        ],
        adimlar: [
          'Teachable Machine sitesini acin ve "Image Project" secin',
          'En az 2 sinif olusturun (orn: "Kalem" ve "Silgi")',
          'Her sinif icin 30-50 ornek fotograf cekin',
          '"Train Model" diyerek modeli egitin',
          'Yeni nesnelerle test edin ve dogrlugunu kontrol edin',
          'Sonuclari sinifla paylasin',
        ],
        olasiSorunlar: [
          'Isik kosullari sonuclari etkiler — sinifin aydinlik oldugundan emin olun',
          'Az ornek = dusuk basari. En az 30 ornek onerilir.',
          'Internet yavas ise egitim suresi uzayabilir',
        ],
        ileriSeviye: '3+ sinifli model egitin. "Model ne zaman hata yapti?" analizi yapin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Bir makine gercekten "ogreniyor" mu yoksa sadece istatistik mi yapiyor?',
        ipuclari: [
          'Felsefik bir soru — doğru/yanlis yok',
          'Insan ogrenme sureci ile karsilastirma yaptirilir',
          '"Anlama" vs "oruntu eslesstirme" farkini tartisin',
        ],
      },
      {
        soru: 'Hatali egitim verisi ile egitilen bir model ne tur sorunlar yaratabilir?',
        ipuclari: [
          'Saglik, adalet sistemi ornekleri verin',
          'Onyargili veri → onyargili karar bagini kurun',
          'Garbage In, Garbage Out prensibini hatirlatin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Makine ogrenimi = Robot yapma',
        gercek: 'ML bir yazilim teknolojisidir. Robot olmadan da calisir (orn: spam filtresi, oneri sistemi).',
        nasilDuzeltilir: 'ML kullanan ama robot olmayan 5 ornek listeleyin.',
      },
      {
        yanilgi: 'Bir kez egitilen model sonsuza kadar calisir',
        gercek: 'Veriler ve kosullar degistikce modeller guncellenmeli. Eski model yanlis sonuclar verebilir.',
        nasilDuzeltilir: '"Covid oncesi ve sonrasi alisveris aliskanliklari" ornegini verin — eski modelin yeni durumu bilmesi imkansiz.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Teachable Machine ile 5+ sinifli bir proje gelistirme',
        'Model basari metrikleri (doğruluk, precision, recall) arastirmasi',
      ],
      destekGerekli: [
        'Sadece 2 sinifli basit siniflandirma ile baslama',
        'Meyve siniflandirmayi gorselle pekistirme (foto kartlar)',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Google Teachable Machine',
        url: 'https://teachablemachine.withgoogle.com',
        aciklama: 'Tarayicida ML modeli egitme araci — sinifta canli demo icin ideal.',
      },
      {
        baslik: 'ML for Kids',
        url: 'https://machinelearningforkids.co.uk',
        aciklama: 'Cocuklar icin makine ogrenimi projeleri.',
      },
    ],
  },

  // ========== BÖLÜM 5 ==========
  {
    bolumNo: 5,
    baslik: 'Uretken Yapay Zeka',
    sinifSeviyesi: '6-7. Sinif',
    dersSaati: 6,
    renk: 'from-pink-400 to-rose-500',
    icon: '✨',
    kazanimlar: [
      'Uretken yapay zeka kavramini ve temel calisma prensibini anla',
      'ChatGPT, Gemini gibi buyuk dil modellerini (LLM) tani',
      'Etkili prompt (istem) yazma tekniklerini ogren',
      'YZ ile metin, goruntu ve ses uretme deneyimi kazan',
      'YZ kullaniminda etik kurallari ve akademik durustelusu tartis',
    ],
    dersPlani: {
      isinma: '"ChatGPT\'ye en ilginc hangi soruyu sordunuz? Ne cevap verdi?" anket. Birlik sinif paylesimi.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + Uretken YZ tanimi' },
        { sure: '15 dk', icerik: 'LLM, prompt engineering, halucinasyon kavramlari' },
        { sure: '25 dk', icerik: 'Prompt Duellosu etkinligi' },
        { sure: '25 dk', icerik: 'ChatGPT/Gemini deneyimi (bilgisayar)' },
        { sure: '15 dk', icerik: 'Etik tartisma + Quiz' },
        { sure: '10 dk', icerik: 'Kapanis' },
      ],
      kapanis: '"YZ\'yi sorumlu kullanmak icin 3 kurali" yazarak sinifta paylasilir.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Uretken yapay zeka (Generative AI) ne yapar?',
        dogruCevap: 'B',
        dogruSecenek: 'Yeni ve orijinal icerikler (metin, goruntu, ses) uretir',
        aciklama: 'Uretken YZ, egitildigi verilerden ogrenerek yeni icerikler uretir.',
        ogretmenNotu: '"Sadece arama motoru gibi calisir" secenegi yaygin yanlisa. Arama motoru var olan icerigi bulur, uretken YZ yeni icerik yaratir.',
      },
      {
        soruNo: 2,
        soru: 'ChatGPT, Gemini gibi araclar hangi YZ teknolojisini kullanir?',
        dogruCevap: 'B',
        dogruSecenek: 'Buyuk dil modelleri (LLM)',
        aciklama: 'Bu araclar milyarlarca parametrelik buyuk dil modelleriyle calisir.',
        ogretmenNotu: 'LLM kavrami soyut olabilir. "Cok cok buyuk bir otomatik tamamlama" benzetmesini kullanin.',
      },
      {
        soruNo: 3,
        soru: 'Iyi bir prompt yazmak icin en onemlisi nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Acik, net ve baglam iceren talimatlar vermek',
        aciklama: 'Iyi prompt = net talimat + baglam + beklenen format.',
        ogretmenNotu: 'Canli demo yapin: ayni soruyu once kotu prompt, sonra iyi prompt ile sorun. Fark dramatik olacak.',
      },
      {
        soruNo: 4,
        soru: 'YZ ile uretilen bir icerigi kendi odeviniz gibi sunmak dogru mudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Hayir, bu etik degildir ve akademik durusteluge aykiridir',
        aciklama: 'YZ arac olarak kullanilabilir ama sonucu kendi isiniz gibi sunmak intihal sayilir.',
        ogretmenNotu: 'Bu soru hassas — yargıılayici olmadan tartisin. "YZ yardimci arac vs YZ kopya makinesi" ayrimini yapin. Okul politikalarinizi hatirlatin.',
      },
      {
        soruNo: 5,
        soru: 'Asagidakilerden hangisi uretken YZ ile YAPILAMAZ?',
        dogruCevap: 'C',
        dogruSecenek: 'Gercek dunya deneyimi yasamak',
        aciklama: 'YZ dijital icerik uretebilir ama fiziksel deneyim yaratamaz.',
        ogretmenNotu: 'YZ\'nin sinirlari konusunda farkindali artirmak icin onemli soru. "YZ sizin yerinize mutlu olabilir mi?" diye genisletin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Prompt Duellosu',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: 'Cift calisma (2 kisi)',
        hazirlik: [
          'Her cifte bir gorev karti (orn: "Bir kahvalti tarifi olustur", "Bir masal yaz")',
          'Degerlendirme rubrik (netlik, yaraticilik, detay)',
        ],
        adimlar: [
          'Her cift ayni gorev icin farkli promptlar yazar',
          'Promptlari YZ aracina (ChatGPT/Gemini) girerler',
          'Sonuclari karsilastirirlar',
          'En iyi promptu ve nedenini sinifa sunarlar',
        ],
        olasiSorunlar: [
          'YZ erisimi olmayabilir — bu durumda sadece prompt yazma ve tartisma olarak yapin',
          'Uygunsuz icerikler uretilirse — YZ guvenlik filtrelerini aciklayin',
        ],
        ileriSeviye: 'Ayni prompt\'u farkli YZ araclarinda (ChatGPT vs Gemini) deneyerek karsilastirin.',
      },
      {
        ad: 'ChatGPT / Gemini ile Tanisma',
        tip: 'bilgisayar',
        sure: '30 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'ChatGPT veya Gemini erisimi (okul hesabi veya ogretmen hesabiyla)',
          'Gorev listesi: "Soru sor, hikaye yazdır, tercume yap, kod yaz, matematik coz"',
        ],
        adimlar: [
          'Basit sorularla baslayın',
          'Giderek karmasik promptlar deneyin',
          'YZ\'nin yanlis cevap verdigi bir durumu bulun (halucinasyon)',
          'Sonuclari not edin ve sinifla paylasin',
        ],
        olasiSorunlar: [
          'Yas siniri olan platformlar icin ogretmen hesabindan kullanin',
          'Ogrenciler cok eglenceli bulup diger gorevleri unutabilir — zaman siniri koyun',
        ],
        ileriSeviye: 'YZ\'nin yaptigi bir hatayi bulun ve neden yanlis oldugunu aciklayin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ ile odev yapmak kopya cekmek midir?',
        ipuclari: [
          'Arac vs kopya ayrimi yapin',
          'Hesap makinesi, sozluk, internet ornekleriyle karsilastirin',
          'Seffaflik ve kaynak gosterme onemini vurgulayin',
        ],
      },
      {
        soru: 'YZ\'nin yazdigi bir siiir gercek bir siir midir?',
        ipuclari: [
          'Yaraticilik tanimini tartisin',
          'Insanin duygusu vs YZ\'nin oruntu eslestirmesi',
          'Sanatçiların tepkilerini arastirtin',
        ],
      },
      {
        soru: 'YZ halucinasyon yaptiginda (yanlis bilgi urettiginde) ne yapmaliyiz?',
        ipuclari: [
          'Her zaman dogrulama yapma alistirmasi',
          'Guvenilir kaynakla kontrol etme aliskanligi',
          'Elestirel dusunme becerisi vurgusu',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'ChatGPT her zaman dogru cevap verir',
        gercek: 'LLM\'ler olasi devam sozcuklerini tahmin eder. Bazen ikna edici gorunen ama yanlis bilgi ("halucinasyon") uretir.',
        nasilDuzeltilir: 'Canli demo: ChatGPT\'ye "Turkiye\'nin 5. cumhurbaskani kimdir?" gibi zor sorular sorun. Hatalarini birlikte bulun.',
      },
      {
        yanilgi: 'YZ yaratici dusuniyor',
        gercek: 'YZ var olan verilerden oruntuleri birlestirir. Gercek anlamda "dusunmez" veya "hayal kurmaz".',
        nasilDuzeltilir: '"Origami katlama" analojisi — YZ kagıdı katlar ama yeni bir malzeme icat etmez.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Farkli LLM\'leri karsilastirma raporu (ChatGPT vs Gemini vs Claude)',
        'Prompt muhendisligi rehberi olusturma',
      ],
      destekGerekli: [
        'Onceden hazirlanmis prompt sablonlari kullanma',
        'Ogretmen esliginde canli demo izleme (bireysel kullanim yerine)',
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
        aciklama: 'ISTE\'nin egitimciler icin YZ okuryazarligi kaynakları.',
      },
    ],
  },

  // ========== BÖLÜM 6 ==========
  {
    bolumNo: 6,
    baslik: 'Blok Tabanli YZ Kodlama',
    sinifSeviyesi: '7. Sinif',
    dersSaati: 8,
    renk: 'from-blue-400 to-indigo-500',
    icon: '🧩',
    kazanimlar: [
      'PictoBlox ortamini tani ve YZ uzantilarini kullan',
      'Blok tabanli kodlama ile goruntu siniflandirma projesi yap',
      'Ses tanima ve metin siniflandirma projeleri deneyimle',
      'Kendi YZ destekli oyununu/uygulamani tasarla',
    ],
    dersPlani: {
      isinma: '"Kodlama nedir? Gunluk hayatta neleri kodlarsiniz?" sorusu. Tarif yazma, yol tarifi verme gibi algoritma ornekleriyle baslayın.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isinma + PictoBlox tanitimi' },
        { sure: '20 dk', icerik: 'Algoritma Sefi etkinligi (unplugged)' },
        { sure: '45 dk', icerik: 'PictoBlox - Tas Kagit Makas projesi' },
        { sure: '40 dk', icerik: 'PictoBlox - Duygu Analizi projesi' },
        { sure: '10 dk', icerik: 'Quiz + proje paylasimi' },
        { sure: '10 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her ogrenci projesini 1 cumlede ozetler: "Modelim \_\_\_\_ yapabiliyor."',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'PictoBlox hangi programlama yaklasimini kullanir?',
        dogruCevap: 'B',
        dogruSecenek: 'Blok tabanli (surukle-birak) kodlama',
        aciklama: 'PictoBlox, Scratch benzeri blok tabanli programlama ortamidir.',
        ogretmenNotu: '"Metin tabanli" secenegi ileri seviye; "Python" da blok degildir. Farklilik acik sekilde gosterilmeli.',
      },
      {
        soruNo: 2,
        soru: 'PictoBlox\'ta goruntu siniflandirma projesi icin ilk yapilmasi gereken nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Modeli egitmek (siniflar olusturup ornek toplamak)',
        aciklama: 'Once veri toplanir ve model egitilir, sonra kod yazilir.',
        ogretmenNotu: '"Hemen koda basla" dusuncesi yaygindir. Veri → Egitim → Kod sirasini vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Asagidakilerden hangisi PictoBlox\'un YZ uzantisi DEGILDIR?',
        dogruCevap: 'D',
        dogruSecenek: '3D Modelleme',
        aciklama: 'PictoBlox ML, Yuz Tanima, Metin Siniflandirma uzantilari var ama 3D Modelleme yoktur.',
        ogretmenNotu: 'PictoBlox\'un uzanti menusunu acip gosterim yaparak dogrulayin.',
      },
      {
        soruNo: 4,
        soru: '"Eger ... ise" blogu ne ise yarar?',
        dogruCevap: 'B',
        dogruSecenek: 'Modelin tahmin sonucuna gore farkli islemler yapar',
        aciklama: 'Kosul bloklari modelin ciktisina gore farkli aksiyonlar alinmasini saglar.',
        ogretmenNotu: 'Gunluk hayat ornegi: "Hava yagmurluysa semsiye al, degilse alma" — kosusllu karar verme.',
      },
      {
        soruNo: 5,
        soru: 'PictoBlox\'ta YZ projesi icin hangi adimlar izlenir?',
        dogruCevap: 'A',
        dogruSecenek: 'Uzanti ekle > Siniflar olustur > Ornekler topla > Model egit > Kodla',
        aciklama: 'Bu, PictoBlox\'ta standart YZ proje akisidir.',
        ogretmenNotu: 'Bu sirayi tahtaya yazin ve proje boyunca referans olarak kullanin. Her adimda nerede oldugunuzu gosterin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Algoritma Sefi',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: '4-5 kisilik gruplar',
        hazirlik: [
          'Her grup icin basit bir gorev karti (orn: "sandvic yap", "dis fircala")',
          'Kagit ve kalem',
        ],
        adimlar: [
          'Her grup gorevini adim adim algoritma olarak yazar',
          'Baska bir grup bu adıimlari harfi harfine takip etmeye calisir',
          'Eksik veya belirsiz adimlar tespit edilir',
          '"Bilgisayar tam boyle calisir" baglantisi kurulur',
        ],
        olasiSorunlar: [
          'Gruplarin "cok fazla adim" yazmasi — basitlesrirme rehberligi yapin',
        ],
        ileriSeviye: 'Algoritmaya kosul ekletme: "Eger malzeme yoksa..."',
      },
      {
        ad: 'PictoBlox - Tas Kagit Makas',
        tip: 'bilgisayar',
        sure: '45 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'PictoBlox yuklu bilgisayarlar',
          'Webcam erisimi',
          'Proje adim adim rehberi (sayfadan veya yazili)',
        ],
        adimlar: [
          'PictoBlox\'u acin ve ML uzantisini ekleyin',
          '3 sinif olusturun: Tas, Kagit, Makas',
          'Her sinif icin 30+ webcam goruntusu toplayin',
          'Modeli egitin',
          'Bloklarla oyun kodunu yazin (eger tas ise → bilgisayar kagit gostersin)',
          'Test edin ve iyilestirin',
        ],
        olasiSorunlar: [
          'Webcam calismiyor: PictoBlox izinlerini kontrol edin',
          'Model dusuk basarili: Daha fazla ornek toplayin, arka plani sabit tutun',
          'Blok kodlama yeni: Scratch deneyimi olanlari yardimci yapin',
        ],
        ileriSeviye: 'Skor tablosu ekleyin, ses efektleri koyun, 5\'e kadar sayan tur sistemi yapin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Blok kodlama ile metin kodlama arasindaki farklar nelerdir? Hangisi daha "gercek" programlama?',
        ipuclari: [
          'Her ikisi de gercek programlama — sadece arayuz farkli',
          'Profesyonel yazilimcilarin da gorsel araclar kullandigindan bahsedin',
          'Onemli olan mantik, arac degil',
        ],
      },
      {
        soru: 'YZ modeliniz hata yaptiginda ne yapabilirsiniz?',
        ipuclari: [
          'Daha fazla veri toplama, veri kalitesini artirma',
          'Farkli ozellikler deneme',
          'Model sinirlarinii anlama',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'Kodlama cok zor, ben yapamam',
        gercek: 'Blok kodlama, Lego birlestirir gibi kodlama yapmaktir. Hata yapmak ogrenme surecinin bir parcasidir.',
        nasilDuzeltilir: 'Cok basit bir projeden baslayip 5 dakikada sonuc alin. Basari deneyimi oezguven verir.',
      },
      {
        yanilgi: 'Model bir kez egitildikten sonra hep dogru calisir',
        gercek: 'Isik, aci, arka plan degisirse model basarisizl olabilir. Surekli test ve iyilestirme gerekir.',
        nasilDuzeltilir: 'Kasitli olarak zor kosullarda test yapin (karanlik oda, farkli aci) ve hatalarib gosterin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'PictoBlox ile kendi özgun YZ oyununu tasarlama',
        'Ses tanima uzantisiyla sesli komutlu proje',
      ],
      destekGerekli: [
        'Ogretmen esliginde adim adim takip',
        'Sadece 2 sinifli basit proje ile baslama',
        'Ekran goruntulu adim adim kilavuz',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'PictoBlox',
        url: 'https://pictoblox.ai',
        aciklama: 'PictoBlox resmi sitesi — indirme ve egitim kaynaklari.',
      },
      {
        baslik: 'Scratch',
        url: 'https://scratch.mit.edu',
        aciklama: 'Blok kodlama temeli icin Scratch platformu.',
      },
    ],
  },

  // ========== BÖLÜM 7 ==========
  {
    bolumNo: 7,
    baslik: 'Gercek Hayat Problemleri',
    sinifSeviyesi: '7-8. Sinif',
    dersSaati: 8,
    renk: 'from-teal-400 to-cyan-500',
    icon: '🌍',
    kazanimlar: [
      'Gercek dunya problemlerini YZ ile cozme yaklasimini ogren',
      'Tasarim Dusuncesi (Design Thinking) metodolojisini uygula',
      'STEM tabanli proje gelistir',
      'Problem tanimlama, veri toplama, model secimi ve test sureclerini deneyimle',
      'Ekip calismasi ve proje yonetimi becerilerini gelistir',
    ],
    dersPlani: {
      isinma: '"Okulunuzda veya mahallenizde YZ ile cozulebilecek bir problem var mi?" Beyin firtinasi.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isinma + Design Thinking tanitimi' },
        { sure: '30 dk', icerik: 'Problem Avcilari etkinligi' },
        { sure: '20 dk', icerik: 'Problem analizi ve cozum onerileri' },
        { sure: '4 ders', icerik: 'Mini YZ Projesi (gruplar halinde)' },
        { sure: '25 dk', icerik: 'Proje Fuari + Quiz' },
        { sure: '10 dk', icerik: 'Kapanis ve odul' },
      ],
      kapanis: 'Her grubun projesini 30 saniyede tanittigi "asansor konusmasi" (elevator pitch).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'STEM tabanli YZ projesinde ilk adim ne olmalidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Problemi tanimlamak ve anlamak',
        aciklama: 'Her projenin temeli iyi tanimlanmis bir problemdir.',
        ogretmenNotu: '"Hemen kodlamaya baslamak" en yaygin yanlislardan. Planlama olmadan kod = kaos.',
      },
      {
        soruNo: 2,
        soru: 'Asagidakilerden hangisi YZ ile cozulebilecek gercek problem DEGILDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Insanlarin duygularini tamamen kontrol etme',
        aciklama: 'YZ duygulari analiz edebilir ama "kontrol etme" hem teknik olarak imkansiz hem de etik degildir.',
        ogretmenNotu: '"Tamamen kontrol etme" ifadesini vurgulatin. Duygu tanima var ama kontrol etme yok.',
      },
      {
        soruNo: 3,
        soru: 'Tasarim Dusuncesi surecinde dogru sira hangisidir?',
        dogruCevap: 'A',
        dogruSecenek: 'Empati > Tanimlama > Fikir Uretme > Prototip > Test',
        aciklama: 'Design Thinking\'in 5 asamasi bu siradadir.',
        ogretmenNotu: 'Her asamayi bir poster olarak sinifa asin. Proje boyunca "simdi hangi asamadayiz?" sorusu ile takip edin.',
      },
      {
        soruNo: 4,
        soru: 'MVP (Minimum Viable Product) ne demektir?',
        dogruCevap: 'B',
        dogruSecenek: 'Temel ozellikleri calisan en basit versiyon',
        aciklama: 'MVP, fikirlerinizi test etmek icin yapilabilecek en basit urun/prototiptir.',
        ogretmenNotu: '"Mukemmel yapmaya calismak yerine calisan bir sey yapin" mesajini vurgulayin.',
      },
      {
        soruNo: 5,
        soru: 'YZ projesinde veri toplama asamasinda en onemli kural nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Kaliteli, cesitli ve etik yollarla toplanmis veri kullanmak',
        aciklama: 'Kalitesiz veya onyargili veri yanlis sonuclara yol acar.',
        ogretmenNotu: 'Bolum 3\'teki veri konusunu hatirlatma firsati. "Cop girer cop cikar" prensibini tekrar vurgulayin.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Problem Avcilari',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: '4-5 kisilik gruplar',
        hazirlik: [
          'Buyuk kagitlar veya poster kartonlari',
          'Yapiskan notlar ve kalemler',
          'Problem kategorileri: Cevre, Saglik, Egitim, Ulasim, Tarim',
        ],
        adimlar: [
          'Her grup bir kategori secer',
          '5 dakika beyin firtinasi — mumkun oldugunca cok problem yazin',
          'En onemli 3 problemi secin',
          '"Bu problemi YZ nasil cozebilir?" sorusuyla cozum onerin',
          'Posterleri sinifa sunun',
        ],
        olasiSorunlar: [
          'Cok buyuk/soyut problemler secilebilir — "yerel ve somut" olmasini yonlendirin',
          'YZ ile cozulemeyecek problemler onerilirse — bu da tartismaya deger',
        ],
        ileriSeviye: 'En iyi problemi sinifca secerek gercel bir mini proje baslatın.',
      },
      {
        ad: 'Mini YZ Projesi',
        tip: 'proje',
        sure: '4 ders saati',
        gruplama: '3-4 kisilik gruplar',
        hazirlik: [
          'Design Thinking sablonu (her grup icin)',
          'Bilgisayar erisimi',
          'Sunum materyalleri (poster veya dijital sunum)',
        ],
        adimlar: [
          'Problem tanimlama ve kullanici arastirmasi (1 ders)',
          'Fikir uretme ve prototip tasarlama (1 ders)',
          'Prototip gelistirme (1 ders)',
          'Test, iyilestirme ve sunum hazirlama (1 ders)',
        ],
        olasiSorunlar: [
          'Gruplarda liderlik sorunu — roller atayin (lider, tasarimci, arastirmaci, sunucu)',
          'Zaman yetmezligi — MVP dusuncesini hatirlatin',
          'Teknik zorluklar — mockup/wireframe yeterli, calisan kod sart degil',
        ],
        ileriSeviye: 'Prototrpi gercekten calisan bir Teachable Machine modeli ile destekleyin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'Her problem YZ ile cozulebilir mi? YZ\'nin cozemeyecegi problemler nelerdir?',
        ipuclari: [
          'Teknik sinirlar: veri olmayan sorunlar',
          'Etik sinirlar: insan karari gereken durumlar',
          'Pratik sinirlar: maliyet, enerji, zaman',
        ],
      },
      {
        soru: 'Bir YZ projesi basarisiz olursa ne yapilir? Basarisizlik kotu bir sey midir?',
        ipuclari: [
          'Bilimsel yontem: basarisizlik = veri',
          'Edison ampul hikayesi',
          'Pivot (yon degistirme) kavrami',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ her problemi cozebilir',
        gercek: 'YZ belirli tur problemlerde (oruntu tanima, tahmin) iyidir ama her sorunu cozemez.',
        nasilDuzeltilir: 'YZ\'nin guclu ve zayif oldugu alanlarin listesini birlikte olusturun.',
      },
      {
        yanilgi: 'Proje yapmak icin uzman olmak gerekir',
        gercek: 'Basit araclarla (Teachable Machine, PictoBlox) coculklar bile YZ projesi yapabilir.',
        nasilDuzeltilir: 'Kucuk ve basit bir projeyle baslayarak ozguven kazandirin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Calisan bir prototip gelistirme ve kullanici testi yapma',
        'Proje finansman plani (hayali) olusturma',
      ],
      destekGerekli: [
        'Problem tanimlama odakli calisma (cozum kismini basitlestirin)',
        'Gorsel prototip (poster/cizim) yeterli',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Design Thinking for Educators',
        url: 'https://designthinkingforeducators.com',
        aciklama: 'IDEO\'nun egitimciler icin Design Thinking kaynagi.',
      },
      {
        baslik: 'UN Sustainable Development Goals',
        url: 'https://sdgs.un.org/goals',
        aciklama: 'BM Surdurulebilir Kalkinma Hedefleri — proje ilhami icin.',
      },
    ],
  },

  // ========== BÖLÜM 8 ==========
  {
    bolumNo: 8,
    baslik: 'Dijital Icerik Uretimi',
    sinifSeviyesi: '7-8. Sinif',
    dersSaati: 6,
    renk: 'from-rose-400 to-pink-500',
    icon: '🎨',
    kazanimlar: [
      'YZ ile goruntu, metin ve ses icerikleri uret',
      'Canva AI ile profesyonel tasarimlar yap',
      'Dijital hikaye anlatimi projesi gelistir',
      'YZ ile uretilen iceriklerde telif hakki ve etik konularini tartis',
      'Yaratici surecte YZ\'yi yardimci arac olarak kullan',
    ],
    dersPlani: {
      isinma: 'Bir YZ goruntu uretme aracina basit bir prompt girin ve sinifa sonucu gosterin. "Bu resim gercek mi?" sorusu.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + YZ icerik uretim turleri' },
        { sure: '20 dk', icerik: 'Yapay mi Gercek mi etkinligi' },
        { sure: '30 dk', icerik: 'YZ Poster Tasarimi (Canva AI)' },
        { sure: '2 ders', icerik: 'Dijital Hikaye Projesi' },
        { sure: '15 dk', icerik: 'Telif hakki tartismasi + Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her ogrenci en iyi dijital eserini sinifa gosterir (1 dakika gosterim).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'YZ ile goruntu uretirken en onemli faktor nedir?',
        dogruCevap: 'B',
        dogruSecenek: 'Acik ve detayli prompt yazmak',
        aciklama: 'Goruntu kalitesi buyuk olcude prompt kalitesine baglidir.',
        ogretmenNotu: 'Canli demo: ayni konuyu once kisa ("kedi ciz") sonra detayli ("turuncu tekir kedi, gunes isiginda, suluboya") prompt ile deneyin.',
      },
      {
        soruNo: 2,
        soru: 'YZ ile uretilen goruntuyu paylasirken ne yapmalisiniz?',
        dogruCevap: 'B',
        dogruSecenek: 'YZ ile uretildigini belirtmek',
        aciklama: 'Seffaflik ve duurestluk dijital icerik paylesiminin temelidir.',
        ogretmenNotu: 'Deepfake tehlikesini hatirlatin. "Kimse YZ icerigini gercek gibi sunmamali" mesajini vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Canva AI hangi tur icerik uretiminde kullanilabilir?',
        dogruCevap: 'B',
        dogruSecenek: 'Sunum, poster, sosyal medya gorseli ve daha fazlasi',
        aciklama: 'Canva AI cok yonlu bir tasarim araci olup bircok icerik turunu destekler.',
        ogretmenNotu: 'Canva\'nin ucretsiz egitim hesabini kullanin. Sinifca bir proje ile canli demo yapin.',
      },
      {
        soruNo: 4,
        soru: 'YZ ile muzik uretirken telif hakkinda hangisi dogrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Her aracin kendi lisans kurallari vardir, kontrol edilmelidir',
        aciklama: 'Her YZ aracinin farkli lisans politikaları var — kullanmadan once okumak gerekir.',
        ogretmenNotu: '"Creative Commons" ve "ticari kullanim" kavramlarini basitce aciklayin.',
      },
      {
        soruNo: 5,
        soru: 'Dijital hikaye projesi icin en uygun YZ araclari kombinasyonu hangisidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Metin icin LLM + goruntu icin goruntu uretici + ses icin TTS',
        aciklama: 'Dijital hikaye; metin, gorsel ve ses katmanlarindan olusur.',
        ogretmenNotu: 'Her katman icin farkli YZ araci kullanmayi gosterin. "YZ orkestrasyon" kavramini tanitim.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Yapay mi Gercek mi?',
        tip: 'unplugged',
        sure: '20 dakika',
        gruplama: 'Sinif tartismasi',
        hazirlik: [
          'YZ ile uretilmis ve gercek fotooglarin karisimi (10-15 goruntu)',
          'Projeksiyon veya buyuk ekran',
        ],
        adimlar: [
          'Her goruntuyu sirayla gosterin',
          'Ogrenciler "yapay" veya "gercek" oylama yapar',
          'Doğru cevabi acikladıktan sonra "nereden anladiniz?" tartisin',
          'YZ goruntulerinin ortak ozelliklerini (parmak hatasi, arka plan tutarsizligi vb.) gosterin',
        ],
        olasiSorunlar: [
          'YZ goruntuleri cok gercekci olabilir — bu aslinda asil ogretici nokta',
          'Ogrenciler hayal kiriklígina ugrayabilir — "yanlis bilmek tamamen normal" vurgulayın',
        ],
        ileriSeviye: 'Deepfake video ornekleri de ekleyin ve hareketli icerikteki ipuclarini tartisin.',
      },
      {
        ad: 'YZ Poster Tasarimi',
        tip: 'bilgisayar',
        sure: '30 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Canva hesabi (egitim versiyonu onerilir)',
          'Poster konusu (orn: "YZ\'nin Gunluk Hayattaki Yeri")',
        ],
        adimlar: [
          'Canva\'yi acin ve sablonlardan poster secin',
          'AI goruntu uretme ozelligini kullanin',
          'Metin, renk ve duzeni ayarlayin',
          'Sinifa sunun',
        ],
        olasiSorunlar: [
          'Canva erisim sorunu — alternatif: PowerPoint veya Google Slides',
        ],
        ileriSeviye: 'Poster yerine animasyonlu sunum veya kisa video olusturun.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ ile uretilen bir sanat eseri "gercek sanat" midir?',
        ipuclari: [
          'Sanat tanimini tartisin',
          'Araç vs sanatci ayrimi',
          'Fotografin icadindaki benzer tartismayi hatirlatin',
        ],
      },
      {
        soru: 'Bir YZ\'nin olusturdugu icerigin telif hakki kime aittir?',
        ipuclari: [
          'Henuz hukuki belirsizlik var',
          'Farkli ulkelerin yaklasimlarini arastirtin',
          'Prompt yazan vs YZ yaratan vs platform ayrimı',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ ile icerik uretmek yaraticiligi olddurur',
        gercek: 'YZ bir aractir — yaraticilik hala insandan gelir. Fotograf makinesi ressamligi oldurmedigi gibi.',
        nasilDuzeltilir: 'YZ\'yi "dijital asistan" olarak konumlandirilir — fikir insanin, uygulama isbirligi.',
      },
      {
        yanilgi: 'YZ ile uretilen her sey ucretsiz kullanilabilir',
        gercek: 'Her aracin farkli lisans kosullari var. Bazi icerikler ticari kullanim icin sinirlídir.',
        nasilDuzeltilir: 'En populer araclarin lisans sayfalarini birlikte inceleyin.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Kisa film / video projesi (YZ + gercek goruntu birlesimi)',
        'YZ sanat sergisi duzenleme',
      ],
      destekGerekli: [
        'Sablonlarla calisma (bos sayfa yerine)',
        'Ogretmen esliginde adim adim tasarim',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'Canva for Education',
        url: 'https://www.canva.com/education/',
        aciklama: 'Canva\'nin ucretsiz egitim hesabi — siniflar icin ideal.',
      },
      {
        baslik: 'This Person Does Not Exist',
        url: 'https://thispersondoesnotexist.com',
        aciklama: 'YZ ile uretilen yuz ornekleri — deepfake farkindailigi icin gosterim.',
      },
    ],
  },

  // ========== BÖLÜM 9 ==========
  {
    bolumNo: 9,
    baslik: 'YZ ve Etik',
    sinifSeviyesi: '7-8. Sinif',
    dersSaati: 4,
    renk: 'from-amber-400 to-orange-500',
    icon: '⚖️',
    kazanimlar: [
      'YZ etigi kavramini ve temel ilkelerini ogren',
      'YZ\'deki onyargı (bias) problemini ve etkilerini anla',
      'Deepfake ve dezenformasyon tehlikelerini tartis',
      'YZ\'nin is gucune, gizlilige ve cevreye etkisini degerlendir',
      'Sorumlu YZ kullanimi icin kendi ilkelerini olustur',
    ],
    dersPlani: {
      isinma: '"YZ kararlar alsa — kimi ise alacagina YZ karar verse, adaletli olur mu?" sorusu. Sinifin ilk tepkilerini dinleyin.',
      zamanDagilimi: [
        { sure: '10 dk', icerik: 'Isinma + YZ etik ilkeleri tanitimi' },
        { sure: '25 dk', icerik: 'YZ Mahkemesi etkinligi (sinif tartismasi)' },
        { sure: '15 dk', icerik: 'Etik Pusula olusturma' },
        { sure: '10 dk', icerik: 'Quiz' },
        { sure: '5 dk', icerik: 'Kapanis' },
      ],
      kapanis: 'Her ogrenci kendi "YZ Kullanim Ilkem" yazarak sinifa okur (1 cumle).',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'YZ sistemlerinde "onyargı" (bias) ne demektir?',
        dogruCevap: 'B',
        dogruSecenek: 'Egitim verisindeki dengesizlikten kaynaklanan adaletsiz sonuclar',
        aciklama: 'YZ\'deki onyargı genellikle egitim verisindeki dengesizlikten kaynaklanir.',
        ogretmenNotu: 'Somut ornek: Amazon\'un CV tarama YZ\'si kadinlari eledigi olay. Veri yanliligi → karar yanliligi zincirini kurun.',
      },
      {
        soruNo: 2,
        soru: 'Asagidakilerden hangisi YZ etigi ile ilgili onemli bir ilke DEGILDIR?',
        dogruCevap: 'C',
        dogruSecenek: 'Kar maksimizasyonu (en cok para kazanma)',
        aciklama: 'YZ etik ilkeleri: seffaflik, adalet, gizlilik, hesap verebilirlik. Kar amaci etik ilke degildir.',
        ogretmenNotu: '"Bir sirket para kazanmak icin adaletsiz YZ kullanirsa ne olur?" tartismasi acilin.',
      },
      {
        soruNo: 3,
        soru: 'Deepfake teknolojisi icin hangisi dogrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Gercek olmayan video/ses icerikleri ureterek yaniltici olabilir',
        aciklama: 'Deepfake, gercekci sahte icerikler ureterek dezenformasyon riskini artirabilir.',
        ogretmenNotu: 'Ornek deepfake videolari gosterin (orn: Obama deepfake). Hem tehlikeleri hem de olumlu kullanim alanlarini (sinema, egitim) tartisin.',
      },
      {
        soruNo: 4,
        soru: 'YZ\'nin cevresel etkisi konusunda hangisi dogrudur?',
        dogruCevap: 'B',
        dogruSecenek: 'Buyuk YZ modellerinin egitimi cok enerji tuketir ve karbon salimi yapar',
        aciklama: 'GPT-4 gibi buyuk modellerin egitimi binlerce MW/saat enerji tuketir.',
        ogretmenNotu: 'Karbon ayak izi hesaplayicilarla somutlastirin. "Bir LLM egitimi = \_\_\_ ucak yolculugu" benzeri karssilastirma.',
      },
      {
        soruNo: 5,
        soru: 'Sorumlu YZ kullanimi icin en onemli prensip hangisidir?',
        dogruCevap: 'C',
        dogruSecenek: 'YZ\'nin sinirlarini bilmek ve insani denetimle kullanmak',
        aciklama: 'YZ guclu bir aractir ama her zaman insan gozetimi ve karar verme gerektrir.',
        ogretmenNotu: '"YZ araba kullanabilir ama direksiyondaki her zaman insan olmali" benzitmesi.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'YZ Mahkemesi',
        tip: 'unplugged',
        sure: '30 dakika',
        gruplama: 'Sinif tartismasi (roller atanir)',
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
          'Hakim (ogretmen) karar ozetini yapar',
        ],
        olasiSorunlar: [
          'Bazi ogrenciler rol yapmaktan cekinebilir — gonulluluk usulu secin',
          'Tartisma isisinabilir — saygili dil kurallari belirlayın onceden',
        ],
        ileriSeviye: 'Ogrencilerin kendi etik senaryolarini yazmasini isteyin.',
      },
      {
        ad: 'Etik Pusula Olusturma',
        tip: 'unplugged',
        sure: '25 dakika',
        gruplama: '4-5 kisilik gruplar',
        hazirlik: [
          'Bos pusula sablonu (4 yon: Adalet, Seffaflik, Gizlilik, Sorumluluk)',
          'Kalemler ve renkli yapiskanlar',
        ],
        adimlar: [
          'Her grup 4 etik ilke icin somut kurallar yazar',
          'Kurallar pusulaya yazilir',
          'Gruplar pusulalarini sinifa sunar',
          'Sinifca ortak bir "YZ Etik Antlasmasi" olusturulur',
        ],
        olasiSorunlar: [
          'Soyut kalabilir — somut orneklerle destekleyin ("Bu kural mesela ne zaman uygulanir?")',
        ],
        ileriSeviye: 'Etik Antlasmayi poster olarak sinifa asin ve yil boyunca referans olarak kullanin.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ bize kararlar vermeye baslarsa ozgurluklerimiz kisitlanir mi?',
        ipuclari: [
          'Otonom araclar, kredi degerlendirme, ceza sistemi ornekleri',
          'Insan denetimi kavramini vurgulayın',
          '"YZ danisir, insan karar verir" prensibini tartisin',
        ],
      },
      {
        soru: 'Onyargili bir YZ sistemini nasil duzeltebiliriz?',
        ipuclari: [
          'Veri cesitliligini artirmak',
          'Duzenli denetim ve test',
          'Farkli bakis acilariyla degerlendirme',
          'Seffaf algoritmalar',
        ],
      },
      {
        soru: 'YZ is dunyasini nasil degistirecek? Bazi meslekler yok olacak mi?',
        ipuclari: [
          'Tarihteki benzer donusumler (sanayi devrimi)',
          'Yok olan meslekler vs yeni ortaya cikan meslekler',
          'Hayat boyu ogrenme vurgusu',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ tarafsiz ve objektiftir',
        gercek: 'YZ, insanlarin olusturdugu verilerle egitilir. Verideki onyargilar YZ\'ye yansir.',
        nasilDuzeltilir: 'Gercek onyargı ornekleri gosterin: yuz tanima hatalar, kredi degerlendirme adaletsizlikleri.',
      },
      {
        yanilgi: 'Deepfake sadece unluler icin tehlikeli',
        gercek: 'Herkes deepfake kurbani olabilir. Siber zorbalik ve dolandiricilik amaciyla kullanilabilir.',
        nasilDuzeltilir: 'Kisisel guvenlık onlemleri ve dijital okuryazarlik egitimi.',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Ulusal/uluslararasi YZ etik duzenlemeleri arastirmasi (AB YZ Yasasi)',
        'Etik senaryo bankasi olusturma',
      ],
      destekGerekli: [
        'Somut ornekler ve gorsellerle etik kavramlarini ogretme',
        'Basit senaryolarla "dogru/yanlis" oylaması',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI Ethics Guidelines (UNESCO)',
        url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
        aciklama: 'UNESCO\'nun YZ etik rehberi — ogretmen arka plan bilgisi.',
      },
      {
        baslik: 'Moral Machine',
        url: 'https://www.moralmachine.net',
        aciklama: 'MIT\'nin etik karar verme deneyi — sinifta interaktif demo icin.',
      },
    ],
  },

  // ========== BÖLÜM 10 ==========
  {
    bolumNo: 10,
    baslik: 'Gelecek Seninle Baslar',
    sinifSeviyesi: '8. Sinif',
    dersSaati: 8,
    renk: 'from-indigo-400 to-violet-500',
    icon: '🚀',
    kazanimlar: [
      'Kapsamli bir YZ projesi planla ve hayata gecir',
      'Proje portfolyosu hazirlama becerisi kazan',
      'YZ alanindaki kariyer firsatlarini ve yeni meslekleri kesfet',
      'Hayat boyu ogrenme yol haritasi olustur',
      'Kitap boyunca ogrendigin her seyi bir final projesiyle birlestir',
    ],
    dersPlani: {
      isinma: '"9 bolum boyunca en cok neyi ogrendiniz? Bir cumleyle ozetleyin." Sinif turu.',
      zamanDagilimi: [
        { sure: '15 dk', icerik: 'Isinma + final projesi tanitimi' },
        { sure: '6 ders', icerik: 'Final Projesi (planlama, gelistirme, test, sunum)' },
        { sure: '25 dk', icerik: 'Kariyer Yol Haritasi etkinligi' },
        { sure: '20 dk', icerik: 'Gelecek Mektubu etkinligi' },
        { sure: '1 ders', icerik: 'Gelecek Fuari + Quiz' },
        { sure: '10 dk', icerik: 'Kapanis ve sertifika' },
      ],
      kapanis: 'Sertifika dagitimi + "Gelecekte YZ ile \_\_\_\_ yapacagim" paylasimi.',
    },
    quizCevapAnahtari: [
      {
        soruNo: 1,
        soru: 'Bir YZ projesi portfolyosu icin en onemli ogeler hangileridir?',
        dogruCevap: 'B',
        dogruSecenek: 'Problem tanimi, surec, sonuclar ve ogrenilen dersler',
        aciklama: 'Iyi bir portfolyo sadece sonucu degil, tum sureci ve cikarilan dersleri icerir.',
        ogretmenNotu: 'Ogrencilere ornek portfolyo gosterin. "Kod yeterli" dusuncesi yaygin — surec dokumantasyonunun degerini vurgulayın.',
      },
      {
        soruNo: 2,
        soru: 'YZ alaninda calismak icin hangi beceriler en onemlidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Programlama + matematik + problem cozme + iletisim',
        aciklama: 'YZ multidisipliner bir alandir — sadece teknik beceriler yetmez.',
        ogretmenNotu: '"Sadece programlama" secenegi yaygin yanlis. Iletisim ve isbirligi becerilerinin onemini vurgulayın.',
      },
      {
        soruNo: 3,
        soru: 'Asagidakilerden hangisi YZ ile ilgili yeni ortaya cikan bir meslek DEGILDIR?',
        dogruCevap: 'D',
        dogruSecenek: 'Atli Postaci',
        aciklama: 'Atli postacilik teknoloji oncesi donemden kalan bir meslek olup YZ ile ilgisi yoktur.',
        ogretmenNotu: 'Eglenceli bir soru — ogrenciler gulecek. Bu firsati yeni YZ mesleklerini (Prompt Muhendisi, YZ Etik Danismani, Veri Bilimci) tanitmayi kullanin.',
      },
      {
        soruNo: 4,
        soru: '"Hayat boyu ogrenme" YZ caginda neden onemlidir?',
        dogruCevap: 'B',
        dogruSecenek: 'Teknoloji cok hizli degistigi icin surekli yeni beceriler ogrenilmelidir',
        aciklama: 'YZ alani cok hizli gelisiyor — 5 yil once olmayan araclar simdi standart.',
        ogretmenNotu: '5 yil once ChatGPT\'nin olmadigini hatirlatin. "Siz mezun oldugunuzda hangi yeni araclar olacak?" sorusuyla gelecegi dusundurrun.',
      },
      {
        soruNo: 5,
        soru: 'Bu kitapta ogrenendiginiz en onemli ders nedir?',
        dogruCevap: 'C',
        dogruSecenek: 'YZ guclu bir aractir ve sorumlulukla kullanilmalidir',
        aciklama: 'YZ ne sihir ne de tehlikedir — sorumlu ve bilinclirelik kullanilmasi gereken guclu bir aractir.',
        ogretmenNotu: 'Kitabin ana mesaji! Tum 10 bolumun ozeti bu ciimlede. "Guc, sorumluluk getirir" prensibini vurgulayın.',
      },
    ],
    etkinlikRehberi: [
      {
        ad: 'Final Projesi',
        tip: 'proje',
        sure: '6 ders saati',
        gruplama: 'Bireysel veya 2-3 kisilik grup',
        hazirlik: [
          'Proje onerisi sablonu',
          'Degerlendirme rubriigi (problem, cozum, uygulama, sunum)',
          'Bilgisayar erisimi',
          'Sunum materyalleri',
        ],
        adimlar: [
          '1. ders: Problem secimi + proje onerisi yazma',
          '2. ders: Arastirma + tasarim',
          '3-4. ders: Prototip gelistirme',
          '5. ders: Test + iyilestirme + sunum hazirlik',
          '6. ders: Sunumlar + degerlendirme',
        ],
        olasiSorunlar: [
          'Cok buyuk projeler secilebilir — MVP kavramini hatirlatin',
          'Teknik zorluklar — mockup + aciklama yeterli, calisan uru sart degil',
          'Zaman yonetimi — her ders icin mini hedef belirleyin',
        ],
        ileriSeviye: 'Gercekten calisan bir prototip + kullanici testi raporu.',
      },
      {
        ad: 'Gelecek Mektubu',
        tip: 'yaratici',
        sure: '20 dakika',
        gruplama: 'Bireysel',
        hazirlik: [
          'Mektup kagidi veya dijital form',
          'Zarflar (fiziksel mektup icin)',
        ],
        adimlar: [
          'Her ogrenci 5 yil sonraki kendisine mektup yazar',
          '"Bugur ogrendigim \_\_\_, gelecekte \_\_\_ yapmak istiyorum" sablonu',
          'Mektuplar zarflanir ve ogretmende saklanir (veya dijital olarak kaydedilir)',
          'Gonullu ogrenciler mektuplarini okur',
        ],
        olasiSorunlar: [
          'Bazi ogrenciler ne yazacagini bilemeyebilir — sablonlu form verin',
          'Duygusal olabilir — olumlu ve destekleyici ortam yaratim',
        ],
        ileriSeviye: 'Video mektup kaydetin (1 dk).',
      },
      {
        ad: 'Gelecek Fuari',
        tip: 'unplugged',
        sure: '1 ders saati',
        gruplama: 'Sinif etkinligi',
        hazirlik: [
          'Her grubun projesini sergileyecegi masa/alan',
          'Degerlendirme formlari (diger ogrenciler icin)',
          'Oduller (en yaratici, en faydali, en iyi sunum vb.)',
        ],
        adimlar: [
          'Siralarilmaslarini kurup projelerini sergiler',
          'Galeri yuruyusu: her ogrenci en az 3 projeyi ziyaret eder',
          'Degerlendirme formu doldurulur',
          'Oylar sayilir ve oduller verilir',
        ],
        olasiSorunlar: [
          'Bazi projeler hazir olmayabilir — "calisma sureci" de sunulabilir',
          'Oylama adaletsiz olabilir — ogretmen jurisi de ekleyin',
        ],
        ileriSeviye: 'Okul genelinde veya velilere acik fuar.',
      },
    ],
    tartismaSorulari: [
      {
        soru: 'YZ dunyanin en buyuk problemlerinden hangisini cozebilir? (iklim, saglik, egitim, aclik)',
        ipuclari: [
          'Her alan icin somut YZ uygulamalarini tartisin',
          'YZ\'nin tek basina degiilj insan + YZ isbirligiyle cozum uretecegini vurgulayın',
          'BM Surdurulebilir Kalkinma Hedeflerini refearans gosterin',
        ],
      },
      {
        soru: '10 yil sonra YZ nasil olacak? Hangi yeni meslekler ortaya cikacak?',
        ipuclari: [
          'Hayal gucu siniri koymayin',
          'Gercekci ve fantastik tahminleri ayirin',
          'Hazirlik: "ogrenmeye devam etme" vurgulayın',
        ],
      },
      {
        soru: 'Bu derste ogrendigimiz en onemli 3 sey neydi?',
        ipuclari: [
          'Yil sonu degerlendirmesi',
          'Her ogrenciden farkli 3 sey isteyin',
          'Ortak temalari cikariin',
        ],
      },
    ],
    yanilgilar: [
      {
        yanilgi: 'YZ sadece programcilar icindir',
        gercek: 'YZ her alani etkiliyor — doktorlar, ogretmenler, sanatcilar, ciftciler de YZ kullaniyor ve kullanacak.',
        nasilDuzeltilir: 'Farkli mesleklerde YZ kullanim ornekleri listeleyin.',
      },
      {
        yanilgi: 'Okuldaki dersler YZ caginda isime yaramayacak',
        gercek: 'Matematik, dil, bilim, etik, iletisim — tumu YZ caginda da kritik beceriler. YZ bu becerilerin ustune insa ediliyor.',
        nasilDuzeltilir: 'Her ders ile YZ baglantisini kurun: "Matematik YZ\'nin temelidir, Turkce prompt yazmak icindir..."',
      },
    ],
    farklilastirma: {
      ileriDuzey: [
        'Portfolyo web sitesi olusturma (basit HTML veya Canva)',
        'YZ alaninda staj / gonullu firsatlari arastirma',
        'Okul YZ kulubu kurma planı',
      ],
      destekGerekli: [
        'Proje yerine poster sunumu yeterli',
        'Sablonlu portfolyo formu',
        'Ogretmen rehberliginde adim adim proje',
      ],
    },
    ekKaynaklar: [
      {
        baslik: 'AI Career Pathways',
        url: 'https://ai4k12.org/resources/ai-career-pathways/',
        aciklama: 'YZ kariyer yollari — ogrencilere ilham icin.',
      },
      {
        baslik: 'Code.org - AI Kurslari',
        url: 'https://code.org/ai',
        aciklama: 'Ucretsiz YZ kodlama kurslari — devam etmek isteyenler icin.',
      },
      {
        baslik: 'Coursera - AI for Everyone',
        url: 'https://www.coursera.org/learn/ai-for-everyone',
        aciklama: 'Andrew Ng\'in herkes icin YZ kursu — ogretmen gelisimi icin.',
      },
    ],
  },
]
