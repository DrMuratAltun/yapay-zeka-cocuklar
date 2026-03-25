# Yapay Zeka Macerasi - Proje Talimatlari

## Proje Ozeti
Ortaokul ogrencileri (6-8. sinif) icin uygulamali yapay zeka kitabi ve interaktif web platformu.

## Teknoloji Stacki
- **Kitap icerigi:** Markdown dosyalari (PDF'e donusturulecek)
- **Web sitesi:** Next.js 16 (App Router) + Tailwind CSS + shadcn/ui
- **Deploy:** Vercel
- **Lisans:** CC BY-NC-SA 4.0

## Icerik Kurallari
- Turkce icerik (UI ve kitap)
- Hedef kitle 11-14 yas - dil basit, anlasilir, eglenceli olmali
- Her bolumde en az 1 unplugged (bilgisayarsiz) etkinlik olmali
- Etkinlik sayfalari yazici dostu (PDF render) olmali
- Degerlendirme formlari ayri sayfa, baski uyumlu
- QR kodlar web sitesindeki ilgili sayfaya yonlendirmeli

## Web Sitesi Kurallari
- Turkce UI
- Responsive tasarim (mobil oncelikli - ogrenciler telefon/tablet kullanir)
- Her bolum icin ayri sayfa: okuma, etkinlikler, video, indirilebilir, quiz
- PDF indirme ozelligi (etkinlik sayfalari, kartlar)
- Video embed (YouTube)
- Interaktif quizler (bolum sonu degerlendirme)
- Acik/koyu mod destegi

## Dosya Isimlendirme
- Bolum klasorleri: `bolum-01`, `bolum-02`, ...
- Etkinlik dosyalari: `etkinlik-01-kim-daha-zeki.md`
- Kart dosyalari: `kart-insan-vs-makine.svg`
- Degerlendirme: `test-bolum-01.md`, `oz-degerlendirme-bolum-01.md`

## AI Isbirligi Protokolu
Bu proje AI isbirligi protokolune tabidir. Detaylar icin ana `~/.claude/CLAUDE.md` dosyasina bakin.

## Komutlar
- `npm run dev` - Web sitesi gelistirme sunucusu
- `npm run build` - Web sitesi build
