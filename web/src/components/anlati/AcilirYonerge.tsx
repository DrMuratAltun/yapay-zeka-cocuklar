'use client'

import { useState, type ReactNode } from 'react'

interface AcilirYonergeProps {
  baslik: string
  emoji?: string
  rozet?: string // örn. UNPLUGGED, GÖZLEM, BİLGİSAYARLI
  rozetRenk?: string // tailwind bg sınıfı, örn. bg-emerald-500
  sure?: string // örn. "20 dakika · Grup çalışması"
  varsayilanAcik?: boolean
  children: ReactNode
}

/**
 * Katlanabilir yönerge/bilgi kutusu — etkinlik slaytlarında asıl etkinliğin
 * ekranda kalması için açıklamalar varsayılan kapalı durur; öğrenci isterse açar.
 */
export default function AcilirYonerge({
  baslik,
  emoji = '📋',
  rozet,
  rozetRenk = 'bg-sky-500',
  sure,
  varsayilanAcik = false,
  children,
}: AcilirYonergeProps) {
  const [acik, setAcik] = useState(varsayilanAcik)

  return (
    <section className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <button
        type="button"
        onClick={() => setAcik((a) => !a)}
        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-[var(--color-bg)]"
        aria-expanded={acik}
      >
        <span className="text-base">{emoji}</span>
        {rozet && (
          <span className={`shrink-0 rounded ${rozetRenk} px-2 py-0.5 text-[10px] font-bold text-white`}>
            {rozet}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-foreground">{baslik}</span>
        {sure && (
          <span className="hidden shrink-0 text-xs text-[var(--color-text-secondary)] sm:inline">{sure}</span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`shrink-0 text-muted-foreground transition-transform ${acik ? 'rotate-90' : ''}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {acik && <div className="space-y-3 border-t border-[var(--color-border)] px-4 py-3 text-sm">{children}</div>}
    </section>
  )
}
