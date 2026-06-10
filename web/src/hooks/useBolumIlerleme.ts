'use client'

import { useState, useCallback, useEffect } from 'react'
import { migrateLegacyIlerleme } from '@/data/bolumler'

/**
 * Bölüm slayt ilerlemesi — kanonik localStorage şeması.
 *   bolum-X-ilerleme : tamamlanan slayt id'leri (JSON string[])
 *   bolum-X-toplam   : toplam slayt sayısı (dashboard yüzdesi bunu okur)
 * Eski BolumSlider anahtarları (visited/slide) ilk okumada taşınır.
 */
export function useBolumIlerleme(bolumNo: number, toplamBolum: number) {
  const storageKey = `bolum-${bolumNo}-ilerleme`

  const [tamamlananlar, setTamamlananlar] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set<string>()
    migrateLegacyIlerleme(bolumNo)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return new Set<string>(JSON.parse(saved))
    } catch {}
    return new Set<string>()
  })

  // localStorage'a kaydet (+ toplam slayt sayısını yayınla)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...tamamlananlar]))
      if (toplamBolum > 0) {
        localStorage.setItem(`bolum-${bolumNo}-toplam`, String(toplamBolum))
      }
    } catch {}
  }, [tamamlananlar, storageKey, bolumNo, toplamBolum])

  const tamamlaBolum = useCallback((id: string) => {
    setTamamlananlar((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  // Eski şemadan gelen geçici "bN-idx-i" id'lerini gerçek slayt id'lerine çevir.
  const cozLegacyIdleri = useCallback(
    (gercekIdler: string[]) => {
      setTamamlananlar((prev) => {
        let degisti = false
        const next = new Set<string>()
        const desen = new RegExp(`^b${bolumNo}-idx-(\\d+)$`)
        for (const id of prev) {
          const m = id.match(desen)
          if (m) {
            degisti = true
            const i = Number(m[1])
            if (i >= 0 && i < gercekIdler.length) next.add(gercekIdler[i])
          } else {
            next.add(id)
          }
        }
        return degisti ? next : prev
      })
    },
    [bolumNo]
  )

  const ilerlemeYuzdesi = toplamBolum > 0
    ? Math.min(100, Math.round((tamamlananlar.size / toplamBolum) * 100))
    : 0

  return {
    tamamlananlar,
    ilerlemeYuzdesi,
    tamamlaBolum,
    cozLegacyIdleri,
    tamamlandiMi: (id: string) => tamamlananlar.has(id),
  }
}
