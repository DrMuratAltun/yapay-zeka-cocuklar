# Bolum 4: Makineler Nasil Ogrenir?
**Makine Ogrenimi Temelleri** | 6-7. Sinif | 6 ders saati

---

## Neler Ogrenecegiz?
- Makine ogrenimi kavramini ve geleneksel programlamadan farkini anlayacagiz.
- Gozetimli, gozetimsiz ve pekistirmeli ogrenme turlerini ayirt edebilecegiz.
- Siniflandirma ve tahmin kavramlarini ogrenecegiz.
- Google Teachable Machine ile kendi modelimizi egitecegiz.
- Bir modelin basarisini degerlendirmenin temellerini ogrenecegiz.

## Anahtar Kavramlar
`makine ogrenimi` `model` `egitim` `siniflandirma` `tahmin` `gozetimli ogrenme` `ozellik (feature)`

## 1. Geleneksel Programlama vs Makine Ogrenimi

Geleneksel programlamada bilgisayara her adimi tek tek soyleriz. Makine ogreniminde ise bilgisayara ornekler veririz ve o kendisi ogrenir.

### Geleneksel Programlama
**Veri + Kurallar = Sonuc**

Programci kurallari yazar:
"Sicaklik > 30 ise 'sicak' yaz"

### Makine Ogrenimi
**Veri + Sonuclar = Kurallar**

Bilgisayar kurallari kendisi bulur:
1000 ornek --> "sicak/soguk" kalibini ogrenir

> **Dusun:** Bir cocuga "kedi"yi tanimlamayi nasil ogretirsin? Kurallari mi anlatirsin ("4 bacakli, tuylu, miyavlar") yoksa cok sayida kedi fotografi mi gosterirsin?

## 2. Makine Ogrenimi Turleri

### Gozetimli Ogrenme (Supervised Learning)
Her veri icin dogru cevap (etiket) verilir. Model, girdi-cikti iliskisini ogrenir.

Ornekler:
- E-posta: "spam" veya "spam degil" siniflandirmasi
- Goruntu: "kedi" veya "kopek" tanima
- Ev fiyati tahmini (m2, oda sayisi --> fiyat)

**EN YAYGIN TUR**

### Gozetimsiz Ogrenme (Unsupervised Learning)
Etiket yoktur. Model verideki gizli oruntuleri ve gruplari kendisi kesfeder.

Ornekler:
- Musteri segmentasyonu (benzer musterileri gruplama)
- Haber konularini otomatik gruplama
- Anormal davranis tespiti

### Pekistirmeli Ogrenme (Reinforcement Learning)
Model deneme-yanilma ile ogrenir. Dogru davranislar odul, yanlis davranislar ceza alir.

Ornekler:
- AlphaGo - Go oyununu ogrenen YZ
- Robotlarin yurumesini ogrenmesi
- Otonom araclarin surusu ogrenmesi

## 3. Siniflandirma ve Tahmin

| Ozellik | Siniflandirma | Tahmin (Regresyon) |
|---------|---------------|-------------------|
| Cikti | Kategori (sinif) | Sayi (deger) |
| Ornek | Kedi mi kopek mi? | Evin fiyati kac TL? |
| Ornek 2 | Spam mi degil mi? | Yarin sicaklik kac derece? |
| Sonuc turu | Ayrik (2+ sinif) | Surekli (sayisal) |

## 4. Karar Agaci ile Siniflandirma

Karar agaci, en anlasilir makine ogrenimi algoritmalarindan biridir. Her dugumde bir soru sorulur ve cevaba gore dallanilir:

```
Meyve hangisi?
|
+-- Rengi kirmizi mi?
    |
    +-- Evet --> Yuvarlak mi?
    |           |
    |           +-- Evet --> Elma
    |           +-- Hayir --> Cilek
    |
    +-- Hayir --> Sari mi?
                |
                +-- Evet --> Muz
                +-- Hayir --> Portakal
```

## 5. Teachable Machine ile Model Egitimi

Google Teachable Machine, kodlama bilmeden kendi YZ modelinizi egitmenizi saglar. Uc turde model egitebilirsiniz:

- **Goruntu Modeli** - Kamera veya resim yukleme ile goruntu siniflandirma modeli
- **Ses Modeli** - Mikrofon ile farkli sesleri taniyabilen model
- **Poz Modeli** - Vucut pozlarini tanima ve siniflandirma modeli

### Adim Adim: Goruntu Siniflandirma Modeli

1. **Sinif Olustur** - En az 2 sinif olusturun (ornek: "Kedi" ve "Kopek")
2. **Ornek Topla** - Her sinif icin en az 50 fotograf cekin veya yukleyin
3. **Modeli Egit** - "Train Model" butonuna basin. Model orneklerden ogrenir
4. **Test Et** - Kameranizi acin veya yeni fotograf yukleyin. Model dogru mu tahmin ediyor?
5. **Gelistir** - Basari dusukse daha fazla ornek ekleyin, farkli acilardan fotograflar cekin

Kaynak: teachablemachine.withgoogle.com adresinden hemen baslayabilirsiniz!

> **Biliyor Muydunuz?** GPT-4 modeli yaklasik 1 trilyon parametreye sahiptir ve internetin buyuk bir bolumundeki metin verileriyle egitilmistir. Egitim sureci aylarca surmus ve milyonlarca dolar maliyeti olmustur. Ama siz Teachable Machine ile dakikalar icinde kendi modelinizi egitebilirsiniz!

## Etkinlikler

### Etkinlik 1: Meyve Siniflandirici
**UNPLUGGED** | 25 dakika | Grup calismasi

Meyve resimlerini kesin. Ozellik kartlarini (renk, sekil, boyut) kullanarak kendi karar agacinizi olusturun. Arkadaslarinizin karar agaciyla sizinkini karsilastirin. Farkli agaclar ayni sonucu verebilir mi?

Malzemeler: Meyve resimleri, ozellik kartlari, siniflandirma panosu, makas

### Etkinlik 2: Teachable Machine - Goruntu Modeli
**BILGISAYARLI** | 40 dakika | Bireysel

teachablemachine.withgoogle.com adresine gidin. Iki sinifli bir goruntu siniflandirma modeli egitin (ornek: kalem/silgi, el/yumruk, gulme/ciddi yuz). En az 50 ornek toplayin. Modelinizi test edin ve basari oranini kaydedin.

### Etkinlik 3: ML for Kids - Siniflandirma
**BILGISAYARLI** | 30 dakika | Bireysel

machinelearningforkids.co.uk adresinde bir proje olusturun. Metin siniflandirma projesi yapin: "mutlu" ve "uzgun" cumleleri ayiran bir model egitin. Modelinizi Scratch'te kullanan kucuk bir program yapin.

### Etkinlik 4: Model Basari Raporu
**UNPLUGGED** | 20 dakika | Grup tartismasi

Egittiginiz modelin basari oranini sinifla paylasin. Hangi modeller daha basarili? Neden? Daha fazla ornek mi, daha iyi oruntuler mi? Tartisarak "iyi bir model" icin nelerin gerektigini listeleyin.

## Degerlendirme Testi

**1. Makine ogrenimi icin en dogru tanim hangisidir?**
- A) Bilgisayarlarin insan gibi dusunmesi
- B) Makinelerin veriden oruntu ogrenerek tahmin yapmasi
- C) Robotlarin fiziksel olarak ogrenmesi
- D) Programcilarin her kurali tek tek yazmasi

**2. Google Teachable Machine ile hangi tur model egitilebilir?**
- A) Sadece ses tanima
- B) Goruntu, ses ve vucut pozu tanima
- C) Sadece metin siniflandirma
- D) Sadece yuz tanima

**3. Bir makine ogrenimi modelini egitirken "egitim verisi" ne ise yarar?**
- A) Modelin performansini test etmek
- B) Modelin oruntuleri ogrenmesini saglamak
- C) Modeli internete baglamak
- D) Modelin hizini artirmak

**4. Asagidakilerden hangisi "gozetimli ogrenme" ornegi DEGILDIR?**
- A) Etiketli fotograflarla kedi/kopek ayirma
- B) Spam/spam degil e-posta siniflandirma
- C) Musterileri otomatik gruplara ayirma (etiket olmadan)
- D) Ev fiyati tahmini

**5. Bir modelin egitim verisinde cok iyi, yeni verilerde kotu performans gostermesine ne denir?**
- A) Overfitting (asiri uyum)
- B) Underfitting (yetersiz uyum)
- C) Transfer ogrenimi
- D) Pekistirmeli ogrenme

## Indirilebilir Materyaller
- [Meyve Siniflandirici Kartlari](/indirilebilir/bolum-04-meyve-siniflandirici-kartlari.html)
- [Teachable Machine Rehberi](/indirilebilir/bolum-04-teachable-machine-rehberi.html)
- [Model Basari Raporu Formu](/indirilebilir/bolum-04-model-basari-raporu.html)

---
*Yapay Zeka Macerasi -- Dr. Murat ALTUN -- CC BY-NC-SA 4.0*
