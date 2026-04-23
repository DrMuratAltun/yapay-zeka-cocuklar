import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/schools/classes — debug: kullanici ve okul durumu
export async function GET(req: NextRequest) {
  try {
    // Cookie debug — ham header dahil
    const allCookies = req.cookies.getAll()
    const rawCookieHeader = req.headers.get('cookie') ?? '(yok)'
    const sbCookies = allCookies.filter(c => c.name.startsWith('sb-'))

    const supabase = await createClient()
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({
      step: 'auth',
      error: authErr?.message ?? 'No user',
      cookieCount: allCookies.length,
      sbCookieCount: sbCookies.length,
      sbCookieNames: sbCookies.map(c => c.name),
      rawCookieHeader: rawCookieHeader.substring(0, 200),
    }, { status: 401 })

    const adminClient = createAdminClient()
    const { data: myRole, error: roleErr } = await adminClient
      .from('school_users')
      .select('school_id, role')
      .eq('user_id', user.id)
      .single()

    if (!myRole) return NextResponse.json({ step: 'role', userId: user.id, error: roleErr?.message ?? 'No school_users record' })

    // classes tablosu kolon kontrolu
    const { error: testErr } = await adminClient
      .from('classes')
      .select('id, school_id, teacher_id, name, access_code')
      .limit(1)

    return NextResponse.json({
      step: 'ok',
      userId: user.id,
      email: user.email,
      role: myRole.role,
      schoolId: myRole.school_id,
      classesQueryOk: !testErr,
      classesError: testErr?.message ?? null,
    })
  } catch (e: any) {
    return NextResponse.json({ step: 'crash', error: e.message }, { status: 500 })
  }
}

// POST /api/schools/classes — sinif olustur (school_admin, teacher)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const body = await req.json()
  const { name, access_code, credential_type } = body

  if (!name || !access_code) {
    return NextResponse.json({ error: 'name ve access_code zorunlu' }, { status: 400 })
  }

  // Admin client kullan — RLS recursion sorununu onler
  const adminClient = createAdminClient()

  // school_admin, super_admin veya teacher kontrolu (adminClient ile — RLS bypass)
  const { data: myRole } = await adminClient
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['school_admin', 'super_admin', 'teacher'])
    .single()

  if (!myRole) {
    return NextResponse.json({ error: 'Henuz bir okula atanmamissiniz. Okul yoneticinize basvurun.' }, { status: 403 })
  }

  // Oncelikle credential_type ile dene, kolon yoksa onsuz dene
  let result = await adminClient
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

  // credential_type kolonu yoksa onsuz dene
  if (result.error && result.error.message.includes('credential_type')) {
    result = await adminClient
      .from('classes')
      .insert({
        school_id: myRole.school_id,
        teacher_id: user.id,
        name,
        access_code: access_code.toUpperCase(),
      })
      .select()
      .single()
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
  return NextResponse.json(result.data, { status: 201 })
}
