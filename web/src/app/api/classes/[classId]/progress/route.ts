import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/classes/[classId]/progress — sınıftaki tüm öğrencilerin quiz ilerlemesi
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // teacher, school_admin veya super_admin kontrolü
  const { data: myRole } = await supabase
    .from('school_users')
    .select('role, school_id')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const adminClient = createAdminClient()

  // Teacher ise kendi sınıfı mı?
  if (myRole.role === 'teacher') {
    const { data: cls } = await adminClient
      .from('classes')
      .select('teacher_id')
      .eq('id', classId)
      .single()

    if (!cls || cls.teacher_id !== user.id) {
      return NextResponse.json({ error: 'Bu sınıfta yetkiniz yok' }, { status: 403 })
    }
  }

  // Atanmış modüller
  const { data: modules } = await adminClient
    .from('class_modules')
    .select('bolum_no, sort_order, min_quiz_score')
    .eq('class_id', classId)
    .order('sort_order', { ascending: true })

  // Öğrenciler
  const { data: students } = await adminClient
    .from('class_students')
    .select('student_id, nickname')
    .eq('class_id', classId)
    .order('nickname', { ascending: true })

  // Tüm quiz sonuçları
  const { data: results } = await adminClient
    .from('student_quiz_results')
    .select('student_id, bolum_no, score, passed')
    .eq('class_id', classId)

  // Sonuçları öğrenci bazlı map'e çevir
  const resultMap = new Map<string, Map<number, { score: number; passed: boolean }>>()
  for (const r of results ?? []) {
    if (!resultMap.has(r.student_id)) {
      resultMap.set(r.student_id, new Map())
    }
    resultMap.get(r.student_id)!.set(r.bolum_no, { score: r.score, passed: r.passed })
  }

  const studentProgress = (students ?? []).map((s) => {
    const quizzes = resultMap.get(s.student_id)
    const moduleResults = (modules ?? []).map((m) => {
      const result = quizzes?.get(m.bolum_no)
      return {
        bolumNo: m.bolum_no,
        score: result?.score ?? null,
        passed: result?.passed ?? false,
      }
    })
    const passedCount = moduleResults.filter((r) => r.passed).length
    const avgScore =
      moduleResults.filter((r) => r.score !== null).length > 0
        ? Math.round(
            moduleResults
              .filter((r) => r.score !== null)
              .reduce((sum, r) => sum + (r.score ?? 0), 0) /
              moduleResults.filter((r) => r.score !== null).length
          )
        : null

    return {
      studentId: s.student_id,
      nickname: s.nickname,
      modules: moduleResults,
      passedCount,
      avgScore,
    }
  })

  return NextResponse.json({
    modules: modules ?? [],
    students: studentProgress,
  })
}
