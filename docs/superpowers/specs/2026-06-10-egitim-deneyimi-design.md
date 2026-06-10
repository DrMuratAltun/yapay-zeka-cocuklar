# Eğitim Deneyimi Yeniden Tasarımı — 2026-06-10

## Amaç
Sol menüden bölüm seçilen, bölüm içinde konulardan ilerlenen, **tek tip** ve **takip edilebilir** modüler eğitim deneyimi. Tespit edilen işlevsel hataların giderilmesi.

## Tespit Edilen Hatalar (özet)

### Kritik (işlevsel)
1. `api/student/modules` ve `api/student/teachers`: `class_students` tablosunu var olmayan `student_id` kolonuyla sorguluyor (canlı şema `user_id` — kolay-giris ve diğer 6 route bunu kanıtlıyor). Sonuç: modül atama/kilit sistemi ve "öğretmenlerim" sessizce devre dışı.
2. `InteraktifQuiz` skoru hiçbir yere göndermiyor: `useActivityTracker` provider'ı hiç mount edilmemiş (dummy no-op dönüyor); ActivityTracker'ın payload'ı zaten `/api/progress` şemasıyla uyumsuz. Sonuç: quiz geç → kilit açılmaz, öğretmen skor göremez.
3. İlerleme takibi 4 farklı localStorage şemasına bölünmüş:
   - BolumSlider (B1-5,9,10): `bolum-X-slide`, `bolum-X-visited`
   - BolumCerceve (B6-8): `bolum-X-aktif`, `bolum-X-ilerleme`
   - ogrenci/page + bolumler/page okuyor: `bolum-X-tamamlananlar` (+`-toplam`) — **hiçbir yer yazmıyor** → hep %0
4. Navbar: teacher rolüne `/okul` linki veriliyor; proxy teacher'ı `/okul`dan ana sayfaya atıyor → öğretmen paneline ulaşamaz. Doğrusu `/ogretmen`.

### UX / tutarlılık
5. İki farklı bölüm çerçevesi (BolumSlider vs BolumCerceve) → tutarsız deneyim; auth kullanıcıda çift sidebar.
6. DashboardSidebar: işlevsiz arama kutusu, sahte chevron, logout/tema yok, `top-14` hayalet boşluk.
7. ogrenci/page: işlevsiz 2 arama input'u, işlevsiz "..." ve kalp butonları; Bölüm 7 meta verisi Bölüm 1'den yanlış kopyalanmış.
8. Türkçe karakter ihlalleri: (admin)/(okul) layout "Siteye Don", "Cikis Yap", "Yonetimi"; Navbar rol etiketleri.
9. BOLUMLER meta listesi 5+ dosyada kopya (drift kanıtlı).

### Ölü kod
10. KonuAgaci (render edilmiyor), ActivityTracker, dashboard/{BolumIlerleme, BarChart, ProfilRing}, Banner, BolumSlider (birleştirme sonrası).
11. `web/.git` — iç içe bayat git deposu (rapor edilir, silinmez).

## Tasarım Kararları

### 1. Tek veri kaynağı: `src/data/bolumler.ts`
- `BOLUM_META`: 10 bölümün no/baslik/altBaslik/seviye/ders/renk/bg/ikon/emoji bilgisi.
- Tür sabitleri (`turSirasi`, `turBadge`, `turGrupBaslik`) KonuAgaci'dan buraya taşınır.
- `okuBolumIlerleme(no)`: kanonik anahtarları okur, eski şemadan (visited) otomatik migrate eder.

### 2. Kanonik ilerleme şeması (localStorage + Supabase)
- `bolum-X-ilerleme`: tamamlanan slayt id'leri (JSON string[])
- `bolum-X-toplam`: bölümün toplam slayt sayısı (dashboard yüzdesi için)
- `bolum-X-aktif`: kaldığı slayt index'i
- Slayt id: sayfada verilmemişse `b{no}-{slugify(baslik)}-{idx}` üretilir.
- Yeni tamamlanan her slayt `useProgress.trackProgress` ile `/api/progress`'e da gider (auth varsa) → öğretmen paneli görür.
- Quiz bitişinde `/api/quiz-results`'a `{bolumNo, score}` POST edilir; dönen `passed/minRequired` öğrenciye gösterilir.

### 3. Birleşik bölüm çerçevesi (BolumCerceve v2)
- **Sol menü (desktop)**: üstte marka + "Panelim"; açılır **Bölümler** listesi (10 bölüm, mini ilerleme, aktif vurgulu); altında aktif bölümün **konu ağacı** (tür gruplu: Kazanımlar → Konu → Video → Etkinlik → Oyun → Değerlendirme → Materyaller; tamamlanan ✓); en altta ilerleme halkası.
- **Mobil**: off-canvas çekmece + üstte ince ilerleme barı.
- İçerik: kompakt başlık kartı + aktif slayt kartı + Önceki/Sonraki + klavye ok navigasyonu. 3 sn görüntülenen slayt "tamamlandı" sayılır.
- `/bolumler/[no]` sayfalarında DashboardSidebar gizlenir (çift sidebar biter); çerçevenin sol menüsü tüm navigasyonu sağlar.
- 7 BolumSlider sayfası bu çerçeveye taşınır (slaytlara `tur` eklenir), BolumSlider silinir.

### 4. Video altyapısı
- `src/data/videolar.ts`: `bolumNo → { youtubeId, baslik, aciklama }`. ID girilen bölümde çerçeve otomatik **Video** slaytı gösterir (`VideoSlayt`, youtube-nocookie embed). Murat tek satır ekleyerek video yayınlar.

### 5. Dashboard tüketicileri
- ogrenci/page, bolumler/page, Navbar → `BOLUM_META` + `okuBolumIlerleme`. Arama kutusu bölüm listesini gerçekten filtreler; işlevsiz butonlar kaldırılır.
- DashboardSidebar: arama kaldırılır; alta tema değiştirici + çıkış butonu eklenir.

## Kapsam dışı (bilinçli)
- Sunucu taraflı ilerlemenin localStorage'a geri senkronu (cihaz değişiminde ilerleme); ileride.
- `web/.git` silme (kullanıcı onayına bırakıldı).
