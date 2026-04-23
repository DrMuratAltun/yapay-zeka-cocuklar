'use client'

import { useMemo, useState, useEffect } from 'react'

export type BolumTur = 'kazanim' | 'icerik' | 'video' | 'etkinlik' | 'oyun' | 'quiz' | 'materyal'

export interface BolumBolumData {
  id: string
  baslik: string
  icon: string
  tur: BolumTur
}

const turRenk: Record<BolumTur, string> = {
  kazanim: 'text-sky-600 dark:text-sky-400',
  icerik: 'text-gray-600 dark:text-gray-400',
  video: 'text-violet-600 dark:text-violet-400',
  etkinlik: 'text-emerald-600 dark:text-emerald-400',
  oyun: 'text-pink-600 dark:text-pink-400',
  quiz: 'text-amber-600 dark:text-amber-400',
  materyal: 'text-gray-500 dark:text-gray-500',
}

const turBadge: Record<BolumTur, { label: string; bg: string }> = {
  kazanim: { label: 'Kazanım', bg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  icerik: { label: 'İçerik', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
  video: { label: 'Video', bg: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  etkinlik: { label: 'Etkinlik', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  oyun: { label: 'Oyun', bg: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  quiz: { label: 'Quiz', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  materyal: { label: 'Materyal', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
}

const turGrupBaslik: Record<BolumTur, { label: string; emoji: string }> = {
  kazanim: { label: 'Kazanımlar', emoji: '🎯' },
  icerik: { label: 'Konu Anlatımı', emoji: '📖' },
  video: { label: 'Videolar', emoji: '🎬' },
  etkinlik: { label: 'Etkinlikler', emoji: '✏️' },
  oyun: { label: 'Oyunlar', emoji: '🎮' },
  quiz: { label: 'Değerlendirme', emoji: '📝' },
  materyal: { label: 'Materyaller', emoji: '📥' },
}

const turSirasi: BolumTur[] = ['kazanim', 'icerik', 'video', 'etkinlik', 'oyun', 'quiz', 'materyal']

interface KonuAgaciProps {
  bolumler: BolumBolumData[]
  tamamlananlar: Set<string>
  ilerlemeYuzdesi: number
  aktifBolum: string | null
  onBolumTikla: (id: string) => void
}

export default function KonuAgaci({
  bolumler,
  tamamlananlar,
  ilerlemeYuzdesi,
  aktifBolum,
  onBolumTikla,
}: KonuAgaciProps) {
  const gruplar = useMemo(() => {
    const g = new Map<BolumTur, BolumBolumData[]>()
    for (const b of bolumler) {
      if (!g.has(b.tur)) g.set(b.tur, [])
      g.get(b.tur)!.push(b)
    }
    return turSirasi
      .filter((t) => g.has(t))
      .map((t) => ({ tur: t, items: g.get(t)! }))
  }, [bolumler])

  const aktifTur = useMemo(() => {
    return bolumler.find((b) => b.id === aktifBolum)?.tur ?? null
  }, [bolumler, aktifBolum])

  const [acikGruplar, setAcikGruplar] = useState<Set<BolumTur>>(() => {
    const init = new Set<BolumTur>()
    if (aktifTur) init.add(aktifTur)
    return init
  })

  useEffect(() => {
    if (!aktifTur) return
    setAcikGruplar((prev) => {
      if (prev.has(aktifTur)) return prev
      const next = new Set(prev)
      next.add(aktifTur)
      return next
    })
  }, [aktifTur])

  const grupTogle = (t: BolumTur) => {
    setAcikGruplar((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 space-y-3">
          {/* İlerleme dairesi */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-200 dark:text-gray-700" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" strokeWidth="2.5"
                  strokeDasharray={`${ilerlemeYuzdesi * 0.974} 100`}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-500"
                  stroke="currentColor"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                %{ilerlemeYuzdesi}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">İlerleme</p>
              <p className="text-xs text-muted-foreground">
                {tamamlananlar.size}/{bolumler.length} tamamlandı
              </p>
            </div>
          </div>

          {/* Gruplanmış bölüm listesi */}
          <nav className="space-y-1">
            {gruplar.map(({ tur, items }) => {
              const acik = acikGruplar.has(tur)
              const tamam = items.filter((i) => tamamlananlar.has(i.id)).length
              const baslik = turGrupBaslik[tur]
              return (
                <div key={tur} className="rounded-lg border border-[var(--color-border)] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => grupTogle(tur)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg)] transition"
                    aria-expanded={acik}
                  >
                    <span className="text-base">{baslik.emoji}</span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{baslik.label}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {tamam}/{items.length}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className={`shrink-0 text-muted-foreground transition-transform ${acik ? 'rotate-90' : ''}`}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  {acik && (
                    <ul className="py-1">
                      {items.map((b) => {
                        const tamamlandi = tamamlananlar.has(b.id)
                        const aktif = aktifBolum === b.id
                        return (
                          <li key={b.id}>
                            <button
                              type="button"
                              onClick={() => onBolumTikla(b.id)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm transition ${
                                aktif
                                  ? 'bg-[var(--color-bg-secondary)] font-semibold ring-1 ring-inset ring-[var(--color-border)]'
                                  : 'hover:bg-[var(--color-bg-secondary)]'
                              }`}
                            >
                              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                                {tamamlandi ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <span className="text-[13px]">{b.icon}</span>
                                )}
                              </span>
                              <span className={`truncate flex-1 text-[13px] ${tamamlandi ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                {b.baslik}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobil pill bar */}
      <div className="lg:hidden sticky top-[3.5rem] z-20 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-border)] -mx-4 px-4 py-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${ilerlemeYuzdesi}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground shrink-0">
            %{ilerlemeYuzdesi}
          </span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {bolumler.map((b) => {
            const tamamlandi = tamamlananlar.has(b.id)
            const aktif = aktifBolum === b.id
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onBolumTikla(b.id)}
                className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition ${
                  aktif
                    ? 'bg-foreground text-background shadow'
                    : tamamlandi
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-[var(--color-bg-secondary)] text-muted-foreground'
                }`}
              >
                <span>{tamamlandi ? '✓' : b.icon}</span>
                <span className="max-w-[6rem] truncate">{b.baslik}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { turRenk, turBadge }
