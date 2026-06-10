'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import {
  BOLUM_META,
  getBolum,
  slugifyBaslik,
  turSirasi,
  turGrupBaslik,
  okuBolumIlerleme,
  type BolumTur,
} from '@/data/bolumler'
import { getBolumVideolari } from '@/data/videolar'
import VideoSlayt from '@/components/anlati/VideoSlayt'
import { IcIlerlemeContext, type IcIlerlemeDurum } from '@/components/anlati/icIlerleme'
import { useBolumIlerleme } from '@/hooks/useBolumIlerleme'
import { useProgress } from '@/hooks/useProgress'

export interface BolumBolum {
  id?: string
  baslik: string
  icon: string
  tur?: BolumTur
  icerik: React.ReactNode
  /** @deprecated eski API — artık kullanılmıyor */
  varsayilanAcik?: boolean
}

interface BolumCerceveProps {
  bolumNo: number
  bolumler: BolumBolum[]
}

interface Slayt {
  id: string
  baslik: string
  icon: string
  tur: BolumTur
  icerik: React.ReactNode
}

/** Slaytlara kalıcı id + tür ata; videolar.ts'te videosu olan bölüme video slaytı ekle. */
function slaytlariHazirla(bolumNo: number, bolumler: BolumBolum[]): Slayt[] {
  const kullanilan = new Set<string>()
  const slaytlar: Slayt[] = bolumler.map((b, idx) => {
    let id = b.id ?? `b${bolumNo}-${slugifyBaslik(b.baslik)}`
    if (kullanilan.has(id)) id = `${id}-${idx}`
    kullanilan.add(id)
    return { id, baslik: b.baslik, icon: b.icon, tur: b.tur ?? 'icerik', icerik: b.icerik }
  })

  const videolar = getBolumVideolari(bolumNo)
  if (videolar.length > 0 && !slaytlar.some((s) => s.tur === 'video')) {
    const videoSlayt: Slayt = {
      id: `b${bolumNo}-video`,
      baslik: videolar.length === 1 ? videolar[0].baslik : 'Bölüm Videoları',
      icon: '🎬',
      tur: 'video',
      icerik: <VideoSlayt videolar={videolar} />,
    }
    // Konu anlatımının hemen ardına yerleştir
    let pos = -1
    for (let i = 0; i < slaytlar.length; i++) {
      if (slaytlar[i].tur === 'icerik' || slaytlar[i].tur === 'kazanim') pos = i
    }
    slaytlar.splice(pos + 1, 0, videoSlayt)
  }

  return slaytlar
}

export default function BolumCerceve({ bolumNo, bolumler }: BolumCerceveProps) {
  const meta = getBolum(bolumNo)
  const slaytlar = useMemo(() => slaytlariHazirla(bolumNo, bolumler), [bolumNo, bolumler])

  const { tamamlananlar, ilerlemeYuzdesi, tamamlaBolum, tamamlandiMi, cozLegacyIdleri } =
    useBolumIlerleme(bolumNo, slaytlar.length)
  const { trackProgress, resetTimer } = useProgress()

  const [aktifIndex, setAktifIndex] = useState(() => {
    if (typeof window === 'undefined') return 0
    try {
      const saved = localStorage.getItem(`bolum-${bolumNo}-aktif`)
      const idx = saved !== null ? parseInt(saved, 10) : 0
      return Math.min(Math.max(0, idx), slaytlar.length - 1)
    } catch {
      return 0
    }
  })

  const [menuAcik, setMenuAcik] = useState(false)
  const [accessBlocked, setAccessBlocked] = useState(false)
  const [requiredBolum, setRequiredBolum] = useState<number | null>(null)

  // Eski şemadan taşınan geçici id'leri gerçek id'lere çevir (bir kez)
  useEffect(() => {
    cozLegacyIdleri(slaytlar.map((s) => s.id))
  }, [cozLegacyIdleri, slaytlar])

  useEffect(() => {
    try {
      localStorage.setItem(`bolum-${bolumNo}-aktif`, String(aktifIndex))
    } catch {}
  }, [aktifIndex, bolumNo])

  // 3 sn görüntülenen slayt tamamlandı sayılır; yeni tamamlananlar Supabase'e de gider
  useEffect(() => {
    resetTimer()
    const s = slaytlar[aktifIndex]
    if (!s || tamamlandiMi(s.id)) return
    const t = setTimeout(() => {
      tamamlaBolum(s.id)
      trackProgress({
        activityType: 'slide_view',
        activitySlug: s.id,
        courseSlug: `bolum-${bolumNo}`,
        metadata: { baslik: s.baslik, tur: s.tur },
      })
    }, 3000)
    return () => clearTimeout(t)
  }, [aktifIndex, slaytlar, tamamlaBolum, tamamlandiMi, trackProgress, resetTimer, bolumNo])

  // Modül kilidi (sınıf ataması varsa)
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

  // Konu içi sayfalayıcı (IcSayfa) durumu — yan menüde 📄 2/3 gösterimi
  const [icDurum, setIcDurum] = useState<IcIlerlemeDurum | null>(null)
  const icBildir = useCallback((d: IcIlerlemeDurum) => setIcDurum(d), [])

  // Slayt içeriği kendi alanında kayar (viewport kilitli) — slayt değişince başa sar.
  // icDurum sıfırlama efektte DEĞİL burada: efekt, çocuğun bildir'inden sonra çalışıp siliyordu.
  const icerikRef = useRef<HTMLDivElement>(null)
  const bolumSec = useCallback((idx: number) => {
    setIcDurum(null)
    setAktifIndex(idx)
    setMenuAcik(false)
    icerikRef.current?.scrollTo({ top: 0 })
  }, [])

  const oncekiIcerik = () => aktifIndex > 0 && bolumSec(aktifIndex - 1)
  const sonrakiIcerik = () => aktifIndex < slaytlar.length - 1 && bolumSec(aktifIndex + 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowRight' && aktifIndex < slaytlar.length - 1) bolumSec(aktifIndex + 1)
      else if (e.key === 'ArrowLeft' && aktifIndex > 0) bolumSec(aktifIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aktifIndex, slaytlar.length, bolumSec])

  if (!meta) return null

  if (accessBlocked) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-6xl">🔒</div>
        <h2 className="mb-2 text-xl font-bold text-foreground">Bu bölüm kilitli</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          Bu bölüme erişmek için önce{' '}
          {requiredBolum ? `Bölüm ${requiredBolum}` : 'önceki bölümü'} tamamlamanız gerekiyor.
        </p>
        {requiredBolum && (
          <Link
            href={`/bolumler/${requiredBolum}`}
            className="rounded-lg bg-violet-600 px-6 py-2.5 font-semibold text-white transition hover:bg-violet-700"
          >
            Bölüm {requiredBolum}&apos;e Git
          </Link>
        )}
      </div>
    )
  }

  const aktifSlayt = slaytlar[aktifIndex]
  const ilkMi = aktifIndex === 0
  const sonMu = aktifIndex === slaytlar.length - 1
  const sonrakiBolum = bolumNo < 10 ? bolumNo + 1 : null

  const menuIcerik = (
    <KonuMenu
      bolumNo={bolumNo}
      slaytlar={slaytlar}
      tamamlananlar={tamamlananlar}
      ilerlemeYuzdesi={ilerlemeYuzdesi}
      aktifIndex={aktifIndex}
      icDurum={icDurum}
      onSec={bolumSec}
    />
  )

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Desktop sol menü — 768px ve üstünde her zaman görünür */}
      <aside className="hidden md:block w-60 xl:w-72 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="h-full px-3 py-3">{menuIcerik}</div>
      </aside>

      {/* Mobil çekmece */}
      {menuAcik && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuAcik(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[88vw] overflow-y-auto bg-[var(--color-bg)] px-3 py-4 shadow-xl">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setMenuAcik(false)}
                className="rounded-lg p-1.5 hover:bg-[var(--color-bg-secondary)]"
                aria-label="Menüyü kapat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>
            {menuIcerik}
          </div>
        </div>
      )}

      {/* İçerik sütunu — viewport kilitli, slayt içi kayar */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* Mobil üst bar */}
        <div className="md:hidden shrink-0 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <button
              type="button"
              onClick={() => setMenuAcik(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-2.5 py-1.5 text-sm font-semibold"
              aria-label="Konu menüsünü aç"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
              Konular
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">
                {aktifSlayt.icon} {aktifSlayt.baslik}
              </p>
            </div>
            {/* Konu geçişi (telefon) */}
            <button
              type="button"
              onClick={oncekiIcerik}
              disabled={ilkMi}
              className="rounded-lg border border-[var(--color-border)] p-1.5 disabled:opacity-30"
              aria-label="Önceki konu"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
              {aktifIndex + 1}/{slaytlar.length}
            </span>
            {sonMu && sonrakiBolum ? (
              <Link
                href={`/bolumler/${sonrakiBolum}`}
                className="rounded-lg bg-violet-600 p-1.5 text-white"
                aria-label={`Bölüm ${sonrakiBolum}'e geç`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ) : (
              <button
                type="button"
                onClick={sonrakiIcerik}
                disabled={sonMu}
                className="rounded-lg bg-violet-600 p-1.5 text-white disabled:opacity-30"
                aria-label="Sonraki konu"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
          <div className="h-1 bg-[var(--color-bg-secondary)]">
            <div
              className={`h-full bg-gradient-to-r ${meta.renk} transition-all duration-500`}
              style={{ width: `${ilerlemeYuzdesi}%` }}
            />
          </div>
        </div>

        <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-1 flex-col gap-2.5 px-3 pb-3 pt-2 sm:px-5">
          {/* İnce başlık — yalnız desktop (mobilde üst bar var) */}
          <header className="hidden md:flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-1.5">
            <span className={`inline-block shrink-0 rounded-full bg-gradient-to-r ${meta.renk} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white`}>
              Bölüm {bolumNo}
            </span>
            <h1 className="min-w-0 flex-1 truncate text-sm font-extrabold text-foreground">
              {meta.baslik}
              <span className="ml-2 hidden font-medium text-muted-foreground xl:inline">
                {meta.seviye} · {meta.ders} ders saati
              </span>
            </h1>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {tamamlananlar.size}/{slaytlar.length} konu
            </span>
            <IlerlemeHalkasi yuzde={ilerlemeYuzdesi} boyut={32} />
          </header>

          {/* Aktif slayt — başlık yok (konu zaten yan menüde seçili), içerik tüm alanı kaplar */}
          <article className="flex min-h-0 flex-1 flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm">
            <div ref={icerikRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              <IcIlerlemeContext.Provider value={{ bildir: icBildir }}>
                {aktifSlayt.icerik}
              </IcIlerlemeContext.Provider>
            </div>
          </article>

        </div>
      </div>
    </div>
  )
}

/* ---------- Sol menü ---------- */

function KonuMenu({
  bolumNo,
  slaytlar,
  tamamlananlar,
  ilerlemeYuzdesi,
  aktifIndex,
  icDurum,
  onSec,
}: {
  bolumNo: number
  slaytlar: Slayt[]
  tamamlananlar: Set<string>
  ilerlemeYuzdesi: number
  aktifIndex: number
  icDurum: IcIlerlemeDurum | null
  onSec: (idx: number) => void
}) {
  const meta = getBolum(bolumNo)!
  const aktifTur = slaytlar[aktifIndex]?.tur

  const gruplar = useMemo(() => {
    const m = new Map<BolumTur, { idx: number; s: Slayt }[]>()
    slaytlar.forEach((s, idx) => {
      if (!m.has(s.tur)) m.set(s.tur, [])
      m.get(s.tur)!.push({ idx, s })
    })
    return turSirasi.filter((t) => m.has(t)).map((t) => ({ tur: t, items: m.get(t)! }))
  }, [slaytlar])

  // Tüm konu haritası tek bakışta görünsün — gruplar varsayılan AÇIK
  const [acikGruplar, setAcikGruplar] = useState<Set<BolumTur>>(
    () => new Set(slaytlar.map((s) => s.tur))
  )
  useEffect(() => {
    if (!aktifTur) return
    setAcikGruplar((prev) => {
      if (prev.has(aktifTur)) return prev
      const next = new Set(prev)
      next.add(aktifTur)
      return next
    })
  }, [aktifTur])

  // Aktif konuyu menüde görünür tut
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>(`[data-konu-idx="${aktifIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [aktifIndex])

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {/* Marka + geri */}
      <div className="flex items-center justify-between px-1">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md">
            <span className="text-base">🤖</span>
          </span>
          <span className="text-base font-extrabold tracking-tight text-foreground">
            Genç<span className="text-violet-600">YZ</span>
          </span>
        </Link>
        <Link
          href="/ogrenci"
          className="rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-[var(--color-bg-secondary)] hover:text-foreground"
        >
          Panelim
        </Link>
      </div>

      {/* Bölüm değiştirici */}
      <BolumDegistirici aktifNo={bolumNo} />

      {/* Aktif bölüm başlığı */}
      <div className={`rounded-xl bg-gradient-to-r ${meta.bg} px-3 py-2.5 text-white`}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Bölüm {bolumNo}</p>
        <p className="text-sm font-bold leading-tight">{meta.baslik}</p>
      </div>

      {/* Konu ağacı — kendi alanında kayar, alt kontroller sabit kalır */}
      <nav ref={navRef} className="min-h-0 flex-1 space-y-1 overflow-y-auto">
        {gruplar.map(({ tur, items }) => {
          const acik = acikGruplar.has(tur)
          const tamam = items.filter((i) => tamamlananlar.has(i.s.id)).length
          const baslik = turGrupBaslik[tur]
          return (
            <div key={tur} className="overflow-hidden rounded-lg border border-[var(--color-border)]">
              <button
                type="button"
                onClick={() =>
                  setAcikGruplar((prev) => {
                    const next = new Set(prev)
                    if (next.has(tur)) next.delete(tur)
                    else next.add(tur)
                    return next
                  })
                }
                className="flex w-full items-center gap-2 bg-[var(--color-bg-secondary)] px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
                aria-expanded={acik}
              >
                <span className="text-base">{baslik.emoji}</span>
                <span className="flex-1 text-sm font-semibold text-foreground">{baslik.label}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">
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
                  {items.map(({ idx, s }) => {
                    const tamamlandi = tamamlananlar.has(s.id)
                    const aktif = idx === aktifIndex
                    const sayfaGoster = aktif && icDurum && icDurum.toplam > 1
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          data-konu-idx={idx}
                          onClick={() => onSec(idx)}
                          className={`w-full px-3 py-1.5 text-left text-sm transition ${
                            aktif
                              ? 'bg-violet-50 font-semibold text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900'
                              : 'hover:bg-[var(--color-bg-secondary)]'
                          }`}
                          aria-current={aktif ? 'true' : undefined}
                        >
                          <span className="flex items-center gap-2">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                              {tamamlandi ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : (
                                <span className="text-[13px]">{s.icon}</span>
                              )}
                            </span>
                            <span className={`flex-1 truncate text-[13px] ${tamamlandi && !aktif ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {s.baslik}
                            </span>
                          </span>
                          {/* Konu içi sayfa ilerlemesi (IcSayfa bildirir) */}
                          {sayfaGoster && (
                            <span className="mt-1 flex items-center gap-1.5 pl-6">
                              <span className="flex items-center gap-0.5">
                                {Array.from({ length: icDurum.toplam }, (_, i) => (
                                  <span
                                    key={i}
                                    className={`h-1 rounded-full transition-all ${
                                      i < icDurum.sayfa ? 'w-3 bg-violet-500' : 'w-1.5 bg-[var(--color-border)]'
                                    }`}
                                  />
                                ))}
                              </span>
                              <span className="text-[10px] font-bold text-violet-500">
                                📄 {icDurum.sayfa}/{icDurum.toplam}
                              </span>
                            </span>
                          )}
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

      {/* Konu geçişi — konular arası gezinme yan menüden yapılır */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-1.5">
        <button
          type="button"
          onClick={() => onSec(aktifIndex - 1)}
          disabled={aktifIndex === 0}
          className="flex h-8 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Önceki konu"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="flex-1 text-center text-xs font-semibold text-muted-foreground">
          Konu {aktifIndex + 1}/{slaytlar.length}
        </span>
        {aktifIndex === slaytlar.length - 1 ? (
          <Link
            href={bolumNo < 10 ? `/bolumler/${bolumNo + 1}` : '/bolumler'}
            className="flex h-8 items-center justify-center gap-1 rounded-lg bg-violet-600 px-2.5 text-[11px] font-bold text-white transition hover:bg-violet-700"
          >
            {bolumNo < 10 ? `Bölüm ${bolumNo + 1}` : 'Bitir'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onSec(aktifIndex + 1)}
            className="flex h-8 w-9 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-700"
            aria-label="Sonraki konu"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* İlerleme özeti */}
      <div className="flex items-center gap-3 rounded-xl bg-[var(--color-bg-secondary)] px-3 py-2.5">
        <IlerlemeHalkasi yuzde={ilerlemeYuzdesi} boyut={40} />
        <div>
          <p className="text-sm font-semibold text-foreground">%{ilerlemeYuzdesi} tamamlandı</p>
          <p className="text-xs text-muted-foreground">
            {tamamlananlar.size}/{slaytlar.length} konu
          </p>
        </div>
      </div>
    </div>
  )
}

/** 10 bölümlük açılır liste — her bölümün mini ilerlemesiyle. */
function BolumDegistirici({ aktifNo }: { aktifNo: number }) {
  const [acik, setAcik] = useState(false)
  const [yuzdeler, setYuzdeler] = useState<Record<number, number>>({})

  useEffect(() => {
    const out: Record<number, number> = {}
    for (const b of BOLUM_META) out[b.no] = okuBolumIlerleme(b.no).yuzde
    setYuzdeler(out)
  }, [])

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setAcik((a) => !a)}
        className="flex w-full items-center gap-2 bg-[var(--color-bg-secondary)] px-3 py-2 text-left transition hover:bg-[var(--color-bg)]"
        aria-expanded={acik}
      >
        <span className="text-base">📚</span>
        <span className="flex-1 text-sm font-semibold text-foreground">Tüm Bölümler</span>
        <span className="shrink-0 text-[10px] text-muted-foreground">{aktifNo}/10</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`shrink-0 text-muted-foreground transition-transform ${acik ? 'rotate-90' : ''}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {acik && (
        <ul className="py-1">
          {BOLUM_META.map((b) => {
            const aktif = b.no === aktifNo
            const yuzde = yuzdeler[b.no] ?? 0
            return (
              <li key={b.no}>
                <Link
                  href={`/bolumler/${b.no}`}
                  className={`flex items-center gap-2 px-3 py-1.5 text-[13px] transition ${
                    aktif
                      ? 'bg-violet-50 font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300'
                      : 'hover:bg-[var(--color-bg-secondary)]'
                  }`}
                  aria-current={aktif ? 'page' : undefined}
                >
                  <span className="shrink-0">{b.emoji}</span>
                  <span className="flex-1 truncate">
                    {b.no}. {b.baslik}
                  </span>
                  {yuzde >= 100 ? (
                    <span className="shrink-0 text-emerald-500">✓</span>
                  ) : yuzde > 0 ? (
                    <span className="shrink-0 text-[10px] font-bold text-muted-foreground">%{yuzde}</span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function IlerlemeHalkasi({ yuzde, boyut }: { yuzde: number; boyut: number }) {
  return (
    <div className="relative shrink-0" style={{ width: boyut, height: boyut }}>
      <svg viewBox="0 0 36 36" className="-rotate-90" style={{ width: boyut, height: boyut }}>
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--color-bg-secondary)]" />
        <circle
          cx="18" cy="18" r="15.5" fill="none" strokeWidth="3"
          strokeDasharray={`${yuzde * 0.974} 100`}
          strokeLinecap="round"
          className="text-violet-500 transition-all duration-500"
          stroke="currentColor"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-foreground">
        %{yuzde}
      </span>
    </div>
  )
}
