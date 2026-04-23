'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import { turBadge, type BolumTur } from '@/components/KonuAgaci'
import { useBolumIlerleme } from '@/hooks/useBolumIlerleme'

export interface BolumBolum {
  id: string
  baslik: string
  icon: string
  tur: BolumTur
  icerik: React.ReactNode
  varsayilanAcik?: boolean
}

interface BolumCerceveProps {
  bolumNo: number
  bolumBaslik: string
  bolumAltBaslik: string
  seviye: string
  ders: number
  renk: string
  oncekiBolum: number | null
  sonrakiBolum: number | null
  bolumler: BolumBolum[]
}

const turGrupBaslik: Record<BolumTur, { label: string; emoji: string }> = {
  kazanim: { label: 'Kazanımlar', emoji: '🎯' },
  icerik: { label: 'Konu', emoji: '📖' },
  video: { label: 'Video', emoji: '🎬' },
  etkinlik: { label: 'Etkinlik', emoji: '✏️' },
  oyun: { label: 'Oyun', emoji: '🎮' },
  quiz: { label: 'Değerlendirme', emoji: '📝' },
  materyal: { label: 'Materyaller', emoji: '📥' },
}

const turSirasi: BolumTur[] = ['kazanim', 'icerik', 'video', 'etkinlik', 'oyun', 'quiz', 'materyal']

export default function BolumCerceve({
  bolumNo,
  bolumBaslik,
  bolumAltBaslik,
  seviye,
  ders,
  renk,
  sonrakiBolum,
  bolumler,
}: BolumCerceveProps) {
  const { tamamlananlar, ilerlemeYuzdesi, tamamlaBolum, tamamlandiMi } = useBolumIlerleme(bolumNo, bolumler.length)

  const [aktifIndex, setAktifIndex] = useState(() => {
    if (typeof window === 'undefined') return 0
    try {
      const saved = localStorage.getItem(`bolum-${bolumNo}-aktif`)
      const idx = saved !== null ? parseInt(saved, 10) : 0
      return Math.min(idx, bolumler.length - 1)
    } catch { return 0 }
  })

  const [accessBlocked, setAccessBlocked] = useState(false)
  const [requiredBolum, setRequiredBolum] = useState<number | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(`bolum-${bolumNo}-aktif`, String(aktifIndex))
    } catch {}
  }, [aktifIndex, bolumNo])

  useEffect(() => {
    const b = bolumler[aktifIndex]
    if (!b || tamamlandiMi(b.id)) return
    const t = setTimeout(() => tamamlaBolum(b.id), 3000)
    return () => clearTimeout(t)
  }, [aktifIndex, bolumler, tamamlaBolum, tamamlandiMi])

  useEffect(() => {
    fetch('/api/student/modules')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.enrolled || data.modules.length === 0) return
        const myModule = data.modules.find((m: { bolumNo: number }) => m.bolumNo === bolumNo)
        if (myModule && !myModule.unlocked) {
          setAccessBlocked(true)
          const idx = data.modules.findIndex((m: { bolumNo: number }) => m.bolumNo === bolumNo)
          if (idx > 0) setRequiredBolum(data.modules[idx - 1].bolumNo)
        }
      })
      .catch(() => {})
  }, [bolumNo])

  const bolumSec = useCallback((idx: number) => {
    setAktifIndex(idx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const oncekiIcerik = () => aktifIndex > 0 && bolumSec(aktifIndex - 1)
  const sonrakiIcerik = () => aktifIndex < bolumler.length - 1 && bolumSec(aktifIndex + 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' && aktifIndex < bolumler.length - 1) bolumSec(aktifIndex + 1)
      else if (e.key === 'ArrowLeft' && aktifIndex > 0) bolumSec(aktifIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aktifIndex, bolumler.length, bolumSec])

  const gruplar = useMemo(() => {
    const m = new Map<BolumTur, { idx: number; b: BolumBolum }[]>()
    bolumler.forEach((b, idx) => {
      if (!m.has(b.tur)) m.set(b.tur, [])
      m.get(b.tur)!.push({ idx, b })
    })
    return turSirasi.filter((t) => m.has(t)).map((t) => ({ tur: t, items: m.get(t)! }))
  }, [bolumler])

  const aktifTur = bolumler[aktifIndex]?.tur

  // Aktif slayta scroll et (yatay pill bar içinde)
  const pillBarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!pillBarRef.current) return
    const el = pillBarRef.current.querySelector<HTMLElement>(`[data-slide-idx="${aktifIndex}"]`)
    if (el) {
      const c = pillBarRef.current
      const cRect = c.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      const offset = (eRect.left + eRect.width / 2) - (cRect.left + cRect.width / 2)
      c.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }, [aktifIndex])

  if (accessBlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-foreground mb-2">Bu bölüm kilitli</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Bu bölüme erişmek için önce{' '}
          {requiredBolum ? `Bölüm ${requiredBolum}` : 'önceki bölümü'} tamamlamanız gerekiyor.
        </p>
        {requiredBolum && (
          <Link
            href={`/bolumler/${requiredBolum}`}
            className="rounded-lg bg-violet-600 px-6 py-2.5 text-white font-semibold hover:bg-violet-700 transition"
          >
            Bölüm {requiredBolum}&apos;e Git
          </Link>
        )}
      </div>
    )
  }

  const aktifBolum = bolumler[aktifIndex]
  const ilkMi = aktifIndex === 0
  const sonMu = aktifIndex === bolumler.length - 1

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/ogrenci" className="hover:text-foreground transition">Panelim</Link>
        <span>/</span>
        <Link href="/bolumler" className="hover:text-foreground transition">Bölümlerim</Link>
        <span>/</span>
        <span className="text-foreground font-semibold">Bölüm {bolumNo}</span>
      </nav>

      {/* Başlık kartı — kompakt dashboard stili */}
      <header className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 sm:p-6">
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${renk}`} />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                Bölüm {bolumNo}
              </span>
              <span className="rounded-full bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {seviye}
              </span>
              <span className="rounded-full bg-[var(--color-bg-secondary)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {ders} ders saati
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
              {bolumBaslik}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">{bolumAltBaslik}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-extrabold text-foreground leading-none">
                %{ilerlemeYuzdesi}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {tamamlananlar.size}/{bolumler.length}
              </div>
            </div>
            <div className="relative h-12 w-12">
              <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--color-bg-secondary)]" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" strokeWidth="3"
                  strokeDasharray={`${ilerlemeYuzdesi * 0.974} 100`}
                  strokeLinecap="round"
                  className="text-violet-500 transition-all duration-500"
                  stroke="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Tür sekmeleri */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {gruplar.map(({ tur, items }) => {
          const isActive = tur === aktifTur
          const tam = items.filter((x) => tamamlananlar.has(x.b.id)).length
          const g = turGrupBaslik[tur]
          return (
            <button
              key={tur}
              type="button"
              onClick={() => bolumSec(items[0].idx)}
              className={`shrink-0 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? 'border-violet-300 bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:border-violet-800 dark:text-violet-300'
                  : 'border-[var(--color-border)] bg-[var(--color-bg)] text-muted-foreground hover:text-foreground hover:border-violet-200'
              }`}
            >
              <span>{g.emoji}</span>
              <span>{g.label}</span>
              <span className="rounded-full bg-[var(--color-bg-secondary)] px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                {tam}/{items.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Aktif tür içindeki slayt pill'leri */}
      <div ref={pillBarRef} className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mt-1">
        {bolumler.map((b, idx) => {
          if (b.tur !== aktifTur) return null
          const isActive = idx === aktifIndex
          const isDone = tamamlananlar.has(b.id)
          return (
            <button
              key={b.id}
              data-slide-idx={idx}
              type="button"
              onClick={() => bolumSec(idx)}
              className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-foreground text-background shadow'
                  : isDone
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : 'bg-[var(--color-bg-secondary)] text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{isDone ? '✓' : b.icon}</span>
              <span className="max-w-[12rem] truncate">{b.baslik}</span>
            </button>
          )
        })}
      </div>

      {/* Aktif içerik */}
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm">
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-3">
          <span className="text-2xl">{aktifBolum.icon}</span>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground text-lg truncate">{aktifBolum.baslik}</h2>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${turBadge[aktifBolum.tur].bg}`}>
            {turBadge[aktifBolum.tur].label}
          </span>
          {tamamlandiMi(aktifBolum.id) && (
            <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
          )}
        </div>
        <div className="p-5 space-y-4">{aktifBolum.icerik}</div>
      </article>

      {/* Navigasyon */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={oncekiIcerik}
          disabled={ilkMi}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm font-semibold text-foreground transition hover:border-violet-300 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Önceki
        </button>

        <span className="text-xs text-muted-foreground">
          {aktifIndex + 1} / {bolumler.length}
        </span>

        {sonMu ? (
          sonrakiBolum ? (
            <Link
              href={`/bolumler/${sonrakiBolum}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Bölüm {sonrakiBolum}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/bolumler"
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Tüm Bölümler
            </Link>
          )
        ) : (
          <button
            onClick={sonrakiIcerik}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Sonraki
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
