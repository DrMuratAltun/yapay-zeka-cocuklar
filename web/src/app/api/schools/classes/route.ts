import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/schools/classes — sınıf oluştur (school_admin)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // school_admin kontrolü ve school_id'yi al
  const { data: myRole } = await supabase
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['school_admin', 'super_admin'])
    .single()

  if (!myRole) return NextResponse.json({ error: 'Okul admin yetkisi yok' }, { status: 403 })

  const body = await req.json()
  const { name, access_code, credential_type } = body

  if (!name || !access_code) {
    return NextResponse.json({ error: 'name ve access_code zorunlu' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('classes')
    .insert({
      school_id: myRole.school_id,
      teacher_id: user.id,
      name,
      access_code: access_code.toUpperCase(),
      credential_type: credential_type ?? 'pin',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
