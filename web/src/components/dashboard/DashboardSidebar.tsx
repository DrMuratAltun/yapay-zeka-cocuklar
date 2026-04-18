"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, ReactNode } from "react";

export type SidebarItem = {
  label: string;
  href?: string;
  icon: ReactNode;
  aktif?: boolean;
  alt?: SidebarItem[];
};

interface DashboardSidebarProps {
  items: SidebarItem[];
  logoMetin?: string;
  logoEmoji?: string;
  kullaniciAd?: string;
  kullaniciRol?: string;
  kullaniciAvatar?: string;
}

export default function DashboardSidebar({
  items,
  logoMetin = "GençYZ",
  logoEmoji = "🤖",
  kullaniciAd = "Kullanıcı",
  kullaniciRol = "Öğrenci",
  kullaniciAvatar,
}: DashboardSidebarProps) {
  const [acikAlt, setAcikAlt] = useState<Record<string, boolean>>({});

  const altAcKapa = (label: string) => {
    setAcikAlt((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4 dark:border-slate-900">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-lg text-white shadow-md">
          {logoEmoji}
        </div>
        <span className="text-lg font-extrabold tracking-tight">{logoMetin}</span>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:bg-slate-900">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Ara..."
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const hasAlt = item.alt && item.alt.length > 0;
            const altOpen = acikAlt[item.label];
            return (
              <li key={item.label}>
                {hasAlt ? (
                  <button
                    type="button"
                    onClick={() => altAcKapa(item.label)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      item.aktif
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={`transition-transform ${altOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      item.aktif
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                  </Link>
                )}
                {hasAlt && altOpen && item.alt && (
                  <ul className="ml-6 mt-0.5 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-800">
                    {item.alt.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href || "#"}
                          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ${
                            sub.aktif
                              ? "bg-violet-50 font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                          }`}
                        >
                          {sub.icon}
                          <span>{sub.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Kullanıcı alt bar */}
      <div className="border-t border-slate-100 px-3 py-3 dark:border-slate-900">
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-violet-500">
            {kullaniciAvatar ? (
              <Image src={kullaniciAvatar} alt={kullaniciAd} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                {kullaniciAd.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold">{kullaniciAd}</p>
            <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{kullaniciRol}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
