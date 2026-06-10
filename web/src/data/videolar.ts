// Bölüm videoları — Dr. Murat'ın kendi YouTube videoları buraya eklenir.
// youtubeId girilen bölümde BolumCerceve otomatik olarak "Video" slaytı gösterir.
// ID, YouTube URL'sindeki v= parametresidir (örn. https://youtu.be/ABC123 → 'ABC123').

export interface BolumVideo {
  youtubeId: string
  baslik: string
  aciklama?: string
  sure?: string // örn. '12:34' — kartta gösterilir
}

export const BOLUM_VIDEOLARI: Record<number, BolumVideo[]> = {
  1: [
    {
      youtubeId: 'ca_OjAqGpYs',
      baslik: 'Yapay Zekanın Tarihçesi',
      aciklama: "Turing'den ChatGPT'ye yapay zekanın kilometre taşları.",
    },
  ],
  // 2: [{ youtubeId: '', baslik: 'Günlük Hayatta YZ Turu' }],
  // 3: [{ youtubeId: '', baslik: 'Veri Nedir, Neden Önemli?' }],
  // 4: [{ youtubeId: '', baslik: 'Makineler Nasıl Öğrenir?' }],
  // 5: [{ youtubeId: '', baslik: 'Üretken YZ Araçları Turu' }],
  // 6: [{ youtubeId: '', baslik: 'PictoBlox ile İlk YZ Projem' }],
  // 7: [{ youtubeId: '', baslik: 'Problem Çözen YZ Projeleri' }],
  // 8: [{ youtubeId: '', baslik: 'YZ ile Dijital İçerik Üretimi' }],
  // 9: [{ youtubeId: '', baslik: 'YZ Etiği: Deepfake ve Önyargı' }],
  // 10: [{ youtubeId: '', baslik: 'Portfolyo ve Proje Sunumu' }],
}

export function getBolumVideolari(no: number): BolumVideo[] {
  return (BOLUM_VIDEOLARI[no] ?? []).filter((v) => v.youtubeId.trim().length > 0)
}
