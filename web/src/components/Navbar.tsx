"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="text-xl">🤖</span>
          <span className="hidden sm:inline">Yapay Zeka Macerası</span>
          <span className="sm:hidden">YZ Macerası</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/#bolumler" className="transition hover:text-sky-600">Bölümler</Link>
          <Link href="/hakkinda" className="transition hover:text-sky-600">Hakkında</Link>
          <a
            href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--color-border)] px-4 py-1.5 transition hover:bg-[var(--color-bg-secondary)]"
          >
            GitHub
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuAcik(!menuAcik)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] md:hidden"
          aria-label="Menü"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuAcik ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuAcik && (
        <div className="border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link href="/#bolumler" onClick={() => setMenuAcik(false)} className="transition hover:text-sky-600">Bölümler</Link>
            <Link href="/hakkinda" onClick={() => setMenuAcik(false)} className="transition hover:text-sky-600">Hakkında</Link>
            <a href="https://github.com/DrMuratAltun/yapay-zeka-cocuklar" target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-600">GitHub</a>
          </div>
        </div>
      )}
    </nav>
  );
}
