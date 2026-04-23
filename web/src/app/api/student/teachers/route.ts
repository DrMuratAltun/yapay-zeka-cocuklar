import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// GET /api/student/teachers — öğrencinin sınıfındaki/okulundaki öğretmenleri döner
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ teachers: [] })

  const adminClient = createAdminClient()

  const { data: enrollment } = await adminClient
    .from('class_students')
    .select('class_id')
    .eq('student_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!enrollment?.class_id) {
    return NextResponse.json({ teachers: [] })
  }

  const { data: cls } = await adminClient
    .from('classes')
    .select('teacher_id, school_id')
    .eq('id', enrollment.class_id)
    .limit(1)
    .maybeSingle()

  const teacherIds = new Set<string>()
  if (cls?.teacher_id) teacherIds.add(cls.teacher_id)

  if (cls?.school_id) {
    const { data: schoolTeachers } = await adminClient
      .from('school_users')
      .select('user_id')
      .eq('school_id', cls.school_id)
      .in('role', ['teacher', 'school_admin'])
    for (const t of schoolTeachers ?? []) {
      if (t.user_id) teacherIds.add(t.user_id)
    }
  }

  if (teacherIds.size === 0) {
    return NextResponse.json({ teachers: [] })
  }

  const { data: profiles } = await adminClient
    .from('profiles')
    .select('id, display_name, full_name, email, title')
    .in('id', Array.from(teacherIds))

  const teachers = (profiles ?? []).map((p) => ({
    id: p.id as string,
    displayName: (p.display_name ?? p.full_name ?? p.email ?? 'Öğretmen') as string,
    subject: (p.title ?? undefined) as string | undefined,
  }))

  return NextResponse.json({ teachers })
}
