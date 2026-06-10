// Tek kaynak: 10 bölümün meta verisi, tür sabitleri ve ilerleme okuma yardımcıları.
// Bölüm sayfaları, dashboard ve Navbar bu modülü kullanır — kopya liste tutmayın.

export type BolumTur = 'kazanim' | 'icerik' | 'video' | 'etkinlik' | 'oyun' | 'quiz' | 'materyal'

export interface BolumMeta {
  no: number
  baslik: string
  altBaslik: string
  seviye: string
  ders: number
  renk: string // gradient (açık ton) — progress bar, rozet
  bg: string // gradient (koyu ton) — kart kapağı
  emoji: string
}

export const BOLUM_META: BolumMeta[] = [
  { no: 1, baslik: 'Yapay Zeka Nedir?', altBaslik: 'Keşif Yolculuğu', seviye: '6. Sınıf', ders: 4, renk: 'from-sky-400 to-blue-500', bg: 'from-sky-500 to-blue-600', emoji: '🤖' },
  { no: 2, baslik: 'Günlük Hayatta YZ', altBaslik: 'Yapay Zeka Etrafımızda', seviye: '6. Sınıf', ders: 4, renk: 'from-emerald-400 to-teal-500', bg: 'from-emerald-500 to-teal-600', emoji: '🏡' },
  { no: 3, baslik: 'Verinin Gücü', altBaslik: "YZ'nin Yakıtı", seviye: '6. Sınıf', ders: 4, renk: 'from-violet-400 to-purple-500', bg: 'from-violet-500 to-purple-600', emoji: '📊' },
  { no: 4, baslik: 'Makineler Nasıl Öğrenir?', altBaslik: 'ML Temelleri', seviye: '6-7. Sınıf', ders: 6, renk: 'from-orange-400 to-amber-500', bg: 'from-orange-500 to-amber-600', emoji: '🧠' },
  { no: 5, baslik: 'Üretken Yapay Zeka', altBaslik: 'YZ Araçları', seviye: '6-7. Sınıf', ders: 6, renk: 'from-pink-400 to-rose-500', bg: 'from-pink-500 to-rose-600', emoji: '✨' },
  { no: 6, baslik: 'Blok Tabanlı YZ Kodlama', altBaslik: 'PictoBlox Projeleri', seviye: '7. Sınıf', ders: 8, renk: 'from-blue-400 to-indigo-500', bg: 'from-blue-500 to-indigo-600', emoji: '🧩' },
  { no: 7, baslik: 'Gerçek Hayat Problemleri', altBaslik: 'STEM Tabanlı YZ Çözümleri', seviye: '7-8. Sınıf', ders: 8, renk: 'from-teal-400 to-cyan-500', bg: 'from-teal-500 to-cyan-600', emoji: '🌍' },
  { no: 8, baslik: 'Dijital İçerik Üretimi', altBaslik: 'YZ ile Yaratıcılık', seviye: '7-8. Sınıf', ders: 6, renk: 'from-rose-400 to-pink-500', bg: 'from-rose-500 to-pink-600', emoji: '🎨' },
  { no: 9, baslik: 'YZ ve Etik', altBaslik: 'Doğru Kullanımın Pusulası', seviye: '7-8. Sınıf', ders: 4, renk: 'from-amber-400 to-orange-500', bg: 'from-amber-500 to-orange-600', emoji: '⚖️' },
  { no: 10, baslik: 'Gelecek Seninle Başlar', altBaslik: 'Proje ve Portfolyo', seviye: '8. Sınıf', ders: 8, renk: 'from-indigo-400 to-violet-500', bg: 'from-indigo-500 to-violet-600', emoji: '🚀' },
]

export function getBolum(no: number): BolumMeta | undefined {
  return BOLUM_META.find((b) => b.no === no)
}

/* ---- Tür sabitleri (eski KonuAgaci'dan taşındı) ---- */

export const turSirasi: BolumTur[] = ['kazanim', 'icerik', 'video', 'etkinlik', 'oyun', 'quiz', 'materyal']

export const turBadge: Record<BolumTur, { label: string; bg: string }> = {
  kazanim: { label: 'Kazanım', bg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  icerik: { label: 'Konu', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
  video: { label: 'Video', bg: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  etkinlik: { label: 'Etkinlik', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  oyun: { label: 'Oyun', bg: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  quiz: { label: 'Quiz', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  materyal: { label: 'Materyal', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
}

export const turGrupBaslik: Record<BolumTur, { label: string; emoji: string }> = {
  kazanim: { label: 'Kazanımlar', emoji: '🎯' },
  icerik: { label: 'Konu Anlatımı', emoji: '📖' },
  video: { label: 'Videolar', emoji: '🎬' },
  etkinlik: { label: 'Etkinlikler', emoji: '✏️' },
  oyun: { label: 'Oyunlar', emoji: '🎮' },
  quiz: { label: 'Değerlendirme', emoji: '📝' },
  materyal: { label: 'Materyaller', emoji: '📥' },
}

/* ---- Slayt kimliği ---- */

export function slugifyBaslik(baslik: string): string {
  const tr: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', I: 'i', Ö: 'o', Ş: 's', Ü: 'u' }
  return baslik
    .split('')
    .map((ch) => tr[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

/* ---- İlerleme okuma (kanonik şema + eski şemadan migrasyon) ----
 * Kanonik anahtarlar:
 *   bolum-X-ilerleme : tamamlanan slayt id'leri (JSON string[])
 *   bolum-X-toplam   : bölümdeki toplam slayt sayısı
 *   bolum-X-aktif    : kaldığı slayt index'i
 * Eski (BolumSlider) anahtarları bolum-X-visited / bolum-X-slide bir kez
 * kanonik şemaya taşınır (index'ler geçici id'ye çevrilir; çerçeve ilk
 * açılışta gerçek id'lerle değiştirir).
 */

export interface BolumIlerlemeOzet {
  tamam: number
  toplam: number
  yuzde: number
  sonAktif: number // -1: hiç başlamamış
}

// Eski visited (index listesi) → kanonik id listesine bir defalık taşıma.
export function migrateLegacyIlerleme(no: number): void {
  if (typeof window === 'undefined') return
  try {
    const yeni = localStorage.getItem(`bolum-${no}-ilerleme`)
    const eski = localStorage.getItem(`bolum-${no}-visited`)
    if (eski) {
      const indeksler = JSON.parse(eski) as number[]
      if (Array.isArray(indeksler) && indeksler.length > 0) {
        const mevcut = new Set<string>(yeni ? (JSON.parse(yeni) as string[]) : [])
        for (const i of indeksler) mevcut.add(`b${no}-idx-${i}`)
        localStorage.setItem(`bolum-${no}-ilerleme`, JSON.stringify([...mevcut]))
      }
      localStorage.removeItem(`bolum-${no}-visited`)
    }
    const eskiSlide = localStorage.getItem(`bolum-${no}-slide`)
    if (eskiSlide !== null) {
      if (localStorage.getItem(`bolum-${no}-aktif`) === null) {
        localStorage.setItem(`bolum-${no}-aktif`, eskiSlide)
      }
      localStorage.removeItem(`bolum-${no}-slide`)
    }
  } catch {}
}

export function okuBolumIlerleme(no: number): BolumIlerlemeOzet {
  const bos: BolumIlerlemeOzet = { tamam: 0, toplam: 0, yuzde: 0, sonAktif: -1 }
  if (typeof window === 'undefined') return bos
  try {
    migrateLegacyIlerleme(no)
    const raw = localStorage.getItem(`bolum-${no}-ilerleme`)
    const tamam = raw ? (JSON.parse(raw) as string[]).length : 0
    const toplamRaw = localStorage.getItem(`bolum-${no}-toplam`)
    const toplam = toplamRaw ? Math.max(1, Number(toplamRaw)) : 0
    const aktifRaw = localStorage.getItem(`bolum-${no}-aktif`)
    const sonAktif = aktifRaw !== null ? Number(aktifRaw) : -1
    if (toplam === 0) {
      // Toplam henüz bilinmiyor (bölüm hiç açılmamış) — tamam>0 ise tahmini %.
      return { tamam, toplam: 0, yuzde: tamam > 0 ? Math.min(100, tamam * 5) : 0, sonAktif }
    }
    const yuzde = Math.min(100, Math.round((Math.min(tamam, toplam) / toplam) * 100))
    return { tamam, toplam, yuzde, sonAktif }
  } catch {
    return bos
  }
}
