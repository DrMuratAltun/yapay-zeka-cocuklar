# GençYZ İçerik Destek Planı — Dış Bağımlılıklar ve Video Yol Haritası

> Tarih: 2026-06-10 · Tarama kapsamı: `web/src/`, `kitap/`, fontlar, tüm dış URL'ler

## 1. Kendi Videonla Değiştirilecekler (EN YÜKSEK ÖNCELİK)

Sistem hazır: `web/src/data/videolar.ts` dosyasına YouTube ID'sini tek satır ekle,
ilgili bölümde **Video slaytı otomatik** görünür (sol menüde 🎬 Videolar grubu).

| Bölüm | Önerilen Video | Süre Önerisi | Durum |
|-------|----------------|--------------|-------|
| 1 | Yapay Zekanın Tarihçesi (Turing → ChatGPT) | 8-12 dk | ✅ Mevcut: `ca_OjAqGpYs` (dış kanal — kendi videonla değiştir) |
| 2 | Günlük Hayatta YZ Turu (telefon, ev, okul örnekleri) | 6-8 dk | ⬜ Çekilecek |
| 3 | Veri Nedir? Veriden Bilgiye Yolculuk | 6-8 dk | ⬜ Çekilecek |
| 4 | Makineler Nasıl Öğrenir? (Teachable Machine demo) | 10-12 dk | ⬜ Çekilecek — ekran kaydı ideal |
| 5 | Üretken YZ Araçları Turu (ChatGPT/Gemini güvenli kullanım) | 8-10 dk | ⬜ Çekilecek |
| 6 | PictoBlox ile İlk YZ Projem (adım adım) | 12-15 dk | ⬜ Çekilecek — ekran kaydı şart |
| 7 | Problem Çözen YZ Projeleri (STEM örnekleri) | 8-10 dk | ⬜ Çekilecek |
| 8 | YZ ile Dijital İçerik: Canva + görsel üretim | 8-10 dk | ⬜ Çekilecek |
| 9 | Deepfake ve Önyargı: YZ Etiği | 8-10 dk | ⬜ Çekilecek |
| 10 | Portfolyo Hazırlama ve Proje Sunumu | 6-8 dk | ⬜ Çekilecek |

**Ekleme şekli** (`videolar.ts`):
```ts
2: [{ youtubeId: 'SENIN_VIDEO_ID', baslik: 'Günlük Hayatta YZ Turu', sure: '7:30' }],
```

## 2. Ders İçinde Kritik Dış Araçlar (değiştirilemez — yedek planı gerekli)

Bu araçlar pedagojinin parçası; kaldırılmaz ama **erişim kesilirse** yedek etkinlik tanımlı olmalı:

| Araç | Kullanıldığı Yer | Risk | Yedek Plan Önerisi |
|------|------------------|------|--------------------|
| Teachable Machine (Google) | B4 içerik + etkinlik, B7, B10, öğretmen kılavuzu | Düşük (Google) | Tarayıcıda çalışan kendi mini sınıflandırıcı sayfan (TensorFlow.js) — orta vadeli proje |
| PictoBlox (STEMpedia) | B6 tüm bölüm, B7, B10 | Orta (kurulum gerekir) | Scratch + ML for Kids kombinasyonu B6 yedeği olarak kılavuza eklendi |
| ML for Kids | B4, B6 | Düşük | Teachable Machine ile aynı kazanımlar |
| Canva (Education) | B8 poster etkinliği | Düşük | Yazıcı dostu poster şablonu (indirilebilir HTML) zaten mevcut |
| Scratch | B6 yedek, kılavuz | Çok düşük | — |
| Quick Draw / AutoDraw | Kılavuz önerileri | Düşük | Tamamlayıcı, zorunlu değil |

## 3. Wikimedia Görselleri → Yerelleştir ✅ TAMAMLANDI (2026-06-10)

`VeriEtiketleme.tsx` etkinliğindeki 12 görsel `web/public/etkinlik/veri-etiketleme/` altına indirildi,
bileşen yerel yollara geçirildi. **Not:** Eski URL'lerin tamamı Wikimedia'da 400 veriyordu ve 3 dosya
Commons'tan tamamen silinmişti — yani etkinlik canlıda kırıktı. Silinen 3 köpek görseli (Golden
Retriever, Bulldog, Pomeranian) uygun lisanslı yenileriyle değiştirildi, lisans bilgileri `kaynak`
alanlarında güncellendi (CC BY-SA 3.0/4.0, CC BY 2.0/2.5, Public Domain). Görseller 600px'e
küçültülüp sıkıştırıldı (toplam ~1.0 MB). Dış görsel bağımlılığı kalmadı.

## 4. Tamamlayıcı Dış Linkler (sorun değil, bilgi amaçlı)

Öğretmen kılavuzundaki zenginleştirme kaynakları — link kırılsa ders bozulmaz:
ai4k12.org, dayofai.org, elementsofai.com, learnprompting.org, moralmachine.net,
UNESCO etik tavsiyesi, KVKK, Google Dataset Search, Coursera AI for Everyone,
thispersondoesnotexist.com, ISTE, designthinkingforeducators.com, SDG hedefleri.

**Öneri:** Bu liste yılda bir kontrol edilmeli (kırık link taraması).

## 5. Fontlar

Geist, Cinzel, Nunito → `next/font/google` ile **build sırasında** indiriliyor, çalışma anında
Google'a istek atılmıyor. Bağımlılık riski yok, aksiyon gerekmez.

## 6. Video Üretim İpuçları (öneri)

1. **Önce B4 ve B6 videoları** — bu bölümler dış araç ağırlıklı; ekran kaydı + sesli anlatım en yüksek katkıyı verir.
2. Format: 1080p, yatay; ilk 15 saniyede "bu videoda ne öğreneceksin" özeti (çocuk dikkati).
3. YouTube'da "çocuklara özel" işaretle + her videonun açıklamasına gencyz.com bölüm linkini koy (SEO çapraz bağlantı).
4. Aynı çekimden 60 saniyelik Shorts kes → kanal büyümesi → platforma trafik.
