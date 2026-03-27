"use client";

import { useEffect, useRef, useState } from "react";
// Supabase Auth and User context can be pulled in here. 
// Assuming a global context or hook exists, e.g., useUser() or checking localStorage directly.

type ActivityTrackerProps = {
  activityId: string;
  activityType: 'quiz' | 'game' | 'interactive' | 'video';
  courseId: string;
  children: React.ReactNode;
  onComplete?: (score: number, timeSpent: number) => void;
};

export default function ActivityTracker({
  activityId,
  activityType,
  courseId,
  children,
  onComplete
}: ActivityTrackerProps) {
  const startTime = useRef<number>(Date.now());
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    startTime.current = Date.now();
  }, [activityId]);

  const handleCompleteActivity = async (score: number, metadata?: Record<string, any>) => {
    if (completed) return; // Prevent multiple submissions
    
    const timeSpentSeconds = Math.round((Date.now() - startTime.current) / 1000);
    setCompleted(true);

    const progressData = {
      course_id: courseId,
      activity_id: activityId,
      activity_type: activityType,
      score,
      time_spent: timeSpentSeconds,
      metadata: metadata || {}
    };

    try {
      // 1. Dual Write: Save to localStorage for public mode fallback
      const localProgress = JSON.parse(localStorage.getItem('student_progress') || '[]');
      localProgress.push({ ...progressData, completed_at: new Date().toISOString() });
      localStorage.setItem('student_progress', JSON.stringify(localProgress));

      // 2. Dual Write: Attempt to save to Supabase / Backend via API route
      // If user is not authenticated, the API could return 401 and we just ignore it.
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progressData)
      });
      
    } catch (e) {
      console.warn("Failed to sync progress to server. Saved locally.", e);
    }

    // Call optional parent callback
    if (onComplete) {
      onComplete(score, timeSpentSeconds);
    }
  };

  // Clone children to inject `onActivityComplete` prop if needed
  // This allows the wrapped components to call it when they finish
  return (
    <div className="activity-wrapper border rounded-lg p-4 bg-background shadow-sm">
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>Aktivite: {activityType}</span>
        {completed && <span className="text-green-500 font-bold">Tamamlandı!</span>}
      </div>
      {/* 
        We use React Context or passing a prop. Since we don't know the exact child structure 
        we expose a global event or pass it down via context. For simplicity, we can provide it via Context.
      */}
      <ActivityTrackerContext.Provider value={{ completeActivity: handleCompleteActivity }}>
        {children}
      </ActivityTrackerContext.Provider>
    </div>
  );
}

// Context to easily consume the complete method within child components
import React, { createContext, useContext } from 'react';

type ActivityContextType = {
  completeActivity: (score: number, metadata?: Record<string, any>) => void;
};

const ActivityTrackerContext = createContext<ActivityContextType | null>(null);

export const useActivityTracker = () => {
  const context = useContext(ActivityTrackerContext);
  if (!context) {
    // Return a dummy implementation if not wrapped, so existing components don't crash
    return {
      completeActivity: () => console.warn('Activity tracker ignored: Component not wrapped in ActivityTracker.')
    };
  }
  return context;
};
