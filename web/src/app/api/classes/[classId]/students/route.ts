import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/classes/[classId]/students — sınıf öğrenci listesi (teacher view)
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

  // Sınıf bilgisi
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('id, name, access_code, credential_type, school_id, teacher_id')
    .eq('id', classId)
    .single()

  if (classError || !classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  // Yetki kontrolü: sınıfın öğretmeni, school_admin veya super_admin
  const isTeacher = classData.teacher_id === user.id
  if (!isTeacher) {
    const { data: roleData } = await supabase
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

  // Öğrenci listesi
  const { data: students } = await supabase
    .from('class_students')
    .select('id, user_id, nickname, credential_plain, created_at')
    .eq('class_id', classId)
    .order('nickname')

  return NextResponse.json({
    classInfo: classData,
    students: students ?? [],
  })
}

// POST /api/classes/[classId]/students — tek öğrenci ekle
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const adminClient = createAdminClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: classData } = await supabase
    .from('classes')
    .select('id, school_id, access_code, credential_type, teacher_id')
    .eq('id', classId)
    .single()

  if (!classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  if (classData.teacher_id !== user.id) {
    return NextResponse.json({ error: 'Bu sınıfa erişim yok' }, { status: 403 })
  }

  const body = await req.json()
  const { nickname } = body

  if (!nickname || typeof nickname !== 'string') {
    return NextResponse.json({ error: 'nickname zorunlu' }, { status: 400 })
  }

  // Kota kontrolü
  const { data: school } = await supabase
    .from('schools')
    .select('quota_students')
    .eq('id', classData.school_id)
    .single()

  const { count: currentCount } = await supabase
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', classData.school_id)
    .eq('role', 'student')

  if ((currentCount ?? 0) >= (school?.quota_students ?? 0)) {
    return NextResponse.json({ error: 'Öğrenci kotası dolu' }, { status: 422 })
  }

  const credential = String(Math.floor(1000 + Math.random() * 9000))
  const email = `${nickname.toLowerCase()}@${classData.access_code}.gencyz.local`

  const { data: authData, error: authError } =
    await adminClient.auth.admin.createUser({
      email,
      password: credential,
      email_confirm: true,
    })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  const newUserId = authData.user.id

  await adminClient.from('school_users').insert({
    school_id: classData.school_id,
    user_id: newUserId,
    role: 'student',
  })

  const { error: studentError } = await adminClient
    .from('class_students')
    .insert({
      class_id: classId,
      user_id: newUserId,
      nickname: nickname.trim(),
      credential_plain: credential,
    })

  if (studentError) {
    await adminClient.auth.admin.deleteUser(newUserId)
    return NextResponse.json(
      { error: 'Bu nickname sınıfta zaten kullanımda' },
      { status: 409 }
    )
  }

  return NextResponse.json(
    { success: true, nickname, credential },
    { status: 201 }
  )
}
