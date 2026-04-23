import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/classes/[classId]/modules — sınıfa atanmış modülleri getir
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

  const adminClient = createAdminClient()

  // Kullanıcı bu sınıfa erişebilir mi? (teacher, school_admin, super_admin veya student)
  const { data: myRole } = await supabase
    .from('school_users')
    .select('role, school_id')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  // Öğrenci ise class_students'dan kontrol
  let isStudent = false
  if (!myRole) {
    const { data: studentRow } = await adminClient
      .from('class_students')
      .select('id')
      .eq('class_id', classId)
      .eq('student_id', user.id)
      .maybeSingle()

    if (!studentRow) {
      return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })
    }
    isStudent = true
  }

  // Sınıf bilgisi (module_order)
  const { data: classData } = await adminClient
    .from('classes')
    .select('id, module_order')
    .eq('id', classId)
    .single()

  if (!classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  // Atanmış modüller
  const { data: modules } = await adminClient
    .from('class_modules')
    .select('*')
    .eq('class_id', classId)
    .order('sort_order', { ascending: true })

  // Öğrenci ise quiz sonuçlarını da getir
  let quizResults: { bolum_no: number; score: number; passed: boolean }[] = []
  if (isStudent) {
    const { data: results } = await adminClient
      .from('student_quiz_results')
      .select('bolum_no, score, passed')
      .eq('student_id', user.id)
      .eq('class_id', classId)

    quizResults = results ?? []
  }

  return NextResponse.json({
    moduleOrder: classData.module_order ?? 'sequential',
    modules: modules ?? [],
    quizResults,
  })
}

// PUT /api/classes/[classId]/modules — modül atamasını güncelle
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // teacher (kendi sınıfı), school_admin veya super_admin
  const { data: myRole } = await supabase
    .from('school_users')
    .select('role, school_id')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const adminClient = createAdminClient()

  // Teacher ise kendi sınıfı mı kontrol
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

  const body = await req.json()
  const { moduleOrder, modules } = body as {
    moduleOrder: 'sequential' | 'random'
    modules: { bolumNo: number; sortOrder: number; minQuizScore: number }[]
  }

  if (!moduleOrder || !Array.isArray(modules)) {
    return NextResponse.json({ error: 'moduleOrder ve modules zorunlu' }, { status: 400 })
  }

  // Sınıfın module_order'ını güncelle
  await adminClient
    .from('classes')
    .update({ module_order: moduleOrder })
    .eq('id', classId)

  // Mevcut atanmış modülleri sil
  await adminClient
    .from('class_modules')
    .delete()
    .eq('class_id', classId)

  // Yeni modülleri ekle
  if (modules.length > 0) {
    const rows = modules.map((m) => ({
      class_id: classId,
      bolum_no: m.bolumNo,
      sort_order: m.sortOrder,
      min_quiz_score: m.minQuizScore,
    }))

    const { error } = await adminClient.from('class_modules').insert(rows)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
