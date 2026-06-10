'use client'

import { useState } from 'react'
import type { BolumVideo } from '@/data/videolar'

/**
 * Bölüm video slaytı — tıklanınca yüklenen (lite) YouTube embed.
 * Kapak görseli YouTube thumbnail'inden gelir; iframe ancak oynat'a
 * basılınca eklenir (sayfa performansı + KVKK: youtube-nocookie).
 */
export default function VideoSlayt({ videolar }: { videolar: BolumVideo[] }) {
  return (
    <div className="space-y-6">
      {videolar.map((v) => (
        <VideoKarti key={v.youtubeId} video={v} />
      ))}
    </div>
  )
}

function VideoKarti({ video }: { video: BolumVideo }) {
  const [oynat, setOynat] = useState(false)

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="relative aspect-video w-full bg-black">
        {oynat ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.baslik}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOynat(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`${video.baslik} videosunu oynat`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.baslik}
              className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-bold text-foreground">🎬 {video.baslik}</h3>
          {video.aciklama && (
            <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{video.aciklama}</p>
          )}
        </div>
        {video.sure && (
          <span className="shrink-0 rounded-full bg-[var(--color-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
            ⏱️ {video.sure}
          </span>
        )}
      </div>
    </section>
  )
}
