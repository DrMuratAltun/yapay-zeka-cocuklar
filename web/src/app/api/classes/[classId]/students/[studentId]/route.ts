import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/classes/[classId]/students/[studentId] — öğrenciyi sil
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ classId: string; studentId: string }> }
) {
  const supabase = await createClient()
  const adminClient = createAdminClient()
  const { classId, studentId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Sınıf bilgisi (admin client — RLS bypass)
  const { data: classData } = await adminClient
    .from('classes')
    .select('teacher_id, school_id')
    .eq('id', classId)
    .single()

  if (!classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  if (classData.teacher_id !== user.id) {
    const { data: roleData } = await adminClient
      .from('school_users')
      .select('role')
      .eq('user_id', user.id)
      .eq('school_id', classData.school_id)
      .in('role', ['school_admin', 'super_admin'])
      .maybeSingle()

    if (!roleData) {
      return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })
    }
  }

  // Öğrenci kaydını bul
  const { data: student } = await adminClient
    .from('class_students')
    .select('user_id')
    .eq('id', studentId)
    .eq('class_id', classId)
    .single()

  if (!student) {
    return NextResponse.json({ error: 'Öğrenci bulunamadı' }, { status: 404 })
  }

  // class_students sil
  await adminClient
    .from('class_students')
    .delete()
    .eq('id', studentId)

  // school_users sil
  await adminClient
    .from('school_users')
    .delete()
    .eq('user_id', student.user_id)
    .eq('school_id', classData.school_id)

  // Auth user sil
  await adminClient.auth.admin.deleteUser(student.user_id)

  return NextResponse.json({ success: true })
}
