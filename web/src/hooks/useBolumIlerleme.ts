'use client'

import { useState, useCallback, useEffect } from 'react'

interface IlerlemeState {
  tamamlananlar: Set<string>
  ilerlemeYuzdesi: number
}

export function useBolumIlerleme(bolumNo: number, toplamBolum: number) {
  const storageKey = `bolum-${bolumNo}-ilerleme`

  const [tamamlananlar, setTamamlananlar] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set<string>()
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return new Set<string>(JSON.parse(saved))
    } catch {}
    return new Set<string>()
  })

  // localStorage'a kaydet
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...tamamlananlar]))
    } catch {}
  }, [tamamlananlar, storageKey])

  const tamamlaBolum = useCallback((id: string) => {
    setTamamlananlar((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const ilerlemeYuzdesi = toplamBolum > 0
    ? Math.round((tamamlananlar.size / toplamBolum) * 100)
    : 0

  return {
    tamamlananlar,
    ilerlemeYuzdesi,
    tamamlaBolum,
    tamamlandiMi: (id: string) => tamamlananlar.has(id),
  }
}
