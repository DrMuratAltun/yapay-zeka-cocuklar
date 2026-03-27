import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/schools/stats
// Giriş yapan school_admin'in okul istatistiklerini döner
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Kullanıcının school_admin olduğu okulu bul
  const { data: myRole, error: roleError } = await supabase
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['school_admin', 'super_admin'])
    .single()

  if (roleError || !myRole) {
    return NextResponse.json({ error: 'Okul admin yetkisi yok' }, { status: 403 })
  }

  const schoolId = myRole.school_id

  // Okul bilgisi
  const { data: school } = await supabase
    .from('schools')
    .select('*')
    .eq('id', schoolId)
    .single()

  // Öğrenci sayısı
  const { count: studentCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'student')

  // Öğretmen sayısı
  const { count: teacherCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'teacher')

  // Sınıf listesi
  const { data: classes } = await supabase
    .from('classes')
    .select('id, name, access_code, credential_type, created_at')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false })

  // Her sınıfın öğrenci sayısını al
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
    stats: {
      students_used: studentCount ?? 0,
      students_quota: school?.quota_students ?? 0,
      teachers_used: teacherCount ?? 0,
      teachers_quota: school?.quota_teachers ?? 0,
    },
    classes: classesWithCount,
  })
}
