"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  rightRail?: ReactNode;
  children: ReactNode;
  baslik?: string;
  altBaslik?: string;
  ustSag?: ReactNode;
}

export default function DashboardLayout({
  sidebar,
  rightRail,
  children,
  baslik,
  altBaslik,
  ustSag,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {sidebar}

      {/* Ana içerik */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        {/* Üst bar */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-5 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="hidden min-w-0 flex-1 lg:flex items-center gap-3">
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-500 dark:bg-slate-900">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Ders, bölüm veya etkinlik ara..."
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Mobile title */}
          <div className="flex-1 lg:hidden">
            {baslik && <p className="text-sm font-bold">{baslik}</p>}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {ustSag}
            <button
              type="button"
              className="cursor-pointer rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Bildirimler"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14V11a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* İçerik */}
        <div className="p-4 sm:p-6">
          {(baslik || altBaslik) && (
            <div className="mb-5 hidden lg:block">
              {baslik && <h1 className="text-2xl font-extrabold md:text-3xl">{baslik}</h1>}
              {altBaslik && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{altBaslik}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>

      {/* Sağ kanat */}
      {rightRail && (
        <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-4 xl:block dark:border-slate-800 dark:bg-slate-950">
          {rightRail}
        </aside>
      )}
    </div>
  );
}
