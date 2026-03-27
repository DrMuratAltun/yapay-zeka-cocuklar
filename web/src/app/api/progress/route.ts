import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Public mod — auth yoksa sessizce 401 dön (localStorage fallback çalışır)
    if (!user) {
      return NextResponse.json(
        { error: "Public mod — ilerleme localStorage'a kaydedildi" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { activity_type, activity_slug, course_slug, score, time_spent_seconds, metadata } = body;

    if (!activity_type || !activity_slug) {
      return NextResponse.json({ error: "activity_type ve activity_slug gerekli" }, { status: 400 });
    }

    // Öğrencinin okul bilgisini al
    const { data: membership } = await supabase
      .from("school_memberships")
      .select("school_id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    // Course ID'yi slug'dan bul (varsa)
    let courseId = null;
    if (course_slug) {
      const { data: course } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", course_slug)
        .maybeSingle();
      courseId = course?.id || null;
    }

    // İlerlemeyi kaydet
    const { error } = await supabase.from("student_progress").insert({
      student_id: user.id,
      school_id: membership?.school_id || null,
      course_id: courseId,
      activity_type,
      activity_slug,
      score: score || null,
      time_spent_seconds: time_spent_seconds || null,
      metadata: metadata || {},
    });

    if (error) {
      console.error("Progress kayıt hatası:", error);
      return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Auth gerekli" }, { status: 401 });
    }

    const { data: progress } = await supabase
      .from("student_progress")
      .select("*")
      .eq("student_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(100);

    const stats = {
      total: progress?.length || 0,
      totalScore: progress?.reduce((s, p) => s + (p.score || 0), 0) || 0,
      totalTime: progress?.reduce((s, p) => s + (p.time_spent_seconds || 0), 0) || 0,
    };

    return NextResponse.json({ progress, stats });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
