import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/classes/[classId]/progress
// Sınıftaki tüm öğrencilerin ilerleme özeti (öğretmen için)
// Dönüş: [{ user_id, nickname, total_activities, total_score, last_activity_at }]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const admin = createAdminClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Yetki: sınıfın öğretmeni ya da school_admin/super_admin
  const { data: classData } = await admin
    .from('classes')
    .select('id, school_id, teacher_id')
    .eq('id', classId)
    .single()

  if (!classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  if (classData.teacher_id !== user.id) {
    const { data: roleData } = await admin
      .from('school_users')
      .select('role')
      .eq('user_id', user.id)
      .eq('school_id', classData.school_id)
      .in('role', ['school_admin', 'super_admin'])
      .maybeSingle()

    if (!roleData) {
      return NextResponse.json({ error: 'Bu sınıfa erişim yok' }, { status: 403 })
    }
  }

  // Sınıftaki öğrencileri al
  const { data: students } = await admin
    .from('class_students')
    .select('user_id, nickname')
    .eq('class_id', classId)

  if (!students || students.length === 0) {
    return NextResponse.json({ progress: [], summary: { total_students: 0 } })
  }

  const userIds = students.map((s) => s.user_id)

  // Bu öğrencilerin progress kayıtlarını topla
  const { data: progressRows } = await admin
    .from('student_progress')
    .select('student_id, score, completed_at, activity_slug')
    .in('student_id', userIds)
    .order('completed_at', { ascending: false })

  // Öğrenci bazında özet
  const ozet = students.map((s) => {
    const kayitlar = (progressRows ?? []).filter((p) => p.student_id === s.user_id)
    const totalActivities = kayitlar.length
    const totalScore = kayitlar.reduce((acc, p) => acc + (p.score || 0), 0)
    const lastActivityAt = kayitlar.length > 0 ? kayitlar[0].completed_at : null
    // Bölüm bazlı tahmin: activity_slug'da bolum-X varsa say
    const bolumSet = new Set<number>()
    kayitlar.forEach((p) => {
      const m = p.activity_slug?.match(/bolum-?(\d+)/i)
      if (m) bolumSet.add(Number(m[1]))
    })
    return {
      user_id: s.user_id,
      nickname: s.nickname,
      total_activities: totalActivities,
      total_score: totalScore,
      last_activity_at: lastActivityAt,
      distinct_bolumler: bolumSet.size,
    }
  })

  return NextResponse.json({
    progress: ozet,
    summary: {
      total_students: students.length,
      active_students: ozet.filter((o) => o.total_activities > 0).length,
      total_activities: ozet.reduce((acc, o) => acc + o.total_activities, 0),
      total_score: ozet.reduce((acc, o) => acc + o.total_score, 0),
    },
  })
}
