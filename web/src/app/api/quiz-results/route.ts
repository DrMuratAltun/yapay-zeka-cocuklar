import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/quiz-results — quiz sonucunu kaydet
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const { bolumNo, score } = body

  if (!bolumNo || typeof score !== 'number' || score < 0 || score > 100) {
    return NextResponse.json({ error: 'bolumNo ve score (0-100) zorunlu' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  // Ogrencinin sinifini bul
  const { data: classStudent } = await adminClient
    .from('class_students')
    .select('class_id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!classStudent) {
    // Sinif ataması yok — public kullanıcı, sessizce kaydet ama class_id olmadan return
    return NextResponse.json({ passed: false, score, minRequired: 0, message: 'Sinif atamasi yok' })
  }

  // Bu modul sinifa atanmis mi ve min_quiz_score nedir?
  const { data: moduleData } = await adminClient
    .from('class_modules')
    .select('min_quiz_score')
    .eq('class_id', classStudent.class_id)
    .eq('bolum_no', bolumNo)
    .maybeSingle()

  const minRequired = moduleData?.min_quiz_score ?? 60
  const passed = score >= minRequired

  // Upsert — sadece daha yuksek skor guncelle
  const { data: existing } = await adminClient
    .from('student_quiz_results')
    .select('score')
    .eq('student_id', user.id)
    .eq('class_id', classStudent.class_id)
    .eq('bolum_no', bolumNo)
    .maybeSingle()

  if (existing) {
    if (score > existing.score) {
      await adminClient
        .from('student_quiz_results')
        .update({ score, passed, completed_at: new Date().toISOString() })
        .eq('student_id', user.id)
        .eq('class_id', classStudent.class_id)
        .eq('bolum_no', bolumNo)
    }
  } else {
    await adminClient
      .from('student_quiz_results')
      .insert({
        student_id: user.id,
        class_id: classStudent.class_id,
        bolum_no: bolumNo,
        score,
        passed,
      })
  }

  return NextResponse.json({ passed, score, minRequired })
}
