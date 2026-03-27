import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/schools/[schoolId]/users — okula school_admin veya teacher ekle
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const supabase = await createClient()
  const adminClient = createAdminClient()
  const { schoolId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Super admin kontrolü
  const { data: myRole } = await supabase
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'super_admin')
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const body = await req.json()
  const { email, password, full_name, role } = body

  if (!email || !password || !role) {
    return NextResponse.json(
      { error: 'email, password ve role zorunlu' },
      { status: 400 }
    )
  }

  if (!['school_admin', 'teacher'].includes(role)) {
    return NextResponse.json(
      { error: "role 'school_admin' veya 'teacher' olmalı" },
      { status: 400 }
    )
  }

  // Öğretmen kotası kontrolü
  if (role === 'teacher') {
    const { data: school } = await supabase
      .from('schools')
      .select('quota_teachers')
      .eq('id', schoolId)
      .single()

    const { count: teacherCount } = await supabase
      .from('school_users')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('role', 'teacher')

    if ((teacherCount ?? 0) >= (school?.quota_teachers ?? 0)) {
      return NextResponse.json(
        { error: 'Öğretmen kotası dolu' },
        { status: 422 }
      )
    }
  }

  // Mevcut kullanıcı var mı kontrol et
  const { data: existingUsers } = await adminClient.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(
    (u) => u.email === email.toLowerCase()
  )

  let userId: string

  if (existingUser) {
    // Kullanıcı zaten var — bu okula atama yap
    userId = existingUser.id

    // Bu okulda zaten kayıtlı mı?
    const { data: existing } = await supabase
      .from('school_users')
      .select('id')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Bu kullanıcı zaten bu okulda kayıtlı' },
        { status: 409 }
      )
    }
  } else {
    // Yeni kullanıcı oluştur
    const { data: authData, error: authError } =
      await adminClient.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true,
        user_metadata: { full_name: full_name || email.split('@')[0] },
      })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }
    userId = authData.user.id
  }

  // school_users'a ekle
  const { error: insertError } = await adminClient
    .from('school_users')
    .insert({
      school_id: schoolId,
      user_id: userId,
      role,
    })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json(
    { success: true, user_id: userId, email, role },
    { status: 201 }
  )
}

// DELETE /api/schools/[schoolId]/users — kullanıcıyı okuldan çıkar
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> }
) {
  const supabase = await createClient()
  const { schoolId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: myRole } = await supabase
    .from('school_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'super_admin')
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const body = await req.json()
  const { userId } = body

  if (!userId) {
    return NextResponse.json({ error: 'userId zorunlu' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('school_users')
    .delete()
    .eq('school_id', schoolId)
    .eq('user_id', userId)
    .in('role', ['school_admin', 'teacher'])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
