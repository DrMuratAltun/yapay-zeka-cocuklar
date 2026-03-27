import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Bölüm 1 ücretsiz demo — her zaman serbest
  if (path === '/bolumler/1') {
    return supabaseResponse
  }

  // Admin/öğretmen yönetim route'ları → /giris (email+şifre)
  const adminRoutes = ['/admin', '/okul', '/ogretmen/siniflar']
  const isAdminRoute = adminRoutes.some((r) => path.startsWith(r))

  // Öğrenci içerik route'ları → /kolay-giris (sınıf kodu+nickname)
  const studentRoutes = ['/bolumler/', '/ogrenci']
  const isStudentRoute = studentRoutes.some((r) => path.startsWith(r))

  // Giriş yapmamış kullanıcıları doğru login sayfasına yönlendir
  if (!user && isAdminRoute) {
    const loginUrl = new URL('/giris', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  if (!user && isStudentRoute) {
    const loginUrl = new URL('/kolay-giris', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // Giriş yapmış kullanıcılarda rol kontrolü (sadece admin route'lar için)
  if (user && isAdminRoute) {
    const { data: roleData } = await supabase
      .from('school_users')
      .select('role')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    const role = roleData?.role

    if (path.startsWith('/admin') && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      path.startsWith('/okul') &&
      !['school_admin', 'super_admin'].includes(role ?? '')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      path.startsWith('/ogretmen/siniflar') &&
      !['teacher', 'school_admin', 'super_admin'].includes(role ?? '')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/okul/:path*',
    '/ogretmen/siniflar/:path*',
    '/bolumler/:path*',
    '/ogrenci/:path*',
  ],
}
