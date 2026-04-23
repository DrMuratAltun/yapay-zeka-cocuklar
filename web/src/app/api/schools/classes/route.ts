import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/schools/classes?my=true — giriş yapan öğretmenin/okul admininin sınıfları
// my=true → sadece kendi açtığım sınıflar
// aksi halde → aynı okula ait tüm sınıflar (okul admini için)
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const admin = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // RLS'den kaçınmak için admin client ile rol sorgusu (user.id doğrulanmış)
  const { data: myRole, error: roleError } = await admin
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['teacher', 'school_admin', 'super_admin'])
    .maybeSingle()

  if (roleError) {
    return NextResponse.json({ error: roleError.message }, { status: 500 })
  }
  if (!myRole) {
    return NextResponse.json(
      { error: 'Yetki yok. Okul yöneticisinden teacher rolüyle eşleştirilmeyi iste.' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(req.url)
  const sadeceBenim = searchParams.get('my') === 'true'

  let query = admin
    .from('classes')
    .select('id, name, access_code, credential_type, teacher_id, school_id, created_at')
    .eq('school_id', myRole.school_id)
    .order('created_at', { ascending: false })

  // Öğretmen rolü → her zaman sadece kendi sınıfları
  if (myRole.role === 'teacher' || sadeceBenim) {
    query = query.eq('teacher_id', user.id)
  }

  const { data: classes, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Her sınıfın öğrenci sayısını ekle
  const classesWithCounts = await Promise.all(
    (classes ?? []).map(async (c) => {
      const { count } = await admin
        .from('class_students')
        .select('*', { count: 'exact', head: true })
        .eq('class_id', c.id)
      return { ...c, student_count: count ?? 0 }
    })
  )

  return NextResponse.json({ classes: classesWithCounts })
}

// POST /api/schools/classes — sınıf oluştur (teacher, school_admin, super_admin)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const admin = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  // Yetki kontrolü (admin client ile RLS bypass)
  const { data: myRole } = await admin
    .from('school_users')
    .select('school_id, role')
    .eq('user_id', user.id)
    .in('role', ['teacher', 'school_admin', 'super_admin'])
    .maybeSingle()

  if (!myRole) {
    return NextResponse.json(
      { error: 'Sınıf oluşturma yetkin yok. Okul yöneticisinden teacher rolüyle eşleştirilmeyi iste.' },
      { status: 403 }
    )
  }

  const body = await req.json()
  const { name, access_code, credential_type } = body

  if (!name || !access_code) {
    return NextResponse.json({ error: 'name ve access_code zorunlu' }, { status: 400 })
  }

  // Sınıf kodunun aynı okulda benzersiz olduğundan emin ol
  const { data: mevcut } = await admin
    .from('classes')
    .select('id')
    .eq('school_id', myRole.school_id)
    .eq('access_code', access_code.toUpperCase())
    .maybeSingle()

  if (mevcut) {
    return NextResponse.json(
      { error: 'Bu sınıf kodu zaten kullanımda. Farklı bir kod dene.' },
      { status: 409 }
    )
  }

  const { data, error } = await admin
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
