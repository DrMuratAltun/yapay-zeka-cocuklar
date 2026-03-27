"use client";

import { useEffect, useState } from "react";

export default function OgrenciDashboard() {
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch from localStorage first (Dual Read)
    const localData = JSON.parse(localStorage.getItem('student_progress') || '[]');
    setProgress(localData);

    // 2. In a real scenario, fetch from Supabase if logged in
    // fetch('/api/progress/me').then(res => res.json()).then(data => setProgress(prev => [...prev, ...data]));
  }, []);

  const totalScore = progress.reduce((acc, curr) => acc + (curr.score || 0), 0);
  const activitiesCompleted = progress.length;

  return (
    <div className="container py-10 space-y-8 mx-auto max-w-6xl px-4">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Öğrenci Paneli</h1>
        <p className="text-xl text-gray-500">
          İlerlemelerini, rozetlerini ve sonuçlarını buradan takip edebilirsin!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border bg-white shadow-sm p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gray-800 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Toplam Puan</h3>
            <span className="text-xl">⭐</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalScore}</div>
            <p className="text-xs text-gray-500 mt-1">XP</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border bg-white shadow-sm p-6 bg-gradient-to-br from-green-50 to-green-100 dark:bg-gray-800 dark:from-green-900/20 dark:to-green-800/20">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Tamamlanan</h3>
            <span className="text-xl">📈</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{activitiesCompleted}</div>
            <p className="text-xs text-gray-500 mt-1">Etkinlik & Oyun</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border bg-white shadow-sm p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:bg-gray-800 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Hedef İlerleme</h3>
            <span className="text-xl">🎯</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {Math.min(Math.round((activitiesCompleted / 62) * 100), 100)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Yapay Zeka Macerası</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border bg-white shadow-sm p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:bg-gray-800 dark:from-amber-900/20 dark:to-amber-800/20">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Kazanılan Rozetler</h3>
            <span className="text-xl">🛡️</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {activitiesCompleted > 10 ? 2 : activitiesCompleted > 0 ? 1 : 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Kahramanlık Madalyası</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white shadow-sm p-6 dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              📝 Son Aktivitelerin
            </h3>
            <p className="text-sm text-gray-500">
              Çözdüğün oyun ve quizlerin geçmişi
            </p>
          </div>
          <div>
            {progress.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz hiç etkinlik çözmedin! Maceraya başla.
              </div>
            ) : (
              <ul className="space-y-4">
                {progress.slice(-5).reverse().map((p, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-2 last:border-0 border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{p.activity_id || "Bilinmeyen Etkinlik"}</p>
                      <p className="text-xs text-gray-500 capitalize">{p.activity_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-400">+{p.score} Puan</p>
                      <p className="text-xs text-gray-500">{p.time_spent} sn</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-white shadow-sm p-6 dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              🏆 Rozet Galerisi
            </h3>
            <p className="text-sm text-gray-500">Kazandığın başarımlar</p>
          </div>
          <div>
             <div className="grid grid-cols-3 gap-4 text-center">
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activitiesCompleted > 0 ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 grayscale opacity-50 dark:border-gray-700'}`}>
                    <span className="text-3xl">⭐</span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">İlk Adım</span>
                </div>
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activitiesCompleted > 10 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 grayscale opacity-50 dark:border-gray-700'}`}>
                    <span className="text-3xl">🛡️</span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Kaşif</span>
                </div>
                <div className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${activitiesCompleted > 30 ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 grayscale opacity-50 dark:border-gray-700'}`}>
                    <span className="text-3xl">🏅</span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Uzman</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
