import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/schools/[schoolId] — okul detay + kullanıcılar + sınıflar (super_admin only)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const supabase = await createClient()
  const { schoolId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Super admin kontrolü
  const { data: role } = await supabase
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'super_admin')
    .limit(1)
    .maybeSingle()

  if (!role) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  // Okul bilgisi
  const { data: school, error } = await supabase
    .from('schools')
    .select('*')
    .eq('id', schoolId)
    .single()

  if (error || !school) {
    return NextResponse.json({ error: 'Okul bulunamadı' }, { status: 404 })
  }

  // Okul kullanıcıları (admin + teacher)
  const { data: users } = await supabase
    .from('school_users')
    .select('id, user_id, role, created_at')
    .eq('school_id', schoolId)
    .in('role', ['school_admin', 'teacher'])
    .order('created_at', { ascending: true })

  // Sınıf listesi
  const { data: classes } = await supabase
    .from('classes')
    .select('id, name, access_code, credential_type, teacher_id, created_at')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false })

  // İstatistikler
  const { count: studentCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'student')

  const { count: teacherCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'teacher')

  // Her sınıfın öğrenci sayısı
  const classesWithCount = await Promise.all(
    (classes ?? []).map(async (cls) => {
      const { count } = await supabase
        .from('class_students')
        .select('*', { count: 'exact', head: true })
        .eq('class_id', cls.id)
      return { ...cls, student_count: count ?? 0 }
    })
  )

  return NextResponse.json({
    school,
    users: users ?? [],
    classes: classesWithCount,
    stats: {
      students_used: studentCount ?? 0,
      students_quota: school.quota_students,
      teachers_used: teacherCount ?? 0,
      teachers_quota: school.quota_teachers,
    },
  })
}

// PATCH /api/schools/[schoolId] — okul güncelle (kota, durum)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const supabase = await createClient()
  const { schoolId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: role } = await supabase
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'super_admin')
    .limit(1)
    .maybeSingle()

  if (!role) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const body = await req.json()
  const updates: Record<string, unknown> = {}
  if (body.quota_students !== undefined) updates.quota_students = body.quota_students
  if (body.quota_teachers !== undefined) updates.quota_teachers = body.quota_teachers
  if (body.status !== undefined) updates.status = body.status

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek alan yok' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('schools')
    .update(updates)
    .eq('id', schoolId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
