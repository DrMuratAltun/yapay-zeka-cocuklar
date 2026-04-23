import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { CsvUploadResult } from '@/types/saas'

// CSV format: nickname sütunu, ilk satır başlık olabilir
// Örnek:
//   nickname
//   KaplanAli
//   YıldızAyşe

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const adminClient = createAdminClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const classId = formData.get('classId') as string

  if (!file || !classId) {
    return NextResponse.json({ error: 'file ve classId zorunlu' }, { status: 400 })
  }

  const { data: classData, error: classError } = await adminClient
    .from('classes')
    .select('id, school_id, access_code, credential_type, teacher_id')
    .eq('id', classId)
    .single()

  if (classError || !classData) {
    return NextResponse.json({ error: 'Sınıf bulunamadı' }, { status: 404 })
  }

  if (classData.teacher_id !== user.id) {
    // School admin/super_admin da izinli
    const { data: roleData } = await adminClient
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

  const { data: schoolData } = await adminClient
    .from('schools')
    .select('quota_students')
    .eq('id', classData.school_id)
    .single()

  const { count: currentCount } = await adminClient
    .from('school_users')
    .select('*', { count: 'exact', head: true })
    .eq('school_id', classData.school_id)
    .eq('role', 'student')

  const quota = schoolData?.quota_students ?? 0
  const used = currentCount ?? 0

  const text = await file.text()
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const dataLines = lines[0]?.toLowerCase().includes('nickname') ? lines.slice(1) : lines

  if (used + dataLines.length > quota) {
    return NextResponse.json(
      {
        error: `Kota aşılıyor! Mevcut: ${used}, Kota: ${quota}, Eklenecek: ${dataLines.length}. En fazla ${quota - used} öğrenci ekleyebilirsiniz.`,
      },
      { status: 422 }
    )
  }

  const result: CsvUploadResult = { success: [], errors: [] }

  for (let i = 0; i < dataLines.length; i++) {
    const nickname = dataLines[i].trim()
    if (!nickname) continue

    const credential = String(Math.floor(1000 + Math.random() * 9000))
    const email = `${nickname.toLowerCase()}@${classData.access_code}.gencyz.local`

    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password: credential,
      email_confirm: true,
    })

    if (authError) {
      result.errors.push({ row: i + 1, nickname, reason: authError.message })
      continue
    }

    const newUserId = authData.user.id

    await adminClient.from('school_users').insert({
      school_id: classData.school_id,
      user_id: newUserId,
      role: 'student',
    })

    const { error: studentError } = await adminClient.from('class_students').insert({
      class_id: classId,
      user_id: newUserId,
      nickname,
      credential_plain: credential,
    })

    if (studentError) {
      await adminClient.auth.admin.deleteUser(newUserId)
      result.errors.push({ row: i + 1, nickname, reason: 'Nickname bu sınıfta zaten kullanımda' })
      continue
    }

    result.success.push(nickname)
  }

  return NextResponse.json(result, { status: 200 })
}
