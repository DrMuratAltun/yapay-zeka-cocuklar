"use client";

import { ReactNode } from "react";

interface ProfilRingProps {
  ad: string;
  selam?: string;
  altMetin?: string;
  avatarEmoji?: string;
  ilerleme: number; // 0-100
  children?: ReactNode;
}

/**
 * Sağ kanat için profil ring kartı — dairesel ilerleme göstergesi
 * (Ottertag'daki büyük profil kartı)
 */
export default function ProfilRing({
  ad,
  selam = "Merhaba",
  altMetin = "Yolculuğuna devam et!",
  avatarEmoji = "🧑‍🎓",
  ilerleme,
  children,
}: ProfilRingProps) {
  const radius = 56;
  const stroke = 6;
  const normRadius = radius - stroke / 2;
  const circumference = normRadius * 2 * Math.PI;
  const offset = circumference - (ilerleme / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={radius * 2} height={radius * 2} className="-rotate-90">
          <defs>
            <linearGradient id="pring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <circle
            cx={radius}
            cy={radius}
            r={normRadius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normRadius}
            fill="none"
            stroke="url(#pring-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl"
          aria-hidden="true"
        >
          {avatarEmoji}
        </div>
      </div>
      <p className="mt-3 text-center text-base font-extrabold">
        {selam} <span className="text-violet-600 dark:text-violet-400">{ad}</span>
      </p>
      <p className="mt-0.5 text-center text-xs text-slate-500 dark:text-slate-400">{altMetin}</p>
      {children && <div className="mt-3 w-full">{children}</div>}
    </div>
  );
}
