import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/classes/[classId]/students/[studentId]/reset — credential sıfırla
export async function POST(
  _req: NextRequest,
  {
    params,
  }: { params: Promise<{ classId: string; studentId: string }> }
) {
  const supabase = await createClient()
  const adminClient = createAdminClient()
  const { classId, studentId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: classData } = await adminClient
    .from('classes')
    .select('teacher_id, school_id')
    .eq('id', classId)
    .single()

  if (!classData || classData.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })
  }

  const { data: student } = await adminClient
    .from('class_students')
    .select('user_id, nickname')
    .eq('id', studentId)
    .eq('class_id', classId)
    .single()

  if (!student) {
    return NextResponse.json({ error: 'Öğrenci bulunamadı' }, { status: 404 })
  }

  // Yeni credential üret
  const newCredential = String(Math.floor(1000 + Math.random() * 9000))

  // Auth şifresini güncelle
  const { error: authError } = await adminClient.auth.admin.updateUserById(
    student.user_id,
    { password: newCredential }
  )

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  // DB kaydını güncelle
  await adminClient
    .from('class_students')
    .update({ credential_plain: newCredential })
    .eq('id', studentId)

  return NextResponse.json({
    success: true,
    nickname: student.nickname,
    new_credential: newCredential,
  })
}
