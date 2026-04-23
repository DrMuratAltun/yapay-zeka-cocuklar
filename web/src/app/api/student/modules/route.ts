import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// GET /api/student/modules — öğrencinin atanmış modüllerini ve kilit durumlarını döner
export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const adminClient = createAdminClient()

  // Öğrencinin sınıfını bul
  const { data: enrollment } = await adminClient
    .from('class_students')
    .select('class_id')
    .eq('student_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!enrollment) {
    // Sınıf ataması yok — public fallback (tüm bölümler açık)
    return NextResponse.json({ enrolled: false, modules: [] })
  }

  const classId = enrollment.class_id

  // Sınıf bilgisi
  const { data: classData } = await adminClient
    .from('classes')
    .select('id, module_order')
    .eq('id', classId)
    .single()

  if (!classData) {
    return NextResponse.json({ enrolled: false, modules: [] })
  }

  // Atanmış modüller
  const { data: modules } = await adminClient
    .from('class_modules')
    .select('bolum_no, sort_order, min_quiz_score')
    .eq('class_id', classId)
    .order('sort_order', { ascending: true })

  if (!modules || modules.length === 0) {
    return NextResponse.json({
      enrolled: true,
      classId,
      moduleOrder: classData.module_order ?? 'sequential',
      modules: [],
    })
  }

  // Öğrencinin quiz sonuçları
  const { data: quizResults } = await adminClient
    .from('student_quiz_results')
    .select('bolum_no, score, passed')
    .eq('student_id', user.id)
    .eq('class_id', classId)

  const resultMap = new Map(
    (quizResults ?? []).map((r) => [r.bolum_no, r])
  )

  const isSequential = (classData.module_order ?? 'sequential') === 'sequential'

  // Kilit durumlarını hesapla
  const modulesWithLock = modules.map((m, index) => {
    const quizResult = resultMap.get(m.bolum_no)
    let unlocked = true

    if (isSequential && index > 0) {
      // Sıralı mod: önceki modülün quizi geçilmiş olmalı
      const prevModule = modules[index - 1]
      const prevResult = resultMap.get(prevModule.bolum_no)
      unlocked = prevResult?.passed === true
    }

    return {
      bolumNo: m.bolum_no,
      sortOrder: m.sort_order,
      minQuizScore: m.min_quiz_score,
      unlocked,
      quizResult: quizResult
        ? { score: quizResult.score, passed: quizResult.passed }
        : null,
    }
  })

  return NextResponse.json({
    enrolled: true,
    classId,
    moduleOrder: classData.module_order ?? 'sequential',
    modules: modulesWithLock,
  })
}
