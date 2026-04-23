import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// GET /api/schools/stats
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Tum sorgular adminClient ile — RLS self-reference sorununu onler
  const adminClient = createAdminClient()

  // Kullanicinin okuldaki rolunu bul
  const { data: myRole } = await adminClient
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['school_admin', 'super_admin', 'teacher'])
    .single()

  if (!myRole) {
    return NextResponse.json({ error: 'no_school' }, { status: 403 })
  }

  const schoolId = myRole.school_id
  const isTeacher = myRole.role === 'teacher'

  // Okul bilgisi
  const { data: school } = await adminClient
    .from('schools')
    .select('*')
    .eq('id', schoolId)
    .single()

  // Ogrenci sayisi
  const { count: studentCount } = await adminClient
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'student')

  // Ogretmen sayisi
  const { count: teacherCount } = await adminClient
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', schoolId)
    .eq('role', 'teacher')

  // Sinif listesi — ogretmenler sadece kendi siniflarini gorur
  let classQuery = adminClient
    .from('classes')
    .select('id, name, access_code, credential_type, created_at')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false })

  if (isTeacher) {
    classQuery = classQuery.eq('teacher_id', user.id)
  }

  const { data: classes } = await classQuery

  // Her sinifin ogrenci sayisini al
  const classesWithCount = await Promise.all(
    (classes ?? []).map(async (cls) => {
      const { count } = await adminClient
        .from('class_students')
        .select('*', { count: 'exact', head: true })
        .eq('class_id', cls.id)
      return { ...cls, student_count: count ?? 0 }
    })
  )

  // Okul yoneticisi icin kullanici listesi
  let users: any[] = []
  if (!isTeacher) {
    const { data: userList } = await adminClient
      .from('school_users')
      .select('id, user_id, role, created_at, is_active')
      .eq('school_id', schoolId)
      .in('role', ['school_admin', 'teacher'])
      .order('created_at', { ascending: false })

    if (userList && userList.length > 0) {
      const enriched = await Promise.all(
        userList.map(async (u) => {
          const { data } = await adminClient.auth.admin.getUserById(u.user_id)
          return {
            ...u,
            email: data?.user?.email ?? '',
            full_name: data?.user?.user_metadata?.full_name ?? '',
          }
        })
      )
      users = enriched
    }
  }

  return NextResponse.json({
    school,
    stats: {
      students_used: studentCount ?? 0,
      students_quota: school?.quota_students ?? 0,
      teachers_used: teacherCount ?? 0,
      teachers_quota: school?.quota_teachers ?? 0,
    },
    classes: classesWithCount,
    users,
  })
}
