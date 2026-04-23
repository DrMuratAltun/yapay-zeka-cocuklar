import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// PATCH /api/classes/[classId] — sınıf adını güncelle
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: myRole } = await supabase
    .from('school_users')
    .select('role, school_id')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const adminClient = createAdminClient()

  // Teacher ise kendi sınıfı mı kontrol
  if (myRole.role === 'teacher') {
    const { data: cls } = await adminClient
      .from('classes')
      .select('teacher_id')
      .eq('id', classId)
      .single()

    if (!cls || cls.teacher_id !== user.id) {
      return NextResponse.json({ error: 'Bu sınıfta yetkiniz yok' }, { status: 403 })
    }
  }

  const body = await req.json()
  const updates: Record<string, unknown> = {}
  if (body.name) updates.name = body.name

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Güncellenecek alan yok' }, { status: 400 })
  }

  const { data, error } = await adminClient
    .from('classes')
    .update(updates)
    .eq('id', classId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/classes/[classId] — sınıfı sil
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const supabase = await createClient()
  const { classId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { data: myRole } = await supabase
    .from('school_users')
    .select('role, school_id')
    .eq('user_id', user.id)
    .in('role', ['super_admin', 'school_admin', 'teacher'])
    .limit(1)
    .maybeSingle()

  if (!myRole) return NextResponse.json({ error: 'Yetki yok' }, { status: 403 })

  const adminClient = createAdminClient()

  // Teacher ise kendi sınıfı mı kontrol
  if (myRole.role === 'teacher') {
    const { data: cls } = await adminClient
      .from('classes')
      .select('teacher_id')
      .eq('id', classId)
      .single()

    if (!cls || cls.teacher_id !== user.id) {
      return NextResponse.json({ error: 'Bu sınıfta yetkiniz yok' }, { status: 403 })
    }
  }

  // Sınıfı sil (CASCADE ile öğrenciler, modüller, quiz sonuçları da silinir)
  const { error } = await adminClient
    .from('classes')
    .delete()
    .eq('id', classId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
