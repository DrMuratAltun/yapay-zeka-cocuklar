# Yapay Zeka Macerasi

### Ortaokul Ogrencileri Icin Uygulamali Yapay Zeka Kitabi (6-8. Sinif)

> Cocuklara yapay zekayi ogretmek icin uygulamali, eglenceli ve MEB mufredatina uyumlu acik kaynak kitap ve interaktif web platformu.

---

## Kitap Hakkinda

Bu proje, 6-8. sinif ogrencilerine (11-14 yas) yapay zekayi anlasilir ve uygulamali bir sekilde ogretmeyi amaclamaktadir.

### Ozellikler

- **10 Bolum** - Temel kavramlardan ileri projelere kadar
- **Uygulamali** - Her bolumde hem bilgisayarli hem bilgisayarsiz (unplugged) etkinlikler
- **Yazici Dostu** - Tum etkinlik sayfalari ve degerlendirme formlari PDF olarak indirilebilir
- **Interaktif Web Sitesi** - Quizler, simulasyonlar, gomulu araclar
- **Video Egitimler** - Her bolum icin "nasil yapilir" videolari
- **QR Kodlar** - Kitaptaki sayfalardan dogrudan web etkinliklerine erisim
- **MEB Uyumlu** - BTY 6. sinif 5. Tema (Yapay Zeka) kazanimlariyla uyumlu
- **Ogretmen Kaynaklari** - Ders planlari, rubrikler, ek materyaller

### Bolumler

| # | Bolum | Seviye | Ders Saati |
|---|-------|--------|------------|
| 1 | Yapay Zeka Nedir? - Kesif Yolculugu | 6. Sinif | 4 |
| 2 | Yapay Zeka Etrafimizda - Gunluk Hayatta YZ | 6. Sinif | 4 |
| 3 | Verinin Gucu - YZ'nin Yakiti | 6. Sinif | 4 |
| 4 | Makineler Nasil Ogrenir? - Makine Ogrenimi | 6-7. Sinif | 6 |
| 5 | YZ Araclariyla Tanisin - Uretken Yapay Zeka | 6-7. Sinif | 6 |
| 6 | Blok Tabanli YZ Kodlama - PictoBlox Projeleri | 7. Sinif | 8 |
| 7 | Gercek Hayat Problemlerine YZ Cozumleri | 7-8. Sinif | 8 |
| 8 | Dijital Icerik Uretimi - YZ ile Yaraticilik | 7-8. Sinif | 6 |
| 9 | YZ ve Etik - Dogru Kullanimn Pusulasi | 7-8. Sinif | 4 |
| 10 | Gelecek Seninle Baslar - Proje ve Portfolyo | 8. Sinif | 8 |

### Kullanilan Araclar

| Arac | Kullanim | Ucret |
|------|----------|-------|
| [Google Teachable Machine](https://teachablemachine.withgoogle.com/) | ML model egitimi | Ucretsiz |
| [PictoBlox](https://thestempedia.com/product/pictoblox/) | Blok tabanli YZ kodlama | Ucretsiz |
| [Machine Learning for Kids](https://machinelearningforkids.co.uk/) | ML projeleri | Ucretsiz |
| [Scratch](https://scratch.mit.edu/) | Blok tabanli kodlama | Ucretsiz |
| ChatGPT / Gemini / Copilot | Uretken YZ deneyimi | Ucretsiz (temel) |
| [Canva](https://canva.com/) | Gorsel tasarim | Ucretsiz (temel) |

## Proje Yapisi

```
yapay-zeka-cocuklar/
├── kitap/                    # Kitap icerigi (Markdown)
│   ├── bolum-01/             # Her bolum icin ayri klasor
│   │   ├── README.md         # Bolum icerigi
│   │   ├── etkinlikler/      # Etkinlik sayfalari
│   │   ├── kartlar/          # Kesilecek kartlar (unplugged)
│   │   └── degerlendirme/    # Test + oz degerlendirme
│   └── ...
├── web/                      # Next.js interaktif web sitesi
├── assets/                   # Gorseller, QR kodlar, videolar
└── docs/                     # Proje dokumanlari
```

## Web Sitesi

Interaktif kitap ve uygulama platformu: **[yapay-zeka-cocuklar.vercel.app](https://yapay-zeka-cocuklar.vercel.app)** (yakin zamanda)

## Katkida Bulunma

Katkida bulunmak istiyorsaniz:
1. Bu repoyu fork edin
2. Degisikliklerinizi yapin
3. Pull request gonderin

Hata bildirimleri ve oneriler icin [Issues](https://github.com/DrMuratAltun/yapay-zeka-cocuklar/issues) bolumunu kullanin.

## Lisans

Bu eser [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.tr) lisansi ile lisanslanmistir.

- Egitim amacli kullanimlar serbesttir
- Ticari kullanim yasaktir
- Atif zorunludur
- Turetilen eserler ayni lisansla paylasilmalidir

## Yazar

**Dr. Murat ALTUN**

---

*Bu proje, Turkiye'de ortaokul ogrencilerinin yapay zeka okuryazarligini gelistirmek icin olusturulmus acik kaynak bir egitim kaynagi girisimidir.*
