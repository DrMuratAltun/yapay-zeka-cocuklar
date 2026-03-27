# GençYZ B2B SaaS Modülü — Tasarım Dokümanı

**Tarih:** 2026-03-27
**Proje:** yapay-zeka-cocuklar/web (GençYZ)
**Durum:** Onaylandı

---

## Genel Bakış

GençYZ web uygulaması içinde tamamen bağımsız bir Okul SaaS modülü. Yapay Zeka Okulum projesinden ayrı; kendi Supabase projesi, kendi auth sistemi, kendi yönetim panelleri.

Hedef: Okulların GençYZ platformunu satın alıp öğrencilerine kullandırması. Öğretmen tam kontrol, öğrenci Code.org benzeri kolay giriş.

---

## 1. Veritabanı

**Supabase Projesi (GençYZ'e özel):**
- URL: `https://unkldyiweszmlyrxctee.supabase.co`
- Project ref: `unkldyiweszmlyrxctee`
- YZO ile HİÇBİR bağlantısı yok

### Tablolar

```sql
schools (
  id uuid PK,
  name text,
  quota_students int,   -- maks öğrenci sayısı
  quota_teachers int,   -- maks öğretmen sayısı
  status text           -- active | suspended | trial
)

school_users (
  id uuid PK,
  school_id uuid FK → schools,
  user_id uuid FK → auth.users,
  role text             -- super_admin | school_admin | teacher | student
)

classes (
  id uuid PK,
  school_id uuid FK → schools,
  teacher_id uuid FK → auth.users,
  name text,
  access_code text UNIQUE,   -- ör. "6A-GYZ"
  credential_type text       -- pin | emoji | word
)
```

### RLS Politikaları

| Tablo | Kural |
|-------|-------|
| schools | super_admin hepsini görür; school_admin kendi okulunu |
| school_users | super_admin hepsini; school_admin kendi okulu; teacher kendi sınıfı |
| classes | teacher kendi sınıflarını; super_admin + school_admin okul bazlı |

---

## 2. Öğrenci Auth Sistemi

### Yaklaşım: Öğretmen Yönetimli Proxy Hesaplar

Öğrenciler kendi hesaplarını oluşturmaz. Öğretmen her öğrenci için Supabase Auth'da hesap açar.

**Supabase Auth kaydı:**
```
email:    {nickname}@{access_code}.gencyz.local
password: öğretmenin seçtiği credential (PIN/emoji/kelime kodu)
```

**Örnek:**
```
email:    kaplanali@6A-GYZ.gencyz.local
password: dog-star-rocket   (emoji seçimi)
```

Email verification Supabase'de kapalı tutulur.

### Credential Tipleri (sınıf bazlı, öğretmen seçer)

| Tip | Örnek | Depolanma |
|-----|-------|-----------|
| PIN | `7342` | 4 haneli sayı, düz metin → hash |
| Emoji | 🐶🌟🚀 | `dog-star-rocket` formatı → hash |
| Kelime | `mavi-elma` | kelime kombinasyonu → hash |

### `/kolay-giris` Akışı

```
Adım 1: Sınıf kodu gir     → "6A-GYZ"
Adım 2: Nickname seç       → dropdown/kart: "KaplanAli", "YıldızAyşe"
         (nicknameler sınıf içinde benzersiz, çakışma yok)
Adım 3: Şifresini gir      → credential tipine göre UI değişir:
         PIN    → sayı klavyesi
         Emoji  → 12'li emoji grid, 3 seç
         Kelime → kelime listesinden seç
→ Supabase Auth ile signIn → oturum açılır
```

---

## 3. Sayfa Yapısı

```
web/src/app/
├── (admin)/
│   └── admin/okullar/page.tsx          ← Super Admin paneli
│
├── (okul)/
│   └── okul/page.tsx                   ← Okul Admin dashboardu
│
├── (ogretmen)/
│   └── ogretmen/siniflar/
│       └── [classId]/page.tsx          ← Öğretmen: öğrenci yönetimi
│
├── kolay-giris/
│   └── page.tsx                        ← Öğrenci Code.org tarzı giriş
│
└── api/
    └── schools/
        ├── route.ts                    ← Okul CRUD (super_admin)
        └── students/
            └── csv/route.ts            ← CSV upload + kota kontrol
```

### Middleware Koruması (`middleware.ts`)

| Route | Gerekli Rol |
|-------|-------------|
| `/admin/*` | super_admin |
| `/okul/*` | school_admin, super_admin |
| `/ogretmen/*` | teacher, school_admin, super_admin |
| `/kolay-giris` | Herkese açık |

---

## 4. Özellik Detayları

### Super Admin (`/admin/okullar`) — Dr. Murat
- Okul oluştur: isim, öğrenci kotası, öğretmen kotası
- Okul listesi: aktif/askıya alınmış
- Okul detay: kullanıcı sayısı, abonelik durumu

### Okul Admin (`/okul`)
- Dashboard: kalan kota (öğrenci/öğretmen)
- Öğretmen davet et (email ile)
- Sınıf listesi ve öğrenci sayıları

### Öğretmen (`/ogretmen/siniflar/[classId]`)
- Sınıf bilgisi ve access code
- Öğrenci listesi: nickname, credential durumu
- Öğrenci ekle: tekli veya CSV yükleme
- PIN/sembol sıfırla
- Öğrenci çıkar (Supabase Auth'dan sil)
- Yazdırılabilir giriş kartı PDF (nickname + credential)

### CSV Upload API (`/api/schools/students/csv`)
- CSV parse: nickname sütunu
- Kota kontrol: `schools.quota_students` aşılıyorsa 422 dön
- Her satır için: Supabase Auth user oluştur + school_users kaydı
- Başarı/hata raporu dön (satır bazlı)

---

## 5. İş Bölümü (Claude ↔ Gemini)

| Görev | Sorumlu |
|-------|---------|
| Yeni Supabase env setup (.env.local güncelleme) | Claude |
| Supabase migration (3 tablo + RLS) | Claude |
| `middleware.ts` (rol koruması) | Claude |
| `/kolay-giris/page.tsx` (Code.org tarzı UI) | Claude |
| `/api/schools/students/csv/route.ts` | Claude |
| `/admin/okullar/page.tsx` Super Admin UI | Gemini |
| `/okul/page.tsx` Okul Admin UI | Gemini |
| `/ogretmen/siniflar/[classId]/page.tsx` Öğretmen UI | Gemini |

---

## 6. Teknik Kısıtlamalar

- Supabase email verification: **KAPALI** (Admin panelden)
- Proxy email domain `gencyz.local`: geçerli format ama gerçek domain değil
- Nickname benzersizliği: class bazında, DB UNIQUE constraint ile
- Kota aşımı: API seviyesinde kontrol, RLS ek güvence
- YZO entegrasyonu: **YOK** — tamamen bağımsız

---

## 7. Doğrulama Senaryoları

1. Super admin → `/admin/okullar` → 5 öğrenci kotalı okul oluştur
2. Öğretmen → CSV ile 6 öğrenci yükle → kota hatası al (422)
3. Öğretmen → 2 öğrenci yükle → başarılı
4. Öğrenci → `/kolay-giris` → sınıf kodu → nickname → credential → giriş başarılı
5. Öğretmen → öğrencinin PIN/sembolünü sıfırla → yeni credential oluştu
