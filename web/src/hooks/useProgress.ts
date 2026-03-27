"use client";

import { useCallback, useRef } from "react";

type ActivityType = "slide_view" | "activity_complete" | "game_complete" | "quiz_complete" | "material_download";

interface ProgressEvent {
  activityType: ActivityType;
  activitySlug: string;
  courseSlug?: string;
  score?: number;
  metadata?: Record<string, unknown>;
}

/**
 * useProgress hook — dual-write (localStorage + Supabase API)
 *
 * Public kullanıcılar: sadece localStorage
 * Auth kullanıcılar: localStorage + POST /api/progress (Supabase)
 */
export function useProgress() {
  const startTimeRef = useRef<number>(Date.now());

  const trackProgress = useCallback(async (event: ProgressEvent) => {
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);

    // 1. localStorage'a her zaman yaz (fallback)
    const localKey = `progress-${event.activitySlug}`;
    const localData = {
      ...event,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(localKey, JSON.stringify(localData));

      // Genel ilerleme sayacı
      const totalKey = "total-completed";
      const total = parseInt(localStorage.getItem(totalKey) || "0", 10);
      localStorage.setItem(totalKey, String(total + 1));
    } catch {
      // localStorage dolu veya erişilemiyor
    }

    // 2. Supabase API'ye gönder (auth varsa)
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_type: event.activityType,
          activity_slug: event.activitySlug,
          course_slug: event.courseSlug,
          score: event.score,
          time_spent_seconds: timeSpent,
          metadata: event.metadata || {},
        }),
      });

      if (!response.ok) {
        // Auth yoksa veya hata varsa sessizce geç (localStorage zaten yazdı)
        return { success: false, persisted: "localStorage" as const };
      }

      return { success: true, persisted: "database" as const };
    } catch {
      // Network hatası — localStorage'a zaten yazıldı
      return { success: false, persisted: "localStorage" as const };
    }
  }, []);

  const resetTimer = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  return { trackProgress, resetTimer };
}
